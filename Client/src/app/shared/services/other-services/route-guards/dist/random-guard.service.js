"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.RandomGuard = void 0;
var core_1 = require("@angular/core");
// import * as jwt_decode from 'jwt-decode';
var RandomGuard = /** @class */ (function () {
    function RandomGuard(authService, router, jwtHelper) {
        this.authService = authService;
        this.router = router;
        this.jwtHelper = jwtHelper;
    }
    RandomGuard.prototype.canActivateChild = function () {
        if (this.authService.isLoggedIn()) {
            if (this.jwtHelper.isTokenExpired(this.authService.getJwtToken())) {
                if (this.jwtHelper.isTokenExpired(this.authService.getRefreshToken())) {
                    return false;
                }
                else {
                    this.authService.refreshToken();
                    return true;
                }
            }
            return true;
        }
        else {
            this.router.navigate(['/authpage/login']);
            return false;
        }
    };
    RandomGuard = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], RandomGuard);
    return RandomGuard;
}());
exports.RandomGuard = RandomGuard;
