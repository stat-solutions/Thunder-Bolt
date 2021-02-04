"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CreateComponent = void 0;
var core_1 = require("@angular/core");
// import { BsModalService } from 'ngx-bootstrap/modal';
// import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
var CreateComponent = /** @class */ (function () {
    function CreateComponent(authService, others, router, spinner, alertService, fb) {
        this.authService = authService;
        this.others = others;
        this.router = router;
        this.spinner = spinner;
        this.alertService = alertService;
        this.fb = fb;
        this.approvedTowns = [];
        this.posted = false;
        this.User = this.authService.loggedInUserInfo();
    }
    CreateComponent.prototype.ngOnInit = function () {
        this.userForm = this.createFormGroup();
        this.fval.selectAll.setValue(false);
        this.initialiseForm();
        // console.log(this.User);
    };
    CreateComponent.prototype.createFormGroup = function () {
        return this.fb.group({
            selectedTowns: this.fb.array([this.selectTown]),
            selectAll: this.fb.control({})
        });
    };
    Object.defineProperty(CreateComponent.prototype, "selectTown", {
        get: function () {
            return this.fb.group({
                townId: this.fb.control({ value: '' }),
                townName: this.fb.control({ value: '' }),
                approved: this.fb.control({})
            });
        },
        enumerable: false,
        configurable: true
    });
    CreateComponent.prototype.addItem = function () {
        // this.unitForm.controls.bussinessUnits  as FormArray
        this.fval.selectedTowns.push(this.selectTown);
    };
    CreateComponent.prototype.removeItem = function (index) {
        this.fval.selectedTowns.removeAt(index);
    };
    CreateComponent.prototype.initialiseForm = function () {
        var _this = this;
        var n;
        this.others.getTowns().subscribe(function (units) {
            _this.approvedTowns = units;
            _this.approvedTowns.forEach(function (item, i) {
                // console.log(item.townName);
                // console.log(i);
                _this.fval.selectedTowns.controls[i].controls.townId.setValue(item.townId);
                _this.fval.selectedTowns.controls[i].controls.townName.setValue(item.townName.toUpperCase());
                _this.fval.selectedTowns.controls[i].controls.approved.setValue(false);
                _this.addItem();
                n = i + 1;
            });
            _this.removeItem(n);
        });
    };
    CreateComponent.prototype.checkAllItems = function (val) {
        var _this = this;
        if (val === true) {
            this.approvedTowns.forEach(function (item, i) {
                _this.fval.selectedTowns.controls[i].controls.approved.setValue(val);
            });
        }
        else {
            this.approvedTowns.forEach(function (item, i) {
                _this.fval.selectedTowns.controls[i].controls.approved.setValue(false);
            });
        }
    };
    CreateComponent.prototype.deselectAll = function (val) {
        // console.log(this.fval.approveAreas["controls"][val]["controls"].approved.value)
        if (this.fval.selectedTowns.controls[val].controls.approved.value === true) {
            this.fval.selectAll.setValue(false);
        }
    };
    CreateComponent.prototype.revert = function () {
        this.userForm.reset();
    };
    CreateComponent.prototype.refresh = function () {
        this.userForm = this.createFormGroup();
        this.fval.selectAll.setValue(false);
        this.initialiseForm();
    };
    Object.defineProperty(CreateComponent.prototype, "fval", {
        get: function () {
            return this.userForm.controls;
        },
        enumerable: false,
        configurable: true
    });
    CreateComponent.prototype.disableForm = function () {
        return this.userForm.disable();
    };
    CreateComponent.prototype.enableEdit = function () {
        return this.userForm.enable();
    };
    CreateComponent.prototype.approveItems = function () {
        var _this = this;
        var townsSelected = [];
        this.approvedTowns.forEach(function (item, i) {
            if (_this.fval.selectedTowns.controls[i].controls.approved.value === true) {
                townsSelected.push({
                    townId: item.townId,
                    theAreaLocationId: _this.User.userLocationId,
                    userId: _this.User.userId
                });
            }
        });
        // console.log(townsSelected);
        if (townsSelected.length > 0) {
            this.others.createTheTown(townsSelected).subscribe(function (res) {
                _this.posted = true;
                _this.alertService.success({
                    html: '<b> Towns were  set successfully</b>'
                });
                setTimeout(function () {
                    _this.userForm = _this.createFormGroup();
                    _this.fval.selectAll.setValue(false);
                    _this.initialiseForm();
                }, 3000);
            }, function (err) {
                _this.errored = true;
                _this.alertService.danger({
                    html: '<b>Something went wrong</b>'
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
    CreateComponent.prototype.cancelSelection = function () {
        var _this = this;
        this.revert();
        setTimeout(function () {
            _this.router.navigate(['areamanagement']);
        }, 3000);
    };
    CreateComponent = __decorate([
        core_1.Component({
            selector: 'app-create',
            templateUrl: './create.component.html',
            styleUrls: ['./create.component.scss']
        })
    ], CreateComponent);
    return CreateComponent;
}());
exports.CreateComponent = CreateComponent;
