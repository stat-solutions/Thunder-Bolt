"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AdminProfileComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var custom_validator_1 = require("src/app/validators/custom-validator");
var AdminProfileComponent = /** @class */ (function () {
    function AdminProfileComponent(authService, spinner, router, alertService, fb) {
        this.authService = authService;
        this.spinner = spinner;
        this.router = router;
        this.alertService = alertService;
        this.fb = fb;
        this.registered = false;
        this.submitted = false;
        this.serviceErrors = {};
    }
    AdminProfileComponent.prototype.ngOnInit = function () {
        this.myDateValue = new Date();
        this.userForm = this.createFormGroup();
        this.disableForm();
    };
    AdminProfileComponent.prototype.createFormGroup = function () {
        return this.fb.group({
            full_name: new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required])),
            email1: new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required])),
            email2: new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required])),
            nxtOfKin: new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required])),
            user_contact_number1: new forms_1.FormControl('', forms_1.Validators.compose([
                forms_1.Validators.required,
                custom_validator_1.CustomValidator.patternValidator(/^(([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9]))$/, { hasNumber: true })
            ])),
            user_contact_number2: new forms_1.FormControl('', forms_1.Validators.compose([
                forms_1.Validators.required,
                custom_validator_1.CustomValidator.patternValidator(/^(([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9]))$/, { hasNumber: true })
            ])),
            id_type: new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required])),
            id_number: new forms_1.FormControl('', forms_1.Validators.compose([
                forms_1.Validators.required,
                custom_validator_1.CustomValidator.patternValidator(/^(([a-zA-Z])([a-zA-Z])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])([a-zA-Z])([a-zA-Z])([a-zA-Z])([a-zA-Z])([a-zA-Z]))$/, { nationalIdCheck: true })
            ])),
            date_of_birth: new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required])),
            currentPassword: new forms_1.FormControl('', forms_1.Validators.compose([
                // 1. Password Field is Required
                forms_1.Validators.required,
                // 2. check whether the entered password has a number
                custom_validator_1.CustomValidator.patternValidator(/^(([0-9])([0-9])([0-9])([0-9]))$/, {
                    hasNumber: true
                }),
                // 3. check whether the entered password has upper case letter
                // CustomValidatorInitialCompanySetup.patternValidator(/[A-Z]/, { hasCapitalCase: true }),
                // 4. check whether the entered password has a lower-case letter
                // CustomValidatorInitialCompanySetup.patternValidator(/[a-z]/, { hasSmallCase: true }),
                // 5. check whether the entered password has a special character
                // CustomValidatorInitialCompanySetup.
                //   patternValidator(/[!@#$%^&*_+-=;':"|,.<>/?/<mailto:!@#$%^&*_+-=;':"|,.<>/?]/, { hasSpecialCharacters: true }),
                // 6. Has a length of exactly 4 digits
                forms_1.Validators.minLength(4),
                forms_1.Validators.maxLength(4),
            ])),
            password: new forms_1.FormControl('', forms_1.Validators.compose([
                // 1. Password Field is Required
                forms_1.Validators.required,
                // 2. check whether the entered password has a number
                custom_validator_1.CustomValidator.patternValidator(/^(([0-9])([0-9])([0-9])([0-9]))$/, {
                    hasNumber: true
                }),
                // 3. check whether the entered password has upper case letter
                // CustomValidatorInitialCompanySetup.patternValidator(/[A-Z]/, { hasCapitalCase: true }),
                // 4. check whether the entered password has a lower-case letter
                // CustomValidatorInitialCompanySetup.patternValidator(/[a-z]/, { hasSmallCase: true }),
                // 5. check whether the entered password has a special character
                // CustomValidatorInitialCompanySetup.
                //   patternValidator(/[!@#$%^&*_+-=;':"|,.<>/?/<mailto:!@#$%^&*_+-=;':"|,.<>/?]/, { hasSpecialCharacters: true }),
                // 6. Has a length of exactly 4 digits
                forms_1.Validators.minLength(4),
                forms_1.Validators.maxLength(4),
            ])),
            confirmPassword: new forms_1.FormControl('', forms_1.Validators.compose([
                // 1. Password Field is Required
                forms_1.Validators.required,
                // 2. check whether the entered password has a number
                custom_validator_1.CustomValidator.patternValidator(/^(([0-9])([0-9])([0-9])([0-9]))$/, {
                    hasNumber: true
                }),
                // 6. Has a length of exactly 4 digits
                forms_1.Validators.minLength(4),
                forms_1.Validators.maxLength(4),
            ]))
        }, { validator: custom_validator_1.CustomValidator.passwordMatchValidator });
    };
    AdminProfileComponent.prototype.revert = function () {
        this.userForm.reset();
    };
    Object.defineProperty(AdminProfileComponent.prototype, "fval", {
        get: function () {
            return this.userForm.controls;
        },
        enumerable: false,
        configurable: true
    });
    AdminProfileComponent.prototype.disableForm = function () {
        return this.userForm.disable();
    };
    AdminProfileComponent.prototype.enableEdit = function () {
        return this.userForm.enable();
    };
    // toggle visibility of password field
    AdminProfileComponent.prototype.toggleFieldType = function () {
        this.fieldType = !this.fieldType;
    };
    AdminProfileComponent.prototype.returnHome = function () {
        var _this = this;
        this.spinner.hide();
        this.revert();
        setTimeout(function () {
            _this.router.navigate(['authpage/loginpage']);
        }, 2000);
    };
    AdminProfileComponent.prototype.setProfileValues = function () {
        //
    };
    AdminProfileComponent.prototype.save = function () {
        //
    };
    AdminProfileComponent = __decorate([
        core_1.Component({
            selector: 'app-admin-profile',
            templateUrl: './admin-profile.component.html',
            styleUrls: ['./admin-profile.component.scss']
        })
    ], AdminProfileComponent);
    return AdminProfileComponent;
}());
exports.AdminProfileComponent = AdminProfileComponent;
