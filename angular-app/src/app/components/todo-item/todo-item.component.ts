import { Component, input } from '@angular/core';
import { Todo } from '../../models/todo.models';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'app-todo-item',
  imports: [NgStyle],
  templateUrl: './todo-item.component.html',
  styleUrl: './todo-item.component.scss',
})
export class TodoItemComponent {
  todo = input.required<Todo>();
}
