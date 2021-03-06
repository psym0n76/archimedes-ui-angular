import { ConfigService } from './../../services/config.service';
import { Health } from '../../models/health';
import { AppError } from '../../models/app-error';
import { HealthService } from '../../services/health.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';
import { MatTable } from '@angular/material/table';

@Component({
  selector: 'app-health-data-mat-table',
  templateUrl: './fetch-health-data-mat-table.component.html',
  styleUrls: ['./fetch-health-data-mat-table.component.css']
})
export class FetchHealthDataMatTableComponent implements OnInit {

  hubConnection: HubConnection;
  flashClass: any; // not working yet
  @ViewChild(MatTable) table: MatTable<any>;
  public dataSource: Health[];
  public displayedColumns: string[] = ['appName', 'url', 'version', 'status', 'lastUpdated'];

  constructor(private healthService: HealthService, private toastr: ToastrService,
              private handler: AppError, private configService: ConfigService) {}

  ngOnInit(): any {
    this.healthService
      .getHealth()
      .subscribe((response: Health[]) => {
        this.dataSource = response;
        this.toastr.success('Successfully uploaded data'); } , error => {this.handler.logError(error); });

    this.hubConnection = new HubConnectionBuilder().withUrl(this.configService.userInterfaceBaseUrl +  '/Hubs/Health').build();
    this.hubConnection
            .start()
            .then(() => this.toastr.success(this.configService.userInterfaceBaseUrl + '/Hubs/Health'))
            .catch(err => console.log('Error while establishing connection : ('));

    this.hubConnection.on('Add',
            (type: Health) => {
              this.dataSource.push(type);
            });

    this.hubConnection.onclose(() => {
      this.toastr.info('Reconnecting: ' + this.configService.userInterfaceBaseUrl +  '/Hubs/Health');
      setTimeout(function(): void{
              this.hubConnection.start(); }, 3000);
             });

    this.hubConnection.on('Update',
            (type: Health) => {
              const index = this.dataSource.findIndex(x => x.url === type.url);
              if (index > -1)
              {
                this.dataSource[index].appName = type.appName;
                this.dataSource[index].url = type.url;
                this.dataSource[index].version = type.version;
                this.dataSource[index].statusMessage = type.statusMessage;
                this.dataSource[index].lastUpdated = type.lastUpdated;
                this.table.renderRows();

                // this.flashClass = {background: 'green-flash'}; // nor working yet

              }
            });
        }
  }
