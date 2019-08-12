import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppSettingsService {
  private baseUrl: string;

  constructor(private http: HttpClient) {
    this.baseUrl = environment.baseUrl + '/AppSettings';
  }

  getAppSetting(settingName: string): Observable<any> {
    return this.http.get<any>(this.baseUrl + '/' + settingName);
  }
}
