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
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AdminModule,
    AuthModule,
    HttpClientModule,
    StationofficerModule,
    StationmanagementModule,
    CentralmanagementModule,
    TownmanagementModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
