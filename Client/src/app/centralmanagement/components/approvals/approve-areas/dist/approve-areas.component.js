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
    function ApproveAreasComponent(authService, router, spinner, alertService, fb) {
        this.authService = authService;
        this.router = router;
        this.spinner = spinner;
        this.alertService = alertService;
        this.fb = fb;
        this.posted = false;
        this.areaApproval = [
        // { area: 'central', status: 0 },
        // { area: 'Eastern', status: 0 },
        // { area: 'Western', status: 0 },
        ];
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
        // this.others.getBussinessUnits().subscribe(
        //   units => {
        //     this.approvals = units;
        this.areaApproval.forEach(function (item, i) {
            // console.log(item.name);
            // console.log(i);
            _this.fval.approveAreas.controls[i].controls.area.setValue(item.area);
            _this.fval.approveAreas.controls[i].controls.approved.setValue(false);
            _this.addItem();
            n = i + 1;
        });
        this.removeItem(n);
        // }
        // )
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
        location.reload();
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
                item.status = 2;
                itemsApproved.push(item);
            }
        });
        // console.log(itemsApproved)
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
    ApproveAreasComponent.prototype.rejectItems = function () {
        var _this = this;
        var itemsRejected = [];
        this.areaApproval.forEach(function (item, i) {
            if (_this.fval.approveAreas.controls[i].controls.approved.value === true) {
                item.status = 1;
                itemsRejected.push(item);
            }
        });
        // console.log(itemsRejected.length)
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
