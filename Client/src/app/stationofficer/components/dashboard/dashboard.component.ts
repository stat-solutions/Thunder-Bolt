import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';

export interface Totals {
  areas: number,
  towns: number,
  stations: number,
  clients: number
}
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  lineChartData: Chart.ChartDataSets[] = [
    {
      label: 'My First dataset',
      fill: false,
      lineTension: 0.1,
      backgroundColor: 'rgba(75,192,192,0.4)',
      borderColor: 'rgba(75,192,192,1)',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: 'rgba(75,192,192,1)',
      pointBackgroundColor: '#fff',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'rgba(75,192,192,1)',
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: [6, 59, 80, 21, 56, 0, 70],
    },
  ];
  lineChartLabels: Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  lineChartOptions: any = {
    responsive: true
  };
   lineChartLegend = true;
  lineChartType = 'line';
  inlinePlugin: any;
  textPlugin: any;
  totals: Totals[] = [
    {areas: 24, towns: 40, stations: 136, clients: 200}
  ];
  creationApprovals: Array<any> = [
    {type: "Area Creation", total: 17},
    {type: "Town Creation", total: 10},
    {type: "Station Creation", total: 23},
    {type: "Cluster Creation", total: 15},
  ];
  transactionApprovals: Array<any> = [
    {type: "Floats", total: 23},
    {type: "Interests Rates", total: 8},
    {type: "Reversing", total: 7},
    {type: "Waiving", total: 15},
    {type: "Withdraws", total: 15},
    {type: "Writing Off", total: 6}
  ];
  topClients: Array<any> = [
    {ID: "AD120", name: "Kiwanuka Mahd"},
    {ID: "AD010", name: "Katumba Mark"},
    {ID: "AD110", name: "Musoke John"},
    {ID: "AD020", name: "Muwonge Mahd"},
    {ID: "AD123", name: "Tom Giraka"}
  ];
  topUsers: Array<any> = [
    {name: "Kiwanuka Mahd", place: "Wakiso East"},
    {name: "Katumba Mark" , place: "Central East"},
    {name: "Musoke John"  , place: "Wakiso West"},
    {name: "Muwonge Mahd" , place: "Gomba East"},
    {name: "Tom Giraka"   , place: "Kyagwe East"}
  ];
  topStations: Array<any> = [
    {name: "Ndeba", town: "kampala", area: "Central Region"},
    {name: "Matugga", town: "Mbale", area: "Eastern Region"},
    {name: "Kiira", town: "Jinja", area: "Central Region"},
    {name: "Katwe", town: "Kisoro", area: "Western Region"},
    {name: "Kibuye", town: "kampala", area: "Central Region"},
  ];

  constructor() { }

  ngOnInit() {
// inline plugin
this.textPlugin = [{
  id: 'textPlugin',
  beforeDraw(chart: any): any {
    const width = chart.chart.width;
    const height = chart.chart.height;
    const ctx = chart.chart.ctx;
    ctx.restore();
    const fontSize = (height / 114).toFixed(2);
    ctx.font = `${fontSize}em sans-serif`;
    ctx.textBaseline = 'middle';
    const text = 'Text Plugin';
    const textX = Math.round((width - ctx.measureText(text).width) / 2);
    const textY = height / 2;
    ctx.fillText(text, textX, textY);
    ctx.save();
  }
}];

this.inlinePlugin = this.textPlugin;
}

}
