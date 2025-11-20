import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HomeComponent, HeaderComponent, FooterComponent],
  template: `
    <app-header />
    <app-home />
    <app-footer />
  `,
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
