# Angular Directives

- Directive is a class that adds behavior to HTML
- They are:
  - Component (special directive with a template)
  - Structural directive
  - Attribute directive
- They can be:

```
[something]
(something)
*something
@something
something.something
```

- Creating a directive

```
ng g directive directives/highlight-completed-todo
```

## 1. Components = directives + template

- Every component is technically a directive with UI

```ts
@Component({...})
export class HeaderComponent {}
```

## 2. Structural directives

- Used to create, remove, or move DOM elements
- Old

```
ngIf
ngFor
ngSwitch case
```

- New

```
@if
@for
@switch, @case, @default
@defer, @loading, @placeholder
@let
```

## 3. Attribute directives (change appearance or behavior)

- They modify an existing element or component in place

```
ngClass
ngStyle
ngModel
ngForm
<!-- router directives -->
routerLink
routerLinkActive
<router-outlet>
```

```html
<!-- passing a directive based on some value -->
<div [ngClass]="{active: isActive}"></div>
```

```html
<div [ngStyle]="{color: red}"></div>
```

## 4. Writing a custom directive

- Used for:
  - reusable DOM behavior
  - don't need an entire component
  - functionality/style that apply to many elements

```ts
@Directive({
  // this is how the directive will be identified
  selector: "[appHighlight]",
})
export class HighlightDirective {
  constructor(private element: ElementRef) {
    this.element.nativeElement.style.background = "red";
  }
}
```

```html
<p appHighlight>Highlighted text</p>
```
