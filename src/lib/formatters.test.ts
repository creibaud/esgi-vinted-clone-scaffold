import { describe, expect, it } from "vitest";
import { formatDate, formatPrice } from "./formatters";

describe("formatPrice", () => {
    it("formate un prix à deux décimales avec une virgule et le symbole euro", () => {
        expect(formatPrice(12.5)).toBe("12,50 €");
    });

    it("formate un prix entier avec deux décimales", () => {
        expect(formatPrice(10)).toBe("10,00 €");
    });

    it("formate zéro", () => {
        expect(formatPrice(0)).toBe("0,00 €");
    });
});

describe("formatDate", () => {
    it("formate une date ISO en jj/mm/aaaa", () => {
        expect(formatDate("2026-04-15T10:00:00Z")).toBe("15/04/2026");
    });

    it("accepte un objet Date", () => {
        const date = new Date("2026-01-05T12:00:00Z");
        expect(formatDate(date)).toBe("05/01/2026");
    });
});
