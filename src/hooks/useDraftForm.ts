import { useState } from "react";
import type { ArticleFormData } from "@/types/article";

// clé utilisée dans le localStorage pour stocker le brouillon
const DRAFT_KEY = "article-draft";

export function useDraftForm() {
    // on lit le brouillon au montage si il existe
    const [savedValues] = useState<Partial<ArticleFormData> | null>(() => {
        try {
            const stored = localStorage.getItem(DRAFT_KEY);
            return stored ? (JSON.parse(stored) as Partial<ArticleFormData>) : null;
        } catch {
            return null;
        }
    });

    // sauvegarde automatique à chaque changement de valeur
    function saveDraft(values: Partial<ArticleFormData>) {
        localStorage.setItem(DRAFT_KEY, JSON.stringify(values));
    }

    // supprime le brouillon après publication réussie
    function clearDraft() {
        localStorage.removeItem(DRAFT_KEY);
    }

    return { savedValues, saveDraft, clearDraft };
}