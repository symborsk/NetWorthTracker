import { Pipe, PipeTransform } from '@angular/core';
import { CurrencyRate } from '../classes/currencyRate';

@Pipe({
  name: 'currencyConverterPipe',
  pure: false
})
export class CurrencyConverterPipePipe implements PipeTransform {

  transform(baseRate: number, rate: CurrencyRate) {

    if (!baseRate && baseRate !== 0) {
      return '---';
    }

    const calculatedCurrencyValue = baseRate * rate.RateVersusBase;

    switch (rate.CurrencyISO4217Code.toUpperCase()) {
      case 'CAD':
      case 'USD':
      case 'AUD':
      case 'MXN':
        return '$' + calculatedCurrencyValue.toFixed(2);
      case 'EUR':
        return '€' + calculatedCurrencyValue.toFixed(2);
      case 'GBP':
        return '£' + calculatedCurrencyValue.toFixed(2);
      case 'CNY':
        return '¥' + calculatedCurrencyValue.toFixed(2);
      default:
        return calculatedCurrencyValue.toFixed(2) + ' ' + rate.CurrencyISO4217Code.toUpperCase();
    }
  }

}
