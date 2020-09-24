import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { AppError } from 'src/app/models/app-error';
import { Price } from 'src/app/models/price';
import { PriceService } from 'src/app/services/price.service';

@Component({
  selector: 'app-fetch-price-data-mat-table',
  templateUrl: './fetch-price-data-mat-table.component.html',
  styleUrls: ['./fetch-price-data-mat-table.component.css']
})
export class FetchPriceDataMatTableComponent implements OnInit {

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(private priceService: PriceService, private toastr: ToastrService, private handler: AppError) { }

  public displayedColumns: string[] = ['market', 'granularity', 'open', 'high', 'low', 'close', 'tickQty', 'timeStamp'];
  public dataSource: any;

  ngOnInit(): void {
    this.priceService
    .getPrice()
    .subscribe((response: Price[]) => {
      this.dataSource = new MatTableDataSource(response);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;

      this.toastr.success('Successfully uploaded price data'); } , error => {this.handler.logError(error); });
  }

  onSearchInput(ev): void {
    const searchTarget = ev.target.value;
    this.dataSource.filter = searchTarget.trim().toLowerCase();
  }
}
