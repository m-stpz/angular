import { Component, Input } from '@angular/core';
import { Task } from '../../types/task.type';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-task-item',
  imports: [ButtonComponent],
  templateUrl: './task-item.component.html',
  styleUrl: './task-item.component.css',
})
export class TaskItemComponent {
  @Input() task!: Task;

  deleteItem() {
    console.log('to delete', this.task.text);
  }
}
