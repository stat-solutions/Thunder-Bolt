"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.FloatApprovalComponent = void 0;
var core_1 = require("@angular/core");
var FloatApprovalComponent = /** @class */ (function () {
    function FloatApprovalComponent(authService, router, spinner, alertService, fb) {
        this.authService = authService;
        this.router = router;
        this.spinner = spinner;
        this.alertService = alertService;
        this.fb = fb;
        this.floatApprovals = [
            { station: 'ndeeba', type: 'withdraw', ammount: 405000, status: 0 },
            { station: 'kibuye', type: 'deposit', ammount: 4000000, status: 0 },
            { station: 'matugga', type: 'deposit', ammount: 6000000, status: 0 },
            { station: 'ndejje', type: 'withdraw', ammount: 300000, status: 0 },
            { station: 'gabba', type: 'deposit', ammount: 700000, status: 0 },
            { station: 'nansans', type: 'withdraw', ammount: 600000, status: 0 }
        ];
        this.posted = false;
    }
    FloatApprovalComponent.prototype.ngOnInit = function () {
        this.userForm = this.createFormGroup();
        this.fval.selectAll.setValue(false);
        this.initialiseForm();
    };
    FloatApprovalComponent.prototype.createFormGroup = function () {
        return this.fb.group({
            approveFloat: this.fb.array([this.floatApproval]),
            selectAll: this.fb.control({})
        });
    };
    Object.defineProperty(FloatApprovalComponent.prototype, "floatApproval", {
        get: function () {
            return this.fb.group({
                station: this.fb.control({ value: '' }),
                floattype: this.fb.control({ value: '' }),
                ammount: this.fb.control({ value: '' }),
                approved: this.fb.control({})
            });
        },
        enumerable: false,
        configurable: true
    });
    FloatApprovalComponent.prototype.addItem = function () {
        // this.unitForm.controls.bussinessUnits  as FormArray
        this.fval.approveFloat.push(this.floatApproval);
    };
    FloatApprovalComponent.prototype.removeItem = function (index) {
        this.fval.approveFloat.removeAt(index);
    };
    FloatApprovalComponent.prototype.initialiseForm = function () {
        var _this = this;
        var n;
        // this.others.getBussinessUnits().subscribe(
        //   units => {
        //     this.approvals = units;
        this.floatApprovals.forEach(function (item, i) {
            // console.log(item.name);
            // console.log(i);
            _this.fval.approveFloat.controls[i].controls.station.setValue(item.station);
            _this.fval.approveFloat.controls[i].controls.floattype.setValue(item.type);
            _this.fval.approveFloat.controls[i].controls.ammount.setValue(item.ammount);
            _this.fval.approveFloat.controls[i].controls.approved.setValue(false);
            _this.addItem();
            n = i + 1;
        });
        this.removeItem(n);
        // }
        // )
    };
    FloatApprovalComponent.prototype.checkAllItems = function (val) {
        var _this = this;
        if (val === true) {
            this.floatApprovals.forEach(function (item, i) {
                _this.fval.approveFloat.controls[i].controls.approved.setValue(val);
            });
        }
        else {
            this.floatApprovals.forEach(function (item, i) {
                _this.fval.approveFloat.controls[i].controls.approved.setValue(false);
            });
        }
    };
    FloatApprovalComponent.prototype.deselectAll = function (val) {
        // console.log(this.fval.approveAreas["controls"][val]["controls"].approved.value)
        if (this.fval.approveFloat.controls[val].controls.approved.value === true) {
            this.fval.selectAll.setValue(false);
        }
    };
    FloatApprovalComponent.prototype.revert = function () {
        this.userForm.reset();
    };
    FloatApprovalComponent.prototype.refresh = function () {
        location.reload();
    };
    Object.defineProperty(FloatApprovalComponent.prototype, "fval", {
        get: function () {
            return this.userForm.controls;
        },
        enumerable: false,
        configurable: true
    });
    FloatApprovalComponent.prototype.disableForm = function () {
        return this.userForm.disable();
    };
    FloatApprovalComponent.prototype.enableEdit = function () {
        return this.userForm.enable();
    };
    FloatApprovalComponent.prototype.approveItems = function () {
        var _this = this;
        var itemsApproved = [];
        this.floatApprovals.forEach(function (item, i) {
            if (_this.fval.approveFloat.controls[i].controls.approved.value === true) {
                item.status = 2;
                itemsApproved.push(item);
            }
        });
        console.log(itemsApproved.length);
        if (itemsApproved.length > 0) {
            setTimeout(function () {
                _this.router.navigate([
                    'centralmanagement/dashboard'
                ]);
            }, 3000);
        }
        else {
            // alert("Please select something")
            return;
        }
    };
    FloatApprovalComponent.prototype.rejectItems = function () {
        var _this = this;
        var itemsRejected = [];
        this.floatApprovals.forEach(function (item, i) {
            if (_this.fval.approveFloat.controls[i].controls.approved.value === true) {
                item.status = 1;
                itemsRejected.push(item);
            }
        });
        console.log(itemsRejected.length);
        if (itemsRejected.length > 0) {
            setTimeout(function () {
                _this.router.navigate([
                    'centralmanagement/dashboard'
                ]);
            }, 3000);
        }
        else {
            // alert("Please select something")
            return;
        }
    };
    FloatApprovalComponent = __decorate([
        core_1.Component({
            selector: 'app-float-approval',
            templateUrl: './float-approval.component.html',
            styleUrls: ['./float-approval.component.scss']
        })
    ], FloatApprovalComponent);
    return FloatApprovalComponent;
}());
exports.FloatApprovalComponent = FloatApprovalComponent;
