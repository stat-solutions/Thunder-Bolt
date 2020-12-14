import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateComponent } from './components/create/create.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AreasComponent } from './components/reports/areas/areas.component';
import { ClientsComponent } from './components/reports/clients/clients.component';
import { ReportsComponent } from './components/reports/reports.component';
import { UsersComponent } from './components/reports/users/users.component';
import { TransactionsComponent } from './components/transactions/transactions.component';
import { PagesCoreCentralComponent } from './pages-core/pages-core-central.component';
import { CreateAreaComponent } from './components/create/create-area/create-area.component';
import { CreateStationComponent } from './components/create/create-station/create-station.component';
import { CreateTownComponent } from './components/create/create-town/create-town.component';
import { ApprovalsComponent } from './components/approvals/approvals.component';
import { ApproveAreasComponent } from './components/approvals/approve-areas/approve-areas.component';
import { ApproveStationsComponent } from './components/approvals/approve-stations/approve-stations.component';
import { ApproveTownsComponent } from './components/approvals/approve-towns/approve-towns.component';
import { ApprovalComponent } from './components/transactions/approval/approval.component';
import { FloatComponent } from './components/transactions/float/float.component';
import { LoansComponent } from './components/transactions/loans/loans.component';
import { SetLoanLimitComponent } from './components/transactions/loans/set-loan-limit/set-loan-limit.component';
import { SetLoanRateComponent } from './components/transactions/loans/set-loan-rate/set-loan-rate.component';
import { DepositFloatComponent } from './components/transactions/float/deposit-float/deposit-float.component';
import { WithdrawFloatComponent } from './components/transactions/float/withdraw-float/withdraw-float.component';
import { InterestRateComponent } from './components/transactions/approval/interest-rate/interest-rate.component';
import { LoanLimitComponent } from './components/transactions/approval/loan-limit/loan-limit.component';
import { ReduceRateComponent } from './components/transactions/approval/reduce-rate/reduce-rate.component';
import { ReversePrincipleComponent } from './components/transactions/approval/reverse-principle/reverse-principle.component';
import { WaiveInterestComponent } from './components/transactions/approval/waive-interest/waive-interest.component';
import { WithdrawSavingsComponent } from './components/transactions/approval/withdraw-savings/withdraw-savings.component';
import { WriteOffComponent } from './components/transactions/approval/write-off/write-off.component';
import { CentralGuard } from '../shared/services/other-services/route-guards/central-guard.service';
import { ApproveCentralUsersComponent } from './components/approve-central-users/approve-central-users.component';
import { SelectTheAreaComponent } from './components/select-the-Area/select-the-Area.component';
import { SetManagersComponent } from './components/set-managers/set-managers.component';
import { AreaManagersComponent } from './components/set-managers/area-managers/area-managers.component';
import { TownManagersComponent } from './components/set-managers/town-managers/town-managers.component';
import { StationManagersComponent } from './components/set-managers/station-managers/station-managers.component';
import { SetLoanTenureComponent } from './components/transactions/loans/set-loan-tenure/set-loan-tenure.component';
import { LoanTenureComponent } from './components/transactions/approval/loan-tenure/loan-tenure.component';

const routes: Routes = [
  {
    path: '',
    component: PagesCoreCentralComponent,
    canActivateChild: [CentralGuard],
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
        path: 'create',
        component: CreateComponent,
        children: [
          {
            path: 'createregion',
            component: CreateAreaComponent,
          },
          {
            path: 'createtown',
            component: CreateTownComponent,
          },
          {
            path: 'createstation',
            component: CreateStationComponent,
          },
        ],
      },
      {
        path: 'selectregions',
        component: SelectTheAreaComponent,
      },
      {
        path: 'managers',
        component: SetManagersComponent,
        children: [
          {
            path: 'regionmanagers',
            component: AreaManagersComponent,
          },
          {
            path: 'townmanagers',
            component: TownManagersComponent,
          },
          {
            path: 'stationmanagers',
            component: StationManagersComponent,
          },
        ],
      },
      {
        path: 'approve',
        component: ApprovalsComponent,
        children: [
          {
            path: 'approveregion',
            component: ApproveAreasComponent,
          },
          {
            path: 'approvetown',
            component: ApproveTownsComponent,
          },
          {
            path: 'approvestation',
            component: ApproveStationsComponent,
          },
        ],
      },
      {
        path: 'approveusers',
        component: ApproveCentralUsersComponent,
      },
      {
        path: 'transactions',
        component: TransactionsComponent,
        children: [
          {
            path: 'loans',
            component: LoansComponent,
            children: [
              {
                path: 'setloanlimit',
                component: SetLoanLimitComponent,
              },
              {
                path: 'setloanrate',
                component: SetLoanRateComponent,
              },
              {
                path: 'setloantenure',
                component: SetLoanTenureComponent,
              },
            ],
          },
          {
            path: 'approve',
            component: ApprovalComponent,
            children: [
              {
                path: 'reducerate',
                component: ReduceRateComponent,
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
              {
                path: 'loantenure',
                component: LoanTenureComponent,
              }
            ],
          },
          {
            path: 'float',
            component: FloatComponent,
            children: [
              {
                path: 'withdrawfloat',
                component: WithdrawFloatComponent,
              },
              {
                path: 'depositfloat',
                component: DepositFloatComponent,
              },
            ],
          },
        ],
      },
      {
        path: 'reports',
        component: ReportsComponent,
        children: [
          {
            path: 'loansrevenue',
            component: AreasComponent,
          },
          {
            path: 'clients',
            component: ClientsComponent,
          },
          {
            path: 'users',
            component: UsersComponent,
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
  exports: [RouterModule],
})
export class CentralmanagementRoutingModule {}
