import { describe, expect, it } from "vitest";
import { articleFormDataSchema } from "./article";

const validData = {
    title: "Veste en jean",
    description: "Veste en très bon état, peu portée",
    price: 25,
    category: "tops",
    size: "M",
    condition: "tres_bon_etat",
    imageUrl: "https://example.com/photo.jpg",
};

describe("articleFormDataSchema", () => {
    it("accepte des données valides", () => {
        const result = articleFormDataSchema.safeParse(validData);
        expect(result.success).toBe(true);
    });

    it("rejette un titre vide", () => {
        const result = articleFormDataSchema.safeParse({
            ...validData,
            title: "",
        });
        expect(result.success).toBe(false);
    });

    it("rejette un titre de plus de 100 caractères", () => {
        const result = articleFormDataSchema.safeParse({
            ...validData,
            title: "a".repeat(101),
        });
        expect(result.success).toBe(false);
    });

    it("rejette une description trop courte", () => {
        const result = articleFormDataSchema.safeParse({
            ...validData,
            description: "court",
        });
        expect(result.success).toBe(false);
    });

    it("rejette un prix négatif", () => {
        const result = articleFormDataSchema.safeParse({
            ...validData,
            price: -5,
        });
        expect(result.success).toBe(false);
    });

    it("rejette un prix égal à zéro", () => {
        const result = articleFormDataSchema.safeParse({
            ...validData,
            price: 0,
        });
        expect(result.success).toBe(false);
    });

    it("rejette une catégorie inconnue", () => {
        const result = articleFormDataSchema.safeParse({
            ...validData,
            category: "inexistant",
        });
        expect(result.success).toBe(false);
    });

    it("accepte un chemin local d'image", () => {
        const result = articleFormDataSchema.safeParse({
            ...validData,
            imageUrl: "/images/photo.jpg",
        });
        expect(result.success).toBe(true);
    });

    it("rejette une URL d'image invalide", () => {
        const result = articleFormDataSchema.safeParse({
            ...validData,
            imageUrl: "pas-une-url",
        });
        expect(result.success).toBe(false);
    });
});