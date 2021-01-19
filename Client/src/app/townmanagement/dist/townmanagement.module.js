"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.TownmanagementModule = void 0;
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var townmanagement_routing_module_1 = require("./townmanagement-routing.module");
var townmanagement_component_1 = require("./townmanagement.component");
var shared_module_1 = require("../shared/shared.module");
var forms_1 = require("@angular/forms");
var dashboard_component_1 = require("./components/dashboard/dashboard.component");
var profile_component_1 = require("./components/profile/profile.component");
var pages_core_town_component_1 = require("./pages-core/pages-core-town.component");
var right_panel_town_component_1 = require("./common/right-panel/right-panel-town.component");
var header_town_component_1 = require("./common/header/header-town.component");
var content_section_town_component_1 = require("./content-section/content-section-town.component");
var left_panel_town_component_1 = require("./common/left-panel/left-panel-town.component");
var tabs_1 = require("ngx-bootstrap/tabs");
var tooltip_1 = require("ngx-bootstrap/tooltip");
var ngx_spinner_1 = require("ngx-spinner");
var modal_1 = require("ngx-bootstrap/modal");
var ng_bootstrap_1 = require("@ng-bootstrap/ng-bootstrap");
var datepicker_1 = require("ngx-bootstrap/datepicker");
var enroll_component_1 = require("./components/enroll/enroll.component");
var enroll_client_component_1 = require("./components/enroll/enroll-client/enroll-client.component");
var personal_info_component_1 = require("./components/enroll/enroll-client/personal-info/personal-info.component");
var enroll_stage_component_1 = require("./components/enroll/enroll-stage/enroll-stage.component");
var enroll_boda_stage_component_1 = require("./components/enroll/enroll-stage/enroll-boda-stage/enroll-boda-stage.component");
var enroll_taxi_stage_component_1 = require("./components/enroll/enroll-stage/enroll-taxi-stage/enroll-taxi-stage.component");
var cluster_and_taxipark_component_1 = require("./components/enroll/cluster-and-taxipark/cluster-and-taxipark.component");
var enroll_cluster_component_1 = require("./components/enroll/cluster-and-taxipark/enroll-cluster/enroll-cluster.component");
var enroll_taxi_park_component_1 = require("./components/enroll/cluster-and-taxipark/enroll-taxi-park/enroll-taxi-park.component");
var create_station_component_1 = require("./components/create-station/create-station.component");
var reports_component_1 = require("./components/reports/reports.component");
var personal_profile_component_1 = require("./components/profile/personal-profile/personal-profile.component");
var edit_client_component_1 = require("./components/enroll/edit-client/edit-client.component");
var edit_personal_info_component_1 = require("./components/enroll/edit-client/edit-personal-info/edit-personal-info.component");
var edit_stage_component_1 = require("./components/enroll/edit-stage/edit-stage.component");
var edit_boda_stage_component_1 = require("./components/enroll/edit-stage/edit-boda-stage/edit-boda-stage.component");
var edit_taxi_stage_component_1 = require("./components/enroll/edit-stage/edit-taxi-stage/edit-taxi-stage.component");
var ngx_alerts_1 = require("ngx-alerts");
var micro_loans_component_1 = require("./components/micro-loans/micro-loans.component");
var get_loan_component_1 = require("./components/micro-loans/get-loan/get-loan.component");
var pay_loan_component_1 = require("./components/micro-loans/pay-loan/pay-loan.component");
var comfirm_loan_component_1 = require("./components/micro-loans/comfirm-loan/comfirm-loan.component");
var area_component_1 = require("./components/reports/area/area.component");
var clients_component_1 = require("./components/reports/clients/clients.component");
var users_component_1 = require("./components/reports/users/users.component");
var adjustments_component_1 = require("./components/adjustments/adjustments.component");
var write_off_component_1 = require("./components/adjustments/write-off/write-off.component");
var waive_interest_component_1 = require("./components/adjustments/waive-interest/waive-interest.component");
var set_loan_limit_component_1 = require("./components/adjustments/set-loan-limit/set-loan-limit.component");
var set_interest_rate_component_1 = require("./components/adjustments/set-interest-rate/set-interest-rate.component");
var reverse_principal_component_1 = require("./components/adjustments/reverse-principal/reverse-principal.component");
var loan_tenure_component_1 = require("./components/adjustments/loan-tenure/loan-tenure.component");
var accrual_days_component_1 = require("./components/adjustments/accrual-days/accrual-days.component");
var TownmanagementModule = /** @class */ (function () {
    function TownmanagementModule() {
    }
    TownmanagementModule = __decorate([
        core_1.NgModule({
            declarations: [
                townmanagement_component_1.TownmanagementComponent,
                dashboard_component_1.DashboardComponent,
                profile_component_1.ProfileComponent,
                pages_core_town_component_1.PagesCoreTownComponent,
                right_panel_town_component_1.RightPanelTownComponent,
                left_panel_town_component_1.LeftPanelTownComponent,
                header_town_component_1.HeaderTownComponent,
                content_section_town_component_1.ContentSectionTownComponent,
                enroll_component_1.EnrollComponent,
                enroll_client_component_1.EnrollClientComponent,
                micro_loans_component_1.MicroLoansComponent,
                get_loan_component_1.GetLoanComponent,
                comfirm_loan_component_1.ComfirmLoanComponent,
                pay_loan_component_1.PayLoanComponent,
                personal_info_component_1.PersonalInfoComponent,
                enroll_stage_component_1.EnrollStageComponent,
                enroll_boda_stage_component_1.EnrollBodaStageComponent,
                enroll_taxi_stage_component_1.EnrollTaxiStageComponent,
                cluster_and_taxipark_component_1.ClusterAndTaxiparkComponent,
                enroll_cluster_component_1.EnrollClusterComponent,
                enroll_taxi_park_component_1.EnrollTaxiParkComponent,
                create_station_component_1.CreateStationComponent,
                reports_component_1.ReportsComponent,
                personal_profile_component_1.PersonalProfileComponent,
                edit_client_component_1.EditClientComponent,
                edit_personal_info_component_1.EditPersonalInfoComponent,
                edit_stage_component_1.EditStageComponent,
                edit_boda_stage_component_1.EditBodaStageComponent,
                edit_taxi_stage_component_1.EditTaxiStageComponent,
                area_component_1.AreaComponent,
                clients_component_1.ClientsComponent,
                users_component_1.UsersComponent,
                adjustments_component_1.AdjustmentsComponent,
                write_off_component_1.WriteOffComponent,
                waive_interest_component_1.WaiveInterestComponent,
                set_loan_limit_component_1.SetLoanLimitComponent,
                set_interest_rate_component_1.SetInterestRateComponent,
                reverse_principal_component_1.ReversePrincipalComponent,
                loan_tenure_component_1.LoanTenureComponent,
                accrual_days_component_1.AccrualDaysComponent,
            ],
            imports: [
                common_1.CommonModule,
                townmanagement_routing_module_1.TownmanagementRoutingModule,
                shared_module_1.SharedModule,
                forms_1.ReactiveFormsModule,
                ngx_spinner_1.NgxSpinnerModule,
                tabs_1.TabsModule.forRoot(),
                datepicker_1.DatepickerModule,
                datepicker_1.BsDatepickerModule,
                ng_bootstrap_1.NgbModule,
                modal_1.ModalModule.forRoot(),
                tooltip_1.TooltipModule.forRoot(),
                ngx_alerts_1.AlertModule.forRoot({ maxMessages: 5, timeout: 7000 }),
            ]
        })
    ], TownmanagementModule);
    return TownmanagementModule;
}());
exports.TownmanagementModule = TownmanagementModule;
