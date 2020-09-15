import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AreamanagementComponent } from './areamanagement.component';
import { PagesCoreCentralComponent } from '../centralmanagement/pages-core/pages-core-central.component';
import { DashboardComponent } from '../admin/components/dashboard/dashboard.component';
import { AreasComponent } from '../centralmanagement/components/areas/areas.component';

const routes: Routes = [{
    path: '',
    component: PagesCoreCentralComponent,
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
        path: 'areas',
        component: AreasComponent
      }]
    }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AreamanagementRoutingModule { }
