"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.EnrollTaxiParkComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var EnrollTaxiParkComponent = /** @class */ (function () {
    function EnrollTaxiParkComponent(authService, others, spinner, router, alertService) {
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
    EnrollTaxiParkComponent.prototype.ngOnInit = function () {
        this.userForm = this.createFormGroup();
    };
    EnrollTaxiParkComponent.prototype.createFormGroup = function () {
        return new forms_1.FormGroup({
            taxiParkName: new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required])),
            taxiParkTown: new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required]))
        });
    };
    EnrollTaxiParkComponent.prototype.revert = function () {
        this.userForm.reset();
    };
    EnrollTaxiParkComponent.prototype.resetStageNames = function () {
        this.userForm.controls.stage_name.reset();
    };
    Object.defineProperty(EnrollTaxiParkComponent.prototype, "fval", {
        get: function () {
            return this.userForm.controls;
        },
        enumerable: false,
        configurable: true
    });
    EnrollTaxiParkComponent.prototype.onSubmit = function () {
        this.submitted = true;
        this.spinner.show();
        if (this.userForm.invalid === true) {
            return;
        }
        else {
            var data = {
                "taxiParkName": "NEW TAXI PARK",
                "taxiParkLocation": "KAMPALA TOWN",
                "userId": 1000000000
            };
            this.others.
            ;
        }
    };
    EnrollTaxiParkComponent = __decorate([
        core_1.Component({
            selector: 'app-enroll-taxi-park',
            templateUrl: './enroll-taxi-park.component.html',
            styleUrls: ['./enroll-taxi-park.component.scss']
        })
    ], EnrollTaxiParkComponent);
    return EnrollTaxiParkComponent;
}());
exports.EnrollTaxiParkComponent = EnrollTaxiParkComponent;
