import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StationofficerRoutingModule } from './stationofficer-routing.module';
import { StationofficerComponent } from './stationofficer.component';


@NgModule({
  declarations: [StationofficerComponent],
  imports: [
    CommonModule,
    StationofficerRoutingModule
  ]
})
export class StationofficerModule { }
