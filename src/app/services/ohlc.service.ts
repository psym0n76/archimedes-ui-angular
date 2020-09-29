import { OHLC } from './../models/ohlc';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OhlcService {

  constructor() { }


getOhlcData(): OHLC[]{

let data: OHLC[];

data = [
  {
  x : 1538400600000,
  open : 56.99,
  high : 57.35,
  low : 56.59,
  close : 56.81
},
{
  x : 1538487000000,
  open : 56.99,
  high : 57.35,
  low : 56.59,
  close : 56.3
}
];

return data;

}
}
