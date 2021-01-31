"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.LoanAmortizeTypeComponent = void 0;
var core_1 = require("@angular/core");
var LoanAmortizeTypeComponent = /** @class */ (function () {
    function LoanAmortizeTypeComponent(authService, others, router, modalService, spinner, alertService, fb) {
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
        this.types = [
            { name: 'FLAT RATE', code: 1 },
            { name: 'REDUCING BALANCE WITH REDUCING INSTALMENT', code: 2 },
            { name: 'REDUCING BALANCE WITH CONSTANT INSTALMENT', code: 3 },
        ];
    }
    LoanAmortizeTypeComponent.prototype.ngOnInit = function () {
        this.userForm = this.createFormGroup();
        this.fval.selectAll.setValue(false);
        this.initialiseForm();
    };
    LoanAmortizeTypeComponent.prototype.createFormGroup = function () {
        return this.fb.group({
            txnApprovals: this.fb.array([this.txnApproval]),
            selectAll: this.fb.control({})
        });
    };
    Object.defineProperty(LoanAmortizeTypeComponent.prototype, "txnApproval", {
        get: function () {
            return this.fb.group({
                client: this.fb.control({ value: '' }),
                clientId: this.fb.control({ value: '' }),
                station: this.fb.control({ value: '' }),
                product: this.fb.control({ value: '' }),
                amorType: this.fb.control({ value: '' }),
                comment: this.fb.control({ value: '' }),
                otherApprovalsAllId: this.fb.control({ value: '' }),
                approved: this.fb.control({})
            });
        },
        enumerable: false,
        configurable: true
    });
    LoanAmortizeTypeComponent.prototype.addItem = function () {
        // this.unitForm.controls.bussinessUnits  as FormArray
        this.fval.txnApprovals.push(this.txnApproval);
    };
    LoanAmortizeTypeComponent.prototype.removeItem = function (index) {
        this.fval.txnApprovals.removeAt(index);
    };
    LoanAmortizeTypeComponent.prototype.initialiseForm = function () {
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
                _this.types.forEach(function (type) {
                    if (type.code === details.theLoanAmortizationType) {
                        _this.fval.txnApprovals.controls[i].controls.amorType.setValue(type.name);
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
    LoanAmortizeTypeComponent.prototype.checkAllItems = function (val) {
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
    LoanAmortizeTypeComponent.prototype.deselectAll = function (val) {
        // console.log(this.fval.approveAreas["controls"][val]["controls"].approved.value)
        if (this.fval.txnApprovals.controls[val].controls.approved.value === true) {
            this.fval.selectAll.setValue(false);
        }
    };
    // loan modal method
    LoanAmortizeTypeComponent.prototype.openModal = function (template, id) {
        this.modalRef = this.modalService.show(template, Object.assign({}, { "class": 'modal-lg modal-dialog-center' }));
        this.txnsApprovals.forEach(function (item) {
            if (item.txnApprovalDetailsMicroId === id) {
                // this is where the statememnt shall be initialised
            }
        });
    };
    LoanAmortizeTypeComponent.prototype.revert = function () {
        this.userForm.reset();
    };
    LoanAmortizeTypeComponent.prototype.refresh = function () {
        location.reload();
    };
    Object.defineProperty(LoanAmortizeTypeComponent.prototype, "fval", {
        get: function () {
            return this.userForm.controls;
        },
        enumerable: false,
        configurable: true
    });
    LoanAmortizeTypeComponent.prototype.disableForm = function () {
        return this.userForm.disable();
    };
    LoanAmortizeTypeComponent.prototype.enableEdit = function () {
        return this.userForm.enable();
    };
    LoanAmortizeTypeComponent.prototype.approveItems = function () {
        var _this = this;
        var itemsApproved = [];
        this.txnsApprovals.forEach(function (item, i) {
            if (_this.fval.txnApprovals.controls[i].controls.approved.value === true) {
                var data_1 = {
                    userId: _this.User.userId,
                    otheApprovalsAllId: _this.fval.txnApprovals.controls[i].controls.otherApprovalsAllId.value,
                    theLoanAmortizationType: null
                };
                _this.types.forEach(function (type) {
                    if (type.name === _this.fval.txnApprovals.controls[i].controls.amorType.value) {
                        data_1.theLoanAmortizationType = type.code;
                        itemsApproved.push(data_1);
                    }
                });
            }
        });
        // console.log(itemsApproved);
        if (itemsApproved.length > 0) {
            this.others.postApproveIndividualLoanAmortizationType(itemsApproved).subscribe(function (res) {
                _this.posted = true;
                _this.alertService.success({
                    html: '<b> Individual amortization types were approved Successfully </b>'
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
    LoanAmortizeTypeComponent.prototype.rejectItems = function () {
        var _this = this;
        var itemsRejected = [];
        this.txnsApprovals.forEach(function (item, i) {
            if (_this.fval.txnApprovals.controls[i].controls.approved.value === true) {
                var data_2 = {
                    userId: _this.User.userId,
                    otheApprovalsAllId: _this.fval.txnApprovals.controls[i].controls.otherApprovalsAllId.value,
                    theLoanAmortizationType: null
                };
                _this.types.forEach(function (type) {
                    if (type.name === _this.fval.txnApprovals.controls[i].controls.amorType.value) {
                        data_2.theLoanAmortizationType = type.code;
                        itemsRejected.push(data_2);
                    }
                });
            }
        });
        // console.log(itemsRejected);
        if (itemsRejected.length > 0) {
            this.others.postRejectIndividualLoanAmortizationType(itemsRejected).subscribe(function (res) {
                _this.posted = true;
                _this.alertService.success({
                    html: '<b>Individual amortization types were rejected Successfully </b>'
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
    LoanAmortizeTypeComponent = __decorate([
        core_1.Component({
            selector: 'app-loan-amortize-type',
            templateUrl: './loan-amortize-type.component.html',
            styleUrls: ['./loan-amortize-type.component.scss']
        })
    ], LoanAmortizeTypeComponent);
    return LoanAmortizeTypeComponent;
}());
exports.LoanAmortizeTypeComponent = LoanAmortizeTypeComponent;
