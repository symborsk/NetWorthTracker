import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppSettingsService } from './app-settings.service';

@Injectable({
  providedIn: 'root'
})
export class CurrencyFetcherService {
  // Our base free to use key for fixer currency exchange
  private apiPath: string;

  constructor(private http: HttpClient, private settingService: AppSettingsService) {
      this.settingService.getAppSetting('CurrencyApiUrl')
      .subscribe(
        response => {
            this.apiPath = response;
        }, error => console.log(error)
      );
   }

  fetchAllCurrencies(base: string): Observable<any> {
      return this.http.get<any>(this.apiPath + '&base=' + base);
  }
}
