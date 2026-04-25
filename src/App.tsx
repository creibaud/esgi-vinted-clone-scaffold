import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import {
    FavouriteIcon,
    Home01Icon,
    UserIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArticleFormDialog } from "@/components/ArticleFormDialog";
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Separator } from "@/components/ui/separator";
import { Toaster } from "@/components/ui/sonner";
import { useCreateArticle } from "@/hooks/article.hooks";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
    { to: "/", label: "Catalogue", icon: Home01Icon, exact: true },
    { to: "/my-articles", label: "Mes annonces", icon: UserIcon, exact: false },
    { to: "/favorites", label: "Favoris", icon: FavouriteIcon, exact: false },
] as const;

export default function App() {
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const { mutateAsync: createArticle, isPending } = useCreateArticle();

    return (
        <div className="bg-background flex h-screen flex-col overflow-hidden">
            <header className="bg-background/95 supports-backdrop-filter:bg-background/80 fixed inset-x-0 top-0 z-50 h-14 border-b backdrop-blur-sm">
                <div className="container mx-auto flex h-full max-w-4xl items-center justify-between px-4">
                    <NavLink to="/" className="flex items-center gap-2">
                        <div className="bg-primary text-primary-foreground flex size-7 items-center justify-center rounded-md text-sm font-bold">
                            V
                        </div>
                        <span className="hidden font-bold sm:block">
                            Vinted Clone
                        </span>
                    </NavLink>

                    <NavigationMenu>
                        <NavigationMenuList className="gap-0.5">
                            {NAV_LINKS.map(({ to, label, icon, exact }) => (
                                <NavigationMenuItem key={to}>
                                    <NavigationMenuLink
                                        asChild
                                        active={
                                            exact
                                                ? pathname === to
                                                : pathname.startsWith(to)
                                        }
                                        className={cn(
                                            navigationMenuTriggerStyle(),
                                            "gap-1.5",
                                        )}
                                    >
                                        <NavLink to={to}>
                                            <HugeiconsIcon
                                                icon={icon}
                                                className="size-4 shrink-0"
                                            />
                                            <span className="hidden sm:block">
                                                {label}
                                            </span>
                                        </NavLink>
                                    </NavigationMenuLink>
                                </NavigationMenuItem>
                            ))}
                        </NavigationMenuList>
                    </NavigationMenu>

                    <ArticleFormDialog
                        onSubmit={async (data) => {
                            const article = await createArticle(data);
                            navigate(`/articles/${article.id}`);
                        }}
                        isLoading={isPending}
                    />
                </div>
            </header>

            <main className="mt-14 flex flex-1 flex-col overflow-hidden">
                <Separator />
                <div className="container mx-auto flex w-full max-w-4xl flex-1 flex-col overflow-hidden px-4 py-6">
                    <Outlet />
                </div>
            </main>
            <Toaster />
        </div>
    );
}
