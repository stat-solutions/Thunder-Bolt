import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AreamanagementRoutingModule } from './areamanagement-routing.module';
import { AreamanagementComponent } from './areamanagement.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { PagesCoreAreaComponent } from './pages-core/pages-core-area.component';
import { ContentSectionAreaComponent } from './content-section/content-section-area.component';
import { RightPanelAreaComponent } from './common/right-panel/right-panel-area.component';
import { HeaderAreaComponent } from './common/header/header-area.component';
import { LeftPanelAreaComponent } from './common/left-panel/left-panel-area.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TownsComponent } from './components/towns/towns.component';
import { ProfileComponent } from './components/profile/profile.component';

@NgModule({
  declarations: [
    AreamanagementComponent,
    PagesCoreAreaComponent,
    RightPanelAreaComponent,
    LeftPanelAreaComponent,
    HeaderAreaComponent,
    ContentSectionAreaComponent,
    DashboardComponent,
    TownsComponent,
    ProfileComponent
  ],
  imports: [
    CommonModule,
    AreamanagementRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class AreamanagementModule { }
