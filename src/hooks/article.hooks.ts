import { useQuery } from "@tanstack/react-query";
import { api } from "@/services/api";
import type { Article, ArticleFilters } from "@/types/article";

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
