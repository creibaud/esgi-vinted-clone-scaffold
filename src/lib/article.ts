import {
    CATEGORIES,
    CONDITIONS,
    SIZES,
    type CategoryType,
    type ConditionType,
} from "@/types/article";

export function findConditionLabel({
    condition,
}: {
    condition: ConditionType;
}) {
    return CONDITIONS.find((c) => c.value === condition)?.label ?? condition;
}

export function findCategoryLabel({ category }: { category: CategoryType }) {
    return CATEGORIES.find((c) => c.id === category)?.label ?? category;
}

export const CATEGORY_OPTIONS = CATEGORIES.map((c) => ({
    value: c.id,
    label: c.label,
}));

export const CONDITION_OPTIONS = CONDITIONS.map((c) => ({
    value: c.value,
    label: c.label,
}));

export const SIZE_OPTIONS = SIZES.map((s) => ({ value: s, label: s }));

export const SORT_OPTIONS = [
    { value: "date_desc", label: "Plus récents" },
    { value: "price_asc", label: "Prix croissant" },
    { value: "price_desc", label: "Prix décroissant" },
] as const;
