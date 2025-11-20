import { Component, Input, input } from '@angular/core';
import { User } from '../../user.models';

@Component({
  selector: 'app-greeting',
  imports: [],
  templateUrl: './greeting.component.html',
  styleUrl: './greeting.component.scss',
})
export class GreetingComponent {
  // I'm passing the information from the parent, but the child needs to accept it
  @Input() childMessage!: string; // receive smth from outside
  @Input() number!: number;
  @Input() personObject!: User;
  @Input() skills!: string[];
}
