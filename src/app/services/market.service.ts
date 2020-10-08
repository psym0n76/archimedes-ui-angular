import { catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { ConfigService } from './config.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Market } from '../models/market';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MarketService {

  constructor(private configService: ConfigService, private http: HttpClient) {}

  getMarket(): Observable<Market[]> {

    console.log('Calling: ' + this.configService.userInterfaceBaseUrl + '/api/market for market data');

    return this.http.get<Market[]>(this.configService.userInterfaceBaseUrl + '/api/market');
  }

  getMarketDistinct(): Observable<string[]> {

    console.log('Calling: ' + this.configService.userInterfaceBaseUrl + '/api/market/bymarket_distinct for market data');
    return this.http.get<string[]>(this.configService.userInterfaceBaseUrl + '/api/market/bymarket_distinct');
  }

  getGranularityDistinct(): Observable<string[]> {

    console.log('Calling: ' + this.configService.userInterfaceBaseUrl + '/api/market/bymarket_distinct for market data');
    return this.http.get<string[]>(this.configService.userInterfaceBaseUrl + '/api/market/bygranularity_distinct');
  }

  updateMarket(market: Market): Observable<Market> {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };

    console.log('Calling: ' + this.configService.userInterfaceBaseUrl + '/api/market for ' + market.name);
    return this.http.put<Market>(this.configService.userInterfaceBaseUrl + '/api/market' , market, httpOptions);
  }
}
