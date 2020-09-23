import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-data-mat-table',
  templateUrl: './data-mat-table.component.html',
  styleUrls: ['./data-mat-table.component.css']
})
export class DataMatTableComponent implements OnInit {

  constructor() { }

  public tableCols = ['name', 'role', 'skillset'];
  public tableData = [
    {
      name: 'Simon',
      role: 'Dev',
      skillset: 'C#'
    },
    {
      name: 'John',
      role: 'Dev',
      skillset: 'C'
    },
    {
      name: 'Dennis',
      role: 'Dev',
      skillset: 'C#'
    }];

  ngOnInit(): void {
  }
}
