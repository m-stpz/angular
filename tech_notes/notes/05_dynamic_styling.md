# Dynamic styling

- In angular there are 3 ways to achieve it

## 1. Attribute binding `[style.property]` ("React-like")

- Bind it directly to a style property

```html
[style.property]

<div class="task" [style.border]="task.reminder ? '1px solid red' : undefined"></div>
```

```html
<div [style.color]="task.important ? 'red' : 'blue'">...</div>

<div [style.font-size.px]="isLarge ? 26 : 16">...</div>
```

## 2. The `[ngStyle]` Directive

- Useful for multiple styles at once
- Similar to cn function in shadcn

```ts
// import it at the component
import { NgStyle } from '@angular/common';

@Component({
    ...,
    imports: [NgStyle]
})
```

```html
<div
  [ngStyle]="{
     color: task.reminder ? 'green' : 'black',
    'font-weight': task.reminder ? 'bold' : 'normal',
    border: task.reminder ? '1px solid gray' : 'none',
}"
>
  ...
</div>
```

## 3. Dynamic class with `[class]` (Best practice)

- Also known as `Class Binding`
- In Angular, it's usually preferred to keep the CSS in your stylesheet and toggle classes rather than inline styles

- Create a css class

```css
.example {
  background-color: red;
}
```

- Use it dynamically

```html
<div [class.example]="task.reminder">...</div>
```

- Meaning, if task.reminder, then "inject" the class example (style) to it

- Syntax

```html
<div [class.name-of-css-class]="bool_condition"></div>
```
