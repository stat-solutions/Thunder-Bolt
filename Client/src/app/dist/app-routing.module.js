"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppRoutingModule = void 0;
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var auth_guard_service_1 = require("./shared/services/other-services/route-guards/auth-guard.service");
var routes = [
    { path: 'authpage', redirectTo: '/authpage/login', pathMatch: 'full' },
    {
        path: '',
        redirectTo: '/authpage/login',
        pathMatch: 'full',
        canActivate: [auth_guard_service_1.AuthGuard]
    },
    { path: 'admin', loadChildren: function () { return Promise.resolve().then(function () { return require('./admin/admin.module'); }).then(function (m) { return m.AdminModule; }); } },
    // tslint:disable-next-line: max-line-length
    { path: 'centralmanagement', loadChildren: function () { return Promise.resolve().then(function () { return require('./centralmanagement/centralmanagement.module'); }).then(function (m) { return m.CentralmanagementModule; }); } },
    { path: 'areamanagement', loadChildren: function () { return Promise.resolve().then(function () { return require('./areamanagement/areamanagement.module'); }).then(function (m) { return m.AreamanagementModule; }); } },
    { path: 'townmanagement', loadChildren: function () { return Promise.resolve().then(function () { return require('./townmanagement/townmanagement.module'); }).then(function (m) { return m.TownmanagementModule; }); } },
    // tslint:disable-next-line: max-line-length
    { path: 'stationmanagement', loadChildren: function () { return Promise.resolve().then(function () { return require('./stationmanagement/stationmanagement.module'); }).then(function (m) { return m.StationmanagementModule; }); } },
    { path: 'stationofficer', loadChildren: function () { return Promise.resolve().then(function () { return require('./stationofficer/stationofficer.module'); }).then(function (m) { return m.StationofficerModule; }); } }
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forRoot(routes)],
            exports: [router_1.RouterModule]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());
exports.AppRoutingModule = AppRoutingModule;
