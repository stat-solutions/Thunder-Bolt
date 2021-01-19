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
exports.LoanTenureComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var custom_validator_1 = require("src/app/validators/custom-validator");
var LoanTenureComponent = /** @class */ (function () {
    function LoanTenureComponent(authService, others, router, spinner, alertService, modalService) {
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
    LoanTenureComponent.prototype.ngOnInit = function () {
        this.userForm = this.createFormGroup();
        this.checkedOk = false;
    };
    LoanTenureComponent.prototype.createFormGroup = function () {
        return new forms_1.FormGroup({
            loanType: new forms_1.FormControl(['', forms_1.Validators.required]),
            number_plate: new forms_1.FormControl(''),
            user_contact_number: new forms_1.FormControl(''),
            tenure: new forms_1.FormControl({ value: '', disabled: false }, forms_1.Validators.compose([forms_1.Validators.required, custom_validator_1.CustomValidator.maxValue(100)])),
            pin: new forms_1.FormControl({ value: '', disabled: false }, forms_1.Validators.compose([
                forms_1.Validators.required,
                custom_validator_1.CustomValidator.patternValidator(/\d/, { hasNumber: true }),
                forms_1.Validators.maxLength(4),
                forms_1.Validators.minLength(4),
            ]))
        });
    };
    LoanTenureComponent.prototype.checkLoanType = function (value) {
        var _this = this;
        switch (value) {
            case 'Boda Loan':
                this.others.getBodaCustomers().subscribe(function (res) {
                    if (res.length > 0) {
                        _this.loanType = value;
                        _this.customers = [];
                        _this.customers = res;
                        _this.fval.number_plate.setValue('');
                        _this.fval.tenure.setValue('');
                        _this.fval.pin.setValue('');
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
                        _this.fval.tenure.setValue('');
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
                        _this.fval.tenure.setValue('');
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
    LoanTenureComponent.prototype.choosingPdts = function () {
        this.loanType = '';
        this.numberPlates = [];
        this.phoneNumbers = [];
    };
    LoanTenureComponent.prototype.checkLoanbility = function (value) {
        if (value !== '') {
            // console.log(this.loanType);
            switch (this.loanType) {
                case 'Boda Loan':
                    var bodaCustomers = __spreadArrays(this.customers);
                    bodaCustomers = bodaCustomers.filter(function (customer) { return customer.bodabodaCustomerNumberPlate === value.toUpperCase(); });
                    if (bodaCustomers.length === 1) {
                        this.checkedClient = bodaCustomers[0];
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
    LoanTenureComponent.prototype.revert = function () {
        this.userForm.reset();
    };
    LoanTenureComponent.prototype.refresh = function () {
        location.reload();
    };
    Object.defineProperty(LoanTenureComponent.prototype, "fval", {
        get: function () {
            return this.userForm.controls;
        },
        enumerable: false,
        configurable: true
    });
    LoanTenureComponent.prototype.openModal = function (template) {
        this.modalRef = this.modalService.show(template, Object.assign({}, { "class": 'modal-lg modal-dialog-centered' }));
    };
    // toggle visibility of password field
    LoanTenureComponent.prototype.toggleFieldType = function () {
        this.fieldType = !this.fieldType;
    };
    LoanTenureComponent.prototype.reduceRate = function () {
        var _this = this;
        var tenure = this.fval.tenure.value;
        if (this.userForm.valid) {
            this.others.verifyUserWithPin({ userPhone1: this.User.userPhone, userPassword: Number(this.fval.pin.value) }).subscribe(function (res) {
                if (res) {
                    var data = {
                        customerId: _this.checkedClient.customerId,
                        theStationLocationId: _this.checkedClient.fktheStationLocationIdCustomer,
                        productCode: _this.loanType === 'Boda Loan' ? 200 : _this.loanType === 'Taxi Loan' ? 300 : 400,
                        theLoanTenure: tenure,
                        userId: _this.User.userId,
                        comment: "This customer's loan tenure should be changed to " + tenure + " days"
                    };
                    _this.others.setIndividualLoanTenure(data).subscribe(function (response) {
                        if (response === true) {
                            _this.posted = true;
                            _this.alertService.success({
                                html: '<b> Individual Loan Tenure was Initiated Successfully, wait for approval</b>'
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
    LoanTenureComponent = __decorate([
        core_1.Component({
            selector: 'app-loan-tenure',
            templateUrl: './loan-tenure.component.html',
            styleUrls: ['./loan-tenure.component.scss']
        })
    ], LoanTenureComponent);
    return LoanTenureComponent;
}());
exports.LoanTenureComponent = LoanTenureComponent;
