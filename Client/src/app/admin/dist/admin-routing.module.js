"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AdminRoutingModule = void 0;
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var pages_core_admin_component_1 = require("./pages-core/pages-core-admin.component");
var approval_setup_component_1 = require("./components/approval-setup/approval-setup.component");
var company_setup_component_1 = require("./components/company-setup/company-setup.component");
var admin_profile_component_1 = require("./components/admin-profile/admin-profile.component");
var dashboard_component_1 = require("./components/dashboard/dashboard.component");
var bussinessunits_component_1 = require("./components/bussinessunits/bussinessunits.component");
var admin_guard_service_1 = require("../shared/services/other-services/route-guards/admin-guard.service");
var routes = [
    {
        path: '',
        component: pages_core_admin_component_1.PagesCoreAdminComponent,
        canActivateChild: [admin_guard_service_1.AdminGuard],
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
                path: 'companysetup',
                component: company_setup_component_1.CompanySetupComponent
            },
            {
                path: 'businessunits',
                component: bussinessunits_component_1.BussinessunitsComponent
            },
            {
                path: 'approvalsetup',
                component: approval_setup_component_1.ApprovalSetupComponent
            },
            {
                path: 'adminprofile',
                component: admin_profile_component_1.AdminProfileComponent
            },
        ]
    },
];
var AdminRoutingModule = /** @class */ (function () {
    function AdminRoutingModule() {
    }
    AdminRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forChild(routes)],
            exports: [router_1.RouterModule]
        })
    ], AdminRoutingModule);
    return AdminRoutingModule;
}());
exports.AdminRoutingModule = AdminRoutingModule;
