"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
                        _this.customers = res;
                        _this.customers.forEach(function (customer) {
                            _this.numberPlates.push(customer.bodabodaCustomerNumberPlate);
                        });
                        _this.loanType = value;
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
                        _this.customers = res;
                        _this.customers.forEach(function (customer) {
                            _this.numberPlates.push(customer.taxiCustomerNumberPlate);
                        });
                        _this.fval.number_plate.setValidators([
                            forms_1.Validators.required,
                            forms_1.Validators.minLength(8),
                            forms_1.Validators.maxLength(8),
                        ]);
                        _this.loanType = value;
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
                        _this.customers = res;
                        _this.customers.forEach(function (customer) {
                            _this.phoneNumbers.push(customer.customerPhone1);
                        });
                        _this.fval.user_contact_number.setValidators([
                            forms_1.Validators.required,
                            custom_validator_1.CustomValidator.patternValidator(/^(([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9]))$/, { hasNumber: true }),
                        ]);
                        _this.loanType = value;
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
        this.fval.amount_to_borrow.disable();
        this.fval.pin.disable();
    };
    PayComponent.prototype.enableAmountAndPin = function () {
        this.fval.amount_to_borrow.enable();
        this.fval.pin.enable();
    };
    PayComponent.prototype.checkLoanbility = function (value, template) {
        var _this = this;
        if (value !== '') {
            switch (this.loanType) {
                case 'Boda Loan':
                    this.customers.forEach(function (customer) {
                        if (customer.bodabodaCustomerNumberPlate === value) {
                            _this.checkedClient = {
                                Id: customer.customerId,
                                name: customer.customerName,
                                photoUrl: customer.customerIdPhotoUrl === 'customerIdPhotoUrl.com' ? _this.user : customer.customerIdPhotoUrl,
                                phone: customer.customerPhone1,
                                plate: customer.bodabodaCustomerNumberPlate,
                                loanAmount: customer.bodabodaCustomerLoanLimit,
                                loanLimit: customer.bodabodaCustomerLoanLimit,
                                loanPaid: customer.bodabodaCustomerLoanLimit,
                                loanBalance: customer.bodabodaCustomerLoanLimit,
                                loanStatus: customer.bodabodaCustomerLoanLimit,
                                comment: customer.customerComment,
                                pin: customer.customerSecretPin
                            };
                            _this.openModal(template);
                            _this.enableAmountAndPin();
                        }
                        else {
                            _this.errored = true;
                            _this.alertService.danger({
                                html: '<b> customer with number plate' + value.toUpperCase() + ' is not registered<b>'
                            });
                        }
                    });
                    break;
                case 'Taxi Loan':
                    this.customers.forEach(function (customer) {
                        if (customer.taxiCustomerNumberPlate === value) {
                            _this.checkedClient = {
                                Id: customer.customerId,
                                name: customer.customerName,
                                photoUrl: customer.customerIdPhotoUrl === 'customerIdPhotoUrl.com' ? _this.user : customer.customerIdPhotoUrl,
                                phone: customer.customerPhone1,
                                plate: customer.taxiCustomerNumberPlate,
                                loanAmount: customer.taxiCustomerLoanLimit,
                                loanLimit: customer.taxiCustomerLoanLimit,
                                loanPaid: customer.taxiCustomerLoanLimit,
                                loanBalance: customer.taxiCustomerLoanLimit,
                                loanStatus: customer.taxiCustomerLoanLimit,
                                comment: customer.customerComment,
                                pin: customer.customerSecretPin
                            };
                            _this.openModal(template);
                            _this.enableAmountAndPin();
                        }
                        else {
                            _this.errored = true;
                            _this.alertService.danger({
                                html: '<b> customer with number plate' + value.toUpperCase() + ' is not registered<b>'
                            });
                        }
                    });
                    break;
                case 'Micro Loan':
                    this.customers.forEach(function (customer) {
                        if (customer.customerPhone1 === value) {
                            _this.checkedClient = {
                                Id: customer.customerId,
                                name: customer.customerName,
                                photoUrl: customer.customerIdPhotoUrl === 'customerIdPhotoUrl.com' ? _this.user : customer.customerIdPhotoUrl,
                                phone: customer.customerPhone1,
                                loanAmount: customer.microloanCustomerLoanLimit,
                                loanLimit: customer.microloanCustomerLoanLimit,
                                loanPaid: customer.microloanCustomerLoanLimit,
                                loanBalance: customer.microloanCustomerLoanLimit,
                                loanStatus: customer.microloanCustomerLoanLimit,
                                comment: customer.customerComment,
                                pin: customer.customerSecretPin
                            };
                            _this.openModal(template);
                            _this.enableAmountAndPin();
                        }
                        else {
                            _this.errored = true;
                            _this.alertService.danger({
                                html: '<b> customer with number plate' + value.toUpperCase() + ' is not registered<b>'
                            });
                        }
                    });
                    break;
            }
        }
    };
    PayComponent.prototype.checkLimit = function (val) {
        if (val !== '') {
            val = parseInt(val.replace(/[\D\s\._\-]+/g, ''), 10);
            if (val > this.checkedClient.loanLimit) {
                this.errored = true;
                this.fval.amount_to_borrow.setValue(this.checkedClient.loanLimit);
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
    PayComponent.prototype.lend = function () {
        var _this = this;
        if (this.userForm.valid) {
            if (Number(this.fval.pin.value) === this.checkedClient.pin) {
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
            }
            else {
                this.errored = true;
                this.alertService.danger({
                    html: '<b>Secret pin does not much</b>'
                });
            }
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
