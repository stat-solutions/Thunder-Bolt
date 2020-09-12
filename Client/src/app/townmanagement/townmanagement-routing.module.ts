import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TownmanagementComponent } from './townmanagement.component';

const routes: Routes = [{ path: '', component: TownmanagementComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TownmanagementRoutingModule { }
