import { inject, Injectable, signal } from '@angular/core';
import { Task } from '../types/task.type';
import { TASKS } from '../mock-tasks';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:5000/tasks';
  /*  
    service owns it
    private => no component can touch it
    writable => only service can mutate
    source of truth
  */
  private readonly _tasks = signal<Task[]>(TASKS);

  /* 
    public => exposed to components
    unmutable => read only
    can only be read/subscribed to
  */
  readonly tasks = this._tasks.asReadonly();

  constructor() {
    this.loadTasks();
  }

  private loadTasks() {
    this.http.get<Task[]>(this.apiUrl).subscribe((tasks) => {
      this._tasks.set(tasks);
    });
  }

  createTask(task: Task) {
    this.http.post<Task>(this.apiUrl, task).subscribe((created) => {
      this._tasks.update((tasks) => [...tasks, created]);
    });
  }

  updateTask(updatedTask: Task) {
    this.http
      .put<Task>(`${this.apiUrl}/${updatedTask.id}`, updatedTask)
      .subscribe((updated) => {
        this._tasks.update((tasks) =>
          tasks.map((task) => (task.id === updatedTask.id ? updated : task)),
        );
      });
  }

  deleteTask(id: Task['id']) {
    this.http.delete(`${this.apiUrl}/${id}`).subscribe(() => {
      this._tasks.update((tasks) => tasks.filter((task) => task.id !== id));
    });
  }
}
