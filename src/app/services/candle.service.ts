import { Injectable } from '@angular/core';
import { ConfigService } from './config.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Candle } from '../models/candle';
import { OHLC } from '../models/ohlc';

@Injectable({
  providedIn: 'root'
})
export class CandleService {

  constructor(private configService: ConfigService, private http: HttpClient) {}

  getCandle(): Observable<Candle[]> {

    console.log('Calling: ' + this.configService.userInterfaceBaseUrl + '/api/candle for candle data');

    return this.http.get<Candle[]>(this.configService.userInterfaceBaseUrl + '/api/candle');
  }

  getCandlePage(page: number, pageSize: number): Observable<Candle[]> {

    console.log('Calling: ' + this.configService.userInterfaceBaseUrl + '/api/candle/bypage?page=' + page + '&size=' + pageSize + ' for candle data');

    return this.http.get<Candle[]>(this.configService.userInterfaceBaseUrl + '/api/candle/bypage?page=' + page + '&size=' + pageSize);
  }

getCandleByMarketByGranularity(market: string, granularity: string): Observable<Candle[]>{

    return  this.http.get <Candle[]>(this.configService.userInterfaceBaseUrl +
      '/api/candle/bymarket_bygranularity?market=' + market + '&granularity=' + granularity);
}

async getCandleOhlc(market: string, granularity: string): Promise<OHLC[]>{

  const data: OHLC[] = [];
  const candles = await this.http.get <Candle[]>(this.configService.userInterfaceBaseUrl +
     '/api/candle/bymarket_bygranularity?market=' + market + '&granularity=' + granularity).toPromise();

  candles.forEach(item => {
    const dataItem = {} as OHLC;
    dataItem.close = item.bidClose;
    dataItem.high = item.bidHigh;
    dataItem.low = item.bidLow;
    dataItem.open = item.bidOpen;
    dataItem.x = new Date(item.timeStamp).valueOf();
    data.push(dataItem);
  });
  return data;
}



}
