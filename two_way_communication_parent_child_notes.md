# Child -> Parent updates

In Angular:

1. Parent passes data to child via @Input or input()
2. Child notifies parent via @Output or output()
3. Parent updates its own state (signals, observables, arrays, etc)
4. Parent's updated state flows down to child automatically

```
Parent -> passes data to child -> child notifies data change -> Parent updates -> Change cascates down to child
```

```
Child triggers events. Parent handles state
```

- Control: Child
- Ownership: Parent
- Control and ownership belong to different components

### 1. Parent -> Child (@Input / input())

- The parent is responsible for:
  - storing/updating the state
  - making decisions about the data
  - triggering new UI updates

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
  // parent = controls WHAT to do with information
  // this doesn't know when the child changed, only knows what to do once the child notifies it
  handleItemChanged(updatedItem: Item) {
    this.item.set(updatedItem);
  }
}
```

```html
<app-child [item]="item" (notifyParent)="handleItemChanged($event)"></app-child>
```

- (notifyParent): defined in the child
- handleItemChanged($event): defined in the parent

### 2. Child receives data + exposes output

- The child is responsible for letting the parent know when something happened

- The child needs to also define when an event occurs

  - checkbox changed
  - button clicked
  - form submitted
  - item toggled

- The child is the one that knows when something meaningful happens in its own UI

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

  // controls WHEN something happens
  // this DOES NOT update the state, it only lets the parent know that something happend
  notifyParent() {
    // hey parent, something happens, here's the data
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

### 4. Parent receives event + updates its own state

```js
// parent with signals
items = signal<Item[]>();

handleItemChanged(updated:Item){
  this.items.update((items) => items.map(item => item.id === updated.id ? updatedItem : item))
}
```

## React example

```jsx
// parent
export function Parent() {
  function onChange(item) {
    // do something
  }

  return <Child onClick={() => onChange(item)} />;
}

// child
export function Child({ onClick }) {
  return <button onClick={onClick}>click me</button>;
}
```

## Angular Example

### 1. Parent: owns the state, updates the state

```ts
// parent.component.ts
@Component({
  selector:"app-parent",
  ...
})
export class ParentComponent{
  // parent owns the state
  selectedItem = signal<Item>({})

// parent receives the update from the child and does something with it
  onChildItemChange(updatedItem:item){
    this.selectedItem.set(updatedItem)
  }
}
```

```html
<!-- parent.component.html -->
<app-child
  [item]="selectedItem()"
  (itemChanged)="onChildItemChange($event)"
></app-child>
```

- item: what the child expects
- selectedItem(): signal the parent is sending 'down'
- itemChanged: output defined in child
- onChildItemChange: function defined in parent

### 2. Child: receives data, emits events

- Output: exists only to notify the parent

```ts
@Component({
  selector:"app-child",
  ...
})
export class ChildComponent(){
  // input coming from parent
  item = input<Item>() // Parent -> Child
  // goes back to parent
  itemChanged = output<Item>() // Child -> Parent

  notifyParent(item: Item){
    this.itemChanged.emit(this.item())
  }
}
```

```html
<button (click)="notifyParent()">Toggle: {{item().name}}</button>
```

```
Not related with Angular, but an cool tip:
- Open dev tools
- Go to source tab
- CMD + P: to search any file
- Add a breaking point to debug

CMD + P is a really cool command on the source to seach any file we want. Amazing for debugging.
```
