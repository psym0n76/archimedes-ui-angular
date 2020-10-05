import { CandleService } from 'src/app/services/candle.service';
import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts/highstock';

@Component({
  selector: 'app-fetch-candle-data-chart',
  templateUrl: './fetch-candle-data-chart.component.html',
  styleUrls: ['./fetch-candle-data-chart.component.css']
})
export class FetchCandleDataChartComponent implements OnInit {

  Highcharts: typeof Highcharts = Highcharts;
  market = 'GBP/USD';
  granularity = '5Min';

  constructor(private candleService: CandleService) {}

   ngOnInit(): void {

  this.refresh();
}


async refresh(): Promise<void> {
  Highcharts.stockChart('container', {
    rangeSelector: {
        selected: 1
    },

    title: {
        text: this.market + ' ' +  this.granularity
    },

    series: [{
        type: 'candlestick',
        name: this.market,
        data: await this.candleService.getCandleOhlc(this.market, this.granularity),
        dataGrouping: {}
    }]
});
}

onGranularityChange(granularity: string): void{
  this.granularity = granularity;
  console.log( 'Granularity change event ' + this.granularity);
  this.refresh();
}
}
