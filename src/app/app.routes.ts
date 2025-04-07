import { Routes } from '@angular/router';
import { HomeComponent } from './domains/home/home.component';

export const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'sign-in',
    loadComponent: () => import('./domains/auth/sign-in/sign-in.component'),
  },
];
