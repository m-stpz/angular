import { Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    // loadComponent provides lazy-loading
    loadComponent: () =>
      import('./home/home.component').then((m) => m.HomeComponent),
    // while
    // component: HomeComponent doesn't
  },
  {
    path: 'about',
    pathMatch: 'full',
    loadComponent: () =>
      import('./about/about.component').then((m) => m.AboutComponent),
  },
  {
    path: 'contact',
    pathMatch: 'full',
    loadComponent: () =>
      import('./contact/contact.component').then((m) => m.ContactComponent),
  },
];
