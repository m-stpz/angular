import { Component, inject, Input, signal } from '@angular/core';
import { Task } from '../../types/task.type';
import { ButtonComponent } from '../button/button.component';
import { TasksService } from '../../services/tasks.service';
import { ModalComponent } from '../modal/modal.component';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-task-item',
  imports: [ButtonComponent, ModalComponent, JsonPipe],
  templateUrl: './task-item.component.html',
  styleUrl: './task-item.component.css',
})
export class TaskItemComponent {
  @Input({ required: true }) task!: Task;

  private readonly tasksService = inject(TasksService);

  showDetails = signal(false);
  selectedTask = signal<Task | null>(null);

  onDeleteTask() {
    this.tasksService.deleteTask(this.task.id);
  }

  onToggleTaskReminder() {
    this.tasksService.toggleTaskReminder(this.task.id);
  }

  onToggleShowDetails() {
    this.showDetails.update((val) => !val);
  }

  onSelectTask() {
    this.selectedTask.set(this.task);
  }
}
