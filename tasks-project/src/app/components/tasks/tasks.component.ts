import { Component, inject, signal } from '@angular/core';
import { TasksService } from '../../services/tasks.service';
import { TaskItemComponent } from '../task-item/task-item.component';
import { Task } from '../../types/task.type';

@Component({
  selector: 'app-tasks',
  imports: [TaskItemComponent],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
})
export class TasksComponent {
  private readonly tasksService = inject(TasksService);

  tasks = this.tasksService.tasks;

  // parent holds the truth of which tasks is being edited
  selectedTask = signal<Task | null>(null);

  onCloseModal() {
    this.selectedTask.set(null);
  }
}
