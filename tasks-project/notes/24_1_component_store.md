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

### 1.3. Writers

**to_continue**

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
