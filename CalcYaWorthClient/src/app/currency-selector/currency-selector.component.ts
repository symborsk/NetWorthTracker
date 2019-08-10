import { Component, OnInit, Input, EventEmitter, Output, AfterViewChecked } from '@angular/core';
import { CurrencyRate } from '../classes/currencyRate';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-currency-selector',
  templateUrl: './currency-selector.component.html',
  styleUrls: ['./currency-selector.component.css']
})
export class CurrencySelectorComponent {

  @Input()
  rates: Array<CurrencyRate>;

  @Input()
  selectedCurrencyString: string;

  @Output()
  rateChanged: EventEmitter<CurrencyRate> = new EventEmitter<CurrencyRate>();

  constructor() { }

  currencyType_change(isoCurrencry: string) {
    this.rateChanged.emit(this.rates.find(x => x.CurrencyISO4217Code === isoCurrencry));
  }
}
