"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.DashboardComponent = void 0;
var core_1 = require("@angular/core");
var DashboardComponent = /** @class */ (function () {
    function DashboardComponent(messagingService) {
        this.messagingService = messagingService;
        this.lineChartData = [
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
                data: [20, 59, 73, 61, 56, 40, 70]
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
                data: [10, 39, 53, 31, 36, 40, 50]
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
                data: [35, 79, 53, 31, 36, 40, 60]
            },
        ];
        this.lineChartLabels = ['SUN', 'MON', 'TUE', 'WED', 'THUR', 'FRI', 'SAT'];
        this.lineChartOptions = {
            responsive: true
        };
        this.lineChartLegend = true;
        this.lineChartType = 'line';
        this.totals = [
            { areas: 24, towns: 40, stations: 136, clients: 200 }
        ];
        this.creationApprovals = [
            { type: 'Area Creation', total: 17 },
            { type: 'Town Creation', total: 10 },
            { type: 'Station Creation', total: 23 },
            { type: 'Cluster Creation', total: 15 },
        ];
        this.transactionApprovals = [
            { type: 'Floats', total: 23 },
            { type: 'Interests Rates', total: 8 },
            { type: 'Reversing', total: 7 },
            { type: 'Waiving', total: 15 },
            { type: 'Withdraws', total: 15 },
            { type: 'Writing Off', total: 6 }
        ];
        this.topClients = [
            { ID: 'AD120', name: 'Kiwanuka Mahd' },
            { ID: 'AD010', name: 'Katumba Mark' },
            { ID: 'AD110', name: 'Musoke John' },
            { ID: 'AD020', name: 'Muwonge Mahd' },
            { ID: 'AD123', name: 'Tom Giraka' }
        ];
        this.topUsers = [
            { name: 'Kiwanuka Mahd', place: 'Wakiso East' },
            { name: 'Katumba Mark', place: 'Central East' },
            { name: 'Musoke John', place: 'Wakiso West' },
            { name: 'Muwonge Mahd', place: 'Gomba East' },
            { name: 'Tom Giraka', place: 'Kyagwe East' }
        ];
        this.topStations = [
            { name: 'Ndeba', town: 'kampala', area: 'Central Region' },
            { name: 'Matugga', town: 'Mbale', area: 'Eastern Region' },
            { name: 'Kiira', town: 'Jinja', area: 'Central Region' },
            { name: 'Katwe', town: 'Kisoro', area: 'Western Region' },
            { name: 'Kibuye', town: 'kampala', area: 'Central Region' },
        ];
    }
    DashboardComponent.prototype.ngOnInit = function () {
        // inline plugin
        this.messagingService.requestPermission();
        this.messagingService.receiveMessage();
        this.message = this.messagingService.currentMessage;
        this.textPlugin = [{
                id: 'textPlugin',
                beforeDraw: function (chart) {
                    var width = chart.chart.width;
                    var height = chart.chart.height;
                    var ctx = chart.chart.ctx;
                    ctx.restore();
                    var fontSize = (height / 114).toFixed(2);
                    ctx.font = fontSize + "em sans-serif";
                    ctx.textBaseline = 'middle';
                    var text = '';
                    var textX = Math.round((width - ctx.measureText(text).width) / 2);
                    var textY = height / 2;
                    ctx.fillText(text, textX, textY);
                    ctx.save();
                }
            }];
        this.inlinePlugin = this.textPlugin;
    };
    DashboardComponent = __decorate([
        core_1.Component({
            selector: 'app-dashboard',
            templateUrl: './dashboard.component.html',
            styleUrls: ['./dashboard.component.scss']
        })
    ], DashboardComponent);
    return DashboardComponent;
}());
exports.DashboardComponent = DashboardComponent;
