import { ConfigService } from './../../services/config.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { ToastrService } from 'ngx-toastr';
import { AppError } from 'src/app/models/app-error';
import { dateFormatter } from '../formatters/dateFormatters';
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';
import { Price } from 'src/app/models/price';
import { numberFormatter } from '../formatters/numberFormatter';
import { PriceLevelService } from 'src/app/services/price-level.service';
import { PriceLevel } from 'src/app/models/price-level';

@Component({
  selector: 'app-fetch-price-level-data-grid',
  templateUrl: './fetch-price-level-data-grid.component.html',
  styleUrls: ['./fetch-price-level-data-grid.component.css']
})
export class FetchPriceLevelDataGridComponent implements OnInit {

  hubConnection: HubConnection;
  @ViewChild('agGrid') agGrid: AgGridAngular;
  defaultColDef;
  columnMarketDefs: any = [];
  rowPriceLevelData: any = [];

  public price: Price[];
  frameworkComponents;

  constructor(private toastr: ToastrService, private handler: AppError, private configService: ConfigService,
              private priceService: PriceLevelService) { }

  onGridReady(e): void{

    this.columnMarketDefs = [
      {headerName: 'id', field: 'id', width: 75},
      {headerName: 'Timestamp', field: 'timeStamp', valueFormatter: dateFormatter, width: 140},
      {headerName: 'BuySell', field: 'buySell' , width: 75},
      {headerName: 'Bid', field: 'bidPrice', valueFormatter: this.numberCellFormatter, width: 75},
      {headerName: 'Range', field: 'bidPriceRange', valueFormatter: this.numberCellFormatter,  width: 75},
      {headerName: 'BrokenDate', field: 'levelBrokenDate' , valueFormatter: dateFormatter,width: 140},
      {headerName: 'OutsideRangeDate', field: 'outsideRangeDate', valueFormatter: dateFormatter,  width: 140},
      {headerName: 'ExpiredDate', field: 'levelExpiredDate', valueFormatter: dateFormatter,  width: 140},
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
    return Math.floor(params.value)
      .toString()
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
  }


ngOnInit(): void {

    this.priceService
    .getPriceLevel()
    .subscribe((response: PriceLevel[]) => {
      this.rowPriceLevelData = response;
      this.toastr.success('Successfully uploaded data'); }, error => {this.handler.logError(error);
    });

    this.hubConnection = new HubConnectionBuilder().withUrl(this.configService.userInterfaceBaseUrl +  '/hubs/price-level').build();
    this.hubConnection
            .start()
            .then(() => this.toastr.success(this.configService.userInterfaceBaseUrl + '/hubs/price-level'))
            .catch(err => console.log('Error while establishing connection : ('));

    this.hubConnection.onclose(() => {
      this.toastr.info('Reconnecting: ' + this.configService.userInterfaceBaseUrl +  '/hubs/price-level');
      setTimeout(function(): void{
              this.hubConnection.start(); }, 3000);
             });

    this.hubConnection.on('Update',
            (type: PriceLevel) => {
                this.agGrid.api.forEachNode((rowNode, index): any => {
                    console.log('Update receieved ' + type.lastUpdated  + ' to replace ' + rowNode.data.lastUpdated);
                    if (rowNode.data.id === type.id)
                    {
                      rowNode.setDataValue('brokenDate', type.levelBrokenDate);
                      rowNode.setDataValue('outsideRangeDate', type.outsideRangeDate);
                      rowNode.setDataValue('levelExpiredDate', type.levelExpiredDate);
                      rowNode.setDataValue('updated', type.lastUpdated);
                    }
                });
           });
  }
}
