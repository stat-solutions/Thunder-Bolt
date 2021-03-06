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
exports.SetLoanLimitComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var custom_validator_1 = require("src/app/validators/custom-validator");
var SetLoanLimitComponent = /** @class */ (function () {
    function SetLoanLimitComponent(authService, others, router, spinner, alertService, modalService) {
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
    SetLoanLimitComponent.prototype.ngOnInit = function () {
        this.userForm = this.createFormGroup();
        this.checkedOk = false;
    };
    SetLoanLimitComponent.prototype.createFormGroup = function () {
        return new forms_1.FormGroup({
            category: new forms_1.FormControl(['', forms_1.Validators.required]),
            loanType: new forms_1.FormControl(['', forms_1.Validators.required]),
            number_plate: new forms_1.FormControl(''),
            user_contact_number: new forms_1.FormControl(''),
            itemLimit: new forms_1.FormControl({ value: '', disabled: false }, forms_1.Validators.compose([
                forms_1.Validators.required,
                custom_validator_1.CustomValidator.minValue(5000),
                forms_1.Validators.minLength(4),
            ])),
            pin: new forms_1.FormControl({ value: '', disabled: false }, forms_1.Validators.compose([
                forms_1.Validators.required,
                custom_validator_1.CustomValidator.patternValidator(/\d/, { hasNumber: true }),
                forms_1.Validators.maxLength(4),
                forms_1.Validators.minLength(4),
            ]))
        });
    };
    SetLoanLimitComponent.prototype.checkLoanType = function (value) {
        var _this = this;
        switch (value) {
            case 'Boda Loan':
                this.others.getBodaCustomers().subscribe(function (res) {
                    if (res.length > 0) {
                        _this.loanType = value;
                        _this.customers = [];
                        _this.customers = res;
                        _this.fval.number_plate.setValue('');
                        _this.fval.itemLimit.setValue('');
                        _this.fval.pin.setValue('');
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
                        _this.fval.itemLimit.setValue('');
                        _this.fval.pin.setValue('');
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
                        _this.fval.itemLimit.setValue('');
                        _this.fval.pin.setValue('');
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
    SetLoanLimitComponent.prototype.choosingPdts = function () {
        this.loanType = '';
        this.numberPlates = [];
        this.phoneNumbers = [];
    };
    SetLoanLimitComponent.prototype.checkLoanbility = function (value, template) {
        var _this = this;
        if (value !== '') {
            // console.log(this.loanType);
            switch (this.loanType) {
                case 'Boda Loan':
                    var bodaCustomers = __spreadArrays(this.customers);
                    bodaCustomers = bodaCustomers.filter(function (customer) { return customer.bodabodaCustomerNumberPlate === value.toUpperCase(); });
                    if (bodaCustomers.length === 1) {
                        this.checkedClient = bodaCustomers[0];
                        this.others.bodaAndTaxiCustomerStatement({
                            customerId: this.checkedClient.customerId,
                            productCode: 300
                        }).subscribe(function (res) {
                            _this.statement = res;
                            if (_this.statement.length === 0) {
                                _this.posted = true;
                                _this.alertService.success({
                                    html: '<b>Customer has no previous transactions</b>'
                                });
                            }
                            else {
                                _this.openModal(template);
                            }
                        }, function (err) {
                            _this.errored = true;
                            _this.alertService.danger({
                                html: '<b>There was a problem getting customer statement</b>'
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
                    var taxiCustomers = __spreadArrays(this.customers);
                    taxiCustomers = taxiCustomers.filter(function (customer) { return customer.taxiCustomerNumberPlate === value.toUpperCase(); });
                    if (taxiCustomers.length === 1) {
                        this.checkedClient = taxiCustomers[0];
                        this.others.bodaAndTaxiCustomerStatement({
                            customerId: this.checkedClient.customerId,
                            productCode: 300
                        }).subscribe(function (res) {
                            _this.statement = res;
                            if (_this.statement.length === 0) {
                                _this.posted = true;
                                _this.alertService.success({
                                    html: '<b>Customer has no previous transactions</b>'
                                });
                            }
                            else {
                                _this.openModal(template);
                            }
                        }, function (err) {
                            _this.errored = true;
                            _this.alertService.danger({
                                html: '<b>There was a problem getting customer statement</b>'
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
                        this.checkedClient = microCustomers[0];
                        this.others.microCustomerStatement(this.checkedClient.customerId).subscribe(function (res) {
                            _this.statement = res;
                            if (_this.statement.length === 0) {
                                _this.posted = true;
                                _this.alertService.success({
                                    html: '<b>Customer has no previous transactions</b>'
                                });
                            }
                            else {
                                _this.openModal(template);
                            }
                        }, function (err) {
                            _this.errored = true;
                            _this.alertService.danger({
                                html: '<b>There was a problem getting customer statement</b>'
                            });
                        });
                    }
                    else {
                        this.errored = true;
                        this.checkedClient = {};
                        this.alertService.danger({
                            html: '<b> customer phone number ' + value.toUpperCase() + ' is not registered<b>'
                        });
                    }
                    break;
            }
        }
    };
    SetLoanLimitComponent.prototype.revert = function () {
        this.userForm.reset();
    };
    SetLoanLimitComponent.prototype.refresh = function () {
        location.reload();
    };
    Object.defineProperty(SetLoanLimitComponent.prototype, "fval", {
        get: function () {
            return this.userForm.controls;
        },
        enumerable: false,
        configurable: true
    });
    SetLoanLimitComponent.prototype.openModal = function (template) {
        this.modalRef = this.modalService.show(template, Object.assign({}, { "class": 'modal-lg modal-dialog-centered' }));
    };
    // toggle visibility of password field
    SetLoanLimitComponent.prototype.toggleFieldType = function () {
        this.fieldType = !this.fieldType;
    };
    SetLoanLimitComponent.prototype.setLoanLimit = function () {
        var _this = this;
        var itemLimit = this.fval.itemLimit.value;
        if (this.userForm.valid) {
            this.others.verifyUserWithPin({ userPhone1: this.User.userPhone, userPassword: Number(this.fval.pin.value) }).subscribe(function (res) {
                if (res) {
                    var data = {
                        customerId: _this.checkedClient.customerId,
                        theStationLocationId: _this.checkedClient.fktheStationLocationIdCustomer,
                        productCode: _this.loanType === 'Boda Loan' ? 200 : _this.loanType === 'Taxi Loan' ? 300 : 400,
                        theLoanLimit: itemLimit,
                        userId: _this.User.userId,
                        comment: "Please set loan limit of this customer to " + itemLimit
                    };
                    _this.others.setIdividualLoanLimit(data).subscribe(function (response) {
                        if (response === true) {
                            _this.posted = true;
                            _this.alertService.success({
                                html: '<b> Individual Loan limit was Initiated Successfully, wait for approval</b>'
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
    SetLoanLimitComponent = __decorate([
        core_1.Component({
            selector: 'app-set-loan-limit',
            templateUrl: './set-loan-limit.component.html',
            styleUrls: ['./set-loan-limit.component.scss']
        })
    ], SetLoanLimitComponent);
    return SetLoanLimitComponent;
}());
exports.SetLoanLimitComponent = SetLoanLimitComponent;
