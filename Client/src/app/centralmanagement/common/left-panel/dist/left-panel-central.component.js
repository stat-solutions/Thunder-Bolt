"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.LeftPanelCentralComponent = void 0;
var core_1 = require("@angular/core");
// tslint:disable: deprecation
var LeftPanelCentralComponent = /** @class */ (function () {
    function LeftPanelCentralComponent(layoutService) {
        this.layoutService = layoutService;
        this.imageurl = '../../../../assets/avatar3.jpg';
    }
    LeftPanelCentralComponent.prototype.isActive = function (item) {
        return this.selected === item;
    };
    LeftPanelCentralComponent.prototype.onItemSelect = function (item) {
        this.selected = this.selected === item ? item : item;
    };
    LeftPanelCentralComponent.prototype.onSubItemSelect = function (item) {
        event.stopPropagation();
        this.selected = this.selected === item ? item : item;
    };
    LeftPanelCentralComponent.prototype.onResizeHeight = function (event) {
        this.asidebarHeight = window.innerHeight;
    };
    LeftPanelCentralComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.layoutService.setAsidebarHeightCast.subscribe(function (setSidebarHeight) { return (_this.asidebarHeight = setSidebarHeight); });
        this.title = 'Navigation';
        this.menuList = [
            {
                name: 'Dashboard',
                icon: 'fas fa-tachometer-alt',
                url: '/centralmanagement/dashboard'
            },
            {
                name: 'Creations',
                icon: 'fas fa-wrench',
                url: '/centralmanagement/create'
            },
            {
                name: 'Select the Area',
                icon: 'fas fa-user-check',
                url: '/centralmanagement/selectarea'
            },
            {
                name: 'Managers',
                icon: 'fas fa-user-check',
                url: '/centralmanagement/managers',
                subMenu: [
                    {
                        name: 'Area Managers',
                        icon: 'fas fa-credit-card',
                        url: '/centralmanagement/managers/areamanagers'
                    },
                    {
                        name: 'Town Managers',
                        icon: 'fas fa-credit-card',
                        url: '/centralmanagement/managers/townmanagers'
                    },
                    {
                        name: 'Station Managers',
                        icon: 'fas fa-credit-card',
                        url: '/centralmanagement/managers/stationmanagers'
                    },
                ]
            },
            {
                name: 'Creation Approvals',
                icon: 'fas fa-cogs',
                url: '/centralmanagement/approve'
            },
            {
                name: 'Transactions',
                icon: 'fas fa-tools',
                url: '/centralmanagement/transactions',
                subMenu: [
                    {
                        name: 'Loans',
                        icon: 'fas fa-credit-card',
                        url: '/centralmanagement/transactions/loans'
                    },
                    {
                        name: 'Approvals',
                        icon: 'fas fa-cogs',
                        url: '/centralmanagement/transactions/approve'
                    },
                    {
                        name: 'Float',
                        icon: 'fas fa-credit-card',
                        url: '/centralmanagement/transactions/float'
                    },
                ]
            },
            {
                name: 'Reports',
                icon: 'fas fa-chart-line',
                url: '/centralmanagement/reports',
                subMenu: [
                    {
                        name: 'Areas',
                        icon: 'fas fa-file',
                        url: '/centralmanagement/reports/areas'
                    },
                    {
                        name: 'Towns',
                        icon: 'fas fa-file',
                        url: '/centralmanagement/reports/towns'
                    },
                    {
                        name: 'Stations',
                        icon: 'fas fa-file',
                        url: '/centralmanagement/reports/stations'
                    },
                    {
                        name: 'Clients',
                        icon: 'fas fa-file',
                        url: '/centralmanagement/reports/clients'
                    },
                    {
                        name: 'Users',
                        icon: 'fas fa-file',
                        url: '/centralmanagement/reports/users'
                    },
                ]
            },
            {
                name: 'Approve Users',
                icon: 'fas fa-user-check',
                url: '/centralmanagement/approveusers'
            },
            {
                name: 'Profile',
                icon: 'fas fa-user-cog',
                url: '/centralmanagement/profile',
                subMenu: [
                    {
                        name: 'Personal Info',
                        icon: 'fas fa-user',
                        url: '/centralmanagement/profile/personalprofile'
                    },
                    {
                        name: 'Set PIN',
                        icon: 'fas fa-lock',
                        url: '/centralmanagement/profile/setpassword'
                    },
                ]
            },
        ];
    };
    __decorate([
        core_1.Input()
    ], LeftPanelCentralComponent.prototype, "navLayout");
    __decorate([
        core_1.Input()
    ], LeftPanelCentralComponent.prototype, "defaultNavbar");
    __decorate([
        core_1.Input()
    ], LeftPanelCentralComponent.prototype, "toggleNavbar");
    __decorate([
        core_1.Input()
    ], LeftPanelCentralComponent.prototype, "toggleStatus");
    __decorate([
        core_1.Input()
    ], LeftPanelCentralComponent.prototype, "navbarEffect");
    __decorate([
        core_1.Input()
    ], LeftPanelCentralComponent.prototype, "deviceType");
    __decorate([
        core_1.Input()
    ], LeftPanelCentralComponent.prototype, "headerColorTheme");
    __decorate([
        core_1.Input()
    ], LeftPanelCentralComponent.prototype, "navbarColorTheme");
    __decorate([
        core_1.Input()
    ], LeftPanelCentralComponent.prototype, "activeNavColorTheme");
    __decorate([
        core_1.HostListener('window:resize', ['$event'])
    ], LeftPanelCentralComponent.prototype, "onResizeHeight");
    LeftPanelCentralComponent = __decorate([
        core_1.Component({
            selector: 'app-left-panel',
            templateUrl: './left-panel-central.component.html',
            styleUrls: ['./left-panel-central.component.scss']
        })
    ], LeftPanelCentralComponent);
    return LeftPanelCentralComponent;
}());
exports.LeftPanelCentralComponent = LeftPanelCentralComponent;
