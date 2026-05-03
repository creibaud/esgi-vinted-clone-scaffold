import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { ArticleFormData } from "@/types/article";
import { ArticleForm } from "./ArticleForm";

const validValues: ArticleFormData = {
    title: "Veste en jean",
    description: "Veste en très bon état, peu portée",
    price: 25,
    category: "tops",
    size: "M",
    condition: "tres_bon_etat",
    imageUrl: "https://example.com/photo.jpg",
};

describe("ArticleForm", () => {
    it("préremplit les champs avec defaultValues", () => {
        render(<ArticleForm defaultValues={validValues} onSubmit={vi.fn()} />);

        expect(screen.getByLabelText("Titre")).toHaveValue("Veste en jean");
        expect(screen.getByLabelText("Description")).toHaveValue(
            "Veste en très bon état, peu portée",
        );
        expect(screen.getByLabelText("Prix (€)")).toHaveValue(25);
    });

    it("affiche des messages d'erreur quand on soumet un formulaire vide", async () => {
        const onSubmit = vi.fn();
        const user = userEvent.setup();

        render(<ArticleForm onSubmit={onSubmit} />);

        const submitButton = screen.getByRole("button", { name: /publier/i });
        await user.click(submitButton);

        expect(onSubmit).not.toHaveBeenCalled();
        expect(
            await screen.findAllByText(/.+/, { selector: "[role='alert']" }),
        ).not.toHaveLength(0);
    });
});