import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './components/profile/profile.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

import { PagesCoreTownComponent } from './pages-core/pages-core-town.component';
import { RandomGuard } from '../shared/services/other-services/route-guards/random-guard.service';
import { EnrollClientComponent } from './components/enroll/enroll-client/enroll-client.component';
import { PersonalInfoComponent } from './components/enroll/enroll-client/personal-info/personal-info.component';
import { EnrollBodaStageComponent } from './components/enroll/enroll-stage/enroll-boda-stage/enroll-boda-stage.component';
import { EnrollStageComponent } from './components/enroll/enroll-stage/enroll-stage.component';
import { EnrollTaxiStageComponent } from './components/enroll/enroll-stage/enroll-taxi-stage/enroll-taxi-stage.component';
import { EnrollComponent } from './components/enroll/enroll.component';
import { BodaClientInfoComponent } from './components/enroll/enroll-client/boda-client-info/boda-client-info.component';
import { MicroClientInfoComponent } from './components/enroll/enroll-client/micro-client-info/micro-client-info.component';
import { TaxiClientInfoComponent } from './components/enroll/enroll-client/taxi-client-info/taxi-client-info.component';
import { CreateStationComponent } from '../centralmanagement/components/create/create-station/create-station.component';
import { ClusterAndTaxiparkComponent } from './components/enroll/cluster-and-taxipark/cluster-and-taxipark.component';
import { EnrollClusterComponent } from './components/enroll/cluster-and-taxipark/enroll-cluster/enroll-cluster.component';
import { EnrollTaxiParkComponent } from './components/enroll/cluster-and-taxipark/enroll-taxi-park/enroll-taxi-park.component';
import { ReportsComponent } from '../centralmanagement/components/reports/reports.component';
import { CashLedgerComponent } from './components/reports/cash-ledger/cash-ledger.component';
import { LoansLedgerComponent } from './components/reports/loans-ledger/loans-ledger.component';
import { PaidLedgerComponent } from './components/reports/paid-ledger/paid-ledger.component';
import { SetPasswordComponent } from './components/profile/set-password/set-password.component';

const routes: Routes = [
  { path: '',
    component: PagesCoreTownComponent,
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
        path: 'createstation',
        component: CreateStationComponent
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
                component: MicroClientInfoComponent
              },
              {
                path: 'bodaloanclient',
                component: BodaClientInfoComponent
              },
              {
                path: 'taxiloanclient',
                component: TaxiClientInfoComponent
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
              },
              {
                path: 'clustertaxipark',
                component: ClusterAndTaxiparkComponent,
                children: [
                  {
                    path: 'enrollcluster',
                    component: EnrollClusterComponent
                  },
                  {
                    path: 'enrolltaxipark',
                    component: EnrollTaxiParkComponent
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
            path: 'cashledger',
            component: CashLedgerComponent
          },
          {
            path: 'loansledger',
            component: LoansLedgerComponent
          },
          {
            path: 'paidledger',
            component: PaidLedgerComponent
          }
        ]
          },
{
        path: 'profile',
        component: ProfileComponent,
        children: [
          {
            path: 'personalinfo',
            component: PersonalInfoComponent
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
export class TownmanagementRoutingModule { }
