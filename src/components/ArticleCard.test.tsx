import { MemoryRouter } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { Article } from "@/types/article";
import { ArticleCard } from "./ArticleCard";
import { TooltipProvider } from "./ui/tooltip";

const article: Article = {
    id: "11111111-1111-1111-1111-111111111111",
    title: "Veste en jean",
    description: "Veste en très bon état, peu portée",
    price: 12.5,
    category: "tops",
    size: "M",
    condition: "tres_bon_etat",
    imageUrl: "https://example.com/photo.jpg",
    userName: "Alice",
    userId: "user-1",
    createdAt: "2026-04-15T10:00:00Z",
};

function renderCard(props: Partial<React.ComponentProps<typeof ArticleCard>>) {
    return render(
        <TooltipProvider>
            <MemoryRouter>
                <ArticleCard
                    article={article}
                    isFavorite={false}
                    onToggleFavorite={() => {}}
                    {...props}
                />
            </MemoryRouter>
        </TooltipProvider>,
    );
}

describe("ArticleCard", () => {
    it("affiche le titre, le prix formaté et le nom du vendeur", () => {
        renderCard({});

        expect(screen.getByText("Veste en jean")).toBeInTheDocument();
        expect(screen.getByText("12,50 €")).toBeInTheDocument();
        expect(screen.getByText("Alice")).toBeInTheDocument();
    });

    it("appelle onToggleFavorite au clic sur le bouton favori", async () => {
        const onToggleFavorite = vi.fn();
        const user = userEvent.setup();

        renderCard({ onToggleFavorite });

        const favoriteButton = screen.getByRole("button", {
            name: /ajouter aux favoris/i,
        });
        await user.click(favoriteButton);

        expect(onToggleFavorite).toHaveBeenCalledTimes(1);
    });

    it("indique l'état actif des favoris via aria-label", () => {
        renderCard({ isFavorite: true });

        expect(
            screen.getByRole("button", { name: /retirer des favoris/i }),
        ).toBeInTheDocument();
    });
});
