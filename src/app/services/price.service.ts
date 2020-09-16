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

  getPrice(): Observable<Price[]> {

    console.log('Calling: ' + this.configService.userInterfaceBaseUrl + '/api/price for price data');

    return this.http.get<Price[]>(this.configService.userInterfaceBaseUrl + '/api/price');
  }
}
