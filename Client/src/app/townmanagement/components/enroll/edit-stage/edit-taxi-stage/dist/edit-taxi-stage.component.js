"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.EditTaxiStageComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var custom_validator_1 = require("src/app/validators/custom-validator");
var EditTaxiStageComponent = /** @class */ (function () {
    function EditTaxiStageComponent(authService, others, spinner, router, alertService) {
        this.authService = authService;
        this.others = others;
        this.spinner = spinner;
        this.router = router;
        this.alertService = alertService;
        this.registered = false;
        this.submitted = false;
        this.errored = false;
        this.posted = false;
        this.serviceErrors = {};
        this.User = this.authService.loggedInUserInfo();
    }
    EditTaxiStageComponent.prototype.ngOnInit = function () {
        this.userForm = this.createFormGroup();
        this.taxiParks();
    };
    EditTaxiStageComponent.prototype.createFormGroup = function () {
        return new forms_1.FormGroup({
            taxiStageName: new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required])),
            park: new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required])),
            taxiStageChairmanName: new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required])),
            taxiStageChairmanPhone1: new forms_1.FormControl('', forms_1.Validators.compose([
                forms_1.Validators.required,
                custom_validator_1.CustomValidator.patternValidator(/^(([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9]))$/, { hasNumber: true })
            ]))
        });
    };
    EditTaxiStageComponent.prototype.initiateForm = function (val) {
        var _this = this;
        // console.log(val);
        if (val) {
            this.taxiStages.forEach(function (stage) {
                if (stage.taxiStageName.toUpperCase() === val.toUpperCase()) {
                    _this.stageId = stage.taxiStageId;
                    _this.parks.forEach(function (park) {
                        if (park.taxiParkId === stage.fkTaxiParkIdTaxiStage) {
                            _this.fval.park.setValue(park.taxiParkName);
                            _this.fval.park.disable();
                        }
                    });
                    _this.fval.taxiStageChairmanName.setValue(stage.taxiStageChairmanName);
                    _this.fval.taxiStageChairmanPhone1.setValue(stage.taxiStageChairmanPhone1);
                }
                else {
                    if (_this.fval.park) {
                        return;
                    }
                    else {
                        _this.errored = true;
                        _this.alertService.danger({
                            html: '<b> the taxi stage chose does not exist </b>'
                        });
                    }
                }
            });
        }
        else {
            return;
        }
    };
    // toggle visibility of password field
    EditTaxiStageComponent.prototype.toggleFieldType = function () {
        this.fieldType = !this.fieldType;
    };
    EditTaxiStageComponent.prototype.revert = function () {
        this.userForm.reset();
    };
    EditTaxiStageComponent.prototype.resetStageNames = function () {
        this.userForm.controls.stage_name.reset();
    };
    Object.defineProperty(EditTaxiStageComponent.prototype, "fval", {
        get: function () {
            return this.userForm.controls;
        },
        enumerable: false,
        configurable: true
    });
    EditTaxiStageComponent.prototype.taxiParks = function () {
        var _this = this;
        this.others.getTaxiParks().subscribe(function (res) { return _this.parks = res; }, function (err) { return console.log(err); });
        this.others.getTaxiStages().subscribe(function (res) { return _this.taxiStages = res.filter(function (stage) { return stage.bodabodaStageName !== null && stage.fkStageClusterIdBodabodaStage !== null; }); }, function (err) { return console.log(status); });
        //     fkApprovalDetailsIdTaxiPark: 125
        // taxiParkId: 1500
        // taxiParkLocation: "KAMPALA TOWN"
        // taxiParkName: "NEW TAXI PARK"
        // taxiParkStatus: 2
        // fkApprovalDetailsIdTaxiStage: 126
        // fkTaxiParkIdTaxiStage: 1500
        // taxiStageChairmanName: "MUKAMA GILBERT"
        // taxiStageChairmanPhone1: "0781331616"
        // taxiStageId: 1600
        // taxiStageName: "KYINYARWANDA"
        // taxiStageStatus: 2
    };
    EditTaxiStageComponent.prototype.onSubmit = function () {
        var _this = this;
        this.submitted = true;
        this.spinner.show();
        this.errored = false;
        this.posted = false;
        if (this.userForm.invalid === true) {
            return;
        }
        else {
            var data_1 = {
                taxiStageId: this.stageId,
                taxiStageName: this.fval.taxiStageName.value.toUpperCase(),
                taxiStageChairmanName: this.fval.taxiStageChairmanName.value.toUpperCase(),
                taxiStageChairmanPhone1: this.fval.taxiStageChairmanPhone1.value,
                taxiParkId: null,
                userId: this.User.userId
            };
            this.parks.forEach(function (park) {
                if (park.taxiParkName === _this.fval.park.value) {
                    data_1.taxiParkId = park.taxiParkId;
                }
            });
            // console.log(data);
            this.spinner.hide();
            if (data_1.taxiParkId === null) {
                // console.log('errored')
                this.errored = true;
                this.alertService.danger({
                    html: '<b> the taxi park chose does not exist </b>'
                });
                // this.errored = false;
                this.fval.park.setValue('');
                return;
            }
            else {
                this.others.updateTaxiStage(data_1).subscribe(function (res) {
                    _this.posted = true;
                    _this.alertService.success({
                        html: '<b>' + data_1.taxiStageName + ' Was Updated Successfully</b>'
                    });
                    // this.fval.taxiParkName.setValue('');
                    _this.taxiParks();
                    _this.revert();
                }, function (err) {
                    _this.errored = true;
                    _this.alertService.danger({
                        html: '<b>' + err.error.error.message + '</b>'
                    });
                });
            }
        }
    };
    EditTaxiStageComponent = __decorate([
        core_1.Component({
            selector: 'app-edit-taxi-stage',
            templateUrl: './edit-taxi-stage.component.html',
            styleUrls: ['./edit-taxi-stage.component.scss']
        })
    ], EditTaxiStageComponent);
    return EditTaxiStageComponent;
}());
exports.EditTaxiStageComponent = EditTaxiStageComponent;
