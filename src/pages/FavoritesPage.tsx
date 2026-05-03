import { Link, useNavigate } from "react-router-dom";
import { FavouriteIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArticleImage } from "@/components/ArticleImage";
import { ErrorMessage } from "@/components/ErrorMessage";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { Button } from "@/components/ui/button";
import {
    Empty,
    EmptyDescription,
    EmptyHeader,
    EmptyTitle,
} from "@/components/ui/empty";
import {
    Item,
    ItemActions,
    ItemContent,
    ItemDescription,
    ItemGroup,
    ItemMedia,
    ItemTitle,
} from "@/components/ui/item";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { useFavoriteArticles, useToggleFavorite } from "@/hooks/article.hooks";
import { formatPrice } from "@/lib/formatters";
import type { Article } from "@/types/article";

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

    function handleRemoveFavorite(articleId: string) {
        toggleFavorite({ articleId, isFavorite: true });
    }

    return (
        <div className="flex h-full flex-col gap-4">
            <div className="px-4">
                <h1 className="text-2xl font-bold">
                    {favorites.length > 0
                        ? `Mes favoris (${favorites.length})`
                        : "Mes favoris"}
                </h1>
            </div>

            <ScrollArea className="min-h-0 flex-1 px-4">
                {favorites.length === 0 ? (
                    <Empty>
                        <EmptyHeader>
                            <EmptyTitle>Aucun favori</EmptyTitle>
                            <EmptyDescription>
                                Vous n'avez pas encore ajouté d'articles à vos
                                favoris.
                            </EmptyDescription>
                        </EmptyHeader>
                        <Button asChild>
                            <Link to="/">Découvrir le catalogue</Link>
                        </Button>
                    </Empty>
                ) : (
                    <ItemGroup className="p-1 pb-4">
                        {favorites.map((article) => (
                            <FavoriteItem
                                key={article.id}
                                article={article}
                                onRemove={() =>
                                    handleRemoveFavorite(article.id)
                                }
                            />
                        ))}
                    </ItemGroup>
                )}
            </ScrollArea>
        </div>
    );
}

interface FavoriteItemProps {
    readonly article: Article;
    readonly onRemove: () => void;
}

function FavoriteItem({ article, onRemove }: FavoriteItemProps) {
    const navigate = useNavigate();

    return (
        <Item
            variant="outline"
            className="hover:bg-muted/50 cursor-pointer"
            onClick={() => navigate(`/articles/${article.id}`)}
        >
            <ItemMedia variant="image" className="size-14 rounded-md">
                <ArticleImage
                    src={article.imageUrl}
                    alt={article.title}
                    className="size-full"
                />
            </ItemMedia>
            <ItemContent>
                <ItemTitle className="text-muted-foreground">
                    {article.title}
                </ItemTitle>
                <ItemDescription>{formatPrice(article.price)}</ItemDescription>
            </ItemContent>
            <ItemActions>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="text-red-500 hover:text-red-600"
                            onClick={(e) => {
                                e.stopPropagation();
                                onRemove();
                            }}
                            aria-label="Retirer des favoris"
                        >
                            <HugeiconsIcon
                                icon={FavouriteIcon}
                                className="size-5 fill-red-500"
                            />
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>Retirer des favoris</TooltipContent>
                </Tooltip>
            </ItemActions>
        </Item>
    );
}
