# Plan d'implémentation — Vinted Clone ESGI

> **Objectif : 20/20 + bonus (23/20 avec les 4 options)**
> Deadline soutenance : **6 mai 2026**

---

## Phase 1 — Fondations (faire EN PREMIER, bloque tout le reste)

### 1.1 Utilitaires partagés

- [x] Créer `src/lib/formatters.ts` avec `formatPrice(price: number): string` → `"12,50 €"` et `formatDate(date: Date | string): string` → `"15/04/2026"`
- [x] Créer `src/hooks/useDebouncedValue.ts` — hook générique `useDebouncedValue<T>(value: T, delay: number): T`

### 1.2 Composants UI partagés

- [x] Créer `src/components/LoadingSpinner.tsx` — spinner centré affiché pendant le chargement
- [x] Créer `src/components/ErrorMessage.tsx` — affichage message d'erreur (props: `icon`, `title`, `message`, `content`)
- [x] Créer `src/components/ArticleCard.tsx`
    - Props : `article: Article`, `isFavorite: boolean`, `onToggleFavorite: () => void`
    - Affiche : image (`object-cover`), titre, prix via `formatPrice()`, catégorie, état, vendeur
    - Lien cliquable vers `/articles/:id` (NavLink ou Link)
    - Bouton favori (icône coeur, état actif/inactif via classes conditionnelles `cn()` sur `isFavorite`)
- [x] Créer `src/components/ArticleGrid.tsx`
    - Props : `articles: Article[]`, `favoriteIds: Set<string>`, `onToggleFavorite: (articleId: string) => void`
    - Grille responsive : 1 col mobile, 2 col md, 3 col lg (Tailwind)
    - Affiche `ArticleCard` pour chaque article
- [x] Créer `src/components/ArticleCardSkeleton.tsx`
    - Skeleton animé (`animate-pulse`) reproduisant fidèlement le layout de `ArticleCard`
    - Utilisé à la place de `LoadingSpinner` dans la grille pour éviter les sauts de layout
- [x] Créer `src/components/FilterCombobox.tsx`
    - Composant générique `FilterCombobox<T extends { value: string; label: string }>`
    - Single-select avec clear button, réutilisé pour catégorie / état / tri
- [x] Créer `src/lib/article.ts`
    - Schéma Zod `articleSchema` : tous les champs requis, title 3-100 chars, description 10-1000 chars, price > 0
    - Exporter `ArticleFormData` inféré via `z.infer<typeof articleSchema>`
    - Exporter `CATEGORY_OPTIONS`, `CONDITION_OPTIONS`, `SIZE_OPTIONS`, `SORT_OPTIONS`
- [x] Créer `src/hooks/form.ts` — factory TanStack Form avec composants pré-câblés
    - Utiliser `createFormHook` + `createFormHookContexts` de `@tanstack/react-form`
    - Pré-câbler : `TextField`, `NumberField`, `TextareaField`, `SelectField` (dans `src/components/form/`)
    - Chaque composant utilise `useFieldContext()` et gère automatiquement `data-invalid` / `aria-invalid`
    - Exporter `useAppForm`, `withForm`, `useFieldContext`, `useFormContext`
- [x] Créer `src/components/ArticleForm.tsx`
    - Props : `defaultValues?: Partial<ArticleFormData>`, `onSubmit: (data: ArticleFormData) => Promise<void>`, `isLoading?: boolean`
    - Champs : `title`, `description`, `price`, `category` (select CATEGORIES), `size`, `condition` (select CONDITIONS), `imageUrl`
    - Utilise `useAppForm` avec `validators: { onSubmit: articleFormDataSchema }` pour la validation Zod
    - Utilise `form.AppField` + composants pré-câblés (`field.TextField`, `field.SelectField`, etc.)
    - Messages d'erreur sous chaque champ invalide via `<FieldError />` pré-câblé dans chaque composant
    - Réutilisé dans `ArticleFormDialog` (création) ET `EditArticlePage` (prérempli)
- [x] Créer `src/components/ArticleFormDialog.tsx`
    - Wrape `ArticleForm` dans un `Dialog` shadcn
    - Gère l'état `open/close` en interne — ferme automatiquement après soumission réussie
    - Props : `onSubmit: (data: ArticleFormData) => Promise<void>`, `isLoading?: boolean`
    - Bouton trigger "Publier" intégré (remplace le `NavLink /publish` dans `App.tsx`)

