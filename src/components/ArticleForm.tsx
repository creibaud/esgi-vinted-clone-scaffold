import { type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { FieldGroup } from "@/components/ui/field";
import { useAppForm } from "@/hooks/form.hooks";
import {
    CATEGORY_OPTIONS,
    CONDITION_OPTIONS,
    SIZE_OPTIONS,
} from "@/lib/article";
import { articleFormDataSchema, type ArticleFormData } from "@/types/article";

interface ArticleFormActions {
    reset: () => void;
    isLoading: boolean;
}

interface ArticleFormProps {
    id?: string;
    defaultValues?: Partial<ArticleFormData>;
    onSubmit: (data: ArticleFormData) => Promise<void>;
    isLoading?: boolean;
    submitLabel?: string;
    onValuesChange?: (values: Partial<ArticleFormData>) => void;
    renderActions?: (actions: ArticleFormActions) => ReactNode;
}

export function ArticleForm({
    id,
    defaultValues,
    onSubmit,
    isLoading = false,
    submitLabel = "Publier",
    onValuesChange,
    renderActions,
}: ArticleFormProps) {
    const form = useAppForm({
        defaultValues: {
            title: defaultValues?.title ?? "",
            description: defaultValues?.description ?? "",
            price: defaultValues?.price ?? 0,
            category: (defaultValues?.category ?? "") as string,
            size: (defaultValues?.size ?? "") as string,
            condition: (defaultValues?.condition ?? "") as string,
            imageUrl: defaultValues?.imageUrl ?? "",
        },
        validators: {
            onChange: onValuesChange
                ? ({ value }) => {
                      onValuesChange(value as Partial<ArticleFormData>);
                  }
                : undefined,
            onSubmit: articleFormDataSchema,
        },
        onSubmit: async ({ value }) => {
            await onSubmit(value as ArticleFormData);
        },
    });

    const defaultActions = (
        <div className="mt-6 flex justify-end gap-3">
            <Button
                type="button"
                variant="outline"
                onClick={() => form.reset()}
                disabled={isLoading}
            >
                Réinitialiser
            </Button>
            <Button type="submit" form={id} disabled={isLoading}>
                {isLoading ? "Envoi…" : submitLabel}
            </Button>
        </div>
    );

    return (
        <form
            id={id}
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

            {renderActions
                ? renderActions({ reset: form.reset, isLoading })
                : defaultActions}
        </form>
    );
}
