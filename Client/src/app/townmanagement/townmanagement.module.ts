import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TownmanagementRoutingModule } from './townmanagement-routing.module';
import { TownmanagementComponent } from './townmanagement.component';


@NgModule({
  declarations: [TownmanagementComponent],
  imports: [
    CommonModule,
    TownmanagementRoutingModule
  ]
})
export class TownmanagementModule { }
