# Core backend terms

## 1. Business logic: rules of your application

- Users can upload/update/delete their episodes
- What makes your app, you app
- Everything else is just plumbing (HTTP, DB, frameworks)
- "What does your app do?" -> That's business logic

```
Scientific app:
- Users can share their calculators
- Users can share their projects
```

### Where it lives

- Services (NestJS)
- Domain layer (DDD)
- Not in controllers

## 2. Domain: nouns + rules of the business

- The conceptual world of your application

```
Scientific app:
- Calculators
- Projects
- Accounts
```

- It drives:
  - models
  - services
  - types
  - validations
  - workflows
  - data structures

## 3. Contracts: Agreement between two systems or components

- It's the shape of the communication between them
  - REST endpoint schema (DTOs)
  - GraphQL schema
  - API request/response shapes
  - Typesense search schema
  - Firestore document structure

## 4. DTO / Data Transfer Object: API contract for input/output network

- An object/class that defines what can enter and leave your applications
