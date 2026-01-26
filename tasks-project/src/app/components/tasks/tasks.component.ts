import { Component, inject, signal } from '@angular/core';
import { TasksService } from '../../services/tasks.service';
import { TaskItemComponent } from '../task-item/task-item.component';
import { Task } from '../../types/task.type';
import { ModalComponent } from '../modal/modal.component';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-tasks',
  imports: [TaskItemComponent, ModalComponent, ButtonComponent],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
})
export class TasksComponent {
  private readonly tasksService = inject(TasksService);
  tasks = this.tasksService.tasks;

  // parent holds the truth of which tasks is being edited
  selectedTask = signal<Task | null>(null);

  openEditModal(task: Task) {
    this.selectedTask.set(task);
  }

  onCloseModal() {
    this.selectedTask.set(null);
  }
}
