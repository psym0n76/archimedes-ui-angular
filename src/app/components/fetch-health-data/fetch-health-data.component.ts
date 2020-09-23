import { Health } from '../../models/health';
import { AppError } from '../../models/app-error';
import { HealthService } from '../../services/health.service';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-health-data',
  templateUrl: './fetch-health-data.component.html',
  styleUrls: ['./fetch-health-data.component.css']
})
export class FetchHealthDataComponent implements OnInit {

  public healthUrls: Health[];
  constructor(private healthService: HealthService, private toastr: ToastrService, private handler: AppError) {}

  ngOnInit(): any {
    this.healthService
      .getHealth()
      .subscribe((response: Health[]) => {
        this.healthUrls = response;
        this.toastr.success('Successfully uploaded data'); } , error => {this.handler.logError(error); });
  }
}
