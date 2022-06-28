import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { routing } from './digitalizador.routing';
import { SharedModule } from '../../shared/shared.module';
import { DigitalizadorComponent } from './digitalizador.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule,
        routing
    ],
    declarations:  [
        DigitalizadorComponent
    ]
})
export class DigitalizadorModule { }
