import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './components/profile/profile.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PagesCoreStationComponent } from './pages-core/pages-core-station.component';
import { RandomGuard } from '../shared/services/other-services/route-guards/random-guard.service';
import { ReportsComponent } from './components/reports/reports.component';
import { CashLedgerComponent } from './components/reports/cash-ledger/cash-ledger.component';
import { PaidLedgerComponent } from './components/reports/paid-ledger/paid-ledger.component';
import { BorrowedLedgerComponent } from './components/reports/borrowed-ledger/borrowed-ledger.component';
import { PersonalProfileComponent } from './components/profile/personal-profile/personal-profile.component';
import { SetPasswordComponent } from './components/profile/set-password/set-password.component';

const routes: Routes = [
  { path: '',
    component: PagesCoreStationComponent,
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
        path: 'reports',
        component: ReportsComponent,
children: [
  {
    path: 'cashledger',
    component: CashLedgerComponent
  },
  {
    path: 'paidledger',
    component: PaidLedgerComponent
  },
  {
    path: 'borrowedledger',
    component: BorrowedLedgerComponent
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
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StationmanagementRoutingModule { }
