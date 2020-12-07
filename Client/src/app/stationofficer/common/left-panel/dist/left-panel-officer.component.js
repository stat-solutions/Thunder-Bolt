"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.LeftPanelOfficerComponent = void 0;
var core_1 = require("@angular/core");
// tslint:disable: deprecation
var LeftPanelOfficerComponent = /** @class */ (function () {
    function LeftPanelOfficerComponent(layoutService) {
        this.layoutService = layoutService;
        this.imageurl = '../../../../assets/avatar3.jpg';
    }
    LeftPanelOfficerComponent.prototype.isActive = function (item) {
        return this.selected === item;
    };
    LeftPanelOfficerComponent.prototype.onItemSelect = function (item) {
        this.selected = this.selected === item ? item : item;
    };
    LeftPanelOfficerComponent.prototype.onSubItemSelect = function (item) {
        event.stopPropagation();
        this.selected = this.selected === item ? item : item;
    };
    LeftPanelOfficerComponent.prototype.onResizeHeight = function (event) {
        this.asidebarHeight = window.innerHeight;
    };
    LeftPanelOfficerComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.layoutService.setAsidebarHeightCast.subscribe(function (setSidebarHeight) { return (_this.asidebarHeight = setSidebarHeight); });
        this.title = 'Navigation';
        this.menuList = [
            {
                name: 'Dashboard',
                icon: 'fas fa-tachometer-alt',
                url: '/stationofficer/dashboard'
            },
            {
                name: 'Lend',
                icon: 'fas fa-balance-scale-left',
                url: '/stationofficer/lend'
            },
            {
                name: 'Pay',
                icon: 'fas fa-exchange-alt',
                url: '/stationofficer/pay'
            },
            // {
            //   name: 'Adjustments',
            //   icon: 'fas fa-tools',
            //   url: '/stationofficer/adjustments',
            //   subMenu: [
            //     {
            //       name: 'Reduce Rate',
            //       icon: 'fas fa-balance-scale',
            //       url: '/stationofficer/adjustments/reduceinterestrate'
            //     },
            //     {
            //       name: 'Reverse Principle',
            //       icon: 'fas fa-balance-scale',
            //       url: '/stationofficer/adjustments/reverse-principle'
            //     },
            //     {
            //       name: 'Interest Rate',
            //       icon: 'fas fa-balance-scale',
            //       url: '/stationofficer/adjustments/setinterestrate'
            //     },
            //     {
            //       name: 'Loan Limit',
            //       icon: 'fas fa-balance-scale',
            //       url: '/stationofficer/adjustments/setloanlimit'
            //     },
            //     {
            //       name: 'Waive Interest',
            //       icon: 'fas fa-balance-scale',
            //       url: '/stationofficer/adjustments/waive-interest'
            //     },
            //     {
            //       name: 'Writeoff Principle',
            //       icon: 'fas fa-balance-scale',
            //       url: '/stationofficer/adjustments/writeoffprinciple'
            //     }
            //   ]
            // },
            // {
            //   name: 'Enroll',
            //   icon: 'fas fa-user',
            //   url: '/stationofficer/enroll',
            //   subMenu: [
            //     {
            //       name: 'Enroll Client',
            //       icon: 'fas fa-user',
            //       url: '/stationofficer/enroll/enrollclient'
            //     },
            //     {
            //       name: 'Enroll Stage',
            //       icon: 'fas fa-parking',
            //       url: '/stationofficer/enroll/enrollstage'
            //     }
            //   ]
            // },
            {
                name: 'Savings',
                icon: 'fas fa-piggy-bank',
                url: '/stationofficer/savings',
                subMenu: [
                    {
                        name: 'Deposit',
                        icon: 'fas fa-piggy-bank',
                        url: '/stationofficer/savings/deposit'
                    },
                    {
                        name: 'Withdraw',
                        icon: 'fas fa-piggy-bank',
                        url: '/stationofficer/savings/withdraw'
                    }
                ]
            },
            {
                name: 'Reports',
                icon: 'fas fa-chart-line',
                url: '/stationofficer/reports',
                subMenu: [
                    {
                        name: 'Cash Ledger',
                        icon: 'fas fa-clipboard-list',
                        url: '/stationofficer/reports/cashledger'
                    },
                    {
                        name: 'Loans Report',
                        icon: 'fas fa-clipboard-list',
                        url: '/stationofficer/reports/loansreport'
                    }
                ]
            },
            {
                name: 'Profile',
                icon: 'fas fa-user-cog',
                url: '/stationofficer/profile'
            }
        ];
    };
    __decorate([
        core_1.Input()
    ], LeftPanelOfficerComponent.prototype, "navLayout");
    __decorate([
        core_1.Input()
    ], LeftPanelOfficerComponent.prototype, "defaultNavbar");
    __decorate([
        core_1.Input()
    ], LeftPanelOfficerComponent.prototype, "toggleNavbar");
    __decorate([
        core_1.Input()
    ], LeftPanelOfficerComponent.prototype, "toggleStatus");
    __decorate([
        core_1.Input()
    ], LeftPanelOfficerComponent.prototype, "navbarEffect");
    __decorate([
        core_1.Input()
    ], LeftPanelOfficerComponent.prototype, "deviceType");
    __decorate([
        core_1.Input()
    ], LeftPanelOfficerComponent.prototype, "headerColorTheme");
    __decorate([
        core_1.Input()
    ], LeftPanelOfficerComponent.prototype, "navbarColorTheme");
    __decorate([
        core_1.Input()
    ], LeftPanelOfficerComponent.prototype, "activeNavColorTheme");
    __decorate([
        core_1.HostListener('window:resize', ['$event'])
    ], LeftPanelOfficerComponent.prototype, "onResizeHeight");
    LeftPanelOfficerComponent = __decorate([
        core_1.Component({
            selector: 'app-left-panel',
            templateUrl: './left-panel-officer.component.html',
            styleUrls: ['./left-panel-officer.component.scss']
        })
    ], LeftPanelOfficerComponent);
    return LeftPanelOfficerComponent;
}());
exports.LeftPanelOfficerComponent = LeftPanelOfficerComponent;
