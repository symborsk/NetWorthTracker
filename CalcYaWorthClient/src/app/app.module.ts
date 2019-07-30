import { BrowserModule } from '@angular/platform-browser';
import { MatButtonToggleModule  } from '@angular/material';
import { NgbPaginationModule, NgbAlertModule, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UiModule } from './ui/ui.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    NgbPaginationModule,
    MDBBootstrapModule.forRoot(),
    NgbAlertModule,
    NgbDropdownModule,
    MatButtonToggleModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    UiModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
