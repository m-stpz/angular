import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  imports: [],
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
