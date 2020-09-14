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
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { DatepickerModule } from 'ngx-bootstrap/datepicker';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { DatetimePopupModule } from 'ngx-bootstrap-datetime-popup';
@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BsDropdownModule,
    DatepickerModule,
    TimepickerModule,
    DatetimePopupModule,
    AppRoutingModule,
    AdminModule,
    AuthModule,
    TownmanagementModule,
    StationofficerModule,
    StationmanagementModule,
    CentralmanagementModule,
    TownmanagementModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthServiceService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
