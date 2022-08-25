import { Routes, RouterModule } from '@angular/router';
import { PluviogramaComponent } from './pluviograma.component';

const childRoutes: Routes = [
    {
        path: '',
        component: PluviogramaComponent
    }
];

export const routing = RouterModule.forChild(childRoutes);
