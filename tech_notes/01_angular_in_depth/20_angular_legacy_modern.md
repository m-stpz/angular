# Angular: Legacy vs. Modern

## Summary

| Feature              | Legacy                                        | Modern                         |
| -------------------- | --------------------------------------------- | ------------------------------ |
| Template             | Structural directive: *ngIf, *ngFor           | Control Flow: @if, @for        |
| Dependency Injection | constructor                                   | inject()                       |
| State reactivity     | RxJS & Observables, subscribe and unsubscribe | signal()                       |
| Input/Output         | Decorators @Input() and @Output()             | functions input() and output() |

## Template: Structural Directive vs. Control Flow

- Angular v17+ has moved from `attributes/directives` to more readable "block" syntax

### Legacy

- *ngIf, *ngFor
- need import `CommonModule` into `NgModule`

```html
<div *ngIf="isLoggedIn; else guestTemplate">Welcome back!</div>
<ng-template #guestTemplate>Please, log in</ng-template>

<ul>
  <li *ngFor="let user of users">{{user.name}}</li>
</ul>
```

### Modern

- @if, @for
- introduced in v17
- faster, zero imports

```html
@if(isLoggedIn){
<div>Welcome back!</div>
} else {
<div>Please log in</div>
} @for(user of users; track user.id){
<li>{{user.name}}</li>
} @empty {
<p>no users found</p>
}
```

- `@empty` is an useful tag. No need for `*ngIf="users.length === 0"`

## Dependency Injection: Constructor vs. `inject()`

- How we get services into the component has changed

### Legacy: constructor

```ts
@Component({...})
export class UserComponent {
  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
  ) {}
}
```

### Modern: inject()

- It makes inheritance much easier
  - If child extends parent, we don't need to pass all services through `super()`

```ts
@Component({...})
export class UserComponent {
  private userService = inject(UserService);
  private route = inject(ActivatedRoute);

    // we can also use inject in property initializers!
    users$ = this.userService.getUser(this.route.snapshot.params["id"])
}
```

## Database Reactivity: RxJS vs. Signals

- In large database-driven app, managing change is the hardest part

### Legacy: RxJS & Manual subscription

- `Observables` everywhere
- Need to be careful with memory leaks
- Pattern: `data$.subscribe()` in `ngOnInit` and `unsubscribe()` on `ngOnDestroy`

### Modern: Signals

- New way to handle state
- Don't require subscription
- More performant

```ts
count = signal(0);
doubleCount = computed(() => this.count() * 2);

increment(){
    this.count.update((prev) => prev + 1) // updates UI instantly
}
```

## Input/Output: Decorators vs. Functions

| Aspect  | Legacy                              | Modern                        |
| ------- | ----------------------------------- | ----------------------------- |
| Inputs  | @Input() user: User;                | user = input.required<User>() |
| Outputs | @Output() save: new EventEmitter(); | save = output<User>()         |
