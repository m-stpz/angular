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
