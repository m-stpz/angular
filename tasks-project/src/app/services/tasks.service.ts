import { Injectable } from '@angular/core';
import { Task } from '../types/task.type';
import { TASKS } from '../mock-tasks';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  private tasks: Task[] = TASKS;

  getTasks() {
    return this.tasks;
  }
}
