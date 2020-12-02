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
import { CashLedgerComponent } from './components/reports/cash-ledger/cash-ledger.component';
import { PaidLedgerComponent } from './components/reports/paid-ledger/paid-ledger.component';
import { LoansLedgerComponent } from './components/reports/loans-ledger/loans-ledger.component';
import { PersonalProfileComponent } from './components/profile/personal-profile/personal-profile.component';
import { EditClientComponent } from './components/enroll/edit-client/edit-client.component';
import { EditPersonalInfoComponent } from './components/enroll/edit-client/edit-personal-info/edit-personal-info.component';
import { EditStageComponent } from './components/enroll/edit-stage/edit-stage.component';
import { EditBodaStageComponent } from './components/enroll/edit-stage/edit-boda-stage/edit-boda-stage.component';
import { EditTaxiStageComponent } from './components/enroll/edit-stage/edit-taxi-stage/edit-taxi-stage.component';
import { AlertModule } from 'ngx-alerts';

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
    PersonalInfoComponent,
    EnrollStageComponent,
    EnrollBodaStageComponent,
    EnrollTaxiStageComponent,
    ClusterAndTaxiparkComponent,
    EnrollClusterComponent,
    EnrollTaxiParkComponent,
    CreateStationComponent,
    ReportsComponent,
    CashLedgerComponent,
    PaidLedgerComponent,
    LoansLedgerComponent,
    PersonalProfileComponent,
    EditClientComponent,
    EditPersonalInfoComponent,
    EditStageComponent,
    EditBodaStageComponent,
    EditTaxiStageComponent,
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
    ModalModule.forRoot(),
    TooltipModule.forRoot(),
    AlertModule.forRoot({ maxMessages: 5, timeout: 7000 }),
  ]
})
export class TownmanagementModule { }
