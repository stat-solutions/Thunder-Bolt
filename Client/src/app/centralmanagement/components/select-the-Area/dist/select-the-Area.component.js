"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.SelectTheAreaComponent = void 0;
var core_1 = require("@angular/core");
// import { BsModalService } from 'ngx-bootstrap/modal';
// import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
var SelectTheAreaComponent = /** @class */ (function () {
    function SelectTheAreaComponent(authService, others, router, spinner, alertService, fb) {
        this.authService = authService;
        this.others = others;
        this.router = router;
        this.spinner = spinner;
        this.alertService = alertService;
        this.fb = fb;
        this.approvedAreas = [];
        this.posted = false;
        this.loaded = false;
        this.User = this.authService.loggedInUserInfo();
    }
    SelectTheAreaComponent.prototype.ngOnInit = function () {
        this.userForm = this.createFormGroup();
        this.fval.selectAll.setValue(false);
        this.initialiseForm();
    };
    SelectTheAreaComponent.prototype.createFormGroup = function () {
        return this.fb.group({
            selectedAreas: this.fb.array([this.selectArea]),
            selectAll: this.fb.control({})
        });
    };
    Object.defineProperty(SelectTheAreaComponent.prototype, "selectArea", {
        get: function () {
            return this.fb.group({
                areaId: this.fb.control({ value: '' }),
                areaName: this.fb.control({ value: '' }),
                approved: this.fb.control({})
            });
        },
        enumerable: false,
        configurable: true
    });
    SelectTheAreaComponent.prototype.addItem = function () {
        // this.unitForm.controls.bussinessUnits  as FormArray
        this.fval.selectedAreas.push(this.selectArea);
    };
    SelectTheAreaComponent.prototype.removeItem = function (index) {
        this.fval.selectedAreas.removeAt(index);
    };
    SelectTheAreaComponent.prototype.initialiseForm = function () {
        var _this = this;
        var n;
        this.others.getAreas().subscribe(function (units) {
            _this.approvedAreas = units;
            // console.log(this.approvedAreas)
            // areaRegionId: 803
            // areaRegionName: "CENTRAL REGION"
            // areaRegionStatus: 2
            // fkApprovalDetailsIdAreaRegion: 125
            _this.approvedAreas.forEach(function (item, i) {
                _this.fval.selectedAreas.controls[i].controls.areaId.setValue(item.areaRegionId);
                _this.fval.selectedAreas.controls[i].controls.areaName.setValue(item.areaRegionName);
                _this.fval.selectedAreas.controls[i].controls.approved.setValue(false);
                _this.addItem();
                n = i + 1;
            });
            _this.removeItem(n);
            _this.loaded = true;
        });
    };
    SelectTheAreaComponent.prototype.checkAllItems = function (val) {
        var _this = this;
        if (val === true) {
            this.approvedAreas.forEach(function (item, i) {
                _this.fval.selectedAreas.controls[i].controls.approved.setValue(val);
            });
        }
        else {
            this.approvedAreas.forEach(function (item, i) {
                _this.fval.selectedAreas.controls[i].controls.approved.setValue(false);
            });
        }
    };
    SelectTheAreaComponent.prototype.deselectAll = function (val) {
        // console.log(this.fval.approveAreas["controls"][val]["controls"].approved.value)
        if (this.fval.selectedAreas.controls[val].controls.approved.value === true) {
            this.fval.selectAll.setValue(false);
        }
    };
    SelectTheAreaComponent.prototype.revert = function () {
        this.userForm.reset();
    };
    SelectTheAreaComponent.prototype.refresh = function () {
        this.userForm = this.createFormGroup();
        this.fval.selectAll.setValue(false);
        this.initialiseForm();
    };
    Object.defineProperty(SelectTheAreaComponent.prototype, "fval", {
        get: function () {
            return this.userForm.controls;
        },
        enumerable: false,
        configurable: true
    });
    SelectTheAreaComponent.prototype.disableForm = function () {
        return this.userForm.disable();
    };
    SelectTheAreaComponent.prototype.enableEdit = function () {
        return this.userForm.enable();
    };
    SelectTheAreaComponent.prototype.approveItems = function () {
        var _this = this;
        var areasSelected = [];
        this.approvedAreas.forEach(function (item, i) {
            if (_this.fval.selectedAreas.controls[i].controls.approved.value === true) {
                areasSelected.push({
                    areaRegionId: item.areaRegionId,
                    theBusinessUnitId: _this.User.userLocationId,
                    userId: _this.User.userId
                });
            }
        });
        // console.log(AreasSelected.length);
        if (areasSelected.length > 0) {
            this.others.createTheArea(areasSelected).subscribe(function (res) {
                _this.posted = true;
                _this.alertService.success({
                    html: '<b> Areas were  set successfully</b>'
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
    SelectTheAreaComponent.prototype.cancelSelection = function () {
        var _this = this;
        this.revert();
        setTimeout(function () {
            _this.router.navigate(['centralmanagement']);
        }, 3000);
    };
    SelectTheAreaComponent = __decorate([
        core_1.Component({
            selector: 'app-lib-select-the-area',
            templateUrl: './select-the-Area.component.html',
            styleUrls: ['./select-the-Area.component.scss']
        })
    ], SelectTheAreaComponent);
    return SelectTheAreaComponent;
}());
exports.SelectTheAreaComponent = SelectTheAreaComponent;
