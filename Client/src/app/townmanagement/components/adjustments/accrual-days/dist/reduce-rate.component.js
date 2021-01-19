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
exports.ReduceRateComponent = void 0;
var core_1 = require("@angular/core");
var jwt_decode = require("jwt-decode");
var forms_1 = require("@angular/forms");
var custom_validator_1 = require("src/app/validators/custom-validator");
var ReduceRateComponent = /** @class */ (function () {
    function ReduceRateComponent(authService, others, router, spinner, alertService, modalService) {
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
    ReduceRateComponent.prototype.ngOnInit = function () {
        this.userForm = this.createFormGroup();
        this.checkedOk = false;
    };
    ReduceRateComponent.prototype.createFormGroup = function () {
        return new forms_1.FormGroup({
            loanType: new forms_1.FormControl(['', forms_1.Validators.required]),
            number_plate: new forms_1.FormControl('', forms_1.Validators.compose([
                forms_1.Validators.required,
                forms_1.Validators.minLength(8),
                forms_1.Validators.maxLength(8),
            ])),
            user_contact_number: new forms_1.FormControl('', forms_1.Validators.compose([
                forms_1.Validators.required,
                custom_validator_1.CustomValidator.patternValidator(/^(([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9]))$/, { hasNumber: true }),
            ])),
            itemRate: new forms_1.FormControl({ value: '', disabled: true }, forms_1.Validators.compose([forms_1.Validators.required, custom_validator_1.CustomValidator.maxValue(100)])),
            pin: new forms_1.FormControl({ value: '', disabled: true }, forms_1.Validators.compose([
                forms_1.Validators.required,
                custom_validator_1.CustomValidator.patternValidator(/\d/, { hasNumber: true }),
                forms_1.Validators.maxLength(4),
                forms_1.Validators.minLength(4),
            ]))
        });
    };
    ReduceRateComponent.prototype.checkLoanType = function (value) {
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
    ReduceRateComponent.prototype.choosingPdts = function () {
        this.loanType = '';
        this.numberPlates = [];
        this.phoneNumbers = [];
        this.fval.amount_to_pay.disable();
        this.fval.pin.disable();
    };
    ReduceRateComponent.prototype.enableAmountAndPin = function () {
        this.fval.amount_to_pay.enable();
        this.fval.pin.enable();
    };
    ReduceRateComponent.prototype.checkLoanbility = function (value, template) {
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
    ReduceRateComponent.prototype.revert = function () {
        this.userForm.reset();
    };
    ReduceRateComponent.prototype.refresh = function () {
        location.reload();
    };
    Object.defineProperty(ReduceRateComponent.prototype, "fval", {
        get: function () {
            return this.userForm.controls;
        },
        enumerable: false,
        configurable: true
    });
    ReduceRateComponent.prototype.openModal = function (template) {
        this.modalRef = this.modalService.show(template, Object.assign({}, { "class": 'modal-lg modal-dialog-centered' }));
    };
    // toggle visibility of password field
    ReduceRateComponent.prototype.toggleFieldType = function () {
        this.fieldType = !this.fieldType;
    };
    ReduceRateComponent.prototype.reduceRate = function () {
        this.userForm.patchValue({
            amount_to_pay: parseInt(this.userForm.controls.amount_to_pay.value.replace(/[\D\s\._\-]+/g, ''), 10)
        });
        // tslint:disable-next-line:triple-equals
        if (!(this.secretPin == this.userForm.controls.pin.value)) {
            this.alertService.danger({
                html: '<b>Invalid PIN!</b>'
            });
            return;
        }
        else {
            if (this.userForm.controls.amount_to_pay.value > this.loanLimit) {
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
    ReduceRateComponent = __decorate([
        core_1.Component({
            selector: 'app-reduce-rate',
            templateUrl: './reduce-rate.component.html',
            styleUrls: ['./reduce-rate.component.scss']
        })
    ], ReduceRateComponent);
    return ReduceRateComponent;
}());
exports.ReduceRateComponent = ReduceRateComponent;
