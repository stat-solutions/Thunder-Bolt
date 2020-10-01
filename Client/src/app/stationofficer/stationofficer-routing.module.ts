import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdjustmentsComponent } from './components/adjustments/adjustments.component';
import { ReduceRateComponent } from './components/adjustments/reduce-rate/reduce-rate.component';
import { ReversePrincipleComponent } from './components/adjustments/reverse-principle/reverse-principle.component';
import { SetInterestRateComponent } from './components/adjustments/set-interest-rate/set-interest-rate.component';
import { SetLoanLimitComponent } from './components/adjustments/set-loan-limit/set-loan-limit.component';
import { WaiveInterestComponent } from './components/adjustments/waive-interest/waive-interest.component';
import { WriteOffComponent } from './components/adjustments/write-off/write-off.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { BodaLoanClientComponent } from './components/enroll/enroll-client/boda-loan-client/boda-loan-client.component';
import { EnrollClientComponent } from './components/enroll/enroll-client/enroll-client.component';
import { MicroLoanClientComponent } from './components/enroll/enroll-client/micro-loan-client/micro-loan-client.component';
import { PersonalInfoComponent } from './components/enroll/enroll-client/personal-info/personal-info.component';
import { TaxiLoanClientComponent } from './components/enroll/enroll-client/taxi-loan-client/taxi-loan-client.component';
import { EnrollBodaStageComponent } from './components/enroll/enroll-stage/enroll-boda-stage/enroll-boda-stage.component';
import { EnrollStageComponent } from './components/enroll/enroll-stage/enroll-stage.component';
import { EnrollTaxiStageComponent } from './components/enroll/enroll-stage/enroll-taxi-stage/enroll-taxi-stage.component';
import { EnrollComponent } from './components/enroll/enroll.component';
import { LendComponent } from './components/lend/lend.component';
import { PayComponent } from './components/pay/pay.component';
import { ProfileComponent } from './components/profile/profile.component';
import { CashLedgerComponent } from './components/reports/cash-ledger/cash-ledger.component';
import { LoansReportComponent } from './components/reports/loans-report/loans-report.component';
import { ReportsComponent } from './components/reports/reports.component';
import { DepositComponent } from './components/savings/deposit/deposit.component';
import { SavingsComponent } from './components/savings/savings.component';
import { WithdrawComponent } from './components/savings/withdraw/withdraw.component';
import { PagesCoreOfficerComponent } from './pages-core/pages-core-officer.component';

const routes: Routes = [
  { path: '',
    component: PagesCoreOfficerComponent,
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
        path: 'lend',
        component: LendComponent
      },
      {
        path: 'pay',
        component: PayComponent
      },
      {
        path: 'enroll',
        component: EnrollComponent,
        children: [
          {
            path: 'enrollclient',
            component: EnrollClientComponent,
            children: [
              {
                path: 'personalinfo',
                component: PersonalInfoComponent
              },
              {
                path: 'microloanclient',
                component: MicroLoanClientComponent
              },
              {
                path: 'bodaloanclient',
                component: BodaLoanClientComponent
              },
              {
                path: 'taxiloanclient',
                component: TaxiLoanClientComponent
              }
            ]
          },
          {
            path: 'enrollstage',
            component: EnrollStageComponent,
            children: [
              {
                path: 'enrolltaxistage',
                component: EnrollTaxiStageComponent
              },
              {
                path: 'enrollbodastage',
                component: EnrollBodaStageComponent
              }
            ]
              }
        ]
      },
      {
        path: 'savings',
        component: SavingsComponent,
        children: [
          {
            path: 'deposit',
            component: DepositComponent
          },
          {
            path: 'withdraw',
            component: WithdrawComponent
          }
        ]
      },
      {
        path: 'adjustments',
        component: AdjustmentsComponent,
        children: [
          {
            path: 'setloanlimit',
            component: SetLoanLimitComponent
          },
          {
            path: 'reduceinterestrate',
            component: ReduceRateComponent
          },
          {
            path: 'reverse-principle',
            component: ReversePrincipleComponent
          },
          {
            path: 'setinterestrate',
            component: SetInterestRateComponent
          },
          {
            path: 'waive-interest',
            component: WaiveInterestComponent
          },
          {
            path: 'writeoffprinciple',
            component: WriteOffComponent
          },
        ]
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
            path: 'loansreport',
            component: LoansReportComponent
          }
        ]
      },
      {
        path: 'profile',
        component:ProfileComponent
      }
    ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StationofficerRoutingModule { }
