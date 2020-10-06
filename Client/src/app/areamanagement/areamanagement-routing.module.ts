import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PagesCoreAreaComponent } from './pages-core/pages-core-area.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RandomGuard } from '../shared/services/other-services/route-guards/random-guard.service';
import { ProfileComponent } from './components/profile/profile.component';
import { ClientsComponent } from './components/reports/clients/clients.component';
import { ReportsComponent } from './components/reports/reports.component';
import { UsersComponent } from './components/reports/users/users.component';
import { CreateComponent } from './components/create/create.component';
import { CreateTownsComponent } from './components/create/create-towns/create-towns.component';
import { CreateStationsComponent } from './components/create/create-stations/create-stations.component';
import { ApprovalsComponent } from './components/approvals/approvals.component';
import { WithdrawSavingsComponent } from './components/approvals/loans-approvals/withdraw-savings/withdraw-savings.component';
import { StationsComponent } from './components/approvals/create-approvals/stations/stations.component';
import { TownsComponent } from './components/approvals/create-approvals/towns/towns.component';
import { InterestRateComponent } from './components/approvals/loans-approvals/interest-rate/interest-rate.component';
import { LoanLimitComponent } from './components/approvals/loans-approvals/loan-limit/loan-limit.component';
import { ReduceRateComponent } from './components/approvals/loans-approvals/reduce-rate/reduce-rate.component';
import { ReversePrincipleComponent } from './components/approvals/loans-approvals/reverse-principle/reverse-principle.component';
import { WaiveInterestComponent } from './components/approvals/loans-approvals/waive-interest/waive-interest.component';
import { WriteOffComponent } from './components/approvals/loans-approvals/write-off/write-off.component';
import { CashLedgerComponent } from '../townmanagement/components/reports/cash-ledger/cash-ledger.component';
import { LoansLedgerComponent } from '../townmanagement/components/reports/loans-ledger/loans-ledger.component';
import { PaidLedgerComponent } from '../townmanagement/components/reports/paid-ledger/paid-ledger.component';
import { CreateApprovalsComponent } from './components/approvals/create-approvals/create-approvals.component';
import { LoansApprovalsComponent } from './components/approvals/loans-approvals/loans-approvals.component';
import { PersonalProfileComponent } from '../townmanagement/components/profile/personal-profile/personal-profile.component';
import { SetPasswordComponent } from '../townmanagement/components/profile/set-password/set-password.component';

const routes: Routes = [{
    path: '',
    component: PagesCoreAreaComponent,
    canActivateChild: [RandomGuard],
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'dashboard'
      },
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'create',
        component: CreateComponent,
        children: [
          {
            path: 'createstations',
            component: CreateStationsComponent
          },
          {
            path: 'createtowns',
            component: CreateTownsComponent
          }
        ]
        },
      {
        path: 'approvals',
        component: ApprovalsComponent,
        children: [
      {
        path: 'loansapprovals',
        component: LoansApprovalsComponent,
        children: [
          {
            path: 'reducerate',
            component: ReduceRateComponent
          },
          {
            path: 'reverseprinciple',
            component: ReversePrincipleComponent
          },
          {
            path: 'interestrate',
            component: InterestRateComponent
          },
          {
            path: 'withdrawsavings',
            component: WithdrawSavingsComponent
          },
          {
            path: 'waiveinterest',
            component: WaiveInterestComponent
          },
          {
            path: 'writeoff',
            component: WriteOffComponent
          },
          {
            path: 'loanlimit',
            component: LoanLimitComponent
          }
        ]
    },
    {
      path: 'createapprovals',
      component: CreateApprovalsComponent,
      children: [
        {
          path: 'approvestations',
          component: StationsComponent
        },
        {
          path: 'approvetowns',
          component: TownsComponent
        }
      ]
    }
    ]
  },
  {
    path: 'reports',
    component: ReportsComponent,
    children: [
      {
        path: 'stationsreports',
        component: StationsComponent,
        children: [
          {
            path: 'cashledger',
            component: CashLedgerComponent
          },
          {
            path: 'loansledger',
            component: LoansLedgerComponent
          },
          {
            path: 'paymentsledger',
            component: PaidLedgerComponent
          }
        ]
      },
      {
        path: 'townsreports',
        component: TownsComponent,
        children: [
          {
            path: 'cashledger',
            component: CashLedgerComponent
          },
          {
            path: 'loansledger',
            component: LoansLedgerComponent
          },
          {
            path: 'paymentsledger',
            component: PaidLedgerComponent
          }
        ]
          },
          {
            path: 'clientsreports',
            component: ClientsComponent
          },
          {
            path: 'usersreports',
            component: UsersComponent
          }
    ]
  },
  {
    path: 'profile',
    component: ProfileComponent,
    children: [
      {
        path: 'personalprofile',
        component: PersonalProfileComponent
      },
      {
        path: 'setpassword',
        component: SetPasswordComponent
      }
    ]
  }
]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AreamanagementRoutingModule { }
