import { Market } from 'src/app/models/market';
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
import { MarketSubscriber } from 'src/app/models/market-subscriber';

@Component({
  selector: 'app-fetch-price-live-data-grid',
  templateUrl: './fetch-price-live-data-grid.component.html',
  styleUrls: ['./fetch-price-live-data-grid.component.css']
})
export class FetchPriceLiveDataGridComponent implements OnInit {

  hubConnection: HubConnection;
  @ViewChild('agGrid') agGrid: AgGridAngular;
  defaultColDef;
  columnMarketDefs: any = [];
  rowPriceData: any = [];
  marketItem: MarketSubscriber;

  public price: Price[];
  frameworkComponents;

  constructor(private toastr: ToastrService, private handler: AppError, private configService: ConfigService,
              private priceService: PriceService) { }

  onGridReady(e): void{

    this.columnMarketDefs = [
      {headerName: 'Market', field: 'market' , width: 90},
      {headerName: 'Bid', field: 'bidHigh', width: 200, valueFormatter: this.numberCellFormatter, cellRenderer: 'agAnimateShowChangeCellRenderer' },
      {headerName: 'Ask', field: 'askHigh',  width: 200, valueFormatter: this.numberCellFormatter, cellRenderer: 'agAnimateShowChangeCellRenderer'},
      {headerName: 'Spread', field: 'spread', width: 100},
      {headerName: 'Updated', field: 'lastUpdated', valueFormatter: dateFormatter, enableCellChangeFlash: true, width: 150}
  ];

    this.defaultColDef = {
      flex: 1,
      // minWidth: 150,
      // sortable: true,
      // filter: true,
      cellClass: 'align-right'
  };
  }

  numberCellFormatter(params): any{
    return numberFormatter(params.value);
    return Math.floor(params.value)
      .toString()
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
  }

  subscribeToMarket(): any{

    this.marketItem = {
      name: 'GBP/USD'
  };

    this.priceService.addPriceSubscriber(this.marketItem);
    this.toastr.success('Subscribing to GBP/USD');
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
                      rowNode.setDataValue('market', type.market);
                      rowNode.setDataValue('bidHigh', numberFormatter(type.bidHigh) * 10000);
                      rowNode.setDataValue('askHigh', numberFormatter(type.askHigh) * 10000);
                      rowNode.data.spread = numberFormatter((type.askHigh - type.bidHigh)) * 10000;
                      rowNode.setDataValue('lastUpdated', type.timeStamp);
                    }
                });
           });
  }
}
