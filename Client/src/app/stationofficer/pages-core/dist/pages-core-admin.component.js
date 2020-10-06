"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.PagesCoreAdminComponent = void 0;
var core_1 = require("@angular/core");
var PagesCoreAdminComponent = /** @class */ (function () {
    function PagesCoreAdminComponent(layoutService) {
        this.layoutService = layoutService;
    }
    PagesCoreAdminComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.layoutService.checkWindowWidth(window.innerWidth);
        this.layoutService.navLayoutCast.subscribe(function (navlayout) { return (_this.setNavLayout = navlayout); });
        this.layoutService.dfNavbarCast.subscribe(function (dfNavbar) { return (_this.setDefaultNavbar = dfNavbar); });
        this.layoutService.toggleNavbarCast.subscribe(function (tNavbar) { return (_this.setToggleNavbar = tNavbar); });
        this.layoutService.tStatusCast.subscribe(function (tStatus) { return (_this.setToggleStatus = tStatus); });
        this.layoutService.nvEffectCast.subscribe(function (nvEffect) { return (_this.setVerticalNavbarEffect = nvEffect); });
        this.layoutService.headerThemeCast.subscribe(function (headerTheme) { return (_this.setHeaderColorTheme = headerTheme); });
        this.layoutService.leftHeaderThemeCast.subscribe(function (leftHeaderTheme) { return (_this.setLeftHeaderColorTheme = leftHeaderTheme); });
        this.layoutService.navbarThemeCast.subscribe(function (navbarTheme) { return (_this.setNavbarColorTheme = navbarTheme); });
        this.layoutService.activeNavThemeCast.subscribe(function (activeNavTheme) { return (_this.setActiveNavColorTheme = activeNavTheme); });
        this.layoutService.themeLayoutCast.subscribe(function (themeLayout) { return (_this.themeLayout = themeLayout); });
        this.layoutService.collapsedLeftHeaderCast.subscribe(function (collapsedLeftHeader) { return (_this.setCollapsedLeftHeader = collapsedLeftHeader); });
        this.layoutService.deviceTypeCast.subscribe(function (appDeviceType) { return (_this.setDeviceType = appDeviceType); });
        this.setHeaderHeight = this.layoutService.headerHeight;
    };
    PagesCoreAdminComponent.prototype.onResize = function (event) {
        this.layoutService.getVerticalNavbarOnWindowResize(event.target.innerWidth);
    };
    PagesCoreAdminComponent.prototype.changeTheToggleStatus = function () {
        this.layoutService.getToggleStatus();
    };
    __decorate([
        core_1.HostListener('window:resize', ['$event'])
    ], PagesCoreAdminComponent.prototype, "onResize");
    PagesCoreAdminComponent = __decorate([
        core_1.Component({
            selector: 'app-pages-core-admin',
            templateUrl: './pages-core-admin.component.html',
            styleUrls: ['./pages-core-admin.component.scss']
        })
    ], PagesCoreAdminComponent);
    return PagesCoreAdminComponent;
}());
exports.PagesCoreAdminComponent = PagesCoreAdminComponent;
