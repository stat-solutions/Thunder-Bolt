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
exports.PayComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var custom_validator_1 = require("src/app/validators/custom-validator");
var PayComponent = /** @class */ (function () {
    function PayComponent(authService, others, router, spinner, alertService, modalService) {
        this.authService = authService;
        this.others = others;
        this.router = router;
        this.spinner = spinner;
        this.alertService = alertService;
        this.modalService = modalService;
        this.posted = false;
        this.user = '/../../../assets/img/man.svg';
        this.numberPlates = [];
        this.phoneNumbers = [];
        this.User = this.authService.loggedInUserInfo();
    }
    PayComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.userForm = this.createFormGroup();
        this.checkedOk = false;
        this.others.getTxnDetails().subscribe(function (res) {
            _this.txns = res;
            // console.log(res);
        }, function (err) {
            console.log(err.error.statusText);
        });
    };
    PayComponent.prototype.createFormGroup = function () {
        return new forms_1.FormGroup({
            loanType: new forms_1.FormControl(['', forms_1.Validators.required]),
            number_plate: new forms_1.FormControl('', forms_1.Validators.compose([
                forms_1.Validators.required,
                forms_1.Validators.minLength(8),
                forms_1.Validators.maxLength(8),
            ])),
            amount_to_pay: new forms_1.FormControl({ value: '', disabled: true }, forms_1.Validators.compose([
                forms_1.Validators.required,
                custom_validator_1.CustomValidator.patternValidator(/\d/, { hasNumber: true }),
                forms_1.Validators.maxLength(6),
                forms_1.Validators.minLength(3),
            ])),
            pin: new forms_1.FormControl({ value: '', disabled: true }, forms_1.Validators.compose([
                forms_1.Validators.required,
                custom_validator_1.CustomValidator.patternValidator(/\d/, { hasNumber: true }),
                forms_1.Validators.maxLength(4),
                forms_1.Validators.minLength(4),
            ]))
        });
    };
    PayComponent.prototype.checkLoanType = function (value) {
        var _this = this;
        switch (value) {
            case 'Boda Loan':
                this.others.getBodaCustomers().subscribe(function (res) {
                    if (res.length > 0) {
                        _this.loanType = value;
                        _this.customers = [];
                        _this.customers = res;
                        _this.fval.number_plate.setValue('');
                        _this.fval.amount_to_pay.setValue('');
                        _this.fval.pin.setValue('');
                        _this.fval.amount_to_pay.disable();
                        _this.fval.pin.disable();
                        _this.numberPlates = [];
                        _this.checkedClient = {};
                        _this.customers.forEach(function (customer) {
                            _this.numberPlates.push(customer.bodabodaCustomerNumberPlate);
                        });
                    }
                    else {
                        _this.errored = true;
                        _this.choosingPdts();
                        _this.alertService.danger({
                            html: '<b>There are no boda boda customers registered</b>'
                        });
                    }
                }, function (err) {
                    _this.errored = true;
                    console.log(err);
                    _this.alertService.danger({
                        html: '<b>' + err.error.error.message + '</b>'
                    });
                });
                break;
            case 'Taxi Loan':
                this.others.getTaxiCustomers().subscribe(function (res) {
                    if (res.length > 0) {
                        _this.customers = [];
                        _this.checkedClient = {};
                        _this.customers = res;
                        _this.loanType = value;
                        _this.fval.number_plate.setValue('');
                        _this.fval.amount_to_pay.setValue('');
                        _this.fval.pin.setValue('');
                        _this.fval.amount_to_pay.disable();
                        _this.fval.pin.disable();
                        _this.numberPlates = [];
                        _this.customers.forEach(function (customer) {
                            _this.numberPlates.push(customer.taxiCustomerNumberPlate);
                        });
                    }
                    else {
                        _this.errored = true;
                        _this.choosingPdts();
                        _this.alertService.danger({
                            html: '<b>There are no Taxi customers registered</b>'
                        });
                    }
                }, function (err) {
                    _this.errored = true;
                    _this.alertService.danger({
                        html: '<b>' + err.error.error.message + '</b>'
                    });
                });
                break;
        }
    };
    PayComponent.prototype.choosingPdts = function () {
        this.loanType = '';
        this.numberPlates = [];
        this.phoneNumbers = [];
        this.fval.amount_to_pay.disable();
        this.fval.pin.disable();
    };
    PayComponent.prototype.enableAmountAndPin = function () {
        this.fval.amount_to_pay.enable();
        this.fval.pin.enable();
    };
    PayComponent.prototype.checkLoanbility = function (value, template) {
        var _this = this;
        if (value !== '') {
            // console.log(this.loanType);
            switch (this.loanType) {
                case 'Boda Loan':
                    var bodaCustomers_1 = __spreadArrays(this.customers);
                    bodaCustomers_1 = bodaCustomers_1.filter(function (customer) { return customer.bodabodaCustomerNumberPlate === value.toUpperCase(); });
                    if (bodaCustomers_1.length === 1) {
                        this.others.getLoadDetails({ customerId: bodaCustomers_1[0].customerId, productCode: 200 }).subscribe(function (res) {
                            _this.checkedClient = {
                                Id: bodaCustomers_1[0].customerId,
                                name: bodaCustomers_1[0].customerName,
                                // tslint:disable-next-line: max-line-length
                                photoUrl: bodaCustomers_1[0].customerPhotoUrl === 'customerPhotoUrl.com' ? _this.user : bodaCustomers_1[0].customerPhotoUrl,
                                phone: bodaCustomers_1[0].customerPhone1,
                                plate: bodaCustomers_1[0].bodabodaCustomerNumberPlate,
                                loanAmount: res.length === 1 ? res[0].loanAmountTaken : 0,
                                loanLimit: bodaCustomers_1[0].bodabodaCustomerLoanLimit,
                                loanPaid: res.length === 1 ? res[0].loanAmountPaid : 0,
                                loanBalance: res.length === 1 ? res[0].loanAmountRemaining : 0,
                                loanStatus: res.length === 1 ? res[0].loanStatus === 2 ? 'RUNNING' :
                                    res[0].loanStatus === 3 ? 'COMPLETE' : 'CREATED' : 'COMPLETE',
                                comment: bodaCustomers_1[0].customerComment,
                                pin: bodaCustomers_1[0].customerSecretPin
                            };
                            _this.openModal(template);
                            _this.enableAmountAndPin();
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
                            html: '<b> customer with number plate ' + value.toUpperCase() + ' is not registered<b>'
                        });
                    }
                    break;
                case 'Taxi Loan':
                    var taxiCustomers_1 = __spreadArrays(this.customers);
                    taxiCustomers_1 = taxiCustomers_1.filter(function (customer) { return customer.taxiCustomerNumberPlate === value.toUpperCase(); });
                    if (taxiCustomers_1.length === 1) {
                        this.others.getLoadDetails({ customerId: taxiCustomers_1[0].customerId, productCode: 200 }).subscribe(function (res) {
                            _this.checkedClient = {
                                Id: taxiCustomers_1[0].customerId,
                                name: taxiCustomers_1[0].customerName,
                                // tslint:disable-next-line: max-line-length
                                photoUrl: taxiCustomers_1[0].customerPhotoUrl === 'customerPhotoUrl.com' ? _this.user : taxiCustomers_1[0].customerPhotoUrl,
                                phone: taxiCustomers_1[0].customerPhone1,
                                plate: taxiCustomers_1[0].taxiCustomerNumberPlate,
                                loanLimit: taxiCustomers_1[0].taxiCustomerLoanLimit,
                                loanAmount: res.length === 1 ? res[0].loanAmountTaken : 0,
                                loanPaid: res.length === 1 ? res[0].loanAmountPaid : 0,
                                loanBalance: res.length === 1 ? res[0].loanAmountRemaining : 0,
                                loanStatus: res.length === 1 ? res[0].loanStatus === 2 ? 'RUNNING' :
                                    res[0].loanStatus === 3 ? 'COMPLETE' : 'CREATED' : 'COMPLETE',
                                comment: taxiCustomers_1[0].customerComment,
                                pin: taxiCustomers_1[0].customerSecretPin
                            };
                            _this.openModal(template);
                            _this.enableAmountAndPin();
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
                            html: '<b> customer with number plate ' + value.toUpperCase() + ' is not registered<b>'
                        });
                    }
                    break;
            }
        }
    };
    PayComponent.prototype.checkLimit = function (val) {
        if (val !== '') {
            val = parseInt(val.replace(/[\D\s\._\-]+/g, ''), 10);
            if (val > this.checkedClient.loanBalance) {
                this.errored = true;
                this.fval.amount_to_pay.setValue('');
                this.alertService.danger({
                    html: '<b> Amount provided (' + val + ') is greater than the customer loan limit</b>'
                });
            }
            else {
                this.loanAmount = val;
            }
        }
    };
    PayComponent.prototype.revert = function () {
        this.userForm.reset();
    };
    PayComponent.prototype.refresh = function () {
        location.reload();
    };
    Object.defineProperty(PayComponent.prototype, "fval", {
        get: function () {
            return this.userForm.controls;
        },
        enumerable: false,
        configurable: true
    });
    PayComponent.prototype.openModal = function (template) {
        this.modalRef = this.modalService.show(template, Object.assign({}, { "class": 'modal-lg modal-dialog-centered' }));
    };
    // toggle visibility of password field
    PayComponent.prototype.toggleFieldType = function () {
        this.fieldType = !this.fieldType;
    };
    PayComponent.prototype.assignTxnId = function (familyName, typeName) {
        for (var _i = 0, _a = this.txns; _i < _a.length; _i++) {
            var txn = _a[_i];
            if (txn.txnDetailsFamilyName.toUpperCase() === familyName && txn.txnDetailsTypeName.toUpperCase() === typeName) {
                return txn.txnDetailsId;
            }
        }
    };
    PayComponent.prototype.pay = function () {
        var _this = this;
        if (this.userForm.valid && this.checkedClient.Id && this.loanAmount) {
            this.others.verifyUserWithPin({ userPhone1: this.User.userPhone, userPassword: Number(this.fval.pin.value) }).subscribe(function (res) {
                if (res) {
                    var data = {
                        txnAmount: _this.loanAmount,
                        customerId: _this.checkedClient.Id,
                        txnDetailsId: null,
                        userId: _this.User.userId,
                        productCode: _this.loanType === 'Boda Loan' ? 200 : 300,
                        theStationLocationId: _this.User.userLocationId
                    };
                    switch (_this.loanType) {
                        case 'Boda Loan':
                            data.txnDetailsId = _this.assignTxnId('BODABODALOAN', 'LOANPAYMENT');
                            break;
                        case 'Taxi Loan':
                            data.txnDetailsId = _this.assignTxnId('TAXILOAN', 'LOANPAYMENT');
                            break;
                    }
                    _this.others.putTxnCustomer(data).subscribe(function (response) {
                        if (response === true) {
                            _this.posted = true;
                            _this.alertService.success({
                                html: '<b> Payment was successfully</b>'
                            });
                            setTimeout(_this.revert(), 3000);
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
                        html: "<b> User's pin does not match<b>"
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
    PayComponent = __decorate([
        core_1.Component({
            selector: 'app-pay',
            templateUrl: './pay.component.html',
            styleUrls: ['./pay.component.scss']
        })
    ], PayComponent);
    return PayComponent;
}());
exports.PayComponent = PayComponent;
