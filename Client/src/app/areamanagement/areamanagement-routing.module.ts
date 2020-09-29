import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TownsComponent } from './components/towns/towns.component';
import { PagesCoreCentralComponent } from '../centralmanagement/pages-core/pages-core-central.component';
import { DashboardComponent } from '../admin/components/dashboard/dashboard.component';
import { RandomGuard } from '../shared/services/other-services/route-guards/random-guard.service';

const routes: Routes = [{
    path: '',
    component: PagesCoreCentralComponent,
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
        path: 'towns',
        component: TownsComponent
      }]
    }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AreamanagementRoutingModule { }
