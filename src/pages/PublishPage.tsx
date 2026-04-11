import { useNavigate } from "react-router-dom";
import { ArticleForm } from "@/components/ArticleForm";
import { PageHeader } from "@/components/PageHeader";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useCreateArticle } from "@/hooks/article.hooks";
import { clearDraft, saveDraft, useDraftForm } from "@/hooks/useDraftForm";
import type { ArticleFormData } from "@/types/article";

export default function PublishPage() {
    const navigate = useNavigate();
    const { mutateAsync: createArticle, isPending } = useCreateArticle();
    const { savedValues } = useDraftForm();

    async function handleSubmit(data: ArticleFormData) {
        const article = await createArticle(data);
        clearDraft();
        navigate(`/articles/${article.id}`);
    }

    return (
        <div className="flex h-full flex-col gap-4">
            <PageHeader
                backTo="/"
                backLabel="Retour au catalogue"
                title="Publier une annonce"
                description="Remplissez les informations de votre article."
            />

            <ScrollArea className="min-h-0 flex-1 px-4">
                <div className="pb-4">
                    <ArticleForm
                        onSubmit={handleSubmit}
                        isLoading={isPending}
                        defaultValues={savedValues ?? undefined}
                        onValuesChange={saveDraft}
                    />
                </div>
            </ScrollArea>
        </div>
    );
}
