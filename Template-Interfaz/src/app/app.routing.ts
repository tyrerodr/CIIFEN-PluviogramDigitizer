import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from './pages/pages.component';

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: 'pages/database',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'pages/database'
  }
];

export const routing = RouterModule.forRoot(appRoutes);
