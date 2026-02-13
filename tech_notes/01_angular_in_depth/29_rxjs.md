# RxJS

- RxJS (Reactive Extensions for JS) is a powerful, open-source library for reactive programming
  - It simplifies composing async, event-based code
  - It uses observable sequences
  - Reactive Programming + Observables
- RxJS is the backbone of the entire framework

- To understand it, think of variables as "pipes" where values flow over time, instead of "boxes" holding a value
  - Standard variable: `x = 5` -> snapshot in time
  - Observable: `x$` -> a stream that now is 5, in 1 minute, 10, in an hour `Error`

## Angular and RxJS

- Angular was built from the ground up to be reactive
  - HTTP Calls: the `HttpClient` returns Observables, not Promises
  - Forms: `ReactiveForms` allows us to listen to every keystroke via `valueChange$`
  - Routing: `ActivatedRoute` lets us watch for URL parameter changes as a stream
  - State management: NgRx (legacy ng store) and ComponentStore are built on top of RxJS

## Concepts

### Observables: the data source

- They represent a stream of data over time
- It needs to be subscribed to do something

#### Observables vs. Promises

- Promise: it's a "one-time deal"
  - You ask for data, you get it, it's over
  - It's like a one-night stand
- Observable: it's a "lifetime subscription"
  - You subscribe and keep receiving the value over time
  - It's like a marriage

| Feature      | Promise            | Observable (RxJS)                         |
| ------------ | ------------------ | ----------------------------------------- |
| Values       | Emites one value   | Emits multiple values over time           |
| Cancellation | Can't be cancelled | Cancellable (crucial for "search" inputs) |
| Operators    | None               | 100+ operators for complex logic          |
| Timing       | Always async       | Can be sync and async                     |

### Subscriptions: the consumer of the data

- They represent the execution of an Observable, crucial for managing the lifecycle and canceling async tasks
- The **act of listening** to an Observable
  - html: `| async` pipe
  - ts: `subscribe()`

#### HTML `| async` pipe

- Automatic way to listen to an Observable
- If we find ourselves writing `.subscribe()` inside the component's ts just to get the data onto the screen, likely `| async` pipe would be enough
- Ideally, we keep the logic in the store and the display on the html. Preferably, we skip `subscribe()` on the component's body

```html
<div *ngIf="user$ | async as user; else loading">...</div>

<ng-template #loading></ng-template>
```

#### TS `.subscribe()`

- Manual way to listen
- Use this when you need to perform logic in the background

```ts
export class UserDetailComponent implements OnInit, onDestroy {
  private _userSub?: Subcription;
  user: User | null = null;

  private userService = inject(UserService);

  ngOnInit() {
    // subscribe to the observable
    this._userSub = this.userService.user$.subscribe((userData) => {
      this.user = userData;
      console.log("new data arrived", userData);
    });
  }

  ngOnDestroy() {
    this._userSub?.unsubscribe();
  }
}
```

- We should move subscription here when we need to **trigger a secondary action**, a side-effect, that the HTML can't handle

##### When we don't need it

```ts
readonly user$ = this._store.select(s => s.user) // we don't need an extra user local variable
// we should let the pipe handle it
```

```html
<div *ngIf="user$ | async as user">...</div>
```

##### When we need it

- After something happened, we need to perform another operation
- HTML can't "close a dialog" or "navigate", then we need to listen to the stream result in the ts

```ts
ngOnInit(){
    // subscribe because we WANT TO DO SOMETHING WITH THE RESULT
    this._store.saveResults$.pipe(
        takeUntil(this._destroy$) // clean up
    ).subscribe((sucess) => {
        if (success) {
            this._toast.show("success")
            this._dialogRef.close() // logic the html can't perform
        }
    })
}
```

### Operators: the transformer

- Pure functions that enable functional programming to manipulate data, such as `map`, `filter`, `concat`, and `reduce`
- They allow us to change the data as it moves through the pipe

### Subjects: the multi-caster

- A special type of Observable that allows values to be multicasted to many Observers
- It can both emit and listen to data
  - This is what powers `BehaviorSubject` on the store

### Observers

- collection of callbacks that listen to values delivered by the Observable

## Operators

### The core concept: `.pipe()`

- It's an assembly line
- The raw data enters the line, and we add "stations" (operators) to modify it before it reaches the end

```ts
this.user$
  .pipe(
      ---
      // station 1: transform
      // station 2: filter
      // station 3: handle
      ---
  ).subscribe()
```

### Transformation operators

- `map`: modifier
  - It changes the data, like standard JS
  - Takes the data and changes its shape, type, or value
  - input: raw object
  - output: a specific piece or a formatted version of that object

```ts
// map = modification
// eg: extract just the 'name' from the User object

this.user$
  .pipe(map((user) => user.name.toUpperCase()))
  .subscribe((name) => console.log(name));

// result = "John Doe" instea of {id: 1, name:"John Doe"}
```

- `tap`: spy
  - Used to perform "side effects" without changing the data itself
  - Doesn't change the data
  - e.g.: trigger loading a spinner before an api call
  - input: data
  - output: the exact data, untouched

```ts
this.data$
  .pipe(
    // tap = deals with side effects
    tap((data) => console.log("Data arrived from db: ", data)),
    tap(() => (this.loading = false)),
  )
  .subscribe();
```

