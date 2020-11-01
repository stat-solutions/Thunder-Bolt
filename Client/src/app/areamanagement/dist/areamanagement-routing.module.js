"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AreamanagementRoutingModule = void 0;
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var pages_core_area_component_1 = require("./pages-core/pages-core-area.component");
var dashboard_component_1 = require("./components/dashboard/dashboard.component");
var random_guard_service_1 = require("../shared/services/other-services/route-guards/random-guard.service");
var profile_component_1 = require("./components/profile/profile.component");
var create_component_1 = require("./components/create/create.component");
var create_towns_component_1 = require("./components/create/create-towns/create-towns.component");
var approvals_component_1 = require("./components/approvals/approvals.component");
var withdraw_savings_component_1 = require("./components/approvals/loans-approvals/withdraw-savings/withdraw-savings.component");
var interest_rate_component_1 = require("./components/approvals/loans-approvals/interest-rate/interest-rate.component");
var loan_limit_component_1 = require("./components/approvals/loans-approvals/loan-limit/loan-limit.component");
var reduce_rate_component_1 = require("./components/approvals/loans-approvals/reduce-rate/reduce-rate.component");
var reverse_principle_component_1 = require("./components/approvals/loans-approvals/reverse-principle/reverse-principle.component");
var waive_interest_component_1 = require("./components/approvals/loans-approvals/waive-interest/waive-interest.component");
var write_off_component_1 = require("./components/approvals/loans-approvals/write-off/write-off.component");
var loans_approvals_component_1 = require("./components/approvals/loans-approvals/loans-approvals.component");
var stations_reports_component_1 = require("./components/reports/stations-reports/stations-reports.component");
var towns_reports_component_1 = require("./components/reports/towns-reports/towns-reports.component");
var clients_component_1 = require("./components/reports/clients/clients.component");
var reports_component_1 = require("./components/reports/reports.component");
var users_component_1 = require("./components/reports/users/users.component");
// import { UsersReportsComponent } from './components/reports/users-reports/users-reports.component';
// import { ClientsReportsComponent } from './components/reports/clients-reports/clients-reports.component';
var towns_cash_ledger_component_1 = require("./components/reports/towns-reports/towns-cash-ledger/towns-cash-ledger.component");
var towns_loans_ledger_component_1 = require("./components/reports/towns-reports/towns-loans-ledger/towns-loans-ledger.component");
var towns_paid_ledger_component_1 = require("./components/reports/towns-reports/towns-paid-ledger/towns-paid-ledger.component");
var stations_cash_ledger_component_1 = require("./components/reports/stations-reports/stations-cash-ledger/stations-cash-ledger.component");
var stations_loans_ledger_component_1 = require("./components/reports/stations-reports/stations-loans-ledger/stations-loans-ledger.component");
var stations_paid_ledger_component_1 = require("./components/reports/stations-reports/stations-paid-ledger/stations-paid-ledger.component");
var routes = [
    {
        path: '',
        component: pages_core_area_component_1.PagesCoreAreaComponent,
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
                path: 'create',
                component: create_component_1.CreateComponent,
                children: [
                    {
                        path: '',
                        pathMatch: 'full',
                        redirectTo: 'createtowns'
                    },
                    {
                        path: 'createtowns',
                        component: create_towns_component_1.CreateTownsComponent
                    },
                ]
            },
            {
                path: 'approvals',
                component: approvals_component_1.ApprovalsComponent,
                children: [
                    {
                        path: 'loansapprovals',
                        component: loans_approvals_component_1.LoansApprovalsComponent,
                        children: [
                            {
                                path: 'reducerate',
                                component: reduce_rate_component_1.ReduceRateComponent
                            },
                            {
                                path: 'reverseprinciple',
                                component: reverse_principle_component_1.ReversePrincipleComponent
                            },
                            {
                                path: 'interestrate',
                                component: interest_rate_component_1.InterestRateComponent
                            },
                            {
                                path: 'withdrawsavings',
                                component: withdraw_savings_component_1.WithdrawSavingsComponent
                            },
                            {
                                path: 'waiveinterest',
                                component: waive_interest_component_1.WaiveInterestComponent
                            },
                            {
                                path: 'writeoff',
                                component: write_off_component_1.WriteOffComponent
                            },
                            {
                                path: 'loanlimit',
                                component: loan_limit_component_1.LoanLimitComponent
                            },
                        ]
                    },
                ]
            },
            {
                path: 'reports',
                component: reports_component_1.ReportsComponent,
                children: [
                    {
                        path: 'stationsreports',
                        component: stations_reports_component_1.StationsReportsComponent,
                        children: [
                            {
                                path: 'stationscashledger',
                                component: stations_cash_ledger_component_1.StationsCashLedgerComponent
                            },
                            {
                                path: 'stationsledger',
                                component: stations_loans_ledger_component_1.StationsLoansLedgerComponent
                            },
                            {
                                path: 'stationspaymentsledger',
                                component: stations_paid_ledger_component_1.StationsPaidLedgerComponent
                            },
                        ]
                    },
                    {
                        path: 'townsreports',
                        component: towns_reports_component_1.TownsReportsComponent,
                        children: [
                            {
                                path: 'townscashledger',
                                component: towns_cash_ledger_component_1.TownsCashLedgerComponent
                            },
                            {
                                path: 'townsloansledger',
                                component: towns_loans_ledger_component_1.TownsLoansLedgerComponent
                            },
                            {
                                path: 'townspaymentsledger',
                                component: towns_paid_ledger_component_1.TownsPaidLedgerComponent
                            },
                        ]
                    },
                    {
                        path: 'clientsreports',
                        component: clients_component_1.ClientsComponent
                    },
                    {
                        path: 'usersreports',
                        component: users_component_1.UsersComponent
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
var AreamanagementRoutingModule = /** @class */ (function () {
    function AreamanagementRoutingModule() {
    }
    AreamanagementRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forChild(routes)],
            exports: [router_1.RouterModule]
        })
    ], AreamanagementRoutingModule);
    return AreamanagementRoutingModule;
}());
exports.AreamanagementRoutingModule = AreamanagementRoutingModule;
