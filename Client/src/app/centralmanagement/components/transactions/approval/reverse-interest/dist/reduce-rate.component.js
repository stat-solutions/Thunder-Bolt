"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ReduceRateComponent = void 0;
var core_1 = require("@angular/core");
// import { BsModalService } from 'ngx-bootstrap/modal';
// import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
var ReduceRateComponent = /** @class */ (function () {
    function ReduceRateComponent(authService, others, router, spinner, alertService, fb) {
        this.authService = authService;
        this.others = others;
        this.router = router;
        this.spinner = spinner;
        this.alertService = alertService;
        this.fb = fb;
        this.posted = false;
    }
    ReduceRateComponent.prototype.ngOnInit = function () {
        this.userForm = this.createFormGroup();
        this.fval.selectAll.setValue(false);
        this.initialiseForm();
    };
    ReduceRateComponent.prototype.createFormGroup = function () {
        return this.fb.group({
            approveReduceRates: this.fb.array([this.rateApproval]),
            selectAll: this.fb.control({})
        });
    };
    Object.defineProperty(ReduceRateComponent.prototype, "rateApproval", {
        get: function () {
            return this.fb.group({
                station: this.fb.control({ value: '' }),
                client: this.fb.control({ value: '' }),
                rate: this.fb.control({ value: '' }),
                approved: this.fb.control({})
            });
        },
        enumerable: false,
        configurable: true
    });
    ReduceRateComponent.prototype.addItem = function () {
        // this.unitForm.controls.bussinessUnits  as FormArray
        this.fval.approveReduceRates.push(this.rateApproval);
    };
    ReduceRateComponent.prototype.removeItem = function (index) {
        this.fval.approveReduceRates.removeAt(index);
    };
    ReduceRateComponent.prototype.initialiseForm = function () {
        var _this = this;
        var n;
        this.others.getReversedInterestsForApproval().subscribe(function (res) {
            _this.ratesApprovals = res;
            _this.ratesApprovals.forEach(function (item, i) {
                _this.fval.approveReduceRates.controls[i].controls.station.setValue(item.station);
                _this.fval.approveReduceRates.controls[i].controls.client.setValue(item.client);
                _this.fval.approveReduceRates.controls[i].controls.rate.setValue(item.rate);
                _this.fval.approveReduceRates.controls[i].controls.approved.setValue(false);
                _this.addItem();
                n = i + 1;
            });
            _this.removeItem(n);
        });
    };
    ReduceRateComponent.prototype.checkAllItems = function (val) {
        var _this = this;
        if (val == true) {
            this.ratesApprovals.forEach(function (item, i) {
                _this.fval.approveReduceRates.controls[i].controls.approved.setValue(val);
            });
        }
        else {
            this.ratesApprovals.forEach(function (item, i) {
                _this.fval.approveReduceRates.controls[i].controls.approved.setValue(false);
            });
        }
    };
    ReduceRateComponent.prototype.deselectAll = function (val) {
        // console.log(this.fval.approveAreas["controls"][val]["controls"].approved.value)
        if (this.fval.approveReduceRates.controls[val].controls.approved
            .value === true) {
            this.fval.selectAll.setValue(false);
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
    ReduceRateComponent.prototype.disableForm = function () {
        return this.userForm.disable();
    };
    ReduceRateComponent.prototype.enableEdit = function () {
        return this.userForm.enable();
    };
    ReduceRateComponent.prototype.approveItems = function () {
        var _this = this;
        var itemsApproved = [];
        this.ratesApprovals.forEach(function (item, i) {
            if (_this.fval.approveReduceRates.controls[i].controls.approved
                .value == true) {
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
    ReduceRateComponent.prototype.rejectItems = function () {
        var _this = this;
        var itemsRejected = [];
        this.ratesApprovals.forEach(function (item, i) {
            if (_this.fval.approveReduceRates.controls[i].controls.approved
                .value == true) {
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
