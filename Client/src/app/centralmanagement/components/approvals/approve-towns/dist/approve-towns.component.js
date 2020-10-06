"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ApproveTownsComponent = void 0;
var core_1 = require("@angular/core");
var ApproveTownsComponent = /** @class */ (function () {
    function ApproveTownsComponent(authService, router, spinner, alertService, fb) {
        this.authService = authService;
        this.router = router;
        this.spinner = spinner;
        this.alertService = alertService;
        this.fb = fb;
        this.townApprovals = [
            { town: 'kampala', status: 1 },
            { town: 'mbale', status: 1 },
            { town: 'masaka', status: 1 },
            { town: 'kawempe', status: 1 },
            { town: 'jinja', status: 1 }
        ];
        this.posted = false;
    }
    ApproveTownsComponent.prototype.ngOnInit = function () {
        this.userForm = this.createFormGroup();
        this.fval.selectAll.setValue(false);
        this.initialiseForm();
    };
    ApproveTownsComponent.prototype.createFormGroup = function () {
        return this.fb.group({
            approveTowns: this.fb.array([this.townApproval]),
            selectAll: this.fb.control({})
        });
    };
    Object.defineProperty(ApproveTownsComponent.prototype, "townApproval", {
        get: function () {
            return this.fb.group({
                town: this.fb.control({ value: '' }),
                approved: this.fb.control({})
            });
        },
        enumerable: false,
        configurable: true
    });
    ApproveTownsComponent.prototype.addItem = function () {
        // this.unitForm.controls.bussinessUnits  as FormArray
        this.fval.approveTowns.push(this.townApproval);
    };
    ApproveTownsComponent.prototype.removeItem = function (index) {
        this.fval.approveTowns.removeAt(index);
    };
    ApproveTownsComponent.prototype.initialiseForm = function () {
        var _this = this;
        var n;
        // this.others.getBussinessUnits().subscribe(
        //   units => {
        //     this.approvals = units;
        this.townApprovals.forEach(function (item, i) {
            // console.log(item.town);
            // console.log(i);
            _this.fval.approveTowns.controls[i].controls.town.setValue(item.town);
            _this.fval.approveTowns.controls[i].controls.approved.setValue(false);
            _this.addItem();
            n = i + 1;
        });
        this.removeItem(n);
        // }
        // )
    };
    ApproveTownsComponent.prototype.checkAllItems = function (val) {
        var _this = this;
        if (val === true) {
            this.townApprovals.forEach(function (item, i) {
                _this.fval.approveTowns.controls[i].controls.approved.setValue(val);
            });
        }
        else {
            this.townApprovals.forEach(function (item, i) {
                _this.fval.approveTowns.controls[i].controls.approved.setValue(false);
            });
        }
    };
    ApproveTownsComponent.prototype.deselectAll = function (val) {
        // console.log(this.fval.approveAreas["controls"][val]["controls"].approved.value)
        if (this.fval.approveTowns.controls[val].controls.approved.value === true) {
            this.fval.selectAll.setValue(false);
        }
    };
    ApproveTownsComponent.prototype.revert = function () {
        this.userForm.reset();
    };
    ApproveTownsComponent.prototype.refresh = function () {
        location.reload();
    };
    Object.defineProperty(ApproveTownsComponent.prototype, "fval", {
        get: function () {
            return this.userForm.controls;
        },
        enumerable: false,
        configurable: true
    });
    ApproveTownsComponent.prototype.disableForm = function () {
        return this.userForm.disable();
    };
    ApproveTownsComponent.prototype.approveItems = function () {
        var _this = this;
        var itemsApproved = [];
        this.townApprovals.forEach(function (item, i) {
            if (_this.fval.approveTowns.controls[i].controls.approved.value === true) {
                item.status = 2;
                itemsApproved.push(item);
            }
        });
        // console.log(itemsApproved)
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
    ApproveTownsComponent.prototype.rejectItems = function () {
        var _this = this;
        var itemsRejected = [];
        this.townApprovals.forEach(function (item, i) {
            if (_this.fval.approveTowns.controls[i].controls.approved.value === true) {
                item.status = 1;
                itemsRejected.push(item);
            }
        });
        // console.log(itemsRejected.length)
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
    ApproveTownsComponent = __decorate([
        core_1.Component({
            selector: 'app-approve-towns',
            templateUrl: './approve-towns.component.html',
            styleUrls: ['./approve-towns.component.scss']
        })
    ], ApproveTownsComponent);
    return ApproveTownsComponent;
}());
exports.ApproveTownsComponent = ApproveTownsComponent;
