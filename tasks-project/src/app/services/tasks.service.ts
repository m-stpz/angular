import { Injectable, signal } from '@angular/core';
import { Task } from '../types/task.type';
import { TASKS } from '../mock-tasks';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
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

  createTask(task: Task) {
    this._tasks.update((tasks) => [...tasks, task]);
  }

  updateTask(updatedTask: Task) {
    this._tasks.update((tasks) =>
      tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task)),
    );
  }

  deleteTask(id: Task['id']) {
    this._tasks.update((tasks) => tasks.filter((task) => task.id !== id));
  }
}
