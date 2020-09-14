import { Market } from './../../models/market';
import { AppError } from '../../models/app-error';
import { MarketService } from '../../services/market.service';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-fetch-market-data',
  templateUrl: './fetch-market-data.component.html',
})
export class FetchMarketDataComponent implements OnInit {

  public markets: Market[];
  constructor(private marketService: MarketService, private toastr: ToastrService, private handler: AppError) {}

  ngOnInit(): any {
    this.marketService
      .getMarket()
      .subscribe((response: Market[]) => {
        this.markets = response;
        this.toastr.success('Successfully uploaded data'); } , error => {this.handler.logError(error); });
  }
}
