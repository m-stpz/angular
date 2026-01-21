import { Component } from '@angular/core';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-header',
  imports: [ButtonComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  title = 'tasks-project';

  parentFunc() {
    console.log('hey');
  }

  parentFuncTwo() {
    console.log(`Working on ${this.title}`);
  }
}
