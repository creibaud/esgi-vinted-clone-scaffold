export type Article = {
    id: string;
    title: string;
    description: string;
    price: number;
    category: CategoryType;
    size: string;
    condition: ConditionType;
    imageUrl: string;
    userName: string;
    userId: string;
    createdAt: string;
};

export type ArticleFormData = Omit<
    Article,
    "id" | "userId" | "userName" | "createdAt"
>;

export const CATEGORIES = [
    { id: "tops", label: "Hauts" },
    { id: "bottoms", label: "Bas" },
    { id: "shoes", label: "Chaussures" },
    { id: "coats", label: "Manteaux" },
    { id: "accessories", label: "Accessoires" },
    { id: "sportswear", label: "Sportswear" },
] as const;

export const CONDITIONS = [
    { value: "neuf_avec_etiquette", label: "Neuf avec étiquette" },
    { value: "neuf_sans_etiquette", label: "Neuf sans étiquette" },
    { value: "tres_bon_etat", label: "Très bon état" },
    { value: "bon_etat", label: "Bon état" },
    { value: "satisfaisant", label: "Satisfaisant" },
] as const;

export type CategoryType = (typeof CATEGORIES)[number]["id"];
export type ConditionType = (typeof CONDITIONS)[number]["value"];

export type Category = (typeof CATEGORIES)[number];
export type Condition = (typeof CONDITIONS)[number];
