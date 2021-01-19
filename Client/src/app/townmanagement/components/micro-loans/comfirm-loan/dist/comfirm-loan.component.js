"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
        this.serviceErrors = {};
        this.User = this.authService.loggedInUserInfo();
        this.phoneNumbers = [];
    }
    ComfirmLoanComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.errored = false;
        this.posted = false;
        this.userForm = this.createFormGroup();
        this.others.getTxnApproved().subscribe(function (res) {
            if (res.length > 0) {
                _this.approvedLoans = res;
                _this.others.getMicroCustomers().subscribe(function (feed) {
                    if (res.length > 0) {
                        _this.customers = feed;
                        _this.phoneNumbers = [];
                        _this.customers.forEach(function (customer) {
                            _this.approvedLoans.forEach(function (loan) {
                                if (JSON.parse(loan.txnApprovalDetailsMicroPayLoad)[0].customerId === customer.customerId) {
                                    if (_this.phoneNumbers.includes(customer.customerPhone1)) {
                                        //  don't add that number
                                    }
                                    else {
                                        _this.phoneNumbers.push(customer.customerPhone1);
                                    }
                                }
                            });
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
            }
            else {
                _this.errored = true;
                _this.alertService.danger({
                    html: '<b>There are no approved loans to confirm</b>'
                });
            }
        }, function (err) {
            _this.errored = true;
            console.log(err.error.error.message);
            _this.alertService.danger({
                html: '<b>' + err.error.error.message + '</b>'
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
    ComfirmLoanComponent.prototype.checkLoan = function (value) {
        var _this = this;
        if (value !== '') {
            this.customers.forEach(function (customer) {
                if (customer.customerPhone1 === value) {
                    _this.checkedClient = customer;
                    _this.approvedLoans.forEach(function (loan) {
                        if (JSON.parse(loan.txnApprovalDetailsMicroPayLoad)[0].customerId === customer.customerId) {
                            _this.loanId = loan.txnApprovalDetailsMicroId;
                        }
                    });
                }
            });
        }
    };
    ComfirmLoanComponent.prototype.postLoan = function () {
        var _this = this;
        if (this.userForm.valid) {
            if (Number(this.fval.pin.value) === this.checkedClient.customerSecretPin) {
                var data = {
                    txnApprovalDetailsMircroId: this.loanId,
                    userId: this.User.userId
                };
                this.others.confirmMicroLoan([data]).subscribe(function (res) {
                    if (res) {
                        _this.posted = true;
                        _this.alertService.success({
                            html: '<b> Loan was complete</b>'
                        });
                        setTimeout(function () {
                            _this.userForm = _this.createFormGroup();
                        }, 3000);
                    }
                }, function (err) {
                    _this.errored = true;
                    if (err.error.error.status === 500) {
                        _this.alertService.danger({
                            html: '<b> Server Could Not handle this request!</b>'
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
