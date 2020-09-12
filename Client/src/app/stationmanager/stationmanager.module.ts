import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StationmanagerRoutingModule } from './stationmanager-routing.module';
import { StationmanagerComponent } from './stationmanager.component';


@NgModule({
  declarations: [StationmanagerComponent],
  imports: [
    CommonModule,
    StationmanagerRoutingModule
  ]
})
export class StationmanagerModule { }
