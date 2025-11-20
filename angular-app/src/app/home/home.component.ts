import { Component, signal } from '@angular/core';
import { GreetingComponent } from '../components/greeting/greeting.component';

@Component({
  selector: 'app-home',
  imports: [GreetingComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  // this will be passed from parent to child (home -> greeting)
  message = signal('Hello world!');
  number = signal(10);
  object = signal({ name: 'Mateus', lastName: 'Strappazzon' });
  isMarried = signal(true);
}
