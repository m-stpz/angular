# Angular

- Angular is Framework, not a library
  - It has batteries included: router, HTTP client, DI, forms, state management patterns, build tooling
- Opinionated structure

  - Modules -> components -> templates -> services

  ## Tools

- There's an angular dev tools
- VS Code extension: Angular Language Service: Editor services for Angular templates

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
// component decorator
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

#### 1.1. Component properties

- selector: how the component is referenced in HTML
- template / templateUrl: defines the component's UI structure
- styleUrls: component-scoped styles
- standalone: enables module-less component usage
- imports: declares what directives/pipes/modules the template can use
- changeDetection: controls how Angular updates the UI

1. selector: How you use the component in HTML

```js
selector: "app-user-card";
```

```html
<app-user-card />
```

2. template / templateUrl: Defines the component's UI

- template: inline HTML
- templateUrl: external HTML file

```js
templateUrl: "./user-card.component.html";
```

3. styles / stylesUrl

```js
styleUrls: ["./user-card.component.scss"];
```

4. imports (standalone components only): Defines which Angular modules/directives/pipes this component can use

```js
imports: [CommonModule, FormsModule];
```

5. standalone: marks the component as module-less

- Use this for all new Angular apps

```
standalone:true
```

6. providers: Component-level dependency injection

- Useful if a service should have its own instance per component
- Think "scoped DI"

```js
providers: [UserService];
```

7. changeDetection: How angular checks for updates

Options:

- Default: full checks
- OnPush: (React-like, only update on input changes, signals, observables)
- use `OnPush` in all performant apps

```js
changeDetection: ChangeDetectionStrategy.OnPush;
```

#### 1.2. Data-binding

- Binding data between the component TS class and the component's template

```js
import { Component, signal } from "@angular/core";

@Component({
    ...,
    template: `<p>Some variable {{myVar()}}</p>`
})

class MyComponent {
    myVar = signal('some value')
}
```

#### 1.3 Passing Data From Parent To Child

1. Define the typed inputs in the child

```ts
@Component({
  selector: "child-component",
  ...
})
export Class ChildComponent {
  // here we define what the child accepts
  @Input() message!: string; // receive smth from outside
  @Input() number!: number;
  @Input() person!: User; // models/users.models.ts
}
```

2. Pass values from parent template

```html
<!-- Parent html -->
<child-component
  [whatChildExpects]="whatParentPasses"
  [childInput]="parentPassing"
/>
```

3. Initialize values on parent

```js
@Component({
  selector: "parent-component",
  imports:[ChildComponent] // imports the child
  ...
})
export Class ParentComponent {
  // define what we send
  message = "Hello, from parent",
  number = 42,
  person = {
    name: ...
    age: ...
    isMarried: ...
  }
}
```

#### 1.4 Event handlers

- Event binding: `(eventName)="handler()"`

```html
<button (click)="handleClick()"></button>
<input (keydown)="handleType($event)" />
```

```js
export class Component {
  handleClick() {
    console.log("hey");
  }

  handleType(e: KeyboardEvent) {
    console.log(e.key);
  }
}
```

<!-- https://www.youtube.com/watch?v=oUmVFHlwZsI&list=PL2sQdFoGnLIhLU0Xdsh_ZY1KzGHf4uPMg -->
<!-- 38:23 -->

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

```html
<div *ngIf="isLoggedIn">Welcome</div>
<div *ngFor="let item of list">{{item}}</div>
```

> For more info go to `structural_directive_notes.md`

### 5. Change detection

- React: hooks, state, VDOM
- Angular:
  - Zone.js triggers change detection
  - Signals (modern Angular) improve reactivity and granularity
    - The future of data binding, so use it as a best practie
    - Signal is good when the data needs to react
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
// app.routes
export const routes: Router = [
  {
    path: "users",
    // component: UsersPage, // no lazy-load
    // lazy load
    loadComponent: () => import("./path-to-component").then((m) => m.Component),
  },
];

// app.component
@Component({
  selector:"app-root",
  imports:[RouterOutlet],
  template: `
    <app-header/>
    <main>
      <router-outlet />
    </main>
  `,
  styles: []
})
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

### 12. Angular CLI

- Builds, tests, and serves angular apps

```bash
ng new <app-name> # start app
ng generate component <component-name> # create component
ng g c <path>/<name> # shorthand
  # example: ng g c components/counter
ng serve
```

## Creating angular app

```bash
npm install -g @angular/cli # install the cli globally
ng --version # check the cli version
ng new first-ng-app # create app
ng new first-ng-app --inline-style --inline-template ## create app with config
```

```json
npm start
npm run build
npm test
```

### Main files

```
src/index.html: entry point
main.ts
styles.scss
```
