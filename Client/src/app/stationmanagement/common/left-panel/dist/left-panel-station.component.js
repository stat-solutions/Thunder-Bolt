"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.LeftPanelStationComponent = void 0;
var core_1 = require("@angular/core");
// tslint:disable: deprecation
var LeftPanelStationComponent = /** @class */ (function () {
    function LeftPanelStationComponent(layoutService) {
        this.layoutService = layoutService;
        this.imageurl = '../../../../assets/avatar3.jpg';
    }
    LeftPanelStationComponent.prototype.isActive = function (item) {
        return this.selected === item;
    };
    LeftPanelStationComponent.prototype.onItemSelect = function (item) {
        this.selected = this.selected === item ? item : item;
    };
    LeftPanelStationComponent.prototype.onSubItemSelect = function (item) {
        event.stopPropagation();
        this.selected = this.selected === item ? item : item;
    };
    LeftPanelStationComponent.prototype.onResizeHeight = function (event) {
        this.asidebarHeight = window.innerHeight;
    };
    LeftPanelStationComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.layoutService.setAsidebarHeightCast.subscribe(function (setSidebarHeight) { return (_this.asidebarHeight = setSidebarHeight); });
        this.title = 'Navigation';
        this.menuList = [
            {
                name: 'Dashboard',
                icon: 'fas fa-tachometer-alt',
                url: '/stationmanagement/dashboard'
            },
            {
                name: 'Reports',
                icon: 'fas fa-chart-line',
                url: '/stationmanagement/reports',
                subMenu: [
                    {
                        name: 'Borrowed Ledger',
                        icon: 'fas fa-chart-line',
                        url: '/stationmanagement/reports/borrowedledger'
                    },
                    {
                        name: 'Cash Ledger',
                        icon: 'fas fa-chart-line',
                        url: '/stationmanagement/reports/cashledger'
                    },
                    {
                        name: 'Paid Ledger',
                        icon: 'fas fa-chart-line',
                        url: '/stationmanagement/reports/paidledger'
                    },
                ]
            },
            {
                name: 'Profile',
                icon: 'fas fa-user-cog',
                url: '/stationmanagement/profile'
            },
        ];
    };
    __decorate([
        core_1.Input()
    ], LeftPanelStationComponent.prototype, "navLayout");
    __decorate([
        core_1.Input()
    ], LeftPanelStationComponent.prototype, "defaultNavbar");
    __decorate([
        core_1.Input()
    ], LeftPanelStationComponent.prototype, "toggleNavbar");
    __decorate([
        core_1.Input()
    ], LeftPanelStationComponent.prototype, "toggleStatus");
    __decorate([
        core_1.Input()
    ], LeftPanelStationComponent.prototype, "navbarEffect");
    __decorate([
        core_1.Input()
    ], LeftPanelStationComponent.prototype, "deviceType");
    __decorate([
        core_1.Input()
    ], LeftPanelStationComponent.prototype, "headerColorTheme");
    __decorate([
        core_1.Input()
    ], LeftPanelStationComponent.prototype, "navbarColorTheme");
    __decorate([
        core_1.Input()
    ], LeftPanelStationComponent.prototype, "activeNavColorTheme");
    __decorate([
        core_1.HostListener('window:resize', ['$event'])
    ], LeftPanelStationComponent.prototype, "onResizeHeight");
    LeftPanelStationComponent = __decorate([
        core_1.Component({
            selector: 'app-left-panel',
            templateUrl: './left-panel-station.component.html',
            styleUrls: ['./left-panel-station.component.scss']
        })
    ], LeftPanelStationComponent);
    return LeftPanelStationComponent;
}());
exports.LeftPanelStationComponent = LeftPanelStationComponent;
