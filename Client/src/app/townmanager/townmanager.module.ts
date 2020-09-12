import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TownmanagerRoutingModule } from './townmanager-routing.module';
import { TownmanagerComponent } from './townmanager.component';


@NgModule({
  declarations: [TownmanagerComponent],
  imports: [
    CommonModule,
    TownmanagerRoutingModule
  ]
})
export class TownmanagerModule { }
