import { Injectable } from '@angular/core';
import { ConfigService } from './config.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Market } from '../models/market';

@Injectable({
  providedIn: 'root'
})
export class MarketService {

  constructor(private configService: ConfigService, private http: HttpClient) {}

  getMarket(): Observable<Market[]> {

    console.log('Calling: ' + this.configService.userInterfaceBaseUrl + '/api/market for market data');

    return this.http.get<Market[]>(this.configService.userInterfaceBaseUrl + '/api/market');
  }
}
