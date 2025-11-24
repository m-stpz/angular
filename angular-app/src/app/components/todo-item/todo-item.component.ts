import { Component, input, output } from '@angular/core';
import { Todo } from '../../models/todo.models';
import { NgStyle } from '@angular/common';
import { HighlightCompletedTodoDirective } from '../../directives/highlight-completed-todo.directive';

@Component({
  selector: 'app-todo-item',
  imports: [NgStyle, HighlightCompletedTodoDirective],
  templateUrl: './todo-item.component.html',
  styleUrl: './todo-item.component.scss',
})
export class TodoItemComponent {
  todo = input.required<Todo>(); // parent sends this
  todoToggled = output<Todo>(); // parent will be listening to this

  // this will be used in the .html to react to events
  todoClicked() {
    this.todoToggled.emit(this.todo());
  }
}
