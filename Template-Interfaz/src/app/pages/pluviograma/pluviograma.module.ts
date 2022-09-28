import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { routing } from './pluviograma.routing';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination'

/*pluviogramaComponent*/ 
import { PluviogramaComponent } from './pluviograma.component';
import { HighchartsChartModule } from 'highcharts-angular';



@NgModule({
    imports: [
        CommonModule,
        NgxPaginationModule,
        SharedModule,
        FormsModule,
        ReactiveFormsModule,
        routing,
        HighchartsChartModule
    ],
    declarations: [
        PluviogramaComponent
    ]
})
export class PluviogramaModule { }