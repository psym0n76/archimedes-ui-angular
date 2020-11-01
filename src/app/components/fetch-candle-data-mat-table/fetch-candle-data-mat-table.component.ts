import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, MatSortable } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { AppError } from 'src/app/models/app-error';
import { Candle } from 'src/app/models/candle';
import { CandleService } from 'src/app/services/candle.service';

@Component({
  selector: 'app-fetch-candle-data-mat-table',
  templateUrl: './fetch-candle-data-mat-table.component.html',
  styleUrls: ['./fetch-candle-data-mat-table.component.css']
})
export class FetchCandleDataMatTableComponent implements OnInit {

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  market = 'GBP/USD';
  granularity = '1D';

  constructor(private candleService: CandleService, private toastr: ToastrService, private handler: AppError) { }

  public displayedColumns: string[] = ['market', 'granularity', 'fromDate', 'toDate', 'bidOpen', 'bidHigh', 'bidLow', 'bidClose'];
  public dataSource: any;

    // MatPaginator Inputs
    length = 100;
    pageSize = 10;
    pageSizeOptions: number[] = [5, 10, 25, 100];
  
    // MatPaginator Output
    pageEvent: PageEvent;

  ngOnInit(): void {
    this.refreshData();
  }


refreshData(): any {
  this.candleService.getCandleByMarketByGranularity(this.market, this.granularity).subscribe((response: Candle[]) => {
    this.dataSource = new MatTableDataSource(response);
    this.sort.sort(({id: 'fromDate', start: 'desc'}) as MatSortable);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;

    this.toastr.success('Successfully uploaded data'); } , error => {this.handler.logError(error); });
}


  setPageSizeOptions(setPageSizeOptionsInput: string): void {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
    }
  }
  // getCandleData(event?: PageEvent): any{
  //   this.candleService.getCandlePage(event.pageIndex, event.pageSize).subscribe((response: Candle[]) => {
  //     this.dataSource = new MatTableDataSource(response);
  //     //this.sort.sort(({id: 'fromDate', start: 'desc'}) as MatSortable);
  //     this.dataSource.sort = this.sort;
  //     this.dataSource.paginator = this.paginator;

  //    this.toastr.success('Successfully uploaded data'); } , error => {this.handler.logError(error); });
  //}

  onSearchInput(ev): void {
    const searchTarget = ev.target.value;
    this.dataSource.filter = searchTarget.trim().toLowerCase();
  }

  onGranularityChange(granularity: string): void{
    this.granularity = granularity;
    console.log( 'Granularity change event ' + this.granularity);
    this.refreshData();
  }

  onMarketChange(market: string): void{
    this.market = market;
    console.log( 'Market change event ' + this.market);
    this.refreshData();
  }
}