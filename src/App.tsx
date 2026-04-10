import { NavLink, Outlet, useLocation } from "react-router-dom";
import { ArticleFormDialog } from "@/components/ArticleFormDialog";
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

export default function App() {
    const { pathname } = useLocation();

    return (
        <div className="bg-background min-h-screen">
            <header className="border-b px-4 py-2">
                <div className="container mx-auto flex items-center justify-between">
                    <NavLink to="/" className="text-xl font-bold">
                        Vinted Clone
                    </NavLink>
                    <NavigationMenu>
                        <NavigationMenuList className="gap-1">
                            <NavigationMenuItem>
                                <NavigationMenuLink
                                    asChild
                                    active={pathname === "/"}
                                    className={navigationMenuTriggerStyle()}
                                >
                                    <NavLink to="/">Accueil</NavLink>
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <NavigationMenuLink
                                    asChild
                                    active={pathname === "/my-articles"}
                                    className={navigationMenuTriggerStyle()}
                                >
                                    <NavLink to="/my-articles">
                                        Mes annonces
                                    </NavLink>
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <NavigationMenuLink
                                    asChild
                                    active={pathname === "/favorites"}
                                    className={navigationMenuTriggerStyle()}
                                >
                                    <NavLink to="/favorites">Favoris</NavLink>
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                        </NavigationMenuList>
                    </NavigationMenu>
                    <ArticleFormDialog
                        onSubmit={async () => {
                            console.log("Article created");
                        }}
                    />
                </div>
            </header>
            <main className="mx-auto max-w-4xl p-6">
                <Outlet />
            </main>
        </div>
    );
}
