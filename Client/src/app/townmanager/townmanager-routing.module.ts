import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TownmanagerComponent } from './townmanager.component';

const routes: Routes = [{ path: '', component: TownmanagerComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TownmanagerRoutingModule { }
