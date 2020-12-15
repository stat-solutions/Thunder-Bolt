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
    function ApproveCentralUsersComponent(authService, others, router, spinner, alertService, fb) {
        this.authService = authService;
        this.others = others;
        this.router = router;
        this.spinner = spinner;
        this.alertService = alertService;
        this.fb = fb;
        this.posted = false;
        this.User = this.authService.loggedInUserInfo();
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
                userLocation: this.fb.control({ value: '' }),
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
        this.others.getUsersForApproval().subscribe(function (units) {
            _this.centralUserApprovals = units;
            // console.log(this.centralUserApprovals);
            _this.centralUserApprovals.forEach(function (item, i) {
                _this.fval.approveUsers.controls[i].controls.userID.setValue(item.userId);
                _this.fval.approveUsers.controls[i].controls.userName.setValue(item.userName.toUpperCase());
                _this.fval.approveUsers.controls[i].controls.userRole.setValue(item.roleName.replace(/_/g, ' ').toUpperCase());
                _this.fval.approveUsers.controls[i].controls.userLocation.setValue(item.locationName.toUpperCase());
                _this.fval.approveUsers.controls[i].controls.approved.setValue(false);
                _this.addItem();
                n = i + 1;
            });
            _this.removeItem(n);
        });
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
        this.userForm = this.createFormGroup();
        this.fval.selectAll.setValue(false);
        this.initialiseForm();
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
                itemsApproved.push({
                    userId: item.userId,
                    userStatus: 2,
                    userIdApprover: _this.User.userId
                });
            }
        });
        // console.log(itemsApproved.length);
        if (itemsApproved.length > 0) {
            this.others.approveUsers(itemsApproved).subscribe(function (res) {
                _this.posted = true;
                _this.alertService.success({
                    html: '<b> Users where approved successfully</b>'
                });
                setTimeout(function () {
                    _this.userForm = _this.createFormGroup();
                    _this.fval.selectAll.setValue(false);
                    _this.initialiseForm();
                }, 3000);
            }, function (err) {
                _this.errored = true;
                _this.alertService.danger({
                    html: '<b>' + err.error.ststusText + '</b>'
                });
            });
        }
        else {
            this.errored = true;
            this.alertService.danger({
                html: '<b> Please select something </b>'
            });
            return;
        }
    };
    ApproveCentralUsersComponent.prototype.rejectItems = function () {
        var _this = this;
        var itemsRejected = [];
        this.centralUserApprovals.forEach(function (item, i) {
            if (_this.fval.approveUsers.controls[i].controls.approved.value === true) {
                itemsRejected.push({
                    userId: item.userId,
                    userStatus: 3,
                    userIdApprover: _this.User.userId
                });
            }
        });
        // console.log(itemsRejected.length);
        if (itemsRejected.length > 0) {
            this.others.rejectUsers(itemsRejected).subscribe(function (res) {
                _this.posted = true;
                _this.alertService.success({
                    html: '<b> Users where rejected successfully</b>'
                });
                setTimeout(function () {
                    _this.userForm = _this.createFormGroup();
                    _this.fval.selectAll.setValue(false);
                    _this.initialiseForm();
                }, 3000);
            }, function (err) {
                _this.errored = true;
                _this.alertService.danger({
                    html: '<b>' + err.error.ststusText + '</b>'
                });
            });
        }
        else {
            this.errored = true;
            this.alertService.danger({
                html: '<b> Please select something </b>'
            });
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
