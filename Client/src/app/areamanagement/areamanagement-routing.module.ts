import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PagesCoreAreaComponent } from './pages-core/pages-core-area.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AreaGuard } from '../shared/services/other-services/route-guards/area-guard.service';
import { ProfileComponent } from './components/profile/profile.component';
import { CreateComponent } from './components/create/create.component';
// import { CreateTownsComponent } from './components/create/create-towns/create-towns.component';
import { ApprovalsComponent } from './components/approvals/approvals.component';
import { WithdrawSavingsComponent } from './components/approvals/loans-approvals/withdraw-savings/withdraw-savings.component';
import { InterestRateComponent } from './components/approvals/loans-approvals/interest-rate/interest-rate.component';
import { LoanLimitComponent } from './components/approvals/loans-approvals/loan-limit/loan-limit.component';
import { ReduceRateComponent } from './components/approvals/loans-approvals/reduce-rate/reduce-rate.component';
import { ReversePrincipleComponent } from './components/approvals/loans-approvals/reverse-principle/reverse-principle.component';
import { WaiveInterestComponent } from './components/approvals/loans-approvals/waive-interest/waive-interest.component';
import { WriteOffComponent } from './components/approvals/loans-approvals/write-off/write-off.component';
import { LoansApprovalsComponent } from './components/approvals/loans-approvals/loans-approvals.component';
import { ClientsComponent } from './components/reports/clients/clients.component';
import { ReportsComponent } from './components/reports/reports.component';
import { UsersComponent } from './components/reports/users/users.component';
// import { UsersReportsComponent } from './components/reports/users-reports/users-reports.component';
// import { ClientsReportsComponent } from './components/reports/clients-reports/clients-reports.component';
import { VerifyClientComponent } from './components/approvals/verify-client/verify-client.component';
import { LoansrevenueComponent } from './components/reports/loansrevenue/loansrevenue.component';

const routes: Routes = [
  {
    path: '',
    component: PagesCoreAreaComponent,
    canActivateChild: [AreaGuard],
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'dashboard',
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'selecttowns',
        component: CreateComponent
      },
      {
        path: 'approvals',
        component: ApprovalsComponent,
        children: [
          {
            path: 'verifyclients',
            component: VerifyClientComponent,
          },
          {
            path: 'loanapprovals',
            component: LoansApprovalsComponent,
        children: [
          {
            path: 'reducerate',
            component: ReduceRateComponent,
          },
          {
            path: 'verifyclients',
            component: VerifyClientComponent,
          },
          {
            path: 'reverseprinciple',
            component: ReversePrincipleComponent,
          },
          {
            path: 'interestrate',
            component: InterestRateComponent,
          },
          {
            path: 'withdrawsavings',
            component: WithdrawSavingsComponent,
          },
          {
            path: 'waiveinterest',
            component: WaiveInterestComponent,
          },
          {
            path: 'writeoff',
            component: WriteOffComponent,
          },
          {
            path: 'loanlimit',
            component: LoanLimitComponent,
          },
        ],
      }
    ]
  },
      {
        path: 'reports',
        component: ReportsComponent,
        children: [
          {
            path: 'loansrevenue',
            component: LoansrevenueComponent
          },
          {
            path: 'clientsreports',
            component: ClientsComponent,
          },
          {
            path: 'usersreports',
            component: UsersComponent,
          },
        ]
      },
      {
        path: 'profile',
        component: ProfileComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AreamanagementRoutingModule { }
