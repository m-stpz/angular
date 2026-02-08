# Input & Output

> Continuation of 00_passing_props.md

- In Angular, data is unidirectional, it goes down
- Data goes DOWN: Parent passes data via to the child via **inputs**
- Actions go uP: The child notifies the parent of events via **outputs**

> Data down, actions up

## Old API: Decorators

- Angular relied on `@Input` and `@Output` decorators.
  - Tied to class properties and need the `EventEmitter` for communication

- `@Input`: declares a property that can receive data from parent.
  - To react to changes, you often had to use `ngOnChanges` lifecycle hook or setter

- `@Output`: Uses an `EventEmitter` to push data from the child back up to parent

```ts
// example old API: decorators
@Component({
    ...
})
export class ItemComponent implements onChanges {
    @Input({required: true}) item: Item;
    @Output() removeItem = new EventEmitter<Item>()

    variable1 = "";
    variable2 = 0;
    variable3 = false

    // lifecycle
    ngOnChanges(){
        this.variable1 = this.item.name;
        this.variable2 =  this.item.number;
        this.variable3 = this.item.isADev;
    }
}
```

## New API: Signals

- Beyond syntax, it changes how Angular detects updates, making them faster and more surgical

- `input()`: Instead of a variable, the input is now a Signal.
  - Component reacts to data changes automatically without needing lifecycle hooks like `ngOnChanges`

- `output()`: Simpler, more lightweight way to emit events
  - Doesn't require so much boilerplate with `EventEmitter` class

```ts
// example new API: signals
export class ItemComponent {
  item: input.required<Item>(); // function, so it needs parethesis
  removeItem = output<Item>()

  variable1 = computed(() => this.item().name);
  variable2 = computer(() => this.item().number);
  variable3 = computed(() => this.item().isADev);
}
```

## Signals

- Reactive concept
- Notify subscribers on value change
- Use a getter function
- Can be `writable` or `read-only`

## Computed

- Used for computing `derived state`
- If A changes, B (which depends on A) updates automatically

- Concepts
  - read-only
    - not possible to use `update()` or `set()`
    - changes only when dependencies change
  - memoized by default

```ts
@Component({...})
export class CounterComponent {
    count = signal(0); // source of truth. Writable signal

    // derived state
    // automatically trackes this.count()
    isEven = computed(() => this.count() % 2 === 0)

    increment(){
        this.count.update(prev => prev + 1)
    }
}
```

- Now, we don't need `ngOnChanges` to manually update variables when `item` changes
