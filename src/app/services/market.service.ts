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

  getMarketDistinct(): Observable<string[]> {

    console.log('Calling: ' + this.configService.userInterfaceBaseUrl + '/api/market/bymarket_distinct for market data');
    return this.http.get<string[]>(this.configService.userInterfaceBaseUrl + '/api/market/bymarket_distinct');
  }

  getGranularityDistinct(): Observable<string[]> {

    console.log('Calling: ' + this.configService.userInterfaceBaseUrl + '/api/market/bymarket_distinct for market data');
    return this.http.get<string[]>(this.configService.userInterfaceBaseUrl + '/api/market/bygranularity_distinct');
  }

  updateMarket(market: Market): void {
    console.log('Calling: ' + this.configService.userInterfaceBaseUrl + '/api/market/update_market for ' + market.name);
    this.http.put(this.configService.userInterfaceBaseUrl + '/api/market' , market);
  }
}
