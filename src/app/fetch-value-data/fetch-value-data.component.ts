import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';
import { ConfigurationService } from '../services/configuration.service';
import { AppConfigService } from '../services/appConfigService';

@Component({
  selector: 'app-value',
  templateUrl: './fetch-value-data.component.html'
})
export class FetchValueDataComponent implements OnInit  {

  valueForecasts: string[] = [];
  hubConnection: HubConnection;
  userInterfaceBaseUrl: string;

  constructor(private appConfigService: AppConfigService,
              http: HttpClient)
  {
    console.log('Initial load of data -  fetch-data-value');
    http.get<string[]>(appConfigService.userInterfaceBaseUrl + '/Values')
    .subscribe(result => { this.valueForecasts = result; }, error => console.error(error));
    this.userInterfaceBaseUrl = appConfigService.userInterfaceBaseUrl;

  }

  ngOnInit(): void {

    console.log(this.userInterfaceBaseUrl);

    this.hubConnection = new HubConnectionBuilder().withUrl(this.userInterfaceBaseUrl + '/Hubs/Values').build();
    this.hubConnection
      .start()
      .then(() => console.log('Connection started..' + this.userInterfaceBaseUrl + '/Hubs/Values'))
      .catch(err => console.log('Error while establishing connection : ('));

    this.hubConnection.on('Add',
      (type: string) => {

        this.valueForecasts.push(type);
        console.log('Message Received');
        console.log(type);
      });
  }
}
