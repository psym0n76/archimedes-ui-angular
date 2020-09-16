import { Candle } from '../../models/candle';
import { AppError } from '../../models/app-error';
import { CandleService } from '../../services/candle.service';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-fetch-candle-data',
  templateUrl: './fetch-candle-data.component.html',
})
export class FetchCandleDataComponent implements OnInit {

  public candles: Candle[];
  constructor(private candleService: CandleService, private toastr: ToastrService, private handler: AppError) {}

  ngOnInit(): any {
    this.candleService
      .getCandle()
      .subscribe((response: Candle[]) => {
        this.candles = response;
        this.toastr.success('Successfully uploaded data'); } , error => {this.handler.logError(error); });
  }
}
