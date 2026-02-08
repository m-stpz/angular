# Angular/Firebase architecture

## Overview

### Part 1: The frontend

- Layer 1: component
- Layer 2: store
- Layer 3: the API service

1. Component layer (UI)
   - Renders UI
   - Handlers user interactions
   - Validates form

```ts
this._store.onSubmit(...)
```

2. Store layer (State management)
   - Manages component state
   - Orchestrates RxJS effects
   - Calls API service

```ts
await this._apiService.submitData(...)
```

3. API Service Layer (Frontend -> Backend bridge)
   - Wraps Firebase callable functions
   - Single point of contact to backend

### Part 2: The backend

- Layer 4: Cloud functions
- Layer 5: Services

4. Cloud Function (Backend entry point)
   - Validates authentication
   - Handles errors
   - Routes to business logic

5. Service Layer (Business logic)
   - Validates input data
   - Applies business rules
   - Updates data models
   - Triggers notifications/activity logs

6. Repository layer (Data access)
   - Abstracts firestore operations
   - Provides CRUD methods
   - Type-safe data access

### Part 3: The db (firestore)

- Layer 7: Data structure

7. Firebase/firestore (Database)
   - Stores document data
   - Triggers real-time updates
   - Enforces security rules

## Layer 1. The

- Role: The "presenter"
- Handles user input and displays the `vm$`

**to_continue_with_mapping_and_examples**
