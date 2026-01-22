import { Component, inject } from '@angular/core';
import { Task } from '../../types/task.type';
import { TasksService } from '../../services/tasks.service';
import { TaskItemComponent } from '../task-item/task-item.component';

@Component({
  selector: 'app-tasks',
  imports: [TaskItemComponent],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
})
export class TasksComponent {
  private readonly tasksService = inject(TasksService);

  tasks = this.tasksService.tasks;
}
