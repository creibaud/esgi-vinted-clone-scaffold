import { useNavigate } from "react-router-dom";
import { FavouriteIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArticleImage } from "@/components/ArticleImage";
import { findCategoryLabel, findConditionLabel } from "@/lib/article";
import { formatDate, formatPrice } from "@/lib/formatters";
import { cn } from "@/lib/utils";
import type { Article } from "@/types/article";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "./ui/card";
import { Toggle } from "./ui/toggle";

interface ArticleCardProps {
    readonly article: Article;
    readonly isFavorite: boolean;
    readonly onToggleFavorite: () => void;
}

export function ArticleCard({
    article,
    isFavorite,
    onToggleFavorite,
}: ArticleCardProps) {
    const navigate = useNavigate();

    const categoryLabel = findCategoryLabel({ category: article.category });
    const conditionLabel = findConditionLabel({ condition: article.condition });

    function handleViewDetail() {
        navigate(`/articles/${article.id}`);
    }

    return (
        <Card
            className="group flex h-full cursor-pointer flex-col overflow-hidden py-0 transition-all duration-200 hover:shadow-md"
            onClick={handleViewDetail}
        >
            <div className="relative overflow-hidden">
                <ArticleImage
                    src={article.imageUrl}
                    alt={article.title}
                    className="h-56 w-full transition-transform duration-500 ease-out will-change-transform group-hover:scale-105"
                />

                <Toggle
                    className="bg-background/80 absolute top-2 right-2 h-8 w-8 rounded-full backdrop-blur-sm"
                    pressed={isFavorite}
                    onPressedChange={onToggleFavorite}
                    onClick={(e) => e.stopPropagation()}
                    variant="outline"
                    aria-label={
                        isFavorite
                            ? "Retirer des favoris"
                            : "Ajouter aux favoris"
                    }
                >
                    <HugeiconsIcon
                        icon={FavouriteIcon}
                        className={cn(
                            "size-4 transition",
                            isFavorite
                                ? "fill-red-500 text-red-500"
                                : "fill-transparent",
                        )}
                    />
                </Toggle>

                <div className="absolute bottom-2 left-2 flex gap-1.5">
                    <Badge
                        variant="outline"
                        className="bg-background text-xs shadow-sm backdrop-blur-sm"
                    >
                        {categoryLabel}
                    </Badge>
                    <Badge
                        variant="outline"
                        className="bg-background text-xs shadow-sm backdrop-blur-sm"
                    >
                        {article.size}
                    </Badge>
                    <Badge
                        variant="outline"
                        className="bg-background text-xs shadow-sm backdrop-blur-sm"
                    >
                        {conditionLabel}
                    </Badge>
                </div>
            </div>

            <CardHeader className="pb-1">
                <CardTitle className="text-sm leading-snug font-semibold">
                    {article.title}
                </CardTitle>
                <span className="text-base font-bold text-green-600">
                    {formatPrice(article.price)}
                </span>
            </CardHeader>

            <CardContent className="flex-1 pb-2">
                <p className="text-muted-foreground line-clamp-2 text-xs leading-relaxed">
                    {article.description}
                </p>
            </CardContent>

            <CardFooter className="flex items-center justify-between px-4 py-3">
                <div className="flex flex-col">
                    <span className="text-xs font-medium">
                        {article.userName}
                    </span>
                    <span className="text-muted-foreground text-xs">
                        {formatDate(article.createdAt)}
                    </span>
                </div>
                <Button
                    className="hidden transition-all duration-200 sm:block sm:opacity-0 sm:group-hover:opacity-100"
                    onClick={(e) => e.stopPropagation()}
                >
                    Voir
                </Button>
            </CardFooter>
        </Card>
    );
}
