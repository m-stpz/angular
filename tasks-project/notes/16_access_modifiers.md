# Access modifiers

| Keyword   | Visibility                                         | Use case                                                 |
| --------- | -------------------------------------------------- | -------------------------------------------------------- |
| public    | accessible everywhere (template, class & external) | Default, if you type nothing. Variables to show around   |
| private   | only accessible within the class                   | Internal logic, state management, and Services           |
| protected | visible for parent and children                    | Inheritance, when a child needs to use a parent variable |
| readonly  | prevents reassignment after init                   | Config values or constants                               |

> Legacy code: you might see `_userName` => it means the variable is private

- Within a component class, we don't use `var`, `let`, or `const`, we simply declare them

```ts
export class ExampleComponent implements onInit {
  // 1. properties
  @Input() id!: string;
  public status = "Idle";
  private secretKey = "1234"; // template can't see this

  // 2. constructor
  constructor(private api: ApiService) {}

  // 3. lifecycle
  ngOnOnit() {
    this.fetchData();
  }

  // 4. methods
  public handleClick() {
    this.status = "Busy";
  }

  private fetchData() {
    // internal logic
  }
}
```
