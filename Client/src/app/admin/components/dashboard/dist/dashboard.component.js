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
    function DashboardComponent(fb) {
        this.fb = fb;
        this.sideBarChanged = true;
        this.bussinessUnits = [
            { unitName: 'Fuel Bussiness' },
            { unitName: 'Hospital Bussiness' },
            { unitName: 'Hospital Bussiness' },
            { unitName: 'Hospital Bussiness' },
            { unitName: 'Hospital Bussiness' },
            { unitName: 'Hospital Bussiness' },
            { unitName: 'Hospital Bussiness' },
            { unitName: 'Hospital Bussiness' }
        ];
        this.approvals = [
            { name: 'Area Creation', level: 3 },
            { name: 'Town Creation', level: 1 },
            // {name: "Town Creation", level: 1},
            // {name: "Town Creation", level: 1},
            // {name: "Town Creation", level: 1},
            // {name: "Town Creation", level: 1},
            // {name: "Town Creation", level: 1},
            // {name: "Town Creation", level: 1},
            // {name: "Town Creation", level: 1},
            // {name: "Town Creation", level: 1},
            // {name: "Town Creation", level: 1},
            { name: 'Stage Creation', level: 2 },
            { name: 'Station Creation', level: 4 },
        ];
    }
    DashboardComponent.prototype.ngOnInit = function () {
        this.toggleSideBar();
    };
    DashboardComponent.prototype.toggleSideBar = function () {
        this.sideBarChanged = !this.sideBarChanged;
        // this.sharedService.emitChange(this.sideBarChanged);
    };
    DashboardComponent = __decorate([
        core_1.Component({
            selector: 'app-admin',
            templateUrl: './dashboard.component.html',
            styleUrls: ['./dashboard.component.scss']
        })
    ], DashboardComponent);
    return DashboardComponent;
}());
exports.DashboardComponent = DashboardComponent;
