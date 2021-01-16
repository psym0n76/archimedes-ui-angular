import { ConfigService } from './../../services/config.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { ToastrService } from 'ngx-toastr';
import { AppError } from 'src/app/models/app-error';
import { dateFormatter } from '../formatters/dateFormatters';
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';
import { Trade } from 'src/app/models/trade';
import { numberFormatter } from '../formatters/numberFormatter';
import { TradeService } from 'src/app/services/trade.service';

@Component({
  selector: 'app-fetch-trade-data-grid',
  templateUrl: './fetch-trade-data-grid.component.html',
  styleUrls: ['./fetch-trade-data-grid.component.css']
})
export class FetchTradeDataGridComponent implements OnInit {

  hubConnection: HubConnection;
  @ViewChild('agGrid') agGrid: AgGridAngular;
  defaultColDef;
  columnMarketDefs: any = [];
  rowTradeData: any = [];

  public trade: Trade[];
  frameworkComponents;

  constructor(private toastr: ToastrService, private handler: AppError, private configService: ConfigService,
              private tradeService: TradeService) { }

  onGridReady(e): void{

    this.columnMarketDefs = [
      {headerName: 'id', field: 'id', width: 75},
      {headerName: 'BuySell', field: 'buySell' , width: 75},
      {headerName: 'Market', field: 'market' , width: 75},
      {headerName: 'Strategy', field: 'strategy' , width: 75},
      {headerName: 'Success', field: 'success' , width: 75},

      {headerName: 'PriceLevelTimestamp', field: 'priceLevelTimestamp', valueFormatter: dateFormatter,  width: 140},
      {headerName: 'RR', field: 'riskReward', valueFormatter: this.numberCellFormatter, width: 75},

      {headerName: 'EntryPrice', field: 'entryPrice', valueFormatter: this.numberCellFormatter, width: 75},
      {headerName: 'ClosePrice', field: 'closePrice', valueFormatter: this.numberCellFormatter,  width: 75},
      {headerName: 'TargetPrice', field: 'targetPrice', valueFormatter: this.numberCellFormatter,  width: 75},
      {headerName: 'Price', field: 'price', valueFormatter: this.numberCellFormatter,  width: 75},

      {headerName: 'Updated', field: 'lastUpdated', valueFormatter: dateFormatter,  width: 140}
  ];

    this.defaultColDef = {
      //flex: 1,
      // minWidth: 150,
      // sortable: true,
      // filter: true,
      cellClass: 'align-right',
      enableCellChangeFlash: true
      
  };
  }

  numberCellFormatter(params): any{
    return numberFormatter(params.value);
  }

ngOnInit(): void {

    this.tradeService
    .getTrade()
    .subscribe((response: Trade[]) => {
      this.rowTradeData = response;
      this.toastr.success('Successfully uploaded data'); }, error => {this.handler.logError(error);
    });

    this.hubConnection = new HubConnectionBuilder().withUrl(this.configService.userInterfaceBaseUrl +  '/hubs/trade').build();
    this.hubConnection
            .start()
            .then(() => this.toastr.success(this.configService.userInterfaceBaseUrl + '/hubs/trade'))
            .catch(err => console.log('Error while establishing connection : ('));

    this.hubConnection.onclose(() => {
      this.toastr.info('Reconnecting: ' + this.configService.userInterfaceBaseUrl +  '/hubs/trade');
      setTimeout(function(): void{
              this.hubConnection.start(); }, 3000);
             });

    this.hubConnection.on('Update',
            (type: Trade) => {
                this.agGrid.api.forEachNode((rowNode, index): any => {
                    console.log('Update receieved ' + type.lastUpdated  + ' to replace ' + rowNode.data.lastUpdated);
                    if (rowNode.data.id === type.id)
                    {
                      rowNode.setDataValue('price', type.price);
                      rowNode.setDataValue('success', type.success);
                      rowNode.setDataValue('updated', type.lastUpdated);
                    }
                });
           });
  }
}
