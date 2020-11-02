"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.StationManagersComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var StationManagersComponent = /** @class */ (function () {
    function StationManagersComponent(others, router, spinner, alertService, fb) {
        this.others = others;
        this.router = router;
        this.spinner = spinner;
        this.alertService = alertService;
        this.fb = fb;
        this.posted = false;
    }
    StationManagersComponent.prototype.ngOnInit = function () {
        this.managersForm = this.createFormGroup();
        this.initialiseForm();
    };
    StationManagersComponent.prototype.createFormGroup = function () {
        return this.fb.group({
            stationManagers: this.fb.array([this.stationManager])
        });
    };
    Object.defineProperty(StationManagersComponent.prototype, "stationManager", {
        get: function () {
            return this.fb.group({
                areaName: this.fb.control({ value: '' }),
                id: this.fb.control({ value: '' }),
                currentManager: this.fb.control({ value: '' }),
                selectedManager: this.fb.control({ value: '' }, forms_1.Validators.compose([
                    forms_1.Validators.required,
                ]))
            });
        },
        enumerable: false,
        configurable: true
    });
    StationManagersComponent.prototype.addItem = function () {
        this.fval.stationManagers.push(this.stationManager);
    };
    StationManagersComponent.prototype.removeItem = function (index) {
        this.fval.stationManagers.removeAt(index);
    };
    StationManagersComponent.prototype.initialiseForm = function () {
        var _this = this;
        var n;
        this.managers.forEach(function (item, i) {
            _this.fval.stationManagers.controls[i].controls.areaName.setValue(item.areaName.replace(/_/g, ' ').toUpperCase());
            // this.fval.approvalItems.controls[i].controls.id.setValue(item.itemRequiringApprovalId);
            _this.fval.stationManagers.controls[i].controls.currentManager.setValue(item.manager.toUpperCase());
            _this.fval.stationManagers.controls[i].controls.selectedManager.setValue(item.manager.toUpperCase());
            _this.addItem();
            n = i + 1;
        });
        this.removeItem(n);
        this.disableForms();
        //       },
        //       error => console.log(error)
        //     );
        //   },
        //   err => console.log(err)
        // );
    };
    StationManagersComponent.prototype.revert = function () {
        this.managersForm.reset();
    };
    // revert() {
    //   this.approvalForm.reset();
    // }
    StationManagersComponent.prototype.refresh = function () {
        location.reload();
    };
    Object.defineProperty(StationManagersComponent.prototype, "fval", {
        get: function () {
            return this.managersForm.controls;
        },
        enumerable: false,
        configurable: true
    });
    StationManagersComponent.prototype.disableForms = function () {
        var _this = this;
        // console.log(this.approvals);
        this.managers.forEach(function (itm, i) {
            _this.fval.stationManagers.controls[i].disable();
        });
    };
    StationManagersComponent.prototype.enableEdit = function (val) {
        var _this = this;
        this.showLevels = val;
        this.managers.forEach(function (itm, i) {
            if (i === val) {
                _this.fval.stationManagers.controls[i].enable();
            }
        });
    };
    StationManagersComponent.prototype.saveLevel = function (index) {
    };
    StationManagersComponent = __decorate([
        core_1.Component({
            selector: 'app-station-managers',
            templateUrl: './station-managers.component.html',
            styleUrls: ['./station-managers.component.scss']
        })
    ], StationManagersComponent);
    return StationManagersComponent;
}());
exports.StationManagersComponent = StationManagersComponent;
