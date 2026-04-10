import { Link, useNavigate } from "react-router-dom";
import { PencilEdit01Icon, Delete01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { ErrorMessage } from "@/components/ErrorMessage";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { useDeleteArticle, useMyArticles } from "@/hooks/article.hooks";
import { findCategoryLabel, findConditionLabel } from "@/lib/article";
import { formatDate, formatPrice } from "@/lib/formatters";

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

    // page vide : message + lien vers publication
    if (!articles || articles.length === 0) {
        return (
            <div className="flex flex-col items-center gap-4 py-16">
                <h1 className="text-2xl font-bold">Mes annonces</h1>
                <p className="text-muted-foreground">
                    Vous n'avez pas encore d'annonces.
                </p>
                <Button asChild>
                    <Link to="/publish">Publier mon premier article</Link>
                </Button>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-6">
            <h1 className="text-2xl font-bold">
                Mes annonces ({articles.length})
            </h1>

            <div className="flex flex-col gap-4">
                {articles.map((article) => (
                    <ArticleRow
                        key={article.id}
                        article={article}
                        onEdit={() => navigate(`/articles/${article.id}/edit`)}
                    />
                ))}
            </div>
        </div>
    );
}

// composant ligne pour chaque article avec actions delete/edit
function ArticleRow({
    article,
    onEdit,
}: {
    article: ReturnType<typeof useMyArticles>["data"] extends (infer T)[] | undefined ? T : never;
    onEdit: () => void;
}) {
    const { mutate: deleteArticle, isPending } = useDeleteArticle(article!.id);

    const categoryLabel = findCategoryLabel({ category: article!.category });
    const conditionLabel = findConditionLabel({ condition: article!.condition });

    function handleDelete() {
        // confirmation avant suppression comme demandé
        if (window.confirm("Supprimer cet article ?")) {
            deleteArticle();
        }
    }

    return (
        <Card className="flex flex-row overflow-hidden">
            <img
                src={article!.imageUrl}
                alt={article!.title}
                className="h-32 w-32 shrink-0 object-cover"
            />
            <div className="flex flex-1 flex-col">
                <CardHeader className="pb-2">
                    <CardTitle className="flex items-center justify-between text-base">
                        {article!.title}
                        <span className="text-green-600 font-bold">
                            {formatPrice(article!.price)}
                        </span>
                    </CardTitle>
                    <div className="flex gap-2">
                        <Badge variant="secondary">{categoryLabel}</Badge>
                        <Badge variant="outline">{conditionLabel}</Badge>
                    </div>
                </CardHeader>
                <CardContent className="pb-2 text-muted-foreground text-sm">
                    Publié le {formatDate(article!.createdAt)}
                </CardContent>
                <CardFooter className="gap-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={onEdit}
                    >
                        <HugeiconsIcon icon={PencilEdit01Icon} className="mr-1 size-4" />
                        Modifier
                    </Button>
                    <Button
                        variant="destructive"
                        size="sm"
                        onClick={handleDelete}
                        disabled={isPending}
                    >
                        <HugeiconsIcon icon={Delete01Icon} className="mr-1 size-4" />
                        {isPending ? "Suppression…" : "Supprimer"}
                    </Button>
                </CardFooter>
            </div>
        </Card>
    );
}