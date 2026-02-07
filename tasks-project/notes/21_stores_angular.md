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

## Princples
