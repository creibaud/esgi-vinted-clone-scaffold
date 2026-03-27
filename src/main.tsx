import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./index.css";
import App from "./App.tsx";
import CataloguePage from "./pages/CataloguePage.tsx";
import ArticleDetailPage from "./pages/ArticleDetailPage.tsx";
import PublishPage from "./pages/PublishPage.tsx";
import MyArticlesPage from "./pages/MyArticlesPage.tsx";
import FavoritesPage from "./pages/FavoritesPage.tsx";
import EditArticlePage from "./pages/EditArticlePage.tsx";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route element={<App />}>
            <Route path="/" element={<CataloguePage />} />
            <Route path="/articles/:id" element={<ArticleDetailPage />} />
            <Route path="/publish" element={<PublishPage />} />
            <Route path="/my-articles" element={<MyArticlesPage />} />
            <Route path="/favorites" element={<FavoritesPage />} />
            <Route path="/articles/:id/edit" element={<EditArticlePage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>,
);
