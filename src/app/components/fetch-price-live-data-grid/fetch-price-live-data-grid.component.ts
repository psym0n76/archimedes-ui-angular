import { ConfigService } from './../../services/config.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { ToastrService } from 'ngx-toastr';
import { AppError } from 'src/app/models/app-error';
import { dateFormatter } from '../formatters/dateFormatters';
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';
import { Price } from 'src/app/models/price';

@Component({
  selector: 'app-fetch-price-live-data-grid',
  templateUrl: './fetch-price-live-data-grid.component.html',
  styleUrls: ['./fetch-price-live-data-grid.component.css']
})
export class FetchPriceLiveDataGridComponent implements OnInit {

  hubConnection: HubConnection;
  @ViewChild('agGrid') agGrid: AgGridAngular;
  defaultColDef: any = [];
  columnMarketDefs: any = [];
  rowPriceData: any = [] ;

  public price: Price[];
  frameworkComponents;

  constructor(private toastr: ToastrService, private handler: AppError, private configService: ConfigService) { }

  onGridReady(e): void{

    this.columnMarketDefs = [
      {headerName: 'Market', field: 'market' , width: 100},
      {headerName: 'BidHigh', field: 'bidHigh', width: 120},
      {headerName: 'AskHigh', field: 'askHigh', width: 120},
      {headerName: 'Updated', field: 'lastUpdated', valueFormatter: dateFormatter, width: 175}
  ];

    this.defaultColDef = {
      enableCellChangeFlash: true,
      sortable: true,
      filter: true
  };
  }

  ngOnInit(): void {

    this.hubConnection = new HubConnectionBuilder().withUrl(this.configService.userInterfaceBaseUrl +  '/hubs/price').build();
    this.hubConnection
            .start()
            .then(() => this.toastr.success(this.configService.userInterfaceBaseUrl + '/hubs/price'))
            .catch(err => console.log('Error while establishing connection : ('));

    this.hubConnection.onclose(() => {
      this.toastr.info('Reconnecting: ' + this.configService.userInterfaceBaseUrl +  '/hubs/price');
      setTimeout(function(): void{
              this.hubConnection.start(); }, 3000);
             });

    this.hubConnection.on('Update',
            (type: Price) => {
                this.agGrid.api.forEachNode((rowNode, index): any => {
                    console.log('Update receieved ' + type.timeStamp  + ' to replace ' + rowNode.data.lastUpdated);
                    rowNode.data.market = type.market;
                    rowNode.data.bidHigh = type.bidHigh;
                    rowNode.data.askHigh = type.askHigh;
                    rowNode.data.lastUpdated = type.timeStamp;
                    this.agGrid.api.refreshCells();
                });

           });
  }
}

