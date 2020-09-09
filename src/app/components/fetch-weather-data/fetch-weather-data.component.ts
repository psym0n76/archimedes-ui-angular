import { AppError } from '../../models/app-error';
import { WeatherService } from '../../services/weather.service';
import { WeatherForecast } from '../../models/weather-forcast';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-fetch-weather-data',
  templateUrl: './fetch-weather-data.component.html',
})
export class FetchDataComponent implements OnInit {

  public forecasts: WeatherForecast[];
  
  constructor(private weatherService: WeatherService, private toastr: ToastrService, private handler: AppError) {}

  ngOnInit(): any {
    this.weatherService
      .getWeatherForecast()
      .subscribe((response: WeatherForecast[]) => {
        this.forecasts = response;
        this.toastr.success('Successfully uploaded data'); } , error => {this.handler.logError(error); });
  }
}
