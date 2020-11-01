import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PagesCoreAdminComponent } from './pages-core/pages-core-admin.component';
import { ApprovalSetupComponent } from './components/approval-setup/approval-setup.component';
import { CompanySetupComponent } from './components/company-setup/company-setup.component';
import { AdminProfileComponent } from './components/admin-profile/admin-profile.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { BussinessunitsComponent } from './components/bussinessunits/bussinessunits.component';
import { RandomGuard } from '../shared/services/other-services/route-guards/random-guard.service';

const routes: Routes = [
  {
    path: '',
    component: PagesCoreAdminComponent,
    canActivateChild: [RandomGuard],
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
        path: 'companysetup',
        component: CompanySetupComponent,
      },
      {
        path: 'businessunits',
        component: BussinessunitsComponent,
      },
      {
        path: 'approvalsetup',
        component: ApprovalSetupComponent,
      },
      // {
      //   path: 'approveusers',
      //   component: ApproveAdminUsersComponent,
      // },
      {
        path: 'adminprofile',
        component: AdminProfileComponent,
      },
    ],
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
