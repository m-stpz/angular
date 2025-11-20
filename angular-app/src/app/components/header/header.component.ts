import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  // using signals
  title = signal('My First Angular');
  author = signal('Mateus Strappazzon');

  // without signals (traditional way)
  date = '20.11.2025';
}
