import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CentralmanagementRoutingModule } from './centralmanagement-routing.module';
import { CentralmanagementComponent } from './centralmanagement.component';


@NgModule({
  declarations: [CentralmanagementComponent],
  imports: [
    CommonModule,
    CentralmanagementRoutingModule
  ]
})
export class CentralmanagementModule { }
