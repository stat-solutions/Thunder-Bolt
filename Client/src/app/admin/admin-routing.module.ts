import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminComponent } from './admin.component';
import { AdminProfileComponent } from './components/admin-profile/admin-profile.component';
import { ApprovalSetupComponent } from './components/approval-setup/approval-setup.component';
import { CompanySetupComponent } from './components/company-setup/company-setup.component';

const routes: Routes = [
  { 
    path: '', 
    component: AdminComponent,
    children: [
      {
        path: "",
        pathMatch: "full",
        redirectTo: "admindashboardadmin"
      },
      {
        path: "companysetup",
        component: CompanySetupComponent
      },
      {
        path: "approvalsetup",
        component: ApprovalSetupComponent
      },
      {
        path: "/adminprofile",
        component: AdminProfileComponent
      }
    ] 
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