### 1.3 Hooks TanStack Query

- [x] `useArticles(filters?)` — `queryKey: ['articles', filters]`, construit les query params proprement
- [x] `useArticle(articleId)` — `queryKey: ['article', id]`
- [x] `useMyArticles()` — `queryKey: ['myArticles']`, utilise `useCurrentUserId()`
- [x] `useFavoriteArticles()` — `queryKey: ['favorites']`, retourne `{ favorites, favoriteIds: Set<string> }`
- [x] `useCreateArticle()` — POST `/articles`, `mutationKey: ['createArticle']`, invalide via `onSettled`
- [x] `useUpdateArticle(articleId)` — PUT `/articles/:id`, optimistic update sur `article`, `myArticles`, `articles`
- [x] `useDeleteArticle(articleId)` — DELETE `/articles/:id`, optimistic update retire de `articles`, `myArticles`, `favorites`
- [x] `useToggleFavorite()` — POST/DELETE `/favorites/:id`, optimistic update sur `favoriteIds` + rollback sur erreur

> **Pattern appliqué sur toutes les mutations (sauf create)** : `onMutate` (cancelQueries + snapshot + setQueryData) → `onError` (rollback) → `onSettled` (invalidateQueries)

### 1.4 Layout global

- [x] `App.tsx` — header `fixed` (`h-14`, `z-50`), layout `flex flex-col h-screen overflow-hidden`
- [x] `main` — `flex-1 overflow-hidden mt-14`, wrapper `max-w-4xl flex flex-col` pour propager la hauteur aux pages
- [x] `api.ts` — gestion réponse 204 No Content (évite `response.json()` sur body vide)

---

## Phase 2 — Pages obligatoires (10 pts)

### 2.1 CataloguePage — 3 pts

- [x] Filtres locaux (state) : search (debouncé 300ms), category, condition, sort, priceRange `[0, 500]`
- [x] Slider range shadcn pour `priceMin` / `priceMax` avec affichage valeurs en temps réel
- [x] `FilterCombobox` pour catégorie, état, tri
- [x] Appeler `useArticles(filters)` + `useFavoriteArticles()` + `useToggleFavorite()`
- [x] Skeletons (6 `ArticleCardSkeleton`) pendant `isLoading` — même layout que la grille, pas de saut
- [x] `<ErrorMessage />` si `isError`
- [x] `<ArticleGrid />` avec `animate-in fade-in-0` à l'apparition
- [x] `ScrollArea` (`flex-1 min-h-0`) pour la grille — s'adapte à la hauteur du collapsible ouvert/fermé
- [x] Bouton "Effacer les filtres" désactivé si aucun filtre actif
- [x] Compteur dynamique de résultats dans l'input de recherche
- [x] Icône du bouton filtre toggle entre `FilterAddIcon` / `FilterRemoveIcon`
- [x] Filtres synchronisés dans l'URL via `useSearchParams()` — `category`/`condition`/`sort` écrits immédiatement, `search`/`priceRange` après debounce via `useEffect`
- [x] Message "Aucun article ne correspond" quand `articles.length === 0` (composant `Empty` shadcn)

### 2.2 ArticleDetailPage — 1 pt

- [ ] Remplacer le stub `src/pages/ArticleDetailPage.tsx`
- [ ] Récupérer `:id` via `useParams()`
- [ ] Appeler `useArticle(id)`
- [ ] Afficher : image grande, titre, prix `formatPrice()`, description complète, catégorie, état, taille, vendeur, date `formatDate()`
- [ ] Lien "← Retour au catalogue" vers `/`
- [ ] `<LoadingSpinner />` pendant chargement
- [ ] Message d'erreur si 404 ou erreur API

### 2.3 PublishPage — 2 pts

- [ ] Remplacer le stub `src/pages/PublishPage.tsx`
- [ ] Utiliser `<ArticleForm />` sans `defaultValues` (mode création)
- [ ] Appeler `createArticle` de `useArticleMutations` dans `onSubmit`
- [ ] Après création réussie : redirect vers `/articles/:newId`
- [ ] Afficher les erreurs API sous le formulaire
- [ ] **Feature optionnelle draft (voir Phase 3.1)** : intégrer `useDraftForm` ici

