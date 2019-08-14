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

    if (rate) {
      const calculatedCurrencyValue = baseRate * rate.RateVersusBase;

      switch (rate.CurrencyISO4217Code.toUpperCase()) {
        case 'CAD':
        case 'USD':
        case 'AUD':
        case 'MXN':
          return '$' + calculatedCurrencyValue.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        case 'EUR':
          return '€' + calculatedCurrencyValue.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        case 'GBP':
          return '£' + calculatedCurrencyValue.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        case 'CNY':
          return '¥' + calculatedCurrencyValue.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        default:
          return calculatedCurrencyValue.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
             + ' ' + rate.CurrencyISO4217Code.toUpperCase();
      }
    }
  }

}
