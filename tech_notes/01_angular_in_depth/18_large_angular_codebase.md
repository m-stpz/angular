# Large Angular codebase

## 1. Smart vs. Dummy components (Architecture)

- Smart/Container components
  - Interact with services, fetch data from db, handles logic
  - Usually at the "Route" level (e.g, `UserListComponent`)

- Dummy/Presentational components
  - Receive data via `@Input()` and emit events via `@Output()`
  - They don't know services exist

## 2. Performance

### 2.1 ChangeDetectionStrategy.OnPush

- By default, Angular checks component every time anything happens in the app
- OnPush tells Ng: "only check me if `@Input()` changes or I manually ask for it"

```ts
@Component({
    //...
    changeDetection: ChangeDetectionStrategy.OnPush
})
```

### 2.2. trackBy (similar to key for map in React)

- `trackBy` allows ng to know which items have changes and so it only updates the ones that did

#### Legacy

- Needs to have a function on .ts for `trackBy`

```html
<!-- trackBy: funcName on ts  -->
<li *ngFor="let item of items; trackBy: trackById">{{item.name}}</li>
```

```ts
// we need this function on ts
trackById(index:number, item:Item) {
    return item.id
}
```

#### Modern (v17+)

- No need for func on .ts

```
@for (item of items; track:item.id){
    <li>{{item.name}}</li>
}
```

## 3. Inject pattern: Modern (v+14) vs. Legacy

- Legacy: services injected in the `constructor`

```ts
constructor(private db: DbService) {}
```

- Modern: use `inject()` function

```ts
private db = inject(DbService);
```
