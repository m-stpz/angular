# Store signal

- Modern Angular (v17+), industry is moving away from RxJS for state management towards Signals or the NgRx SignalStore
- Advantages
  - No seletors: just call `store.user()` and it works
  - No boilerplate: no need for 4 files (actions, reducers, etc) for one variable
  - Granular updates: it only re-renders the exact portion of HTML that changed

```ts
export const TodoStore = signalStore(
  { providedIn: "root" },
  withState({ items: [], loading: false }),
  withMethods((store) => ({
    addTodo(title: string) {
      patchState(store, (state) => ({ items: [...state, items, { title }] }));
    },
  })),
);
```
