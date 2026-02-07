# Stores Angular

- Single source of truth
- Avoid prop drilling
- If data is changed in one place, every component, which uses it, is updated
- Store = client-side db that lives in the browser's memory

- There are 3 possible ways the store is organized
  - NgRx
  - Reactive Service / BehaviorSubject
  - Signals / SignalStore

- if you see
  - files ending in `.actions.ts` or `.reducer.ts`, you're in a NgRx/Redux architecture
  - service with many `BehaviorSubjects`, you're in a React Service architecture

| Scenario | Tech                | Keywords                               |
| -------- | ------------------- | -------------------------------------- |
| Legacy   | NgRx                | `Store`, `dispatch`, `reducer`, `on()` |
| Hybrid   | BehaviorSubject     | `.next()`, `asObservable()`, `tap()`   |
| Modern   | Signals/SignalStore | `signal()`, `patchState`, `effect()`   |

## Principles

### 1. Read-only UI | Unidirectional data flow

- Component never directly modifies data it gets from the store. It should be a one-way street

1. Store sends data down to the component
2. Component sends actions/events up to the store

```ts
// ❌
this.user.name = "New name"; // modifying reference

// ✅
this.store.dispatch(updateName({ name: "New name" }));
```

### 2. Thin component, fat store

- Inside your component's TS, avoid heavy operations
  - it shouldn't use too much `.filter()`, `.map()`
  - the store should do it
- Move that logic into the store
  - selector (NgRx)
  - Computed signal
  - Component should receive data that is 'ready to wear'

### 3. Categorize state

| State type | Where it lives                  | Example                            |
| ---------- | ------------------------------- | ---------------------------------- |
| Global     | Global service                  | Auth, User Profile, Theme          |
| Feature    | ComponentStore / Feature module | Search results, current pagination |
| Local      | Component variables             | isDropdownOpen, isHovered          |
