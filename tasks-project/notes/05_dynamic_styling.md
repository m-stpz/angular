# Dynamic styling

- In angular there are 3 ways to achieve it

## 1. Attribute binding ("React-like")

- Bind it directly to a style property

```html
[style.property]

<div class="task" [style.border]="task.reminder ? '1px solid red' : undefined"></div>
```

```html
<div [style.color]="task.important ? 'red' : 'blue'">...</div>

<div [style.font-size.px]="isLarge ? 26 : 16">...</div>
```