- `tapResponse`: it's a special operator, used within NgRx ComponentStore context
  - It's a "wrapper" that forces you to handle both the **Success** and **Error** of an API call
  - Professional way to ensure the app never "hangs" on a loading spinner if the backend fails

- `filter`: Only lets data through if it meets a certain condition
  - input: any data
  - output: the same data (if true) | nothing (if false)

```ts
// only allow the stream to continue if the search is long enough
this.searchTerm$.pipe(filter((term) => term.length > 3)).subscribe();
```

### Higher-order mapping

- Used inside **effects** to handle api calls
- They decide what happens if a new request comes in while an old one is still running

- `switchMap`: latestOnly
  - If new value arrives, cancels the previous inner observable
  - Good for: search bars, tab switching

```ts
// if user clicks twice false, cancel the 1st api call and start the second
this.refreshClick$.pipe(switchMap(() => this.api.getLatestData())).subscribe();
```

- `concatMap`: queue
  - It waits for the previous call to finish before starting the next one
  - Ensures order and prevents overlapping operations
  - Good for: save operations where order matters

```ts
// save item 1, wait, then save item 2
this.saveRequests$.pipe(concatMap(item) => this.api.save(item)).subscribe();
```

- `exhaustMap`: ignore
  - It ignores new inputs until the current one is finished
  - Good for: submit buttons (it ignores the second click until the first save is done)

### Combination operators

- `withLatestFrom`: the "need extra info"
  - used when one stream triggers an action, but we need the current value from another stream
  - combines the trigger with a snapshot of other data

```ts
// user clicks "submits", then it grabs the "form value" to send to the api
this.submitClick$
  .pipe(
    withLatestFrom(this.formValue$),
    map(([click, form]) => form), // discard the click and keep the form data
  )
  .subscribe((data) => this.api.send(data));
```

- `combineLatest`: the "sync"
  - waits for all streams to have at least one value, then emits them together as an array/object
  - turns multiple individual streams into a single ViewModel object

```ts
// combine 3 status streams into 1 UI object
readonly vm$ = combineLatest({
  users: this.users$,
  loading: this.loading$,
  error: this.error$
})
```

### Lifecycle operators

- `takeUntil(notifier$)`: the most important operator for preventing memory leaks
  - Use it with a `destroy$` subject in the component to automatically unsubscribe when the user leaves the page

- `shareReplay(1)`: turns a "cold" observable (start fresh for every subscriber) into a "hot" one (shares the last result)
  - Prevents the API from being called twice if you use the `async` pipe in two places in your HTML

### Summary

| If you want to...                          | Operator        | Practical use case                     | Layer            |
| ------------------------------------------ | --------------- | -------------------------------------- | ---------------- |
| Change the data shape                      | `map`           | Formatting dates, names, prices        | Store/repository |
| Filter out data based on certain condition | `filter`        | Ignoring empty search results          |
| Trigger a loading spinner                  | `tap`           | Turning off a spinner after api result | store effect     |
| Call an API (cancel old )                  | `switchMap`     | Search-as-you-type inputs              | store effect     |
| Call an API (queue them)                   | `concatMap`     | Sequential database saves              | store effect     |
| Combine slices for UI                      | `combineLatest` | Creating the `vm$` object              | ViewModel        |
| Prevent memory leaks                       | `takeUntil`     |                                        | Component        |

## Real-world example

- On a searchable user list store, we need to:
  - handle user input (typing)
  - API calls
  - state update simultaneously

```ts
@Injectable()
export class UserListStore extends ComponentStore<UserListState> {
  private readonly _api = inject(ApiService);

  // 1. the selectors (read) - all observables, they need to be subscribed
  readonly users$ = this.select((s) => s.users);
  readonly loading$ = this.select((s) => s.loading);
  readonly query$ = this.select((s) => s.query);

  // 2. the view model
  readonly vm$ = this.select(
    this.users$,
    this.loading$,
    this.query$,
    (users, loading, query) => ({
      users,
      loading,
      query,
      hasResults: user.length > 0,
      isEmpty: users.length === 0 && !loading && query !== "",
    }),
  );

  constructor() {
    // 3. initial state
    super({ users: [], loading: false, query: "" });
  }

  // 4. the updaters (write) - sync write
  readonly setQuery = this.updater((state, query: string) => ({
    ...state,
    query,
  }));

  // 5. the effect (RxJS powerhouse) - where they main RxJS live
  readonly searchUsers = this.effect<string>((query$) =>
    query$.pipe(
      // 5.1 filter: don't trigger API if query is too short
      filter((query) => query.length >= 2 || query.length === 0),

      // 5.2 tap: trigger a "side effect" (UI loading) before the API starts
      tap((query) => {
        this.patchState({ loading: true, query });
      }),

      // 5.3 switchMap: if user types 'a', then 'b', cancel the former and continue with the latter
      switchMap((query) =>
        this._api.getUsers(query).pipe(
          // tapResponse = tap + error handling
          tapResponse(
            (users) => this.patchState({ users, loading: false }), // what to do in success
            (error) => {
              // what to do in error
              console.error(error);
              this.patchState({ loading: false, users: [] });
            },
          ),
        ),
      ),
    ),
  );
}
```
