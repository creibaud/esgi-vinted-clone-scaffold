import { Link, useNavigate } from "react-router-dom";
import { Delete01Icon, PencilEdit01Icon } from "@hugeicons/core-free-icons";
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
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Empty,
    EmptyDescription,
    EmptyHeader,
    EmptyTitle,
} from "@/components/ui/empty";
import { ScrollArea } from "@/components/ui/scroll-area";
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
            <div className="flex items-center justify-between px-4">
                <h1 className="text-2xl font-bold">
                    {`Mes annonces${articles?.length ? ` (${articles.length})` : ""}`}
                </h1>
                <Button asChild>
                    <Link to="/publish">Publier une annonce</Link>
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
                                Publier mon premier article
                            </Link>
                        </Button>
                    </Empty>
                ) : (
                    <div className="flex flex-col gap-4 pb-4">
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
        <Card className="flex flex-row overflow-hidden py-0">
            <ArticleImage
                src={article.imageUrl}
                alt={article.title}
                className="h-36 w-36 shrink-0"
            />
            <div className="flex flex-1 flex-col">
                <CardHeader className="pb-2">
                    <CardTitle className="flex items-center justify-between text-base">
                        {article.title}
                        <span className="font-bold text-green-600">
                            {formatPrice(article.price)}
                        </span>
                    </CardTitle>
                    <div className="flex gap-2">
                        <Badge variant="secondary">{categoryLabel}</Badge>
                        <Badge variant="outline">{conditionLabel}</Badge>
                    </div>
                </CardHeader>
                <CardContent className="text-muted-foreground pb-2 text-sm">
                    Publié le {formatDate(article.createdAt)}
                </CardContent>
                <CardFooter className="gap-2">
                    <Button variant="outline" onClick={onEdit}>
                        <HugeiconsIcon
                            icon={PencilEdit01Icon}
                            className="mr-1 size-4"
                        />
                        Modifier
                    </Button>
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button variant="destructive" disabled={isPending}>
                                <HugeiconsIcon
                                    icon={Delete01Icon}
                                    className="mr-1 size-4"
                                />
                                {isPending ? "Suppression…" : "Supprimer"}
                            </Button>
                        </AlertDialogTrigger>
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
                </CardFooter>
            </div>
        </Card>
    );
}
