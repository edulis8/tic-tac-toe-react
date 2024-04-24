# Ready-to-hack React Skeleton 💀: React + Vite (All Cleaned-Up) + Eslint and Prettier Setup

This template provides a minimal setup to get React working in Vite.

## Steps to re-create:
- npm create vite@latest
- choose React, JavaScript
- npm install
- npm run dev

Then - grab Wes Bos's "No-Sweat™ Eslint and Prettier Setup" 
- https://github.com/wesbos/eslint-config-wesbos
- `npm install eslint-config-wesbos`
- "Lints JavaScript and TypeScript based on the latest standards" - Wes 'Barracuda' Bos
- add some rules to get rid of some more annoying linter errors:
- put this in your `.eslintrc.cjs`:

```
extends: [
    "wesbos"
],
```
- Add these rules to your `.eslintrc.cjs` to avoid some of the more annoying linter errors for the rapid-quick™ developer:
  - 'react/jsx-no-bind': 0,
  - 'react/prop-types': 0,


You may need to restart VS Code. Maybe not. If ctrl-S doesn't trigger Prettier, restart it.



