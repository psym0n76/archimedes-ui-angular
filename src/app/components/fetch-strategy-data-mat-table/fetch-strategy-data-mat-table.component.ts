import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, MatSortable } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { AppError } from 'src/app/models/app-error';
import { Strategy } from 'src/app/models/strategy';
import { StrategyService } from 'src/app/services/strategy.service';

@Component({
  selector: 'app-fetch-strategy-data-mat-table',
  templateUrl: './fetch-strategy-data-mat-table.component.html',
  styleUrls: ['./fetch-strategy-data-mat-table.component.css']
})
export class FetchStrategyDataMatTableComponent implements OnInit {

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(private strategyService: StrategyService, private toastr: ToastrService, private handler: AppError) { }

  public displayedColumns: string[] = ['name', 'market', 'granularity', 'active',  'startDate', 'endDate', 'count', 'lastUpdated'];
  public dataSource: any;

  ngOnInit(): void {
    this.strategyService
    .getStrategy()
    .subscribe((response: Strategy[]) => {
      this.dataSource = new MatTableDataSource(response);
      this.sort.sort(({id: 'active', start: 'desc'}) as MatSortable);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;

      this.toastr.success('Successfully uploaded data'); } , error => {this.handler.logError(error); });
  }

  onSearchInput(ev): void {
    const searchTarget = ev.target.value;
    this.dataSource.filter = searchTarget.trim().toLowerCase();
  }
}

