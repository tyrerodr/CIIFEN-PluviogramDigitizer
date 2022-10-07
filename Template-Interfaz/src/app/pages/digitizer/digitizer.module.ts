import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { routing } from './digitizer.routing';
import { SharedModule } from '../../shared/shared.module';
import { DigitizerComponent } from './digitizer.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule,
        routing
    ],
    declarations:  [
        DigitizerComponent
    ]
})
export class DigitizerModule { }
