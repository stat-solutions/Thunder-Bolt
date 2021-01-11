import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './components/profile/profile.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PagesCoreStationComponent } from './pages-core/pages-core-station.component';
import { StManagerGuard } from '../shared/services/other-services/route-guards/stmanager-guard.service';
import { ReportsComponent } from './components/reports/reports.component';
import { LedgersComponent } from './components/reports/ledgers/ledgers.component';

const routes: Routes = [
  {
    path: '',
    component: PagesCoreStationComponent,
    canActivateChild: [StManagerGuard],
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
        path: 'reports',
        component: ReportsComponent,
        children: [
          {
            path: 'ledgers',
            component: LedgersComponent,
          }
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
export class StationmanagementRoutingModule { }
