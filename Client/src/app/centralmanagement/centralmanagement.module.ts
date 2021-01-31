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
import { ClientsComponent } from './components/reports/clients/clients.component';
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
import { ReverseInterestComponent } from './components/transactions/approval/reverse-interest/reverse-interest.component';
import { ReversePrincipleComponent } from './components/transactions/approval/reverse-principle/reverse-principle.component';
import { InterestRateComponent } from './components/transactions/approval/interest-rate/interest-rate.component';
import { WithdrawSavingsComponent } from './components/transactions/approval/withdraw-savings/withdraw-savings.component';
import { WaiveInterestComponent } from './components/transactions/approval/waive-interest/waive-interest.component';
import { WriteOffComponent } from './components/transactions/approval/write-off/write-off.component';
import { LoanLimitComponent } from './components/transactions/approval/loan-limit/loan-limit.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgChartjsModule } from 'ng-chartjs';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DatepickerModule, BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { PersonalProfileComponent } from './components/profile/personal-profile/personal-profile.component';
import { ApproveCentralUsersComponent } from './components/approve-central-users/approve-central-users.component';
import { SelectTheAreaComponent } from './components/select-the-Area/select-the-Area.component';
import { SetManagersComponent } from './components/set-managers/set-managers.component';
import { AreaManagersComponent } from './components/set-managers/area-managers/area-managers.component';
import { TownManagersComponent } from './components/set-managers/town-managers/town-managers.component';
import { StationManagersComponent } from './components/set-managers/station-managers/station-managers.component';
import { SetLoanTenureComponent } from './components/transactions/loans/set-loan-tenure/set-loan-tenure.component';
import { LoanTenureComponent } from './components/transactions/approval/loan-tenure/loan-tenure.component';
import { AlertModule } from 'ngx-alerts';
import { SetLoanCommissionComponent } from './components/transactions/loans/set-loan-commision/set-loan-commision.component';
import { SetLoanAcrualComponent } from './components/transactions/loans/set-loan-accrual/set-loan-accrual.component';
import { MicroLoanComponent } from './components/transactions/approval/micro-loan/micro-loan.component';
import { PinchZoomModule } from 'ngx-pinch-zoom';
import { LoanAccrualDaysComponent } from './components/transactions/approval/loan-accrual-days/loan-accrual-days.component';
import { LoanAmortizeCycleComponent } from './components/transactions/approval/loan-amortize-cycle/loan-amortize-cycle.component';
import { LoanAmortizeTypeComponent } from './components/transactions/approval/loan-amortize-type/loan-amortize-type.component';
import { LoanCommissionRateComponent } from './components/transactions/approval/loan-commission-rate/loan-commission-rate.component';
import { SetLoanAmortizeCycleComponent } from './components/transactions/loans/set-loan-amortize-cycle/set-loan-amortize-cycle.component';
import { SetLoanAmortizeTypeComponent } from './components/transactions/loans/set-loan-amortize-type/set-loan-amortize-type.component';
import {NgxPaginationModule} from 'ngx-pagination';

@NgModule({
  declarations: [
    CentralmanagementComponent,
    DashboardComponent,
    ProfileComponent,
    UsersComponent,
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
    SetLoanCommissionComponent,
    SetLoanAcrualComponent,
    MicroLoanComponent,
    DepositFloatComponent,
    WithdrawFloatComponent,
    ReverseInterestComponent,
    ReversePrincipleComponent,
    InterestRateComponent,
    WithdrawSavingsComponent,
    WaiveInterestComponent,
    WriteOffComponent,
    LoanLimitComponent,
    PersonalProfileComponent,
    ApproveCentralUsersComponent,
    SelectTheAreaComponent,
    SetManagersComponent,
    AreaManagersComponent,
    TownManagersComponent,
    StationManagersComponent,
    SetLoanTenureComponent,
    LoanTenureComponent,
    LoanAccrualDaysComponent,
    LoanAmortizeCycleComponent,
    LoanAmortizeTypeComponent,
    SetLoanAmortizeCycleComponent,
    SetLoanAmortizeTypeComponent,
    LoanCommissionRateComponent
  ],
  imports: [
    CommonModule,
    CentralmanagementRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    NgChartjsModule,
    NgChartjsModule.registerPlugin(['inlinePlugin']),
    TabsModule.forRoot(),
    DatepickerModule,
    BsDatepickerModule,
    PinchZoomModule,
    NgxPaginationModule,
    NgbModule,
    AlertModule.forRoot({ maxMessages: 5, timeout: 7000 }),
  ],
})
export class CentralmanagementModule {}
