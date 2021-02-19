"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.WithdrawSavingsComponent = void 0;
var core_1 = require("@angular/core");
var WithdrawSavingsComponent = /** @class */ (function () {
    function WithdrawSavingsComponent(authService, others, router, modalService, spinner, alertService, fb) {
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
    WithdrawSavingsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.others.getSavingsCustomers().subscribe(function (res) {
            if (res.length > 0) {
                _this.customers = res;
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
                html: '<b>' + err.error.error.message + '</b>'
            });
        });
        this.userForm = this.createFormGroup();
        this.fval.selectAll.setValue(false);
        this.initialiseForm();
    };
    WithdrawSavingsComponent.prototype.createFormGroup = function () {
        return this.fb.group({
            txnApprovals: this.fb.array([this.txnApproval]),
            selectAll: this.fb.control({})
        });
    };
    Object.defineProperty(WithdrawSavingsComponent.prototype, "txnApproval", {
        get: function () {
            return this.fb.group({
                txnApprovalDetailsId: this.fb.control({ value: '' }),
                comment: this.fb.control({ value: '' }),
                client: this.fb.control({ value: '' }),
                clientId: this.fb.control({ value: '' }),
                amount: this.fb.control({ value: '' }),
                product: this.fb.control({ value: '' }),
                station: this.fb.control({ value: '' }),
                approved: this.fb.control({})
            });
        },
        enumerable: false,
        configurable: true
    });
    WithdrawSavingsComponent.prototype.addItem = function () {
        // this.unitForm.controls.bussinessUnits  as FormArray
        this.fval.txnApprovals.push(this.txnApproval);
    };
    WithdrawSavingsComponent.prototype.removeItem = function (index) {
        this.fval.txnApprovals.removeAt(index);
    };
    WithdrawSavingsComponent.prototype.initialiseForm = function () {
        var _this = this;
        var n;
        this.others.getTxnsForApproval().subscribe(function (items) {
            _this.txnsApprovals = items;
            _this.txnsApprovals.forEach(function (item, i) {
                var details = JSON.parse(item.txnApprovalDetailsPayLoad);
                _this.fval.txnApprovals.controls[i].controls.txnApprovalDetailsId.setValue(item.txnApprovalDetailsId);
                _this.fval.txnApprovals.controls[i].controls.clientId.setValue(details.customerId);
                _this.customers.forEach(function (customer) {
                    if (customer.customerId === details.customerId) {
                        _this.fval.txnApprovals.controls[i].controls.client.setValue(customer.customerName);
                    }
                });
                _this.fval.txnApprovals.controls[i].controls.product.setValue(item.txnDetailsCat + 'S');
                _this.fval.txnApprovals.controls[i].controls.station.setValue(item.stationName);
                _this.fval.txnApprovals.controls[i].controls.amount.setValue(details.txnAmount);
                _this.fval.txnApprovals.controls[i].controls.comment.setValue('Please approve this listed transaction');
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
    WithdrawSavingsComponent.prototype.checkAllItems = function (val) {
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
    WithdrawSavingsComponent.prototype.deselectAll = function (val) {
        // console.log(this.fval.approveAreas["controls"][val]["controls"].approved.value)
        if (this.fval.txnApprovals.controls[val].controls.approved.value === true) {
            this.fval.selectAll.setValue(false);
        }
    };
    WithdrawSavingsComponent.prototype.revert = function () {
        this.userForm.reset();
    };
    WithdrawSavingsComponent.prototype.refresh = function () {
        location.reload();
    };
    Object.defineProperty(WithdrawSavingsComponent.prototype, "fval", {
        get: function () {
            return this.userForm.controls;
        },
        enumerable: false,
        configurable: true
    });
    WithdrawSavingsComponent.prototype.disableForm = function () {
        return this.userForm.disable();
    };
    WithdrawSavingsComponent.prototype.enableEdit = function () {
        return this.userForm.enable();
    };
    WithdrawSavingsComponent.prototype.approveItems = function () {
        var _this = this;
        var itemsApproved = [];
        this.spinner.show();
        this.txnsApprovals.forEach(function (item, i) {
            if (_this.fval.txnApprovals.controls[i].controls.approved.value === true) {
                itemsApproved.push({
                    txnApprovalDetailsId: _this.fval.txnApprovals.controls[i].controls.txnApprovalDetailsId.value,
                    userId: _this.User.userId
                });
            }
        });
        if (itemsApproved.length > 0) {
            this.others.postApproveTxns(itemsApproved).subscribe(function (res) {
                _this.posted = true;
                _this.alertService.success({
                    html: '<b> Savings Withdraw was Approved Successfully </b>'
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
                html: '<b> Please select something first </b>'
            });
            return;
        }
    };
    WithdrawSavingsComponent.prototype.rejectItems = function () {
        var _this = this;
        var itemsRejected = [];
        this.spinner.show();
        this.txnsApprovals.forEach(function (item, i) {
            if (_this.fval.txnApprovals.controls[i].controls.approved.value === true) {
                item.status = 1;
                itemsRejected.push({
                    txnApprovalDetailsId: _this.fval.txnApprovals.controls[i].controls.txnApprovalDetailsId.value,
                    userId: _this.User.userId
                });
            }
        });
        if (itemsRejected.length > 0) {
            this.others.postRejectTxns(itemsRejected).subscribe(function (res) {
                _this.posted = true;
                _this.alertService.success({
                    html: '<b> Savings Withraws Were rejected Successfully </b>'
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
                html: '<b> Please select a loan first </b>'
            });
            return;
        }
    };
    WithdrawSavingsComponent = __decorate([
        core_1.Component({
            selector: 'app-withdraw-savings',
            templateUrl: './withdraw-savings.component.html',
            styleUrls: ['./withdraw-savings.component.scss']
        })
    ], WithdrawSavingsComponent);
    return WithdrawSavingsComponent;
}());
exports.WithdrawSavingsComponent = WithdrawSavingsComponent;
