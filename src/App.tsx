import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { ArticleFormDialog } from "@/components/ArticleFormDialog";
import { ArticleGrid } from "@/components/ArticleGrid";
import { useArticle, useArticles } from "@/hooks/article.hooks";

export default function App() {
    const [favoriteIds, setFavoriteIds] = useState<Set<string>>(new Set());

    const toggleFavorite = (articleId: string) => {
        setFavoriteIds((prev) => {
            const newSet = new Set(prev);
            if (newSet.has(articleId)) {
                newSet.delete(articleId);
            } else {
                newSet.add(articleId);
            }
            return newSet;
        });
    };

    const { data: articles } = useArticles();

    console.log("Articles in App component:", articles);

    const firstArticleId = articles?.[0]?.id;
    console.log("First article ID:", firstArticleId);

    const { data: firstArticle } = useArticle(firstArticleId || "");
    console.log("First article data:", firstArticle);

    return (
        <div className="min-h-screen bg-gray-50">
            <header className="bg-teal-600 text-white">
                <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-3">
                    <NavLink
                        to="/"
                        className="text-2xl font-bold hover:text-teal-100"
                    >
                        Vinted Clone
                    </NavLink>
                    <nav className="flex items-center gap-4 text-sm">
                        <NavLink
                            to="/"
                            end
                            className={({ isActive }) =>
                                isActive
                                    ? "font-semibold text-white"
                                    : "hover:text-teal-200"
                            }
                        >
                            Accueil
                        </NavLink>
                        <NavLink
                            to="/my-articles"
                            className={({ isActive }) =>
                                isActive
                                    ? "font-semibold text-white"
                                    : "hover:text-teal-200"
                            }
                        >
                            Mes annonces
                        </NavLink>
                        <NavLink
                            to="/favorites"
                            className={({ isActive }) =>
                                isActive
                                    ? "font-semibold text-white"
                                    : "hover:text-teal-200"
                            }
                        >
                            Favoris
                        </NavLink>
                        <ArticleFormDialog
                            onSubmit={async (data) => {
                                console.log("Article soumis :", data);
                            }}
                        />
                    </nav>
                </div>
            </header>
            <main className="mx-auto max-w-4xl p-6">
                <Outlet />
                <h2 className="mb-4 text-xl font-semibold">
                    Bienvenue sur le projet Vinted Clone !
                </h2>
                <p className="mb-2 text-gray-600">
                    Ce scaffold contient tout le nécessaire pour démarrer.
                    Consultez le fichier{" "}
                    <code className="rounded bg-gray-200 px-1">
                        CONSIGNES.md
                    </code>{" "}
                    pour les instructions.
                </p>
                <p className="mt-4 text-sm text-gray-500">
                    La page « Mes annonces » sera vide au démarrage — c'est
                    normal. Créez votre première annonce pour la voir
                    apparaître.
                </p>
                <p className="mt-6 text-xs text-gray-400">
                    Remplacez ce contenu par votre application.
                </p>
                <ArticleGrid
                    articles={[
                        {
                            id: "1",
                            title: "Veste en cuir vintage",
                            description: "Veste en cuir noir, excellent état",
                            price: 79.99,
                            category: "tops",
                            size: "M",
                            condition: "bon_etat",
                            imageUrl:
                                "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=400&q=80",
                            userName: "Alice Dupont",
                            userId: "user-1",
                            createdAt: new Date().toISOString(),
                        },
                        {
                            id: "2",
                            title: "Jean slim Zara",
                            description: "Jean slim bleu, taille 32",
                            price: 29.99,
                            category: "bottoms",
                            size: "S",
                            condition: "tres_bon_etat",
                            imageUrl:
                                "https://images.unsplash.com/photo-1521334884684-d80222895322?auto=format&fit=crop&w=400&q=80",
                            userName: "Bob Martin",
                            userId: "user-2",
                            createdAt: new Date().toISOString(),
                        },
                        {
                            id: "3",
                            title: "Baskets blanches Nike",
                            description: "Baskets blanches, portées 2 fois",
                            price: 49.99,
                            category: "shoes",
                            size: "L",
                            condition: "neuf_sans_etiquette",
                            imageUrl:
                                "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=400&q=80",
                            userName: "Charlie Durand",
                            userId: "user-3",
                            createdAt: new Date().toISOString(),
                        },
                    ]}
                    favoriteIds={favoriteIds}
                    onToggleFavorite={toggleFavorite}
                />
            </main>
        </div>
    );
}
