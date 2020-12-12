"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AreamanagementModule = void 0;
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var areamanagement_routing_module_1 = require("./areamanagement-routing.module");
var areamanagement_component_1 = require("./areamanagement.component");
var forms_1 = require("@angular/forms");
var shared_module_1 = require("../shared/shared.module");
var pages_core_area_component_1 = require("./pages-core/pages-core-area.component");
var content_section_area_component_1 = require("./content-section/content-section-area.component");
var right_panel_area_component_1 = require("./common/right-panel/right-panel-area.component");
var header_area_component_1 = require("./common/header/header-area.component");
var left_panel_area_component_1 = require("./common/left-panel/left-panel-area.component");
var dashboard_component_1 = require("./components/dashboard/dashboard.component");
var profile_component_1 = require("./components/profile/profile.component");
var datepicker_1 = require("ngx-bootstrap/datepicker");
var modal_1 = require("ngx-bootstrap/modal");
var tabs_1 = require("ngx-bootstrap/tabs");
var tooltip_1 = require("ngx-bootstrap/tooltip");
var ngx_spinner_1 = require("ngx-spinner");
var ng_chartjs_1 = require("ng-chartjs");
var create_component_1 = require("./components/create/create.component");
// import { CreateTownsComponent } from './components/create/create-towns/create-towns.component';
var approvals_component_1 = require("./components/approvals/approvals.component");
var withdraw_savings_component_1 = require("./components/approvals/loans-approvals/withdraw-savings/withdraw-savings.component");
var interest_rate_component_1 = require("./components/approvals/loans-approvals/interest-rate/interest-rate.component");
var loan_limit_component_1 = require("./components/approvals/loans-approvals/loan-limit/loan-limit.component");
var reduce_rate_component_1 = require("./components/approvals/loans-approvals/reduce-rate/reduce-rate.component");
var reverse_principle_component_1 = require("./components/approvals/loans-approvals/reverse-principle/reverse-principle.component");
var waive_interest_component_1 = require("./components/approvals/loans-approvals/waive-interest/waive-interest.component");
var write_off_component_1 = require("./components/approvals/loans-approvals/write-off/write-off.component");
var reports_component_1 = require("./components/reports/reports.component");
var clients_component_1 = require("./components/reports/clients/clients.component");
var users_component_1 = require("./components/reports/users/users.component");
var loans_approvals_component_1 = require("./components/approvals/loans-approvals/loans-approvals.component");
var personal_profile_component_1 = require("./components/profile/personal-profile/personal-profile.component");
var verify_client_component_1 = require("./components/approvals/verify-client/verify-client.component");
var ngx_pinch_zoom_1 = require("ngx-pinch-zoom");
var ngx_alerts_1 = require("ngx-alerts");
var AreamanagementModule = /** @class */ (function () {
    function AreamanagementModule() {
    }
    AreamanagementModule = __decorate([
        core_1.NgModule({
            declarations: [
                areamanagement_component_1.AreamanagementComponent,
                pages_core_area_component_1.PagesCoreAreaComponent,
                right_panel_area_component_1.RightPanelAreaComponent,
                left_panel_area_component_1.LeftPanelAreaComponent,
                header_area_component_1.HeaderAreaComponent,
                content_section_area_component_1.ContentSectionAreaComponent,
                dashboard_component_1.DashboardComponent,
                profile_component_1.ProfileComponent,
                create_component_1.CreateComponent,
                approvals_component_1.ApprovalsComponent,
                withdraw_savings_component_1.WithdrawSavingsComponent,
                interest_rate_component_1.InterestRateComponent,
                loan_limit_component_1.LoanLimitComponent,
                reduce_rate_component_1.ReduceRateComponent,
                reverse_principle_component_1.ReversePrincipleComponent,
                waive_interest_component_1.WaiveInterestComponent,
                write_off_component_1.WriteOffComponent,
                reports_component_1.ReportsComponent,
                clients_component_1.ClientsComponent,
                users_component_1.UsersComponent,
                loans_approvals_component_1.LoansApprovalsComponent,
                personal_profile_component_1.PersonalProfileComponent,
                verify_client_component_1.VerifyClientComponent
            ],
            imports: [
                common_1.CommonModule,
                areamanagement_routing_module_1.AreamanagementRoutingModule,
                shared_module_1.SharedModule,
                forms_1.ReactiveFormsModule,
                ngx_spinner_1.NgxSpinnerModule,
                tabs_1.TabsModule.forRoot(),
                ngx_pinch_zoom_1.PinchZoomModule,
                datepicker_1.DatepickerModule,
                datepicker_1.BsDatepickerModule,
                modal_1.ModalModule.forRoot(),
                tooltip_1.TooltipModule.forRoot(),
                ngx_alerts_1.AlertModule.forRoot({ maxMessages: 5, timeout: 7000 }),
                ng_chartjs_1.NgChartjsModule,
                ng_chartjs_1.NgChartjsModule.registerPlugin(['inlinePlugin'])
            ]
        })
    ], AreamanagementModule);
    return AreamanagementModule;
}());
exports.AreamanagementModule = AreamanagementModule;
