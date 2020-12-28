"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.LeftPanelTownComponent = void 0;
var core_1 = require("@angular/core");
// tslint:disable: deprecation
var LeftPanelTownComponent = /** @class */ (function () {
    function LeftPanelTownComponent(layoutService) {
        this.layoutService = layoutService;
        this.imageurl = '../../../../assets/avatar3.jpg';
    }
    LeftPanelTownComponent.prototype.isActive = function (item) {
        return this.selected === item;
    };
    LeftPanelTownComponent.prototype.onItemSelect = function (item) {
        this.selected = this.selected === item ? item : item;
    };
    LeftPanelTownComponent.prototype.onSubItemSelect = function (item) {
        event.stopPropagation();
        this.selected = this.selected === item ? item : item;
    };
    LeftPanelTownComponent.prototype.onResizeHeight = function (event) {
        this.asidebarHeight = window.innerHeight;
    };
    LeftPanelTownComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.layoutService.setAsidebarHeightCast.subscribe(function (setSidebarHeight) { return (_this.asidebarHeight = setSidebarHeight); });
        this.title = 'Navigation';
        this.menuList = [
            {
                name: 'Dashboard',
                icon: 'fas fa-tachometer-alt',
                url: '/townmanagement/dashboard'
            },
            {
                name: 'Select Stations',
                icon: 'fas fa-gas-pump',
                url: '/townmanagement/createstation'
            },
            {
                name: 'Micro Loan',
                icon: 'fas fa-gas-pump',
                url: '/townmanagement/microloan'
            },
            {
                name: 'Enroll',
                icon: 'fas fa-user-plus',
                url: '/townmanagement/enroll',
                subMenu: [
                    {
                        name: 'Enroll Client',
                        icon: 'fas fa-user',
                        url: '/townmanagement/enroll/enrollclient'
                    },
                    {
                        name: 'Enroll Stage',
                        icon: 'fas fa-parking',
                        url: '/townmanagement/enroll/enrollstage'
                    },
                    {
                        name: 'Cluster & Taxi Park',
                        icon: 'fas fa-parking',
                        url: '/townmanagement/enroll/clustertaxipark'
                    },
                    {
                        name: 'Edit Client',
                        icon: 'fas fa-user',
                        url: '/townmanagement/enroll/editclient'
                    },
                    {
                        name: 'Edit Stage',
                        icon: 'fas fa-parking',
                        url: '/townmanagement/enroll/editstage'
                    },
                ]
            },
            {
                name: 'Reports',
                icon: 'fas fa-chart-line',
                url: '/townmanagement/reports',
                subMenu: [
                    {
                        name: 'Cash Ledger',
                        icon: 'fas fa-clipboard-list',
                        url: '/townmanagement/reports/cashledger'
                    },
                    {
                        name: 'Loans Ledger',
                        icon: 'fas fa-clipboard-list',
                        url: '/townmanagement/reports/loansledger'
                    },
                    {
                        name: 'Payments Ledger',
                        icon: 'fas fa-clipboard-list',
                        url: '/townmanagement/reports/paidledger'
                    }
                ]
            },
            {
                name: 'Profile',
                icon: 'fas fa-user-cog',
                url: '/townmanagement/profile'
            }
        ];
    };
    __decorate([
        core_1.Input()
    ], LeftPanelTownComponent.prototype, "navLayout");
    __decorate([
        core_1.Input()
    ], LeftPanelTownComponent.prototype, "defaultNavbar");
    __decorate([
        core_1.Input()
    ], LeftPanelTownComponent.prototype, "toggleNavbar");
    __decorate([
        core_1.Input()
    ], LeftPanelTownComponent.prototype, "toggleStatus");
    __decorate([
        core_1.Input()
    ], LeftPanelTownComponent.prototype, "navbarEffect");
    __decorate([
        core_1.Input()
    ], LeftPanelTownComponent.prototype, "deviceType");
    __decorate([
        core_1.Input()
    ], LeftPanelTownComponent.prototype, "headerColorTheme");
    __decorate([
        core_1.Input()
    ], LeftPanelTownComponent.prototype, "navbarColorTheme");
    __decorate([
        core_1.Input()
    ], LeftPanelTownComponent.prototype, "activeNavColorTheme");
    __decorate([
        core_1.HostListener('window:resize', ['$event'])
    ], LeftPanelTownComponent.prototype, "onResizeHeight");
    LeftPanelTownComponent = __decorate([
        core_1.Component({
            selector: 'app-left-panel',
            templateUrl: './left-panel-town.component.html',
            styleUrls: ['./left-panel-town.component.scss']
        })
    ], LeftPanelTownComponent);
    return LeftPanelTownComponent;
}());
exports.LeftPanelTownComponent = LeftPanelTownComponent;
