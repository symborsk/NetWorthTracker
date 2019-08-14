import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule} from '@angular/common/http';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

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
    MDBBootstrapModule.forRoot(),
    HttpClientModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    AppRoutingModule,
    UiModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
