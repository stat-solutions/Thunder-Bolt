"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CentralmanagementModule = void 0;
var areas_component_1 = require("./components/reports/areas/areas.component");
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var ngx_spinner_1 = require("ngx-spinner");
var centralmanagement_routing_module_1 = require("./centralmanagement-routing.module");
var centralmanagement_component_1 = require("./centralmanagement.component");
var forms_1 = require("@angular/forms");
var shared_module_1 = require("../shared/shared.module");
var dashboard_component_1 = require("./components/dashboard/dashboard.component");
var profile_component_1 = require("./components/profile/profile.component");
var content_section_central_component_1 = require("./content-section/content-section-central.component");
var header_central_component_1 = require("./common/header/header-central.component");
var left_panel_central_component_1 = require("./common/left-panel/left-panel-central.component");
var right_panel_central_component_1 = require("./common/right-panel/right-panel-central.component");
var pages_core_central_component_1 = require("./pages-core/pages-core-central.component");
var tooltip_1 = require("ngx-bootstrap/tooltip");
var reports_component_1 = require("./components/reports/reports.component");
var clients_component_1 = require("./components/reports/clients/clients.component");
var users_component_1 = require("./components/reports/users/users.component");
var create_component_1 = require("./components/create/create.component");
var transactions_component_1 = require("./components/transactions/transactions.component");
var create_area_component_1 = require("./components/create/create-area/create-area.component");
var create_town_component_1 = require("./components/create/create-town/create-town.component");
var create_station_component_1 = require("./components/create/create-station/create-station.component");
var approvals_component_1 = require("./components/approvals/approvals.component");
var approve_areas_component_1 = require("./components/approvals/approve-areas/approve-areas.component");
var approve_towns_component_1 = require("./components/approvals/approve-towns/approve-towns.component");
var approve_stations_component_1 = require("./components/approvals/approve-stations/approve-stations.component");
var loans_component_1 = require("./components/transactions/loans/loans.component");
var float_component_1 = require("./components/transactions/float/float.component");
var approval_component_1 = require("./components/transactions/approval/approval.component");
var set_loan_limit_component_1 = require("./components/transactions/loans/set-loan-limit/set-loan-limit.component");
var set_loan_rate_component_1 = require("./components/transactions/loans/set-loan-rate/set-loan-rate.component");
var deposit_float_component_1 = require("./components/transactions/float/deposit-float/deposit-float.component");
var withdraw_float_component_1 = require("./components/transactions/float/withdraw-float/withdraw-float.component");
var reverse_interest_component_1 = require("./components/transactions/approval/reduce-rate/reverse-interest.component");
var reverse_principle_component_1 = require("./components/transactions/approval/reverse-principle/reverse-principle.component");
var interest_rate_component_1 = require("./components/transactions/approval/interest-rate/interest-rate.component");
var withdraw_savings_component_1 = require("./components/transactions/approval/withdraw-savings/withdraw-savings.component");
var waive_interest_component_1 = require("./components/transactions/approval/waive-interest/waive-interest.component");
var write_off_component_1 = require("./components/transactions/approval/write-off/write-off.component");
var loan_limit_component_1 = require("./components/transactions/approval/loan-limit/loan-limit.component");
var modal_1 = require("ngx-bootstrap/modal");
var ng_chartjs_1 = require("ng-chartjs");
var tabs_1 = require("ngx-bootstrap/tabs");
var ng_bootstrap_1 = require("@ng-bootstrap/ng-bootstrap");
var datepicker_1 = require("ngx-bootstrap/datepicker");
var personal_profile_component_1 = require("./components/profile/personal-profile/personal-profile.component");
var approve_central_users_component_1 = require("./components/approve-central-users/approve-central-users.component");
var select_the_Area_component_1 = require("./components/select-the-Area/select-the-Area.component");
var set_managers_component_1 = require("./components/set-managers/set-managers.component");
var area_managers_component_1 = require("./components/set-managers/area-managers/area-managers.component");
var town_managers_component_1 = require("./components/set-managers/town-managers/town-managers.component");
var station_managers_component_1 = require("./components/set-managers/station-managers/station-managers.component");
var set_loan_tenure_component_1 = require("./components/transactions/loans/set-loan-tenure/set-loan-tenure.component");
var loan_tenure_component_1 = require("./components/transactions/approval/loan-tenure/loan-tenure.component");
var ngx_alerts_1 = require("ngx-alerts");
var set_loan_commision_component_1 = require("./components/transactions/loans/set-loan-commision/set-loan-commision.component");
var set_loan_accrual_component_1 = require("./components/transactions/loans/set-loan-accrual/set-loan-accrual.component");
var micro_loan_component_1 = require("./components/transactions/approval/micro-loan/micro-loan.component");
var ngx_pinch_zoom_1 = require("ngx-pinch-zoom");
var loan_commission_rate_component_1 = require("./components/transactions/approval/loan-commission-rate/loan-commission-rate.component");
var loan_accrual_days_component_1 = require("./components/transactions/approval/loan-accrual-days/loan-accrual-days.component");
var CentralmanagementModule = /** @class */ (function () {
    function CentralmanagementModule() {
    }
    CentralmanagementModule = __decorate([
        core_1.NgModule({
            declarations: [
                centralmanagement_component_1.CentralmanagementComponent,
                dashboard_component_1.DashboardComponent,
                profile_component_1.ProfileComponent,
                users_component_1.UsersComponent,
                clients_component_1.ClientsComponent,
                areas_component_1.AreasComponent,
                pages_core_central_component_1.PagesCoreCentralComponent,
                right_panel_central_component_1.RightPanelCentralComponent,
                left_panel_central_component_1.LeftPanelCentralComponent,
                header_central_component_1.HeaderCentralComponent,
                content_section_central_component_1.ContentSectionCentralComponent,
                reports_component_1.ReportsComponent,
                create_component_1.CreateComponent,
                transactions_component_1.TransactionsComponent,
                create_area_component_1.CreateAreaComponent,
                create_town_component_1.CreateTownComponent,
                create_station_component_1.CreateStationComponent,
                approvals_component_1.ApprovalsComponent,
                approve_areas_component_1.ApproveAreasComponent,
                approve_towns_component_1.ApproveTownsComponent,
                approve_stations_component_1.ApproveStationsComponent,
                loans_component_1.LoansComponent,
                float_component_1.FloatComponent,
                approval_component_1.ApprovalComponent,
                set_loan_limit_component_1.SetLoanLimitComponent,
                set_loan_rate_component_1.SetLoanRateComponent,
                set_loan_commision_component_1.SetLoanCommissionComponent,
                set_loan_accrual_component_1.SetLoanAcrualComponent,
                micro_loan_component_1.MicroLoanComponent,
                deposit_float_component_1.DepositFloatComponent,
                withdraw_float_component_1.WithdrawFloatComponent,
                reverse_interest_component_1.ReverseInterestComponent,
                reverse_principle_component_1.ReversePrincipleComponent,
                interest_rate_component_1.InterestRateComponent,
                withdraw_savings_component_1.WithdrawSavingsComponent,
                waive_interest_component_1.WaiveInterestComponent,
                write_off_component_1.WriteOffComponent,
                loan_limit_component_1.LoanLimitComponent,
                personal_profile_component_1.PersonalProfileComponent,
                approve_central_users_component_1.ApproveCentralUsersComponent,
                select_the_Area_component_1.SelectTheAreaComponent,
                set_managers_component_1.SetManagersComponent,
                area_managers_component_1.AreaManagersComponent,
                town_managers_component_1.TownManagersComponent,
                station_managers_component_1.StationManagersComponent,
                set_loan_tenure_component_1.SetLoanTenureComponent,
                loan_tenure_component_1.LoanTenureComponent,
                loan_commission_rate_component_1.LoanCommissionRateComponent,
                loan_accrual_days_component_1.LoanAccrualDaysComponent,
            ],
            imports: [
                common_1.CommonModule,
                centralmanagement_routing_module_1.CentralmanagementRoutingModule,
                shared_module_1.SharedModule,
                forms_1.ReactiveFormsModule,
                ngx_spinner_1.NgxSpinnerModule,
                tooltip_1.TooltipModule.forRoot(),
                modal_1.ModalModule.forRoot(),
                ng_chartjs_1.NgChartjsModule,
                ng_chartjs_1.NgChartjsModule.registerPlugin(['inlinePlugin']),
                tabs_1.TabsModule.forRoot(),
                datepicker_1.DatepickerModule,
                datepicker_1.BsDatepickerModule,
                ngx_pinch_zoom_1.PinchZoomModule,
                ng_bootstrap_1.NgbModule,
                ngx_alerts_1.AlertModule.forRoot({ maxMessages: 5, timeout: 7000 }),
            ]
        })
    ], CentralmanagementModule);
    return CentralmanagementModule;
}());
exports.CentralmanagementModule = CentralmanagementModule;
