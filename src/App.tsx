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
        <div className="bg-background flex h-screen flex-col overflow-hidden">
            <header className="bg-background fixed inset-x-0 top-0 z-50 h-14 border-b px-4">
                <div className="container mx-auto flex h-full items-center justify-between">
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
            <main className="mt-14 flex flex-1 flex-col overflow-hidden">
                <div className="mx-auto flex w-full max-w-4xl flex-1 flex-col overflow-hidden py-6">
                    <Outlet />
                </div>
            </main>
        </div>
    );
}
