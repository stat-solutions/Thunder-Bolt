"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.LoanLimitComponent = void 0;
var core_1 = require("@angular/core");
var LoanLimitComponent = /** @class */ (function () {
    function LoanLimitComponent(authService, others, router, modalService, spinner, alertService, fb) {
        this.authService = authService;
        this.others = others;
        this.router = router;
        this.modalService = modalService;
        this.spinner = spinner;
        this.alertService = alertService;
        this.fb = fb;
        this.txnsApprovals = [];
        this.posted = false;
        this.loaded = false;
        this.errored = false;
        this.User = this.authService.loggedInUserInfo();
    }
    LoanLimitComponent.prototype.ngOnInit = function () {
        this.userForm = this.createFormGroup();
        this.fval.selectAll.setValue(false);
        this.initialiseForm();
    };
    LoanLimitComponent.prototype.createFormGroup = function () {
        return this.fb.group({
            txnApprovals: this.fb.array([this.txnApproval]),
            selectAll: this.fb.control({})
        });
    };
    Object.defineProperty(LoanLimitComponent.prototype, "txnApproval", {
        get: function () {
            return this.fb.group({
                client: this.fb.control({ value: '' }),
                clientId: this.fb.control({ value: '' }),
                station: this.fb.control({ value: '' }),
                product: this.fb.control({ value: '' }),
                limit: this.fb.control({ value: '' }),
                comment: this.fb.control({ value: '' }),
                approvalLoanLimitId: this.fb.control({ value: '' }),
                approved: this.fb.control({})
            });
        },
        enumerable: false,
        configurable: true
    });
    LoanLimitComponent.prototype.addItem = function () {
        // this.unitForm.controls.bussinessUnits  as FormArray
        this.fval.txnApprovals.push(this.txnApproval);
    };
    LoanLimitComponent.prototype.removeItem = function (index) {
        this.fval.txnApprovals.removeAt(index);
    };
    LoanLimitComponent.prototype.initialiseForm = function () {
        var _this = this;
        var n;
        this.others.getIdividualLoanLimit().subscribe(function (items) {
            _this.txnsApprovals = items;
            _this.txnsApprovals.forEach(function (item, i) {
                var details = JSON.parse(item.approvalLoanLimitPayLoad);
                _this.fval.txnApprovals.controls[i].controls.clientId.setValue(details.customerId);
                _this.fval.txnApprovals.controls[i].controls.comment.setValue(details.comment);
                var pdt = details.productCode === 200 ? 'BODA BODA FUEL LOAN' :
                    details.productCode === 300 ? 'TAXI FUEL LOAN' : 'MICRO LOAN';
                _this.fval.txnApprovals.controls[i].controls.product.setValue(pdt);
                _this.fval.txnApprovals.controls[i].controls.client.setValue(item.customerName);
                _this.fval.txnApprovals.controls[i].controls.station.setValue(item.stationName);
                _this.fval.txnApprovals.controls[i].controls.approvalLoanLimitId.setValue(item.approvalLoanLimitId);
                _this.fval.txnApprovals.controls[i].controls.limit.setValue(details.theLoanLimit);
                _this.fval.txnApprovals.controls[i].controls.approved.setValue(false);
                _this.addItem();
                n = i + 1;
            });
            _this.removeItem(n);
            _this.loaded = true;
        }, function (err) {
            _this.loaded = false;
            console.log(err.error.error.message);
        });
    };
    LoanLimitComponent.prototype.checkAllItems = function (val) {
        var _this = this;
        if (val === true) {
            this.txnsApprovals.forEach(function (item, i) {
                _this.fval.txnApprovals.controls[i].controls.approved.setValue(val);
            });
        }
        else {
            this.txnsApprovals.forEach(function (item, i) {
                _this.fval.txnApprovals.controls[i].controls.approved.setValue(false);
            });
        }
    };
    LoanLimitComponent.prototype.deselectAll = function (val) {
        // console.log(this.fval.approveAreas["controls"][val]["controls"].approved.value)
        if (this.fval.txnApprovals.controls[val].controls.approved.value === true) {
            this.fval.selectAll.setValue(false);
        }
    };
    // loan modal method
    LoanLimitComponent.prototype.openModal = function (template, id) {
        var _this = this;
        this.txnsApprovals.forEach(function (item) {
            var details = JSON.parse(item.approvalLoanLimitPayLoad);
            if (details.customerId === id) {
                _this.checkedClient = item;
                if (details.productCode === 400) {
                    _this.others.microCustomerStatement(id).subscribe(function (res) {
                        _this.statement = res;
                        if (_this.statement.length === 0) {
                            _this.posted = true;
                            _this.alertService.success({
                                html: '<b>Customer has no previous transactions</b>'
                            });
                        }
                        else {
                            _this.modalRef = _this.modalService.show(template, Object.assign({}, { "class": 'modal-lg modal-dialog-center' }));
                        }
                    }, function (err) {
                        _this.errored = true;
                        _this.alertService.danger({
                            html: '<b>There was a problem getting customer statement</b>'
                        });
                    });
                }
                else {
                    _this.others.bodaAndTaxiCustomerStatement({
                        customerId: id,
                        productCode: details.productCode
                    }).subscribe(function (res) {
                        _this.statement = res;
                        if (_this.statement.length === 0) {
                            _this.posted = true;
                            _this.alertService.success({
                                html: '<b>Customer has no previous transactions</b>'
                            });
                        }
                        else {
                            _this.modalRef = _this.modalService.show(template, Object.assign({}, { "class": 'modal-lg modal-dialog-center' }));
                        }
                    }, function (err) {
                        _this.errored = true;
                        _this.alertService.danger({
                            html: '<b>There was a problem getting customer statement</b>'
                        });
                    });
                }
            }
        });
    };
    LoanLimitComponent.prototype.revert = function () {
        this.userForm.reset();
    };
    LoanLimitComponent.prototype.refresh = function () {
        location.reload();
    };
    Object.defineProperty(LoanLimitComponent.prototype, "fval", {
        get: function () {
            return this.userForm.controls;
        },
        enumerable: false,
        configurable: true
    });
    LoanLimitComponent.prototype.disableForm = function () {
        return this.userForm.disable();
    };
    LoanLimitComponent.prototype.enableEdit = function () {
        return this.userForm.enable();
    };
    LoanLimitComponent.prototype.approveItems = function () {
        var _this = this;
        var itemsApproved = [];
        this.spinner.show();
        this.txnsApprovals.forEach(function (item, i) {
            if (_this.fval.txnApprovals.controls[i].controls.approved.value === true) {
                itemsApproved.push({
                    userId: _this.User.userId,
                    approvalLoanLimitId: _this.fval.txnApprovals.controls[i].controls.approvalLoanLimitId.value,
                    theLoanLimit: _this.fval.txnApprovals.controls[i].controls.limit.value
                });
            }
        });
        // console.log(itemsApproved);
        if (itemsApproved.length > 0) {
            this.others.approveIdividualLoanLimit(itemsApproved).subscribe(function (res) {
                _this.posted = true;
                _this.alertService.success({
                    html: '<b> Individual Loan Limits were approved Successfully </b>'
                });
                itemsApproved = [];
                _this.userForm = _this.createFormGroup();
                _this.fval.selectAll.setValue(false);
                _this.initialiseForm();
                _this.spinner.hide();
            }, function (err) {
                _this.errored = true;
                _this.spinner.hide();
                _this.alertService.danger({
                    html: '<b>' + err.error.error.message + '</b>'
                });
            });
        }
        else {
            this.errored = true;
            this.spinner.hide();
            this.alertService.danger({
                html: '<b> Please select a something first</b>'
            });
            return;
        }
    };
    LoanLimitComponent.prototype.rejectItems = function () {
        var _this = this;
        var itemsRejected = [];
        this.spinner.show();
        this.txnsApprovals.forEach(function (item, i) {
            if (_this.fval.txnApprovals.controls[i].controls.approved.value === true) {
                item.status = 1;
                itemsRejected.push({
                    userId: _this.User.userId,
                    approvalLoanLimitId: _this.fval.txnApprovals.controls[i].controls.approvalLoanLimitId.value,
                    theLoanLimit: _this.fval.txnApprovals.controls[i].controls.limit.value
                });
            }
        });
        // console.log(itemsRejected);
        if (itemsRejected.length > 0) {
            this.others.rejectIdividualLoanLimit(itemsRejected).subscribe(function (res) {
                _this.posted = true;
                _this.alertService.success({
                    html: '<b> Individual Loan Limits were rejected Successfully </b>'
                });
                itemsRejected = [];
                _this.userForm = _this.createFormGroup();
                _this.fval.selectAll.setValue(false);
                _this.initialiseForm();
                _this.spinner.hide();
            }, function (err) {
                _this.errored = true;
                _this.spinner.hide();
                _this.alertService.danger({
                    html: '<b>' + err.error.error.message + '</b>'
                });
            });
        }
        else {
            this.errored = true;
            this.spinner.hide();
            this.alertService.danger({
                html: '<b> Please select a something first </b>'
            });
            return;
        }
    };
    LoanLimitComponent = __decorate([
        core_1.Component({
            selector: 'app-loan-limit',
            templateUrl: './loan-limit.component.html',
            styleUrls: ['./loan-limit.component.scss']
        })
    ], LoanLimitComponent);
    return LoanLimitComponent;
}());
exports.LoanLimitComponent = LoanLimitComponent;
