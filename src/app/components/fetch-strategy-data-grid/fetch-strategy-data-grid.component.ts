import { ConfigService } from './../../services/config.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { ToastrService } from 'ngx-toastr';
import { AppError } from 'src/app/models/app-error';
import { Strategy } from 'src/app/models/strategy';
import { StrategyService } from 'src/app/services/strategy.service';
import { dateFormatter } from '../formatters/dateFormatters';
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';

@Component({
  selector: 'app-fetch-strategy-data-grid',
  templateUrl: './fetch-strategy-data-grid.component.html',
  styleUrls: ['./fetch-strategy-data-grid.component.css']
})
export class FetchStrategyDataGridComponent implements OnInit {

  hubConnection: HubConnection;
  @ViewChild('agGrid') agGrid: AgGridAngular;
  defaultColDef: any = [];
  columnMarketDefs: any = [];
  rowStrategyData: any = [] ;

  public strategy: Strategy[];
  frameworkComponents;

  constructor(private strategyService: StrategyService, private toastr: ToastrService,
              private handler: AppError, private configService: ConfigService) { }

  onGridReady(e): void{

    this.columnMarketDefs = [
      {headerName: 'Strategy', field: 'name' , width: 150},
      {headerName: 'Market', field: 'market' , width: 100},
      {headerName: 'Granularity', field: 'granularity', width: 120},
      {headerName: 'Count', field: 'quantity', width: 100},
      {headerName: 'Active', field: 'active', editable: true, width: 89, singleClickEdit: true,
        cellEditor: 'agSelectCellEditor', cellEditorParams: {values: [true, false]}},
      {headerName: 'StartDate', field: 'startDate', valueFormatter: dateFormatter, width: 175},
      {headerName: 'EndDate', field: 'endDate', valueFormatter: dateFormatter, width: 175},
      {headerName: 'Updated', field: 'lastUpdated', valueFormatter: dateFormatter, width: 175}
  ];

    this.defaultColDef = {
      enableCellChangeFlash: true,
      sortable: true,
      filter: true
  };

    this.getData();

  }

  ngOnInit(): void {

    this.hubConnection = new HubConnectionBuilder().withUrl(this.configService.userInterfaceBaseUrl +  '/Hubs/Strategy').build();
    this.hubConnection
            .start()
            .then(() => this.toastr.success(this.configService.userInterfaceBaseUrl + '/Hubs/Strategy'))
            .catch(err => console.log('Error while establishing connection : ('));

    this.hubConnection.onclose(() => {
      this.toastr.info('Reconnecting: ' + this.configService.userInterfaceBaseUrl +  '/Hubs/Strategy');
      setTimeout(function(): void{
              this.hubConnection.start(); }, 3000);
             });

    this.hubConnection.on('Update',
            (type: Strategy) => {
                this.agGrid.api.forEachNode((rowNode, index): any => {
                  if (rowNode.data.name === type.name && rowNode.data.granularity === type.granularity) {
                    console.log('Update receieved ' + type.lastUpdated  + ' to replace ' + rowNode.data.lastUpdated);
                    rowNode.data.startDate = type.startDate;
                    rowNode.data.endDate = type.endDate;
                    rowNode.data.lastUpdated = type.lastUpdated;
                    rowNode.data.count = type.count;
                    this.agGrid.api.refreshCells();
                  }
                });


            //   if (index > -1)
            //   {
            //     this.dataSource[index].appName = type.appName;
            //     this.dataSource[index].url = type.url;
            //     this.dataSource[index].version = type.version;
            //     this.dataSource[index].statusMessage = type.statusMessage;
            //     this.dataSource[index].lastUpdated = type.lastUpdated;
            //     this.table.renderRows();
            //   }
           });
  }

getData(): void {
  this.strategyService
      .getStrategy()
      .subscribe((response: Strategy[]) => {
        this.rowStrategyData = response;
        this.toastr.success('Successfully uploaded data'); } , error => {this.handler.logError(error); });
}

onCellValueChanged(row: any): void{

 if (row.oldValue === row.NewValue) {
    return;
 }

 const data = row.data as Strategy;

 this.toastr.info('Cell Value changed from ' + row.oldValue + ' ' + row.newValue);
 this.strategyService.updateStrategy(data)
                  .subscribe((response: Strategy) => {
                    this.toastr.success('Successfully uploaded data'); } , error => {this.handler.logError(error); }); }


getSelectedRows(): void  {
  const selectedNodes = this.agGrid.api.getSelectedNodes();
  const selectedData = selectedNodes.map( node => node.data );
  const selectedDataStringPresentation = selectedData.map( node => node.name + ' ' + node.timeFrameInterval).join(', ');
  this.toastr.info(`Selected nodes: ${selectedDataStringPresentation}`);
}
}

