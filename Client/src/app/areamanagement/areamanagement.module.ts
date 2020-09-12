import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AreamanagementRoutingModule } from './areamanagement-routing.module';
import { AreamanagementComponent } from './areamanagement.component';


@NgModule({
  declarations: [AreamanagementComponent],
  imports: [
    CommonModule,
    AreamanagementRoutingModule
  ]
})
export class AreamanagementModule { }
