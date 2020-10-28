import { Injectable } from '@angular/core';
import { ConfigService } from './config.service';
import { HttpClient } from '@angular/common/http';
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
}
