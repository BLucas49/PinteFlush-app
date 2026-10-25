# PinteFlush

Jeu de poker en réalité augmentée (Expo / React Native, Android) — projet Ynov
Go!. Backend : [PinteFlush-back](../PinteFlush-back) (Colyseus + Express).

## Prérequis

- Node ≥ 24, JDK 17, Android SDK (voir « Problèmes »).
- Un téléphone Android compatible ARCore (la RA ne fonctionne pas sur
  émulateur).
- Le backend lancé (`npm start` dans PinteFlush-back, port 2567).

## Installation

```bash
npm install            # installe aussi les hooks Husky (script prepare)
cp .env.example .env   # sur téléphone physique : mettre l'IP LAN du PC, pas localhost
```

## Développement

La RA (Viro) et les cartes (MapLibre) exigent du code natif : Expo Go ne suffit
pas.

```bash
npm run android      # build + installation de la development build (expo run:android)
npm run start:dev    # serveur Metro pour le dev client
npm start            # serveur Metro standard (expo start)
```

> Sous Windows, lancer ces commandes depuis un chemin court (voir « Problèmes
> »).

En mode dev, l'écran de connexion propose un bouton « Connexion factice » le
temps que l'API d'authentification soit branchée.

## Qualité

```bash
npm run lint           # ESLint (expo lint)
npm run lint:fix       # ESLint avec correction automatique
npm run format         # Prettier : formate tout le projet
npm run format:check   # Prettier : vérifie sans modifier (CI)
npm run fix            # eslint --fix + prettier sur src/
npm run typecheck      # vérification TypeScript
npm test               # tests Jest
npm run test:coverage  # tests avec couverture
npm run check          # format:check + lint + typecheck + tests (= la CI)
```

## Architecture

### Couches

Imports autorisés dans un seul sens (appliqué par ESLint) :

```
app/  ─────►  navigation/  ─────►  features/<x>  ─────►  shared/
(composition)   (écrans → routes)   (une par domaine)     (briques communes)
```

- `shared/` ne dépend de rien d'autre dans `src/`.
- `features/` dépend de `shared/` et, via leur `index.ts`, d'autres features.
- `navigation/` assemble les écrans des features ; `app/` assemble le tout.

### Une feature

```
features/<feature>/
  index.ts        API publique (écrans, stores, hooks exportés)
  screens/        écrans fins : composition uniquement
  components/     composants propres à la feature
  hooks/          logique réutilisable (état local, effets)
  store/          stores zustand
  services/       appels API et services natifs de la feature
  <nom>.types.ts  types de la feature
```

Créer uniquement les dossiers utiles.

### Navigation

`RootNavigator` choisit `Auth` / `App` selon `authStore.status`. `MainTabs`
(Accueil, Historique, Classement, Profil, Réglages) vit dans `AppStack` avec les
écrans de partie et les modales.

Contrat avec le back : [docs/API_CONTRACT.md](docs/API_CONTRACT.md).

## Conventions Git

Hooks Husky (mêmes conventions que PinteFlush-back) :

- `pre-commit` : lint-staged (ESLint --fix + Prettier sur les fichiers stagés).
- `commit-msg` : `FEATURE - description` — FEATURE en MAJUSCULES, description de
  7 à 60 caractères. Ex. : `AUTH - Écran de connexion`.

## Tests

Aucun test pour le moment : seul le setup est en place (`jest.config.js`,
`jest.setup.ts`). `npm test` lance Jest + React Native Testing Library (API
asynchrone : `await render`, `await fireEvent.press`).

## Crédits

Cartes © contributeurs OpenStreetMap, tuiles OpenFreeMap.

## Règles du jeu

À définir.

## Problèmes

### `SDK location not found` (Android)

Gradle échoue avec « SDK location not found » lorsqu'il ne trouve pas le SDK
Android.

Solution : créer le fichier `android/local.properties` (non versionné, car
`android/` est généré) avec le chemin de ton SDK :

```properties
sdk.dir=C:/Users/<utilisateur>/AppData/Local/Android/Sdk
```

Alternative : définir la variable d'environnement `ANDROID_HOME` vers ce même
dossier. Le fichier est à recréer après un `expo prebuild --clean`, sauf si
`ANDROID_HOME` est définie.

### `Filename longer than 260 characters` (build Android sous Windows)

Le build natif (CMake/ninja) échoue si un chemin dépasse 260 caractères, ce qui
arrive facilement avec un projet dans OneDrive.

Solution sans déplacer le projet : créer un lecteur virtuel sur le dossier
**parent** et lancer les commandes depuis celui-ci.

```powershell
subst P: "C:\Users\<utilisateur>\...\React-Native"
cd P:\PinteFlush-app
npx expo run:android
```

- Le lecteur disparaît au redémarrage : refaire le `subst`.
- Si l'erreur persiste, supprimer `android/app/.cxx` (cache CMake conservant
  l'ancien chemin) puis relancer.
