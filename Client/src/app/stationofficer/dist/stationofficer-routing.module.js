"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.StationofficerRoutingModule = void 0;
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var adjustments_component_1 = require("./components/adjustments/adjustments.component");
var reduce_rate_component_1 = require("./components/adjustments/reduce-rate/reduce-rate.component");
var reverse_principle_component_1 = require("./components/adjustments/reverse-principle/reverse-principle.component");
var set_interest_rate_component_1 = require("./components/adjustments/set-interest-rate/set-interest-rate.component");
var set_loan_limit_component_1 = require("./components/adjustments/set-loan-limit/set-loan-limit.component");
var waive_interest_component_1 = require("./components/adjustments/waive-interest/waive-interest.component");
var write_off_component_1 = require("./components/adjustments/write-off/write-off.component");
var officer_guard_service_1 = require("../shared/services/other-services/route-guards/officer-guard.service");
var dashboard_component_1 = require("./components/dashboard/dashboard.component");
var enroll_client_component_1 = require("./components/enroll/enroll-client/enroll-client.component");
var enroll_boda_stage_component_1 = require("./components/enroll/enroll-stage/enroll-boda-stage/enroll-boda-stage.component");
var enroll_stage_component_1 = require("./components/enroll/enroll-stage/enroll-stage.component");
var enroll_taxi_stage_component_1 = require("./components/enroll/enroll-stage/enroll-taxi-stage/enroll-taxi-stage.component");
var enroll_component_1 = require("./components/enroll/enroll.component");
var lend_component_1 = require("./components/lend/lend.component");
var pay_component_1 = require("./components/pay/pay.component");
var profile_component_1 = require("./components/profile/profile.component");
var cash_ledger_component_1 = require("./components/reports/cash-ledger/cash-ledger.component");
var loans_report_component_1 = require("./components/reports/loans-report/loans-report.component");
var reports_component_1 = require("./components/reports/reports.component");
var deposit_component_1 = require("./components/savings/deposit/deposit.component");
var savings_component_1 = require("./components/savings/savings.component");
var withdraw_component_1 = require("./components/savings/withdraw/withdraw.component");
var pages_core_officer_component_1 = require("./pages-core/pages-core-officer.component");
var routes = [
    { path: '',
        component: pages_core_officer_component_1.PagesCoreOfficerComponent,
        canActivateChild: [officer_guard_service_1.OfficerGuard],
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
                path: 'lend',
                component: lend_component_1.LendComponent
            },
            {
                path: 'pay',
                component: pay_component_1.PayComponent
            },
            {
                path: 'enroll',
                component: enroll_component_1.EnrollComponent,
                children: [
                    {
                        path: 'enrollclient',
                        component: enroll_client_component_1.EnrollClientComponent
                    },
                    {
                        path: 'enrollstage',
                        component: enroll_stage_component_1.EnrollStageComponent,
                        children: [
                            {
                                path: 'enrolltaxistage',
                                component: enroll_taxi_stage_component_1.EnrollTaxiStageComponent
                            },
                            {
                                path: 'enrollbodastage',
                                component: enroll_boda_stage_component_1.EnrollBodaStageComponent
                            }
                        ]
                    }
                ]
            },
            {
                path: 'savings',
                component: savings_component_1.SavingsComponent,
                children: [
                    {
                        path: 'deposit',
                        component: deposit_component_1.DepositComponent
                    },
                    {
                        path: 'withdraw',
                        component: withdraw_component_1.WithdrawComponent
                    }
                ]
            },
            {
                path: 'adjustments',
                component: adjustments_component_1.AdjustmentsComponent,
                children: [
                    {
                        path: 'setloanlimit',
                        component: set_loan_limit_component_1.SetLoanLimitComponent
                    },
                    {
                        path: 'reduceinterestrate',
                        component: reduce_rate_component_1.ReduceRateComponent
                    },
                    {
                        path: 'reverse-principle',
                        component: reverse_principle_component_1.ReversePrincipleComponent
                    },
                    {
                        path: 'setinterestrate',
                        component: set_interest_rate_component_1.SetInterestRateComponent
                    },
                    {
                        path: 'waive-interest',
                        component: waive_interest_component_1.WaiveInterestComponent
                    },
                    {
                        path: 'writeoffprinciple',
                        component: write_off_component_1.WriteOffComponent
                    },
                ]
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
                        path: 'loansreport',
                        component: loans_report_component_1.LoansReportComponent
                    }
                ]
            },
            {
                path: 'profile',
                component: profile_component_1.ProfileComponent
            }
        ]
    }
];
var StationofficerRoutingModule = /** @class */ (function () {
    function StationofficerRoutingModule() {
    }
    StationofficerRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forChild(routes)],
            exports: [router_1.RouterModule]
        })
    ], StationofficerRoutingModule);
    return StationofficerRoutingModule;
}());
exports.StationofficerRoutingModule = StationofficerRoutingModule;
