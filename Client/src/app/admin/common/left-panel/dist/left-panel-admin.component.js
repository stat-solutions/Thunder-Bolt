"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.LeftPanelAdminComponent = void 0;
var core_1 = require("@angular/core");
// tslint:disable: deprecation
var LeftPanelAdminComponent = /** @class */ (function () {
    function LeftPanelAdminComponent(layoutService) {
        this.layoutService = layoutService;
        this.imageurl = '../../../../assets/avatar3.jpg';
    }
    LeftPanelAdminComponent.prototype.isActive = function (item) {
        return this.selected === item;
    };
    LeftPanelAdminComponent.prototype.onItemSelect = function (item) {
        this.selected = this.selected === item ? item : item;
    };
    LeftPanelAdminComponent.prototype.onSubItemSelect = function (item) {
        event.stopPropagation();
        this.selected = this.selected === item ? item : item;
    };
    LeftPanelAdminComponent.prototype.onResizeHeight = function (event) {
        this.asidebarHeight = window.innerHeight;
    };
    LeftPanelAdminComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.layoutService.setAsidebarHeightCast.subscribe(function (setSidebarHeight) { return (_this.asidebarHeight = setSidebarHeight); });
        this.title = 'Navigation';
        this.menuList = [
            {
                name: 'Dashboard',
                icon: 'fas fa-tachometer-alt',
                url: '/admin/dashboard'
            },
            {
                name: 'Company',
                icon: 'fas fa-briefcase',
                url: '/admin/companysetup'
            },
            {
                name: 'Business Units',
                icon: 'fa fa-tools',
                url: '/admin/businessunits'
            },
            {
                name: 'Approvals',
                icon: 'fas fa-users-cog',
                url: '/admin/approvalsetup'
            },
            // {
            //   name: 'Approve Users',
            //   icon: 'fas fa-user-check',
            //   url: '/admin/approveusers',
            // },
            {
                name: 'Profile',
                icon: 'fas fa-user-cog',
                url: '/admin/adminprofile'
            },
        ];
    };
    __decorate([
        core_1.Input()
    ], LeftPanelAdminComponent.prototype, "navLayout");
    __decorate([
        core_1.Input()
    ], LeftPanelAdminComponent.prototype, "defaultNavbar");
    __decorate([
        core_1.Input()
    ], LeftPanelAdminComponent.prototype, "toggleNavbar");
    __decorate([
        core_1.Input()
    ], LeftPanelAdminComponent.prototype, "toggleStatus");
    __decorate([
        core_1.Input()
    ], LeftPanelAdminComponent.prototype, "navbarEffect");
    __decorate([
        core_1.Input()
    ], LeftPanelAdminComponent.prototype, "deviceType");
    __decorate([
        core_1.Input()
    ], LeftPanelAdminComponent.prototype, "headerColorTheme");
    __decorate([
        core_1.Input()
    ], LeftPanelAdminComponent.prototype, "navbarColorTheme");
    __decorate([
        core_1.Input()
    ], LeftPanelAdminComponent.prototype, "activeNavColorTheme");
    __decorate([
        core_1.HostListener('window:resize', ['$event'])
    ], LeftPanelAdminComponent.prototype, "onResizeHeight");
    LeftPanelAdminComponent = __decorate([
        core_1.Component({
            selector: 'app-left-panel',
            templateUrl: './left-panel-admin.component.html',
            styleUrls: ['./left-panel-admin.component.scss']
        })
    ], LeftPanelAdminComponent);
    return LeftPanelAdminComponent;
}());
exports.LeftPanelAdminComponent = LeftPanelAdminComponent;
