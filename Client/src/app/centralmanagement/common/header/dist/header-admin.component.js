"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.HeaderAdminComponent = void 0;
var core_1 = require("@angular/core");
var HeaderAdminComponent = /** @class */ (function () {
    function HeaderAdminComponent(layoutService, authService, spinner, router) {
        this.layoutService = layoutService;
        this.authService = authService;
        this.spinner = spinner;
        this.router = router;
        this.user = '/../../../assets/img/man.svg';
    }
    HeaderAdminComponent.prototype.ngOnInit = function () { };
    HeaderAdminComponent.prototype.changeTheToggleStatus = function () {
        this.layoutService.getToggleStatus();
    };
    HeaderAdminComponent.prototype.showDanger = function () {
        // this.toastr.warning(this.serviceErrors, 'Logout Successfully!!', {timeOut: 6000, positionClass: 'toast-bottom-left'});
    };
    HeaderAdminComponent.prototype.logoutUser = function () {
        var _this = this;
        this.serviceErrors = 'Bye bye!';
        this.showDanger();
        setTimeout(function () {
            _this.authService.doLogoutUser();
            _this.router.navigate(['authpage/login']);
        }, 1000);
    };
    __decorate([
        core_1.Input()
    ], HeaderAdminComponent.prototype, "navLayout");
    __decorate([
        core_1.Input()
    ], HeaderAdminComponent.prototype, "defaultNavbar");
    __decorate([
        core_1.Input()
    ], HeaderAdminComponent.prototype, "toggleNavbar");
    __decorate([
        core_1.Input()
    ], HeaderAdminComponent.prototype, "toggleStatus");
    __decorate([
        core_1.Input()
    ], HeaderAdminComponent.prototype, "navbarEffect");
    __decorate([
        core_1.Input()
    ], HeaderAdminComponent.prototype, "deviceType");
    __decorate([
        core_1.Input()
    ], HeaderAdminComponent.prototype, "headerColorTheme");
    __decorate([
        core_1.Input()
    ], HeaderAdminComponent.prototype, "leftHeaderColorTheme");
    __decorate([
        core_1.Input()
    ], HeaderAdminComponent.prototype, "navbarColorTheme");
    __decorate([
        core_1.Input()
    ], HeaderAdminComponent.prototype, "activeNavColorTheme");
    __decorate([
        core_1.Input()
    ], HeaderAdminComponent.prototype, "headerHeight");
    __decorate([
        core_1.Input()
    ], HeaderAdminComponent.prototype, "collapsedLeftHeader");
    HeaderAdminComponent = __decorate([
        core_1.Component({
            selector: 'app-header',
            templateUrl: './header-admin.component.html',
            styleUrls: ['./header-admin.component.scss']
        })
    ], HeaderAdminComponent);
    return HeaderAdminComponent;
}());
exports.HeaderAdminComponent = HeaderAdminComponent;
