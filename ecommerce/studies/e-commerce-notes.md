# Ecommerce

## Architecture

![alt text](e-commerce-architecture.png)

## Steps

### Video 1: https://www.youtube.com/watch?v=E1wtzB0ZSgQ&t

#### 1. Setup Nx workspace

```bash
npm add --global nx
```

### 2. Create a NestJS application in the workspace

- https://nx.dev/docs/technologies/node/nest/introduction

```bash
npx create-nx-workspace@latest
nx add @nx/nest
nx g @nx/nest:app apps/<name>
nx serve <name>
# nx serve backend
```

```
root -> where nx is located
    apps
        backend -> where nestjs is
```

### 3. Setup firestore

### 4. Connect NestJS app to firestore

### 5. Add GraphQL to NestJS

== Possible steps ==

3. Add GraphQL to NestJS
4. Connect NestJS app to firestore
5. Add a seed command to create products in DB
6. Create the frontend (Angular)
7. Setup Angular material/SDK
8. Add NgRx signal store & create ProductsStore
9. Add angular-apollo for GraphQL queries
10. Implement getting products API call
