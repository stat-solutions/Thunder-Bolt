import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AreamanagementRoutingModule } from './areamanagement-routing.module';
import { AreamanagementComponent } from './areamanagement.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { PagesCoreAreaComponent } from './pages-core/pages-core-area.component';
import { ContentSectionAreaComponent } from './content-section/content-section-area.component';
import { RightPanelAreaComponent } from './common/right-panel/right-panel-area.component';
import { HeaderAreaComponent } from './common/header/header-area.component';
import { LeftPanelAreaComponent } from './common/left-panel/left-panel-area.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProfileComponent } from './components/profile/profile.component';
import { DatepickerModule, BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgChartjsModule } from 'ng-chartjs';
import { CreateComponent } from './components/create/create.component';
import { CreateTownsComponent } from './components/create/create-towns/create-towns.component';
import { ApprovalsComponent } from './components/approvals/approvals.component';
import { WithdrawSavingsComponent } from './components/approvals/loans-approvals/withdraw-savings/withdraw-savings.component';
import { InterestRateComponent } from './components/approvals/loans-approvals/interest-rate/interest-rate.component';
import { LoanLimitComponent } from './components/approvals/loans-approvals/loan-limit/loan-limit.component';
import { ReduceRateComponent } from './components/approvals/loans-approvals/reduce-rate/reduce-rate.component';
import { ReversePrincipleComponent } from './components/approvals/loans-approvals/reverse-principle/reverse-principle.component';
import { WaiveInterestComponent } from './components/approvals/loans-approvals/waive-interest/waive-interest.component';
import { WriteOffComponent } from './components/approvals/loans-approvals/write-off/write-off.component';
import { ReportsComponent } from './components/reports/reports.component';
import { ClientsComponent } from './components/reports/clients/clients.component';
import { UsersComponent } from './components/reports/users/users.component';
import { LoansApprovalsComponent } from './components/approvals/loans-approvals/loans-approvals.component';
import { PersonalProfileComponent } from './components/profile/personal-profile/personal-profile.component';

@NgModule({
  declarations: [
    AreamanagementComponent,
    PagesCoreAreaComponent,
    RightPanelAreaComponent,
    LeftPanelAreaComponent,
    HeaderAreaComponent,
    ContentSectionAreaComponent,
    DashboardComponent,
    ProfileComponent,
    CreateComponent,
    CreateTownsComponent,
    ApprovalsComponent,
    WithdrawSavingsComponent,
    InterestRateComponent,
    LoanLimitComponent,
    ReduceRateComponent,
    ReversePrincipleComponent,
    WaiveInterestComponent,
    WriteOffComponent,
    ReportsComponent,
    ClientsComponent,
    UsersComponent,
    LoansApprovalsComponent,
    PersonalProfileComponent,
  ],
  imports: [
    CommonModule,
    AreamanagementRoutingModule,
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
export class AreamanagementModule { }
