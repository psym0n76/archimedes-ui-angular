import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AppError } from 'src/app/models/app-error';
import { MarketService } from 'src/app/services/market.service';

@Component({
  selector: 'app-dropdown-market',
  templateUrl: './dropdown-market.component.html',
  styleUrls: ['./dropdown-market.component.css']
})
export class DropdownMarketComponent implements OnInit {

  constructor(private marketService: MarketService, private toastr: ToastrService, private handler: AppError) { }

  @Input() markets: string[];
  @Input() market: string; // read prperties
  @Output() changeMarket = new EventEmitter();

  ngOnInit(): void {
   this.refresh();
  }

  marketChange(e: any): void{
      console.log('change from dropdown ' + e.value);
      this.changeMarket.emit(e.value);
  }

  refresh(): void{
    this.marketService
    .getMarketDistinct()
    .subscribe((response: string[]) => {
      this.markets = response;
      this.toastr.success('Successfully uploaded data'); }, error => {this.handler.logError(error);
    });
  }
}
