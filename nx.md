# NX

- Build system + monorepo toolkit for JS/TS ecosystem
- It focuses on:
  - Structure
  - Speed
  - Consistency
- Nx stands for "Nrwl Extensions
- Even though there's some overlap between Nx and Docker, they solve different problems

## What it offers

- Strong monorepo workflows
- Fast builds (caching + affected)
- Consistent architecture
- Scaffolding removes manual setup
- Good DX (IDE integrations, visual graph)

## Key features

1. Code sharing

- Instead of duplicating code or creating shared libs, nx allows referencing and reusing code across various projects

```bash
# generate a shared lib in react
nx generate @nrwl/react:library <lib-name>
```

2. Dependency management

- It handles deps and ensures the correct pkgs versions are used across all projs

```bash
# runs tests for specific projec
nx test <proj-name>
```

3. Smart build systems

- Optimizes build times by only building what has changed

```bash
# building a project
nx build <proj-name>
```

4. Powerful scaffolding

- Nx allows the creation of templates for different types of projects, components, and more

```bash
# Create a new react application
nx generate @nrwl/react:application <proj-name>
```

5. Caching for speed

- It caches build artifacs and deps, significantly reducing build time
- Ensures only the necessary parts of monorepo is rebuilt

```bash
# Using cached artifacts for faster builds
nx build <proj-name>
```

6. Automatic deps updates

- Through Nx you can automate deps updates

```bash
nx migrate latest
```

## Core concepts

### 1. Monorepo

- A single repo containing multiple apps + libraries
  - Shared code
  - Shared tooling
  - Unified CI/CD

```
apps/
    web/
    admin/
    api/
libs/
    ui/
    utils/
    auth/
```

### 2. Projects (apps & libs)

- Nx split code into projects:
- Apps: runnable (React, Angular, Next.js, Node API)
- Libs: shared units (UI, utils, domain logic)
- They're defined in `project.json`

### 3. Targets

- Each project has targets
- Targets define what Nx can execute

```json
{
  "targets": {
    "build": {
      "executor": "@nx/webpack:webpack"
    },
    "test": {
      "executor": "@nx/jest:jest"
    }
  }
}
```

### 4. Task graph & incremental builds

- Nx analysis project graph
- It knows what depends on what
- Result:
  - Only rebuilds what changed
  - Only retests affected projects
  - Only lints what needs linting

### 5. Computation caching

- Nx caches results of operations:
  - build
  - test
  - lint
  - e2e

```bash
nx build web
```

### 6. Affected commands

- Nx detects what changed since the last Git revision

```bash
nx affected:build
nx affected:test
nx affected:lint
```

### 7. Generators (code scaffolding)

- Nx can create boilerplate code aligned with best practices
- Eliminates manual setup

```bash
nx g @nx/react:app web
nx g @nx/react:lib ui
nx g @nx/react:lib utils
```

### 8. Executors

- Underlying engine that runs tasks
- Examples:
  - webpack executor
  - Vite executor
  - Next.js executor
  - Custom executors
- You can build your own if needed

### 9. Project Graph

- Visual graph showing deps structure

```bash
nx graph
```

## Gettings started

1. Install Nx globally with some pkg manager
2. Create a new Nx workspace using the CLI commands
3. Begin adding your projects, libs, and code to the workspace

```bash
npm install -g create-nx-workspace
nx create-nx-workspace <workspace-name> # create workspace
nx g @nx/react:application <proj-name> # Create application

# Useful commands
nx run <proj-name>:serve # start the app
nx run <app>:test # run the unit test
nx run <app>:lint
nx run <app>:build
nx --help
```

## Nx vs. Docker

### Nx

- Nx focuses on building, testing, linting, executing tasks, and organizing a monorepo
- Its strengths:

  - incremental builds
  - caching
  - affected logic
  - code generation
  - dependency graph
  - orchestrating tasks across multiple apps

### Docker

- Docker isolates runtime environments and deps
- Its strengths
  - OS-level isolation
  - Runs services with different runtimes
  - Ensures consistency across dev environments
  - Deployment portability
