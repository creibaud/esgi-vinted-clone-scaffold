import {
    CATEGORIES,
    CONDITIONS,
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
