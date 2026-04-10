import { z } from "zod";

export const CATEGORIES = [
    { id: "tops", label: "Hauts" },
    { id: "bottoms", label: "Bas" },
    { id: "shoes", label: "Chaussures" },
    { id: "coats", label: "Manteaux" },
    { id: "accessories", label: "Accessoires" },
    { id: "sportswear", label: "Sportswear" },
] as const;

export const SIZES = [
    "XS",
    "S",
    "M",
    "L",
    "XL",
    "XXL",
    "Unique",
    "35",
    "36",
    "37",
    "38",
    "39",
    "40",
    "41",
    "42",
    "43",
    "44",
    "45",
    "46",
] as const;

export type Size = (typeof SIZES)[number];

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

export const articleSchema = z.object({
    id: z.uuid({ message: "L'ID doit être un UUID valide" }),
    title: z
        .string()
        .min(1, "Le titre est requis")
        .max(100, "Le titre doit comporter au maximum 100 caractères"),
    description: z
        .string()
        .min(10, "La description doit comporter au minimum 10 caractères")
        .max(1000, "La description doit comporter au maximum 1000 caractères"),
    price: z
        .number({ message: "Le prix doit être un nombre" })
        .positive("Le prix doit être positif"),
    category: z.enum(
        CATEGORIES.map((c) => c.id),
        {
            message: "La catégorie est invalide",
        },
    ),
    size: z.enum(SIZES, {
        message: "La taille est invalide",
    }),
    condition: z.enum(
        CONDITIONS.map((c) => c.value),
        {
            message: "L'état est invalide",
        },
    ),
    imageUrl: z.union([
        z.string().regex(/^\/.*\.(jpg|jpeg|png|webp|gif|svg)$/i, {
            message: "L'URL de l'image doit être un chemin local valide",
        }),
        z.url({ message: "L'URL de l'image est invalide" }),
    ]),
    userName: z.string().min(1, "Le nom de l'utilisateur est requis"),
    userId: z.string().min(1, "L'ID de l'utilisateur est requis"),
    createdAt: z.iso.datetime({
        message: "La date de création doit être au format ISO",
    }),
});

export type Article = z.infer<typeof articleSchema>;
export const articleFormDataSchema = articleSchema.omit({
    id: true,
    userId: true,
    userName: true,
    createdAt: true,
});
export type ArticleFormData = z.infer<typeof articleFormDataSchema>;

export type SortOptions = "price_asc" | "price_desc" | "date_desc";

export type ArticleFilters = {
    search?: string;
    category?: CategoryType;
    condition?: ConditionType;
    priceMin?: number;
    priceMax?: number;
    sort?: SortOptions;
};
