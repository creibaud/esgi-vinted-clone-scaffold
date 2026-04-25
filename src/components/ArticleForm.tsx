import { type ReactNode } from "react";
import { ArrowReloadHorizontalIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Button } from "@/components/ui/button";
import { FieldGroup, FieldLegend, FieldSet } from "@/components/ui/field";
import { Spinner } from "@/components/ui/spinner";
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
    onReset?: () => void;
    resetEmpty?: boolean;
    renderActions?: (actions: ArticleFormActions) => ReactNode;
}

const EMPTY_VALUES = {
    title: "",
    description: "",
    price: 0,
    category: "",
    size: "",
    condition: "",
    imageUrl: "",
};

export function ArticleForm({
    id,
    defaultValues,
    onSubmit,
    isLoading = false,
    submitLabel = "Publier",
    onValuesChange,
    onReset,
    resetEmpty = false,
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

    function handleReset() {
        if (resetEmpty) {
            form.reset(EMPTY_VALUES);
        } else {
            form.reset();
        }
        onReset?.();
    }

    const defaultActions = (
        <div className="mt-2 flex items-center justify-end gap-2">
            <Button
                type="button"
                variant="ghost"
                onClick={handleReset}
                disabled={isLoading}
            >
                <HugeiconsIcon
                    icon={ArrowReloadHorizontalIcon}
                    data-icon="inline-start"
                />
                Réinitialiser
            </Button>
            <Button type="submit" form={id} disabled={isLoading}>
                {isLoading && <Spinner data-icon="inline-start" />}
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
                <FieldSet>
                    <FieldLegend>Informations générales</FieldLegend>
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
                    </FieldGroup>
                </FieldSet>

                <FieldSet>
                    <FieldLegend>Détails du produit</FieldLegend>
                    <FieldGroup>
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
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
                                name="size"
                                children={(field) => (
                                    <field.SelectField
                                        label="Taille"
                                        options={SIZE_OPTIONS}
                                    />
                                )}
                            />
                        </div>

                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
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
                                name="condition"
                                children={(field) => (
                                    <field.SelectField
                                        label="État"
                                        options={CONDITION_OPTIONS}
                                    />
                                )}
                            />
                        </div>
                    </FieldGroup>
                </FieldSet>

                <FieldSet>
                    <FieldLegend>Photo</FieldLegend>
                    <FieldGroup>
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
                </FieldSet>
            </FieldGroup>

            {renderActions
                ? renderActions({ reset: handleReset, isLoading })
                : defaultActions}
        </form>
    );
}
