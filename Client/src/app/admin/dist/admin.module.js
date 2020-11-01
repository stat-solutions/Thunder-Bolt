"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AdminModule = void 0;
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var admin_routing_module_1 = require("./admin-routing.module");
var ngx_alerts_1 = require("ngx-alerts");
var shared_module_1 = require("../shared/shared.module");
var pages_core_admin_component_1 = require("./pages-core/pages-core-admin.component");
var ngx_spinner_1 = require("ngx-spinner");
var dashboard_component_1 = require("./components/dashboard/dashboard.component");
var approval_setup_component_1 = require("./components/approval-setup/approval-setup.component");
var company_setup_component_1 = require("./components/company-setup/company-setup.component");
var admin_profile_component_1 = require("./components/admin-profile/admin-profile.component");
var forms_1 = require("@angular/forms");
var left_panel_admin_component_1 = require("./common/left-panel/left-panel-admin.component");
var right_panel_admin_component_1 = require("./common/right-panel/right-panel-admin.component");
var header_admin_component_1 = require("./common/header/header-admin.component");
var content_section_admin_component_1 = require("./content-section/content-section-admin.component");
var bussinessunits_component_1 = require("./components/bussinessunits/bussinessunits.component");
var datepicker_1 = require("ngx-bootstrap/datepicker");
var tooltip_1 = require("ngx-bootstrap/tooltip");
var personal_profile_component_1 = require("./components/admin-profile/personal-profile/personal-profile.component");
var AdminModule = /** @class */ (function () {
    function AdminModule() {
    }
    AdminModule = __decorate([
        core_1.NgModule({
            declarations: [
                pages_core_admin_component_1.PagesCoreAdminComponent,
                left_panel_admin_component_1.LeftPanelAdminComponent,
                right_panel_admin_component_1.RightPanelAdminComponent,
                header_admin_component_1.HeaderAdminComponent,
                content_section_admin_component_1.ContentSectionAdminComponent,
                dashboard_component_1.DashboardComponent,
                approval_setup_component_1.ApprovalSetupComponent,
                company_setup_component_1.CompanySetupComponent,
                admin_profile_component_1.AdminProfileComponent,
                bussinessunits_component_1.BussinessunitsComponent,
                personal_profile_component_1.PersonalProfileComponent,
            ],
            imports: [
                common_1.CommonModule,
                admin_routing_module_1.AdminRoutingModule,
                shared_module_1.SharedModule,
                forms_1.ReactiveFormsModule,
                ngx_spinner_1.NgxSpinnerModule,
                datepicker_1.DatepickerModule,
                datepicker_1.BsDatepickerModule,
                ngx_alerts_1.AlertModule.forRoot({ maxMessages: 5, timeout: 7000 }),
                tooltip_1.TooltipModule.forRoot()
            ]
        })
    ], AdminModule);
    return AdminModule;
}());
exports.AdminModule = AdminModule;
