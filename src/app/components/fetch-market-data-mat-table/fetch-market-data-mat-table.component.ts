import { MarketService } from '../../services/market.service';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AppError } from 'src/app/models/app-error';
import { Market } from 'src/app/models/market';

@Component({
  selector: 'app-fetch-market-data-mat-table',
  templateUrl: './fetch-market-data-mat-table.component.html',
  styleUrls: ['./fetch-market-data-mat-table.component.css']
})
export class FetchMarketDataMatTableComponent implements OnInit {

constructor(private marketService: MarketService, private toastr: ToastrService, private handler: AppError) { }

public dataSource: Market[];
public displayedColumns: string[] = ['name', 'active', 'minDate', 'maxDate', 'quantity', 'timeFrameInterval', 'lastUpdated'];

ngOnInit(): void {
    this.marketService
    .getMarket()
    .subscribe((response: Market[]) => {
      this.dataSource = response;
      this.toastr.success('Successfully uploaded data'); } , error => {this.handler.logError(error); });
  }
}
