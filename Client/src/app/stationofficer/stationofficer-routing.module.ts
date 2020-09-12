import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StationofficerComponent } from './stationofficer.component';

const routes: Routes = [{ path: '', component: StationofficerComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StationofficerRoutingModule { }
