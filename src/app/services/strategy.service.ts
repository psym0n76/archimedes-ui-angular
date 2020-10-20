import { Strategy } from './../models/strategy';
import { Injectable } from '@angular/core';
import { ConfigService } from './config.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StrategyService {

  constructor(private configService: ConfigService, private http: HttpClient) {}

  getStrategy(): Observable<Strategy[]> {

    console.log('Calling: ' + this.configService.userInterfaceBaseUrl + '/api/strategy for price data');

    return this.http.get<Strategy[]>(this.configService.userInterfaceBaseUrl + '/api/strategy');
  }
}
