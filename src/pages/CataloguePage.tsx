import { useState } from "react";
import {
    FilterAddIcon,
    FilterRemoveIcon,
    Search,
    SearchRemoveIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArticleCardSkeleton } from "@/components/ArticleCardSkeleton";
import { ArticleGrid } from "@/components/ArticleGrid";
import { ErrorMessage } from "@/components/ErrorMessage";
import { FilterCombobox } from "@/components/FilterCombobox";
import { Button } from "@/components/ui/button";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
    Empty,
    EmptyDescription,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle,
} from "@/components/ui/empty";
import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
} from "@/components/ui/input-group";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import {
    useArticles,
    useFavoriteArticles,
    useToggleFavorite,
} from "@/hooks/article.hooks";
import { PRICE_MAX, useCatalogueFilters } from "@/hooks/useCatalogueFilters";
import {
    CATEGORY_OPTIONS,
    CONDITION_OPTIONS,
    SORT_OPTIONS,
} from "@/lib/article";
import { formatPrice } from "@/lib/formatters";

export default function CataloguePage() {
    const [filtersOpen, setFiltersOpen] = useState(false);

    const {
        search,
        setSearch,
        priceRange,
        setPriceRange,
        category,
        setCategory,
        condition,
        setCondition,
        sort,
        setSort,
        hasActiveFilters,
        clearFilters,
        articleFilters,
    } = useCatalogueFilters();

    const { data: articles, isLoading, isError } = useArticles(articleFilters);
    const { data: favoritesData } = useFavoriteArticles();
    const { mutate: toggleFavorite } = useToggleFavorite();

    const favoriteIds = favoritesData?.favoriteIds ?? new Set<string>();

    function handleToggleFavorite(articleId: string) {
        toggleFavorite({ articleId, isFavorite: favoriteIds.has(articleId) });
    }

    return (
        <div className="flex h-full flex-col gap-4">
            <div className="flex flex-col gap-0 px-4">
                <h1 className="text-2xl font-bold">Catalogue</h1>
                <p className="text-muted-foreground mt-2">
                    Découvrez les articles disponibles dans notre catalogue.
                </p>
            </div>

            <Collapsible
                open={filtersOpen}
                onOpenChange={setFiltersOpen}
                className="bg-popover mx-4 rounded-md border p-2"
            >
                <div className="flex w-full items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                        <InputGroup className="max-w-xs">
                            <InputGroupInput
                                placeholder="Rechercher des articles..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                            <InputGroupAddon>
                                <HugeiconsIcon icon={Search} />
                            </InputGroupAddon>
                            {articles && (
                                <InputGroupAddon align="inline-end">
                                    {articles.length} résultat
                                    {articles.length !== 1 ? "s" : ""}
                                </InputGroupAddon>
                            )}
                        </InputGroup>
                        <CollapsibleTrigger asChild>
                            <Button variant="outline" size="icon">
                                <HugeiconsIcon
                                    icon={
                                        filtersOpen
                                            ? FilterRemoveIcon
                                            : FilterAddIcon
                                    }
                                />
                            </Button>
                        </CollapsibleTrigger>
                    </div>
                    <Button
                        variant="destructive"
                        className="border-destructive/50"
                        disabled={!hasActiveFilters}
                        onClick={clearFilters}
                    >
                        <HugeiconsIcon icon={FilterRemoveIcon} />
                        Effacer les filtres
                    </Button>
                </div>

                <CollapsibleContent className="mt-2">
                    <Separator />
                    <div className="mt-2 flex flex-col gap-4">
                        <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                            <FilterCombobox
                                items={CATEGORY_OPTIONS}
                                value={category}
                                onValueChange={setCategory}
                                placeholder="Catégorie"
                                emptyMessage="Aucune catégorie trouvée."
                            />
                            <FilterCombobox
                                items={CONDITION_OPTIONS}
                                value={condition}
                                onValueChange={setCondition}
                                placeholder="État"
                                emptyMessage="Aucun état trouvé."
                            />
                            <FilterCombobox
                                items={SORT_OPTIONS}
                                value={sort}
                                onValueChange={setSort}
                                placeholder="Trier par"
                                emptyMessage="Aucun tri disponible."
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-muted-foreground font-medium">
                                    Prix
                                </span>
                                <span className="tabular-nums">
                                    {formatPrice(priceRange[0])} —{" "}
                                    {formatPrice(priceRange[1])}
                                </span>
                            </div>
                            <Slider
                                min={0}
                                max={PRICE_MAX}
                                step={5}
                                value={priceRange}
                                onValueChange={(v) =>
                                    setPriceRange(v as [number, number])
                                }
                            />
                            <div className="text-muted-foreground flex justify-between text-xs">
                                <span>{formatPrice(0)}</span>
                                <span>{formatPrice(PRICE_MAX)}</span>
                            </div>
                        </div>
                    </div>
                </CollapsibleContent>
            </Collapsible>

            <ScrollArea className="min-h-0 flex-1 px-4">
                {isLoading && (
                    <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {Array.from({ length: 6 }, (_, i) => (
                            <ArticleCardSkeleton key={i} />
                        ))}
                    </div>
                )}
                {isError && (
                    <ErrorMessage
                        title="Erreur de chargement"
                        message="Impossible de récupérer les articles. Veuillez réessayer."
                    />
                )}
                {articles?.length === 0 && (
                    <Empty className="animate-in fade-in-0 duration-300">
                        <EmptyHeader>
                            <EmptyMedia variant="icon">
                                <HugeiconsIcon icon={SearchRemoveIcon} />
                            </EmptyMedia>
                            <EmptyTitle>Aucun article trouvé</EmptyTitle>
                            <EmptyDescription>
                                Aucun article ne correspond à vos critères.
                                Essayez de modifier ou d'effacer vos filtres.
                            </EmptyDescription>
                        </EmptyHeader>
                    </Empty>
                )}
                {articles && articles.length > 0 && (
                    <div className="animate-in fade-in-0 duration-300">
                        <ArticleGrid
                            articles={articles}
                            favoriteIds={favoriteIds}
                            onToggleFavorite={handleToggleFavorite}
                        />
                    </div>
                )}
            </ScrollArea>
        </div>
    );
}
