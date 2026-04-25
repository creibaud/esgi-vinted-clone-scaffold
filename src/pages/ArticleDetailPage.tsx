import { Link, useParams } from "react-router-dom";
import { toast } from "sonner";
import { ArticleImage } from "@/components/ArticleImage";
import { ErrorMessage } from "@/components/ErrorMessage";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { PageHeader } from "@/components/PageHeader";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useArticle } from "@/hooks/article.hooks";
import { useCurrentUserId } from "@/hooks/useCurrentUserId";
import { findCategoryLabel, findConditionLabel } from "@/lib/article";
import { formatDate, formatPrice } from "@/lib/formatters";

export default function ArticleDetailPage() {
    const { id } = useParams<{ id: string }>();
    const { data: article, isLoading, isError } = useArticle(id!);
    const currentUserId = useCurrentUserId();

    if (isLoading) return <LoadingSpinner />;

    if (isError || !article) {
        return (
            <div className="flex h-full flex-col">
                <PageHeader backTo="/" backLabel="Retour au catalogue" />
                <ErrorMessage
                    title="Article introuvable"
                    message="Cet article n'existe pas ou a été supprimé."
                />
            </div>
        );
    }

    const categoryLabel = findCategoryLabel({ category: article.category });
    const conditionLabel = findConditionLabel({ condition: article.condition });
    const isOwner = article.userId === currentUserId;
    const userInitial = article.userName.charAt(0).toUpperCase();

    return (
        <div className="flex h-full flex-col">
            <PageHeader backTo="/" backLabel="Retour au catalogue" />

            <ScrollArea className="min-h-0 flex-1">
                <div className="grid gap-4 p-4 md:grid-cols-2">
                    <ArticleImage
                        src={article.imageUrl}
                        alt={article.title}
                        className="w-full rounded-xl md:h-120"
                    />

                    <Card className="flex flex-col gap-0 py-0">
                        <CardContent className="flex flex-1 flex-col gap-5 p-6">
                            <div className="flex flex-col gap-1">
                                <h1 className="text-2xl leading-tight font-bold">
                                    {article.title}
                                </h1>
                                <span className="text-3xl font-bold text-green-600">
                                    {formatPrice(article.price)}
                                </span>
                            </div>

                            <div className="flex flex-wrap gap-2">
                                <Badge variant="secondary">
                                    {categoryLabel}
                                </Badge>
                                <Badge variant="outline">
                                    {conditionLabel}
                                </Badge>
                                <Badge variant="outline">
                                    Taille {article.size}
                                </Badge>
                            </div>

                            <p className="text-muted-foreground leading-relaxed">
                                {article.description}
                            </p>

                            <Separator />

                            <div className="flex items-center gap-3">
                                <Avatar className="size-10">
                                    <AvatarFallback>
                                        {userInitial}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="flex flex-col gap-0.5">
                                    <p className="text-sm font-medium">
                                        {article.userName}
                                    </p>
                                    <p className="text-muted-foreground text-sm">
                                        Publié le{" "}
                                        {formatDate(article.createdAt)}
                                    </p>
                                </div>
                            </div>

                            {isOwner ? (
                                <Button
                                    asChild
                                    variant="outline"
                                    className="mt-auto w-full"
                                    size="lg"
                                >
                                    <Link to={`/articles/${article.id}/edit`}>
                                        Modifier mon annonce
                                    </Link>
                                </Button>
                            ) : (
                                <Button
                                    className="mt-auto w-full"
                                    size="lg"
                                    onClick={() =>
                                        toast.info(
                                            "La messagerie n'est pas encore disponible.",
                                        )
                                    }
                                >
                                    Contacter le vendeur
                                </Button>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </ScrollArea>
        </div>
    );
}
