import { Button } from "@/components/ui/button";
import { FieldGroup } from "@/components/ui/field";
import { useAppForm } from "@/hooks/form.hooks";
import {
    CATEGORY_OPTIONS,
    CONDITION_OPTIONS,
    SIZE_OPTIONS,
} from "@/lib/article";
import { articleFormDataSchema, type ArticleFormData } from "@/types/article";

interface ArticleFormProps {
    defaultValues?: Partial<ArticleFormData>;
    onSubmit: (data: ArticleFormData) => Promise<void>;
    isLoading?: boolean;
}

export function ArticleForm({
    defaultValues,
    onSubmit,
    isLoading = false,
}: ArticleFormProps) {
    const form = useAppForm({
        defaultValues: {
            title: defaultValues?.title ?? "",
            description: defaultValues?.description ?? "",
            price: defaultValues?.price ?? 0,
            category: defaultValues?.category ?? "",
            size: defaultValues?.size ?? "",
            condition: defaultValues?.condition ?? "",
            imageUrl: defaultValues?.imageUrl ?? "",
        },
        validators: {
            onSubmit: articleFormDataSchema.parse,
        },
        onSubmit: async ({ value }) => {
            await onSubmit(value as ArticleFormData);
        },
    });

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                form.handleSubmit();
            }}
            noValidate
        >
            <FieldGroup>
                <form.AppField
                    name="title"
                    children={(field) => (
                        <field.TextField
                            label="Titre"
                            placeholder="Ex : Veste en jean taille M"
                        />
                    )}
                />

                <form.AppField
                    name="description"
                    children={(field) => (
                        <field.TextareaField
                            label="Description"
                            placeholder="Décrivez votre article : état, couleur, marque…"
                            rows={4}
                        />
                    )}
                />

                <form.AppField
                    name="price"
                    children={(field) => (
                        <field.NumberField
                            label="Prix (€)"
                            placeholder="0.00"
                            min={0}
                            step={0.01}
                        />
                    )}
                />

                <form.AppField
                    name="category"
                    children={(field) => (
                        <field.SelectField
                            label="Catégorie"
                            options={CATEGORY_OPTIONS}
                        />
                    )}
                />

                <form.AppField
                    name="size"
                    children={(field) => (
                        <field.SelectField
                            label="Taille"
                            options={SIZE_OPTIONS}
                        />
                    )}
                />

                <form.AppField
                    name="condition"
                    children={(field) => (
                        <field.SelectField
                            label="État"
                            options={CONDITION_OPTIONS}
                        />
                    )}
                />

                <form.AppField
                    name="imageUrl"
                    children={(field) => (
                        <field.TextField
                            label="URL de l'image"
                            placeholder="https://… ou /images/photo.jpg"
                        />
                    )}
                />
            </FieldGroup>

            <div className="mt-6 flex justify-end gap-3">
                <Button
                    type="button"
                    variant="outline"
                    onClick={() => form.reset()}
                    disabled={isLoading}
                >
                    Réinitialiser
                </Button>
                <Button type="submit" disabled={isLoading}>
                    {isLoading ? "Envoi…" : "Publier"}
                </Button>
            </div>
        </form>
    );
}
