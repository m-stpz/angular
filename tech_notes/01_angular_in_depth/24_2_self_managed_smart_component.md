# Self-Managed Smart Component

- We extend `ComponentStore` directly inside the `@Component`
- We merge the View (HTML) and the State Logic (store) into a single file
- Normallly, we separate the Component and the Store Service, however, sometimes devs keep them in one
- The component inherits the powers of `ComponentStore`
  - select: grabs a slice of the state
  - updater, patchState: update the state
  - effect: handles with side effect (api, websocket, timers)

## When to do this?

- Single file state pattern is used when:
  - state logic is specific to this one view and won't be reused
  - you want to avoid "file jumping" of having a separate `store.ts` file
  - component is complex enough to need a store, while being simple enough that keeping it in one file is readable

## Example

```ts
export class UserListViewComponent
  extends ComponentStore<UserListDetailState>
  implements onInit
{
  // 1. selectors (data html will use)
  readonly users$ = this.select((s) => state.users);

  constructor(private api: ApiService) {
    // 2. initial state
    super({ users: [], loading: false });
  }

  // 3. trigger effect
  ngOnInit() {
    this._loadUsers();
  }

  // 4. effect (the logic)
  readonly _loadUsers = this.effect((trigger$) =>
    trigger$.pipe(
      switchMap(() =>
        this.api.getUsers().pipe(
          tapResponse(
            (users) => this.patchState({ users }),
            (error) => console.error(error),
          ),
        ),
      ),
    ),
  );
}
```

## Pros and Cons

| Pros              | Cons                           |
| ----------------- | ------------------------------ |
| Zero boilerplate  | Harder to tests                |
| Clear scope       | Violates single responsibility |
| Automatic cleanup | Refactor pain                  |

- If class grows beyond 200-300 lines, it's advisable to move the `ComponentStore` logic into its own seperate `.service.ts.` file to keep the component "lean"
