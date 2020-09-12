import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StationmanagerComponent } from './stationmanager.component';

const routes: Routes = [{ path: '', component: StationmanagerComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StationmanagerRoutingModule { }
