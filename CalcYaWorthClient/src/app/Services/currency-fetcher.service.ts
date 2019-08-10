import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CurrencyFetcherService {
  // Our base free to use key for fixer currency exchange
  private apiPath = 'http://data.fixer.io/api/latest?access_key=f0cd751a08b8ab6321e43594faf56d0d';

  constructor(private http: HttpClient) { }



  fetchAllCurrencies(base: string): Observable<any> {
      return this.http.get<any>(this.apiPath + '&base=' + base);
  
  }

  GetAllRatesSupported(): Array<string> {
    const returnMock = ['CDN', 'EUR', 'USD', 'AUD'];
    return returnMock;
  }
}
