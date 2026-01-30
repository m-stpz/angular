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

  // emit to the parent
  @Output() edit = new EventEmitter<Task>();
  @Output() delete = new EventEmitter<number>();
  @Output() toggleReminder = new EventEmitter<number>();

  readonly EditIcon = SquarePen;
  readonly DeleteIcon = Trash;

  showDetails = signal(false);

  onToggleShowDetails(event: MouseEvent) {
    event.stopPropagation();
    this.showDetails.update((val) => !val);
  }
}
