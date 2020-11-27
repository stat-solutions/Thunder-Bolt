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
// import { BsModalService } from 'ngx-bootstrap/modal';
// import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
var StationManagersComponent = /** @class */ (function () {
    function StationManagersComponent(others, authService, router, spinner, alertService, fb) {
        this.others = others;
        this.authService = authService;
        this.router = router;
        this.spinner = spinner;
        this.alertService = alertService;
        this.fb = fb;
        this.posted = false;
        this.User = this.authService.loggedInUserInfo();
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
        this.others.getAllTheStationLocations().subscribe(function (res) {
            _this.stationsManager = res;
            _this.stationsManager.forEach(function (item, i) {
                _this.fval.stationManagers.controls[i].controls.areaName.setValue(item.stationName.replace(/_/g, ' ').toUpperCase());
                _this.fval.approvalItems.controls[i].controls.id.setValue(item.theSationLocationId);
                _this.fval.stationManagers.controls[i].controls.currentManager.setValue(item.userName.toUpperCase());
                _this.fval.stationManagers.controls[i].controls.selectedManager.setValue(item.userName.toUpperCase());
                _this.addItem();
                n = i + 1;
            });
            _this.removeItem(n);
            _this.disableForms();
        }, function (error) { return console.log(error); });
    };
    StationManagersComponent.prototype.revert = function () {
        this.managersForm.reset();
    };
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
        this.stationsManager.forEach(function (itm, i) {
            _this.fval.stationManagers.controls[i].disable();
        });
    };
    StationManagersComponent.prototype.enableEdit = function (val) {
        var _this = this;
        this.showLevels = val;
        this.others.getUsersByLocation(this.fval.staationManagers.controls[val].controls.areaId.value).subscribe(function (res) {
            _this.users = res;
            // console.log(this.users);
        }, function (err) { return console.log(err); });
        this.fval.stationManagers.controls[val].enable();
    };
    StationManagersComponent.prototype.saveManager = function (index) {
        var _this = this;
        if (this.fval.sationManagers.controls[index].valid) {
            var data_1 = {
                theAreaLocationId: this.fval.sationManagers.controls[index].controls.stationId.value,
                userId: null
            };
            // console.log(this.fval.sationManagers.controls[index].controls.selectedManager.value);
            this.users.forEach(function (item) {
                if (item.userName.toUpperCase() === _this.fval.sationManagers.controls[index].controls.selectedManager.value) {
                    data_1.userId = item.userId;
                }
                else {
                    // console.log(item);
                }
            });
            this.fval.sationManagers.controls[index].disable();
            this.showLevels = null;
            // console.log(data);
            this.others.setStationManager(data_1).subscribe(function (res) {
                // console.log(res);
                _this.fval.sationManagers.controls[index].controls.currentManager.setValue(_this.fval.sationManagers.controls[index].controls.selectedManager.value);
            }, function (err) { return console.log(err); });
        }
        else {
            return;
        }
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
