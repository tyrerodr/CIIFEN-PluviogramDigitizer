import { Routes, RouterModule } from '@angular/router';
import { StationComponent } from './station.component';

const childRoutes: Routes = [
    {
        path: '',
        component: StationComponent
    }
];

export const routing = RouterModule.forChild(childRoutes);