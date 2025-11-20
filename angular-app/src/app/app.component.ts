import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './example.component.html',
  // template: ` <h1>Hey</h1>`,
  // styleUrl: './app.component.scss',
  styles: [
    `
      * {
        background-color: red;
      }
    `,
  ],
})
export class AppComponent {
  title = 'angular-app';
}
