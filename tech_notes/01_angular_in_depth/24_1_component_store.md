# NgRx ComponentStore

- Middle ground of angular state management
- Wrapper around `BehaviorSubject`
- Global NgRx too heavy -> ? -> Raw `BehaviorSubject` is too messy and lacks structure
  - ComponentStore lives in their middle

- ComponentStore
  - State is bound to the component's lifecycle
  - when component is destroyed (`ngOnDestroy`), the store is wiped from memory
  - When a class extends `ComponentStore<T>` it becomes a **State machine**
    - It gains access to a specialized toolbox designed to manage streams of data and UI states without the need of `BehaviorSubjects`

## 1. Concepts

### 1.1. Foundation - `super(initialState)`

- The class must call in its constructor super(). This boots up the store with its starting data

### 1.2. Observer - `this.select()`

- How you pull data out of the store
- Creates an Observable of a specified slice/property of your state
- Reactive and memoized
  - You have a state with 100 properties, but you `select` the `username`, the observable will only fire when `username` changes
    - It ignores the other 99 properties

```ts
readonly name$ = this.select(state => state.name)
```

### 1.3. Writers - `this.updater()` and `this.patchState()`

- The only two ways to change data inside the store

- patchState (quick & dirty): best for simple update like toggling a loading spinner
  - `this.patchState({loading: true})`
- updater (professional way): used for complex state, where the new state depends on the old one

```ts
export class MyStore extends ComponentStore<MyStoreState> {
  readonly addUser = this.updater((state, newItem: Item) => ({
    ...state,
    items: [...state.items, newItem],
  }));
}
```

### 1.4. Orchestrator - `this.effect()`

- Most important power for dealing with "large databases" or APIs
- It manages async side effects (api calls, timers, websockets)
- Automatically handles the "subscription management"
  - When effect is defined. it creates a long-lived stream that listens for inputs
- Allows to easily use RxJS operators like `switchMap` (cancel old requests) or `concatMap` (queue requests) inside the component itself

### 1.5. `state$`

- By extending the store, the component also gets a `this.state$` property
- It's an Observable of the entire state object
  - Observable: interface to handle async operations
    - Observing a value over time

## 2. Functional structure

- Instead of four different files, everything is contained within a single class that extends `ComponentStore`

```ts
import { Injectable } from "@angular/core";
import { ComponentStore, tapResponse } from "@ngrx/component-store";
import { pipe, switchMap, Observable } from "rxjs";

// 1. define the state
interface UserState {
  users: User[];
  loading: boolean;
}

const initialState = { users: [], loading: false };

@Injectable()
export class UserListStore extends ComponentStore<UserState> {
  private _userService = inject(UserService);

  constructor(private userService: UserService) {
    // 2. initialize with default values
    super(initalState);
  }

  // 3. select: grab data from the store
  readonly users$ = this.select((state) => state.users);
  readonly loading$ = this.select((state) => state.loading);

  // 4. updates: synchronous changes (like reducers)
  readonly setUsers = this.updater((state, users: User[]) => ({
    ...state,
    users,
    loading: false,
  }));

  // 5. effect: asynchronous logic (API calls)
  readonly loadUsers = this.effect((id$: Observable<string>) => {
    return id$.pipe(
      switchMap((id) =>
        this.userService.getUsers(id).pipe(
          // tapResponse is a helper that handles success/error safely
          tapResponse(
            (users) => this.setUsers(users),
            (error) => console.error(error),
          ),
        ),
      ),
    );
  });
}
```

- You provide it at the component level, not in `root`

```ts
@Component({
  selector:"app-user-list",
  providers: [UserListStore], // provided here
  template: `
    <div *ngIf="loading$ | async">Loading...</div>
    <li *ngFor="let user of users$ | async">{{user.name}}</li>
    `
})
export class UserListComponent {
  private _store = inject(UserListStore){}

  ngOnInit(){
    // on init: calling the api defined on the store
    this._store.loadUsers("department-123")
  }
}

```
