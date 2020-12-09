"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppModule = void 0;
var platform_browser_1 = require("@angular/platform-browser");
var core_1 = require("@angular/core");
var app_routing_module_1 = require("./app-routing.module");
var app_component_1 = require("./app.component");
var admin_module_1 = require("./admin/admin.module");
var auth_module_1 = require("./auth/auth.module");
var forms_1 = require("@angular/forms");
var townmanagement_module_1 = require("./townmanagement/townmanagement.module");
var stationofficer_module_1 = require("./stationofficer/stationofficer.module");
var stationmanagement_module_1 = require("./stationmanagement/stationmanagement.module");
var centralmanagement_module_1 = require("./centralmanagement/centralmanagement.module");
// import { AuthServiceService } from './shared/services/auth-service.service';
var http_1 = require("@angular/common/http");
var datepicker_1 = require("ngx-bootstrap/datepicker");
var animations_1 = require("@angular/platform-browser/animations");
var tooltip_1 = require("ngx-bootstrap/tooltip");
var interceptor_service_1 = require("./shared/services/interceptor.service");
var shared_module_1 = require("./shared/shared.module");
var angular_jwt_1 = require("@auth0/angular-jwt");
var environment_1 = require("src/environments/environment");
var fire_1 = require("@angular/fire");
var messaging_1 = require("@angular/fire/messaging");
var database_1 = require("@angular/fire/database");
var auth_1 = require("@angular/fire/auth");
var common_1 = require("@angular/common");
var ng_bootstrap_1 = require("@ng-bootstrap/ng-bootstrap");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [app_component_1.AppComponent],
            imports: [
                platform_browser_1.BrowserModule,
                animations_1.BrowserAnimationsModule,
                app_routing_module_1.AppRoutingModule,
                admin_module_1.AdminModule,
                auth_module_1.AuthModule,
                http_1.HttpClientModule,
                ng_bootstrap_1.NgbModule,
                datepicker_1.DatepickerModule.forRoot(),
                datepicker_1.BsDatepickerModule.forRoot(),
                townmanagement_module_1.TownmanagementModule,
                stationofficer_module_1.StationofficerModule,
                stationmanagement_module_1.StationmanagementModule,
                centralmanagement_module_1.CentralmanagementModule,
                townmanagement_module_1.TownmanagementModule,
                forms_1.ReactiveFormsModule,
                tooltip_1.TooltipModule.forRoot(),
                database_1.AngularFireDatabaseModule,
                auth_1.AngularFireAuthModule,
                messaging_1.AngularFireMessagingModule,
                fire_1.AngularFireModule.initializeApp(environment_1.environment.firebaseConfig),
                angular_jwt_1.JwtModule.forRoot({
                    config: {
                    //   tokenGetter: () => {
                    //   //   // ;
                    //   // },
                    //   allowedDomains: ["localhost:4200/"],
                    //   disallowedRoutes: ["http://example.com/examplebadroute/"],
                    }
                })
            ],
            providers: [
                {
                    provide: http_1.HTTP_INTERCEPTORS,
                    useClass: interceptor_service_1.InterceptorService,
                    multi: true
                },
                shared_module_1.SharedModule,
                common_1.AsyncPipe
            ],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
