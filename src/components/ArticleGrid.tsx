import { ArticleCard } from "@/components/ArticleCard";
import type { Article } from "@/types/article";

interface ArticleGridProps {
    articles: Article[];
    favoriteIds: Set<string>;
    onToggleFavorite: (articleId: string) => void;
}

export function ArticleGrid({
    articles,
    favoriteIds,
    onToggleFavorite,
}: ArticleGridProps) {
    return (
        <div className="grid w-full auto-rows-fr grid-cols-1 gap-4 p-1 md:grid-cols-2 lg:grid-cols-3">
            {articles.map((article) => (
                <ArticleCard
                    key={article.id}
                    article={article}
                    isFavorite={favoriteIds.has(article.id)}
                    onToggleFavorite={() => onToggleFavorite(article.id)}
                />
            ))}
        </div>
    );
}
