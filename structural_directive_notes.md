# Structural directives

- Directives that change the DOM layout by adding or removing DOM elements
- For example, rendering an array (.map in React)
- ng is pronounced `ang`, not `N-G`

```js
export class ComponentWithList {
  links: [
    { label: "Home", path: "" },
    { label: "Contact", path: "contact" },
    { label: "About", path: "about" }
  ];
}
```

```html
<div>
  <ul>
    <!-- structural directive -->
    <li *ngFor="let link of links">
      <!-- routerLink = <Link to=""> in react -->
      <a [routerLink]="link.path">{{link.label}}</a>
    </li>
  </ul>
</div>
```

## Types

- ngIf: conditional rendering
- ngFor: looping
- ngSwitch, ngSwitchCase, ngSwitchDefault: switch case
- ngTemplate: template blocks
- ngComponentOutlet: Dynamic component
- ngIf; else: Conditional + fallback

> They are appended by `*<directive>`

---

1.`ngIf` - conditional rendering

```html
<div *ngIf="isLoggedIn">Welcome {{user}}</div>
```

- In react:

```jsx
{
  isLoggedIn && <div>Welcome {user}</div>;
}
```

2. `ngFor` - looping

```html
<li *ngFor="let item of items">{{item}}</li>
```

```jsx
{
  items.map((item) => <li>{item}</li>);
}
```

3. `ngSwitch`, `ngSwitchCase`, `ngSwitchDefault` - switch case rendering

```html
<div [ngSwitch]="status">
  <p *ngSwitchCase="'loading'">Loading...</p>
  <p *ngSwitchCase="'error'">Error</p>
  <p *ngSwitchDefault=>Ready</p>
</div>
```

```jsx
switch (status) {
  case "loading":
    return <p>Loading..</p>;
  case "error":
    return <p>Error</p>;
  default:
    return <p>Ready</p>;
}
```

4. `ngTemplate`, `<ng-template>` - invisible template blocks

Conceptually similar to

```jsx
<></>
```

5. `ngComponentOutlet` - dynamic components

- Dynamically render a component at run time

```html
<ng-container *ngComponentOutlet="componentToRender"></ng-container>
```

```jsx
const component = componentToRender;

return <Component />;
```

6. `ngIf; else` - conditional with fallback block

```html
<!-- else <tag> -->
<div *ngIf="user; else loading">{{user.name}}</div>

<!-- then, we add the #<tag> to an ng-template -->
<ng-template #loading>
  <p>loading</p>
</ng-template>
```

```jsx
{
  user ? <div>{user.name}</div> : <p>Loading</p>;
}
```
