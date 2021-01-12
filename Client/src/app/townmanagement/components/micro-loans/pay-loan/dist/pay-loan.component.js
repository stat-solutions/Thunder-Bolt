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
        this.user = '/../../../assets/img/man.svg';
    }
    PayLoanComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.errored = false;
        this.posted = false;
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
                html: '<b>' + err.error.error.message + '</b>'
            });
        });
        this.others.getTxnDetails().subscribe(function (res) {
            _this.txns = res;
            // console.log(res);
        }, function (err) {
            _this.errored = true;
            _this.alertService.danger({
                html: '<b>' + err.error.error.message + '</b>'
            });
        });
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
    PayLoanComponent.prototype.assignTxnId = function (familyName, typeName) {
        for (var _i = 0, _a = this.txns; _i < _a.length; _i++) {
            var txn = _a[_i];
            if (txn.txnDetailsFamilyName.toUpperCase() === familyName && txn.txnDetailsTypeName.toUpperCase() === typeName) {
                return txn.txnDetailsId;
            }
        }
    };
    PayLoanComponent.prototype.checkLoanbility = function (value) {
        var _this = this;
        if (value !== '') {
            var microCustomers_1 = __spreadArrays(this.customers);
            microCustomers_1 = microCustomers_1.filter(function (customer) { return customer.customerPhone1 === value; });
            if (microCustomers_1.length === 1) {
                this.others.getLoadDetails({ customerId: microCustomers_1[0].customerId, productCode: 400 }).subscribe(function (res) {
                    _this.checkedClient = {
                        Id: microCustomers_1[0].customerId,
                        name: microCustomers_1[0].customerName,
                        // tslint:disable-next-line: max-line-length
                        photoUrl: microCustomers_1[0].customerPhotoUrl === 'customerPhotoUrl.com' ? _this.user : microCustomers_1[0].customerPhotoUrl,
                        phone: microCustomers_1[0].customerPhone1,
                        loanAmount: res.length === 1 ? res[0].loanAmountTaken : 0,
                        loanLimit: microCustomers_1[0].bodabodaCustomerLoanLimit,
                        loanPaid: res.length === 1 ? res[0].loanAmountPaid : 0,
                        loanBalance: res.length === 1 ? res[0].loanAmountRemaining : 0,
                        loanStatus: res.length === 1 ? res[0].loanStatus === 2 ? 'RUNNING' :
                            res[0].loanStatus === 3 ? 'COMPLETE' : 'CREATED' : 'COMPLETE',
                        comment: microCustomers_1[0].customerComment,
                        pin: microCustomers_1[0].customerSecretPin,
                        theStationLocationId: microCustomers_1[0].fktheStationLocationIdCustomer
                    };
                    // this.openModal(template);
                }, function (err) {
                    _this.errored = true;
                    _this.alertService.danger({
                        html: '<b>' + err.error.error.message + '<b>'
                    });
                });
            }
            else {
                this.errored = true;
                this.alertService.danger({
                    html: '<b> customer with phone number ' + value + ' is not registered<b>'
                });
            }
        }
    };
    PayLoanComponent.prototype.checkLimit = function (val) {
        //  this.checkedClient.loanBalance = 60000;
        if (val !== '') {
            val = parseInt(val.replace(/[\D\s\._\-]+/g, ''), 10);
            if (val > this.checkedClient.loanBalance) {
                this.errored = true;
                this.fval.amount_to_pay.setValue('');
                this.alertService.danger({
                    html: '<b> Amount provided is greater than the customer loan balance ' + this.checkedClient.loanBalance + '</b>'
                });
            }
            else {
                // this.loanAmount = val;
                return;
            }
        }
    };
    PayLoanComponent.prototype.pay = function () {
        var _this = this;
        if (this.userForm.valid) {
            this.others.verifyUserWithPin({ userPhone1: this.User.userPhone, userPassword: Number(this.fval.pin.value) }).subscribe(function (res) {
                if (res) {
                    var data = {
                        txnAmount: parseInt(_this.fval.amount_to_pay.value.replace(/[\D\s\._\-]+/g, ''), 10),
                        customerId: _this.checkedClient.customerId,
                        txnDetailsId: _this.assignTxnId('MICROLOAN ', 'LOANPAYMENT'),
                        userId: _this.User.userId,
                        productCode: 400,
                        theStationLocationId: _this.checkedClient.theStationLocationId
                    };
                    _this.others.putTxnCustomer(data).subscribe(function (feed) {
                        if (feed) {
                            _this.posted = true;
                            _this.alertService.success({
                                html: '<b> payment was successfully</b>'
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
                    _this.errored = true;
                    _this.alertService.danger({
                        html: "<b>User's pin does not match</b>"
                    });
                }
            }, function (err) {
                _this.errored = true;
                _this.alertService.danger({
                    html: '<b>' + err.error.error.message + '<b>'
                });
            });
        }
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
