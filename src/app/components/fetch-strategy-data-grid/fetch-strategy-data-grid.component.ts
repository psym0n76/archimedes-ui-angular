import { Component, OnInit, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { ToastrService } from 'ngx-toastr';
import { AppError } from 'src/app/models/app-error';
import { Strategy } from 'src/app/models/strategy';
import { StrategyService } from 'src/app/services/strategy.service';

@Component({
  selector: 'app-fetch-strategy-data-grid',
  templateUrl: './fetch-strategy-data-grid.component.html',
  styleUrls: ['./fetch-strategy-data-grid.component.css']
})
export class FetchStrategyDataGridComponent implements OnInit {

  @ViewChild('agGrid') agGrid: AgGridAngular;
  defaultColDef: any = [];
  columnMarketDefs: any = [];
  rowStrategyData: any = [] ;

  public strategy: Strategy[];
  frameworkComponents;

  constructor(private strategyService: StrategyService, private toastr: ToastrService, private handler: AppError) { }

  onGridReady(e): void{

    this.columnMarketDefs = [
      {headerName: 'Strategy', field: 'name' },
      {headerName: 'Market', field: 'market' },
      {headerName: 'Granularity', field: 'granularity'},
      {headerName: 'Active', field: 'active', editable: true, singleClickEdit: true,
          cellEditor: 'agSelectCellEditor', cellEditorParams: {values: [true, false]}},
      {headerName: 'StartDate', field: 'startDate'},
      {headerName: 'EndDate', field: 'endDate'},
      {headerName: 'Count', field: 'quantity'},
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

