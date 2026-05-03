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
- [x] Créer `src/components/PageHeader.tsx` — back-button + titre + description réutilisable (props : `backTo`, `backLabel`, `title?`, `description?`)
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

- [x] `useArticles(filters?)` — `queryKey: ['articles', filters]`, query params construits sans valeurs `undefined` (filtrées avant `URLSearchParams`)
- [x] `useArticle(articleId)` — `queryKey: ['article', id]`
- [x] `useMyArticles()` — `queryKey: ['myArticles']`, utilise `useCurrentUserId()`
- [x] `useFavoriteArticles()` — `queryKey: ['favorites']`, retourne `{ favorites, favoriteIds: Set<string> }`
- [x] `useCreateArticle()` — POST `/articles`, `mutationKey: ['createArticle']`, invalide via `onSettled`
- [x] `useUpdateArticle(articleId)` — PUT `/articles/:id`, optimistic update sur `article`, `myArticles`, `articles` — `cancelQueries` en parallèle (`Promise.all`)
- [x] `useDeleteArticle(articleId)` — DELETE `/articles/:id`, optimistic update retire de `articles`, `myArticles`, `favorites` — `cancelQueries` en parallèle (`Promise.all`)
- [x] `useToggleFavorite()` — POST/DELETE `/favorites/:id`, optimistic update sur `favoriteIds` + rollback sur erreur

> **Pattern appliqué sur toutes les mutations (sauf create)** : `onMutate` (cancelQueries + snapshot + setQueryData) → `onError` (rollback) → `onSettled` (invalidateQueries)

### 1.4 Layout global

- [x] `App.tsx` — header `fixed` (`h-14`, `z-50`), layout `flex flex-col h-screen overflow-hidden`, backdrop blur, nav responsive avec icônes (texte caché sur mobile), `<Toaster />` monté à la racine
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
- [x] Bouton "Effacer les filtres" désactivé si aucun filtre actif (`variant="ghost"`, pas destructive)
- [x] Compteur dynamique de résultats dans l'input de recherche
- [x] Icône du bouton filtre toggle entre `FilterAddIcon` / `FilterRemoveIcon`
- [x] Filtres synchronisés dans l'URL via `useSearchParams()` — `category`/`condition`/`sort` écrits immédiatement, `search`/`priceRange` après debounce via `useEffect`
- [x] Message "Aucun article ne correspond" quand `articles.length === 0` (composant `Empty` shadcn)

### 2.2 ArticleDetailPage — 1 pt

- [x] Récupérer `:id` via `useParams()`
- [x] Appeler `useArticle(id)` (TanStack Query)
- [x] Afficher dans `Card` shadcn : image grande, titre, prix `formatPrice()`, description, catégorie, état, taille, vendeur, date `formatDate()`
- [x] Lien "← Retour au catalogue" vers `/`
- [x] `<LoadingSpinner />` pendant `isLoading`
- [x] `<ErrorMessage />` si `isError` (404 ou erreur API)

### 2.3 PublishPage — 2 pts

- [x] Utiliser `<ArticleForm />` sans `defaultValues` (mode création)
- [x] Appeler `useCreateArticle()` (TanStack Query mutation) dans `onSubmit`
- [x] Après création réussie : redirect vers `/articles/:newId` via `useNavigate`
- [x] `PageHeader` avec titre + description
- [x] **Feature optionnelle draft (voir Phase 3.1)** : `useDraftForm` intégré (restauration au montage + clear après publication)

### 2.4 MyArticlesPage — 1,5 pt

