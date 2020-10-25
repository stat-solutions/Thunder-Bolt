"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.SetPasswordComponent = void 0;
var core_1 = require("@angular/core");
var jwt_decode = require("jwt-decode");
var forms_1 = require("@angular/forms");
var custom_validator_1 = require("src/app/validators/custom-validator");
var SetPasswordComponent = /** @class */ (function () {
    function SetPasswordComponent(authService, router, spinner, alertService, fb) {
        this.authService = authService;
        this.router = router;
        this.spinner = spinner;
        this.alertService = alertService;
        this.fb = fb;
        this.posted = false;
        this.user = '/../../../assets/img/man.svg';
    }
    SetPasswordComponent.prototype.ngOnInit = function () {
        this.userForm = this.createFormGroup();
        this.checkedOk = false;
    };
    SetPasswordComponent.prototype.createFormGroup = function () {
        return this.fb.group({
            currentPassword: new forms_1.FormControl('', forms_1.Validators.compose([
                // 1. Password Field is Required
                forms_1.Validators.required,
                // 2. check whether the entered password has a number
                custom_validator_1.CustomValidator.patternValidator(/^(([0-9])([0-9])([0-9])([0-9]))$/, {
                    hasNumber: true
                }),
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
    SetPasswordComponent.prototype.revert = function () {
        this.userForm.reset();
    };
    SetPasswordComponent.prototype.refresh = function () {
        location.reload();
    };
    Object.defineProperty(SetPasswordComponent.prototype, "fval", {
        get: function () {
            return this.userForm.controls;
        },
        enumerable: false,
        configurable: true
    });
    SetPasswordComponent.prototype.onKey = function (event) {
        // without type info
        this.values = event.target.value.replace(/[\D\s\._\-]+/g, '');
        this.numberValue = this.values ? parseInt(this.values, 10) : 0;
        // tslint:disable-next-line:no-unused-expression
        this.values =
            this.numberValue === 0 ? '' : this.numberValue.toLocaleString('en-US');
        this.userForm.controls.amount_to_borrow.setValue(this.values);
    };
    // toggle visibility of password field
    SetPasswordComponent.prototype.toggleFieldType = function () {
        this.fieldType = !this.fieldType;
    };
    SetPasswordComponent.prototype.setPassword = function () {
        this.userForm.patchValue({
            amount_to_borrow: parseInt(this.userForm.controls.amount_to_borrow.value.replace(/[\D\s\._\-]+/g, ''), 10)
        });
        // tslint:disable-next-line:triple-equals
        if (!(this.secretPin == this.userForm.controls.pin.value)) {
            this.alertService.danger({
                html: '<b>Invalid PIN!</b>'
            });
            return;
        }
        else {
            if (this.userForm.controls.amount_to_borrow.value > this.loanLimit) {
                this.alertService.warning({
                    html: '<b>Loan Limit Exceeded!</b>' + '<br/>'
                });
                return;
            }
            else {
                this.userForm.controls.number_plate.enable();
                this.userForm.patchValue({
                    user_station: jwt_decode(this.authService.getJwtToken()).user_station,
                    user_id: jwt_decode(this.authService.getJwtToken()).user_id
                });
                // console.log(this.userForm.value);
                this.posted = true;
                this.spinner.show();
                // this.pumpService.createLoan(this.userForm).subscribe(
                //   result => {
                //     this.amountDue = result[0].amount_due;
                //     this.txnId = result[0].txn_id;
                //     this.spinner.hide();
                //     this.openModal();
                //     this.router.navigate(['dashboardpump/shiftmanagement']);
                //     setTimeout(() => {
                //       location.reload();
                //     }, 3000);
                //   },
                //   (error: string) => {
                //     this.spinner.hide();
                //     this.errored = true;
                //     this.serviceErrors = error;
                //     this.alertService.danger({
                //       html: '<b>' + this.serviceErrors + '</b>' + '<br/>'
                //     });
                //   }
                // );
            }
        }
    };
    SetPasswordComponent = __decorate([
        core_1.Component({
            selector: 'app-set-password',
            templateUrl: './set-password.component.html',
            styleUrls: ['./set-password.component.scss']
        })
    ], SetPasswordComponent);
    return SetPasswordComponent;
}());
exports.SetPasswordComponent = SetPasswordComponent;
