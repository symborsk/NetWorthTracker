import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { CurrencyRate } from '../classes/currencyRate';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-currency-selector',
  templateUrl: './currency-selector.component.html',
  styleUrls: ['./currency-selector.component.css']
})
export class CurrencySelectorComponent implements OnInit {

  @Input()
  rates: Array<CurrencyRate>;

  @Input()
  selectedCurrency: CurrencyRate;

  @Output()
  rateChanged: EventEmitter<CurrencyRate> = new EventEmitter<CurrencyRate>();


  defaultSelected: string;
  // currencyForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    // this.currencyForm = new FormGroup({
    //   'CurrencyControl' : new FormControl(this.rates[1])
    // });
    this.defaultSelected = this.rates[1].CurrencyISO4217Code;
  }

}
