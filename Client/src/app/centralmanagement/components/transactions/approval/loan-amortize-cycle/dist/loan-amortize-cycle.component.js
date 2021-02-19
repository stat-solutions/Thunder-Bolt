"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.LoanAmortizeCycleComponent = void 0;
var core_1 = require("@angular/core");
var LoanAmortizeCycleComponent = /** @class */ (function () {
    function LoanAmortizeCycleComponent(authService, others, router, modalService, spinner, alertService, fb) {
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
        this.cycles = [
            { name: 'DAILY', code: 1 }, { name: 'WEEKLY', code: 2 },
            { name: 'FORTNIGHTLY', code: 3 }, { name: 'MONTHLY', code: 4 },
            { name: 'QUATERLY', code: 5 }, { name: 'HALF YEARLY', code: 6 },
            { name: 'ANNUALLY', code: 7 }, { name: 'BIANNIALY', code: 8 },
        ];
    }
    LoanAmortizeCycleComponent.prototype.ngOnInit = function () {
        this.userForm = this.createFormGroup();
        this.fval.selectAll.setValue(false);
        this.initialiseForm();
    };
    LoanAmortizeCycleComponent.prototype.createFormGroup = function () {
        return this.fb.group({
            txnApprovals: this.fb.array([this.txnApproval]),
            selectAll: this.fb.control({})
        });
    };
    Object.defineProperty(LoanAmortizeCycleComponent.prototype, "txnApproval", {
        get: function () {
            return this.fb.group({
                client: this.fb.control({ value: '' }),
                clientId: this.fb.control({ value: '' }),
                station: this.fb.control({ value: '' }),
                product: this.fb.control({ value: '' }),
                amorCycle: this.fb.control({ value: '' }),
                comment: this.fb.control({ value: '' }),
                otherApprovalsAllId: this.fb.control({ value: '' }),
                approved: this.fb.control({})
            });
        },
        enumerable: false,
        configurable: true
    });
    LoanAmortizeCycleComponent.prototype.addItem = function () {
        // this.unitForm.controls.bussinessUnits  as FormArray
        this.fval.txnApprovals.push(this.txnApproval);
    };
    LoanAmortizeCycleComponent.prototype.removeItem = function (index) {
        this.fval.txnApprovals.removeAt(index);
    };
    LoanAmortizeCycleComponent.prototype.initialiseForm = function () {
        var _this = this;
        var n;
        this.others.getIndividualLoanAmortizationTypeForApproval().subscribe(function (items) {
            _this.txnsApprovals = items;
            _this.txnsApprovals.forEach(function (item, i) {
                var details = JSON.parse(item.otheApprovalsAllPayLoad);
                _this.fval.txnApprovals.controls[i].controls.clientId.setValue(details.customerId);
                _this.fval.txnApprovals.controls[i].controls.comment.setValue(details.comment);
                var pdt = details.productCode === 200 ? 'BODA BODA FUEL LOAN' :
                    details.productCode === 300 ? 'TAXI FUEL LOAN' : 'MICRO LOAN';
                _this.fval.txnApprovals.controls[i].controls.product.setValue(pdt);
                _this.fval.txnApprovals.controls[i].controls.client.setValue(item.customerName);
                _this.fval.txnApprovals.controls[i].controls.station.setValue(item.stationName);
                _this.fval.txnApprovals.controls[i].controls.otherApprovalsAllId.setValue(item.otheApprovalsAllId);
                _this.cycles.forEach(function (cycle) {
                    if (cycle.code === details.theLoanAmortizationType) {
                        _this.fval.txnApprovals.controls[i].controls.amorCycle.setValue(cycle.name);
                    }
                });
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
    LoanAmortizeCycleComponent.prototype.checkAllItems = function (val) {
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
    LoanAmortizeCycleComponent.prototype.deselectAll = function (val) {
        // console.log(this.fval.approveAreas["controls"][val]["controls"].approved.value)
        if (this.fval.txnApprovals.controls[val].controls.approved.value === true) {
            this.fval.selectAll.setValue(false);
        }
    };
    // loan modal method
    LoanAmortizeCycleComponent.prototype.openModal = function (template, id) {
        var _this = this;
        this.txnsApprovals.forEach(function (item) {
            var details = JSON.parse(item.otheApprovalsAllPayLoad);
            if (details.customerId === id) {
                _this.checkedClient = item;
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
        });
    };
    LoanAmortizeCycleComponent.prototype.revert = function () {
        this.userForm.reset();
    };
    LoanAmortizeCycleComponent.prototype.refresh = function () {
        location.reload();
    };
    Object.defineProperty(LoanAmortizeCycleComponent.prototype, "fval", {
        get: function () {
            return this.userForm.controls;
        },
        enumerable: false,
        configurable: true
    });
    LoanAmortizeCycleComponent.prototype.disableForm = function () {
        return this.userForm.disable();
    };
    LoanAmortizeCycleComponent.prototype.enableEdit = function () {
        return this.userForm.enable();
    };
    LoanAmortizeCycleComponent.prototype.approveItems = function () {
        var _this = this;
        var itemsApproved = [];
        this.spinner.show();
        this.txnsApprovals.forEach(function (item, i) {
            if (_this.fval.txnApprovals.controls[i].controls.approved.value === true) {
                var data_1 = {
                    userId: _this.User.userId,
                    otheApprovalsAllId: _this.fval.txnApprovals.controls[i].controls.otherApprovalsAllId.value,
                    theLoanAmortizationCycle: null
                };
                _this.cycles.forEach(function (cycle) {
                    if (cycle.name === _this.fval.txnApprovals.controls[i].controls.amorCycle.value) {
                        data_1.theLoanAmortizationCycle = cycle.code;
                        itemsApproved.push(data_1);
                    }
                });
            }
        });
        // console.log(itemsApproved);
        if (itemsApproved.length > 0) {
            this.others.postApproveIndividualLoanAmortizationCycle(itemsApproved).subscribe(function (res) {
                _this.posted = true;
                _this.alertService.success({
                    html: '<b> Individual amortization cycles were approved Successfully </b>'
                });
                _this.userForm = _this.createFormGroup();
                itemsApproved = [];
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
    LoanAmortizeCycleComponent.prototype.rejectItems = function () {
        var _this = this;
        var itemsRejected = [];
        this.spinner.show();
        this.txnsApprovals.forEach(function (item, i) {
            if (_this.fval.txnApprovals.controls[i].controls.approved.value === true) {
                var data_2 = {
                    userId: _this.User.userId,
                    otheApprovalsAllId: _this.fval.txnApprovals.controls[i].controls.otherApprovalsAllId.value,
                    theLoanAmortizationCycle: null
                };
                _this.cycles.forEach(function (cycle) {
                    if (cycle.name === _this.fval.txnApprovals.controls[i].controls.amorCycle.value) {
                        data_2.theLoanAmortizationCycle = cycle.code;
                        itemsRejected.push(data_2);
                    }
                });
            }
        });
        // console.log(itemsRejected);
        if (itemsRejected.length > 0) {
            this.others.postRejectIndividualLoanAmortizationCycle(itemsRejected).subscribe(function (res) {
                _this.posted = true;
                _this.alertService.success({
                    html: '<b> Individual armotization cycles were rejected Successfully </b>'
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
    LoanAmortizeCycleComponent = __decorate([
        core_1.Component({
            selector: 'app-loan-amortize-cycle',
            templateUrl: './loan-amortize-cycle.component.html',
            styleUrls: ['./loan-amortize-cycle.component.scss']
        })
    ], LoanAmortizeCycleComponent);
    return LoanAmortizeCycleComponent;
}());
exports.LoanAmortizeCycleComponent = LoanAmortizeCycleComponent;
