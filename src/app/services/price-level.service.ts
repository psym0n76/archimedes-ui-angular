import { PriceLevel } from './../models/price-level';
import { Injectable } from '@angular/core';
import { ConfigService } from './config.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PriceLevelService {

  constructor(private configService: ConfigService, private http: HttpClient) {}

  getPriceLevel(): Observable<PriceLevel[]> {

    console.log('Calling: ' + this.configService.userInterfaceBaseUrl + '/api/price-level for price data');

    return this.http.get<PriceLevel[]>(this.configService.userInterfaceBaseUrl + '/api/price-level');
  }
}
