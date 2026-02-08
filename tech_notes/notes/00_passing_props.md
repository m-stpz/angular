# Passing Props | Input Binding

- In React, we'd do:

```tsx
function MyComponent({ variable1, variable2 }: Props) {}
```

Then, we'd pass props to the component.

- In Angular, the terminology is different. Instead of "passing props", we say "input binding". When we do:

```html
<app-button text="example" color="red"></app-button>
```

```ts
export class ButtonComponent {
  @Input({ required: true }) text!: string;
  @Input() color: ButtonColor = "blue";
}
```

- We bind a value from the parent to an `@Input` property on the child

## @Input & @Output Decorators

### @Input: data in

- Used when parent -> child passes data
  - Input property binding

```ts
@Component({})
export class Child {
  @Input({ required: true }) title!: string;
}
```

```html
<app-child [title]="pageTitle"></app-child>
```

### @Output: events out

- Used when child -> parent needs to notify something

#### Child

```ts
@Component({})
export class Child {
  @Output() childEventEmitter = new EventEmitter<void>();

  // this will be called into the child html
  myChildFunc() {
    // it will emit what the parent sends
    this.clicked.emit();
  }
}
```

```html
<button (click)="myChildFunc()">...</button>
```

#### Parent

```ts
@Component({})
export class Parent {
  parentFunc() {
    // do something
  }
}
```

```html
<app-child (childEventEmitter)="parentFunc()"></app-child>
```
