# Smart vs. Dumb components

- One component handles the logic and data, while the other focuses purely on visuals

## The smart component | Parent

- The brains, usually sits at the top level (the parent)
- It should talk to the services, manage the state and handle API calls
- Responsibility
  - Fetches data
  - Handles complex logic
  - Interacts with the store or services

- Data flow
  - Passes data fown to children via [Input] properties

- Action
  - It listens from events up from child via (Output) listeners

`ItemListComponent`:

- Injects the `ItemService`
- Fetches the list from the db
- Defines what happens when edit/delete btns are clicked

## The dumb component | Child

- Presentational
- It doesn't know/care where the data comes from and what a "service" is
- It just displays what it's told and reports back when the user interacts with it

- Responsibility
  - Presentational and UI
  - Highlighly reusable

- Data flow
  - Receives data via `@Input()`

- Action
  - Emits user interactions via `@Output()`

`ItemComponent`:

- Render a single item's name and description
- It has two buttons edit/delete
- Instead of deleting the items itself, it just says: "Hey, parent! Someone clicked delete on ID#2"

## Rendering a list of tasks

| Feature | Smart / Parent             | Dumb / Child                                 |
| ------- | -------------------------- | -------------------------------------------- |
| Data    | fetches `tasks[]` from api | Receives a single `Task`                     |
| Logic   | Defines `deleteTask(id)`   | Has a button that triggers an `EventEmitter` |

## Code Example

### Smart component

```ts
@Component({
  selector: "app-task-list",
  standalone: true,
  imports: [TaskItemComponent], // import "dumb" component
  template: `
        <h1>Task dashboard</h2>

        @for(item of tasks(); track item.id){
            <app-task-item
            [task]="item" // input
// (edit) output in the child | onEdit comes from the parent
            (edit)=onEdit($event)
            (delete)=onDelete($event)
        } @empty {
         <p>No tasks!</p>
         }
    `,
})
export class TaskListComponent {
  private tasksService = inject(TaskService);
  tasks = this.tasksService.tasks;

  // the parent "talks" with the service and defines what happens on given method
  onEdit(task: Task) {
    // edit logic
  }

  onDelete(id: Task["id"]) {
    this.taskService.deleteTask(id);
  }
}
```

### Dumb component

```ts
@Component({
  selector: "app-task-item",
  standalone: true,
  template: `
    <div>
      <h3>{{ task().title }}</h3>
      <div>
        // the child doesn't know and edit does, it only "emits" to the parent
        <button (click)="edit.emit(task().id)">Edit</button>
        <button (click)="delete.emit(task().id)">Delete</button>
      </div>
    </div>
  `,
})
export class TaskItemComponent {
  // new input API
  task = input.required<Task>();
  @Input({ required: true }) oldInput!: Task; // old input api

  // new output API (shorthand for EventEmitter)
  edit = output<Task>();
  @Output() oldOutput = new EventEmitter<Task>(); // old output api

  delete = output<Task["id"]>();
}
```
