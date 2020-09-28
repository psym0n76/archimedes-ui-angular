import { Candle } from './../../models/candle';
import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { CandleService } from 'src/app/services/candle.service';

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

  constructor(private candleService: CandleService) {}

  ngOnInit(): void {
    this.candleService.getCandle().subscribe((assets) => {
      this.items$ = assets;
      if (this.items$) {
        this.items$.forEach((element) => {
          this.chardata.push(element.askClose);
        });
        this.getChart();
      }
    });
  }
  getChart(): void {
    this.chartOptions = {
      series: [{
        data: this.chardata,
      }, ],
      chart: {
        type: 'bar',
      },
      title: {
        text: 'barchart',
      },
    };
  }
}
