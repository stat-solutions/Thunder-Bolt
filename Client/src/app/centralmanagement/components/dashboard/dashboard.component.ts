import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { TabsetComponent } from 'ngx-bootstrap/tabs';
import { AreaApprovals } from '../approvals/approve-areas/approve-areas.component';
import { MessagingService } from 'src/app/shared/services/other-services/messaging.service';
import { OthersService } from 'src/app/shared/services/other-services/others.service';
import { AuthServiceService } from 'src/app/shared/services/auth-service.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  message: any;
  lineChartData: Chart.ChartDataSets[] = [
    {
      label: 'Clients',
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
      pointHoverBorderWidth: 1,
      pointRadius: 1,
      pointHitRadius: 10,
      data: [44, 56, 55, 66, 33, 44, 66, 88, 98, 90, 67, 45]
    },
    {
      label: 'Savings',
      fill: false,
      lineTension: 0.1,
      backgroundColor: 'rgba(75,192,192,0.4)',
      borderColor: 'rgba(75,192,192,1)',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: 'rgba(75,192,190,1)',
      pointBackgroundColor: '#fff',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'rgba(75,192,192,1)',
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      pointHoverBorderWidth: 1,
      pointRadius: 1,
      pointHitRadius: 10,
      data: [20, 59, 73, 61, 56, 40, 70, 23, 45, 67, 89, 98]
    },
    {
      label: 'Withdraws',
      fill: false,
      lineTension: 0.1,
      backgroundColor: 'rgba(75,192,192,0.4)',
      borderColor: 'rgba(75,192,192,1)',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: 'rgba(75,190,190,1)',
      pointBackgroundColor: '#fff',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'rgba(75,192,192,1)',
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      pointHoverBorderWidth: 1,
      pointRadius: 1,
      pointHitRadius: 10,
      data: [10, 39, 53, 31, 36, 40, 50, 98, 76, 54, 32, 12]
    },
    {
      label: 'Loans',
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
      pointHoverBorderWidth: 1,
      pointRadius: 1,
      pointHitRadius: 10,
      data: [35, 79, 53, 31, 36, 40, 60, 56, 57, 24, 35, 78]
    },
  ];
  lineChartLabels: Array<any> = [ '7am', '8am', '9am', '10am', '11am', '12', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm'];
  lineChartOptions: any = {
    responsive: true
  };
  lineChartLegend = true;
  lineChartType = 'line';
  inlinePlugin: any;
  textPlugin: any;
  totals = [
    {areas: null, towns: null, stations: null, clients: null}
  ];
  creationApprovals: Array<any> = [
    {type: 'Area Creation', total: 17},
    {type: 'Town Creation', total: 10},
    {type: 'Station Creation', total: 2376},
    {type: 'Cluster Creation', total: 155},
  ];
  transactionApprovals: Array<any> = [
    {type: 'Floats', total: 23},
    {type: 'Interests Rates', total: 8},
    {type: 'Reversing', total: 7},
    {type: 'Waiving', total: 15},
    {type: 'Withdraws', total: 15},
    {type: 'Writing Off', total: 6}
  ];
  topClients: Array<any> = [
    {ID: 'AD120', name: 'Kiwanuka Mahd'},
    {ID: 'AD010', name: 'Katumba Mark'},
    {ID: 'AD110', name: 'Musoke John'},
    {ID: 'AD020', name: 'Muwonge Mahd'},
    {ID: 'AD123', name: 'Tom Giraka'}
  ];
  topUsers: Array<any> = [
    {name: 'Kiwanuka Mahd', place: 'Wakiso East'},
    {name: 'Katumba Mark' , place: 'Central East'},
    {name: 'Musoke John'  , place: 'Wakiso West'},
    {name: 'Muwonge Mahd' , place: 'Gomba East'},
    {name: 'Tom Giraka'   , place: 'Kyagwe East'}
  ];
  topStations: Array<any> = [
    {name: 'Ndeba', town: 'kampala', area: 'Central Region'},
    {name: 'Matugga', town: 'Mbale', area: 'Eastern Region'},
    {name: 'Kiira', town: 'Jinja', area: 'Central Region'},
    {name: 'Katwe', town: 'Kisoro', area: 'Western Region'},
    {name: 'Kibuye', town: 'kampala', area: 'Central Region'},
  ];
  numberOfSms: any;

  constructor(private messagingService: MessagingService, private others: OthersService, private authService: AuthServiceService) { }

  ngOnInit(): void {
// inline plugin
    this.messagingService.requestPermission();
    this.messagingService.receiveMessage();
    this.message = this.messagingService.currentMessage;
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
      const text = '';
      const textX = Math.round((width - ctx.measureText(text).width) / 2);
      const textY = height / 2;
      ctx.fillText(text, textX, textY);
      ctx.save();
    }
}];

    this.inlinePlugin = this.textPlugin;
    this.getSms();
    this.authService.loggedInUserInfo();
    this.others.getAllTheAreaLocationTotal().subscribe(res => this.totals[0].areas = res);
    this.others.getAllTheTownLocationTotal().subscribe(res => this.totals[0].towns = res);
    this.others.getAllTheStationLocationTotal().subscribe(res => this.totals[0].stations = res);
    // this.others.getAllTheTownLocationTotals().subscribe(res => this.totals[0].towns = res);
}

getSms(): any {
  this.others.testApi().subscribe(
    x => {
      this.numberOfSms = x;
      console.log(this.numberOfSms);
    }
  );
}

}
