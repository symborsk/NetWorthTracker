import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl: string;

  constructor(private http: HttpClient) {
    this.baseUrl = environment.baseUrl + '/Users';
  }

  getUserCurrency(userId: number): Observable<string> {
    return this.http.get<string>(this.baseUrl + '/' + userId);
  }

}
