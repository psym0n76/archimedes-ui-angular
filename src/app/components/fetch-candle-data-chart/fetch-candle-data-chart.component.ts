import { CandleService } from 'src/app/services/candle.service';
import { Candle } from './../../models/candle';
import { Component, Input, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts/highstock';
import { MarketService } from 'src/app/services/market.service';
import { ToastrService } from 'ngx-toastr';
import { AppError } from 'src/app/models/app-error';

@Component({
  selector: 'app-fetch-candle-data-chart',
  templateUrl: './fetch-candle-data-chart.component.html',
  styleUrls: ['./fetch-candle-data-chart.component.css']
})
export class FetchCandleDataChartComponent implements OnInit {

  @Input() selectedGranularity: string;

  title = 'Firestore-Angular-Highcharts';
  items$: Candle[];
  Highcharts: typeof Highcharts = Highcharts;
  chardata: any[] = [];
  chartOptions: any;
  granularities: string[];
  market = 'GBP/USD';
  granularity: '5Min';

  constructor(private candleService: CandleService, private marketService: MarketService,
              private toastr: ToastrService, private handler: AppError) {}

  async ngOnInit(): Promise<void> {

  this.refreshMarkets();
  this.refreshChart('GBP/USD', '5Min');
}

async refreshChart(market: string, granularity: string): Promise<void> {
  Highcharts.stockChart('container', {
    rangeSelector: {
        selected: 1
    },

    title: {
        text: market + ' ' +  granularity
    },

    series: [{
        type: 'candlestick',
        name: market,
        data: await this.candleService.getCandleOhlc(market, granularity),
        dataGrouping: {}
    }]
});
}

marketSelectionChange(ev): void {
  this.granularity = ev.value;
  console.log( 'Granularity change event ' + this.granularity);
  this.refreshChart(this.market, this.granularity);
    }

refreshMarkets(): void{
    this.marketService
    .getGranularityDistinct()
    .subscribe((response: string[]) => {
      this.granularities = response;
      this.toastr.success('Successfully uploaded data'); }, error => {this.handler.logError(error);
    });
  }


refreshdata(): void{
    console.log('button clicked this is not used');
}
}
