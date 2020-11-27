"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AuthRoutingModule = void 0;
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var authpage_component_1 = require("./authpage.component");
var changepassword_component_1 = require("./components/changepassword/changepassword.component");
var login_component_1 = require("./components/login/login.component");
var registration_component_1 = require("./components/registration/registration.component");
var routes = [
    {
        path: 'authpage',
        component: authpage_component_1.AuthpageComponent,
        children: [
            {
                path: 'login',
                component: login_component_1.LoginComponent
            },
            {
                path: 'register',
                component: registration_component_1.RegistrationComponent
            },
            {
                path: 'changepassword',
                component: changepassword_component_1.ChangepasswordComponent
            }
        ]
    }
];
var AuthRoutingModule = /** @class */ (function () {
    function AuthRoutingModule() {
    }
    AuthRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forChild(routes)],
            exports: [router_1.RouterModule]
        })
    ], AuthRoutingModule);
    return AuthRoutingModule;
}());
exports.AuthRoutingModule = AuthRoutingModule;
