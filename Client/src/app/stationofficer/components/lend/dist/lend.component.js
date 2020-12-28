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
exports.LendComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var custom_validator_1 = require("src/app/validators/custom-validator");
var LendComponent = /** @class */ (function () {
    function LendComponent(authService, others, router, spinner, alertService, modalService) {
        this.authService = authService;
        this.others = others;
        this.router = router;
        this.spinner = spinner;
        this.alertService = alertService;
        this.modalService = modalService;
        this.posted = false;
        this.canLend = false;
        this.user = '/../../../assets/img/man.svg';
        this.numberPlates = [];
        this.phoneNumbers = [];
        this.User = this.authService.loggedInUserInfo();
    }
    LendComponent.prototype.ngOnInit = function () {
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
    LendComponent.prototype.createFormGroup = function () {
        return new forms_1.FormGroup({
            loanType: new forms_1.FormControl(['', forms_1.Validators.required]),
            number_plate: new forms_1.FormControl('', forms_1.Validators.compose([
                forms_1.Validators.required,
                forms_1.Validators.minLength(8),
                forms_1.Validators.maxLength(8),
            ])),
            amount_to_borrow: new forms_1.FormControl({ value: '', disabled: true }, forms_1.Validators.compose([
                forms_1.Validators.required,
                custom_validator_1.CustomValidator.patternValidator(/\d/, { hasNumber: true }),
                forms_1.Validators.maxLength(12),
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
    LendComponent.prototype.checkLoanType = function (value) {
        var _this = this;
        switch (value) {
            case 'Boda Loan':
                this.others.getBodaCustomers().subscribe(function (res) {
                    if (res.length > 0) {
                        _this.loanType = value;
                        _this.customers = [];
                        _this.customers = res;
                        _this.fval.number_plate.setValue('');
                        _this.fval.amount_to_borrow.setValue('');
                        _this.fval.pin.setValue('');
                        _this.fval.amount_to_borrow.disable();
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
                        _this.fval.amount_to_borrow.setValue('');
                        _this.fval.pin.setValue('');
                        _this.fval.amount_to_borrow.disable();
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
        }
    };
    LendComponent.prototype.choosingPdts = function () {
        this.loanType = '';
        this.numberPlates = [];
        this.fval.amount_to_borrow.disable();
        this.fval.pin.disable();
    };
    LendComponent.prototype.enableAmountAndPin = function () {
        this.fval.amount_to_borrow.enable();
        this.fval.pin.enable();
    };
    LendComponent.prototype.checkLoanbility = function (value, template) {
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
    LendComponent.prototype.checkLimit = function (val) {
        if (val !== '') {
            val = parseInt(val.replace(/[\D\s\._\-]+/g, ''), 10);
            if (val > this.checkedClient.loanLimit) {
                this.errored = true;
                this.fval.amount_to_borrow.setValue('');
                this.canLend = false;
                this.alertService.danger({
                    html: '<b> Amount provided (' + val + ') is greater than the customer loan limit</b>'
                });
            }
            else {
                this.amountBorrowed = val;
            }
        }
    };
    LendComponent.prototype.revert = function () {
        this.userForm.reset();
    };
    LendComponent.prototype.refresh = function () {
        location.reload();
    };
    Object.defineProperty(LendComponent.prototype, "fval", {
        get: function () {
            return this.userForm.controls;
        },
        enumerable: false,
        configurable: true
    });
    LendComponent.prototype.openModal = function (template) {
        this.modalRef = this.modalService.show(template, Object.assign({}, { "class": 'modal-lg modal-dialog-centered' }));
    };
    // toggle visibility of password field
    LendComponent.prototype.toggleFieldType = function () {
        this.fieldType = !this.fieldType;
    };
    LendComponent.prototype.assignTxnId = function (familyName, typeName) {
        for (var _i = 0, _a = this.txns; _i < _a.length; _i++) {
            var txn = _a[_i];
            if (txn.txnDetailsFamilyName.toUpperCase() === familyName && txn.txnDetailsTypeName.toUpperCase() === typeName) {
                return txn.txnDetailsId;
            }
        }
    };
    LendComponent.prototype.lend = function () {
        var _this = this;
        if (this.userForm.valid) {
            if (Number(this.fval.pin.value) === this.checkedClient.pin) {
                var data = {
                    txnAmount: this.amountBorrowed,
                    customerId: this.checkedClient.Id,
                    txnDetailsId: null,
                    userId: this.User.userId,
                    productCode: this.loanType === 'Boda Loan' ? 200 : 300,
                    theStationLocationId: this.User.userLocationId
                };
                switch (this.loanType) {
                    case 'Boda Loan':
                        data.txnDetailsId = this.assignTxnId('BODABODALOAN', 'LOANDISBURSEMENT');
                        break;
                    case 'Taxi Loan':
                        data.txnDetailsId = this.assignTxnId('TAXILOAN', 'LOANDISBURSEMENT');
                        break;
                    case 'Micro Loan':
                        data.txnDetailsId = this.assignTxnId('MICROLOAN', 'LOANDISBURSEMENT');
                        break;
                }
                this.others.putTxnCustomer(data).subscribe(function (res) {
                    if (res) {
                        _this.posted = true;
                        _this.alertService.success({
                            html: '<b> Loan was successfully</b>'
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
    LendComponent = __decorate([
        core_1.Component({
            selector: 'app-lend',
            templateUrl: './lend.component.html',
            styleUrls: ['./lend.component.scss']
        })
    ], LendComponent);
    return LendComponent;
}());
exports.LendComponent = LendComponent;
