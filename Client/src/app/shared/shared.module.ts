import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LayoutService } from './services/layout.service';
import { MenudropdownDirective } from './directives/menudropdown.directive';
import { AuthGuard } from './services/other-services/route-guards/auth-guard.service';
import { AuthServiceService } from './services/auth-service.service';
import { MessagingService } from './services/other-services/messaging.service';
import { OthersService } from './services/other-services/others.service';
import { AdminGuard } from './services/other-services/route-guards/admin-guard.service';
import { AreaGuard } from './services/other-services/route-guards/area-guard.service';
import { OfficerGuard } from './services/other-services/route-guards/officer-guard.service';
import { CentralGuard } from './services/other-services/route-guards/central-guard.service';
import { TownGuard } from './services/other-services/route-guards/town-guard.service';
import { StManagerGuard } from './services/other-services/route-guards/stmanager-guard.service';


@NgModule({
  declarations: [
    MenudropdownDirective
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    FormsModule,
    MenudropdownDirective,
  ],
})
export class SharedModule {
  static forRoot(): ModuleWithProviders<SharedModule> {
    return {
      ngModule: SharedModule,
      providers: [
        LayoutService,
        AuthServiceService,
        MessagingService,
        OthersService,
        AuthGuard,
        AdminGuard,
        CentralGuard,
        AreaGuard,
        TownGuard,
        StManagerGuard,
        OfficerGuard,
      ]
    };
  }
}
