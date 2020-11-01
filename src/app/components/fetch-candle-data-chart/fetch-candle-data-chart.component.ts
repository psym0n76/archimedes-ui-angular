import { CandleService } from 'src/app/services/candle.service';
import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts/highstock';
import { Candle } from 'src/app/models/candle';

@Component({
  selector: 'app-fetch-candle-data-chart',
  templateUrl: './fetch-candle-data-chart.component.html',
  styleUrls: ['./fetch-candle-data-chart.component.css']
})
export class FetchCandleDataChartComponent implements OnInit {

  Highcharts: typeof Highcharts = Highcharts;
  market = 'GBP/USD';
  granularity = '1D';
  dataSource: Candle[];
  toastr: any;
  handler: any;

 

  constructor(private candleService: CandleService, ) {}

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
        //dataGrouping: {units: [ ['week', [1]], ['month', [1, 2, 3]]]},
        dataGrouping: {},
        turboThreshold: 50000
    }]
});
}


onGranularityChange(granularity: string): void{
  this.granularity = granularity;
  console.log( 'Granularity change event ' + this.granularity);
  this.refresh();
}

onMarketChange(market: string): void{
  this.market = market;
  console.log( 'Market change event ' + this.market);
  this.refresh();
}
}
