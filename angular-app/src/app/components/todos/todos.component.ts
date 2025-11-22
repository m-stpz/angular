import { Component, inject } from '@angular/core';
import { TodosService } from '../../services/todos.service';

@Component({
  selector: 'app-todos',
  imports: [],
  templateUrl: './todos.component.html',
  styleUrl: './todos.component.scss',
})
export class TodosComponent {
  todoService = inject(TodosService);
}
