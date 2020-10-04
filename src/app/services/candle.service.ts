import { OHLC } from './../models/ohlc';
import { Injectable } from '@angular/core';
import { ConfigService } from './config.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Candle } from '../models/candle';

@Injectable({
  providedIn: 'root'
})
export class CandleService {

  constructor(private configService: ConfigService, private http: HttpClient) {}

  getCandle(): Observable<Candle[]> {

    console.log('Calling: ' + this.configService.userInterfaceBaseUrl + '/api/candle for candle data');

    return this.http.get<Candle[]>(this.configService.userInterfaceBaseUrl + '/api/candle');
  }

  async getCandleOhlc(): Promise<OHLC[]>{

    const data: OHLC[] = [];
    const candles = await this.http.get <Candle[]>(this.configService.userInterfaceBaseUrl + '/api/candle').toPromise();

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
