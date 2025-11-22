import { Component, inject } from '@angular/core';
import { TodosService } from '../services/todos.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-todos',
  imports: [CommonModule],
  templateUrl: './todos.component.html',
  styleUrl: './todos.component.scss',
})
export class TodosComponent {
  todoService = inject(TodosService);
  todos = this.todoService.getTodos();

  ngOnInit() {
    console.log(this.todoService.todos);
  }
}
