"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
exports.ComfirmLoanComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var custom_validator_1 = require("src/app/validators/custom-validator");
var ComfirmLoanComponent = /** @class */ (function () {
    function ComfirmLoanComponent(authService, others, spinner, router, alertService, storage) {
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
        this.showFinalBtn = false;
        this.showcompleteBtn = true;
        this.serviceErrors = {};
        this.User = this.authService.loggedInUserInfo();
        this.phoneNumbers = [];
    }
    ComfirmLoanComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.errored = false;
        this.posted = false;
        this.userForm = this.createFormGroup();
        this.others.getSecurityType().subscribe(function (res) {
            _this.securityTypes = res;
        }, function (err) {
            _this.errored = true;
            _this.alertService.danger({
                html: '<b>' + err.error.error.message + '</b>'
            });
        });
        this.others.getMicroCustomers().subscribe(function (res) {
            if (res.length > 0) {
                _this.customers = res;
                _this.phoneNumbers = [];
                _this.checkedClient = {};
                _this.customers.forEach(function (customer) {
                    _this.phoneNumbers.push(customer.customerPhone1);
                });
            }
            else {
                _this.errored = true;
                _this.alertService.danger({
                    html: '<b>There are no Micro Loan customers registered</b>'
                });
            }
        }, function (err) {
            _this.errored = true;
            console.log(err);
            _this.alertService.danger({
                html: '<b>' + err.error.error.mesage + '</b>'
            });
        });
    };
    ComfirmLoanComponent.prototype.createFormGroup = function () {
        return new forms_1.FormGroup({
            user_contact_number: new forms_1.FormControl('', forms_1.Validators.compose([
                forms_1.Validators.required,
                custom_validator_1.CustomValidator.patternValidator(/^(([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9]))$/, { hasNumber: true }),
            ])),
            pin: new forms_1.FormControl({ value: '', disabled: false }, forms_1.Validators.compose([
                forms_1.Validators.required,
                custom_validator_1.CustomValidator.patternValidator(/\d/, { hasNumber: true }),
                forms_1.Validators.maxLength(4),
                forms_1.Validators.minLength(4),
            ]))
        });
    };
    ComfirmLoanComponent.prototype.refresh = function () {
        location.reload();
    };
    ComfirmLoanComponent.prototype.checkLoanbility = function (value) {
        if (value !== '') {
            var microCustomers = __spreadArrays(this.customers);
            microCustomers = microCustomers.filter(function (customer) { return customer.customerPhone1 === value; });
            this.checkedClient = microCustomers[0];
            // this.openModal(template);
        }
    };
    // toggle visibility of password field
    ComfirmLoanComponent.prototype.toggleFieldType = function () {
        this.fieldType = !this.fieldType;
    };
    ComfirmLoanComponent.prototype.revert = function () {
        this.userForm.reset();
    };
    Object.defineProperty(ComfirmLoanComponent.prototype, "fval", {
        get: function () {
            return this.userForm.controls;
        },
        enumerable: false,
        configurable: true
    });
    ComfirmLoanComponent.prototype.getSecurityTypeCode = function (typeName) {
        for (var _i = 0, _a = this.securityTypes; _i < _a.length; _i++) {
            var item = _a[_i];
            if (item.securityTypeName === typeName) {
                return item.securityTypeCode;
            }
        }
    };
    ComfirmLoanComponent.prototype.saveAndNew = function () {
        if (this.userForm.valid) {
            if (Number(this.fval.pin.value) === this.checkedClient.customerSecretPin) {
                // const txn = {
                //   txnAmount:  parseInt(this.fval.amount_to_pay.value.replace(/[\D\s\._\-]+/g, ''), 10),
                //         customerId: this.checkedClient.customerId,
                //         txnDetailsId: this.assignTxnId('MICROLOAN', 'LOANDISBURSEMENT'),
                //         userId: this.User.userId,
                //         productCode: 400,
                //         microLoanPurpose: this.fval.loanpurpose.value.toUpperCase(),
                //         theStationLocationId: this.User.userLocationId
                // };
            }
            else {
                this.errored = true;
                this.alertService.danger({
                    html: '<b>Secret pin does not much</b>'
                });
            }
        }
    };
    ComfirmLoanComponent.prototype.postLoan = function () {
        var _this = this;
        if (this.userForm.valid) {
            if (Number(this.fval.pin.value) === this.checkedClient.customerSecretPin) {
                var data = {};
                this.others.putTxnCustomerApproval(data).subscribe(function (res) {
                    if (res) {
                        _this.posted = true;
                        _this.alertService.success({
                            html: '<b> Deposit was successfully</b>'
                        });
                        setTimeout(function () {
                            _this.userForm = _this.createFormGroup();
                        }, 3000);
                    }
                }, function (err) {
                    _this.errored = true;
                    if (err.error.error.status === 500) {
                        _this.alertService.danger({
                            html: '<b> Sever Could Not handle this request</b>'
                        });
                    }
                    else {
                        _this.alertService.danger({
                            html: '<b>' + err.error.error.message + '</b>'
                        });
                    }
                });
            }
            else {
                this.errored = true;
                this.alertService.danger({
                    html: '<b>Secret pin does not much</b>'
                });
            }
        }
    };
    ComfirmLoanComponent = __decorate([
        core_1.Component({
            selector: 'app-comfirm-loan',
            templateUrl: './comfirm-loan.component.html',
            styleUrls: ['./comfirm-loan.component.scss']
        })
    ], ComfirmLoanComponent);
    return ComfirmLoanComponent;
}());
exports.ComfirmLoanComponent = ComfirmLoanComponent;
