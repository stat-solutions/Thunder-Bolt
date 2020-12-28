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
var cash_ledger_component_1 = require("./components/reports/cash-ledger/cash-ledger.component");
var loans_ledger_component_1 = require("./components/reports/loans-ledger/loans-ledger.component");
var paid_ledger_component_1 = require("./components/reports/paid-ledger/paid-ledger.component");
var edit_client_component_1 = require("./components/enroll/edit-client/edit-client.component");
var edit_boda_stage_component_1 = require("./components/enroll/edit-stage/edit-boda-stage/edit-boda-stage.component");
var edit_stage_component_1 = require("./components/enroll/edit-stage/edit-stage.component");
var edit_taxi_stage_component_1 = require("./components/enroll/edit-stage/edit-taxi-stage/edit-taxi-stage.component");
var micro_loans_component_1 = require("./components/micro-loans/micro-loans.component");
var get_loan_component_1 = require("./components/micro-loans/get-loan/get-loan.component");
var pay_loan_component_1 = require("./components/micro-loans/pay-loan/pay-loan.component");
var comfirm_loan_component_1 = require("./components/micro-loans/comfirm-loan/comfirm-loan.component");
var routes = [
    { path: '',
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
                            }
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
                            }
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
                            }
                        ]
                    }
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
                        path: 'loansledger',
                        component: loans_ledger_component_1.LoansLedgerComponent
                    },
                    {
                        path: 'paidledger',
                        component: paid_ledger_component_1.PaidLedgerComponent
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
