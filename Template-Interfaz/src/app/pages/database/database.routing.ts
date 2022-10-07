import { Routes, RouterModule } from '@angular/router';
import { DatabaseComponent } from './database.component';

const childRoutes: Routes = [
    {
        path: '',
        component: DatabaseComponent
    }
];

export const routing = RouterModule.forChild(childRoutes);
