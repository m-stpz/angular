# Local State

## Toggle

```ts
// component
class MyComponent {
  showDetails = signal(false);

  onToggleDetails() {
    this.showDetails.update((prev) => !prev);
  }
}
```

```html
<button (click)="onToggleDetails()">Toggle Info</button>

@if(showDetails()){
<p>hidden</p>
}
```

## Modal

```ts
export class MyComponent {
  selectedTask = signal<Task | null>(null);

  openModal() {
    this.selectedTask.set(this.task);
  }

  closeModal() {
    this.selectedTask.set(null);
  }
}
```

```html
@for (task of tasks(); track task.id) {
<button>Edit {{task.id}}</button>
}
<!--  -->
@if(selectedTask(); as task) {
<div class="modal-backdrop" (click)="closeModal()">
  <div class="modal-content" (click)="$event.stopPropagation()">
    <h2>Editing {{task.name}}</h2>
    <p>ID: {{task.id}}</p>

    <button (click)="closeModal()">Close</button>
  </div>
</div>
}
```

### .set() vs .update()

- Both are used to change the value of a Writeable signal
- `.set()`: replace the value entirely with something new.
  - don't care about the previous value
- `.update()`: when the new value depends on the old value
  - it takes a compute function as argument
