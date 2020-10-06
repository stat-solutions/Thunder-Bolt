import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminModule } from './admin/admin.module';
import { AuthModule } from './auth/auth.module';
import { ReactiveFormsModule } from '@angular/forms';
import { TownmanagementModule } from './townmanagement/townmanagement.module';
import { StationofficerModule } from './stationofficer/stationofficer.module';
import { StationmanagementModule } from './stationmanagement/stationmanagement.module';
import { CentralmanagementModule } from './centralmanagement/centralmanagement.module';
import { AuthServiceService } from './shared/services/auth-service.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { DatepickerModule, BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { InterceptorService } from './shared/services/interceptor.service';
import { SharedModule } from './shared/shared.module';
import { JwtModule } from "@auth0/angular-jwt";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AdminModule,
    AuthModule,
    HttpClientModule,
    DatepickerModule.forRoot(),
    BsDatepickerModule.forRoot(),
    TownmanagementModule,
    StationofficerModule,
    StationmanagementModule,
    CentralmanagementModule,
    TownmanagementModule,
    ReactiveFormsModule,
    TooltipModule.forRoot(),
    JwtModule.forRoot({
      config: {
      //   tokenGetter: () => {
      //   //   // ;
      //   // },
      //   allowedDomains: ["localhost:4200/"],
      //   disallowedRoutes: ["http://example.com/examplebadroute/"],
      },
    })
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true,
    },
    SharedModule
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
