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
var custom_validator_1 = require("src/app/validators/custom-validator");
// import { BootstrapAlertService, BootstrapAlert } from 'ngx-bootstrap-alert';
var LoginComponent = /** @class */ (function () {
    function LoginComponent(authService, router, alertService, spinner, layoutService) {
        this.authService = authService;
        this.router = router;
        this.alertService = alertService;
        this.spinner = spinner;
        this.layoutService = layoutService;
        this.serviceErrors = {};
    }
    LoginComponent.prototype.ngOnInit = function () {
        this.userForm = this.createFormGroup();
    };
    LoginComponent.prototype.createFormGroup = function () {
        return new forms_1.FormGroup({
            user_contact_number: new forms_1.FormControl('', forms_1.Validators.compose([
                forms_1.Validators.required,
                custom_validator_1.CustomValidator.patternValidator(/\d/, { hasNumber: true }),
                forms_1.Validators.maxLength(10),
                forms_1.Validators.minLength(10)
            ])),
            password: new forms_1.FormControl('', forms_1.Validators.compose([
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
        // this.spinner.show();
        // if (this.userForm.invalid === true) {
        // return;
        // } else {
        var data = {
            phone: '0704853125',
            pin: '1234'
        };
        if (this.fval.user_contact_number.value === data.phone && this.fval.password.value === data.pin) {
            // this.spinner.hide();
            setTimeout(function () {
                // this.spinner.hide();
                // this.layoutService.emitChangePumpUser(true);
                // this.layoutService.emitLoginLogout(true);
                _this.router.navigate(['/centralmanagement']);
            }, 1000);
        }
        //   this.authService
        //     .loginNormalUser(this.userForm)
        //     .subscribe(
        //       (success: boolean) => {
        //         if (success) {
        //           this.posted = true;
        //           if (
        //             jwt_decode(this.authService.getJwtToken()).user_status ===
        //             'Approved'
        //           ) {
        //             if (
        //               jwt_decode(this.authService.getJwtToken()).user_role === 'admin'
        //             ) {
        //               this.alertService.success({
        //                 html: '<strong>Signed In Successfully</strong>'
        //               });
        //               this.spinner.hide();
        //               setTimeout(() => {
        //                 this.spinner.hide();
        //                 // this.layoutService.emitChangePumpUser(true);
        //                 // this.layoutService.emitLoginLogout(true);
        //                 this.router.navigate(['/admin']);
        //               }, 1000);
        //             } else if (
        //               jwt_decode(this.authService.getJwtToken()).user_role === 'Central User'
        //             ) {
        //               this.spinner.hide();
        //               setTimeout(() => {
        //                 this.router.navigate(['centralmanagement']);
        //               }, 1000);
        //             } else if (
        //               jwt_decode(this.authService.getJwtToken()).user_role === 'Area Manager'
        //             ) {
        //               this.spinner.hide();
        //               setTimeout(() => {
        //                 this.router.navigate(['/areamanagement']);
        //               }, 1000);
        //             } else if (
        //               jwt_decode(this.authService.getJwtToken()).user_role === 'Station Manager'
        //             ) {
        //               this.spinner.hide();
        //               setTimeout(() => {
        //                 this.router.navigate(['/stationmanagement']);
        //               }, 1000);
        //             } else if (
        //               jwt_decode(this.authService.getJwtToken()).user_role === 'Station Officer'
        //             ) {
        //               this.spinner.hide();
        //               setTimeout(() => {
        //                 this.router.navigate(['/stationofficer']);
        //               }, 1000);
        //             }
        //              else {
        //               this.alertService.danger({
        //                 html: '<strong>No User found with these details, Please register</strong>'
        //               });
        //               this.spinner.hide();
        //             }
        //           } else if (
        //             jwt_decode(this.authService.getJwtToken()).user_status ===
        //             'Deactivated'
        //           ) {
        //             this.alertService.danger({
        //               html:
        //                 '<strong>This account has been deactivated!, please contact system admin!</strong>'
        //             });
        //             this.spinner.hide();
        //             return;
        //           }
        //         } else {
        //           this.spinner.hide();
        //           this.errored = true;
        //         }
        //       },
        //       (error: string) => {
        //         this.spinner.hide();
        //         this.errored = true;
        //         this.loginStatus = error;
        //         // this.alertService.danger(this.loginStatus);
        //         this.alertService.danger({
        //           html: '<b>' + this.loginStatus + '</b>' + '<br/>'
        //         });
        //         // this.alertService.warning({html: '<b>Signed In Successfully</b>'});
        //         if (
        //           this.loginStatus === 'Authorisation Failed! User Not Registered'
        //         ) {
        //           setTimeout(() => {
        //             this.router.navigate(['authpage/register']);
        //           }, 1000);
        //         }
        //         this.spinner.hide();
        //       }
        //     );
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
