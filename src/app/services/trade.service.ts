import { Injectable } from '@angular/core';
import { ConfigService } from './config.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Trade } from '../models/trade';

@Injectable({
  providedIn: 'root'
})
export class TradeService {

  constructor(private configService: ConfigService, private http: HttpClient) {}

  getTrade(): Observable<Trade[]> {

    console.log('Calling: ' + this.configService.userInterfaceBaseUrl + '/api/trade for price data');

    return this.http.get<Trade[]>(this.configService.userInterfaceBaseUrl + '/api/trade');
  }
}
