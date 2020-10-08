"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.SharedModule = void 0;
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var forms_1 = require("@angular/forms");
var layout_service_1 = require("./services/layout.service");
var menudropdown_directive_1 = require("./directives/menudropdown.directive");
var auth_guard_service_1 = require("./services/other-services/route-guards/auth-guard.service");
var random_guard_service_1 = require("./services/other-services/route-guards/random-guard.service");
var auth_service_service_1 = require("./services/auth-service.service");
var messaging_service_1 = require("./services/other-services/messaging.service");
var others_service_1 = require("./services/other-services/others.service");
var SharedModule = /** @class */ (function () {
    function SharedModule() {
    }
    SharedModule_1 = SharedModule;
    SharedModule.forRoot = function () {
        return {
            ngModule: SharedModule_1,
            providers: [
                layout_service_1.LayoutService,
                auth_service_service_1.AuthServiceService,
                messaging_service_1.MessagingService,
                others_service_1.OthersService,
                auth_guard_service_1.AuthGuard,
                random_guard_service_1.RandomGuard
            ]
        };
    };
    var SharedModule_1;
    SharedModule = SharedModule_1 = __decorate([
        core_1.NgModule({
            declarations: [
                menudropdown_directive_1.MenudropdownDirective
            ],
            imports: [
                common_1.CommonModule,
                forms_1.FormsModule
            ],
            exports: [
                forms_1.FormsModule,
                menudropdown_directive_1.MenudropdownDirective,
            ]
        })
    ], SharedModule);
    return SharedModule;
}());
exports.SharedModule = SharedModule;
