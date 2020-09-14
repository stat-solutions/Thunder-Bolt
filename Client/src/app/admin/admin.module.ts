import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
// import { AlertModule } from 'ngx-alerts';
import { SharedModule } from '../shared/shared.module';
import { PagesCoreAdminComponent } from './pages-core/pages-core-admin.component';
// import { NgxSpinnerModule } from 'ngx-spinner';
<<<<<<< HEAD
import { DashboardComponent } from './components/dashboard/dashboard.component';
=======
import { AdminComponent } from './components/admin/admin.component';
>>>>>>> 85e5d843593549c6d547c157a5974187dc1836bd
import { ApprovalSetupComponent } from './components/approval-setup/approval-setup.component';
import { CompanySetupComponent } from './components/company-setup/company-setup.component';
import { AdminProfileComponent } from './components/admin-profile/admin-profile.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LeftPanelAdminComponent } from './common/left-panel/left-panel-admin.component';
import { RightPanelAdminComponent } from './common/right-panel/right-panel-admin.component';
import { HeaderAdminComponent } from './common/header/header-admin.component';
import { ContentSectionAdminComponent } from './content-section/content-section-admin.component';
<<<<<<< HEAD
import { BussinessunitsComponent } from './components/bussinessunits/bussinessunits.component';
=======
>>>>>>> 85e5d843593549c6d547c157a5974187dc1836bd


@NgModule({
  declarations: [
    PagesCoreAdminComponent,
    LeftPanelAdminComponent,
    RightPanelAdminComponent,
    HeaderAdminComponent,
    ContentSectionAdminComponent,
<<<<<<< HEAD
    DashboardComponent,
    ApprovalSetupComponent,
    CompanySetupComponent,
    AdminProfileComponent,
    BussinessunitsComponent,
=======
    AdminComponent,
    ApprovalSetupComponent,
    CompanySetupComponent,
    AdminProfileComponent,
>>>>>>> 85e5d843593549c6d547c157a5974187dc1836bd
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    // NgxSpinnerModule,
    // AlertModule.forRoot({maxMessages: 5, timeout: 7000, position: 'right'})
  ],
})
export class AdminModule { }
