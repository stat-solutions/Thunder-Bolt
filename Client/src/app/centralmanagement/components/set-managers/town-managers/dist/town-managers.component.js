"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.TownManagersComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
// import { BsModalService } from 'ngx-bootstrap/modal';
// import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
var TownManagersComponent = /** @class */ (function () {
    function TownManagersComponent(others, authService, router, spinner, alertService, fb) {
        this.others = others;
        this.authService = authService;
        this.router = router;
        this.spinner = spinner;
        this.alertService = alertService;
        this.fb = fb;
        this.posted = false;
        this.User = this.authService.loggedInUserInfo();
    }
    TownManagersComponent.prototype.ngOnInit = function () {
        this.managersForm = this.createFormGroup();
        this.initialiseForm();
    };
    TownManagersComponent.prototype.createFormGroup = function () {
        return this.fb.group({
            townManagers: this.fb.array([this.townManager])
        });
    };
    Object.defineProperty(TownManagersComponent.prototype, "townManager", {
        get: function () {
            return this.fb.group({
                townName: this.fb.control({ value: '' }),
                townId: this.fb.control({ value: '' }),
                currentManager: this.fb.control({ value: '' }),
                selectedManager: this.fb.control({ value: '' }, forms_1.Validators.compose([
                    forms_1.Validators.required,
                ]))
            });
        },
        enumerable: false,
        configurable: true
    });
    TownManagersComponent.prototype.addItem = function () {
        this.fval.townManagers.push(this.townManager);
    };
    TownManagersComponent.prototype.removeItem = function (index) {
        this.fval.townManagers.removeAt(index);
    };
    TownManagersComponent.prototype.initialiseForm = function () {
        var _this = this;
        var n;
        this.others.getAllTheTownLocations().subscribe(function (res) {
            _this.townsManager = res;
            // console.log(this.townsManager);
            //         theTownLocationId: 1100
            // townName: "Maganjo"
            // userName: "Baziraked Augustine Googo"
            _this.townsManager.forEach(function (item, i) {
                _this.fval.townManagers.controls[i].controls.townName.setValue(item.townName.replace(/_/g, ' ').toUpperCase());
                _this.fval.townManagers.controls[i].controls.townId.setValue(item.theTownLocationId);
                _this.fval.townManagers.controls[i].controls.currentManager.setValue(item.userName.toUpperCase());
                _this.fval.townManagers.controls[i].controls.selectedManager.setValue(item.userName.toUpperCase());
                _this.addItem();
                n = i + 1;
            });
            _this.removeItem(n);
            _this.disableForms();
        }, function (err) { return console.log(err); });
    };
    TownManagersComponent.prototype.revert = function () {
        this.managersForm.reset();
    };
    TownManagersComponent.prototype.refresh = function () {
        location.reload();
    };
    Object.defineProperty(TownManagersComponent.prototype, "fval", {
        get: function () {
            return this.managersForm.controls;
        },
        enumerable: false,
        configurable: true
    });
    TownManagersComponent.prototype.disableForms = function () {
        var _this = this;
        // console.log(this.approvals);
        this.townsManager.forEach(function (itm, i) {
            _this.fval.townManagers.controls[i].disable();
        });
    };
    TownManagersComponent.prototype.enableEdit = function (val) {
        var _this = this;
        this.showLevels = val;
        this.townsManager.forEach(function (itm, i) {
            if (i === val) {
                _this.fval.townManagers.controls[i].enable();
            }
        });
        this.others.getUsersByLocation(this.fval.townManagers.controls[val].controls.townId.value).subscribe(function (res) {
            _this.users = res;
            // console.log(this.users);
        }, function (err) { return console.log(err); });
        this.fval.townManagers.controls[val].enable();
    };
    TownManagersComponent.prototype.saveManager = function (index) {
        var _this = this;
        if (this.fval.townManagers.controls[index].valid) {
            var data_1 = {
                theTownLocationId: this.fval.townManagers.controls[index].controls.townId.value,
                userId: null
            };
            // console.log(this.fval.townManagers.controls[index].controls.selectedManager.value);
            this.users.forEach(function (item) {
                if (item.userName.toUpperCase() === _this.fval.townManagers.controls[index].controls.selectedManager.value) {
                    data_1.userId = item.userId;
                }
                else {
                    // console.log(item);
                }
            });
            this.fval.townManagers.controls[index].disable();
            this.showLevels = null;
            // console.log(data);
            this.others.setTownManager(data_1).subscribe(function (res) {
                // console.log(res);
                _this.fval.townManagers.controls[index].controls.currentManager.setValue(_this.fval.townManagers.controls[index].controls.selectedManager.value);
            }, function (err) { return console.log(err); });
        }
        else {
            return;
        }
    };
    TownManagersComponent = __decorate([
        core_1.Component({
            selector: 'app-town-managers',
            templateUrl: './town-managers.component.html',
            styleUrls: ['./town-managers.component.scss']
        })
    ], TownManagersComponent);
    return TownManagersComponent;
}());
exports.TownManagersComponent = TownManagersComponent;
