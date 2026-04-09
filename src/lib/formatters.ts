export function formatPrice(price: number): string {
    return `${price.toFixed(2)} €`.replace(".", ",");
}

export function formatDate(date: Date | string): string {
    const d = typeof date === "string" ? new Date(date) : date;
    return d.toLocaleDateString("fr-FR", {
        year: "numeric",
        month: "numeric",
        day: "numeric",
    });
}
