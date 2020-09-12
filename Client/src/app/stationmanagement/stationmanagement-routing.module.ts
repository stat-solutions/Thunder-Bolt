import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StationmanagementComponent } from './stationmanagement.component';

const routes: Routes = [{ path: '', component: StationmanagementComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StationmanagementRoutingModule { }
