import { WeatherService } from './../../services/weather.service';
import { WeatherForecast } from './../../models/WeatherForecast';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-fetch-data',
  templateUrl: './fetch-data.component.html',
})
export class FetchDataComponent implements OnInit {
  public forecasts: WeatherForecast[];
  constructor(private weatherService: WeatherService) {}

  ngOnInit(): any {
    this.weatherService
      .getWeatherForecast()
      .subscribe((response: WeatherForecast[]) => {
        this.forecasts = response;
      });
  }
}
