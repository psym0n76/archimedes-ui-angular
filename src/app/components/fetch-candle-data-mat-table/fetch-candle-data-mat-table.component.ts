import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
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

  constructor(private candleService: CandleService, private toastr: ToastrService, private handler: AppError) { }

  public displayedColumns: string[] = ['market', 'granularity', 'dateFrom', 'dateTo', 'bidOpen', 'bidHigh', 'bidLow', 'bidClose'];
  public dataSource: any;

  ngOnInit(): void {
    this.candleService
    .getCandle()
    .subscribe((response: Candle[]) => {
      this.dataSource = new MatTableDataSource(response);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;

      this.toastr.success('Successfully uploaded data'); } , error => {this.handler.logError(error); });
  }
}
