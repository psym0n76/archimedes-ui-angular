import { MarketService } from 'src/app/services/market.service';
import { Component, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AppError } from 'src/app/models/app-error';


@Component({
  selector: 'app-fetch-candle-data-chart-granularity-dropdown',
  templateUrl: './fetch-candle-data-chart-granularity-dropdown.component.html'
})

export class FetchCandleDataChartGranularityDropdownComponent implements OnInit {
  constructor(private marketService: MarketService, private toastr: ToastrService, private handler: AppError) { }

  granularities: string[];
  selectedItem: string;

  ngOnInit(): void {
    this.marketService
    .getGranularityDistinct()
    .subscribe((response: string[]) => {
      this.granularities = response;
      this.toastr.success('Successfully uploaded data'); }, error => {this.handler.logError(error);
    });
  }

  selectionChange(ev): void {
console.log( 'changed ' + ev.value);
  }
}
