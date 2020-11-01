import { MarketService } from './../../../services/market.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AppError } from 'src/app/models/app-error';

@Component({
  selector: 'app-dropdown-granularity',
  templateUrl: './dropdown-granularity.component.html',
  styleUrls: ['./dropdown-granularity.component.css']
})
export class DropdownGranularityComponent implements OnInit {

  constructor(private marketService: MarketService, private toastr: ToastrService, private handler: AppError) { }

  @Input() granularities: string[];
  @Input() granularity: string; // read prperties
  @Output() changeGranularity = new EventEmitter();

  ngOnInit(): void {
   this.refresh();
  }

  granularityChange(e: any): void{
      console.log('change from dropdown ' + e.value);
      this.changeGranularity.emit(e.value);
  }

  refresh(): void{
    this.marketService
    .getGranularityDistinct()
    .subscribe((response: string[]) => {
      this.granularities = response;
      this.toastr.success('Successfully uploaded data'); }, error => {this.handler.logError(error);
    });
  }
}
