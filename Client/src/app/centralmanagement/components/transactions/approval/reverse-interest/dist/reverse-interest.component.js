"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ReverseInterestComponent = void 0;
var core_1 = require("@angular/core");
var ReverseInterestComponent = /** @class */ (function () {
    function ReverseInterestComponent(authService, others, router, modalService, spinner, alertService, fb) {
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
    ReverseInterestComponent.prototype.ngOnInit = function () {
        this.userForm = this.createFormGroup();
        this.fval.selectAll.setValue(false);
        this.initialiseForm();
    };
    ReverseInterestComponent.prototype.createFormGroup = function () {
        return this.fb.group({
            txnApprovals: this.fb.array([this.txnApproval]),
            selectAll: this.fb.control({})
        });
    };
    Object.defineProperty(ReverseInterestComponent.prototype, "txnApproval", {
        get: function () {
            return this.fb.group({
                client: this.fb.control({ value: '' }),
                clientId: this.fb.control({ value: '' }),
                station: this.fb.control({ value: '' }),
                product: this.fb.control({ value: '' }),
                amount: this.fb.control({ value: '' }),
                comment: this.fb.control({ value: '' }),
                otherApprovalsAllId: this.fb.control({ value: '' }),
                approved: this.fb.control({})
            });
        },
        enumerable: false,
        configurable: true
    });
    ReverseInterestComponent.prototype.addItem = function () {
        // this.unitForm.controls.bussinessUnits  as FormArray
        this.fval.txnApprovals.push(this.txnApproval);
    };
    ReverseInterestComponent.prototype.removeItem = function (index) {
        this.fval.txnApprovals.removeAt(index);
    };
    ReverseInterestComponent.prototype.initialiseForm = function () {
        var _this = this;
        var n;
        this.others.getReversedInterestsForApproval().subscribe(function (items) {
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
                _this.fval.txnApprovals.controls[i].controls.amount.setValue(details.theInterestToBeReversed);
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
    ReverseInterestComponent.prototype.checkAllItems = function (val) {
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
    ReverseInterestComponent.prototype.deselectAll = function (val) {
        // console.log(this.fval.approveAreas["controls"][val]["controls"].approved.value)
        if (this.fval.txnApprovals.controls[val].controls.approved.value === true) {
            this.fval.selectAll.setValue(false);
        }
    };
    // loan modal method
    ReverseInterestComponent.prototype.openModal = function (template, id) {
        var _this = this;
        this.txnsApprovals.forEach(function (item) {
            var details = JSON.parse(item.otheApprovalsAllPayLoad);
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
    ReverseInterestComponent.prototype.revert = function () {
        this.userForm.reset();
    };
    ReverseInterestComponent.prototype.refresh = function () {
        location.reload();
    };
    Object.defineProperty(ReverseInterestComponent.prototype, "fval", {
        get: function () {
            return this.userForm.controls;
        },
        enumerable: false,
        configurable: true
    });
    ReverseInterestComponent.prototype.disableForm = function () {
        return this.userForm.disable();
    };
    ReverseInterestComponent.prototype.enableEdit = function () {
        return this.userForm.enable();
    };
    ReverseInterestComponent.prototype.approveItems = function () {
        var _this = this;
        var itemsApproved = [];
        this.txnsApprovals.forEach(function (item, i) {
            if (_this.fval.txnApprovals.controls[i].controls.approved.value === true) {
                itemsApproved.push({
                    userId: _this.User.userId,
                    otheApprovalsAllId: _this.fval.txnApprovals.controls[i].controls.otherApprovalsAllId.value,
                    theInterestToBeReversed: _this.fval.txnApprovals.controls[i].controls.amount.value
                });
            }
        });
        // console.log(itemsApproved);
        if (itemsApproved.length > 0) {
            this.others.postApproveReverseInterest(itemsApproved).subscribe(function (res) {
                _this.posted = true;
                _this.alertService.success({
                    html: '<b> Individual Reverse Interests were approved Successfully </b>'
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
    ReverseInterestComponent.prototype.rejectItems = function () {
        var _this = this;
        var itemsRejected = [];
        this.txnsApprovals.forEach(function (item, i) {
            if (_this.fval.txnApprovals.controls[i].controls.approved.value === true) {
                item.status = 1;
                itemsRejected.push({
                    userId: _this.User.userId,
                    otheApprovalsAllId: _this.fval.txnApprovals.controls[i].controls.otherApprovalsAllId.value,
                    theInterestToBeReversed: _this.fval.txnApprovals.controls[i].controls.amount.value
                });
            }
        });
        // console.log(itemsRejected);
        if (itemsRejected.length > 0) {
            this.others.postRejectReverseInterest(itemsRejected).subscribe(function (res) {
                _this.posted = true;
                _this.alertService.success({
                    html: '<b>Individual Reverse Interests were rjected Successfully </b>'
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
    ReverseInterestComponent = __decorate([
        core_1.Component({
            selector: 'app-reverse-interest',
            templateUrl: './reverse-interest.component.html',
            styleUrls: ['./reverse-interest.component.scss']
        })
    ], ReverseInterestComponent);
    return ReverseInterestComponent;
}());
exports.ReverseInterestComponent = ReverseInterestComponent;
