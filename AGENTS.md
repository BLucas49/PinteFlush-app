This is an Expo/React Native mobile application. Prioritize mobile-first
patterns, performance, and cross-platform compatibility.

## Expo has changed — do not trust your training data

Expo ships breaking changes every SDK release. APIs you remember are likely
renamed, moved, or removed. Before writing any code that touches an Expo, EAS,
or React Native API:

1. Read the major version of the `expo` package in `package.json`.
2. Fetch the matching versioned docs:
   `https://docs.expo.dev/versions/v<major>.0.0/`
3. For anything else, fetch https://docs.expo.dev/llms.txt — an index of all
   Expo docs with corrections to common LLM misconceptions. Follow its links to
   the specific page you need; never answer from memory.

## Commands

Use `bunx` instead of `npx` if the project uses bun (`bun.lock` present).

```bash
npx expo install <package>  # ALWAYS use instead of npm/yarn/pnpm/bun add — resolves SDK-compatible versions
npx expo start              # start the dev server
npx expo lint               # lint
npx tsc --noEmit            # typecheck
npx expo-doctor             # diagnose dependency and config issues
npx expo install --fix      # fix incompatible package versions
```

Run lint and typecheck before declaring any task done.

## Navigation & Routing

- Use **React Navigation** (`@react-navigation/native`, `native-stack`,
  `bottom-tabs`) for all navigation. Do **not** use Expo Router: there is no
  `src/app/` directory.
- Navigators live in `src/navigation/` (`RootNavigator`, `AuthNavigator`,
  `MainTabs`, `AppNavigator`); route param types are in
  `src/navigation/navigation.types.ts` — update them when adding a screen.
- Screens live in `src/features/<feature>/screens/`. Use `useNavigation` /
  `useRoute` with typed params, and `Linking` / the `linking` config of
  `NavigationContainer` for deep links (`pinteflush://`).
- Docs: https://reactnavigation.org/docs/getting-started

## Architecture en couches

`app/` → `navigation/` → `features/<x>` → `shared/` (ESLint refuse les imports
inverses : `shared` n'importe ni `features` ni `navigation`, `features`
n'importe pas `navigation`). Voir le README.

- Une feature expose son API publique par `index.ts` ; les autres features
  n'importent pas ses fichiers internes.
- Écrans fins : logique dans hooks/stores, appels réseau dans `services/`.
- Services natifs/réseau (position, caméra, RA, Colyseus…) : dans le dossier
  `services/` de la feature concernée, jamais appelés directement depuis un
  écran.
- Imports : alias `@/`, pas de chemin relatif de profondeur ≥ 3.
- Tests : `*.test.ts(x)` à côté du code ; RNTL 14 est asynchrone
  (`await render`, `await fireEvent.press`).
- Commits : `FEATURE - description` (7–60 car.), validé par Husky. Ne pas
  committer sans demande explicite de l'utilisateur.
- Avant de terminer une tâche : `npm run check`.

## Building with EAS

Use EAS to build, sign, and submit the app in the cloud (`eas build`,
`eas submit`) and to ship over-the-air updates (`eas update`) — no local Xcode
or Android Studio required. Run EAS CLI as `bunx eas-cli <command>` in Bun
projects, or `npx eas-cli@latest <command>` otherwise; substitute that for bare
`eas` in docs examples. Docs: https://docs.expo.dev/eas/index.md

## Rules

- If `ios/` and `android/` directories do not exist, they are generated
  (Continuous Native Generation). Never create or edit them by hand — configure
  native behavior in `app.json` and config plugins.
- Expo Go only includes its bundled native modules. After adding a library with
  native code, the app needs a development build: `npx expo run:ios|android`
  locally, or `eas build --profile development`.
- Prefer recommended Expo modules over third-party libraries, and check your
  available skills before adding dependencies. Docs:
  https://docs.expo.dev/versions/latest/index.md
