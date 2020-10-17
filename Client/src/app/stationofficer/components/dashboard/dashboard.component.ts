import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';

export interface StationTotals {
  float: number;
  payments: number;
  loans: number;
  clients: number;
  newClients: number;
  stages: number;
  fuelClients: number;
  clentsSaved: number;
  defaulters: number;
  debtsRecouvered: number;
  paidFuel: number;
  paidFull: number;
  Installments: number;
  ammountRecovered: number;
}
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  inlinePlugin: any;
  textPlugin: any;
  totals: StationTotals[] = [
    {
      float: 12000000,
      payments: 400000,
      loans: 300000,
      clients: 1340,
      newClients: 60,
      stages: 27,
      fuelClients: 35,
      clentsSaved: 12,
      defaulters: 30,
      debtsRecouvered: 13,
      paidFuel: 34,
      paidFull: 33,
      Installments: 13,
      ammountRecovered: 6000000
    }
  ];
  constructor() { }

  ngOnInit(): void {
// inline plugin
  }
}



