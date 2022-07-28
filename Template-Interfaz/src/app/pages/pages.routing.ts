import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from './pages.component';
import { LoginComponent } from './login/login.component';
import { AdminGuardService } from './admin.guard.service';
import { loginGuardService } from './login.guard.service';
import { DigitalizadorGuardService } from './digitalizador.guard.service';

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
            //{ path: 'index', loadChildren: './index/index.module#IndexModule' },
            //{ path: 'editor', loadChildren: './editor/editor.module#EditorModule' },
            { path: 'database', loadChildren: './database/database.module#DatabaseModule', canActivate: [loginGuardService] },
            { path: 'admin', loadChildren: './profile/profile.module#ProfileModule', canActivate: [AdminGuardService] },
            { path: 'form', loadChildren: './form/form.module#FormModule' },
            //{ path: 'charts', loadChildren: './charts/charts.module#ChartsModule' },
            //{ path: 'ui', loadChildren: './ui/ui.module#UIModule' },
            //{ path: 'table', loadChildren: './table/table.module#TableModule' },
            //{ path: 'menu-levels', loadChildren: './menu-levels/menu-levels.module#MenuLevelsModule' },
            { path: 'digitalizador', loadChildren: './digitalizador/digitalizador.module#DigitalizadorModule',canActivate: [DigitalizadorGuardService] },
        ]
    }
];

export const routing = RouterModule.forChild(childRoutes);
