import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { routing } from './admin.routing';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { AdminComponent } from './admin.component';

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
        AdminComponent
    ]
})
export class AdminModule { }
