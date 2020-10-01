import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LayoutService } from './services/layout.service';
import { MenudropdownDirective } from './directives/menudropdown.directive';
import { AuthGuard } from './services/other-services/route-guards/auth-guard.service';
import { RandomGuard } from './services/other-services/route-guards/random-guard.service';
import { AuthServiceService } from './services/auth-service.service';

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
        AuthGuard,
        RandomGuard
      ]
    };
  }
}
