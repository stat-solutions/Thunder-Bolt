"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.LoginComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
// import * as jwt_decode from 'jwt-decode';
var custom_validator_1 = require("src/app/validators/custom-validator");
// import { BootstrapAlertService, BootstrapAlert } from 'ngx-bootstrap-alert';
var LoginComponent = /** @class */ (function () {
    function LoginComponent(authService, router, alertService, spinner, jwtHelper, layoutService) {
        this.authService = authService;
        this.router = router;
        this.alertService = alertService;
        this.spinner = spinner;
        this.jwtHelper = jwtHelper;
        this.layoutService = layoutService;
        this.serviceErrors = {};
    }
    LoginComponent.prototype.ngOnInit = function () {
        this.userForm = this.createFormGroup();
    };
    LoginComponent.prototype.createFormGroup = function () {
        return new forms_1.FormGroup({
            userPhone1: new forms_1.FormControl('', forms_1.Validators.compose([
                forms_1.Validators.required,
                custom_validator_1.CustomValidator.patternValidator(/\d/, { hasNumber: true }),
                forms_1.Validators.maxLength(10),
                forms_1.Validators.minLength(10)
            ])),
            userPassword: new forms_1.FormControl('', forms_1.Validators.compose([
                // 1. Password Field is Required
                custom_validator_1.CustomValidator.patternValidator(/\d/, { hasNumber: true }),
                forms_1.Validators.maxLength(4),
                forms_1.Validators.minLength(4),
                forms_1.Validators.required
            ]))
        });
    };
    Object.defineProperty(LoginComponent.prototype, "fval", {
        get: function () {
            return this.userForm.controls;
        },
        enumerable: false,
        configurable: true
    });
    // toggle visibility of password field
    LoginComponent.prototype.toggleFieldType = function () {
        this.fieldType = !this.fieldType;
    };
    LoginComponent.prototype.login = function () {
        var _this = this;
        this.submitted = true;
        this.spinner.show();
        if (this.userForm.invalid === true) {
            return;
        }
        else {
            var data = {
                userPhone1: this.fval.userPhone1.value,
                userPassword: Number(this.fval.userPassword.value)
            };
            this.authService
                .loginNormalUser(data)
                .subscribe(function (success) {
                if (success) {
                    _this.posted = true;
                    if (_this.jwtHelper.decodeToken(_this.authService.getJwtToken()).userStatus === 2
                        || _this.jwtHelper.decodeToken(_this.authService.getJwtToken()).userStatus === 1) {
                        if (_this.jwtHelper.decodeToken(_this.authService.getJwtToken()).fkAccessRightsIdUser === 500) {
                            _this.alertService.success({
                                html: '<strong>Signed In Successfully</strong>'
                            });
                            _this.spinner.hide();
                            setTimeout(function () {
                                _this.spinner.hide();
                                _this.router.navigate(['/admin']);
                            }, 1000);
                        }
                        else if (_this.jwtHelper.decodeToken(_this.authService.getJwtToken()).fkAccessRightsIdUser === 100) {
                            _this.spinner.hide();
                            _this.alertService.success({
                                html: '<strong>Signed In Successfully</strong>'
                            });
                            setTimeout(function () {
                                _this.router.navigate(['centralmanagement']);
                            }, 1000);
                        }
                        else if (_this.jwtHelper.decodeToken(_this.authService.getJwtToken()).fkAccessRightsIdUser === 200) {
                            _this.spinner.hide();
                            _this.alertService.success({
                                html: '<strong>Signed In Successfully</strong>'
                            });
                            setTimeout(function () {
                                _this.router.navigate(['/areamanagement']);
                            }, 1000);
                        }
                        else if (_this.jwtHelper.decodeToken(_this.authService.getJwtToken()).fkAccessRightsIdUser === 300) {
                            _this.spinner.hide();
                            _this.alertService.success({
                                html: '<strong>Signed In Successfully</strong>'
                            });
                            setTimeout(function () {
                                _this.router.navigate(['/townmanagement']);
                            }, 1000);
                        }
                        else if (_this.jwtHelper.decodeToken(_this.authService.getJwtToken()).fkAccessRightsIdUser === 400) {
                            _this.spinner.hide();
                            _this.alertService.success({
                                html: '<strong>Signed In Successfully</strong>'
                            });
                            if (_this.jwtHelper.decodeToken(_this.authService.getJwtToken()).UserType === 1) {
                                setTimeout(function () {
                                    _this.router.navigate(['/stationmanagement']);
                                }, 1000);
                            }
                            else if (_this.jwtHelper.decodeToken(_this.authService.getJwtToken()).UserType === 2) {
                                setTimeout(function () {
                                    _this.router.navigate(['/stationofficer']);
                                }, 1000);
                            }
                        }
                        else {
                            _this.alertService.danger({
                                html: '<strong>No User found with these details, Please register</strong>'
                            });
                            _this.spinner.hide();
                        }
                    }
                    else if (_this.jwtHelper.decodeToken(_this.authService.getJwtToken()).userStatus === 3) {
                        _this.alertService.danger({
                            html: '<strong>This account has been deactivated!, please contact system admin!</strong>'
                        });
                        _this.spinner.hide();
                        return;
                    }
                    // else if (
                    //   this.jwtHelper.decodeToken(this.authService.getJwtToken()).userStatus === 1
                    // ) {
                    //   this.alertService.danger({
                    //     html:
                    //       '<strong>This account recquires approval, please contact system admin!</strong>'
                    //   });
                    //   this.spinner.hide();
                    //   return;
                    // }
                }
                else {
                    _this.spinner.hide();
                    _this.errored = true;
                }
            }, function (error) {
                _this.spinner.hide();
                _this.errored = true;
                _this.loginStatus = error;
                // this.alertService.danger(this.loginStatus);
                _this.alertService.danger({
                    html: '<b>' + _this.loginStatus + '</b>' + '<br/>'
                });
                // this.alertService.warning({html: '<b>Signed In Successfully</b>'});
                if (_this.loginStatus === 'Authorisation Failed! User Not Registered') {
                    setTimeout(function () {
                        _this.router.navigate(['authpage/register']);
                    }, 1000);
                }
                _this.spinner.hide();
            });
        }
    };
    LoginComponent = __decorate([
        core_1.Component({
            selector: 'app-login',
            templateUrl: './login.component.html',
            styleUrls: ['./login.component.scss']
        })
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
