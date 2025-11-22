import { inject, Injectable } from '@angular/core';
import { Todo } from '../models/todo.models';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TodosService {
  // instead of harcoding, let's grab from the api
  http = inject(HttpClient);

  // instead of grabbing it directly, expose through a getter
  getTodos() {
    const url = 'https://jsonplaceholder.typicode.com/todos';
    return this.http.get<Todo[]>(url);
  }
}
