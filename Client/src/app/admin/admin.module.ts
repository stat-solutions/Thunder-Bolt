import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { CompanySetupComponent } from './components/company-setup/company-setup.component';
import { ApprovalSetupComponent } from './components/approval-setup/approval-setup.component';
import { AdminProfileComponent } from './components/admin-profile/admin-profile.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';


@NgModule({
  declarations: [AdminComponent, CompanySetupComponent, ApprovalSetupComponent, AdminProfileComponent, AdminDashboardComponent],
  imports: [
    CommonModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
