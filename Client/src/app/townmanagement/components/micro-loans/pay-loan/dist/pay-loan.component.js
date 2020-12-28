"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.PayLoanComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var custom_validator_1 = require("src/app/validators/custom-validator");
var PayLoanComponent = /** @class */ (function () {
    function PayLoanComponent(authService, others, spinner, router, alertService, storage) {
        this.authService = authService;
        this.others = others;
        this.spinner = spinner;
        this.router = router;
        this.alertService = alertService;
        this.storage = storage;
        this.registered = false;
        this.submitted = false;
        this.errored = false;
        this.posted = false;
        this.User = this.authService.loggedInUserInfo();
    }
    PayLoanComponent.prototype.ngOnInit = function () {
        this.errored = false;
        this.posted = false;
        this.userForm = this.createFormGroup();
    };
    PayLoanComponent.prototype.createFormGroup = function () {
        return new forms_1.FormGroup({
            user_contact_number: new forms_1.FormControl('', forms_1.Validators.compose([
                forms_1.Validators.required,
                custom_validator_1.CustomValidator.patternValidator(/^(([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9]))$/, { hasNumber: true }),
            ])),
            amount_to_pay: new forms_1.FormControl({ value: '', disabled: false }, forms_1.Validators.compose([
                forms_1.Validators.required,
                custom_validator_1.CustomValidator.patternValidator(/\d/, { hasNumber: true }),
                forms_1.Validators.maxLength(6),
                forms_1.Validators.minLength(3),
            ])),
            pin: new forms_1.FormControl({ value: '', disabled: false }, forms_1.Validators.compose([
                forms_1.Validators.required,
                custom_validator_1.CustomValidator.patternValidator(/\d/, { hasNumber: true }),
                forms_1.Validators.maxLength(4),
                forms_1.Validators.minLength(4),
            ]))
        });
    };
    // toggle visibility of password field
    PayLoanComponent.prototype.toggleFieldType = function () {
        this.fieldType = !this.fieldType;
    };
    PayLoanComponent.prototype.revert = function () {
        this.userForm.reset();
    };
    Object.defineProperty(PayLoanComponent.prototype, "fval", {
        get: function () {
            return this.userForm.controls;
        },
        enumerable: false,
        configurable: true
    });
    PayLoanComponent.prototype.pay = function () {
    };
    PayLoanComponent = __decorate([
        core_1.Component({
            selector: 'app-pay-loan',
            templateUrl: './pay-loan.component.html',
            styleUrls: ['./pay-loan.component.scss']
        })
    ], PayLoanComponent);
    return PayLoanComponent;
}());
exports.PayLoanComponent = PayLoanComponent;
