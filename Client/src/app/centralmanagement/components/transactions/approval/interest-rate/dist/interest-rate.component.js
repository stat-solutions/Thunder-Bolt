"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.InterestRateComponent = void 0;
var core_1 = require("@angular/core");
var InterestRateComponent = /** @class */ (function () {
    function InterestRateComponent(authService, others, router, modalService, spinner, alertService, fb) {
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
    InterestRateComponent.prototype.ngOnInit = function () {
        this.userForm = this.createFormGroup();
        this.fval.selectAll.setValue(false);
        this.initialiseForm();
    };
    InterestRateComponent.prototype.createFormGroup = function () {
        return this.fb.group({
            txnApprovals: this.fb.array([this.txnApproval]),
            selectAll: this.fb.control({})
        });
    };
    Object.defineProperty(InterestRateComponent.prototype, "txnApproval", {
        get: function () {
            return this.fb.group({
                client: this.fb.control({ value: '' }),
                clientId: this.fb.control({ value: '' }),
                station: this.fb.control({ value: '' }),
                product: this.fb.control({ value: '' }),
                rate: this.fb.control({ value: '' }),
                comment: this.fb.control({ value: '' }),
                approved: this.fb.control({})
            });
        },
        enumerable: false,
        configurable: true
    });
    InterestRateComponent.prototype.addItem = function () {
        // this.unitForm.controls.bussinessUnits  as FormArray
        this.fval.txnApprovals.push(this.txnApproval);
    };
    InterestRateComponent.prototype.removeItem = function (index) {
        this.fval.txnApprovals.removeAt(index);
    };
    InterestRateComponent.prototype.initialiseForm = function () {
        var _this = this;
        var n;
        this.others.getIdividualLoanInterestRate().subscribe(function (items) {
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
                _this.fval.txnApprovals.controls[i].controls.rate.setValue(details.theLoanInterestRate);
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
    InterestRateComponent.prototype.checkAllItems = function (val) {
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
    InterestRateComponent.prototype.deselectAll = function (val) {
        // console.log(this.fval.approveAreas["controls"][val]["controls"].approved.value)
        if (this.fval.txnApprovals.controls[val].controls.approved.value === true) {
            this.fval.selectAll.setValue(false);
        }
    };
    // loan modal method
    InterestRateComponent.prototype.openModal = function (template, id) {
        var _this = this;
        this.modalRef = this.modalService.show(template, Object.assign({}, { "class": 'modal-lg modal-dialog-center' }));
        this.txnsApprovals.forEach(function (item) {
            if (item.txnApprovalDetailsMicroId === id) {
                var client = void 0;
                var details = JSON.parse(item.txnApprovalDetailsMicroPayLoad);
                for (var _i = 0, _a = _this.customers; _i < _a.length; _i++) {
                    var customer = _a[_i];
                    if (customer.customerId === details[0].customerId) {
                        client = customer;
                    }
                }
                _this.checkedLoan = {
                    url: client.customerPhotoUrl,
                    name: client.customerName,
                    phone: client.customerPhone1,
                    data: details
                };
                if (_this.checkedLoan.data[1][1].length > 0) {
                    for (var _b = 0, _c = _this.checkedLoan.data[1][1]; _b < _c.length; _b++) {
                        var itm = _c[_b];
                        for (var _d = 0, _e = _this.securityTypes; _d < _e.length; _d++) {
                            var security = _e[_d];
                            if (security.securityTypeCode === itm.securityTypeCode) {
                                itm.securityTypeName = security.securityTypeName;
                            }
                        }
                    }
                }
            }
        });
    };
    InterestRateComponent.prototype.revert = function () {
        this.userForm.reset();
    };
    InterestRateComponent.prototype.refresh = function () {
        location.reload();
    };
    Object.defineProperty(InterestRateComponent.prototype, "fval", {
        get: function () {
            return this.userForm.controls;
        },
        enumerable: false,
        configurable: true
    });
    InterestRateComponent.prototype.disableForm = function () {
        return this.userForm.disable();
    };
    InterestRateComponent.prototype.enableEdit = function () {
        return this.userForm.enable();
    };
    InterestRateComponent.prototype.approveItems = function () {
        var _this = this;
        var itemsApproved = [];
        this.txnsApprovals.forEach(function (item, i) {
            if (_this.fval.txnApprovals.controls[i].controls.approved.value === true) {
                itemsApproved.push({
                    txnApprovalDetailsMircroId: _this.fval.txnApprovals.controls[i].controls.loanId.value,
                    userId: _this.User.userId
                });
            }
        });
        if (itemsApproved.length > 0) {
            this.others.approveMicroTransaction(itemsApproved).subscribe(function (res) {
                _this.posted = true;
                _this.alertService.success({
                    html: '<b> Micro Loan Approved Was Successfully </b>'
                });
                setTimeout(function () {
                    itemsApproved = [];
                    _this.userForm = _this.createFormGroup();
                    _this.fval.selectAll.setValue(false);
                    _this.initialiseForm();
                }, 3000);
            }, function (err) {
                _this.errored = true;
                _this.alertService.danger({
                    html: '<b>' + err.error.error.message + '</b>'
                });
            });
        }
        else {
            this.errored = true;
            this.alertService.danger({
                html: '<b> Please select a loan first </b>'
            });
            return;
        }
    };
    InterestRateComponent.prototype.rejectItems = function () {
        var _this = this;
        var itemsRejected = [];
        this.txnsApprovals.forEach(function (item, i) {
            if (_this.fval.txnApprovals.controls[i].controls.approved.value === true) {
                item.status = 1;
                itemsRejected.push({
                    txnApprovalDetailsMircroId: _this.fval.txnApprovals.controls[i].controls.loanId.value,
                    userId: _this.User.userId
                });
            }
        });
        if (itemsRejected.length > 0) {
            this.others.rejectMicroTransaction(itemsRejected).subscribe(function (res) {
                _this.posted = true;
                _this.alertService.success({
                    html: '<b> Micro Loan Rejection Was Successfully </b>'
                });
                setTimeout(function () {
                    itemsRejected = [];
                    _this.userForm = _this.createFormGroup();
                    _this.fval.selectAll.setValue(false);
                    _this.initialiseForm();
                }, 3000);
            }, function (err) {
                _this.errored = true;
                _this.alertService.danger({
                    html: '<b>' + err.error.error.message + '</b>'
                });
            });
        }
        else {
            this.errored = true;
            this.alertService.danger({
                html: '<b> Please select a loan first </b>'
            });
            return;
        }
    };
    InterestRateComponent = __decorate([
        core_1.Component({
            selector: 'app-interest-rate',
            templateUrl: './interest-rate.component.html',
            styleUrls: ['./interest-rate.component.scss']
        })
    ], InterestRateComponent);
    return InterestRateComponent;
}());
exports.InterestRateComponent = InterestRateComponent;
