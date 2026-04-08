import { Request, Response, Router } from "express";
import { v4 as uuidv4 } from "uuid";
import {
    Article,
    SortOption,
    VALID_CATEGORIES,
    VALID_CONDITIONS,
} from "../types.js";

function validateArticleBody(body: Record<string, unknown>): string | null {
    const {
        title,
        description,
        price,
        category,
        condition,
        size,
        imageUrl,
        userName,
    } = body;

    if (
        typeof title !== "string" ||
        title.trim().length < 3 ||
        title.trim().length > 100
    )
        return "Le titre doit contenir entre 3 et 100 caractères";

    if (
        typeof description !== "string" ||
        description.trim().length < 10 ||
        description.trim().length > 1000
    )
        return "La description doit contenir entre 10 et 1000 caractères";

    if (typeof price !== "number" || price <= 0)
        return "Le prix doit être supérieur à 0";

    if (
        typeof category !== "string" ||
        !(VALID_CATEGORIES as readonly string[]).includes(category)
    )
        return "Catégorie invalide";

    if (
        typeof condition !== "string" ||
        !(VALID_CONDITIONS as readonly string[]).includes(condition)
    )
        return "État invalide";

    if (typeof size !== "string" || size.trim().length === 0)
        return "La taille est requise";

    if (typeof imageUrl !== "string" || !/^https?:\/\/[^\s/]+/.test(imageUrl))
        return "L'URL de l'image est invalide";

    if (typeof userName !== "string" || userName.trim().length === 0)
        return "Le nom d'utilisateur est requis";

    return null;
}

export function createArticlesRouter(
    getArticles: () => Article[],
    setArticles: (articles: Article[]) => void,
    favorites: Map<string, Set<string>>,
): Router {
    const router = Router();

    // GET /articles — List with filters
    router.get("/articles", (_req: Request, res: Response) => {
        const { search, category, condition, priceMin, priceMax, sort } =
            _req.query;

        let results = [...getArticles()];

        const currentUserId = _req.headers["x-user-id"];
        if (typeof currentUserId === "string" && currentUserId) {
            results = results.filter((a) => a.userId !== currentUserId);
        }

        if (typeof search === "string" && search.trim()) {
            const term = search.toLowerCase();
            results = results.filter(
                (a) =>
                    a.title.toLowerCase().includes(term) ||
                    a.description.toLowerCase().includes(term),
            );
        }

        if (typeof category === "string" && category) {
            results = results.filter((a) => a.category === category);
        }

        if (typeof condition === "string" && condition) {
            results = results.filter((a) => a.condition === condition);
        }

        if (typeof priceMin === "string" && priceMin) {
            const min = Number(priceMin);
            if (!isNaN(min)) results = results.filter((a) => a.price >= min);
        }

        if (typeof priceMax === "string" && priceMax) {
            const max = Number(priceMax);
            if (!isNaN(max)) results = results.filter((a) => a.price <= max);
        }

        const sortOption: SortOption =
            sort === "price_asc" ||
            sort === "price_desc" ||
            sort === "date_desc"
                ? sort
                : "date_desc";

        switch (sortOption) {
            case "price_asc":
                results.sort((a, b) => a.price - b.price);
                break;
            case "price_desc":
                results.sort((a, b) => b.price - a.price);
                break;
            case "date_desc":
                results.sort(
                    (a, b) =>
                        new Date(b.createdAt).getTime() -
                        new Date(a.createdAt).getTime(),
                );
                break;
        }

        res.json(results);
    });

    // GET /articles/:id — Detail
    router.get("/articles/:id", (req: Request, res: Response) => {
        const article = getArticles().find((a) => a.id === req.params.id);
        if (!article) {
            res.status(404).json({ error: "Article non trouvé" });
            return;
        }
        res.json(article);
    });

    // POST /articles — Create
    router.post("/articles", (req: Request, res: Response) => {
        const userId = req.headers["x-user-id"];
        if (typeof userId !== "string" || !userId) {
            res.status(401).json({ error: "Identification requise" });
            return;
        }

        const error = validateArticleBody(req.body);
        if (error) {
            res.status(400).json({ error });
            return;
        }

        const {
            title,
            description,
            price,
            category,
            condition,
            size,
            imageUrl,
            userName,
        } = req.body;

        const article: Article = {
            id: uuidv4(),
            title,
            description,
            price,
            category,
            size,
            condition,
            imageUrl,
            userName,
            userId,
            createdAt: new Date().toISOString(),
        };

        setArticles([...getArticles(), article]);
        res.status(201).json(article);
    });

    // PUT /articles/:id — Update (ownership check)
    router.put("/articles/:id", (req: Request, res: Response) => {
        const userId = req.headers["x-user-id"];
        if (typeof userId !== "string" || !userId) {
            res.status(401).json({ error: "Identification requise" });
            return;
        }

        const articles = getArticles();
        const index = articles.findIndex((a) => a.id === req.params.id);
        if (index === -1) {
            res.status(404).json({ error: "Article non trouvé" });
            return;
        }

        if (articles[index].userId !== userId) {
            res.status(403).json({
                error: "Vous n'êtes pas autorisé à modifier cet article",
            });
            return;
        }

        const error = validateArticleBody(req.body);
        if (error) {
            res.status(400).json({ error });
            return;
        }

        const {
            title,
            description,
            price,
            category,
            condition,
            size,
            imageUrl,
            userName,
        } = req.body;

        articles[index] = {
            ...articles[index],
            title,
            description,
            price,
            category,
            size,
            condition,
            imageUrl,
            userName,
        };

        res.json(articles[index]);
    });

    // DELETE /articles/:id — Delete (ownership check)
    router.delete("/articles/:id", (req: Request, res: Response) => {
        const userId = req.headers["x-user-id"];
        if (typeof userId !== "string" || !userId) {
            res.status(401).json({ error: "Identification requise" });
            return;
        }

        const articles = getArticles();
        const index = articles.findIndex((a) => a.id === req.params.id);
        if (index === -1) {
            res.status(404).json({ error: "Article non trouvé" });
            return;
        }

        if (articles[index].userId !== userId) {
            res.status(403).json({
                error: "Vous n'êtes pas autorisé à supprimer cet article",
            });
            return;
        }

        const articleId = articles[index].id;
        setArticles(articles.filter((a) => a.id !== articleId));

        // Clean up favorites referencing this article
        for (const favSet of favorites.values()) {
            favSet.delete(articleId);
        }

        res.json({ message: "Article supprimé" });
    });

    // GET /users/:userId/articles — User's articles
    router.get("/users/:userId/articles", (req: Request, res: Response) => {
        const results = getArticles()
            .filter((a) => a.userId === req.params.userId)
            .sort(
                (a, b) =>
                    new Date(b.createdAt).getTime() -
                    new Date(a.createdAt).getTime(),
            );

        res.json(results);
    });

    return router;
}