- [x] Appeler `useMyArticles()` (TanStack Query — articles de l'utilisateur courant uniquement)
- [x] État vide : composant `Empty` shadcn + lien vers `/publish`
- [x] Bouton "Supprimer" sur chaque article → `AlertDialog` shadcn (confirmation) → `useDeleteArticle()` → optimistic update immédiat
- [x] Bouton "Modifier" sur chaque article → `useNavigate` vers `/articles/:id/edit`
- [x] `<LoadingSpinner />` pendant `isLoading`, `<ErrorMessage />` si `isError`
- [x] Type `ArticleRow` utilisé : `Article` directement (plus de `ReturnType` acrobatique)

### 2.5 FavoritesPage — 2 pts

- [x] Appeler `useFavoriteArticles()` (TanStack Query)
- [x] État vide : composant `Empty` shadcn + lien vers catalogue
- [x] Bouton favori → `useToggleFavorite()` → optimistic update immédiat
- [x] `<LoadingSpinner />` pendant `isLoading`, `<ErrorMessage />` si `isError`

### 2.6 Navigation cohérente — 0,5 pt

- [x] NavLinks `App.tsx` : Accueil, Mes annonces, Favoris, bouton "Publier" (`ArticleFormDialog`)
- [x] `ArticleFormDialog.onSubmit` branché sur `useCreateArticle`
- [x] Lien "← Retour au catalogue" dans ArticleDetailPage
- [x] Pas de liens cassés dans toute l'application
- [x] Créer `src/pages/NotFoundPage.tsx` + route `path="*"` dans `main.tsx` (page 404 avec bouton retour catalogue)

---

## Phase 3 — Features optionnelles (1,5 pt chacune)

### 3.1 Brouillon automatique — 1,5 pt

- [x] Créer `src/hooks/useDraftForm.ts`
    - Lit le brouillon dans `localStorage` au montage, retourne `{ savedValues }`
    - `saveDraft(values)` et `clearDraft()` exportés comme fonctions pures (pas via le hook — pas d'état réactif)
- [x] Intégré dans `PublishPage.tsx` uniquement (PAS dans EditArticlePage — collision de clé)
- [x] `clearDraft()` appelé dans le handler `onSubmit` après création réussie
- [x] Auto-save sur changement : `onValuesChange={saveDraft}` passé à `<ArticleForm />` → branché sur le validateur `onChange` de TanStack Form (équivalent à `useStore` + `useEffect`, sans subscription manuelle)
- [x] Bouton "Réinitialiser" dans `PublishPage` appelle aussi `clearDraft()` via la prop `onReset` de `ArticleForm`
- [x] **Fix bug** : `ArticleForm` accepte une prop `resetEmpty` — `PublishPage` la passe `true` pour que le reset force des valeurs vides (avant : `form.reset()` restaurait au brouillon localStorage = effet nul). `EditArticlePage` ne la passe pas → comportement par défaut (reset = retour aux valeurs de l'article)
- [x] `ArticleFormDialog` réinitialisé à la fermeture du dialog : remount via `key` incrémenté dans `onOpenChange`
- [x] `ArticleFormDialog` (header) : saisie perdue à la fermeture — décision prise (dialog = saisie rapide, pas de draft, évite collision de clé avec PublishPage)

### 3.2 Édition d'annonce — 1,5 pt

- [x] `src/pages/EditArticlePage.tsx` implémenté
- [x] Récupère `:id` via `useParams()`
- [x] Appelle `useArticle(id)` — rendu conditionnel sur `isSuccess` uniquement (évite init TanStack Form avec valeurs vides)
- [x] Vérifie `article.userId === currentUserId` → `<ErrorMessage />` "Accès refusé" si non
- [x] Passe `defaultValues={article}` à `<ArticleForm />`
- [x] `useUpdateArticle(id)` dans `onSubmit` → redirect vers `/articles/:id`
- [x] Bouton "Modifier" dans `MyArticlesPage` → `/articles/:id/edit`

### 3.3 Tests composants — 1,5 pt

- [x] Dépendances de test déjà installées (`@testing-library/react`, `@testing-library/jest-dom`, `@testing-library/user-event`, `jsdom`)
- [x] `src/test/setup.ts` importe `@testing-library/jest-dom/vitest`
- [x] `vitest.config.ts` : alias `@/` + `include: ["src/**/*.{test,spec}.{ts,tsx}"]` pour limiter les tests à `src/`
- [x] `src/components/ArticleCard.test.tsx` (3 tests : titre/prix/vendeur, click favori, état actif aria-label)
- [x] `src/components/ArticleForm.test.tsx` (2 tests : defaultValues préremplis, soumission vide bloquée)
- [x] `src/types/article.test.ts` (9 tests : schéma Zod valide/invalide sur tous les champs)
- [x] `src/lib/formatters.test.ts` (5 tests : `formatPrice`, `formatDate`)
- [x] `pnpm test` → **19 tests passent** dans 4 fichiers
- [x] `src/test/setup.ts` : mocks `ResizeObserver`, `hasPointerCapture`, `releasePointerCapture`, `scrollIntoView` (jsdom n'a pas ces APIs natives utilisées par Radix Tooltip/Select/Slider)

### 3.4 Design responsive — 1,5 pt

- [x] `ArticleGrid.tsx` : `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`
- [x] `App.tsx` navbar : texte masqué sur mobile (`hidden sm:block`), icônes seules visibles
- [x] `ArticleForm.tsx` : champs en colonne sur mobile (layout `FieldGroup` = colonne par défaut)
- [x] `ArticleDetailPage.tsx` : image pleine largeur sur mobile (`grid md:grid-cols-2`), `Card` détail en dessous
- [x] `MyArticlesPage.tsx` : `ArticleRow` en `flex-col sm:flex-row` (image full-width mobile, à côté en sm+), CardTitle stack mobile, boutons full-width mobile
- [x] `FavoritesPage.tsx` : `Item` shadcn déjà compact (size-14 image + ItemTitle/Description + 1 icône), tient sur 375px
- [x] `CataloguePage.tsx` : barre filtres en `flex-wrap`, input `min-w-0 flex-1`, "résultats" caché mobile, label "Effacer les filtres" caché mobile (icône seule)
- [x] `PublishPage.tsx` / `EditArticlePage.tsx` : `ScrollArea` déjà OK sur mobile (FieldGroup en colonne, formulaire scrollable)
- [x] `NotFoundPage.tsx` : responsive d'emblée (Empty centré, padding responsive)
- [ ] **Tester chaque page à 375px** dans DevTools : à valider visuellement avant rendu

---

## Phase 4 — Qualité technique (5 pts)

- [x] `npx tsc --noEmit` → **0 erreur** (vérifié sur cette branche)
- [x] `pnpm lint` → **0 erreur** oxlint (68 fichiers, 93 règles)
- [x] `pnpm format` → exécuté, code formaté
- [x] `pnpm build` → OK (production build vérifié)
- [x] Pas de `any` TypeScript dans tout le code
- [x] Chaque page gérant des données affiche : état de chargement ET message d'erreur
- [x] Nommage clair : composants en PascalCase, hooks en camelCase commençant par `use`, fonctions en camelCase verbes
- [x] Pas de logique dupliquée (appels API via hooks, pas de `fetch` direct dans les composants)

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

## Phase 6 — Polish QA & Design (post-implémentation initiale)

### 6.1 Composants shadcn ajoutés

- [x] `Tooltip` + `TooltipProvider` global dans `RootLayout` (delayDuration 300ms)
- [x] `Avatar` + `AvatarFallback` (initiale du nom vendeur)
- [x] `Sheet` (installé pour usage futur)

### 6.2 Bugs fonctionnels corrigés

- [x] `ArticleCard.tsx` : bouton "Voir" avait `stopPropagation` mais aucun handler → bouton cassé. Ajout de `handleViewDetail()` dans `onClick`
- [x] `ArticleDetailPage.tsx` : `ErrorMessage` standalone sur 404 → user bloqué sans bouton retour. Wrappé avec `PageHeader`
- [x] `EditArticlePage.tsx` : 2× `ErrorMessage` standalone (404 + accès refusé) → idem fix avec `PageHeader` adapté
- [x] `ArticleCardSkeleton.tsx` : `h-60` ≠ `ArticleCard` `h-56` → saut de layout corrigé (`h-56`)
- [x] `PublishPage` : reset ne vidait pas vraiment le form quand un brouillon existait — fix via prop `resetEmpty` sur `ArticleForm`

### 6.3 Tooltips sur boutons icônes

- [x] `ArticleCard` : Toggle favori
- [x] `FavoritesPage` : bouton retirer
- [x] `CataloguePage` : trigger filtre, "Effacer les filtres" (label caché mobile)
- [x] `MyArticlesPage` : bouton supprimer (icône-only ghost)

### 6.4 Avatar + identité visuelle

- [x] `ArticleCard` footer : Avatar size-7 + nom vendeur
- [x] `ArticleDetailPage` section vendeur : Avatar size-10 + nom + date

### 6.5 Refonte visuelle MyArticlesPage

- [x] Card avec `hover:shadow-md`, image plus grande (`sm:w-44`)
- [x] Header : titre + prix hiérarchisés à gauche, **bouton Supprimer en icon-only ghost** discret avec Tooltip à droite
- [x] 3 badges (catégorie + état + taille)
- [x] **Description preview** (line-clamp-2)
- [x] Footer : icône calendrier + date à gauche, bouton **Modifier primary `size="sm"`** avec icône à droite
- [x] Header de page : sous-titre "N annonces en ligne", bouton Publier avec icône PlusSign et label adaptatif (mobile "Publier" / desktop "Publier une annonce")

### 6.6 ArticleForm restructuré

- [x] 3 sections sémantiques avec `FieldSet` + `FieldLegend` : "Informations générales" / "Détails du produit" / "Photo"
- [x] Grid 2-col `sm+` pour prix+taille et catégorie+état (form plus compact en desktop)
- [x] Bouton "Réinitialiser" : `variant="ghost"` + icône `ArrowReloadHorizontalIcon` (moins prominent)
- [x] Bouton submit : `<Spinner />` quand `isLoading`

### 6.7 NotFoundPage repensée

- [x] Grand "404" en visuel (`text-7xl/8xl`, `text-primary/20`)
- [x] Bouton retour avec icône `ArrowLeft01Icon`

### 6.8 Violations shadcn corrigées

- [x] `App.tsx` : `h-7 w-7` → `size-7`
- [x] `ArticleCard.tsx` : `h-8 w-8` → `size-8` sur Toggle favori
- [x] Icônes dans Button (PageHeader, MyArticlesPage Modifier/Supprimer, NotFoundPage) : `mr-1 size-4` → `data-icon="inline-start"`

### 6.9 Padding ScrollArea — focus rings et hover shadows

- [x] `PublishPage` / `EditArticlePage` : inner `<div>` passe de `pb-4` à `p-1 pb-4` (4px breathing pour focus rings 3px)
- [x] `MyArticlesPage` (cards) : passe à `p-2 pb-4` (8px pour `hover:shadow-md`)
- [x] `FavoritesPage` (Items) : `ItemGroup` → `p-1 pb-4`
- [x] `CataloguePage` (skeleton + grid) : passe à `p-2 pb-4` (cards avec hover shadow)

### 6.10 Tests adaptés

- [x] `ArticleCard.test.tsx` : wrapper `TooltipProvider` ajouté dans `renderCard` (sinon `Tooltip must be used within TooltipProvider`)

### 6.11 Responsive amélioré

- [x] `MyArticlesPage` `ArticleRow` : `flex-col sm:flex-row` (image full-width mobile, à côté sm+), titre+prix stack mobile, boutons full-width mobile
- [x] `CataloguePage` : barre top en `flex-wrap`, input `min-w-0 flex-1`, "résultats" caché mobile, label "Effacer" caché mobile

---

## Points de vigilance (décisions architecturales)

| Sujet                     | Décision                                                                                                                                                                 |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Clé de cache catalogue    | `queryKey: ['articles', filters]` — les filtres DANS la clé                                                                                                              |
| Optimistic updates        | `onMutate` (snapshot + update) → `onError` (rollback) → `onSettled` (resync)                                                                                             |
| Favoris icône             | `cn()` sur `isFavorite` — pas de sélecteur CSS group (incompatible HugeIcons)                                                                                            |
| Skeleton loading          | `ArticleCardSkeleton` × 6 — évite le saut de layout                                                                                                                      |
| ScrollArea catalogue      | `flex-1 min-h-0` — s'adapte à la hauteur du collapsible                                                                                                                  |
| 204 No Content            | `api.ts` vérifie le status avant `response.json()`                                                                                                                       |
| Filtres catalogue         | State local + debounce 300ms + `useSearchParams` sync                                                                                                                    |
| Slider prix               | `[0, 500]` par défaut, actif uniquement si modifié                                                                                                                       |
| Invalidation après DELETE | Invalider `['articles']` + `['myArticles']` + `['favorites']`                                                                                                            |
| Formulaire                | `useAppForm` (factory `createFormHook`) + Zod                                                                                                                            |
| Formulaire édition        | Render `<ArticleForm />` uniquement si `isSuccess === true`                                                                                                              |
| Draft localStorage        | PublishPage uniquement, clé `'article-draft'`, jamais dans EditArticlePage — `saveDraft`/`clearDraft` exportés directement (fonctions pures, pas retournées via le hook) |
| Formatage                 | Toujours via `formatPrice()` et `formatDate()` de `src/lib/formatters.ts`                                                                                                |
| PageHeader                | `src/components/PageHeader.tsx` — réutilisé dans PublishPage, EditArticlePage, ArticleDetailPage                                                                         |
| Nav responsive            | Texte masqué `hidden sm:block`, icônes seules sur mobile                                                                                                                 |
| Bouton Effacer filtres    | `variant="ghost"` — pas `destructive` (trop agressif pour une action secondaire)                                                                                         |
| TooltipProvider           | Global dans `RootLayout` avec `delayDuration={300}` — tous les Tooltip de l'app héritent                                                                                 |
| Reset form (Publish/Edit) | `resetEmpty` prop sur `ArticleForm` : Publish=true (vide tout), Edit=false (restaure article)                                                                            |
| Padding ScrollArea        | Padding intérieur (`p-1` pour forms, `p-2` pour cards avec hover-shadow) — sinon focus rings et shadows clipés par `overflow:hidden` du viewport                         |
| Icônes dans Button        | `data-icon="inline-start"` (pas `mr-2 size-4`) — règle shadcn, le composant Button gère le sizing et spacing                                                             |
| Identité vendeur          | `Avatar` + `AvatarFallback` initiale — réutilisé dans `ArticleCard` (size-7) et `ArticleDetailPage` (size-10)                                                            |
