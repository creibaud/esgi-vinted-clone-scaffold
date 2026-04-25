import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "@/index.css";
import App from "@/App.tsx";
import { RootLayout } from "@/layouts/root.layout";
import ArticleDetailPage from "@/pages/ArticleDetailPage.tsx";
import CataloguePage from "@/pages/CataloguePage.tsx";
import EditArticlePage from "@/pages/EditArticlePage.tsx";
import FavoritesPage from "@/pages/FavoritesPage.tsx";
import MyArticlesPage from "@/pages/MyArticlesPage.tsx";
import NotFoundPage from "@/pages/NotFoundPage.tsx";
import PublishPage from "@/pages/PublishPage.tsx";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <RootLayout>
            <BrowserRouter>
                <Routes>
                    <Route element={<App />}>
                        <Route path="/" element={<CataloguePage />} />
                        <Route
                            path="/articles/:id"
                            element={<ArticleDetailPage />}
                        />
                        <Route path="/publish" element={<PublishPage />} />
                        <Route
                            path="/my-articles"
                            element={<MyArticlesPage />}
                        />
                        <Route path="/favorites" element={<FavoritesPage />} />
                        <Route
                            path="/articles/:id/edit"
                            element={<EditArticlePage />}
                        />
                        <Route path="*" element={<NotFoundPage />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </RootLayout>
    </StrictMode>,
);
