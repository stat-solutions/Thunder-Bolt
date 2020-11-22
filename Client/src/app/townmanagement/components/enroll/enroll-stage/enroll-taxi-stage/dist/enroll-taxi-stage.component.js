"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.EnrollTaxiStageComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var custom_validator_1 = require("src/app/validators/custom-validator");
var jwt_decode = require("jwt-decode");
var EnrollTaxiStageComponent = /** @class */ (function () {
    function EnrollTaxiStageComponent(authService, others, spinner, router, alertService) {
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
    EnrollTaxiStageComponent.prototype.ngOnInit = function () {
        this.userForm = this.createFormGroup();
        this.taxiParks();
    };
    EnrollTaxiStageComponent.prototype.createFormGroup = function () {
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
    // toggle visibility of password field
    EnrollTaxiStageComponent.prototype.toggleFieldType = function () {
        this.fieldType = !this.fieldType;
    };
    EnrollTaxiStageComponent.prototype.revert = function () {
        this.userForm.reset();
    };
    EnrollTaxiStageComponent.prototype.resetStageNames = function () {
        this.userForm.controls.stage_name.reset();
    };
    Object.defineProperty(EnrollTaxiStageComponent.prototype, "fval", {
        get: function () {
            return this.userForm.controls;
        },
        enumerable: false,
        configurable: true
    });
    EnrollTaxiStageComponent.prototype.taxiParks = function () {
        // this.others.
    };
    EnrollTaxiStageComponent.prototype.onSubmit = function () {
        this.submitted = true;
        this.spinner.show();
        if (this.userForm.invalid === true) {
            return;
        }
        else {
            this.userForm.patchValue({
                user_station: jwt_decode(this.authService.getJwtToken()).user_station,
                user_id: jwt_decode(this.authService.getJwtToken()).user_id
            });
        }
    };
    EnrollTaxiStageComponent = __decorate([
        core_1.Component({
            selector: 'app-enroll-taxi-stage',
            templateUrl: './enroll-taxi-stage.component.html',
            styleUrls: ['./enroll-taxi-stage.component.scss']
        })
    ], EnrollTaxiStageComponent);
    return EnrollTaxiStageComponent;
}());
exports.EnrollTaxiStageComponent = EnrollTaxiStageComponent;
