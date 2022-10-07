import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { PagesModule } from './pages/pages.module';
import { routing } from './app.routing';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { UploadScriptsService } from './upload-scripts.service';
import { AdminGuardService } from './pages/security/admin.guard.service';
import { loginService } from './pages/login/login.service';
import { loginGuardService } from './pages/security/login.guard.service';
import { DigitizerComponent } from './pages/digitizer/digitizer.component';
import { DigitizerGuardService } from './pages/security/digitizer.guard.service';


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
    UploadScriptsService,AdminGuardService,loginService,loginGuardService,DigitizerGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
