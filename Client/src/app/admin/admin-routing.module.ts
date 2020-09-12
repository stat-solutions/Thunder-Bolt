import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PagesCoreAdminComponent } from './pages-core/pages-core-admin.component';
import { AdminComponent } from './components/admin/admin.component';
import { ApprovalSetupComponent } from './components/approval-setup/approval-setup.component';
import { CompanySetupComponent } from './components/company-setup/company-setup.component';
import { AdminProfileComponent } from './components/admin-profile/admin-profile.component';

const routes: Routes = [
  {
    path: '',
    component: PagesCoreAdminComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'admindashboardadmin'
      },

      {
        path: 'admindashboardadmin',
       component: AdminComponent,
      },
      {
        path: 'approvalsetup',
       component: ApprovalSetupComponent,
      },
      {
<<<<<<< HEAD
        path: "adminprofile",
        component: AdminProfileComponent
=======
        path: 'companysetup',
       component: CompanySetupComponent,
      },
      {
        path: 'adminprofile',
       component: AdminProfileComponent,
>>>>>>> beb2389... first commit of dashboard layout
      }
    ]
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
