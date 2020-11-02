"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AreaManagersComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var AreaManagersComponent = /** @class */ (function () {
    function AreaManagersComponent(others, authService, router, spinner, alertService, fb) {
        this.others = others;
        this.authService = authService;
        this.router = router;
        this.spinner = spinner;
        this.alertService = alertService;
        this.fb = fb;
        this.posted = false;
        this.User = this.authService.loggedInUserInfo();
    }
    AreaManagersComponent.prototype.ngOnInit = function () {
        this.managersForm = this.createFormGroup();
        this.initialiseForm();
    };
    AreaManagersComponent.prototype.createFormGroup = function () {
        return this.fb.group({
            areaManagers: this.fb.array([this.areaManager])
        });
    };
    Object.defineProperty(AreaManagersComponent.prototype, "areaManager", {
        get: function () {
            return this.fb.group({
                areaName: this.fb.control({ value: '' }),
                areaId: this.fb.control({ value: '' }),
                currentManager: this.fb.control({ value: '' }),
                selectedManagerId: this.fb.control({ value: '' }),
                selectedManager: this.fb.control({ value: '' }, forms_1.Validators.compose([
                    forms_1.Validators.required,
                ]))
            });
        },
        enumerable: false,
        configurable: true
    });
    AreaManagersComponent.prototype.addItem = function () {
        this.fval.areaManagers.push(this.areaManager);
    };
    AreaManagersComponent.prototype.removeItem = function (index) {
        this.fval.areaManagers.removeAt(index);
    };
    AreaManagersComponent.prototype.initialiseForm = function () {
        var _this = this;
        var n;
        this.others.getAllTheAreaLocations().subscribe(function (res) {
            _this.areasManager = res;
            console.log(_this.areasManager);
            _this.areasManager.forEach(function (item, i) {
                _this.fval.areaManagers.controls[i].controls.areaName.setValue(item.areaName.replace(/_/g, ' ').toUpperCase());
                _this.fval.areaManagers.controls[i].controls.areaId.setValue(item.theAreaLocationId);
                _this.fval.areaManagers.controls[i].controls.currentManager.setValue(item.manager.toUpperCase());
                _this.fval.areaManagers.controls[i].controls.selectedManager.setValue(item.manager.toUpperCase());
                _this.fval.areaManagers.controls[i].controls.selectedManagerId.setValue(item.manager.toUpperCase());
                _this.addItem();
                n = i + 1;
            });
            _this.removeItem(n);
            _this.disableForms();
        }, function (err) { return console.log(err); });
    };
    AreaManagersComponent.prototype.revert = function () {
        this.managersForm.reset();
    };
    AreaManagersComponent.prototype.refresh = function () {
        location.reload();
    };
    Object.defineProperty(AreaManagersComponent.prototype, "fval", {
        get: function () {
            return this.managersForm.controls;
        },
        enumerable: false,
        configurable: true
    });
    AreaManagersComponent.prototype.disableForms = function () {
        var _this = this;
        // console.log(this.approvals);
        this.areasManager.forEach(function (itm, i) {
            _this.fval.areaManagers.controls[i].disable();
        });
    };
    AreaManagersComponent.prototype.enableEdit = function (val) {
        var _this = this;
        this.showLevels = val;
        this.areasManager.forEach(function (itm, i) {
            if (i === val) {
                _this.others.getUsersByLocation(itm.theAreaLocationId).subscribe(function (res) {
                    _this.users = res;
                    console.log(_this.users);
                }, function (err) { return console.log(err); });
                _this.fval.areaManagers.controls[i].enable();
            }
        });
    };
    AreaManagersComponent.prototype.saveManager = function (index) {
        if (this.fval.areaManagers.controls[index]) {
            this.fval.areaManagers.controls[index].disable();
            this.showLevels = null;
            var data = {
            // theAreaLocationId: ,
            // userId:
            };
            console.log(data);
            // this.others.setAreaManager(data).subscribe(
            //   res => {
            //     // console.log(res);
            //   },
            //   err => console.log(err)
            // );
        }
        else {
            return;
        }
    };
    AreaManagersComponent = __decorate([
        core_1.Component({
            selector: 'app-area-managers',
            templateUrl: './area-managers.component.html',
            styleUrls: ['./area-managers.component.scss']
        })
    ], AreaManagersComponent);
    return AreaManagersComponent;
}());
exports.AreaManagersComponent = AreaManagersComponent;
