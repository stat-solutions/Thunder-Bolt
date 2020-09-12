import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AreamanagerRoutingModule } from './areamanager-routing.module';
import { AreamanagerComponent } from './areamanager.component';


@NgModule({
  declarations: [AreamanagerComponent],
  imports: [
    CommonModule,
    AreamanagerRoutingModule
  ]
})
export class AreamanagerModule { }
