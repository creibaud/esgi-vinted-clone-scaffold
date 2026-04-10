import { Link, useNavigate } from "react-router-dom";
import { FavouriteIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { findCategoryLabel, findConditionLabel } from "@/lib/article";
import { formatDate, formatPrice } from "@/lib/formatters";
import { cn } from "@/lib/utils";
import type { Article } from "@/types/article";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "./ui/card";
import { Toggle } from "./ui/toggle";

interface ArticleCardProps {
    article: Article;
    isFavorite: boolean;
    onToggleFavorite: () => void;
}

export function ArticleCard({
    article,
    isFavorite,
    onToggleFavorite,
}: ArticleCardProps) {
    const navigate = useNavigate();

    const categoryLabel = findCategoryLabel({ category: article.category });
    const conditionLabel = findConditionLabel({ condition: article.condition });

    function onViewDetail() {
        navigate(`/articles/${article.id}`);
    }

    return (
        <Card
            className="group flex h-full cursor-pointer flex-col overflow-hidden py-0 transition-shadow duration-200 hover:shadow-lg"
            onClick={onViewDetail}
        >
            <div className="relative overflow-hidden">
                <img
                    src={article.imageUrl}
                    alt={article.title}
                    className="h-60 w-full object-cover transition-transform duration-500 ease-out will-change-transform group-hover:scale-105"
                />
                <Toggle
                    className="bg-background/70 absolute top-2 right-2 h-9 w-9 rounded-full shadow-md backdrop-blur-sm"
                    pressed={isFavorite}
                    onPressedChange={onToggleFavorite}
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
                                : "text-foreground fill-transparent",
                        )}
                    />
                </Toggle>
                <div className="absolute bottom-2 left-2 flex gap-1.5">
                    <Badge variant="secondary" className="text-xs">
                        {categoryLabel}
                    </Badge>
                    <Badge
                        variant="outline"
                        className="bg-background/70 text-xs backdrop-blur-sm"
                    >
                        {article.size}
                    </Badge>
                </div>
            </div>
            <CardHeader>
                <CardTitle className="flex items-center justify-between font-semibold">
                    {article.title}
                    <span className="shrink-0 text-base font-bold">
                        {formatPrice(article.price)}
                    </span>
                </CardTitle>
                <Badge variant="secondary" className="text-xs font-normal">
                    {conditionLabel}
                </Badge>
            </CardHeader>
            <CardContent className="flex-1">
                <CardDescription>{article.description}</CardDescription>
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
                    className="opacity-0 transition-all duration-200 group-hover:opacity-100"
                    onClick={onViewDetail}
                >
                    Voir l'article
                </Button>
            </CardFooter>
        </Card>
    );
}
