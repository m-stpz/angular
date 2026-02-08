## Fetching from server

- Enable HTTP

```ts
export const appConfig = {
  providers: [provideHttpClient()],
};
```

- Now, the service should grab from the server

```ts
export class TasksService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = "http://localhost:5000/tasks";

  private readonly _tasks = signal<Task[]>([]);
  readonly tasks = this._tasks.asReadonly();

  constructor() {
    this.loadTasks();
  }

  private loadTasks() {
    this.http.get<Task[]>(this.apiUrl).subscribe((tasks) => {
      this._tasks.set(tasks);
    });
  }
}
```

## HttpClient and Angular

- `HttpClient` returns Observables
  - Observables are lazy, meaning, we must chain .subscribe into them
  - Without .subscribe(), Observables are cold, meaning nothing happens
  - Unlike `fetch`, which uses Promise, `HttpClient` returns observable
    - Observables allow:
      - cancel requests
      - continuous data stream
      - transform the data with pipes

### Observables

- Observable: representation of multiple future values
  - Stream of values
- Promise: representation on a single future value

```ts
this.http.get(...).subscribe(...)
```

## .subscribe()

- What is passed within it is a callback, therefore it runs after the server answers

```ts
createTask(task: Task) {
    this.http.post<Task>(this.apiUrl, task).subscribe((created) => {
      // once the server has answered with the created task, update the service tasks with the new one
      this._tasks.update((tasks) => [...tasks, created]);
    });
  }
```
