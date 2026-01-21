import { Component } from '@angular/core';
import { Task } from '../../types/task.type';
import { TASKS } from '../../mock-tasks';

@Component({
  selector: 'app-tasks',
  imports: [],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
})
export class TasksComponent {
  tasks: Task[] = TASKS;
}
