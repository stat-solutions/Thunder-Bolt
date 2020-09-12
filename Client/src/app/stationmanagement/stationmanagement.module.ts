import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StationmanagementRoutingModule } from './stationmanagement-routing.module';
import { StationmanagementComponent } from './stationmanagement.component';


@NgModule({
  declarations: [StationmanagementComponent],
  imports: [
    CommonModule,
    StationmanagementRoutingModule
  ]
})
export class StationmanagementModule { }
