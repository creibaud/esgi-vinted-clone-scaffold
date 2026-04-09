import { Link } from "react-router-dom";
import { FavouriteIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { findCategoryLabel, findConditionLabel } from "@/lib/article";
import { formatDate, formatPrice } from "@/lib/formatters";
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
    onViewDetail?: () => void;
}

export function ArticleCard({
    article,
    isFavorite,
    onToggleFavorite,
    onViewDetail,
}: ArticleCardProps) {
    const categoryLabel = findCategoryLabel({ category: article.category });
    const conditionLabel = findConditionLabel({ condition: article.condition });

    return (
        <Card className="overflow-hidden py-0">
            <div className="relative">
                <img
                    src={article.imageUrl}
                    alt={article.title}
                    className="h-60 w-full object-cover"
                />
                <Toggle
                    className="bg-background/60 absolute top-2 right-2 h-9 w-9 rounded-full shadow-md backdrop-blur-sm"
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
                        className="text-foreground size-4 fill-transparent transition group-data-[state=on]/toggle:fill-red-500 group-data-[state=on]/toggle:text-red-500"
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
            <CardContent>
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
                <Button onClick={onViewDetail} asChild>
                    <Link to={`/articles/${article.id}`}>Voir l'article</Link>
                </Button>
            </CardFooter>
        </Card>
    );
}
