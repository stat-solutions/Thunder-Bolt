import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AreamanagerComponent } from './areamanager.component';

const routes: Routes = [{ path: '', component: AreamanagerComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AreamanagerRoutingModule { }
