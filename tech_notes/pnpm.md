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

### Installation & Removal

```bash
pnpm install # install all deps from `package.json` & generates/updates `pnpm-lock.yaml`

pnpm add <pkg> # adds a dependency
pnpm add -D <pkg> # adds a deps to the dev deps
pnpm add -g <pkg> # adds a global cli package
pnpm remove <pkg>
```

### Running scripts

- `pnpm run`: only required when the script name conflicts with a built-in command. Otherwise, we can just run `pnpm <script>`

```bash
pnpm <script>
pnpm run <script>
```

### Deps management

```bash
pnpm update / pnpm up # updates all packages
pnpm update <pkg>
pnpm outdated # shows which deps have newer versions
```

### Workspaces

- Allows us to manage multiple packages in a single repo with shared deps and fast linking
- No duplicate `node_modules`
- Each package has its own `package.json`

```bash
repo/
    package.json => workspace root
    pnpm-workspace.yaml
    apps/
        web/
        admin/
    packages/
        ui/
        config/
```

```bash
pnpm -w add <pkg> # adds a deps to the root of a workspace
pnpm -d add -D <pkg>
pnpm --filter <project> <command> # targets a specific package in a monorepo
    pnpm --filter webapp dev
pnpm recursive install / pnpm -r install # install across all workspace packages

pnpm -r <command> runs a command across all packages
```

### Store & Node Modules

```bash
pnpm store path # shows where the global pnpm store is located
pnpm store prune # cleans old/unreferences pkgs from the store
pnpm prune
```
