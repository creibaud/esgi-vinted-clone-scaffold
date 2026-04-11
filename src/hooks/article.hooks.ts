import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { useCurrentUserId } from "@/hooks/useCurrentUserId";
import { queryClient } from "@/lib/tanstack-query";
import { api } from "@/services/api";
import type { Article, ArticleFilters, ArticleFormData } from "@/types/article";

export function useArticles(params?: ArticleFilters) {
    return useQuery({
        queryKey: ["articles", params],
        queryFn: async () => {
            const defined = Object.fromEntries(
                Object.entries(params ?? {}).filter(([, v]) => v !== undefined),
            ) as Record<string, string>;
            const queryParams = new URLSearchParams(defined).toString();
            const url = queryParams ? `/articles?${queryParams}` : "/articles";
            return await api.get<Article[]>(url);
        },
    });
}

export function useArticle(articleId: string) {
    return useQuery({
        queryKey: ["article", articleId],
        queryFn: async () => {
            return await api.get<Article>(`/articles/${articleId}`);
        },
    });
}

export function useMyArticles() {
    const userId = useCurrentUserId();
    return useQuery({
        queryKey: ["myArticles"],
        queryFn: async () => {
            return await api.get<Article[]>(`/users/${userId}/articles`);
        },
    });
}

export function useFavoriteArticles() {
    return useQuery({
        queryKey: ["favorites"],
        queryFn: async () => {
            const favorites = await api.get<Article[]>(`/favorites`);
            const favoriteIds = new Set(favorites.map((article) => article.id));
            return { favorites, favoriteIds };
        },
    });
}

export function useCreateArticle() {
    return useMutation({
        mutationKey: ["createArticle"],
        mutationFn: async (data: ArticleFormData) => {
            return await api.post<Article>("/articles", data);
        },
        onSuccess: () => {
            toast.success("Annonce publiée !");
        },
        onError: () => {
            toast.error("Impossible de publier l'annonce.");
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ["articles"] });
            queryClient.invalidateQueries({ queryKey: ["myArticles"] });
        },
    });
}

export function useUpdateArticle(articleId: string) {
    return useMutation({
        mutationKey: ["updateArticle", articleId],
        mutationFn: async (data: ArticleFormData) => {
            return await api.put<Article>(`/articles/${articleId}`, data);
        },
        onSuccess: () => {
            toast.success("Annonce mise à jour !");
        },
        onMutate: async (data) => {
            await Promise.all([
                queryClient.cancelQueries({ queryKey: ["articles"] }),
                queryClient.cancelQueries({ queryKey: ["myArticles"] }),
                queryClient.cancelQueries({ queryKey: ["article", articleId] }),
            ]);

            const previousArticle = queryClient.getQueryData<Article>([
                "article",
                articleId,
            ]);
            const previousMyArticles = queryClient.getQueryData<Article[]>([
                "myArticles",
            ]);

            const applyUpdate = (article: Article) =>
                article.id === articleId ? { ...article, ...data } : article;

            queryClient.setQueryData<Article>(["article", articleId], (old) =>
                old ? { ...old, ...data } : old,
            );
            queryClient.setQueryData<Article[]>(["myArticles"], (old) =>
                old?.map(applyUpdate),
            );
            queryClient.setQueriesData<Article[]>(
                { queryKey: ["articles"] },
                (old) => old?.map(applyUpdate),
            );

            return { previousArticle, previousMyArticles };
        },
        onError: (_err, _data, context) => {
            toast.error("Impossible de mettre à jour l'annonce.");
            if (context?.previousArticle) {
                queryClient.setQueryData(
                    ["article", articleId],
                    context.previousArticle,
                );
            }
            if (context?.previousMyArticles) {
                queryClient.setQueryData(
                    ["myArticles"],
                    context.previousMyArticles,
                );
            }
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ["articles"] });
            queryClient.invalidateQueries({ queryKey: ["myArticles"] });
            queryClient.invalidateQueries({ queryKey: ["article", articleId] });
        },
    });
}

type FavoritesCache = { favorites: Article[]; favoriteIds: Set<string> };

export function useToggleFavorite() {
    return useMutation({
        mutationKey: ["toggleFavorite"],
        mutationFn: async ({
            articleId,
            isFavorite,
        }: {
            articleId: string;
            isFavorite: boolean;
        }) => {
            if (isFavorite) {
                return await api.delete(`/favorites/${articleId}`);
            }
            return await api.post(`/favorites/${articleId}`, {});
        },
        onSuccess: (_data, { isFavorite }) => {
            toast.success(
                isFavorite ? "Retiré des favoris." : "Ajouté aux favoris !",
            );
        },
        onMutate: async ({ articleId, isFavorite }) => {
            await queryClient.cancelQueries({ queryKey: ["favorites"] });

            const previous = queryClient.getQueryData<FavoritesCache>([
                "favorites",
            ]);

            queryClient.setQueryData<FavoritesCache>(["favorites"], (old) => {
                if (!old) return old;
                const favoriteIds = new Set(old.favoriteIds);
                const favorites = isFavorite
                    ? old.favorites.filter((a) => a.id !== articleId)
                    : old.favorites;

                if (isFavorite) {
                    favoriteIds.delete(articleId);
                } else {
                    favoriteIds.add(articleId);
                }

                return { favorites, favoriteIds };
            });

            return { previous };
        },
        onError: (_err, _vars, context) => {
            toast.error("Impossible de modifier les favoris.");
            if (context?.previous) {
                queryClient.setQueryData(["favorites"], context.previous);
            }
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ["favorites"] });
        },
    });
}

export function useDeleteArticle(articleId: string) {
    return useMutation({
        mutationKey: ["deleteArticle", articleId],
        mutationFn: async () => {
            return await api.delete(`/articles/${articleId}`);
        },
        onSuccess: () => {
            toast.success("Annonce supprimée.");
        },
        onMutate: async () => {
            await Promise.all([
                queryClient.cancelQueries({ queryKey: ["articles"] }),
                queryClient.cancelQueries({ queryKey: ["myArticles"] }),
                queryClient.cancelQueries({ queryKey: ["favorites"] }),
            ]);

            const previousMyArticles = queryClient.getQueryData<Article[]>([
                "myArticles",
            ]);
            const previousFavorites = queryClient.getQueryData<FavoritesCache>([
                "favorites",
            ]);

            const removeArticle = (articles: Article[] | undefined) =>
                articles?.filter((a) => a.id !== articleId);

            queryClient.setQueriesData<Article[]>(
                { queryKey: ["articles"] },
                removeArticle,
            );
            queryClient.setQueryData<Article[]>(["myArticles"], removeArticle);
            queryClient.setQueryData<FavoritesCache>(["favorites"], (old) => {
                if (!old) return old;
                const favoriteIds = new Set(old.favoriteIds);
                favoriteIds.delete(articleId);
                return {
                    favorites: old.favorites.filter((a) => a.id !== articleId),
                    favoriteIds,
                };
            });

            return { previousMyArticles, previousFavorites };
        },
        onError: (_err, _vars, context) => {
            toast.error("Impossible de supprimer l'annonce.");
            if (context?.previousMyArticles) {
                queryClient.setQueryData(
                    ["myArticles"],
                    context.previousMyArticles,
                );
            }
            if (context?.previousFavorites) {
                queryClient.setQueryData(
                    ["favorites"],
                    context.previousFavorites,
                );
            }
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ["articles"] });
            queryClient.invalidateQueries({ queryKey: ["myArticles"] });
            queryClient.invalidateQueries({ queryKey: ["favorites"] });
        },
    });
}
