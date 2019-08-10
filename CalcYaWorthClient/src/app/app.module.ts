import { BrowserModule } from '@angular/platform-browser';
import { MatButtonToggleModule  } from '@angular/material';
import { NgbPaginationModule, NgbAlertModule, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UiSwitchModule } from 'ngx-toggle-switch';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UiModule } from './ui/ui.module';
import { CurrencySelectorComponent } from './currency-selector/currency-selector.component';
import { CurrencyConverterPipePipe } from './Pipes/currency-converter-pipe.pipe';
import { DateTimestampPipe } from './Pipes/date-timestamp.pipe';

@NgModule({
  declarations: [
    AppComponent,
    CurrencySelectorComponent,
    CurrencyConverterPipePipe,
    DateTimestampPipe
  ],
  imports: [
    NgbPaginationModule,
    MDBBootstrapModule.forRoot(),
    NgbAlertModule,
    NgbDropdownModule,
    MatButtonToggleModule,
    HttpClientModule,
    BrowserModule,
    UiSwitchModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    UiModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
