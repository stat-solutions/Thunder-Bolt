"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.StationmanagementModule = void 0;
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var stationmanagement_routing_module_1 = require("./stationmanagement-routing.module");
var stationmanagement_component_1 = require("./stationmanagement.component");
var shared_module_1 = require("../shared/shared.module");
var forms_1 = require("@angular/forms");
var dashboard_component_1 = require("./components/dashboard/dashboard.component");
var profile_component_1 = require("./components/profile/profile.component");
var pages_core_station_component_1 = require("./pages-core/pages-core-station.component");
var right_panel_station_component_1 = require("./common/right-panel/right-panel-station.component");
var left_panel_station_component_1 = require("./common/left-panel/left-panel-station.component");
var header_station_component_1 = require("./common/header/header-station.component");
var content_section_station_component_1 = require("./content-section/content-section-station.component");
var reports_component_1 = require("./components/reports/reports.component");
var modal_1 = require("ngx-bootstrap/modal");
var tabs_1 = require("ngx-bootstrap/tabs");
var tooltip_1 = require("ngx-bootstrap/tooltip");
var ngx_spinner_1 = require("ngx-spinner");
var datepicker_1 = require("ngx-bootstrap/datepicker");
var cash_ledger_component_1 = require("./components/reports/cash-ledger/cash-ledger.component");
var paid_ledger_component_1 = require("./components/reports/paid-ledger/paid-ledger.component");
var borrowed_ledger_component_1 = require("./components/reports/borrowed-ledger/borrowed-ledger.component");
var ng_chartjs_1 = require("ng-chartjs");
var personal_profile_component_1 = require("./components/profile/personal-profile/personal-profile.component");
var StationmanagementModule = /** @class */ (function () {
    function StationmanagementModule() {
    }
    StationmanagementModule = __decorate([
        core_1.NgModule({
            declarations: [
                stationmanagement_component_1.StationmanagementComponent,
                dashboard_component_1.DashboardComponent,
                profile_component_1.ProfileComponent,
                pages_core_station_component_1.PagesCoreStationComponent,
                right_panel_station_component_1.RightPanelStationComponent,
                left_panel_station_component_1.LeftPanelStationComponent,
                header_station_component_1.HeaderStationComponent,
                content_section_station_component_1.ContentSectionStationComponent,
                reports_component_1.ReportsComponent,
                cash_ledger_component_1.CashLedgerComponent,
                paid_ledger_component_1.PaidLedgerComponent,
                borrowed_ledger_component_1.BorrowedLedgerComponent,
                personal_profile_component_1.PersonalProfileComponent,
            ],
            imports: [
                common_1.CommonModule,
                stationmanagement_routing_module_1.StationmanagementRoutingModule,
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
    ], StationmanagementModule);
    return StationmanagementModule;
}());
exports.StationmanagementModule = StationmanagementModule;
