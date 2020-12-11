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
// import { AuthServiceService } from './shared/services/auth-service.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { DatepickerModule, BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { InterceptorService } from './shared/services/interceptor.service';
import { SharedModule } from './shared/shared.module';
import { JwtModule } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFireMessagingModule } from '@angular/fire/messaging';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AsyncPipe } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PinchZoomModule } from 'ngx-pinch-zoom';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AdminModule,
    AuthModule,
    HttpClientModule,
    PinchZoomModule,
    NgbModule,
    DatepickerModule.forRoot(),
    BsDatepickerModule.forRoot(),
    TownmanagementModule,
    StationofficerModule,
    StationmanagementModule,
    CentralmanagementModule,
    TownmanagementModule,
    ReactiveFormsModule,
    TooltipModule.forRoot(),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFireMessagingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    JwtModule.forRoot({
      config: {
        //   tokenGetter: () => {
        //   //   // ;
        //   // },
        //   allowedDomains: ["localhost:4200/"],
        //   disallowedRoutes: ["http://example.com/examplebadroute/"],
      },
    }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true,
    },
    SharedModule,
    AsyncPipe,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
