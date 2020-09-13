import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CentralmanagementRoutingModule } from './centralmanagement-routing.module';
import { CentralmanagementComponent } from './centralmanagement.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ContentSectionCentralComponent } from './content-section/content-section-central.component';
import { HeaderCentralComponent } from './common/header/header-central.component';
import { LeftPanelCentralComponent } from './common/left-panel/left-panel-central.component';
import { RightPanelCentralComponent } from './common/right-panel/right-panel-central.component';
import { PagesCoreCentralComponent } from './pages-core/pages-core-central.component';
import { AreasComponent } from './components/areas/areas.component';
import { TownsComponent } from './components/towns/towns.component';
import { StationsComponent } from './components/stations/stations.component';
import { ClustersComponent } from './components/clusters/clusters.component';


@NgModule({
  declarations: [
    CentralmanagementComponent, 
    DashboardComponent, 
    ProfileComponent,
    PagesCoreCentralComponent,
    RightPanelCentralComponent,
    LeftPanelCentralComponent,
    HeaderCentralComponent,
    ContentSectionCentralComponent,
    AreasComponent,
    TownsComponent,
    StationsComponent,
    ClustersComponent,
  ],
  imports: [
    CommonModule,
    CentralmanagementRoutingModule,
    SharedModule,
    ReactiveFormsModule,
  ]
})
export class CentralmanagementModule { }
