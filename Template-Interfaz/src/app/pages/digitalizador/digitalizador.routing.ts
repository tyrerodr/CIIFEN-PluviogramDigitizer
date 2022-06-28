import { Routes, RouterModule } from '@angular/router';
import { DigitalizadorComponent } from './digitalizador.component';

const childRoutes: Routes = [
    {
        path: '',
        component: DigitalizadorComponent
    }
];

export const routing = RouterModule.forChild(childRoutes);
