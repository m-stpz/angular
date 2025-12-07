# Signals

- It's a reactive variables

> A wrapper around a value that notifies interested consumers when that value changes

- They avoid the usage of

```
ngOnChanges
ngDoCheck
ngOnInit
```

- Read signals by calling its getter function

## Writeable signals

- Signals that provide an API for updating their values directly

```ts
variable = signal(initialValue);

variable.set(newValue); // set
variable.update((prevValue) => prevValue + 1); // compute based on prevValue
```

```ts
count = signal(0); // declaration

// html
count(); // reading it => signals are getter functions - calling them reads their value

// updating it
count.set(5); // change it directly
count.update((value) => value + 1); // compute based on a previous value
```

- Signals trigger updates only where they're used
  - When a signal changes, Angular updates only the DOM bindings that touch it
  - No component re-render, no diffing

```html
<!-- only this <p> updates -->
<p>{{count()}}</p>
```

## Computed signals

- Read-only signals that derive their value from other signals
- Defined them by using `computed` function and specifying a derivation

```ts
const count: WriteableSignal<number> = signal(0);
const doubleCount: Signal<number> = computed(() => count() * 2); // depends on count signal
// when count changes, Angular knows doubleCount should also update
```

- You can safely perform expensive derivations in computed signals, such as filtering arrays (it's like useMemo, but automatic)

## Effects

- Useful because they notify interested consumers when they change
- Effect: operation that runs whenever one or more signal values changes
  - Run at least once

```ts
effect(() => {
  console.log(count());
});
```

- Useful for:
  - Logging data being displayed and when it changes (analytics or debugging)
  - Keeping data in sync with `window.localStorage`
  - Adding custom DM behavior that can't be expressed with template syntax
  - Performing custom rendering to a <canvas>, charting lib, or other 3rd party UI lib

## `input()` and `output()`

- Instead of traditional `@Input()` or `@Output`, we have the signal version

```ts
// old
@Input() count:number;
// new (signal)
count = input<number>()
---
@Output() count:number; // old
count = output<number>() // new
```

- Event emitter `output`

```ts
handleChange = output<Item>();

handleChange.emit(item);
```

## Signals and new syntax

```html
@if (count() > 0){ // }
<!--  -->

@for(todo of todos(); track todo.id){
<li>{{todo.title}}</li>
}
```

## Signals compose into stores

- We can build global store with signals

```js
@Injectable({ providedIn: "root" })
export class TodosStore {
  todos = signal<Todo[]>([]);

  getAll(){
    return this.todos()
  }

  getById(id:Todo["id"]){
    return this.todos().find((todo) => todo.id === id);
  }

  add(todo: Todo) {
    this.todos.update((list) => [...list, todo]);
  }

  remove(id: Todo["id"]){
    this.todos.update((list) => list.filter((todo) => todo.id !== id))
  }

  update(updated: Todo){
    this.todos.update((list) => list.map((todo) => todo.id === updated.id ? {...todo, ...update} : todo))
  }
}
```
