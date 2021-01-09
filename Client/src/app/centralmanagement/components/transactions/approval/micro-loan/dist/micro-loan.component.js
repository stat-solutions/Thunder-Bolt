"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.MicroLoanComponent = void 0;
var core_1 = require("@angular/core");
var MicroLoanComponent = /** @class */ (function () {
    function MicroLoanComponent(authService, others, router, modalService, spinner, alertService, fb) {
        this.authService = authService;
        this.others = others;
        this.router = router;
        this.modalService = modalService;
        this.spinner = spinner;
        this.alertService = alertService;
        this.fb = fb;
        this.txnsApprovals = [];
        this.posted = false;
        this.User = this.authService.loggedInUserInfo();
    }
    MicroLoanComponent.prototype.ngOnInit = function () {
        this.userForm = this.createFormGroup();
        this.fval.selectAll.setValue(false);
        this.initialiseForm();
    };
    MicroLoanComponent.prototype.createFormGroup = function () {
        return this.fb.group({
            txnApprovals: this.fb.array([this.txnApproval]),
            selectAll: this.fb.control({})
        });
    };
    Object.defineProperty(MicroLoanComponent.prototype, "txnApproval", {
        get: function () {
            return this.fb.group({
                loanId: this.fb.control({ value: '' }),
                client: this.fb.control({ value: '' }),
                amount: this.fb.control({ value: '' }),
                purpose: this.fb.control({ value: '' }),
                approved: this.fb.control({})
            });
        },
        enumerable: false,
        configurable: true
    });
    MicroLoanComponent.prototype.addItem = function () {
        // this.unitForm.controls.bussinessUnits  as FormArray
        this.fval.txnApprovals.push(this.txnApproval);
    };
    MicroLoanComponent.prototype.removeItem = function (index) {
        this.fval.txnApprovals.removeAt(index);
    };
    MicroLoanComponent.prototype.initialiseForm = function () {
        var _this = this;
        var n;
        this.others.getTxnForApproval().subscribe(function (items) {
            _this.txnsApprovals = items;
            _this.txnsApprovals.forEach(function (item, i) {
                _this.fval.txnApprovals.controls[i].controls.loanId.setValue(item.client);
                _this.fval.txnApprovals.controls[i].controls.client.setValue(item.client);
                _this.fval.txnApprovals.controls[i].controls.amount.setValue(item.rate);
                _this.fval.txnApprovals.controls[i].controls.purpose.setValue(item.rate);
                _this.fval.txnApprovals.controls[i].controls.approved.setValue(false);
                _this.addItem();
                n = i + 1;
            });
            _this.removeItem(n);
        }, function (err) {
            console.log(err.error.error.message);
        });
    };
    MicroLoanComponent.prototype.checkAllItems = function (val) {
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
    MicroLoanComponent.prototype.deselectAll = function (val) {
        // console.log(this.fval.approveAreas["controls"][val]["controls"].approved.value)
        if (this.fval.txnApprovals.controls[val].controls.approved.value === true) {
            this.fval.selectAll.setValue(false);
        }
    };
    // loan modal method
    MicroLoanComponent.prototype.openModal = function (template, id) {
        var _this = this;
        this.txnsApprovals.forEach(function (item) {
            if (item.microLoanId === id) {
                _this.checkedLoan = item;
                _this.modalRef = _this.modalService.show(template, Object.assign({}, { "class": 'white modal-lg modal-dialog-center' }));
            }
        });
    };
    MicroLoanComponent.prototype.revert = function () {
        this.userForm.reset();
    };
    MicroLoanComponent.prototype.refresh = function () {
        location.reload();
    };
    Object.defineProperty(MicroLoanComponent.prototype, "fval", {
        get: function () {
            return this.userForm.controls;
        },
        enumerable: false,
        configurable: true
    });
    MicroLoanComponent.prototype.disableForm = function () {
        return this.userForm.disable();
    };
    MicroLoanComponent.prototype.enableEdit = function () {
        return this.userForm.enable();
    };
    MicroLoanComponent.prototype.approveItems = function () {
        var _this = this;
        var itemsApproved = [];
        this.txnsApprovals.forEach(function (item, i) {
            if (_this.fval.txnApprovals.controls[i].controls.approved.value === true) {
                item.status = 2;
                itemsApproved.push(item);
            }
        });
        console.log(itemsApproved.length);
        if (itemsApproved.length > 0) {
            setTimeout(function () {
                _this.router.navigate(['centralmanagement/dashboard']);
            }, 3000);
        }
        else {
            // alert("Please select something")
            return;
        }
    };
    MicroLoanComponent.prototype.rejectItems = function () {
        var _this = this;
        var itemsRejected = [];
        this.txnsApprovals.forEach(function (item, i) {
            if (_this.fval.txnApprovals.controls[i].controls.approved.value === true) {
                item.status = 1;
                itemsRejected.push(item);
            }
        });
        console.log(itemsRejected.length);
        if (itemsRejected.length > 0) {
            setTimeout(function () {
                _this.router.navigate(['centralmanagement/dashboard']);
            }, 3000);
        }
        else {
            // alert("Please select something")
            return;
        }
    };
    MicroLoanComponent = __decorate([
        core_1.Component({
            selector: 'app-micro-loan',
            templateUrl: './micro-loan.component.html',
            styleUrls: ['./micro-loan.component.scss']
        })
    ], MicroLoanComponent);
    return MicroLoanComponent;
}());
exports.MicroLoanComponent = MicroLoanComponent;
