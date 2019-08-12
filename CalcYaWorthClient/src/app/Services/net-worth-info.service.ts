import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Asset, Liability } from '../classes/NetWorthInfo';

@Injectable({
  providedIn: 'root'
})
export class NetWorthInfoService {
  private baseUrl: string;

  constructor(private http: HttpClient) {
    this.baseUrl = environment.baseUrl + '/NetWorthInfo';
  }

  getNetWorthInfo(userId: number): Observable<any> {
    return this.http.get<any>(this.baseUrl + '/' + userId);
  }

  postAsset(asset: Asset): Observable<number> {
    return this.http.post<number>(this.baseUrl + '/Asset', asset);
  }

  postLiability(liability: Liability): Observable<number> {
    return this.http.post<number>(this.baseUrl + '/Liability', liability);
  }

  updateAsset(asset: Asset): Observable<number> {
    return this.http.put<number>(this.baseUrl + '/Asset', asset);
  }

  updateLiability(liability: Liability): Observable<number> {
    return this.http.put<number>(this.baseUrl + '/Liability', liability);
  }

  deleteAsset(identifier: number): Observable<any> {
    return this.http.delete<any>(this.baseUrl + '/Asset/' + identifier);
  }

  deleteLiability(identifier: number): Observable<any> {
    return this.http.delete<any>(this.baseUrl + '/Liability/' + identifier);
  }
}
