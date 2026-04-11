import { useState } from "react";
import type { ArticleFormData } from "@/types/article";

const DRAFT_KEY = "article-draft";

export function saveDraft(values: Partial<ArticleFormData>) {
    localStorage.setItem(DRAFT_KEY, JSON.stringify(values));
}

export function clearDraft() {
    localStorage.removeItem(DRAFT_KEY);
}

export function useDraftForm() {
    const [savedValues] = useState<Partial<ArticleFormData> | null>(() => {
        try {
            const stored = localStorage.getItem(DRAFT_KEY);
            return stored
                ? (JSON.parse(stored) as Partial<ArticleFormData>)
                : null;
        } catch {
            return null;
        }
    });

    return { savedValues };
}
