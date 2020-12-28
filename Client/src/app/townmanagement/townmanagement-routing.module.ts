import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './components/profile/profile.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

import { PagesCoreTownComponent } from './pages-core/pages-core-town.component';
import { TownGuard } from '../shared/services/other-services/route-guards/town-guard.service';
import { EnrollClientComponent } from './components/enroll/enroll-client/enroll-client.component';
import { PersonalInfoComponent } from './components/enroll/enroll-client/personal-info/personal-info.component';
import { EnrollBodaStageComponent } from './components/enroll/enroll-stage/enroll-boda-stage/enroll-boda-stage.component';
import { EnrollStageComponent } from './components/enroll/enroll-stage/enroll-stage.component';
import { EnrollTaxiStageComponent } from './components/enroll/enroll-stage/enroll-taxi-stage/enroll-taxi-stage.component';
import { EnrollComponent } from './components/enroll/enroll.component';
import { CreateStationComponent } from './components/create-station/create-station.component';
import { ClusterAndTaxiparkComponent } from './components/enroll/cluster-and-taxipark/cluster-and-taxipark.component';
import { EnrollClusterComponent } from './components/enroll/cluster-and-taxipark/enroll-cluster/enroll-cluster.component';
import { EnrollTaxiParkComponent } from './components/enroll/cluster-and-taxipark/enroll-taxi-park/enroll-taxi-park.component';
import { ReportsComponent } from '../centralmanagement/components/reports/reports.component';
import { CashLedgerComponent } from './components/reports/cash-ledger/cash-ledger.component';
import { LoansLedgerComponent } from './components/reports/loans-ledger/loans-ledger.component';
import { PaidLedgerComponent } from './components/reports/paid-ledger/paid-ledger.component';
import { EditClientComponent } from './components/enroll/edit-client/edit-client.component';
import { EditBodaStageComponent } from './components/enroll/edit-stage/edit-boda-stage/edit-boda-stage.component';
import { EditStageComponent } from './components/enroll/edit-stage/edit-stage.component';
import { EditTaxiStageComponent } from './components/enroll/edit-stage/edit-taxi-stage/edit-taxi-stage.component';
import { MicroLoansComponent } from './components/micro-loans/micro-loans.component';
import { GetLoanComponent } from './components/micro-loans/get-loan/get-loan.component';
import { PayLoanComponent } from './components/micro-loans/pay-loan/pay-loan.component';
import { ComfirmLoanComponent } from './components/micro-loans/comfirm-loan/comfirm-loan.component';

const routes: Routes = [
  { path: '',
    component: PagesCoreTownComponent,
    canActivateChild: [TownGuard],
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
        path: 'microloan',
        component: MicroLoansComponent,
        children: [
          {
            path: '',
            redirectTo: 'getloan',
            pathMatch: 'full'
          },
          {
            path: 'getloan',
            component: GetLoanComponent,
          }, 
          {
            path: 'confirm',
            component: ComfirmLoanComponent,
          },
          {
            path: 'payloan',
            component: PayLoanComponent,
          },
        ]
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
                  },
                  {
                    path: 'editclient',
                    component: EditClientComponent,
                  },
                  {
                    path: 'editstage',
                    component: EditStageComponent,
                    children: [
                      {
                        path: 'edittaxistage',
                        component: EditTaxiStageComponent
                      },
                      {
                        path: 'editbodastage',
                        component: EditBodaStageComponent
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
      }
    ]
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TownmanagementRoutingModule { }
