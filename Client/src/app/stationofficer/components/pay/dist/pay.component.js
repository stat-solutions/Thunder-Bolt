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
            number_plate: new forms_1.FormControl(''),
            user_contact_number: new forms_1.FormControl(''),
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
                        _this.fval.number_plate.setValidators([
                            forms_1.Validators.required,
                            forms_1.Validators.minLength(8),
                            forms_1.Validators.maxLength(8),
                        ]);
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
                        _this.fval.number_plate.setValidators([
                            forms_1.Validators.required,
                            forms_1.Validators.minLength(8),
                            forms_1.Validators.maxLength(8),
                        ]);
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
            case 'Micro Loan':
                this.others.getMicroCustomers().subscribe(function (res) {
                    if (res.length > 0) {
                        _this.customers = [];
                        _this.customers = res;
                        _this.checkedClient = {};
                        _this.loanType = value;
                        _this.fval.user_contact_number.setValue('');
                        _this.fval.amount_to_pay.setValue('');
                        _this.fval.pin.setValue('');
                        _this.fval.amount_to_pay.disable();
                        _this.fval.pin.disable();
                        _this.phoneNumbers = [];
                        _this.customers.forEach(function (customer) {
                            _this.phoneNumbers.push(customer.customerPhone1);
                        });
                        _this.fval.user_contact_number.setValidators([
                            forms_1.Validators.required,
                            custom_validator_1.CustomValidator.patternValidator(/^(([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9]))$/, { hasNumber: true }),
                        ]);
                    }
                    else {
                        _this.errored = true;
                        _this.choosingPdts();
                        _this.alertService.danger({
                            html: '<b>There are no Micro loan customers registered</b>'
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
                                photoUrl: bodaCustomers_1[0].customerIdPhotoUrl === 'customerIdPhotoUrl.com' ? _this.user : bodaCustomers_1[0].customerIdPhotoUrl,
                                phone: bodaCustomers_1[0].customerPhone1,
                                plate: bodaCustomers_1[0].bodabodaCustomerNumberPlate,
                                loanAmount: res[0].loanAmountTaken,
                                loanLimit: bodaCustomers_1[0].bodabodaCustomerLoanLimit,
                                loanPaid: res[0].loanAmountPaid,
                                loanBalance: res[0].loanAmountRemaining,
                                loanStatus: res[0].loanStatus === 2 ? 'RUNNING' : res[0].loanStatus === 3 ? 'COMPLETE' : 'CREATED',
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
                                photoUrl: taxiCustomers_1[0].customerIdPhotoUrl === 'customerIdPhotoUrl.com' ? _this.user : taxiCustomers_1[0].customerIdPhotoUrl,
                                phone: taxiCustomers_1[0].customerPhone1,
                                plate: taxiCustomers_1[0].taxiCustomerNumberPlate,
                                loanAmount: res[0].loanAmountTaken,
                                loanLimit: taxiCustomers_1[0].taxiCustomerLoanLimit,
                                loanPaid: res[0].loanAmountPaid,
                                loanBalance: res[0].loanAmountRemaining,
                                loanStatus: res[0].loanStatus === 2 ? 'RUNNING' : res[0].loanStatus === 3 ? 'COMPLETE' : 'CREATED',
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
                case 'Micro Loan':
                    var microCustomers = __spreadArrays(this.customers);
                    microCustomers = microCustomers.filter(function (customer) { return customer.customerPhone1 === value.toUpperCase(); });
                    if (microCustomers.length === 1) {
                        this.checkedClient = {
                            Id: microCustomers[0].customerId,
                            name: microCustomers[0].customerName,
                            // tslint:disable-next-line: max-line-length
                            photoUrl: microCustomers[0].customerIdPhotoUrl === 'customerIdPhotoUrl.com' ? this.user : microCustomers[0].customerIdPhotoUrl,
                            phone: microCustomers[0].customerPhone1,
                            loanAmount: microCustomers[0].microloanCustomerLoanLimit,
                            loanLimit: microCustomers[0].microloanCustomerLoanLimit,
                            loanPaid: microCustomers[0].microloanCustomerLoanLimit,
                            loanBalance: microCustomers[0].microloanCustomerLoanLimit,
                            loanStatus: microCustomers[0].microloanCustomerLoanLimit,
                            comment: microCustomers[0].customerComment,
                            pin: microCustomers[0].customerSecretPin
                        };
                        this.openModal(template);
                        this.enableAmountAndPin();
                    }
                    else {
                        this.errored = true;
                        this.checkedClient = {};
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
                this.fval.amount_to_pay.setValue(this.checkedClient.loanBalance);
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
            // if (Number(this.fval.pin.value) === this.checkedClient.pin){
            var data = {
                txnAmount: this.loanAmount,
                customerId: this.checkedClient.Id,
                txnDetailsId: null,
                userId: this.User.userId,
                productCode: this.loanType === 'Boda Loan' ? 200 :
                    this.loanType === 'Taxi Loan' ? 300 : 400,
                theStationLocationId: this.User.userLocationId
            };
            switch (this.loanType) {
                case 'Boda Loan':
                    data.txnDetailsId = this.assignTxnId('BODABODALOAN', 'LOANPAYMENT');
                    break;
                case 'Taxi Loan':
                    data.txnDetailsId = this.assignTxnId('TAXILOAN', 'LOANPAYMENT');
                    break;
                case 'Micro Loan':
                    data.txnDetailsId = this.assignTxnId('MICROLOAN', 'LOANPAYMENT');
                    break;
            }
            this.others.putTxnCustomer(data).subscribe(function (res) {
                if (res) {
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
            // } else {
            //   this.errored = true;
            //   this.alertService.danger({
            //     html: '<b>Secret pin does not much</b>'
            //   });
            // }
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
