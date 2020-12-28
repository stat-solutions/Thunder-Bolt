"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CentralmanagementRoutingModule = void 0;
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var create_component_1 = require("./components/create/create.component");
var dashboard_component_1 = require("./components/dashboard/dashboard.component");
var profile_component_1 = require("./components/profile/profile.component");
var areas_component_1 = require("./components/reports/areas/areas.component");
var clients_component_1 = require("./components/reports/clients/clients.component");
var reports_component_1 = require("./components/reports/reports.component");
var users_component_1 = require("./components/reports/users/users.component");
var transactions_component_1 = require("./components/transactions/transactions.component");
var pages_core_central_component_1 = require("./pages-core/pages-core-central.component");
var create_area_component_1 = require("./components/create/create-area/create-area.component");
var create_station_component_1 = require("./components/create/create-station/create-station.component");
var create_town_component_1 = require("./components/create/create-town/create-town.component");
var approvals_component_1 = require("./components/approvals/approvals.component");
var approve_areas_component_1 = require("./components/approvals/approve-areas/approve-areas.component");
var approve_stations_component_1 = require("./components/approvals/approve-stations/approve-stations.component");
var approve_towns_component_1 = require("./components/approvals/approve-towns/approve-towns.component");
var approval_component_1 = require("./components/transactions/approval/approval.component");
var float_component_1 = require("./components/transactions/float/float.component");
var loans_component_1 = require("./components/transactions/loans/loans.component");
var set_loan_limit_component_1 = require("./components/transactions/loans/set-loan-limit/set-loan-limit.component");
var set_loan_rate_component_1 = require("./components/transactions/loans/set-loan-rate/set-loan-rate.component");
var deposit_float_component_1 = require("./components/transactions/float/deposit-float/deposit-float.component");
var withdraw_float_component_1 = require("./components/transactions/float/withdraw-float/withdraw-float.component");
var interest_rate_component_1 = require("./components/transactions/approval/interest-rate/interest-rate.component");
var loan_limit_component_1 = require("./components/transactions/approval/loan-limit/loan-limit.component");
var reduce_rate_component_1 = require("./components/transactions/approval/reduce-rate/reduce-rate.component");
var reverse_principle_component_1 = require("./components/transactions/approval/reverse-principle/reverse-principle.component");
var waive_interest_component_1 = require("./components/transactions/approval/waive-interest/waive-interest.component");
var withdraw_savings_component_1 = require("./components/transactions/approval/withdraw-savings/withdraw-savings.component");
var write_off_component_1 = require("./components/transactions/approval/write-off/write-off.component");
var central_guard_service_1 = require("../shared/services/other-services/route-guards/central-guard.service");
var approve_central_users_component_1 = require("./components/approve-central-users/approve-central-users.component");
var select_the_Area_component_1 = require("./components/select-the-Area/select-the-Area.component");
var set_managers_component_1 = require("./components/set-managers/set-managers.component");
var area_managers_component_1 = require("./components/set-managers/area-managers/area-managers.component");
var town_managers_component_1 = require("./components/set-managers/town-managers/town-managers.component");
var station_managers_component_1 = require("./components/set-managers/station-managers/station-managers.component");
var set_loan_tenure_component_1 = require("./components/transactions/loans/set-loan-tenure/set-loan-tenure.component");
var loan_tenure_component_1 = require("./components/transactions/approval/loan-tenure/loan-tenure.component");
var set_loan_commision_component_1 = require("./components/transactions/loans/set-loan-commision/set-loan-commision.component");
var set_loan_accrual_component_1 = require("./components/transactions/loans/set-loan-accrual/set-loan-accrual.component");
var micro_loan_component_1 = require("./components/transactions/approval/micro-loan/micro-loan.component");
var routes = [
    {
        path: '',
        component: pages_core_central_component_1.PagesCoreCentralComponent,
        canActivateChild: [central_guard_service_1.CentralGuard],
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
                        path: 'createregion',
                        component: create_area_component_1.CreateAreaComponent
                    },
                    {
                        path: 'createtown',
                        component: create_town_component_1.CreateTownComponent
                    },
                    {
                        path: 'createstation',
                        component: create_station_component_1.CreateStationComponent
                    },
                ]
            },
            {
                path: 'selectregions',
                component: select_the_Area_component_1.SelectTheAreaComponent
            },
            {
                path: 'managers',
                component: set_managers_component_1.SetManagersComponent,
                children: [
                    {
                        path: 'regionmanagers',
                        component: area_managers_component_1.AreaManagersComponent
                    },
                    {
                        path: 'townmanagers',
                        component: town_managers_component_1.TownManagersComponent
                    },
                    {
                        path: 'stationmanagers',
                        component: station_managers_component_1.StationManagersComponent
                    },
                ]
            },
            {
                path: 'approve',
                component: approvals_component_1.ApprovalsComponent,
                children: [
                    {
                        path: 'approveregion',
                        component: approve_areas_component_1.ApproveAreasComponent
                    },
                    {
                        path: 'approvetown',
                        component: approve_towns_component_1.ApproveTownsComponent
                    },
                    {
                        path: 'approvestation',
                        component: approve_stations_component_1.ApproveStationsComponent
                    },
                ]
            },
            {
                path: 'approveusers',
                component: approve_central_users_component_1.ApproveCentralUsersComponent
            },
            {
                path: 'transactions',
                component: transactions_component_1.TransactionsComponent,
                children: [
                    {
                        path: 'loans',
                        component: loans_component_1.LoansComponent,
                        children: [
                            {
                                path: 'setloanlimit',
                                component: set_loan_limit_component_1.SetLoanLimitComponent
                            },
                            {
                                path: 'setloanrate',
                                component: set_loan_rate_component_1.SetLoanRateComponent
                            },
                            {
                                path: 'setloantenure',
                                component: set_loan_tenure_component_1.SetLoanTenureComponent
                            },
                            {
                                path: 'setloancommission',
                                component: set_loan_commision_component_1.SetLoanCommissionComponent
                            },
                            {
                                path: 'setloanaccrual',
                                component: set_loan_accrual_component_1.SetLoanAcrualComponent
                            },
                        ]
                    },
                    {
                        path: 'approve',
                        component: approval_component_1.ApprovalComponent,
                        children: [
                            {
                                path: 'microloan',
                                component: micro_loan_component_1.MicroLoanComponent
                            },
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
                            {
                                path: 'loantenure',
                                component: loan_tenure_component_1.LoanTenureComponent
                            }
                        ]
                    },
                    {
                        path: 'float',
                        component: float_component_1.FloatComponent,
                        children: [
                            {
                                path: 'withdrawfloat',
                                component: withdraw_float_component_1.WithdrawFloatComponent
                            },
                            {
                                path: 'depositfloat',
                                component: deposit_float_component_1.DepositFloatComponent
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
                        path: 'loansrevenue',
                        component: areas_component_1.AreasComponent
                    },
                    {
                        path: 'clients',
                        component: clients_component_1.ClientsComponent
                    },
                    {
                        path: 'users',
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
var CentralmanagementRoutingModule = /** @class */ (function () {
    function CentralmanagementRoutingModule() {
    }
    CentralmanagementRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forChild(routes)],
            exports: [router_1.RouterModule]
        })
    ], CentralmanagementRoutingModule);
    return CentralmanagementRoutingModule;
}());
exports.CentralmanagementRoutingModule = CentralmanagementRoutingModule;
