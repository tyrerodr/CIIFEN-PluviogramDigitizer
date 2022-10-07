import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';

const childRoutes: Routes = [
    {
        path: '',
        component: AdminComponent
    }
];

export const routing = RouterModule.forChild(childRoutes);
