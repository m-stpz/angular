# PNPM

- Performant NPM
- It's a package manager, similar to `yarn` or `npm`
- All downloadable packages live in a global store. This means that every project references it, instead of downloading a new copy

| characteristic | npm                                                                 | pnpm                                                           |
| -------------- | ------------------------------------------------------------------- | -------------------------------------------------------------- |
| storage model  | Each project has a full, physical copy of all deps. Huge disk usage | One global store + links to teach project. Minimal duplication |
| Workspaces     | Slower and less optimized for monorepos                             | First-class, simple, fast                                      |

- pnpm is faster and consumes less space

## Most important commands

```bash
pnpm install # install all deps from `package.json` & generates/updates `pnpm-lock.yaml`
```
