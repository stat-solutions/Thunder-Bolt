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
                name: this.userName,
                icon: 'far fa-user-circle',
                url: '/none',
                image: this.imageurl
            },
            {
                name: 'Dashboard',
                icon: 'fas fa-tachometer-alt',
                url: '/townmanagement/dashboard'
            },
            {
                name: 'Settings',
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
