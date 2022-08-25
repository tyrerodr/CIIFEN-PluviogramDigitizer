import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { routing } from './pluviograma.routing';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination'

/*pluviogramaComponent*/ 
import { PluviogramaComponent } from './pluviograma.component';
import { NgxEchartsModule } from 'ngx-echarts';



@NgModule({
    imports: [
        CommonModule,
        NgxPaginationModule,
        SharedModule,
        FormsModule,
        ReactiveFormsModule,
        routing,
        NgxEchartsModule
    ],
    declarations: [
        PluviogramaComponent
    ]
})
export class PluviogramaModule { }