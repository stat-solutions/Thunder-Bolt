"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.TownmanagementRoutingModule = void 0;
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var profile_component_1 = require("./components/profile/profile.component");
var dashboard_component_1 = require("./components/dashboard/dashboard.component");
var pages_core_town_component_1 = require("./pages-core/pages-core-town.component");
var town_guard_service_1 = require("../shared/services/other-services/route-guards/town-guard.service");
var enroll_client_component_1 = require("./components/enroll/enroll-client/enroll-client.component");
var enroll_boda_stage_component_1 = require("./components/enroll/enroll-stage/enroll-boda-stage/enroll-boda-stage.component");
var enroll_stage_component_1 = require("./components/enroll/enroll-stage/enroll-stage.component");
var enroll_taxi_stage_component_1 = require("./components/enroll/enroll-stage/enroll-taxi-stage/enroll-taxi-stage.component");
var enroll_component_1 = require("./components/enroll/enroll.component");
var create_station_component_1 = require("./components/create-station/create-station.component");
var cluster_and_taxipark_component_1 = require("./components/enroll/cluster-and-taxipark/cluster-and-taxipark.component");
var enroll_cluster_component_1 = require("./components/enroll/cluster-and-taxipark/enroll-cluster/enroll-cluster.component");
var enroll_taxi_park_component_1 = require("./components/enroll/cluster-and-taxipark/enroll-taxi-park/enroll-taxi-park.component");
var reports_component_1 = require("../centralmanagement/components/reports/reports.component");
var edit_client_component_1 = require("./components/enroll/edit-client/edit-client.component");
var edit_boda_stage_component_1 = require("./components/enroll/edit-stage/edit-boda-stage/edit-boda-stage.component");
var edit_stage_component_1 = require("./components/enroll/edit-stage/edit-stage.component");
var edit_taxi_stage_component_1 = require("./components/enroll/edit-stage/edit-taxi-stage/edit-taxi-stage.component");
var micro_loans_component_1 = require("./components/micro-loans/micro-loans.component");
var get_loan_component_1 = require("./components/micro-loans/get-loan/get-loan.component");
var pay_loan_component_1 = require("./components/micro-loans/pay-loan/pay-loan.component");
var comfirm_loan_component_1 = require("./components/micro-loans/comfirm-loan/comfirm-loan.component");
var clients_component_1 = require("./components/reports/clients/clients.component");
var users_component_1 = require("./components/reports/users/users.component");
var area_component_1 = require("./components/reports/area/area.component");
var loan_tenure_component_1 = require("./components/adjustments/loan-tenure/loan-tenure.component");
var waive_interest_component_1 = require("./components/adjustments/waive-interest/waive-interest.component");
var write_off_component_1 = require("./components/adjustments/write-off/write-off.component");
var set_loan_limit_component_1 = require("./components/adjustments/set-loan-limit/set-loan-limit.component");
var adjustments_component_1 = require("./components/adjustments/adjustments.component");
var set_interest_rate_component_1 = require("./components/adjustments/set-interest-rate/set-interest-rate.component");
var reverse_principal_component_1 = require("./components/adjustments/reverse-principal/reverse-principal.component");
var reverse_interest_component_1 = require("./components/adjustments/reverse-interest/reverse-interest.component");
var client_comments_component_1 = require("./components/client-comments/client-comments.component");
var accrual_days_component_1 = require("./components/adjustments/accrual-days/accrual-days.component");
var routes = [
    {
        path: '',
        component: pages_core_town_component_1.PagesCoreTownComponent,
        canActivateChild: [town_guard_service_1.TownGuard],
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
                path: 'createstation',
                component: create_station_component_1.CreateStationComponent
            },
            {
                path: 'clientcomments',
                component: client_comments_component_1.ClientCommentsComponent
            },
            {
                path: 'microloan',
                component: micro_loans_component_1.MicroLoansComponent,
                children: [
                    {
                        path: '',
                        redirectTo: 'getloan',
                        pathMatch: 'full'
                    },
                    {
                        path: 'getloan',
                        component: get_loan_component_1.GetLoanComponent
                    },
                    {
                        path: 'confirm',
                        component: comfirm_loan_component_1.ComfirmLoanComponent
                    },
                    {
                        path: 'payloan',
                        component: pay_loan_component_1.PayLoanComponent
                    },
                ]
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
                            },
                        ]
                    },
                    {
                        path: 'clustertaxipark',
                        component: cluster_and_taxipark_component_1.ClusterAndTaxiparkComponent,
                        children: [
                            {
                                path: 'enrollcluster',
                                component: enroll_cluster_component_1.EnrollClusterComponent
                            },
                            {
                                path: 'enrolltaxipark',
                                component: enroll_taxi_park_component_1.EnrollTaxiParkComponent
                            },
                        ]
                    },
                    {
                        path: 'editclient',
                        component: edit_client_component_1.EditClientComponent
                    },
                    {
                        path: 'editstage',
                        component: edit_stage_component_1.EditStageComponent,
                        children: [
                            {
                                path: 'edittaxistage',
                                component: edit_taxi_stage_component_1.EditTaxiStageComponent
                            },
                            {
                                path: 'editbodastage',
                                component: edit_boda_stage_component_1.EditBodaStageComponent
                            },
                        ]
                    },
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
                        path: 'loantenure',
                        component: loan_tenure_component_1.LoanTenureComponent
                    },
                    {
                        path: 'accrualdays',
                        component: accrual_days_component_1.AccrualDaysComponent
                    },
                    {
                        path: 'reverseprincipal',
                        component: reverse_interest_component_1.ReverseInterestComponent
                    },
                    {
                        path: 'reverseprincipal',
                        component: reverse_principal_component_1.ReversePrincipalComponent
                    },
                    {
                        path: 'setinterestrate',
                        component: set_interest_rate_component_1.SetInterestRateComponent
                    },
                    {
                        path: 'waiveinterest',
                        component: waive_interest_component_1.WaiveInterestComponent
                    },
                    {
                        path: 'writeoffprincipal',
                        component: write_off_component_1.WriteOffComponent
                    },
                ]
            },
            {
                path: 'reports',
                component: reports_component_1.ReportsComponent,
                children: [
                    {
                        path: 'loansrevenue',
                        component: area_component_1.AreaComponent
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
var TownmanagementRoutingModule = /** @class */ (function () {
    function TownmanagementRoutingModule() {
    }
    TownmanagementRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forChild(routes)],
            exports: [router_1.RouterModule]
        })
    ], TownmanagementRoutingModule);
    return TownmanagementRoutingModule;
}());
exports.TownmanagementRoutingModule = TownmanagementRoutingModule;
