import { Component, OnInit, ViewChild } from '@angular/core';
import {AgGridAngular} from 'ag-grid-angular';
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
  columnMarketDefs: any = [];
  rowMarketData: any = [] ;

  public markets: Market[];
  constructor(private marketService: MarketService, private toastr: ToastrService, private handler: AppError) { }

  ngOnInit(): void {

    this.getData();

    this.columnMarketDefs = [
        {headerName: 'Name', field: 'name', sortable: true, filter: true, checkboxSelection: true , width: 125},
        {headerName: 'Active', field: 'active', sortable: true, filter: true , width: 125},
        {headerName: 'Start Date', field: 'minDate', sortable: true, filter: true, width: 150},
        {headerName: 'End Date', field: 'maxDate', sortable: true, filter: true, width: 150},
        {headerName: 'Quantity', field: 'quantity', sortable: true, filter: true, width: 125},
        {headerName: 'Granularity', field: 'timeFrameInterval', sortable: true, filter: true, width: 130},
        {headerName: 'Updated', field: 'lastUpdated', sortable: true, filter: true, width: 200}
    ];
  }

getData(): void {
  this.marketService
      .getMarket()
      .subscribe((response: Market[]) => {
        this.rowMarketData = response;
        this.toastr.success('Successfully uploaded data'); } , error => {this.handler.logError(error); });
}

getSelectedRows(): void  {
  const selectedNodes = this.agGrid.api.getSelectedNodes();
  const selectedData = selectedNodes.map( node => node.data );
  const selectedDataStringPresentation = selectedData.map( node => node.name + ' ' + node.TimeFrame).join(', ');
  alert(`Selected nodes: ${selectedDataStringPresentation}`);
}
}
