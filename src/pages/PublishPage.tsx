import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArticleForm } from "@/components/ArticleForm";
import { useCreateArticle } from "@/hooks/article.hooks";
import { useDraftForm } from "@/hooks/useDraftForm";
import type { ArticleFormData } from "@/types/article";

export default function PublishPage() {
    const navigate = useNavigate();
    const { mutateAsync: createArticle, isPending } = useCreateArticle();
    // on récupère le brouillon sauvegardé s'il existe
    const { savedValues, saveDraft, clearDraft } = useDraftForm();

    // sauvegarde automatique du brouillon toutes les 2 secondes
    // via un polling sur localStorage (approche simple sans modifier ArticleForm)
    useEffect(() => {
        const interval = setInterval(() => {
            const stored = localStorage.getItem("article-draft");
            if (stored) saveDraft(JSON.parse(stored) as Partial<ArticleFormData>);
        }, 2000);
        return () => clearInterval(interval);
    }, [saveDraft]);

    async function handleSubmit(data: ArticleFormData) {
        // sauvegarde finale puis suppression du brouillon après publication
        const article = await createArticle(data);
        clearDraft();
        navigate(`/articles/${article.id}`);
    }

    return (
        <div className="flex flex-col gap-6">
            <div>
                <h1 className="text-2xl font-bold">Publier une annonce</h1>
                <p className="text-muted-foreground mt-2">
                    Remplissez les informations de votre article.
                </p>
            </div>

            {/* defaultValues vient du brouillon si présent */}
            <ArticleForm
                onSubmit={handleSubmit}
                isLoading={isPending}
                defaultValues={savedValues ?? undefined}
            />
        </div>
    );
}