"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ApproveAreasComponent = void 0;
var core_1 = require("@angular/core");
var ApproveAreasComponent = /** @class */ (function () {
    function ApproveAreasComponent(authService, others, router, spinner, alertService, fb) {
        this.authService = authService;
        this.others = others;
        this.router = router;
        this.spinner = spinner;
        this.alertService = alertService;
        this.fb = fb;
        this.posted = false;
        this.User = this.authService.loggedInUserInfo();
    }
    ApproveAreasComponent.prototype.ngOnInit = function () {
        this.userForm = this.createFormGroup();
        this.fval.selectAll.setValue(false);
        this.initialiseForm();
    };
    ApproveAreasComponent.prototype.createFormGroup = function () {
        return this.fb.group({
            approveAreas: this.fb.array([this.areaApprovals]),
            selectAll: this.fb.control({})
        });
    };
    Object.defineProperty(ApproveAreasComponent.prototype, "areaApprovals", {
        get: function () {
            return this.fb.group({
                areaId: this.fb.control({ value: '' }),
                area: this.fb.control({ value: '' }),
                approved: this.fb.control({})
            });
        },
        enumerable: false,
        configurable: true
    });
    ApproveAreasComponent.prototype.addItem = function () {
        // this.unitForm.controls.bussinessUnits  as FormArray
        this.fval.approveAreas.push(this.areaApprovals);
    };
    ApproveAreasComponent.prototype.removeItem = function (index) {
        this.fval.approveAreas.removeAt(index);
    };
    ApproveAreasComponent.prototype.initialiseForm = function () {
        var _this = this;
        var n;
        this.others.getAreasToApprove(this.User.userId).subscribe(function (items) {
            _this.areaApproval = items;
            // console.log(this.areaApproval);
            _this.areaApproval.forEach(function (item, i) {
                _this.fval.approveAreas.controls[i].controls.areaId.setValue(item.areaRegionId);
                _this.fval.approveAreas.controls[i].controls.area.setValue(item.areaRegionName);
                _this.fval.approveAreas.controls[i].controls.approved.setValue(false);
                _this.addItem();
                n = i + 1;
            });
            _this.removeItem(n);
        }, function (err) { return console.log(err); });
    };
    ApproveAreasComponent.prototype.checkAllItems = function (val) {
        var _this = this;
        if (val === true) {
            this.areaApproval.forEach(function (item, i) {
                _this.fval.approveAreas.controls[i].controls.approved.setValue(val);
            });
        }
        else {
            this.areaApproval.forEach(function (item, i) {
                _this.fval.approveAreas.controls[i].controls.approved.setValue(false);
            });
        }
    };
    ApproveAreasComponent.prototype.deselectAll = function (val) {
        // console.log(this.fval.approveAreas["controls"][val]["controls"].approved.value)
        if (this.fval.approveAreas.controls[val].controls.approved.value === true) {
            this.fval.selectAll.setValue(false);
        }
    };
    ApproveAreasComponent.prototype.revert = function () {
        this.userForm.reset();
    };
    ApproveAreasComponent.prototype.refresh = function () {
        this.userForm = this.createFormGroup();
        this.fval.selectAll.setValue(false);
        this.initialiseForm();
    };
    Object.defineProperty(ApproveAreasComponent.prototype, "fval", {
        get: function () {
            return this.userForm.controls;
        },
        enumerable: false,
        configurable: true
    });
    ApproveAreasComponent.prototype.disableForm = function () {
        return this.userForm.disable();
    };
    ApproveAreasComponent.prototype.approveItems = function () {
        var _this = this;
        var itemsApproved = [];
        this.areaApproval.forEach(function (item, i) {
            if (_this.fval.approveAreas.controls[i].controls.approved.value === true) {
                itemsApproved.push({
                    areaRegionId: item.areaRegionId,
                    areaRegionStatus: 2,
                    userId: _this.User.userId
                });
            }
        });
        // console.log(itemsApproved);
        if (itemsApproved.length > 0) {
            this.others.approveAreas(itemsApproved).subscribe(function (res) {
                // if (res) {
                setTimeout(function () {
                    _this.refresh();
                }, 3000);
                // }
            }, function (err) { return console.log(err); });
        }
        else {
            alert('Please select something');
            return;
        }
    };
    ApproveAreasComponent.prototype.rejectItems = function () {
        var _this = this;
        var itemsRejected = [];
        this.areaApproval.forEach(function (item, i) {
            if (_this.fval.approveAreas.controls[i].controls.approved.value === true) {
                itemsRejected.push({
                    areaRegionId: item.areaRegionId,
                    areaRegionStatus: 3,
                    userId: _this.User.userId
                });
            }
        });
        // console.log(itemsRejected);
        if (itemsRejected.length > 0) {
            this.others.rejectAreas(itemsRejected).subscribe(function (res) {
                // if (res) {
                setTimeout(function () {
                    _this.refresh();
                }, 3000);
                // }
            }, function (err) { return console.log(err); });
        }
        else {
            alert('Please select something');
            return;
        }
    };
    ApproveAreasComponent = __decorate([
        core_1.Component({
            selector: 'app-approve-areas',
            templateUrl: './approve-areas.component.html',
            styleUrls: ['./approve-areas.component.scss']
        })
    ], ApproveAreasComponent);
    return ApproveAreasComponent;
}());
exports.ApproveAreasComponent = ApproveAreasComponent;
