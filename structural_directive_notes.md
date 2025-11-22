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

## Modern directives (Angular v17+)

- Angular has built a new, modern, React-like, control flow, which replaces `ngIf`, `ngFor` and `ngSwitch` for faster, cleaner syntax
- The new directives are faster, cleaner, more predictable, more readable and matches modern patterns

1. @if instead of ngIf

```html
<!-- old -->
<div *ngIf="isLoggedIn">Welcome</div>

<!-- new -->
@if (isLoggedIn){
<div>welcome</div>
}

<!-- with else -->
@if (isLoggedIn) {
<p>Hello {{user.name}}</p>
} else {
<p>Loading...</p>
}
```

2. @for replaces ngFor

```html
<!-- old -->
<li *ngFor="let item of items; trackBy: trackById">{{item.name}}</li>

<!-- new -->
@for(let item of items; track item.id){
<li>{{item.name}}</li>
}
```

3. @switch / @case / @default instead of ngSwitch

```html
<!-- old -->
<div [ngSwitch]="status">
  <p *ngSwitchCase="'loading'">loading</p>
  <p *ngSwitchCase="'error'">error</p>
  <p *ngSwitchDefault>Ready</p>
</div>

<!-- new -->
@switch(status){
<!--  -->
@case ('loading') {
<p>loading</p>
} @case ('error') {
<p>error</p>
} @default {
<p>ready</p>
} }
```

4. @defer - lazy template loading

- lazy load as part of the template, not the whole route

```html
@defer {
<big-heavy-stuff />
} @loading {
<p>loading...</p>
} @placeholder {
<p>Placeholder</p>
}
```

- Triggers
  - `on idle`
  - `on viewport`
  - `on interaction`
  - `on hover`
  - `on timer(ms)`

```html
@defer (on interaction){
<some-component />
}
```
