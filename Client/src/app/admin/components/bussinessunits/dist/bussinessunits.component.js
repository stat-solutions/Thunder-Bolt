"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.BussinessunitsComponent = void 0;
var core_1 = require("@angular/core");
// import * as jwt_decode from 'jwt-decode';
var forms_1 = require("@angular/forms");
// import { BsModalService } from 'ngx-bootstrap/modal';
// import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
var BussinessunitsComponent = /** @class */ (function () {
    function BussinessunitsComponent(others, authService, router, spinner, alertService, fb) {
        this.others = others;
        this.authService = authService;
        this.router = router;
        this.spinner = spinner;
        this.alertService = alertService;
        this.fb = fb;
        this.User = this.authService.loggedInUserInfo();
    }
    BussinessunitsComponent.prototype.ngOnInit = function () {
        this.unitForm = this.createFormGroup();
        this.initialiseForm();
    };
    BussinessunitsComponent.prototype.createFormGroup = function () {
        return this.fb.group({
            bussinessUnits: this.fb.array([this.unit]),
            bussinessUnitName: this.fb.control('', forms_1.Validators.compose([forms_1.Validators.minLength(5)]))
        });
    };
    Object.defineProperty(BussinessunitsComponent.prototype, "unit", {
        get: function () {
            return this.fb.group({
                unitId: this.fb.control({ value: '' }),
                unitName: this.fb.control({ value: '' }, forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.minLength(6)]))
            });
        },
        enumerable: false,
        configurable: true
    });
    BussinessunitsComponent.prototype.addUnit = function () {
        // this.unitForm.controls.bussinessUnits  as FormArray
        this.fval.bussinessUnits.push(this.unit);
    };
    BussinessunitsComponent.prototype.removeUnit = function (index) {
        this.fval.bussinessUnits.removeAt(index);
    };
    BussinessunitsComponent.prototype.initialiseForm = function () {
        var _this = this;
        var n;
        this.others.getBussinessUnits().subscribe(function (units) {
            _this.bussinessUnits = units;
            _this.bussinessUnits.forEach(function (item, i) {
                // console.log(item);
                _this.fval.bussinessUnits.controls[i].controls.unitId.setValue(item.businnessUnitId);
                _this.fval.bussinessUnits.controls[i].controls.unitName.setValue(item.bussinessUnitName);
                _this.addUnit();
                n = i + 1;
            });
            _this.removeUnit(n);
            _this.disableForms();
        }, function (err) { return console.log(err); });
    };
    BussinessunitsComponent.prototype.revert = function () {
        this.unitForm.reset();
    };
    BussinessunitsComponent.prototype.refresh = function () {
        location.reload();
    };
    Object.defineProperty(BussinessunitsComponent.prototype, "fval", {
        get: function () {
            return this.unitForm.controls;
        },
        enumerable: false,
        configurable: true
    });
    BussinessunitsComponent.prototype.disableForms = function () {
        var _this = this;
        this.bussinessUnits.forEach(function (itm, i) {
            // console.log(i)
            _this.fval.bussinessUnits.controls[i].disable();
        });
    };
    BussinessunitsComponent.prototype.enableEdit = function (val) {
        var _this = this;
        this.bussinessUnits.forEach(function (itm, i) {
            // console.log(i)
            if (i === val) {
                _this.fval.bussinessUnits.controls[i].enable();
            }
        });
    };
    BussinessunitsComponent.prototype.createUnit = function () {
        var _this = this;
        var data = {
            bussinessUnitName: this.fval.bussinessUnitName.value.toUpperCase(),
            userId: this.User.userId
        };
        console.log(data);
        this.others.setBussinessUnits(data).subscribe(function (res) {
            // console.log(res);
            _this.refresh();
        }, function (error) {
            //
        });
    };
    BussinessunitsComponent.prototype.editUnit = function (index) {
        // console.log(index);
        this.enableEdit(index);
    };
    BussinessunitsComponent.prototype.saveUnit = function (index) {
        this.fval.bussinessUnits.controls[index].disable();
        var data = {
            businnessUnitId: this.fval.bussinessUnits.controls[index].controls.unitId.value,
            bussinessUnitName: this.fval.bussinessUnits.controls[index].controls.unitName.value.toUpperCase(),
            userId: this.User.userId
        };
        // console.log(data);
        this.others.editBussinessUnits(data).subscribe(function (res) {
            // console.log(res);
        }, function (error) { return console.log(error); });
    };
    BussinessunitsComponent = __decorate([
        core_1.Component({
            selector: 'app-bussinessunits',
            templateUrl: './bussinessunits.component.html',
            styleUrls: ['./bussinessunits.component.scss']
        })
    ], BussinessunitsComponent);
    return BussinessunitsComponent;
}());
exports.BussinessunitsComponent = BussinessunitsComponent;
