import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { User } from '../classes/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl: string;

  constructor(private http: HttpClient) {
    this.baseUrl = environment.baseUrl + '/Users';
  }

  getUserInfo(userId: number): Observable<User> {
    return this.http.get<User>(this.baseUrl + '/' + userId);
  }

  updateUserCurrency(userId: number, currencyIso: string): Observable<any> {
    return this.http.put<any>(this.baseUrl + '/Currency/' + userId + '/' + currencyIso, null);
  }
}
