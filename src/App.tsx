import { NavLink, Outlet } from "react-router-dom";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-teal-600 text-white">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <NavLink to="/" className="text-2xl font-bold hover:text-teal-100">
            Vinted Clone
          </NavLink>
          <nav className="flex items-center gap-4 text-sm">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                isActive ? "text-white font-semibold" : "hover:text-teal-200"
              }
            >
              Accueil
            </NavLink>
            <NavLink
              to="/my-articles"
              className={({ isActive }) =>
                isActive ? "text-white font-semibold" : "hover:text-teal-200"
              }
            >
              Mes annonces
            </NavLink>
            <NavLink
              to="/favorites"
              className={({ isActive }) =>
                isActive ? "text-white font-semibold" : "hover:text-teal-200"
              }
            >
              Favoris
            </NavLink>
            <NavLink
              to="/publish"
              className={({ isActive }) =>
                isActive
                  ? "bg-white text-teal-700 font-semibold px-4 py-1.5 rounded-full"
                  : "bg-white text-teal-700 font-semibold px-4 py-1.5 rounded-full hover:bg-teal-50"
              }
            >
              Publier
            </NavLink>
          </nav>
        </div>
      </header>
      <main className="max-w-4xl mx-auto p-6">
        <Outlet />
        <h2 className="text-xl font-semibold mb-4">
          Bienvenue sur le projet Vinted Clone !
        </h2>
        <p className="text-gray-600 mb-2">
          Ce scaffold contient tout le nécessaire pour démarrer. Consultez le
          fichier <code className="bg-gray-200 px-1 rounded">CONSIGNES.md</code>{" "}
          pour les instructions.
        </p>
        <p className="text-gray-500 text-sm mt-4">
          La page « Mes annonces » sera vide au démarrage — c'est normal. Créez
          votre première annonce pour la voir apparaître.
        </p>
        <p className="text-gray-400 text-xs mt-6">
          Remplacez ce contenu par votre application.
        </p>
      </main>
    </div>
  );
}
