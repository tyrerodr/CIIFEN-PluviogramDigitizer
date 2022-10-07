import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { routing } from './database.routing';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';

/*DatabaseComponent*/ 
import { DatabaseComponent } from './database.component';


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
    ]
})
export class DatabaseModule { }
