import { ToastrService } from 'ngx-toastr';
import { ValuesService } from './../../services/values.service';
import { ConfigService } from './../../services/config.service';
import { Component, Inject, OnInit } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';


@Component({
  selector: 'app-value',
  templateUrl: './fetch-value-data.component.html'
})
export class FetchValueDataComponent implements OnInit  {

  valueForecasts: string[] = [];
  hubConnection: HubConnection;

  constructor(private configService: ConfigService, private service: ValuesService, private toastr: ToastrService){}

initialLoad(): void {

    console.log('Initial load of fetch-data-value');
    this.service.getValues()
      .subscribe((result: string[]) => {
        this.valueForecasts = result;
        this.toastr.success('Successfully uploaded data');
       }, (error: string) => {
        this.toastr.error(error) ; });
}

  ngOnInit(): void {

    this.initialLoad();

    console.log('Calling: ' + this.configService.userInterfaceBaseUrl + ' for Hubs/Values');

    this.hubConnection = new HubConnectionBuilder().withUrl(this.configService.userInterfaceBaseUrl + '/Hubs/Values').build();
    this.hubConnection
      .start()
      .then(() => this.toastr.success('Connection started on ' + this.configService.userInterfaceBaseUrl + '/Hubs/Values'))
      .catch(err => console.log('Error while establishing connection : ('));

    this.hubConnection.on('Add',
      (type: string) => {
        this.valueForecasts.push(type);
        this.toastr.success('Message Received [' + type  + '] from ' + this.configService.userInterfaceBaseUrl);
      });
  }
}
