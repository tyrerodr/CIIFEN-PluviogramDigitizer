import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { routing } from './station.routing';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { StationComponent } from './station.component';



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
        StationComponent
    ]
})
export class StationModule { }
