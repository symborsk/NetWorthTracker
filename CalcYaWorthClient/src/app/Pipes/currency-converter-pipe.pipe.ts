import { Pipe, PipeTransform } from '@angular/core';
import { CurrencyRate } from '../classes/currencyRate';

@Pipe({
  name: 'currencyConverterPipe',
  pure: true
})
export class CurrencyConverterPipePipe implements PipeTransform {

  transform(baseRate: number, rate: CurrencyRate) {
    switch (rate.CurrencyISO4217Code.toUpperCase()) {
      case 'CDN':
      case 'USD':
      case 'AUD':
      case 'MXN':
        return '$' + baseRate * rate.RateVersusBase;
      case 'EUR':
        return '€' + baseRate * rate.RateVersusBase;
      case 'GBP':
        return '£' + baseRate * rate.RateVersusBase;
      case 'CNY':
        return '¥' + baseRate * rate.RateVersusBase;
      default:
        return baseRate * rate.RateVersusBase + ' ' + rate.CurrencyISO4217Code.toUpperCase();
    }
  }

}
