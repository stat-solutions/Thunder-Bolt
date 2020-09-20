import { AreasComponent } from './components/reports/areas/areas.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxSpinnerModule } from 'ngx-spinner';
import { CentralmanagementRoutingModule } from './centralmanagement-routing.module';
import { CentralmanagementComponent } from './centralmanagement.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ContentSectionCentralComponent } from './content-section/content-section-central.component';
import { HeaderCentralComponent } from './common/header/header-central.component';
import { LeftPanelCentralComponent } from './common/left-panel/left-panel-central.component';
import { RightPanelCentralComponent } from './common/right-panel/right-panel-central.component';
import { PagesCoreCentralComponent } from './pages-core/pages-core-central.component';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ReportsComponent } from './components/reports/reports.component';
<<<<<<< HEAD
=======
import { AreasComponent } from './components/reports/areas/areas.component';
>>>>>>> d8fe00a... first commit of central module
import { ClientsComponent } from './components/reports/clients/clients.component';
import { TownsComponent } from './components/reports/towns/towns.component';
import { StationsComponent } from './components/reports/stations/stations.component';
import { UsersComponent } from './components/reports/users/users.component';
import { CreateComponent } from './components/create/create.component';
import { TransactionsComponent } from './components/transactions/transactions.component';
import { CreateAreaComponent } from './components/create/create-area/create-area.component';
import { CreateTownComponent } from './components/create/create-town/create-town.component';
import { CreateStationComponent } from './components/create/create-station/create-station.component';
import { ApprovalsComponent } from './components/approvals/approvals.component';
import { ApproveAreasComponent } from './components/approvals/approve-areas/approve-areas.component';
import { ApproveTownsComponent } from './components/approvals/approve-towns/approve-towns.component';
import { ApproveStationsComponent } from './components/approvals/approve-stations/approve-stations.component';
import { LoansComponent } from './components/transactions/loans/loans.component';
import { FloatComponent } from './components/transactions/float/float.component';
import { ApprovalComponent } from './components/transactions/approval/approval.component';
import { SetLoanLimitComponent } from './components/transactions/loans/set-loan-limit/set-loan-limit.component';
import { SetLoanRateComponent } from './components/transactions/loans/set-loan-rate/set-loan-rate.component';
import { DepositFloatComponent } from './components/transactions/float/deposit-float/deposit-float.component';
import { WithdrawFloatComponent } from './components/transactions/float/withdraw-float/withdraw-float.component';
import { ReduceRateComponent } from './components/transactions/approval/reduce-rate/reduce-rate.component';
import { ReversePrincipleComponent } from './components/transactions/approval/reverse-principle/reverse-principle.component';
import { InterestRateComponent } from './components/transactions/approval/interest-rate/interest-rate.component';
import { WithdrawSavingsComponent } from './components/transactions/approval/withdraw-savings/withdraw-savings.component';
import { WaiveInterestComponent } from './components/transactions/approval/waive-interest/waive-interest.component';
import { WriteOffComponent } from './components/transactions/approval/write-off/write-off.component';
import { LoanLimitComponent } from './components/transactions/approval/loan-limit/loan-limit.component';
import { FloatApprovalComponent } from './components/transactions/approval/float-approval/float-approval.component';
<<<<<<< HEAD
import { ModalModule } from "ngx-bootstrap/modal";
=======
>>>>>>> d8fe00a... first commit of central module

@NgModule({
  declarations: [
    CentralmanagementComponent,
    DashboardComponent,
    ProfileComponent,
    UsersComponent,
    StationsComponent,
    TownsComponent,
    ClientsComponent,
    AreasComponent,
    PagesCoreCentralComponent,
    RightPanelCentralComponent,
    LeftPanelCentralComponent,
    HeaderCentralComponent,
    ContentSectionCentralComponent,
    ReportsComponent,
    CreateComponent,
    TransactionsComponent,
    CreateAreaComponent,
    CreateTownComponent,
    CreateStationComponent,
    ApprovalsComponent,
    ApproveAreasComponent,
    ApproveTownsComponent,
    ApproveStationsComponent,
    LoansComponent,
    FloatComponent,
    ApprovalComponent,
    SetLoanLimitComponent,
    SetLoanRateComponent,
    DepositFloatComponent,
    WithdrawFloatComponent,
    ReduceRateComponent,
    ReversePrincipleComponent,
    InterestRateComponent,
    WithdrawSavingsComponent,
    WaiveInterestComponent,
    WriteOffComponent,
    LoanLimitComponent,
    FloatApprovalComponent,
  ],
<<<<<<< HEAD
=======

>>>>>>> d8fe00a... first commit of central module
  imports: [
    CommonModule,
    CentralmanagementRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    TooltipModule.forRoot(),
<<<<<<< HEAD
    ModalModule.forRoot(),
=======
>>>>>>> d8fe00a... first commit of central module
  ],
})
export class CentralmanagementModule {}
