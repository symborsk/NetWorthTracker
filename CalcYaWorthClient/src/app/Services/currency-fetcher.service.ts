import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CurrencyFetcherService {
  private baseUrl: string;

  constructor(private http: HttpClient) {
    this.baseUrl = environment.baseUrl + '/CurrencyRates';
   }

  fetchAllCurrencies(currency: string): Observable<any> {
      return this.http.get<any>(this.baseUrl + '/' + currency);
  }
}
