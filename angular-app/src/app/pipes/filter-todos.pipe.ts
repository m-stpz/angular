import { Pipe, PipeTransform } from '@angular/core';
import { Todo } from '../models/todo.models';

@Pipe({
  name: 'filterTodos',
})
export class FilterTodosPipe implements PipeTransform {
  transform(todos: Todo[], searchTerm: string): Todo[] {
    if (!searchTerm) {
      return todos;
    }

    return todos.filter((todo) =>
      todo.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }
}
