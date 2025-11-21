import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  template: `
    <app-header />
    <main>
      <router-outlet />
      <app-footer />
    </main>
  `,
  styles: [
    `
      main {
        padding-inline: 16px;
      }
    `,
  ],
})
export class AppComponent {
  title = 'angular-app';
}
