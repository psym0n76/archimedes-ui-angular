import { Market } from './../../models/market';
import { AppError } from './../../models/app-error';
import { ToastrService } from 'ngx-toastr';
import { ValuesService } from './../../services/values.service';
import { ConfigService } from './../../services/config.service';
import { Component, OnInit } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';

@Component({
  selector: 'app-value',
  templateUrl: './fetch-value-data.component.html'
})
export class FetchValueDataComponent implements OnInit  {

  markets: Market[] = [];
  hubConnection: HubConnection;

  constructor(private configService: ConfigService, private service: ValuesService,
              private toastr: ToastrService, private handler: AppError){}

ngOnInit(): void {

  this.service.getValues().subscribe((result: Market[]) => {
    this.markets = result;
    this.toastr.success('Successfully uploaded data'); }, error => {this.handler.logError(error); });

  console.log('Calling: ' + this.configService.userInterfaceBaseUrl + ' for Hubs/Values');

  this.hubConnection = new HubConnectionBuilder().withUrl(this.configService.userInterfaceBaseUrl + '/Hubs/Values').build();
  this.hubConnection
      .start()
      .then(() => this.toastr.success('Connection started on ' + this.configService.userInterfaceBaseUrl + '/Hubs/Values'))
      .catch(err => console.log('Error while establishing connection : ('));

  this.hubConnection.on('Add',
      (type: Market) => {
        this.markets.push(type);
        this.toastr.success('Message Received [' + type  + '] from ' + this.configService.userInterfaceBaseUrl);
      });
  }
}
