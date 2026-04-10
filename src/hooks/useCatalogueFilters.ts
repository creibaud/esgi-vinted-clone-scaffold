import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";
import {
    CATEGORY_OPTIONS,
    CONDITION_OPTIONS,
    SORT_OPTIONS,
} from "@/lib/article";
import type {
    ArticleFilters,
    CategoryType,
    ConditionType,
    SortOptions,
} from "@/types/article";

type CategoryOption = (typeof CATEGORY_OPTIONS)[number];
type ConditionOption = (typeof CONDITION_OPTIONS)[number];
type SortOption = (typeof SORT_OPTIONS)[number];

export const PRICE_MAX = 500;
export const DEFAULT_PRICE_RANGE: [number, number] = [0, PRICE_MAX];

function updateParam(
    prev: URLSearchParams,
    key: string,
    value: string | null,
): URLSearchParams {
    const next = new URLSearchParams(prev);
    if (value) next.set(key, value);
    else next.delete(key);
    return next;
}

export interface CatalogueFilters {
    search: string;
    setSearch: (value: string) => void;
    priceRange: [number, number];
    setPriceRange: (value: [number, number]) => void;
    category: CategoryOption | null;
    setCategory: (value: CategoryOption | null) => void;
    condition: ConditionOption | null;
    setCondition: (value: ConditionOption | null) => void;
    sort: SortOption | null;
    setSort: (value: SortOption | null) => void;
    hasActiveFilters: boolean;
    clearFilters: () => void;
    articleFilters: ArticleFilters;
}

export function useCatalogueFilters(): CatalogueFilters {
    const [searchParams, setSearchParams] = useSearchParams();

    const [search, setSearch] = useState(
        () => searchParams.get("search") ?? "",
    );
    const [priceRange, setPriceRange] = useState<[number, number]>(() => [
        Number(searchParams.get("priceMin")) || 0,
        Number(searchParams.get("priceMax")) || PRICE_MAX,
    ]);

    const category =
        CATEGORY_OPTIONS.find(
            (o) => o.value === searchParams.get("category"),
        ) ?? null;
    const condition =
        CONDITION_OPTIONS.find(
            (o) => o.value === searchParams.get("condition"),
        ) ?? null;
    const sort =
        SORT_OPTIONS.find((o) => o.value === searchParams.get("sort")) ?? null;

    const debouncedSearch = useDebouncedValue({ value: search, delay: 300 });
    const debouncedPriceRange = useDebouncedValue({
        value: priceRange,
        delay: 300,
    });

    useEffect(() => {
        setSearchParams(
            (prev) => updateParam(prev, "search", debouncedSearch || null),
            { replace: true },
        );
    }, [debouncedSearch, setSearchParams]);

    useEffect(() => {
        setSearchParams(
            (prev) => {
                let next = updateParam(
                    prev,
                    "priceMin",
                    debouncedPriceRange[0] !== 0
                        ? String(debouncedPriceRange[0])
                        : null,
                );
                next = updateParam(
                    next,
                    "priceMax",
                    debouncedPriceRange[1] !== PRICE_MAX
                        ? String(debouncedPriceRange[1])
                        : null,
                );
                return next;
            },
            { replace: true },
        );
    }, [debouncedPriceRange, setSearchParams]);

    function setCategory(value: CategoryOption | null) {
        setSearchParams(
            (prev) => updateParam(prev, "category", value?.value ?? null),
            { replace: true },
        );
    }

    function setCondition(value: ConditionOption | null) {
        setSearchParams(
            (prev) => updateParam(prev, "condition", value?.value ?? null),
            { replace: true },
        );
    }

    function setSort(value: SortOption | null) {
        setSearchParams(
            (prev) => updateParam(prev, "sort", value?.value ?? null),
            { replace: true },
        );
    }

    function clearFilters() {
        setSearch("");
        setPriceRange(DEFAULT_PRICE_RANGE);
        setSearchParams(new URLSearchParams(), { replace: true });
    }

    const isPriceRangeActive =
        priceRange[0] !== DEFAULT_PRICE_RANGE[0] ||
        priceRange[1] !== DEFAULT_PRICE_RANGE[1];

    const hasActiveFilters = Boolean(
        search || category || condition || sort || isPriceRangeActive,
    );

    const articleFilters: ArticleFilters = {
        ...(debouncedSearch && { search: debouncedSearch }),
        ...(category && { category: category.value as CategoryType }),
        ...(condition && { condition: condition.value as ConditionType }),
        ...(sort && { sort: sort.value as SortOptions }),
        ...(debouncedPriceRange[0] !== 0 && {
            priceMin: debouncedPriceRange[0],
        }),
        ...(debouncedPriceRange[1] !== PRICE_MAX && {
            priceMax: debouncedPriceRange[1],
        }),
    };

    return {
        search,
        setSearch,
        priceRange,
        setPriceRange,
        category,
        setCategory,
        condition,
        setCondition,
        sort,
        setSort,
        hasActiveFilters,
        clearFilters,
        articleFilters,
    };
}
