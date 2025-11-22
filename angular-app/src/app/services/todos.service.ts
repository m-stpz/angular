import { Injectable } from '@angular/core';
import { Todo } from '../models/todo.models';

@Injectable({
  providedIn: 'root',
})
export class TodosService {
  todos: Todo[] = [
    {
      userId: 1,
      id: 1,
      title: 'Learn Angular basics',
      completed: false,
    },
    {
      userId: 1,
      id: 2,
      title: 'Build a header component',
      completed: true,
    },
    {
      userId: 2,
      id: 3,
      title: 'Study Observables and RxJS',
      completed: false,
    },
    {
      userId: 2,
      id: 4,
      title: 'Refactor user service',
      completed: false,
    },
    {
      userId: 3,
      id: 5,
      title: 'Implement navigation links',
      completed: true,
    },
  ];

  constructor() {}
}
