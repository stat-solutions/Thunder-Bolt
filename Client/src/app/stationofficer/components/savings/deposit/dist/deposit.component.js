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
exports.DepositComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var custom_validator_1 = require("src/app/validators/custom-validator");
var DepositComponent = /** @class */ (function () {
    function DepositComponent(authService, others, router, spinner, alertService, modalService) {
        this.authService = authService;
        this.others = others;
        this.router = router;
        this.spinner = spinner;
        this.alertService = alertService;
        this.modalService = modalService;
        this.posted = false;
        this.canLend = false;
        this.user = '/../../../assets/img/man.svg';
        this.phoneNumbers = [];
        this.User = this.authService.loggedInUserInfo();
    }
    DepositComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.userForm = this.createFormGroup();
        this.checkedOk = false;
        this.others.getSavingsCustomers().subscribe(function (res) {
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
                    html: '<b>There are no Savings customers registered</b>'
                });
            }
        }, function (err) {
            _this.errored = true;
            console.log(err);
            _this.alertService.danger({
                html: '<b>' + err.error.error.mesage + '</b>'
            });
        });
        this.others.getTxnDetails().subscribe(function (res) {
            _this.txns = res;
            // console.log(res);
        }, function (err) {
            console.log(err.error.statusText);
        });
    };
    DepositComponent.prototype.createFormGroup = function () {
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
    DepositComponent.prototype.checkLoanbility = function (value, template) {
        if (value !== '') {
            var savingsCustomers = __spreadArrays(this.customers);
            savingsCustomers = savingsCustomers.filter(function (customer) { return customer.customerPhone1 === value; });
            this.checkedClient = savingsCustomers[0];
            this.openModal(template);
        }
    };
    DepositComponent.prototype.revert = function () {
        this.userForm.reset();
    };
    DepositComponent.prototype.refresh = function () {
        location.reload();
    };
    DepositComponent.prototype.assignTxnId = function (familyName, typeName) {
        for (var _i = 0, _a = this.txns; _i < _a.length; _i++) {
            var txn = _a[_i];
            if (txn.txnDetailsFamilyName.toUpperCase() === familyName && txn.txnDetailsTypeName.toUpperCase() === typeName) {
                return txn.txnDetailsId;
            }
        }
    };
    Object.defineProperty(DepositComponent.prototype, "fval", {
        get: function () {
            return this.userForm.controls;
        },
        enumerable: false,
        configurable: true
    });
    DepositComponent.prototype.openModal = function (template) {
        this.modalRef = this.modalService.show(template, Object.assign({}, { "class": 'modal-lg modal-dialog-centered' }));
    };
    // toggle visibility of password field
    DepositComponent.prototype.toggleFieldType = function () {
        this.fieldType = !this.fieldType;
    };
    DepositComponent.prototype.deposit = function () {
        var _this = this;
        if (this.userForm.valid) {
            this.others.verifyUserWithPin({ userPhone1: this.User.userPhone, userPassword: Number(this.fval.pin.value) }).subscribe(function (response) {
                if (response) {
                    var data = {
                        txnAmount: parseInt(_this.fval.amount_to_pay.value.replace(/[\D\s\._\-]+/g, ''), 10),
                        customerId: _this.checkedClient.customerId,
                        txnDetailsId: _this.assignTxnId('INDIVIDUALSAVING ', 'SAVINGDEPOSIT '),
                        userId: _this.User.userId,
                        productCode: 100,
                        theStationLocationId: _this.User.userLocationId
                    };
                    _this.others.putTxnCustomer(data).subscribe(function (res) {
                        if (res) {
                            _this.posted = true;
                            _this.alertService.success({
                                html: '<b> Deposit was successfully</b>'
                            });
                            setTimeout(function () {
                                _this.userForm = _this.createFormGroup();
                            }, 3000);
                        }
                        else {
                            _this.errored = true;
                            _this.alertService.danger({
                                html: '<b> Deposit was not successful</b>'
                            });
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
                        html: '<b> Passwords do not match<b>'
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
    DepositComponent = __decorate([
        core_1.Component({
            selector: 'app-deposit',
            templateUrl: './deposit.component.html',
            styleUrls: ['./deposit.component.scss']
        })
    ], DepositComponent);
    return DepositComponent;
}());
exports.DepositComponent = DepositComponent;
