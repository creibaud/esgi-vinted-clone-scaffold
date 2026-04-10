import { Link } from "react-router-dom";
import { ErrorMessage } from "@/components/ErrorMessage";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { ArticleGrid } from "@/components/ArticleGrid";
import { Button } from "@/components/ui/button";
import {
    useFavoriteArticles,
    useToggleFavorite,
} from "@/hooks/article.hooks";

export default function FavoritesPage() {
    const { data: favoritesData, isLoading, isError } = useFavoriteArticles();
    const { mutate: toggleFavorite } = useToggleFavorite();

    if (isLoading) return <LoadingSpinner />;

    if (isError) {
        return (
            <ErrorMessage
                title="Erreur de chargement"
                message="Impossible de récupérer vos favoris."
            />
        );
    }

    const favorites = favoritesData?.favorites ?? [];
    const favoriteIds = favoritesData?.favoriteIds ?? new Set<string>();

    function handleToggleFavorite(articleId: string) {
        toggleFavorite({ articleId, isFavorite: favoriteIds.has(articleId) });
    }

    // liste vide
    if (favorites.length === 0) {
        return (
            <div className="flex flex-col items-center gap-4 py-16">
                <h1 className="text-2xl font-bold">Mes favoris</h1>
                <p className="text-muted-foreground">
                    Vous n'avez pas encore de favoris.
                </p>
                <Button asChild>
                    <Link to="/">Découvrir le catalogue</Link>
                </Button>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-6">
            <h1 className="text-2xl font-bold">
                Mes favoris ({favorites.length})
            </h1>

            {/* on réutilise ArticleGrid avec les favoris */}
            <ArticleGrid
                articles={favorites}
                favoriteIds={favoriteIds}
                onToggleFavorite={handleToggleFavorite}
            />
        </div>
    );
}