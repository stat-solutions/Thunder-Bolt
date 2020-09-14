import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AreamanagementComponent } from './areamanagement.component';

const routes: Routes = [{ path: '', component: AreamanagementComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AreamanagementRoutingModule { }
