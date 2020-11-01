"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ApproveCentralUsersComponent = void 0;
var core_1 = require("@angular/core");
var ApproveCentralUsersComponent = /** @class */ (function () {
    function ApproveCentralUsersComponent(authService, router, spinner, alertService, fb) {
        this.authService = authService;
        this.router = router;
        this.spinner = spinner;
        this.alertService = alertService;
        this.fb = fb;
        this.centralUserApprovals = [
            {
                userID: 'TB03492',
                userName: 'Kasule Joseph',
                userRole: 'Central User',
                userLocation: 'Fuel Bussiness',
                status: 0
            },
            {
                userID: 'TB03492',
                userName: 'Kasule Joseph',
                userRole: 'Area User',
                userLocation: 'Central Region',
                status: 0
            },
            {
                userID: 'TB03492',
                userName: 'Kasule Joseph',
                userRole: 'Area User',
                userLocation: 'Eastern Region',
                status: 0
            },
            {
                userID: 'TB03492',
                userName: 'Kasule Joseph',
                userRole: 'Town User',
                userLocation: 'Kampala',
                status: 0
            },
            {
                userID: 'TB03492',
                userName: 'Kasule Joseph',
                userRole: 'Town User',
                userLocation: 'Kitugumu',
                status: 0
            },
            {
                userID: 'TB03492',
                userName: 'Kasule Joseph',
                userRole: 'Station User',
                userLocation: 'Don Petrol Station',
                status: 0
            },
            {
                userID: 'TB03492',
                userName: 'Kasule Joseph',
                userRole: 'Station User',
                userLocation: 'Don Petrol Station',
                status: 0
            },
        ];
        this.posted = false;
    }
    ApproveCentralUsersComponent.prototype.ngOnInit = function () {
        this.userForm = this.createFormGroup();
        this.fval.selectAll.setValue(false);
        this.initialiseForm();
    };
    ApproveCentralUsersComponent.prototype.createFormGroup = function () {
        return this.fb.group({
            approveUsers: this.fb.array([this.centralUserApproval]),
            selectAll: this.fb.control({})
        });
    };
    Object.defineProperty(ApproveCentralUsersComponent.prototype, "centralUserApproval", {
        get: function () {
            return this.fb.group({
                userID: this.fb.control({ value: '' }),
                userName: this.fb.control({ value: '' }),
                userRole: this.fb.control({ value: '' }),
                approved: this.fb.control({})
            });
        },
        enumerable: false,
        configurable: true
    });
    ApproveCentralUsersComponent.prototype.addItem = function () {
        // this.unitForm.controls.bussinessUnits  as FormArray
        this.fval.approveUsers.push(this.centralUserApproval);
    };
    ApproveCentralUsersComponent.prototype.removeItem = function (index) {
        this.fval.approveUsers.removeAt(index);
    };
    ApproveCentralUsersComponent.prototype.initialiseForm = function () {
        var _this = this;
        var n;
        // this.others.getBussinessUnits().subscribe(
        //   units => {
        //     this.approvals = units;
        this.centralUserApprovals.forEach(function (item, i) {
            // console.log(item.name);
            // console.log(i);
            _this.fval.approveUsers.controls[i].controls.userID.setValue(item.userID);
            _this.fval.approveUsers.controls[i].controls.userName.setValue(item.userName);
            _this.fval.approveUsers.controls[i].controls.userRole.setValue(item.userRole);
            _this.fval.approveUsers.controls[i].controls.approved.setValue(false);
            _this.addItem();
            n = i + 1;
        });
        this.removeItem(n);
        // }
        // )
    };
    ApproveCentralUsersComponent.prototype.checkAllItems = function (val) {
        var _this = this;
        if (val === true) {
            this.centralUserApprovals.forEach(function (item, i) {
                _this.fval.approveUsers.controls[i].controls.approved.setValue(val);
            });
        }
        else {
            this.centralUserApprovals.forEach(function (item, i) {
                _this.fval.approveUsers.controls[i].controls.approved.setValue(false);
            });
        }
    };
    ApproveCentralUsersComponent.prototype.deselectAll = function (val) {
        // console.log(this.fval.approveAreas["controls"][val]["controls"].approved.value)
        if (this.fval.approveUsers.controls[val].controls.approved.value === true) {
            this.fval.selectAll.setValue(false);
        }
    };
    ApproveCentralUsersComponent.prototype.revert = function () {
        this.userForm.reset();
    };
    ApproveCentralUsersComponent.prototype.refresh = function () {
        location.reload();
    };
    Object.defineProperty(ApproveCentralUsersComponent.prototype, "fval", {
        get: function () {
            return this.userForm.controls;
        },
        enumerable: false,
        configurable: true
    });
    ApproveCentralUsersComponent.prototype.disableForm = function () {
        return this.userForm.disable();
    };
    ApproveCentralUsersComponent.prototype.enableEdit = function () {
        return this.userForm.enable();
    };
    ApproveCentralUsersComponent.prototype.approveItems = function () {
        var _this = this;
        var itemsApproved = [];
        this.centralUserApprovals.forEach(function (item, i) {
            if (_this.fval.approveUsers.controls[i].controls.approved.value === true) {
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
    ApproveCentralUsersComponent.prototype.rejectItems = function () {
        var _this = this;
        var itemsRejected = [];
        this.centralUserApprovals.forEach(function (item, i) {
            if (_this.fval.approveUsers.controls[i].controls.approved.value === true) {
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
    ApproveCentralUsersComponent = __decorate([
        core_1.Component({
            selector: 'app-approve-central-users',
            templateUrl: './approve-central-users.component.html',
            styleUrls: ['./approve-central-users.component.scss']
        })
    ], ApproveCentralUsersComponent);
    return ApproveCentralUsersComponent;
}());
exports.ApproveCentralUsersComponent = ApproveCentralUsersComponent;
