import { Component, Input, signal } from '@angular/core';
import { Task } from '../../types/task.type';
import { ButtonComponent } from '../button/button.component';
import { TasksService } from '../../services/tasks.service';

@Component({
  selector: 'app-task-item',
  imports: [ButtonComponent],
  templateUrl: './task-item.component.html',
  styleUrl: './task-item.component.css',
})
export class TaskItemComponent {
  @Input({ required: true }) task!: Task;

  // local state
  isActive = signal(false);

  constructor(private tasksService: TasksService) {}

  deleteTask() {
    this.tasksService.deleteTask(this.task.id);
  }

  toggleActive() {
    console.log('isActive', this.task.text);
    this.isActive.update((val) => !val);
  }
}
