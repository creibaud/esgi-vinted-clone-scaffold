export type Article = {
    id: string;
    title: string;
    description: string;
    price: number;
    category: string;
    size: string;
    condition: string;
    imageUrl: string;
    userName: string;
    userId: string;
    createdAt: string;
};

export const VALID_CATEGORIES = [
    "tops",
    "bottoms",
    "shoes",
    "coats",
    "accessories",
    "sportswear",
] as const;

export const VALID_CONDITIONS = [
    "neuf_avec_etiquette",
    "neuf_sans_etiquette",
    "tres_bon_etat",
    "bon_etat",
    "satisfaisant",
] as const;

export type Category = (typeof VALID_CATEGORIES)[number];
export type Condition = (typeof VALID_CONDITIONS)[number];
export type SortOption = "price_asc" | "price_desc" | "date_desc";
