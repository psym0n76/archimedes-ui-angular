import { OnInit, Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
    providedIn: 'root'
  })

export class AppError  {
    constructor(private toastr: ToastrService){}

logError(originalError: any): void{
    console.log(originalError);
    this.toastr.error(originalError);
}
}
