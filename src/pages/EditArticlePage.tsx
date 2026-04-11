import { useNavigate, useParams } from "react-router-dom";
import { ArticleForm } from "@/components/ArticleForm";
import { ErrorMessage } from "@/components/ErrorMessage";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { PageHeader } from "@/components/PageHeader";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useArticle, useUpdateArticle } from "@/hooks/article.hooks";
import { useCurrentUserId } from "@/hooks/useCurrentUserId";
import type { ArticleFormData } from "@/types/article";

export default function EditArticlePage() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const currentUserId = useCurrentUserId();
    const {
        data: article,
        isLoading,
        isError,
        isSuccess,
    } = useArticle(id ?? "");
    const { mutateAsync: updateArticle, isPending } = useUpdateArticle(
        id ?? "",
    );

    if (isLoading) return <LoadingSpinner />;

    if (isError || !isSuccess) {
        return (
            <ErrorMessage
                title="Article introuvable"
                message="Cet article n'existe pas ou a été supprimé."
            />
        );
    }

    if (article.userId !== currentUserId) {
        return (
            <ErrorMessage
                title="Accès refusé"
                message="Vous n'êtes pas le propriétaire de cette annonce."
            />
        );
    }

    async function handleSubmit(data: ArticleFormData) {
        await updateArticle(data);
        navigate(`/articles/${id}`);
    }

    return (
        <div className="flex h-full flex-col gap-4">
            <PageHeader
                backTo={`/articles/${id}`}
                backLabel="Retour à l'annonce"
                title="Modifier l'annonce"
                description="Mettez à jour les informations de votre article."
            />

            <ScrollArea className="min-h-0 flex-1 px-4">
                <div className="pb-4">
                    <ArticleForm
                        onSubmit={handleSubmit}
                        isLoading={isPending}
                        defaultValues={article}
                        submitLabel="Mettre à jour"
                    />
                </div>
            </ScrollArea>
        </div>
    );
}
