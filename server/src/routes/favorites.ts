import { Request, Response, Router } from "express";
import { Article } from "../types.js";

export function createFavoritesRouter(
    getArticles: () => Article[],
    favorites: Map<string, Set<string>>,
): Router {
    const router = Router();

    // GET /favorites — List user's favorite articles
    router.get("/favorites", (req: Request, res: Response) => {
        const userId = req.headers["x-user-id"];
        if (typeof userId !== "string" || !userId) {
            res.status(401).json({ error: "Identification requise" });
            return;
        }

        const favIds = favorites.get(userId) ?? new Set<string>();
        const articles = getArticles();

        // Return full article objects, filtering out deleted articles
        const result = [...favIds]
            .map((id) => articles.find((a) => a.id === id))
            .filter((a): a is Article => a !== undefined);

        res.json(result);
    });

    // POST /favorites/:articleId — Add favorite (idempotent)
    router.post("/favorites/:articleId", (req: Request, res: Response) => {
        const userId = req.headers["x-user-id"];
        if (typeof userId !== "string" || !userId) {
            res.status(401).json({ error: "Identification requise" });
            return;
        }

        const articleId = req.params.articleId as string;
        const article = getArticles().find((a) => a.id === articleId);
        if (!article) {
            res.status(404).json({ error: "Article non trouvé" });
            return;
        }

        if (!favorites.has(userId)) {
            favorites.set(userId, new Set());
        }
        favorites.get(userId)!.add(articleId);

        res.json({ message: "Article ajouté aux favoris" });
    });

    // DELETE /favorites/:articleId — Remove favorite (idempotent)
    router.delete("/favorites/:articleId", (req: Request, res: Response) => {
        const userId = req.headers["x-user-id"];
        if (typeof userId !== "string" || !userId) {
            res.status(401).json({ error: "Identification requise" });
            return;
        }

        const articleId = req.params.articleId as string;
        const userFavs = favorites.get(userId);
        if (userFavs) {
            userFavs.delete(articleId);
        }

        res.json({ message: "Article retiré des favoris" });
    });

    return router;
}
