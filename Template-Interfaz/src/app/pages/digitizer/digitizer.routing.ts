import { Routes, RouterModule } from '@angular/router';
import { DigitizerComponent } from './digitizer.component';

const childRoutes: Routes = [
    {
        path: '',
        component: DigitizerComponent
    }
];

export const routing = RouterModule.forChild(childRoutes);
