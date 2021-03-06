"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.StManagerGuard = void 0;
var core_1 = require("@angular/core");
var StManagerGuard = /** @class */ (function () {
    function StManagerGuard(authService, router, jwtHelper, alert) {
        this.authService = authService;
        this.router = router;
        this.jwtHelper = jwtHelper;
        this.alert = alert;
    }
    StManagerGuard.prototype.canActivateChild = function () {
        if (this.authService.isLoggedIn()) {
            if (this.jwtHelper.isTokenExpired(this.authService.getJwtToken())) {
                this.authService.refreshToken();
            }
            else {
                if (this.jwtHelper.decodeToken(this.authService.getJwtToken()).fkAccessRightsIdUser === 400
                    && this.jwtHelper.decodeToken(this.authService.getJwtToken()).userType === 1) {
                    return true;
                }
                else {
                    this.router.navigate(['/authpage/login']);
                    this.alert.danger({
                        html: '<strong>User unauthorised</strong>'
                    });
                    return false;
                }
            }
        }
        else {
            this.router.navigate(['/authpage/login']);
            this.alert.danger({
                html: '<strong>Please logg In first</strong>'
            });
            return false;
        }
    };
    StManagerGuard = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], StManagerGuard);
    return StManagerGuard;
}());
exports.StManagerGuard = StManagerGuard;
