"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.StationmanagementRoutingModule = void 0;
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var profile_component_1 = require("./components/profile/profile.component");
var dashboard_component_1 = require("./components/dashboard/dashboard.component");
var pages_core_station_component_1 = require("./pages-core/pages-core-station.component");
var random_guard_service_1 = require("../shared/services/other-services/route-guards/random-guard.service");
var reports_component_1 = require("./components/reports/reports.component");
var cash_ledger_component_1 = require("./components/reports/cash-ledger/cash-ledger.component");
var paid_ledger_component_1 = require("./components/reports/paid-ledger/paid-ledger.component");
var borrowed_ledger_component_1 = require("./components/reports/borrowed-ledger/borrowed-ledger.component");
var routes = [
    {
        path: '',
        component: pages_core_station_component_1.PagesCoreStationComponent,
        canActivateChild: [random_guard_service_1.RandomGuard],
        children: [
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'dashboard'
            },
            {
                path: 'dashboard',
                component: dashboard_component_1.DashboardComponent
            },
            {
                path: 'reports',
                component: reports_component_1.ReportsComponent,
                children: [
                    {
                        path: 'cashledger',
                        component: cash_ledger_component_1.CashLedgerComponent
                    },
                    {
                        path: 'paidledger',
                        component: paid_ledger_component_1.PaidLedgerComponent
                    },
                    {
                        path: 'borrowedledger',
                        component: borrowed_ledger_component_1.BorrowedLedgerComponent
                    },
                ]
            },
            {
                path: 'profile',
                component: profile_component_1.ProfileComponent
            },
        ]
    },
];
var StationmanagementRoutingModule = /** @class */ (function () {
    function StationmanagementRoutingModule() {
    }
    StationmanagementRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forChild(routes)],
            exports: [router_1.RouterModule]
        })
    ], StationmanagementRoutingModule);
    return StationmanagementRoutingModule;
}());
exports.StationmanagementRoutingModule = StationmanagementRoutingModule;
