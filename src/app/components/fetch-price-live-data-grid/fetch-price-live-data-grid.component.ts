import { PriceService } from 'src/app/services/price.service';
import { ConfigService } from './../../services/config.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { ToastrService } from 'ngx-toastr';
import { AppError } from 'src/app/models/app-error';
import { dateFormatter } from '../formatters/dateFormatters';
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';
import { Price } from 'src/app/models/price';
import { numberFormatter } from '../formatters/numberFormatter';

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

  constructor(private toastr: ToastrService, private handler: AppError, private configService: ConfigService,
              private priceService: PriceService) { }

  onGridReady(e): void{

    this.columnMarketDefs = [
      {headerName: 'Market', field: 'market' , width: 100},
      {headerName: 'BidHigh', field: 'bidHigh', width: 120, enableCellChangeFlash: true},
      {headerName: 'AskHigh', field: 'askHigh', width: 120, enableCellChangeFlash: true},
      {headerName: 'Updated', field: 'lastUpdated', valueFormatter: dateFormatter, width: 175}
  ];

    this.defaultColDef = {
      sortable: true,
      filter: true
  };
  }

  ngOnInit(): void {

    this.priceService
    .getFirstPrice()
    .subscribe((response: Price[]) => {
      this.rowPriceData = response;
      this.toastr.success('Successfully uploaded data'); }, error => {this.handler.logError(error);
    });

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
                    // console.log('Update receieved ' + type.timeStamp  + ' to replace ' + rowNode.data.lastUpdated);
                    if (rowNode.data.market === type.market)
                    {
                      rowNode.data.market = type.market;
                      rowNode.data.bidHigh = numberFormatter(type.bidHigh);
                      rowNode.data.askHigh = numberFormatter(type.askHigh);
                      rowNode.data.lastUpdated = type.timeStamp;
                      this.agGrid.api.refreshCells();
                    }
                });
           });
  }
}