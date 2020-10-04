import { CandleService } from 'src/app/services/candle.service';
import { Candle } from './../../models/candle';
import { Component, Input, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts/highstock';

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

  constructor(private candleService: CandleService) {}

  async ngOnInit(): Promise<void> {

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


  refreshdata(): void{
    console.log('button clicked ');
}

selectionChange(ev): void {
  console.log( 'changed lll' + ev.value);
    }
}
