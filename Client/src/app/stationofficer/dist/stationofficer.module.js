"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.StationofficerModule = void 0;
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var stationofficer_routing_module_1 = require("./stationofficer-routing.module");
var stationofficer_component_1 = require("./stationofficer.component");
var forms_1 = require("@angular/forms");
var shared_module_1 = require("../shared/shared.module");
var dashboard_component_1 = require("./components/dashboard/dashboard.component");
var profile_component_1 = require("./components/profile/profile.component");
var pages_core_officer_component_1 = require("./pages-core/pages-core-officer.component");
var right_panel_officer_component_1 = require("./common/right-panel/right-panel-officer.component");
var left_panel_officer_component_1 = require("./common/left-panel/left-panel-officer.component");
var header_officer_component_1 = require("./common/header/header-officer.component");
var content_section_officer_component_1 = require("./content-section/content-section-officer.component");
var lend_component_1 = require("./components/lend/lend.component");
var pay_component_1 = require("./components/pay/pay.component");
var savings_component_1 = require("./components/savings/savings.component");
var enroll_component_1 = require("./components/enroll/enroll.component");
var adjustments_component_1 = require("./components/adjustments/adjustments.component");
var deposit_component_1 = require("./components/savings/deposit/deposit.component");
var withdraw_component_1 = require("./components/savings/withdraw/withdraw.component");
var set_interest_rate_component_1 = require("./components/adjustments/set-interest-rate/set-interest-rate.component");
var set_loan_limit_component_1 = require("./components/adjustments/set-loan-limit/set-loan-limit.component");
var reduce_rate_component_1 = require("./components/adjustments/reduce-rate/reduce-rate.component");
var reverse_principle_component_1 = require("./components/adjustments/reverse-principle/reverse-principle.component");
var waive_interest_component_1 = require("./components/adjustments/waive-interest/waive-interest.component");
var write_off_component_1 = require("./components/adjustments/write-off/write-off.component");
var reports_component_1 = require("./components/reports/reports.component");
var loans_report_component_1 = require("./components/reports/loans-report/loans-report.component");
var cash_ledger_component_1 = require("./components/reports/cash-ledger/cash-ledger.component");
var modal_1 = require("ngx-bootstrap/modal");
var tabs_1 = require("ngx-bootstrap/tabs");
var tooltip_1 = require("ngx-bootstrap/tooltip");
var ngx_spinner_1 = require("ngx-spinner");
var ng_chartjs_1 = require("ng-chartjs");
var datepicker_1 = require("ngx-bootstrap/datepicker");
var enroll_client_component_1 = require("./components/enroll/enroll-client/enroll-client.component");
var enroll_stage_component_1 = require("./components/enroll/enroll-stage/enroll-stage.component");
var enroll_taxi_stage_component_1 = require("./components/enroll/enroll-stage/enroll-taxi-stage/enroll-taxi-stage.component");
var enroll_boda_stage_component_1 = require("./components/enroll/enroll-stage/enroll-boda-stage/enroll-boda-stage.component");
var personal_info_component_1 = require("./components/enroll/enroll-client/personal-info/personal-info.component");
var personal_profile_component_1 = require("./components/profile/personal-profile/personal-profile.component");
var StationofficerModule = /** @class */ (function () {
    function StationofficerModule() {
    }
    StationofficerModule = __decorate([
        core_1.NgModule({
            declarations: [
                stationofficer_component_1.StationofficerComponent,
                dashboard_component_1.DashboardComponent,
                profile_component_1.ProfileComponent,
                pages_core_officer_component_1.PagesCoreOfficerComponent,
                right_panel_officer_component_1.RightPanelOfficerComponent,
                left_panel_officer_component_1.LeftPanelOfficerComponent,
                header_officer_component_1.HeaderOfficerComponent,
                content_section_officer_component_1.ContentSectionOfficerComponent,
                lend_component_1.LendComponent,
                pay_component_1.PayComponent,
                savings_component_1.SavingsComponent,
                enroll_component_1.EnrollComponent,
                adjustments_component_1.AdjustmentsComponent,
                deposit_component_1.DepositComponent,
                withdraw_component_1.WithdrawComponent,
                set_interest_rate_component_1.SetInterestRateComponent,
                set_loan_limit_component_1.SetLoanLimitComponent,
                reduce_rate_component_1.ReduceRateComponent,
                reverse_principle_component_1.ReversePrincipleComponent,
                waive_interest_component_1.WaiveInterestComponent,
                write_off_component_1.WriteOffComponent,
                reports_component_1.ReportsComponent,
                loans_report_component_1.LoansReportComponent,
                cash_ledger_component_1.CashLedgerComponent,
                enroll_client_component_1.EnrollClientComponent,
                enroll_stage_component_1.EnrollStageComponent,
                enroll_taxi_stage_component_1.EnrollTaxiStageComponent,
                enroll_boda_stage_component_1.EnrollBodaStageComponent,
                personal_info_component_1.PersonalInfoComponent,
                personal_profile_component_1.PersonalProfileComponent,
            ],
            imports: [
                common_1.CommonModule,
                stationofficer_routing_module_1.StationofficerRoutingModule,
                shared_module_1.SharedModule,
                forms_1.ReactiveFormsModule,
                ngx_spinner_1.NgxSpinnerModule,
                tabs_1.TabsModule.forRoot(),
                datepicker_1.DatepickerModule,
                datepicker_1.BsDatepickerModule,
                modal_1.ModalModule.forRoot(),
                tooltip_1.TooltipModule.forRoot(),
                ng_chartjs_1.NgChartjsModule,
                ng_chartjs_1.NgChartjsModule.registerPlugin(['inlinePlugin'])
            ]
        })
    ], StationofficerModule);
    return StationofficerModule;
}());
exports.StationofficerModule = StationofficerModule;
