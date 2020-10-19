import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, MatSortable } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { AppError } from 'src/app/models/app-error';
import { PriceLevel } from 'src/app/models/price-level';
import { PriceLevelService } from 'src/app/services/price-level.service';

@Component({
  selector: 'app-fetch-price-level-data-mat-table',
  templateUrl: './fetch-price-level-data-mat-table.component.html',
  styleUrls: ['./fetch-price-level-data-mat-table.component.css']
})
export class FetchPriceLevelDataMatTableComponent implements OnInit {


  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(private priceLevelService: PriceLevelService, private toastr: ToastrService, private handler: AppError) { }

  public displayedColumns: string[] = ['market', 'granularity', 'active', 'tradeType', 'candleType', 'timeStamp', 'strategy', 'bidPrice', 'bidPriceRange', 'askPrice', 'askPriceRange', 'lastUpdated'];
  public dataSource: any;

  ngOnInit(): void {
    this.priceLevelService
    .getPriceLevel()
    .subscribe((response: PriceLevel[]) => {
      this.dataSource = new MatTableDataSource(response);
      this.sort.sort(({id: 'timeStamp', start: 'desc'}) as MatSortable);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;

      this.toastr.success('Successfully uploaded data'); } , error => {this.handler.logError(error); });
  }

  onSearchInput(ev): void {
    const searchTarget = ev.target.value;
    this.dataSource.filter = searchTarget.trim().toLowerCase();
  }
}
