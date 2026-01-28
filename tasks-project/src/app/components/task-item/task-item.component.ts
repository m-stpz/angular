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
import { LucideAngularModule, SquarePen, Trash } from 'lucide-angular';

@Component({
  selector: 'app-task-item',
  imports: [ButtonComponent, LucideAngularModule],
  templateUrl: './task-item.component.html',
  styleUrl: './task-item.component.css',
})
export class TaskItemComponent {
  @Input({ required: true }) task!: Task;
  @Output() edit = new EventEmitter<Task>();

  private readonly tasksService = inject(TasksService);
  readonly EditIcon = SquarePen;
  readonly DeleteIcon = Trash;

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

  onEdit() {
    this.edit.emit(this.task);
  }
}
