import { WeatherService } from './../../services/weather.service';
import { WeatherForecast } from './../../models/WeatherForecast';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-fetch-data',
  templateUrl: './fetch-data.component.html',
})
export class FetchDataComponent implements OnInit {
  public forecasts: WeatherForecast[];
  constructor(private weatherService: WeatherService, private toastr: ToastrService) {}

  ngOnInit(): any {
    this.weatherService
      .getWeatherForecast()
      .subscribe((response: WeatherForecast[]) => {
        this.forecasts = response;
        this.toastr.success('Successfully uploaded data'); }
      , error => {
          alert('An unexpected error has occurred');
          this.toastr.error(error);
    } );
  }
}
