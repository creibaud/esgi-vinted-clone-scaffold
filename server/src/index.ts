import express from "express";
import { seedArticles } from "./data/seed.js";
import { createArticlesRouter } from "./routes/articles.js";
import { createFavoritesRouter } from "./routes/favorites.js";
import type { Article } from "./types.js";

const app = express();
const PORT = 3000;

app.use(express.json());

// In-memory store
let articles: Article[] = [...seedArticles];
const favorites: Map<string, Set<string>> = new Map();

const getArticles = () => articles;
const setArticles = (newArticles: Article[]) => {
    articles = newArticles;
};

// Mount routes
app.use("/api", createArticlesRouter(getArticles, setArticles, favorites));
app.use("/api", createFavoritesRouter(getArticles, favorites));

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`${articles.length} articles loaded`);
});
