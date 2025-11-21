import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  // common module is needed for the structural directives
  // *ngFor, for instance
  imports: [RouterLink, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  // using signals
  title = signal('My First Angular');
  author = signal('Mateus Strappazzon');

  // without signals (traditional way)
  date = '20.11.2025';

  links = [
    { label: 'Home', path: '' },
    { label: 'Contact', path: 'contact' },
    { label: 'About', path: 'about' },
  ];
}
