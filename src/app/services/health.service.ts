import { Injectable } from '@angular/core';
import { ConfigService } from './config.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Health } from '../models/health';

@Injectable({
  providedIn: 'root'
})
export class HealthService {

  constructor(private configService: ConfigService, private http: HttpClient) {}

  getHealth(): Observable<Health[]> {

    console.log('Calling: ' + this.configService.userInterfaceBaseUrl + '/api/healthMonitor for health data');

    return this.http.get<Health[]>(this.configService.userInterfaceBaseUrl + '/api/healthMonitor');
  }
}
