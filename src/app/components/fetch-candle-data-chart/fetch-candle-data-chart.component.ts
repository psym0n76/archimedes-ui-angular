import { CandleService } from 'src/app/services/candle.service';
import { OhlcService } from './../../services/ohlc.service';
import { Candle } from './../../models/candle';
import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts/highstock';

@Component({
  selector: 'app-fetch-candle-data-chart',
  templateUrl: './fetch-candle-data-chart.component.html',
  styleUrls: ['./fetch-candle-data-chart.component.css']
})
export class FetchCandleDataChartComponent implements OnInit {

  title = 'Firestore-Angular-Highcharts';
  items$: Candle[];
  Highcharts: typeof Highcharts = Highcharts;
  chardata: any[] = [];
  chartOptions: any;

  constructor(private ohlcService: OhlcService, private candleService: CandleService) {}

  async ngOnInit(): Promise<void> {

  Highcharts.stockChart('container', {
      rangeSelector: {
          selected: 1
      },

      title: {
          text: 'GBP/USD 5 Min'
      },

      series: [{
          type: 'candlestick',
          name: 'GBP/USD',
          // data: this.ohlcService.getOhlcData(),
          data: await this.candleService.getCandleOhlc(),
          dataGrouping: {}
      }]
  });
}
}
