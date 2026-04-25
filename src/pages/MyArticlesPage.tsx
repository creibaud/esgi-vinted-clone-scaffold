import { Link, useNavigate } from "react-router-dom";
import {
    Calendar03Icon,
    Delete01Icon,
    PencilEdit01Icon,
    PlusSignIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArticleImage } from "@/components/ArticleImage";
import { ErrorMessage } from "@/components/ErrorMessage";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
    Empty,
    EmptyDescription,
    EmptyHeader,
    EmptyTitle,
} from "@/components/ui/empty";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { useDeleteArticle, useMyArticles } from "@/hooks/article.hooks";
import { findCategoryLabel, findConditionLabel } from "@/lib/article";
import { formatDate, formatPrice } from "@/lib/formatters";
import type { Article } from "@/types/article";

export default function MyArticlesPage() {
    const navigate = useNavigate();
    const { data: articles, isLoading, isError } = useMyArticles();

    if (isLoading) return <LoadingSpinner />;

    if (isError) {
        return (
            <ErrorMessage
                title="Erreur de chargement"
                message="Impossible de récupérer vos annonces."
            />
        );
    }

    return (
        <div className="flex h-full flex-col gap-4">
            <div className="flex items-center justify-between gap-3 px-4">
                <div className="min-w-0">
                    <h1 className="truncate text-2xl font-bold">
                        Mes annonces
                    </h1>
                    {articles && articles.length > 0 && (
                        <p className="text-muted-foreground text-sm">
                            {articles.length} annonce
                            {articles.length > 1 ? "s" : ""} en ligne
                        </p>
                    )}
                </div>
                <Button asChild className="shrink-0">
                    <Link to="/publish">
                        <HugeiconsIcon
                            icon={PlusSignIcon}
                            data-icon="inline-start"
                        />
                        <span className="hidden sm:inline">
                            Publier une annonce
                        </span>
                        <span className="sm:hidden">Publier</span>
                    </Link>
                </Button>
            </div>

            <ScrollArea className="min-h-0 flex-1 px-4">
                {!articles || articles.length === 0 ? (
                    <Empty>
                        <EmptyHeader>
                            <EmptyTitle>Aucune annonce</EmptyTitle>
                            <EmptyDescription>
                                Vous n'avez pas encore d'annonces.
                            </EmptyDescription>
                        </EmptyHeader>
                        <Button asChild>
                            <Link to="/publish">
                                <HugeiconsIcon
                                    icon={PlusSignIcon}
                                    data-icon="inline-start"
                                />
                                Publier mon premier article
                            </Link>
                        </Button>
                    </Empty>
                ) : (
                    <div className="flex flex-col gap-4 p-2 pb-4">
                        {articles.map((article) => (
                            <ArticleRow
                                key={article.id}
                                article={article}
                                onEdit={() =>
                                    navigate(`/articles/${article.id}/edit`)
                                }
                            />
                        ))}
                    </div>
                )}
            </ScrollArea>
        </div>
    );
}

interface ArticleRowProps {
    readonly article: Article;
    readonly onEdit: () => void;
}

function ArticleRow({ article, onEdit }: ArticleRowProps) {
    const { mutate: deleteArticle, isPending } = useDeleteArticle(article.id);

    const categoryLabel = findCategoryLabel({ category: article.category });
    const conditionLabel = findConditionLabel({ condition: article.condition });

    return (
        <Card className="group/row flex flex-col overflow-hidden py-0 transition-all hover:shadow-md sm:flex-row">
            <ArticleImage
                src={article.imageUrl}
                alt={article.title}
                className="h-48 w-full shrink-0 sm:h-auto sm:w-44"
            />

            <div className="flex flex-1 flex-col gap-3 p-4">
                <div className="flex items-start justify-between gap-2">
                    <div className="flex min-w-0 flex-col gap-0.5">
                        <h3 className="truncate text-base leading-tight font-semibold">
                            {article.title}
                        </h3>
                        <span className="text-lg font-bold text-green-600">
                            {formatPrice(article.price)}
                        </span>
                    </div>

                    <AlertDialog>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <AlertDialogTrigger asChild>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="text-muted-foreground hover:text-destructive shrink-0"
                                        disabled={isPending}
                                        aria-label="Supprimer l'annonce"
                                    >
                                        <HugeiconsIcon icon={Delete01Icon} />
                                    </Button>
                                </AlertDialogTrigger>
                            </TooltipTrigger>
                            <TooltipContent>Supprimer</TooltipContent>
                        </Tooltip>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>
                                    Supprimer cette annonce ?
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                    Cette action est irréversible. L'annonce
                                    sera retirée de vos annonces et des favoris.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Annuler</AlertDialogCancel>
                                <AlertDialogAction
                                    variant="destructive"
                                    onClick={() => deleteArticle()}
                                >
                                    Confirmer la suppression
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>

                <div className="flex flex-wrap gap-1.5">
                    <Badge variant="secondary">{categoryLabel}</Badge>
                    <Badge variant="outline">{conditionLabel}</Badge>
                    <Badge variant="outline">Taille {article.size}</Badge>
                </div>

                <p className="text-muted-foreground line-clamp-2 text-sm">
                    {article.description}
                </p>

                <div className="mt-auto flex items-center justify-between gap-2 pt-1">
                    <span className="text-muted-foreground inline-flex items-center gap-1.5 text-xs">
                        <HugeiconsIcon
                            icon={Calendar03Icon}
                            className="size-3.5"
                        />
                        {formatDate(article.createdAt)}
                    </span>
                    <Button onClick={onEdit} size="sm">
                        <HugeiconsIcon
                            icon={PencilEdit01Icon}
                            data-icon="inline-start"
                        />
                        Modifier
                    </Button>
                </div>
            </div>
        </Card>
    );
}
