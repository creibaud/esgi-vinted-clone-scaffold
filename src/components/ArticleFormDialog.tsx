import { useState } from "react";
import { ArticleForm } from "@/components/ArticleForm";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
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

    async function handleSubmit(data: ArticleFormData) {
        await onSubmit(data);
        setOpen(false);
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="rounded-full bg-white px-4 py-1.5 font-semibold text-teal-700 hover:bg-teal-50">
                    Publier
                </Button>
            </DialogTrigger>
            <DialogContent className="max-h-[90vh] max-w-lg overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Publier une annonce</DialogTitle>
                    <DialogDescription>
                        Remplissez les informations de votre article.
                    </DialogDescription>
                </DialogHeader>
                <ArticleForm onSubmit={handleSubmit} isLoading={isLoading} />
            </DialogContent>
        </Dialog>
    );
}
