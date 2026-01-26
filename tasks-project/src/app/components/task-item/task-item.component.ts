import {
  Component,
  EventEmitter,
  inject,
  Input,
  Output,
  signal,
} from '@angular/core';
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
  @Output() edit = new EventEmitter<Task>();

  private readonly tasksService = inject(TasksService);

  showDetails = signal(false);
  selectedTask = signal<Task | null>(null);

  onDeleteTask() {
    this.tasksService.deleteTask(this.task.id);
  }

  onToggleTaskReminder() {
    this.tasksService.toggleTaskReminder(this.task.id);
  }

  onToggleShowDetails(event: MouseEvent) {
    event.stopPropagation();
    this.showDetails.update((val) => !val);
  }

  onSelectTask(event: MouseEvent) {
    event.stopPropagation(); // stop the card from toggling details
    this.edit.emit(this.task);
  }
}
