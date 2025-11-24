# Pipes

- Transform data in the template
- Take in an input value and return a transformed one
- Don't modify the original data, only its presentation
- They are used for FORMATTING, not logic. They are great for:
  - formatting strings
  - formatting dates
  - formatting currencies
  - slicing arrays
  - filtering display data
  - custom display transformations

## Built-in pipes

```
{{amount | currency: "EUR"}}
{{today | date: "short"}}
{{longText | slice: 0.5}}
{{items | json}}
```

## Custom pipes

- A class with a `transform()` method

```bash
ng g pipe pipes/<pipe-name>
```

```ts
@Pipe({ name: "capitalize", standalone: true })
export class CapitalizePipe implements PipeTransform {
  transform(value: string): string {
    return value.chartAt(0).toUpperCase() + value.slice(1);
  }
}
```

```html
<p>{{username | capitalize}}</p>
```
