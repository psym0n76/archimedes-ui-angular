import { Injectable } from '@angular/core';
import { ConfigService } from './config.service';
import { HttpClient } from '@angular/common/http';
import { WeatherForecast } from '../models/WeatherForecast';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private configService: ConfigService, private http: HttpClient) {}

  getWeatherForecast(): any {

    console.log('Calling: ' + this.configService.userInterfaceBaseUrl + ' for weather forecast');

    return this.http.get<WeatherForecast[]>(this.configService.userInterfaceBaseUrl + '/weatherforecast');
  }
}
