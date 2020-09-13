import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TownmanagementRoutingModule } from './townmanagement-routing.module';
import { TownmanagementComponent } from './townmanagement.component';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProfileComponent } from './components/profile/profile.component';
import { PagesCoreTownComponent } from './pages-core/pages-core-town.component';
import { RightPanelTownComponent } from './common/right-panel/right-panel-town.component';
import { HeaderTownComponent } from './common/header/header-town.component';
import { ContentSectionTownComponent } from './content-section/content-section-town.component';
import { LeftPanelTownComponent } from './common/left-panel/left-panel-town.component';


@NgModule({
  declarations: [
    TownmanagementComponent, 
    DashboardComponent, 
    ProfileComponent,
    PagesCoreTownComponent,
    RightPanelTownComponent,
    LeftPanelTownComponent,
    HeaderTownComponent,
    ContentSectionTownComponent,
  ],
  imports: [
    CommonModule,
    TownmanagementRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class TownmanagementModule { }
