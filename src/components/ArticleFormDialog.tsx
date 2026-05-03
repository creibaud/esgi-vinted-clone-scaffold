import { useState } from "react";
import { ArticleForm } from "@/components/ArticleForm";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import type { ArticleFormData } from "@/types/article";

interface ArticleFormDialogProps {
    onSubmit: (data: ArticleFormData) => Promise<void>;
    isLoading?: boolean;
}

export function ArticleFormDialog({
    onSubmit,
    isLoading = false,
}: ArticleFormDialogProps) {
    const [open, setOpen] = useState(false);
    const [formInstance, setFormInstance] = useState(0);

    async function handleSubmit(data: ArticleFormData) {
        await onSubmit(data);
        setOpen(false);
    }

    function handleOpenChange(nextOpen: boolean) {
        setOpen(nextOpen);
        if (!nextOpen) {
            setFormInstance((n) => n + 1);
        }
    }

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogTrigger asChild>
                <Button>Publier</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Publier une annonce</DialogTitle>
                    <DialogDescription>
                        Remplissez les informations de votre article.
                    </DialogDescription>
                </DialogHeader>
                <div className="no-scrollbar -mx-4 max-h-[50vh] overflow-y-auto px-4 pb-1">
                    <ArticleForm
                        key={formInstance}
                        id="article-form"
                        onSubmit={handleSubmit}
                        isLoading={isLoading}
                        renderActions={() => null}
                    />
                </div>
                <DialogFooter>
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => setOpen(false)}
                        disabled={isLoading}
                    >
                        Annuler
                    </Button>
                    <Button
                        type="submit"
                        form="article-form"
                        disabled={isLoading}
                    >
                        {isLoading ? "Envoi…" : "Publier"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
