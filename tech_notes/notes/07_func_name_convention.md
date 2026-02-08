# Func name convention

- We declare the function that performs HTTP methods on our service, such as:

```ts
export class MyService {
    // function that performs the action
    // business logic
  deleteItem(id: string) {
    ...
  }
}
```

- We then create a function on our component which class this service function

```ts
export class MyComponent {
  private readonly myService = inject(MyService);

  //  component function that calls the service function
  //   UI Event
  onDeleteItem() {
    this.myService.deleteItem(this.item.id);
  }
}
```

- How to differentiate them?
  - Distinguish the business logic from the UI event
  - Component: event-focused (on<func-name>)
    - eg: onDeleteItem(){}
  - Service: action-focused (<func-name>)
    - eg: deleteItem(){}
