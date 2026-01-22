# Using services

```bash
ng g service services/<service-name>
```

```ts
// service
@Injectable({
  providedIn: "root",
})
export class TasksService {
  // for now, importing it, however, it should be fetched
  private tasks: Task[] = TASKS;

  // declare a method to grab them
  getTasks() {
    return this.tasks;
  }
}
```

```ts
// component
export class TasksComponent {
  tasks: Task[];

  constructor(private tasksService: TasksService) {
    this.tasks = this.tasksService.getTasks(); // the tasks is the result of `getTasks`
  }
}
```
