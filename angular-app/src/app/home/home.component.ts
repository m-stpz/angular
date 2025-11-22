import { Component, signal } from '@angular/core';
import { GreetingComponent } from '../components/greeting/greeting.component';
import { User } from '../models/user.models';
import { CounterComponent } from '../components/counter/counter.component';
import { TodosComponent } from '../todos/todos.component';

@Component({
  selector: 'app-home',
  imports: [GreetingComponent, CounterComponent, TodosComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  // this will be passed from parent to child (home -> greeting)
  message = 'Hello';
  number = 42;
  person: User = {
    name: 'Mateus',
    age: 29,
    isMarried: true,
  };
  skills = ['Software', 'Analytical Thinking', 'Communication'];

  handleClick() {
    alert('hey');
  }

  handleType(e: KeyboardEvent) {
    console.log(e.key);
  }
}
