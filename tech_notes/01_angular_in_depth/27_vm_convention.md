# ViewModel (vm) pattern

- Convention used to simplify the connection between TS logic and HTML template
- In large Angular applications, it's considered "gold standard" for managing reactive data
- Instead of having 5 to 10 separate Observables scattered through the html, we consolidate them into a single object
  - This object represents the entire state of that specific view

- ViewModel = "specific slices of state bundled together"
  - abstraction of the view state, serving as a data-binding bridge between the model (store/db) and the view (html)
  - single, read-only object that consolidates multiple async streams into a sync-looking snapshot for the template

## 1. Before vs. After

- In a complex, "database-driven" component, we often need to track multiple things:
  - actual data
  - loading spinner
  - error message

### Approach 1: "Junior" way | Async pipe soup

- Leads to multiple subscriptions and flickering UI, since observables resolve at different milliseconds

```html
<div *ngIf="loading$ | asnyc">Loading...</div>
<div *ngIf="!(loading$ | async)">
  <h1>users ({{count | async}})</h1>
  <div *ngFor="let user of users$ | async">{{user.name}}</div>
</div>
```

### Approach 2: "Professional" way | The vm$ pattern

- Use the `vm$` convention to combine all streams into one

```ts
export class UserListViewComponent extends ComponentStore<UserState> {
  // 1. individual selectors
  readonly users$ = this.select((s) => s.users);
  readonly loading$ = this.select((s) => s.loading);
  readonly error$ = this.select((s) => s.loading);

  // 2. the ViewModel: combine them into one object
  readonly vm$ = this.select({
    // grab the selectors
    users: this.users$,
    loading: this.loading$,
    error: this.error$,
    /* 
    We can:
     - add new properties
     - perform logic 
    */
    totalUsers: this.select((s) => s.users.length),
  });
}
```

- Usage:

```html
<ng-container *ngIf="vm$ | async as vm">
  <header>
    <h1>Active users: {{vm.totalUsers}}</h1>
  </header>

  <loading-spinner *ngIf="vm.loading"></loading-spinner>
  <error-banner *ngIf="vm.error"></error-banner>

  <user-table [data]="vm.users"></user-table>
</ng-container>
```

## 2. Advantages

- Performance: single subscription. Instead of Ng change detection running 5 times for 5 different async pipes, it runs once
- Strict typing: within the `ng-container`, the `vm` object is typed
- Code scannability: just look the `vm$` definition in the `.ts` file, you immediately understand what this template needs to function

## 3. Modern variation: The "signal" vm

- Mving into Modern Angular (v17+), we'll see the pattern moving away from Observables to Signals

```ts
// modern signal-based ViewModel
class MyClass {
  readonly vm = computed(() => ({
    users: this.usersSignal(),
    loading: this.loadingSignal(),
    error: this.errorSignal(),
  }));
}
```

- In the HTML, we access it as `vm().users` instead of using the `async` pipe, which is used for Observables

## 4. Rules

| Rule          | Description                                                                                      |
| ------------- | ------------------------------------------------------------------------------------------------ |
| Naming        | Always name it as `vm$` (if Observable) or `vm` (if Signal)                                      |
| Placement     | Usually the very first line of the html, within an `ng-container`                                |
| Purity        | the `vm$` should only contain data needed for the **view**. No logic or service references in it |
| Consolidation | If you have more than 2 observables in a template, you should probably be using `vm`             |
