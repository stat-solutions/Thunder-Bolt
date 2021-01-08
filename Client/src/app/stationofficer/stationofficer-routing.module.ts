import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdjustmentsComponent } from './components/adjustments/adjustments.component';
import { ReduceRateComponent } from './components/adjustments/reduce-rate/reduce-rate.component';
import { ReversePrincipleComponent } from './components/adjustments/reverse-principle/reverse-principle.component';
import { SetInterestRateComponent } from './components/adjustments/set-interest-rate/set-interest-rate.component';
import { SetLoanLimitComponent } from './components/adjustments/set-loan-limit/set-loan-limit.component';
import { WaiveInterestComponent } from './components/adjustments/waive-interest/waive-interest.component';
import { WriteOffComponent } from './components/adjustments/write-off/write-off.component';
import { OfficerGuard } from '../shared/services/other-services/route-guards/officer-guard.service';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { EnrollClientComponent } from './components/enroll/enroll-client/enroll-client.component';
import { EnrollBodaStageComponent } from './components/enroll/enroll-stage/enroll-boda-stage/enroll-boda-stage.component';
import { EnrollStageComponent } from './components/enroll/enroll-stage/enroll-stage.component';
import { EnrollTaxiStageComponent } from './components/enroll/enroll-stage/enroll-taxi-stage/enroll-taxi-stage.component';
import { EnrollComponent } from './components/enroll/enroll.component';
import { LendComponent } from './components/lend/lend.component';
import { PayComponent } from './components/pay/pay.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ReportsComponent } from './components/reports/reports.component';
import { DepositComponent } from './components/savings/deposit/deposit.component';
import { SavingsComponent } from './components/savings/savings.component';
import { WithdrawComponent } from './components/savings/withdraw/withdraw.component';
import { PagesCoreOfficerComponent } from './pages-core/pages-core-officer.component';
import { ClientsComponent } from './components/reports/clients/clients.component';
import { UsersComponent } from './components/reports/users/users.component';
import { AreaComponent } from './components/reports/area/area.component';

const routes: Routes = [
  {
    path: '',
    component: PagesCoreOfficerComponent,
    canActivateChild: [OfficerGuard],
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
        path: 'lend',
        component: LendComponent,
      },
      {
        path: 'pay',
        component: PayComponent,
      },
      {
        path: 'enroll',
        component: EnrollComponent,
        children: [
          {
            path: 'enrollclient',
            component: EnrollClientComponent,
          },
          {
            path: 'enrollstage',
            component: EnrollStageComponent,
            children: [
              {
                path: 'enrolltaxistage',
                component: EnrollTaxiStageComponent,
              },
              {
                path: 'enrollbodastage',
                component: EnrollBodaStageComponent,
              },
            ],
          },
        ],
      },
      {
        path: 'savings',
        component: SavingsComponent,
        children: [
          {
            path: 'deposit',
            component: DepositComponent,
          },
          {
            path: 'withdraw',
            component: WithdrawComponent,
          },
        ],
      },
      {
        path: 'adjustments',
        component: AdjustmentsComponent,
        children: [
          {
            path: 'setloanlimit',
            component: SetLoanLimitComponent,
          },
          {
            path: 'reduceinterestrate',
            component: ReduceRateComponent,
          },
          {
            path: 'reverseprincipal',
            component: ReversePrincipleComponent,
          },
          {
            path: 'setinterestrate',
            component: SetInterestRateComponent,
          },
          {
            path: 'waiveinterest',
            component: WaiveInterestComponent,
          },
          {
            path: 'writeoffprincipal',
            component: WriteOffComponent,
          },
        ],
      },
      {
        path: 'reports',
        component: ReportsComponent,
        children: [
          {
            path: 'loansrevenue',
            component: AreaComponent,
          },
          {
            path: 'users',
            component: UsersComponent,
          },
          {
            path: 'clients',
            component: ClientsComponent,
          },
        ],
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
export class StationofficerRoutingModule { }
