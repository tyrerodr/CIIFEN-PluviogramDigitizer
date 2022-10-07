import { Routes, RouterModule } from '@angular/router';
import { PluviogramComponent } from './pluviogram.component';

const childRoutes: Routes = [
    {
        path: '',
        component: PluviogramComponent
    }
];

export const routing = RouterModule.forChild(childRoutes);
