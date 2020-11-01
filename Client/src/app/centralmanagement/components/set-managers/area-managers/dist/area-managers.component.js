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
    function AreaManagersComponent(others, router, spinner, alertService, fb) {
        this.others = others;
        this.router = router;
        this.spinner = spinner;
        this.alertService = alertService;
        this.fb = fb;
        this.posted = false;
        this.managers = [
            { areaName: 'Central Region', manager: 'mukwaya' },
            { areaName: 'Eastern Region', manager: 'matugga' },
        ];
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
    AreaManagersComponent.prototype.addItem = function () {
        this.fval.areaManagers.push(this.areaManager);
    };
    AreaManagersComponent.prototype.removeItem = function (index) {
        this.fval.areaManagers.removeAt(index);
    };
    AreaManagersComponent.prototype.initialiseForm = function () {
        var _this = this;
        var n;
        this.managers.forEach(function (item, i) {
            _this.fval.areaManagers.controls[i].controls.areaName.setValue(item.areaName.replace(/_/g, ' ').toUpperCase());
            // this.fval.approvalItems.controls[i].controls.id.setValue(item.itemRequiringApprovalId);
            _this.fval.areaManagers.controls[i].controls.currentManager.setValue(item.manager.toUpperCase());
            _this.fval.areaManagers.controls[i].controls.selectedManager.setValue(item.manager.toUpperCase());
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
    AreaManagersComponent.prototype.revert = function () {
        this.managersForm.reset();
    };
    // revert() {
    //   this.approvalForm.reset();
    // }
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
        this.managers.forEach(function (itm, i) {
            _this.fval.areaManagers.controls[i].disable();
        });
    };
    AreaManagersComponent.prototype.enableEdit = function (val) {
        var _this = this;
        this.showLevels = val;
        this.managers.forEach(function (itm, i) {
            if (i === val) {
                _this.fval.areaManagers.controls[i].enable();
            }
        });
    };
    AreaManagersComponent.prototype.saveLevel = function (index) {
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
