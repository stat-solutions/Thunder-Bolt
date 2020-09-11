import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { CompanySetupComponent } from './components/company-setup/company-setup.component';
import { ApprovalSetupComponent } from './components/approval-setup/approval-setup.component';
import { AdminProfileComponent } from './components/admin-profile/admin-profile.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [AdminComponent, CompanySetupComponent, ApprovalSetupComponent, AdminProfileComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
  ]
})
export class AdminModule { }
