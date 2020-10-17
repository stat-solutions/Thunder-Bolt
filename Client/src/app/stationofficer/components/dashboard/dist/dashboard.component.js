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
        this.totals = [
            {
                float: 12000000,
                payments: 400000,
                loans: 300000,
                clients: 340,
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
        this.title = 'push-notification';
    }
    DashboardComponent.prototype.ngOnInit = function () {
        // inline plugin
        this.messagingService.requestPermission();
        this.messagingService.receiveMessage();
        this.message = this.messagingService.currentMessage;
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
