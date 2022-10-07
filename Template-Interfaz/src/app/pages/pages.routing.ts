import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from './pages.component';
import { LoginComponent } from './login/login.component';
import { AdminGuardService } from './security/admin.guard.service';
import { loginGuardService } from './security/login.guard.service';
import { DigitizerGuardService } from './security/digitizer.guard.service';

export const childRoutes: Routes = [
    {
        path: 'login',
        component: LoginComponent,
    },
    {
        path: 'pages',
        component: PagesComponent,
        children: [
            { path: '', redirectTo: 'database', pathMatch: 'full', canActivate: [loginGuardService] },
            { path: 'database/station/pluviogram/:id', loadChildren: './pluviogram/pluviogram.module#PluviogramModule' },
            { path: 'database', loadChildren: './database/database.module#DatabaseModule', canActivate: [loginGuardService] },
            { path: 'database/station/:id', loadChildren: './station/station.module#StationModule', canActivate: [loginGuardService] },
            { path: 'admin', loadChildren: './admin/admin.module#AdminModule', canActivate: [AdminGuardService] },
            { path: 'digitizer', loadChildren: './digitizer/digitizer.module#DigitizerModule',canActivate: [DigitizerGuardService] },
        ]
    }
];

export const routing = RouterModule.forChild(childRoutes);
