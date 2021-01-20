import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StationofficerRoutingModule } from './stationofficer-routing.module';
import { StationofficerComponent } from './stationofficer.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProfileComponent } from './components/profile/profile.component';
import { PagesCoreOfficerComponent } from './pages-core/pages-core-officer.component';
import { RightPanelOfficerComponent } from './common/right-panel/right-panel-officer.component';
import { LeftPanelOfficerComponent } from './common/left-panel/left-panel-officer.component';
import { HeaderOfficerComponent } from './common/header/header-officer.component';
import { ContentSectionOfficerComponent } from './content-section/content-section-officer.component';
import { LendComponent } from './components/lend/lend.component';
import { PayComponent } from './components/pay/pay.component';
import { SavingsComponent } from './components/savings/savings.component';
import { EnrollComponent } from './components/enroll/enroll.component';
import { AdjustmentsComponent } from './components/adjustments/adjustments.component';
import { DepositComponent } from './components/savings/deposit/deposit.component';
import { WithdrawComponent } from './components/savings/withdraw/withdraw.component';
import { SetInterestRateComponent } from './components/adjustments/set-interest-rate/set-interest-rate.component';
import { SetLoanLimitComponent } from './components/adjustments/set-loan-limit/set-loan-limit.component';
import { ReduceRateComponent } from './components/adjustments/reduce-rate/reduce-rate.component';
import { ReversePrincipleComponent } from './components/adjustments/reverse-principle/reverse-principle.component';
import { WaiveInterestComponent } from './components/adjustments/waive-interest/waive-interest.component';
import { WriteOffComponent } from './components/adjustments/write-off/write-off.component';
import { ReportsComponent } from './components/reports/reports.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgChartjsModule } from 'ng-chartjs';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DatepickerModule, BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { EnrollClientComponent } from './components/enroll/enroll-client/enroll-client.component';
import { EnrollStageComponent } from './components/enroll/enroll-stage/enroll-stage.component';
import { EnrollTaxiStageComponent } from './components/enroll/enroll-stage/enroll-taxi-stage/enroll-taxi-stage.component';
import { EnrollBodaStageComponent } from './components/enroll/enroll-stage/enroll-boda-stage/enroll-boda-stage.component';
import { PersonalInfoComponent } from './components/enroll/enroll-client/personal-info/personal-info.component';
import { PersonalProfileComponent } from './components/profile/personal-profile/personal-profile.component';
import { AlertModule } from 'ngx-alerts';
import { AreaComponent } from './components/reports/area/area.component';
import { ClientsComponent } from './components/reports/clients/clients.component';
import { UsersComponent } from './components/reports/users/users.component';
import { PinchZoomModule } from 'ngx-pinch-zoom';

@NgModule({
  declarations: [
    StationofficerComponent,
    DashboardComponent,
    ProfileComponent,
    PagesCoreOfficerComponent,
    RightPanelOfficerComponent,
    LeftPanelOfficerComponent,
    HeaderOfficerComponent,
    ContentSectionOfficerComponent,
    LendComponent,
    PayComponent,
    SavingsComponent,
    EnrollComponent,
    AdjustmentsComponent,
    DepositComponent,
    WithdrawComponent,
    SetInterestRateComponent,
    SetLoanLimitComponent,
    ReduceRateComponent,
    ReversePrincipleComponent,
    WaiveInterestComponent,
    WriteOffComponent,
    ReportsComponent,
    EnrollClientComponent,
    EnrollStageComponent,
    EnrollTaxiStageComponent,
    EnrollBodaStageComponent,
    PersonalInfoComponent,
    PersonalProfileComponent,
    AreaComponent,
    ClientsComponent,
    UsersComponent,
  ],

  imports: [
    CommonModule,
    StationofficerRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    TabsModule.forRoot(),
    DatepickerModule,
    BsDatepickerModule,
    ModalModule.forRoot(),
    TooltipModule.forRoot(),
    NgChartjsModule,
    NgChartjsModule.registerPlugin(['inlinePlugin']),
    NgbModule,
    PinchZoomModule,
    AlertModule.forRoot({ maxMessages: 5, timeout: 7000 }),
  ]
})
export class StationofficerModule { }
