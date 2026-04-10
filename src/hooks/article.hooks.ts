import { useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useCurrentUserId } from "@/hooks/useCurrentUserId";
import { queryClient } from "@/lib/tanstack-query";
import { api } from "@/services/api";
import type { Article, ArticleFilters, ArticleFormData } from "@/types/article";

export function useArticles(params?: ArticleFilters) {
    return useQuery({
        queryKey: ["articles", params],
        queryFn: async () => {
            const queryParams = new URLSearchParams(
                params as Record<string, string>,
            ).toString();

            const isEmptyQuery = !params || Object.keys(params).length === 0;
            const url = isEmptyQuery ? "/articles" : `/articles?${queryParams}`;
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
        mutationFn: async (data: ArticleFormData) => {
            return await api.post<Article>("/articles", data);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["articles"] });
            queryClient.invalidateQueries({ queryKey: ["myArticles"] });
        },
    });
}

export function useUpdateArticle(articleId: string) {
    return useMutation({
        mutationFn: async (data: ArticleFormData) => {
            return await api.put<Article>(`/articles/${articleId}`, data);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["articles"] });
            queryClient.invalidateQueries({ queryKey: ["myArticles"] });
            queryClient.invalidateQueries({ queryKey: ["article", articleId] });
        },
    });
}

export function useDeleteArticle(articleId: string) {
    return useMutation({
        mutationFn: async () => {
            return await api.delete(`/articles/${articleId}`);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["articles"] });
            queryClient.invalidateQueries({ queryKey: ["myArticles"] });
            queryClient.invalidateQueries({ queryKey: ["favorites"] });
        },
    });
}
