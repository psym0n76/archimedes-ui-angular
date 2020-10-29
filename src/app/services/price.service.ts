import { MarketSubscriber } from './../models/market-subscriber';
import { Market } from 'src/app/models/market';
import { Injectable } from '@angular/core';
import { ConfigService } from './config.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Price } from '../models/price';

@Injectable({
  providedIn: 'root'
})
export class PriceService {

  constructor(private configService: ConfigService, private http: HttpClient) {}

  getFirstPrice(): Observable<Price[]> {

    console.log('Calling: ' + this.configService.userInterfaceBaseUrl + '/api/price/bymarket_distinct');

    return this.http.get<Price[]>(this.configService.userInterfaceBaseUrl + '/api/price/bymarket_distinct');
  }

  addPriceSubscriber(market: MarketSubscriber): Observable<MarketSubscriber> {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };

    console.log('Calling: ' + this.configService.userInterfaceBaseUrl + '/api/price/subscribe for ' + market.name);
    return this.http.put<MarketSubscriber>(this.configService.userInterfaceBaseUrl + '/api/price/subscribe' ,
             JSON.stringify(market), httpOptions);
  }
}
