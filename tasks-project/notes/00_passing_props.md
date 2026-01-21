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
