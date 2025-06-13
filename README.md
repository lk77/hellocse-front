# HelloCse - Test Technique front

## Prérequis

- WSL
- Node.js

## Installation via WSL

- Installez les dépendances npm :
````bash
npm install
````

- Build le projet :
````bash
npm run build
````

- Completez le fichier .env à l'aide du fichier .env.example

- Lancer le projet :
````bash
node .output/server/index.mjs
````

## Execution des tests

Lancez les tests via :

````bash
npm run test
````

## Lint

Lancez eslint via :

````bash
npm run lint
````