### 2.4 MyArticlesPage — 1,5 pt

- [ ] Remplacer le stub `src/pages/MyArticlesPage.tsx`
- [ ] Appeler `useMyArticles()` (articles de l'utilisateur courant uniquement)
- [ ] Si liste vide : message + lien vers `/publish`
- [ ] Bouton "Supprimer" sur chaque article → `window.confirm("Supprimer cet article ?")` → appeler `deleteArticle`
- [ ] Bouton "Modifier" sur chaque article → navigate vers `/articles/:id/edit` (feature optionnelle 7.2)
- [ ] `<LoadingSpinner />` et `<ErrorMessage />` selon l'état
- [ ] La liste se met à jour automatiquement après suppression (optimistic update)

### 2.5 FavoritesPage — 2 pts

- [ ] Remplacer le stub `src/pages/FavoritesPage.tsx`
- [ ] Appeler `useFavoriteArticles()`
- [ ] Si liste vide : message explicatif
- [ ] Bouton "Retirer" sur chaque favori → `useToggleFavorite` → optimistic update immédiat
- [ ] `<LoadingSpinner />` et `<ErrorMessage />`

### 2.6 Navigation cohérente — 0,5 pt

- [x] NavLinks `App.tsx` : Accueil, Mes annonces, Favoris, bouton "Publier" (`ArticleFormDialog`)
- [ ] Brancher `ArticleFormDialog.onSubmit` sur `useCreateArticle` (actuellement `console.log`)
- [ ] Lien "← Retour au catalogue" dans ArticleDetailPage
- [ ] Pas de liens cassés dans toute l'application

---

## Phase 3 — Features optionnelles (1,5 pt chacune)

### 3.1 Brouillon automatique — 1,5 pt

- [ ] Créer `src/hooks/useDraftForm.ts`
    - Accepte la `form` instance retournée par `useAppForm`
    - `form.store.subscribe()` → `localStorage.setItem('article-draft', JSON.stringify(form.state.values))`
    - Au montage : `localStorage.getItem('article-draft')` → `form.setFieldValue(...)` pour chaque champ si données trouvées
    - Exposer `clearDraft()` → `localStorage.removeItem('article-draft')`
- [ ] Intégrer dans `PublishPage.tsx` uniquement (PAS dans EditArticlePage — clé différente sinon collision)
- [ ] Appeler `clearDraft()` dans le callback `onSuccess` de `createArticle`
- [ ] **Tester manuellement** : remplir, quitter, revenir → champs restaurés ; publier, revenir → champs vides

### 3.2 Édition d'annonce — 1,5 pt

- [ ] Remplacer le stub `src/pages/EditArticlePage.tsx`
- [ ] Récupérer `:id` via `useParams()`
- [ ] Appeler `useArticle(id)`
- [ ] Vérifier `article.userId === currentUserId` → si non : afficher erreur "Vous n'êtes pas le propriétaire"
- [ ] **Render conditionnel** : `if (!article) return <LoadingSpinner />` — monter `<ArticleForm />` UNIQUEMENT quand `isSuccess` est true (sinon RHF s'initialise avec des valeurs vides)
- [ ] Passer `defaultValues={article}` à `<ArticleForm />`
- [ ] Dans `onSubmit` : appeler `updateArticle` → optimistic update immédiat → redirect vers `/articles/:id`
- [ ] Bouton "Modifier" dans `MyArticlesPage` → navigate vers `/articles/:id/edit`

### 3.3 Tests composants — 1,5 pt

- [ ] Installer les dépendances de test si manquantes (déjà dans devDependencies : `@testing-library/react`, `@testing-library/jest-dom`, `@testing-library/user-event`)
- [ ] Vérifier `src/test/setup.ts` (import `@testing-library/jest-dom`)
- [ ] Créer `src/components/ArticleCard.test.tsx`
    - Test 1 : affiche le titre, le prix formaté ("12,50 €"), le nom du vendeur
    - Test 2 : bouton favori appelle `onToggleFavorite` au clic
    - Test 3 : le lien pointe vers `/articles/:id`
- [ ] Créer `src/components/ArticleForm.test.tsx`
    - Test 4 : soumettre un formulaire vide affiche les messages d'erreur Zod
    - Test 5 : les `defaultValues` pré-remplissent les champs (mode édition)
- [ ] Créer `src/lib/articleSchema.test.ts`
    - Test : schéma Zod rejette les données invalides (titre trop court, prix négatif, etc.)
- [ ] Créer `src/lib/formatters.test.ts`
    - Test 6 : `formatPrice(12.5)` retourne `"12,50 €"`
    - Test 7 : `formatDate("2026-04-15T10:00:00Z")` retourne `"15/04/2026"`
- [ ] Vérifier que `pnpm test` passe avec 0 erreur

### 3.4 Design responsive — 1,5 pt

- [ ] `ArticleGrid.tsx` : `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`
- [ ] `App.tsx` navbar : sur mobile (<640px), empiler les liens verticalement ou ajouter un menu burger
    - Option simple : `flex-wrap` + icônes sur mobile
    - Option complète : bouton hamburger + menu déroulant mobile
- [ ] `ArticleForm.tsx` : champs en colonne sur mobile (`flex-col`), labels lisibles
- [ ] `ArticleDetailPage.tsx` : image pleine largeur sur mobile, texte en dessous
- [ ] **Tester à 375px** dans DevTools : contenu lisible, pas de débordement, navigation utilisable

---

## Phase 4 — Qualité technique (5 pts)

- [ ] `npx tsc --noEmit` → **0 erreur** (à vérifier avant chaque commit important)
- [ ] `pnpm lint` → **0 erreur** oxlint
- [ ] `pnpm format` → formatter tout le code avant la soutenance
- [ ] Pas de `any` TypeScript dans tout le code
- [ ] Chaque page gérant des données affiche : état de chargement ET message d'erreur
- [ ] Nommage clair : composants en PascalCase, hooks en camelCase commençant par `use`, fonctions en camelCase verbes
- [ ] Pas de logique dupliquée (vérifier que les appels API passent tous par les hooks, pas de `fetch` direct dans les composants)

---

## Phase 5 — Checklist de rendu final

- [ ] `git clone <votre-repo>` sur une machine propre → `pnpm install` → `pnpm dev` + `pnpm api` → fonctionne
- [ ] `npx tsc --noEmit` → 0 erreur
- [ ] `pnpm lint` → 0 erreur
- [ ] `pnpm test` → tous les tests passent
- [ ] Le dossier `server/` n'a pas été modifié
- [ ] `.env` non commité (vérifier `.gitignore`)
- [ ] Les 3 membres du groupe ont des commits dans l'historique
- [ ] Branche `main` = version finale

---

## Points de vigilance (décisions architecturales)

| Sujet                     | Décision                                                                                             |
| ------------------------- | ---------------------------------------------------------------------------------------------------- |
| Clé de cache catalogue    | `queryKey: ['articles', filters]` — les filtres DANS la clé                                          |
| Optimistic updates        | `onMutate` (snapshot + update) → `onError` (rollback) → `onSettled` (resync)                         |
| Favoris icône             | Classes conditionnelles `cn()` sur `isFavorite`, pas de sélecteur CSS group (incompatible HugeIcons) |
| Skeleton loading          | `ArticleCardSkeleton` × 6 à la place de `LoadingSpinner` — évite le saut de layout                   |
| ScrollArea catalogue      | `flex-1 min-h-0` — s'adapte dynamiquement à la hauteur du collapsible                                |
| 204 No Content            | `api.ts` vérifie le status avant `response.json()`                                                   |
| Filtres catalogue         | State local + debounce 300ms + `useSearchParams` sync dans `useCatalogueFilters.ts`                  |
| Slider prix               | `[0, 500]` par défaut, actif uniquement si modifié (`isPriceRangeActive`)                            |
| Invalidation après DELETE | Invalider `['articles']` + `['myArticles']` + `['favorites']`                                        |
| Formulaire                | `useAppForm` (factory `createFormHook`) + Zod — schéma dans `src/lib/article.ts`                     |
| Formulaire édition        | Render `<ArticleForm />` uniquement si `isSuccess === true`                                          |
| Draft localStorage        | PublishPage uniquement, clé `'article-draft'`, jamais dans EditArticlePage                           |
| Formatage                 | Toujours via `formatPrice()` et `formatDate()` de `src/lib/formatters.ts`                            |
