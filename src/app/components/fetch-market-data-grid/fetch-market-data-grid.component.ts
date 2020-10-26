import { Component, OnInit, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { ToastrService } from 'ngx-toastr';
import { AppError } from 'src/app/models/app-error';
import { Market } from 'src/app/models/market';
import { MarketService } from 'src/app/services/market.service';
import { dateFormatter } from '../formatters/dateFormatters';
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';
import { ConfigService } from 'src/app/services/config.service';

@Component({
  selector: 'app-fetch-market-data-grid',
  templateUrl: './fetch-market-data-grid.component.html',
  styleUrls: ['./fetch-market-data-grid.component.css']
})
export class FetchMarketDataGridComponent implements OnInit {

  hubConnection: HubConnection;
  @ViewChild('agGrid') agGrid: AgGridAngular;
  defaultColDef: any = [];
  columnMarketDefs: any = [];
  rowMarketData: any = [] ;
  public markets: Market[];
  // frameworkComponents;

  constructor(private marketService: MarketService, private toastr: ToastrService,
              private handler: AppError, private configService: ConfigService) {}

  onGridReady(e): void {

    this.columnMarketDefs = [
      {headerName: 'Market', field: 'name' },
      {headerName: 'Granularity', field: 'timeFrameInterval'},
      {headerName: 'Count', field: 'quantity'},
      {headerName: 'Active', field: 'active', editable: true, singleClickEdit: true,
          cellEditor: 'agSelectCellEditor', cellEditorParams: {values: [true, false]}},
      {headerName: 'StartDate', field: 'minDate', valueFormatter: dateFormatter},
      {headerName: 'EndDate', field: 'maxDate', valueFormatter: dateFormatter},
      {headerName: 'Updated', field: 'lastUpdated', valueFormatter: dateFormatter}
  ];

    this.agGrid.gridOptions.getRowStyle = (params): any => {
      if (params.data.active === true) {
        return { background: 'lightgreen' };
      }
};

    this.defaultColDef = {
    flex: 1,
    minWidth: 110,
    cellClass: 'align-right',
    enableCellChangeFlash: true,
    sortable: true,
    resizable: true,
    filter: true
};

    this.getData();
}


ngOnInit(): void {

  this.hubConnection = new HubConnectionBuilder().withUrl(this.configService.userInterfaceBaseUrl +  '/hubs/market').build();
  this.hubConnection
          .start()
          .then(() => this.toastr.success(this.configService.userInterfaceBaseUrl + '/hubs/market'))
          .catch(err => console.log('Error while establishing connection : ('));

  this.hubConnection.onclose(() => {
    this.toastr.info('Reconnecting: ' + this.configService.userInterfaceBaseUrl +  '/hubs/market');
    setTimeout(function(): void{
            this.hubConnection.start(); }, 3000);
           });

  this.hubConnection.on('Update',
          (type: Market) => {
              this.agGrid.api.forEachNode((rowNode, index): any => {
                if (rowNode.data.name === type.name && rowNode.data.granularity === type.timeFrame) {
                  console.log('Update receieved ' + type.lastUpdated  + ' to replace ' + rowNode.data.lastUpdated);
                  rowNode.data.minDate = type.minDate;
                  rowNode.data.maxDate = type.maxDate;
                  rowNode.data.lastUpdated = type.lastUpdated;
                  rowNode.data.count = type.quantity;
                  this.agGrid.api.refreshCells();
                }
              });
         });
  }


  getData(): void {
  this.marketService
      .getMarket()
      .subscribe((response: Market[]) => {
        this.rowMarketData = response;
        this.toastr.success('Successfully uploaded data'); } , error => {this.handler.logError(error); });
  }


  onCellValueChanged(row: any): void {
    if (row.oldValue === row.NewValue) {return; }

    const data = row.data as Market;

    this.toastr.info('Cell Value changed from ' + row.oldValue + ' ' + row.newValue);
    this.marketService.updateMarket(data)
                      .subscribe((response: Market) => {
                    this.toastr.success('Successfully uploaded data'); } , error => {this.handler.logError(error); });
                      }




  getSelectedRows(): void  {
    const selectedNodes = this.agGrid.api.getSelectedNodes();
    const selectedData = selectedNodes.map( node => node.data );
    const selectedDataStringPresentation = selectedData.map( node => node.name + ' ' + node.timeFrameInterval).join(', ');
    this.toastr.info(`Selected nodes: ${selectedDataStringPresentation}`);
  }

}
