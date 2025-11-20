import { Component, input } from '@angular/core';

@Component({
  selector: 'app-greeting',
  imports: [],
  templateUrl: './greeting.component.html',
  styleUrl: './greeting.component.scss',
})
export class GreetingComponent {
  // I'm passing the information from the parent, but the child needs to accept it
  message = input('Default message'); // receive smth from outside
  number = input();
  object = input();
  isMarried = input();
}
