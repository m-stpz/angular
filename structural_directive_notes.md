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

3. `

---

```html

```

```jsx

```
