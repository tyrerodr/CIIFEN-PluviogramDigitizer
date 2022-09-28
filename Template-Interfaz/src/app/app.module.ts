import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { PagesModule } from './pages/pages.module';
import { routing } from './app.routing';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CargarScriptsService } from './cargar-scripts.service';
import { AdminGuardService } from './pages/seguridad/admin.guard.service';
import { loginService } from './pages/login/login.service';
import { loginGuardService } from './pages/seguridad/login.guard.service';
import { DigitalizadorGuardService } from './pages/seguridad/digitalizador.guard.service';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    PagesModule,
    routing
  ],
  declarations: [
    AppComponent,
  ],
  providers: [
    CargarScriptsService,AdminGuardService,loginService,loginGuardService,DigitalizadorGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
