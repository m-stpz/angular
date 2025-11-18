# Angular

- Angular is Framework, not a library
  - It has batteries included: router, HTTP client, DI, forms, state management patterns, build tooling
- Opinionated structure
  - Modules -> components -> templates -> services

## Benefits of Angular

- Fast development
- Faster code generation (CLI)
- Unit-tests ready
- Opinionated
- Code reusability

## Differences with React

| Feature     | React          | Angular                |
| ----------- | -------------- | ---------------------- |
| Definition  | library        | framework              |
| CLI         | no             | yes                    |
| Packages    | all 3rd-partys | fundamentals 1st-party |
| Consistency | little         | much                   |

## Core concepts

### 1. Components

- Similar to react, but split into 3 files:
  .ts: logic, metadata (@Component)
  .html: template
  .scss: styles
- No JSX. Instead: template syntax with bindings, directives, pipes

```js
// component
@Component({
    selector:"app-user-card",
    templateUrl:"./user-card.component.html"
})
export class UserCardComponent {
    @Input() user!:User;
    @Ouput() select = new EventEmitter<User>();

    // this because it's a class?
    // all components are classes?
    onClick(){
        this.select.emit(this.user)
    }
}

```

- What is this weird format?

```html
<!-- template -->
<div (click)="onClick()">{{ user.name }}</div>
```

### 2. Standalone Components (modern Angular)

- Angular is moving toward module-less architecture
- Import deps inside the component

```js
@Component({
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `...`,
})
export class LoginForm {}
```

### 3. Dependency injection (DI)

- Angular relies heavily on DI. This is quite different from React
  - What is DI?
- This avoid prop drilling and custom context managers

```js
@Injectable({ providedIn: "root" })
export class AuthService {
  login() {}
}

// inject into a component
constructor(private auth: AuthService){}
```

### 4. Templates & Directives

- Interpolation: `{{value}}`
- Property binding: `[src]="imageUrl`
- Event binding: `(click)="handle()`
- Two-way bind: `[(ngModel)]="form.email"`

- Structure directives (similar to React conditionals/map)
  - What is ngIf and ngFor?

```html
<div *ngIf="isLoggedIn">Welcome</div>
<div *ngFor="let item of list">{{item}}</div>
```

### 5. Change detection

- React: hooks, state, VDOM
- Angular:
  - Zone.js triggers change detection
  - Signals (modern Angular) improve reactivity and granularity
  - Rarely needs manual optimization

```js
// signals
count = signal(0);
increment(){
    this.count.update(v => v + 1)
}
```

```html
<!-- template -->
<p>{{ count() }}</p>
```

### 6. Routing

- First-party and declarative

```js
export const routes: Router = [
  {
    path: "users",
    component: UsersPage,
  },
];
```

- Template navigation

```html
<a routerLink="/users">Users</a> <router-outlet />
```

- What is router outlet?

### 7. Forms

Paradigms:

- Template-driven forms: simple, but less scalable
- Reactive forms? strongly typed, controlled, scalable

```js
// - Reactive
form = new FormGroup({
  email: new FormControl("", Validators.required),
});
```

```html
<!-- Template -->
<input [formControl]="form.controls.email" />
```

### 8. Pipes

- Transform values in the template.
- Good for formatting

```html
<p>{{dateValue | date:"short"}}</p>
<p>{{price | curreny:"EUR"}}</p>
```

- Custom pipe

```js
@Pipe({ name: "upper" })
export class UpperPipe implements PipeTransform {
  transform(val: string) {
    return val.toUpperCase();
  }
}
```

### 9. HttpClient

- Built-in, type, observable-based
  - Is this how we fetch data?

```ts
getUsers(): Observable<User[]>{
    return this.http.get<User[]>("/api/users")
}
```

### 10. Observables & RxJS

- Steepest learning curve for React devs
- Angular uses Observables by default, not promises
- Typical operators:
  - map
  - switchMap
  - tap
  - debounceTime
  - catchError

```js
// what the hell?
users$ = this.route.params.pipe(
  switchMap((params) => this.api.getUsers(params["id"]))
);
```

```html
<div *ngIf="users$ | async as users">...</div>
```

### 11. Structure

- Clear separation of:
  - components: UI
  - services: logic, data, business rules
  - models: types/interfaces

## Creating angular app

```bash
npm install -g @angular/cli # install the cli globally
ng --version # check the cli version
ng new first-ng-app # create app
ng new first-ng-app --inline-style --inline-template ## create app with config
```
