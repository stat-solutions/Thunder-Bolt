"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.BodaLoanClientComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
// import { DashboardUserService } from 'src/app/services/dashboard-user.service';
// import { StageNames } from 'src/app/models/stage-names';
var jwt_decode = require("jwt-decode");
var BodaLoanClientComponent = /** @class */ (function () {
    // theStageNames: StageNames[];
    function BodaLoanClientComponent(authService, 
    // private adminUserService: DashboardUserService,
    spinner, router, alertService) {
        this.authService = authService;
        this.spinner = spinner;
        this.router = router;
        this.alertService = alertService;
        this.registered = false;
        this.submitted = false;
        this.errored = false;
        this.posted = false;
        this.serviceErrors = {};
    }
    BodaLoanClientComponent.prototype.ngOnInit = function () {
        this.userForm = this.createFormGroup();
        this.stageNames();
    };
    BodaLoanClientComponent.prototype.createFormGroup = function () {
        return new forms_1.FormGroup({
            microloanCustomerGaurantor1: new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required])),
            microloanCustomerGaurantor2: new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required])),
            microloanCustomerGaurantor3: new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required])),
            microloanCustomerSecurity1: new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required])),
            microloanCustomerSecurity2: new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required])),
            microloanCustomerSecurityLocation1: new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required])),
            microloanCustomerSecurityLocation2: new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required])),
            microloanCustomerSecurity1PhotoUrl: new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required])),
            microloanCustomerSecurity2PhotoUrl: new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required]))
        });
    };
    BodaLoanClientComponent.prototype.revert = function () {
        this.userForm.reset();
    };
    BodaLoanClientComponent.prototype.resetStageNames = function () {
        this.userForm.controls.stage_name.reset();
    };
    Object.defineProperty(BodaLoanClientComponent.prototype, "fval", {
        get: function () {
            return this.userForm.controls;
        },
        enumerable: false,
        configurable: true
    });
    BodaLoanClientComponent.prototype.stageNames = function () {
    };
    BodaLoanClientComponent.prototype.onSubmit = function () {
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
    BodaLoanClientComponent = __decorate([
        core_1.Component({
            selector: 'app-boda-loan-client',
            templateUrl: './boda-loan-client.component.html',
            styleUrls: ['./boda-loan-client.component.scss']
        })
    ], BodaLoanClientComponent);
    return BodaLoanClientComponent;
}());
exports.BodaLoanClientComponent = BodaLoanClientComponent;
