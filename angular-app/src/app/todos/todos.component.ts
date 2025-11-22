import { Component, inject, signal } from '@angular/core';
import { TodosService } from '../services/todos.service';
import { CommonModule } from '@angular/common';
import { Todo } from '../models/todo.models';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-todos',
  imports: [CommonModule],
  templateUrl: './todos.component.html',
  styleUrl: './todos.component.scss',
})
export class TodosComponent {
  todoService = inject(TodosService);
  // todos = this.todoService.getTodos();
  todos = signal<Todo[]>([]); // init with empty

  ngOnInit() {
    this.todoService
      .getTodos()
      .pipe(
        catchError((err) => {
          throw err;
        })
      )
      .subscribe((todos) => {
        this.todos.set(todos);
      });
  }
}
