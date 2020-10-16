import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PagesCoreAdminComponent } from './pages-core/pages-core-admin.component';
import { ApprovalSetupComponent } from './components/approval-setup/approval-setup.component';
import { CompanySetupComponent } from './components/company-setup/company-setup.component';
import { AdminProfileComponent } from './components/admin-profile/admin-profile.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { BussinessunitsComponent } from './components/bussinessunits/bussinessunits.component';
import { RandomGuard } from '../shared/services/other-services/route-guards/random-guard.service';
import { PersonalProfileComponent } from './components/admin-profile/personal-profile/personal-profile.component';
import { SetPasswordComponent } from './components/admin-profile/set-password/set-password.component';

const routes: Routes = [
  {
    path: '',
    component: PagesCoreAdminComponent,
    canActivateChild: [RandomGuard],
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'dashboard'
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
      {
        path: 'adminprofile',
        component: AdminProfileComponent,
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
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
