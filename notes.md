# Angular

- Angular is Framework, not a library
  - It has batteries included: router, HTTP client, DI, forms, state management patterns, build tooling
- Opinionated structure
  - Modules -> components -> templates -> services

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

    onClick(){
        this.select.emit(this.user)
    }
}

```

```html
<!-- template -->
<div (click)="onClick()">{{ user.name }}</div>
```

## 2. Standalone Components (modern Angular)

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

## 3. Dependency injection (DI)

- Angular relies heavily on DI. This is quite different from React
- This avoid prop drilling and custom context managers

```js
@Injectable({ providedIn: "root" })
export class AuthService {
  login() {}
}

// inject into a component
constructor(private auth: AuthService){}
```

## 4. Templates & Directives

- Interpolation: `{{value}}`
- Property binding: `[src]="imageUrl`
- Event binding: `(click)="handle()`
- Two-way bind: `[(ngModel)]="form.email"`

- Structure directives (similar to React conditionals/map)

```html
<div *ngIf="isLoggedIn">Welcome</div>
<div *ngFor="let item of list">{{item}}</div>
```

## 5. Change detection

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
