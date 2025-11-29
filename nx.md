# NX

- Build system + monorepo toolkit for JS/TS ecosystem
- It focuses on:
  - Structure
  - Speed
  - Consistency
- Nx stands for "Nrwl Extensions
- Even though there's some overlap between Nx and Docker, they solve different problems

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

## Key features

1. Code sharing:

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
