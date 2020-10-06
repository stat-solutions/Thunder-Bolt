import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StationmanagementRoutingModule } from './stationmanagement-routing.module';
import { StationmanagementComponent } from './stationmanagement.component';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProfileComponent } from './components/profile/profile.component';
import { PagesCoreStationComponent } from './pages-core/pages-core-station.component';
import { RightPanelStationComponent } from './common/right-panel/right-panel-station.component';
import { LeftPanelStationComponent } from './common/left-panel/left-panel-station.component';
import { HeaderStationComponent } from './common/header/header-station.component';
import { ContentSectionStationComponent } from './content-section/content-section-station.component';
import { ReportsComponent } from './components/reports/reports.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { NgxSpinnerModule } from 'ngx-spinner';
import { DatepickerModule, BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { CashLedgerComponent } from './components/reports/cash-ledger/cash-ledger.component';
import { PaidLedgerComponent } from './components/reports/paid-ledger/paid-ledger.component';
import { BorrowedLedgerComponent } from './components/reports/borrowed-ledger/borrowed-ledger.component';
import { NgChartjsModule } from 'ng-chartjs';

@NgModule({
  declarations: [
    StationmanagementComponent,
    DashboardComponent,
    ProfileComponent,
    PagesCoreStationComponent,
    RightPanelStationComponent,
    LeftPanelStationComponent,
    HeaderStationComponent,
    ContentSectionStationComponent,
    ReportsComponent,
    CashLedgerComponent,
    PaidLedgerComponent,
    BorrowedLedgerComponent,
  ],
  imports: [
    CommonModule,
    StationmanagementRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    TabsModule.forRoot(),
    DatepickerModule,
    BsDatepickerModule,
    ModalModule.forRoot(),
    TooltipModule.forRoot(),
    NgChartjsModule,
    NgChartjsModule.registerPlugin(['inlinePlugin'])
  ]
})
export class StationmanagementModule { }
