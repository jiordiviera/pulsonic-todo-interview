# PULSONIC Todo List

Application de gestion de tâches développée avec Vue 3 dans le cadre de l'entretien technique PULSONIC.

L'objectif est de proposer une implémentation simple, maintenable et testée, tout en mettant en pratique les principaux concepts de l'écosystème Vue 3.

## Fonctionnalités

- Créer une tâche
- Marquer une tâche comme terminée ou active
- Modifier une tâche existante
- Supprimer une tâche
- Filtrer les tâches par état : toutes, actives ou terminées
- Afficher le nombre de tâches restantes
- Conserver les tâches après le rechargement de la page
- Interface responsive
- Contrôles accessibles au clavier

## Stack technique

- Vue 3
- TypeScript
- Vite
- Tailwind CSS
- Vitest
- Vue Test Utils
- Happy DOM
- Biome

## Prérequis

- Node.js 24+
- pnpm

## Installation

Cloner le dépôt :

```bash
git clone https://github.com/jiordiviera/pulsonic-todo-interview.git
cd pulsonic-todo-interview
```

Installer les dépendances :

```bash
pnpm install
```

Lancer le serveur de développement :

```bash
pnpm dev
```

Vite affiche ensuite l'adresse locale de l'application dans le terminal, généralement :

```text
http://localhost:5173
```

## Vérification du projet

Exécuter les tests :

```bash
pnpm test:run
```

Vérifier les types TypeScript :

```bash
pnpm typecheck
```

Vérifier le code avec Biome :

```bash
pnpm check
```

Construire la version de production :

```bash
pnpm build
```

## Architecture

```text
src/
├── components/
│   ├── TodoFilters.vue
│   ├── TodoForm.vue
│   ├── TodoItem.vue
│   └── TodoList.vue
├── composables/
│   └── useTodos.ts
├── types/
│   └── todo.ts
├── utils/
│   └── storage.ts
├── App.vue
├── main.ts
└── style.css
```

### Composants

Les composants sont principalement responsables de l'affichage et des interactions utilisateur.

Les données leur sont transmises via des props et les actions remontent vers le parent à travers des événements Vue typés.

Cette approche permet d'éviter que les composants de présentation contiennent directement la logique métier ou la logique de persistance.

### Composable `useTodos`

Le composable `useTodos` centralise la logique liée aux tâches :

- création
- modification
- suppression
- changement d'état
- filtrage
- calcul du nombre de tâches restantes
- synchronisation avec la persistance locale

Cela permet de séparer la logique de l'application de sa représentation visuelle et facilite également les tests.

### Persistance

Les tâches sont conservées dans le `localStorage` du navigateur.

Pour le périmètre de cet exercice, l'application reste volontairement côté client. L'ajout d'une API et d'une base de données apporterait une complexité supplémentaire qui n'est pas nécessaire pour les fonctionnalités demandées.

La persistance est néanmoins isolée dans `storage.ts`. Elle peut donc être remplacée ultérieurement sans coupler les composants Vue au mécanisme de stockage.

### Identifiants

Les tâches utilisent `crypto.randomUUID()`.

Les identifiants ne dépendent donc pas de la taille du tableau de tâches, ce qui évite les collisions après la suppression puis la création de nouvelles tâches.

### Dates

Les dates de création sont enregistrées au format ISO 8601 avec `toISOString()`.

Le formatage destiné à l'utilisateur reste une responsabilité de la couche de présentation. Le format ISO fournit quant à lui une représentation stable pour le stockage, le parsing et le tri.

## Tests

Les tests utilisent Vitest et Vue Test Utils.

Ils couvrent notamment :

- la création d'une tâche
- la normalisation du titre
- le rejet des tâches vides
- le changement d'état d'une tâche
- la suppression
- la modification
- les filtres
- le calcul du nombre de tâches restantes
- les événements émis par les composants

Happy DOM fournit les API navigateur nécessaires aux tests des composants et à l'utilisation de `localStorage` lorsque Vitest s'exécute dans Node.js.

## Qualité du code

Biome est utilisé pour le formatage et l'analyse statique du code.

TypeScript et `vue-tsc` assurent la vérification statique des types dans les fichiers TypeScript et les composants Vue.

Avant une livraison, les commandes suivantes doivent toutes réussir :

```bash
pnpm check
pnpm typecheck
pnpm test:run
pnpm build
```

## Choix techniques

### Pourquoi un composable plutôt que Pinia ?

L'application possède un état limité et un seul domaine fonctionnel principal.

Un composable Vue permet ici de centraliser la logique sans introduire un gestionnaire d'état global supplémentaire.

Si l'application devait évoluer vers plusieurs domaines ou plusieurs vues partageant un état complexe, l'introduction d'un outil comme Pinia pourrait être envisagée.

### Pourquoi `localStorage` plutôt qu'une API ?

Le sujet porte principalement sur la réalisation d'une application TODO avec Vue 3.

J'ai donc choisi de concentrer l'implémentation sur Vue, la qualité du code, les tests et la séparation des responsabilités plutôt que d'ajouter une API uniquement pour démontrer une architecture client-serveur.

La couche de persistance étant isolée, elle peut néanmoins être remplacée par une API sans modifier directement les composants.

## Améliorations possibles

Dans le cadre d'une application plus complète, plusieurs évolutions seraient envisageables :

- synchronisation avec une API
- authentification et listes propres à chaque utilisateur
- gestion optimiste des mises à jour
- réorganisation des tâches par glisser-déposer
- dates d'échéance
- recherche de tâches
- tests end-to-end