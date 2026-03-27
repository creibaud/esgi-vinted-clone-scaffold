# Vinted Clone

Clone simplifié de Vinted — projet final du module React.js.

Pour les instructions complètes du projet (fonctionnalités, barème, API, soutenance), consultez [CONSIGNES.md](CONSIGNES.md).

## Prérequis

- [Node.js](https://nodejs.org/) 22+
- [pnpm](https://pnpm.io/)

## Démarrage rapide

```bash
git clone <url-du-repo>
cd vinted-clone
cp .env.example .env     # Éditer .env avec votre nom
pnpm install
```

Deux terminaux :

```bash
pnpm dev   # Frontend — http://localhost:5173
pnpm api   # API      — http://localhost:3000
```

## Scripts

| Commande      | Description                   |
| ------------- | ----------------------------- |
| `pnpm dev`    | Serveur de dev Vite           |
| `pnpm api`    | Serveur API Express           |
| `pnpm build`  | Build de production           |
| `pnpm lint`   | Lint avec oxlint              |
| `pnpm format` | Formate le code avec Prettier |
| `pnpm test`   | Lance les tests Vitest        |

## Notes

- Le dossier `server/` ne doit **pas** être modifié
- Le service `api.ts` gère automatiquement l'identification utilisateur
- Les données sont en mémoire — réinitialisées à chaque redémarrage du serveur
