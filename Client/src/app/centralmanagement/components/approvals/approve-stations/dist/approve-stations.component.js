"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ApproveStationsComponent = void 0;
var core_1 = require("@angular/core");
var ApproveStationsComponent = /** @class */ (function () {
    function ApproveStationsComponent(others, authService, router, spinner, alertService, fb) {
        this.others = others;
        this.authService = authService;
        this.router = router;
        this.spinner = spinner;
        this.alertService = alertService;
        this.fb = fb;
        this.posted = false;
        this.User = this.authService.loggedInUserInfo();
    }
    ApproveStationsComponent.prototype.ngOnInit = function () {
        this.userForm = this.createFormGroup();
        this.fval.selectAll.setValue(false);
        this.initialiseForm();
    };
    ApproveStationsComponent.prototype.createFormGroup = function () {
        return this.fb.group({
            approveStations: this.fb.array([this.stationApprovals]),
            selectAll: this.fb.control({})
        });
    };
    Object.defineProperty(ApproveStationsComponent.prototype, "stationApprovals", {
        get: function () {
            return this.fb.group({
                station: this.fb.control({ value: '' }),
                approved: this.fb.control({})
            });
        },
        enumerable: false,
        configurable: true
    });
    ApproveStationsComponent.prototype.addItem = function () {
        // this.unitForm.controls.bussinessUnits  as FormArray
        this.fval.approveStations.push(this.stationApprovals);
    };
    ApproveStationsComponent.prototype.removeItem = function (index) {
        this.fval.approveStations.removeAt(index);
    };
    ApproveStationsComponent.prototype.initialiseForm = function () {
        var _this = this;
        var n;
        this.others.getStationsToApprove(this.User.userId).subscribe(function (items) {
            _this.stationApproval = items;
            console.log(_this.stationApproval);
            _this.stationApproval.forEach(function (item, i) {
                // console.log(item.station);
                // console.log(i);
                // this.fval.approveStations.controls[i].controls.station.setValue(item.station);
                _this.fval.approveStations.controls[i].controls.approved.setValue(false);
                _this.addItem();
                n = i + 1;
            });
            _this.removeItem(n);
        });
    };
    ApproveStationsComponent.prototype.checkAllItems = function (val) {
        var _this = this;
        if (val === true) {
            this.stationApproval.forEach(function (item, i) {
                _this.fval.approveStations.controls[i].controls.approved.setValue(val);
            });
        }
        else {
            this.stationApproval.forEach(function (item, i) {
                _this.fval.approveStations.controls[i].controls.approved.setValue(false);
            });
        }
    };
    ApproveStationsComponent.prototype.deselectAll = function (val) {
        // console.log(this.fval.approveAreas["controls"][val]["controls"].approved.value)
        if (this.fval.approveStations.controls[val].controls.approved.value === true) {
            this.fval.selectAll.setValue(false);
        }
    };
    ApproveStationsComponent.prototype.revert = function () {
        this.userForm.reset();
    };
    ApproveStationsComponent.prototype.refresh = function () {
        location.reload();
    };
    Object.defineProperty(ApproveStationsComponent.prototype, "fval", {
        get: function () {
            return this.userForm.controls;
        },
        enumerable: false,
        configurable: true
    });
    ApproveStationsComponent.prototype.disableForm = function () {
        return this.userForm.disable();
    };
    ApproveStationsComponent.prototype.approveItems = function () {
        var _this = this;
        var itemsApproved = [];
        this.stationApproval.forEach(function (item, i) {
            if (_this.fval.approveStations.controls[i].controls.approved.value === true) {
                itemsApproved.push({
                    // areaRegionId: item.areaRegionId,
                    areaRegionStatus: 2,
                    userId: _this.User.userId
                });
            }
        });
        // console.log(itemsApproved)
        if (itemsApproved.length > 0) {
            this.others.approveStations(itemsApproved).subscribe(function (res) {
                if (res) {
                    _this.initialiseForm();
                }
            }, function (err) { return console.log(err); });
        }
        else {
            alert('Please select something');
            return;
        }
    };
    ApproveStationsComponent.prototype.rejectItems = function () {
        var _this = this;
        var itemsRejected = [];
        this.stationApproval.forEach(function (item, i) {
            if (_this.fval.approveStations.controls[i].controls.approved.value === true) {
                itemsRejected.push({
                    // areaRegionId: item.areaRegionId,
                    areaRegionStatus: 3,
                    userId: _this.User.userId
                });
            }
        });
        // console.log(itemsRejected.length)
        if (itemsRejected.length > 0) {
            this.others.rejectStations(itemsRejected).subscribe(function (res) {
                if (res) {
                    _this.initialiseForm();
                }
            }, function (err) { return console.log(err); });
        }
        else {
            alert('Please select something');
            return;
        }
    };
    ApproveStationsComponent = __decorate([
        core_1.Component({
            selector: 'app-approve-stations',
            templateUrl: './approve-stations.component.html',
            styleUrls: ['./approve-stations.component.scss']
        })
    ], ApproveStationsComponent);
    return ApproveStationsComponent;
}());
exports.ApproveStationsComponent = ApproveStationsComponent;
