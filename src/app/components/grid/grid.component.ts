import { Component, OnInit } from '@angular/core';
import {AgGridAngular} from 'ag-grid-angular';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent implements OnInit {
  title: string;
  columnDefs: { headerName: string; field: string; }[];
  rowData: { make: string; model: string; price: number; }[];

  constructor() { }

  ngOnInit(): void {

    this.title = 'app';

    this.columnDefs = [
        {headerName: 'Make', field: 'make' },
        {headerName: 'Model', field: 'model' },
        {headerName: 'Price', field: 'price'}
    ];

    this.rowData = [
        { make: 'Toyota', model: 'Celica', price: 35000 },
        { make: 'Ford', model: 'Mondeo', price: 32000 },
        { make: 'Porsche', model: 'Boxter', price: 72000 }
    ];
  }
}
