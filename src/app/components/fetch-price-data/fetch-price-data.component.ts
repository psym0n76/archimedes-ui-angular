import { Price } from '../../models/price';
import { AppError } from '../../models/app-error';
import { PriceService } from '../../services/price.service';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-fetch-price-data',
  templateUrl: './fetch-price-data.component.html',
})
export class FetchPriceDataComponent implements OnInit {

  public prices: Price[];
  constructor(private priceService: PriceService, private toastr: ToastrService, private handler: AppError) {}

  ngOnInit(): any {
    this.priceService
      .getPrice()
      .subscribe((response: Price[]) => {
        this.prices = response;
        this.toastr.success('Successfully uploaded data'); } , error => {this.handler.logError(error); });
  }
}
