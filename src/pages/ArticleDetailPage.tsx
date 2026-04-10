import { Link, useParams } from "react-router-dom";
import { ArrowLeft01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { ErrorMessage } from "@/components/ErrorMessage";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useArticle } from "@/hooks/article.hooks";
import { findCategoryLabel, findConditionLabel } from "@/lib/article";
import { formatDate, formatPrice } from "@/lib/formatters";

export default function ArticleDetailPage() {
    // on récupère l'id depuis l'URL /articles/:id
    const { id } = useParams<{ id: string }>();
    const { data: article, isLoading, isError } = useArticle(id!);

    if (isLoading) return <LoadingSpinner />;

    if (isError || !article) {
        return (
            <ErrorMessage
                title="Article introuvable"
                message="Cet article n'existe pas ou a été supprimé."
            />
        );
    }

    const categoryLabel = findCategoryLabel({ category: article.category });
    const conditionLabel = findConditionLabel({ condition: article.condition });

    return (
        <div className="flex flex-col gap-6">
            {/* lien retour catalogue */}
            <Button variant="ghost" asChild className="w-fit">
                <Link to="/">
                    <HugeiconsIcon icon={ArrowLeft01Icon} className="mr-2 size-4" />
                    Retour au catalogue
                </Link>
            </Button>

            <div className="grid gap-6 md:grid-cols-2">
                <img
                    src={article.imageUrl}
                    alt={article.title}
                    className="w-full rounded-lg object-cover md:h-96"
                />

                <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1">
                        <h1 className="text-2xl font-bold">{article.title}</h1>
                        <span className="text-3xl font-bold text-green-600">
                            {formatPrice(article.price)}
                        </span>
                    </div>

                    {/* badges catégorie, état, taille */}
                    <div className="flex flex-wrap gap-2">
                        <Badge variant="secondary">{categoryLabel}</Badge>
                        <Badge variant="outline">{conditionLabel}</Badge>
                        <Badge variant="outline">Taille {article.size}</Badge>
                    </div>

                    <p className="text-muted-foreground leading-relaxed">
                        {article.description}
                    </p>

                    <div className="border-t pt-4">
                        <p className="text-sm font-medium">{article.userName}</p>
                        <p className="text-muted-foreground text-sm">
                            Publié le {formatDate(article.createdAt)}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}