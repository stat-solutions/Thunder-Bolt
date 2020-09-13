import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StationmanagementRoutingModule } from './stationmanagement-routing.module';
import { StationmanagementComponent } from './stationmanagement.component';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProfileComponent } from './components/profile/profile.component';
import { PagesCoreStationComponent } from './pages-core/pages-core-station.component';
import { RightPanelStationComponent } from './common/right-panel/right-panel-station.component';
import { LeftPanelStationComponent } from './common/left-panel/left-panel-station.component';
import { HeaderStationComponent } from './common/header/header-station.component';
import { ContentSectionStationComponent } from './content-section/content-section-station.component';


@NgModule({
  declarations: [
    StationmanagementComponent, 
    DashboardComponent, 
    ProfileComponent,
    PagesCoreStationComponent,
    RightPanelStationComponent,
    LeftPanelStationComponent,
    HeaderStationComponent,
    ContentSectionStationComponent,
  ],
  imports: [
    CommonModule,
    StationmanagementRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class StationmanagementModule { }
