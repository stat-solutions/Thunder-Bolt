"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CreateStationComponent = void 0;
var core_1 = require("@angular/core");
// import { BsModalService } from 'ngx-bootstrap/modal';
// import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
var CreateStationComponent = /** @class */ (function () {
    function CreateStationComponent(authService, others, router, spinner, alertService, fb) {
        this.authService = authService;
        this.others = others;
        this.router = router;
        this.spinner = spinner;
        this.alertService = alertService;
        this.fb = fb;
        this.approvedStations = [];
        this.posted = false;
        this.User = this.authService.loggedInUserInfo();
    }
    CreateStationComponent.prototype.ngOnInit = function () {
        this.userForm = this.createFormGroup();
        this.fval.selectAll.setValue(false);
        this.initialiseForm();
    };
    CreateStationComponent.prototype.createFormGroup = function () {
        return this.fb.group({
            selectedStations: this.fb.array([this.selectStation]),
            selectAll: this.fb.control({})
        });
    };
    Object.defineProperty(CreateStationComponent.prototype, "selectStation", {
        get: function () {
            return this.fb.group({
                stationId: this.fb.control({ value: '' }),
                stationName: this.fb.control({ value: '' }),
                approved: this.fb.control({})
            });
        },
        enumerable: false,
        configurable: true
    });
    CreateStationComponent.prototype.addItem = function () {
        // this.unitForm.controls.bussinessUnits  as FormArray
        this.fval.selectedStations.push(this.selectStation);
    };
    CreateStationComponent.prototype.removeItem = function (index) {
        this.fval.selectedStations.removeAt(index);
    };
    CreateStationComponent.prototype.initialiseForm = function () {
        var _this = this;
        var n;
        this.others.getStations().subscribe(function (units) {
            _this.approvedStations = units;
            // console.log(this.approvedStations)
            _this.approvedStations.forEach(function (item, i) {
                _this.fval.selectedStations.controls[i].controls.stationId.setValue(item.stationId);
                _this.fval.selectedStations.controls[i].controls.stationName.setValue(item.stationName);
                _this.fval.selectedStations.controls[i].controls.approved.setValue(false);
                _this.addItem();
                n = i + 1;
            });
            _this.removeItem(n);
        });
    };
    CreateStationComponent.prototype.checkAllItems = function (val) {
        var _this = this;
        if (val === true) {
            this.approvedStations.forEach(function (item, i) {
                _this.fval.selectedStations.controls[i].controls.approved.setValue(val);
            });
        }
        else {
            this.approvedStations.forEach(function (item, i) {
                _this.fval.selectedStations.controls[i].controls.approved.setValue(false);
            });
        }
    };
    CreateStationComponent.prototype.deselectAll = function (val) {
        // console.log(this.fval.approveAreas["controls"][val]["controls"].approved.value)
        if (this.fval.selectedStations.controls[val].controls.approved.value === true) {
            this.fval.selectAll.setValue(false);
        }
    };
    CreateStationComponent.prototype.revert = function () {
        this.userForm.reset();
    };
    CreateStationComponent.prototype.refresh = function () {
        this.userForm = this.createFormGroup();
        this.fval.selectAll.setValue(false);
        this.initialiseForm();
    };
    Object.defineProperty(CreateStationComponent.prototype, "fval", {
        get: function () {
            return this.userForm.controls;
        },
        enumerable: false,
        configurable: true
    });
    CreateStationComponent.prototype.disableForm = function () {
        return this.userForm.disable();
    };
    CreateStationComponent.prototype.enableEdit = function () {
        return this.userForm.enable();
    };
    CreateStationComponent.prototype.approveItems = function () {
        var _this = this;
        var stationsSelected = [];
        this.spinner.show();
        this.approvedStations.forEach(function (item, i) {
            if (_this.fval.selectedStations.controls[i].controls.approved.value === true) {
                stationsSelected.push({
                    stationId: item.stationId,
                    theTownLocationId: _this.User.userLocationId,
                    userId: _this.User.userId
                });
            }
        });
        // console.log(stationsSelected);
        if (stationsSelected.length > 0) {
            this.others.createTheStation(stationsSelected).subscribe(function (res) {
                _this.posted = true;
                _this.alertService.success({
                    html: '<b> Stations were  set successfully</b>'
                });
                _this.userForm = _this.createFormGroup();
                _this.fval.selectAll.setValue(false);
                _this.initialiseForm();
                _this.spinner.hide();
            }, function (err) {
                _this.errored = true;
                _this.spinner.hide();
                _this.alertService.danger({
                    html: '<b>Something went wrong</b>'
                });
            });
        }
        else {
            this.errored = true;
            this.spinner.hide();
            this.alertService.danger({
                html: '<b> Please select something </b>'
            });
            return;
        }
    };
    CreateStationComponent.prototype.cancelSelection = function () {
        var _this = this;
        this.revert();
        setTimeout(function () {
            _this.router.navigate(['townmanagement']);
        }, 3000);
    };
    CreateStationComponent = __decorate([
        core_1.Component({
            selector: 'app-create-station',
            templateUrl: './create-station.component.html',
            styleUrls: ['./create-station.component.scss']
        })
    ], CreateStationComponent);
    return CreateStationComponent;
}());
exports.CreateStationComponent = CreateStationComponent;
