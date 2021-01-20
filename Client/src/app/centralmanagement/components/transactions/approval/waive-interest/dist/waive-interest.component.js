"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.WaiveInterestComponent = void 0;
var core_1 = require("@angular/core");
// import { BsModalService } from 'ngx-bootstrap/modal';
// import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
var WaiveInterestComponent = /** @class */ (function () {
    function WaiveInterestComponent(authService, others, router, spinner, alertService, fb) {
        this.authService = authService;
        this.others = others;
        this.router = router;
        this.spinner = spinner;
        this.alertService = alertService;
        this.fb = fb;
        this.posted = false;
    }
    WaiveInterestComponent.prototype.ngOnInit = function () {
        this.userForm = this.createFormGroup();
        this.fval.selectAll.setValue(false);
        this.initialiseForm();
    };
    WaiveInterestComponent.prototype.createFormGroup = function () {
        return this.fb.group({
            approveWave: this.fb.array([this.waveApproval]),
            selectAll: this.fb.control({})
        });
    };
    Object.defineProperty(WaiveInterestComponent.prototype, "waveApproval", {
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
    WaiveInterestComponent.prototype.addItem = function () {
        // this.unitForm.controls.bussinessUnits  as FormArray
        this.fval.approveWave.push(this.waveApproval);
    };
    WaiveInterestComponent.prototype.removeItem = function (index) {
        this.fval.approveWave.removeAt(index);
    };
    WaiveInterestComponent.prototype.initialiseForm = function () {
        var _this = this;
        var n;
        this.others.getWaivedInterestsForApproval().subscribe(function (res) {
            _this.waveApprovals = res;
            _this.waveApprovals.forEach(function (item, i) {
                // console.log(item.name);
                // console.log(i);
                _this.fval.approveWave.controls[i].controls.station.setValue(item.station);
                _this.fval.approveWave.controls[i].controls.client.setValue(item.client);
                _this.fval.approveWave.controls[i].controls.ammount.setValue(item.ammount);
                _this.fval.approveWave.controls[i].controls.approved.setValue(false);
                _this.addItem();
                n = i + 1;
            });
            _this.removeItem(n);
        });
    };
    WaiveInterestComponent.prototype.checkAllItems = function (val) {
        var _this = this;
        if (val === true) {
            this.waveApprovals.forEach(function (item, i) {
                _this.fval.approveWave.controls[i].controls.approved.setValue(val);
            });
        }
        else {
            this.waveApprovals.forEach(function (item, i) {
                _this.fval.approveWave.controls[i].controls.approved.setValue(false);
            });
        }
    };
    WaiveInterestComponent.prototype.deselectAll = function (val) {
        // console.log(this.fval.approveAreas["controls"][val]["controls"].approved.value)
        if (this.fval.approveWave.controls[val].controls.approved.value === true) {
            this.fval.selectAll.setValue(false);
        }
    };
    WaiveInterestComponent.prototype.revert = function () {
        this.userForm.reset();
    };
    WaiveInterestComponent.prototype.refresh = function () {
        location.reload();
    };
    Object.defineProperty(WaiveInterestComponent.prototype, "fval", {
        get: function () {
            return this.userForm.controls;
        },
        enumerable: false,
        configurable: true
    });
    WaiveInterestComponent.prototype.disableForm = function () {
        return this.userForm.disable();
    };
    WaiveInterestComponent.prototype.enableEdit = function () {
        return this.userForm.enable();
    };
    WaiveInterestComponent.prototype.approveItems = function () {
        var _this = this;
        var itemsApproved = [];
        this.waveApprovals.forEach(function (item, i) {
            if (_this.fval.approveWave.controls[i].controls.approved.value == true) {
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
    WaiveInterestComponent.prototype.rejectItems = function () {
        var _this = this;
        var itemsRejected = [];
        this.waveApprovals.forEach(function (item, i) {
            if (_this.fval.approveWave.controls[i].controls.approved.value === true) {
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
    WaiveInterestComponent = __decorate([
        core_1.Component({
            selector: 'app-waive-interest',
            templateUrl: './waive-interest.component.html',
            styleUrls: ['./waive-interest.component.scss']
        })
    ], WaiveInterestComponent);
    return WaiveInterestComponent;
}());
exports.WaiveInterestComponent = WaiveInterestComponent;
