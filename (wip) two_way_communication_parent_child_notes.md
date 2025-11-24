# Child -> Parent updates

In Angular:

1. Parent passes data to child via @Input or input()
2. Child notifies parent via @Output or output()
3. Parent updates its own state (signals, observables, arrays, etc)
4. Parent's updated state flows down to child automatically

```
Parent -> passes data to child -> child notifies data change -> Parent updates -> Change cascates down to child
```

### 1. Parent -> Child (@Input / input())

```ts
@Component({
  selector: "app-parent",
  standalone: true,
  imports: [ChildComponent],
  templateUrl: "./parent.component.html",
})
export class ParentComponent {
  // parent state
  item = signal<Item>({
    id: 1,
    name: "Example item",
    completed: false,
  });

  // parent listening to updates
  handleItemChanged(updatedItem: Item) {
    this.item.set(updatedItem);
  }
}
```

```html
<app-child [item]="item" (itemChanged)="handleItemChanged($event)"></app-child>
```

### 2. Child receives data + exposes output

```ts
@Component({
  selector: "app-child",
  standalone: true,
  imports: [],
  templateUrl: "./child.component.html",
})
export class ChildComponent {
  item = input.required<Item>(); // input comes from parent
  itemChanged = output<Item>(); // output goes to parent

  updatedItem() {
    this.itemChanged.emit(this.item()); // notify parent
  }
}
```

### 3. Child triggers parent update via event

```html
<!-- child html -->
<button (click)="updateItem()">Update</button>
```

- It could be:
  - (click)
  - (change)
  - (input)
