import { Component, OnInit, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { ToastrService } from 'ngx-toastr';
import { AppError } from 'src/app/models/app-error';
import { Market } from 'src/app/models/market';
import { MarketService } from 'src/app/services/market.service';

@Component({
  selector: 'app-market-grid',
  templateUrl: './market-grid.component.html',
  styleUrls: ['./market-grid.component.css']
})
export class MarketGridComponent implements OnInit {

  @ViewChild('agGrid') agGrid: AgGridAngular;
  defaultColDef: any = [];
  columnMarketDefs: any = [];
  rowMarketData: any = [] ;

  public markets: Market[];
  frameworkComponents;

  constructor(private marketService: MarketService, private toastr: ToastrService, private handler: AppError) { }



  onGridReady(e): void{

    this.columnMarketDefs = [
      {headerName: 'Market', field: 'name' },
      {headerName: 'Active', field: 'active', editable: true, singleClickEdit: true,
          cellEditor: 'agSelectCellEditor', cellEditorParams: {values: ['true', 'false']}},
      {headerName: 'Start Date', field: 'minDate'},
      {headerName: 'End Date', field: 'maxDate'},
      {headerName: 'Quantity', field: 'quantity'},
      {headerName: 'Granularity', field: 'timeFrameInterval'},
      {headerName: 'Updated', field: 'lastUpdated'}
  ];

    this.defaultColDef = {
    flex: 1,
    minWidth: 110,
    sortable: true,
    resizable: true,
    filter: true
  };

    this.getData();

  }

  ngOnInit(): void {
  }

getData(): void {
  this.marketService
      .getMarket()
      .subscribe((response: Market[]) => {
        this.rowMarketData = response;
        this.toastr.success('Successfully uploaded data'); } , error => {this.handler.logError(error); });
}

onCellValueChanged(row: any): void{

if (row.oldValue === row.NewValue) {
   return;
}
const data = row.data as Market;

this.toastr.info('Cell Value changed from ' + row.oldValue + ' ' + row.newValue);
this.marketService.updateMarket(data)
                  .subscribe((response: Market) =>{
                    this.toastr.success('Successfully uploaded data'); } , error => {this.handler.logError(error); }); }


getSelectedRows(): void  {
  const selectedNodes = this.agGrid.api.getSelectedNodes();
  const selectedData = selectedNodes.map( node => node.data );
  const selectedDataStringPresentation = selectedData.map( node => node.name + ' ' + node.timeFrameInterval).join(', ');
  this.toastr.info(`Selected nodes: ${selectedDataStringPresentation}`);
}
}
