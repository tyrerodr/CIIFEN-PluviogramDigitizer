import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { routing } from './database.routing';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';

/*DatabaseComponent*/ 
import { DatabaseComponent } from './database.component';
import { StationComponent } from '../station/station.component';
// import { Levels2Component } from './components/levels-2/levels-2.component';
// import { Levels1Component } from './components/levels-1/levels-1.component';

@NgModule({
    imports: [
        CommonModule,
        NgxPaginationModule,
        SharedModule,
        FormsModule,
        ReactiveFormsModule,
        routing
    ],
    declarations: [
        DatabaseComponent,
        // StationComponent
        // Levels2Component,
        // Levels1Component
    ]
})
export class DatabaseModule { }
