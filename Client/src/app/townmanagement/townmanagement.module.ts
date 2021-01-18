import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TownmanagementRoutingModule } from './townmanagement-routing.module';
import { TownmanagementComponent } from './townmanagement.component';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProfileComponent } from './components/profile/profile.component';
import { PagesCoreTownComponent } from './pages-core/pages-core-town.component';
import { RightPanelTownComponent } from './common/right-panel/right-panel-town.component';
import { HeaderTownComponent } from './common/header/header-town.component';
import { ContentSectionTownComponent } from './content-section/content-section-town.component';
import { LeftPanelTownComponent } from './common/left-panel/left-panel-town.component';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DatepickerModule, BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { EnrollComponent } from './components/enroll/enroll.component';
import { EnrollClientComponent } from './components/enroll/enroll-client/enroll-client.component';
import { PersonalInfoComponent } from './components/enroll/enroll-client/personal-info/personal-info.component';
import { EnrollStageComponent } from './components/enroll/enroll-stage/enroll-stage.component';
import { EnrollBodaStageComponent } from './components/enroll/enroll-stage/enroll-boda-stage/enroll-boda-stage.component';
import { EnrollTaxiStageComponent } from './components/enroll/enroll-stage/enroll-taxi-stage/enroll-taxi-stage.component';
import { ClusterAndTaxiparkComponent } from './components/enroll/cluster-and-taxipark/cluster-and-taxipark.component';
import { EnrollClusterComponent } from './components/enroll/cluster-and-taxipark/enroll-cluster/enroll-cluster.component';
import { EnrollTaxiParkComponent } from './components/enroll/cluster-and-taxipark/enroll-taxi-park/enroll-taxi-park.component';
import { CreateStationComponent } from './components/create-station/create-station.component';
import { ReportsComponent } from './components/reports/reports.component';
import { PersonalProfileComponent } from './components/profile/personal-profile/personal-profile.component';
import { EditClientComponent } from './components/enroll/edit-client/edit-client.component';
import { EditPersonalInfoComponent } from './components/enroll/edit-client/edit-personal-info/edit-personal-info.component';
import { EditStageComponent } from './components/enroll/edit-stage/edit-stage.component';
import { EditBodaStageComponent } from './components/enroll/edit-stage/edit-boda-stage/edit-boda-stage.component';
import { EditTaxiStageComponent } from './components/enroll/edit-stage/edit-taxi-stage/edit-taxi-stage.component';
import { AlertModule } from 'ngx-alerts';
import { MicroLoansComponent } from './components/micro-loans/micro-loans.component';
import { GetLoanComponent } from './components/micro-loans/get-loan/get-loan.component';
import { PayLoanComponent } from './components/micro-loans/pay-loan/pay-loan.component';
import { ComfirmLoanComponent } from './components/micro-loans/comfirm-loan/comfirm-loan.component';
import { AreaComponent } from './components/reports/area/area.component';
import { ClientsComponent } from './components/reports/clients/clients.component';
import { UsersComponent } from './components/reports/users/users.component';
import { AdjustmentsComponent } from './components/adjustments/adjustments.component';
import { WriteOffComponent } from './components/adjustments/write-off/write-off.component';
import { WaiveInterestComponent } from './components/adjustments/waive-interest/waive-interest.component';
import { SetLoanLimitComponent } from './components/adjustments/set-loan-limit/set-loan-limit.component';
import { SetInterestRateComponent } from './components/adjustments/set-interest-rate/set-interest-rate.component';
import { ReversePrincipalComponent } from './components/adjustments/reverse-principal/reverse-principal.component';
import { ReduceRateComponent } from './components/adjustments/reduce-rate/reduce-rate.component';

@NgModule({
  declarations: [
    TownmanagementComponent,
    DashboardComponent,
    ProfileComponent,
    PagesCoreTownComponent,
    RightPanelTownComponent,
    LeftPanelTownComponent,
    HeaderTownComponent,
    ContentSectionTownComponent,
    EnrollComponent,
    EnrollClientComponent,
    MicroLoansComponent,
    GetLoanComponent,
    ComfirmLoanComponent,
    PayLoanComponent,
    PersonalInfoComponent,
    EnrollStageComponent,
    EnrollBodaStageComponent,
    EnrollTaxiStageComponent,
    ClusterAndTaxiparkComponent,
    EnrollClusterComponent,
    EnrollTaxiParkComponent,
    CreateStationComponent,
    ReportsComponent,
    PersonalProfileComponent,
    EditClientComponent,
    EditPersonalInfoComponent,
    EditStageComponent,
    EditBodaStageComponent,
    EditTaxiStageComponent,
    AreaComponent,
    ClientsComponent,
    UsersComponent,
    AdjustmentsComponent,
    WriteOffComponent,
    WaiveInterestComponent,
    SetLoanLimitComponent,
    SetInterestRateComponent,
    ReversePrincipalComponent,
    ReduceRateComponent,
  ],
  imports: [
    CommonModule,
    TownmanagementRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    TabsModule.forRoot(),
    DatepickerModule,
    BsDatepickerModule,
    NgbModule,
    ModalModule.forRoot(),
    TooltipModule.forRoot(),
    AlertModule.forRoot({ maxMessages: 5, timeout: 7000 }),
  ],
})
export class TownmanagementModule {}
