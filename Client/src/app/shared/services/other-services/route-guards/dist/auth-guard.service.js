"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AuthGuard = void 0;
var core_1 = require("@angular/core");
var AuthGuard = /** @class */ (function () {
    function AuthGuard(authService, router, jwtHelper) {
        this.authService = authService;
        this.router = router;
        this.jwtHelper = jwtHelper;
    }
    AuthGuard.prototype.canActivate = function () {
        console.log('this is authguard');
        if (this.authService.isLoggedIn()) {
            if (this.jwtHelper.decodeToken(this.authService.getJwtToken()).fkAccessRightsIdUser === 600) {
                this.router.navigate(['/admin']);
            }
            else if (this.jwtHelper.decodeToken(this.authService.getJwtToken()).fkAccessRightsIdUser === 100) {
                this.router.navigate(['/centralmanagement']);
            }
            else if (this.jwtHelper.decodeToken(this.authService.getJwtToken()).fkAccessRightsIdUser === 200) {
                this.router.navigate(['/areamanagement']);
            }
            else if (this.jwtHelper.decodeToken(this.authService.getJwtToken()).fkAccessRightsIdUser === 300) {
                this.router.navigate(['/townmanagement']);
            }
            else if (this.jwtHelper.decodeToken(this.authService.getJwtToken()).fkAccessRightsIdUser === 400) {
                this.router.navigate(['/stationmanagement']);
            }
            else if (this.jwtHelper.decodeToken(this.authService.getJwtToken()).fkAccessRightsIdUser === 500) {
                this.router.navigate(['/stationofficer']);
            }
        }
        else {
            return this.authService.isLoggedIn();
        }
    };
    AuthGuard = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], AuthGuard);
    return AuthGuard;
}());
exports.AuthGuard = AuthGuard;
