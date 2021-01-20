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
// import { BsModalService } from 'ngx-bootstrap/modal';
// import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
var LoanLimitComponent = /** @class */ (function () {
    function LoanLimitComponent(authService, others, router, spinner, alertService, fb) {
        this.authService = authService;
        this.others = others;
        this.router = router;
        this.spinner = spinner;
        this.alertService = alertService;
        this.fb = fb;
        this.posted = false;
    }
    LoanLimitComponent.prototype.ngOnInit = function () {
        this.userForm = this.createFormGroup();
        this.fval.selectAll.setValue(false);
        this.initialiseForm();
    };
    LoanLimitComponent.prototype.createFormGroup = function () {
        return this.fb.group({
            approveLoanLimits: this.fb.array([this.loanLimitApproval]),
            selectAll: this.fb.control({})
        });
    };
    Object.defineProperty(LoanLimitComponent.prototype, "loanLimitApproval", {
        get: function () {
            return this.fb.group({
                station: this.fb.control({ value: '' }),
                client: this.fb.control({ value: '' }),
                ammount: this.fb.control({ value: '' }),
                approved: this.fb.control({})
            });
        },
        enumerable: false,
        configurable: true
    });
    LoanLimitComponent.prototype.addItem = function () {
        // this.unitForm.controls.bussinessUnits  as FormArray
        this.fval.approveLoanLimits.push(this.loanLimitApproval);
    };
    LoanLimitComponent.prototype.removeItem = function (index) {
        this.fval.approveLoanLimits.removeAt(index);
    };
    LoanLimitComponent.prototype.initialiseForm = function () {
        var _this = this;
        var n;
        this.others.getIdividualLoanLimit().subscribe(function (res) {
            _this.loanLimitApprovals = res;
            _this.loanLimitApprovals.forEach(function (item, i) {
                // console.log(item.name);
                // console.log(i);
                _this.fval.approveLoanLimits.controls[i].controls.station.setValue(item.station);
                _this.fval.approveLoanLimits.controls[i].controls.client.setValue(item.client);
                _this.fval.approveLoanLimits.controls[i].controls.ammount.setValue(item.ammount);
                _this.fval.approveLoanLimits.controls[i].controls.approved.setValue(false);
                _this.addItem();
                n = i + 1;
            });
            _this.removeItem(n);
        });
    };
    LoanLimitComponent.prototype.checkAllItems = function (val) {
        var _this = this;
        if (val === true) {
            this.loanLimitApprovals.forEach(function (item, i) {
                _this.fval.approveLoanLimits.controls[i].controls.approved.setValue(val);
            });
        }
        else {
            this.loanLimitApprovals.forEach(function (item, i) {
                _this.fval.approveLoanLimits.controls[i].controls.approved.setValue(false);
            });
        }
    };
    LoanLimitComponent.prototype.deselectAll = function (val) {
        // console.log(this.fval.approveAreas["controls"][val]["controls"].approved.value)
        if (this.fval.approveLoanLimits.controls[val].controls.approved.value ===
            true) {
            this.fval.selectAll.setValue(false);
        }
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
        this.loanLimitApprovals.forEach(function (item, i) {
            if (_this.fval.approveLoanLimits.controls[i].controls.approved.value ===
                true) {
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
    LoanLimitComponent.prototype.rejectItems = function () {
        var _this = this;
        var itemsRejected = [];
        this.loanLimitApprovals.forEach(function (item, i) {
            if (_this.fval.approveLoanLimits.controls[i].controls.approved.value ===
                true) {
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
