"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.TaxiLoanClientComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var custom_validator_1 = require("src/app/validators/custom-validator");
// import { DashboardUserService } from 'src/app/services/dashboard-user.service';
// import { StageNames } from 'src/app/models/stage-names';
var jwt_decode = require("jwt-decode");
var TaxiLoanClientComponent = /** @class */ (function () {
    // theStageNames: StageNames[];
    function TaxiLoanClientComponent(authService, 
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
    TaxiLoanClientComponent.prototype.ngOnInit = function () {
        this.userForm = this.createFormGroup();
        this.stageNames();
    };
    TaxiLoanClientComponent.prototype.createFormGroup = function () {
        return new forms_1.FormGroup({
            taxiCustomerNumberPlate: new forms_1.FormControl('', forms_1.Validators.compose([
                forms_1.Validators.required,
                forms_1.Validators.minLength(8),
                forms_1.Validators.maxLength(8),
                custom_validator_1.CustomValidator.patternValidator(/^(([U])([A-Z])([A-Z])(\s)([0-9])([0-9])([0-9])([A-Z]))$/, { beUgandanNumberPlate: true })
            ])),
            taxiCustomerColour: new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required])),
            taxiCustomerModel: new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required])),
            taxiCustomerYearOfManufacture: new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required])),
            taxiCustomerEngineNumber: new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required])),
            taxiCustomerFrontPhotoUrl: new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required])),
            taxiCustomerRearPhotoUrl: new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required])),
            taxiCustomerTheBodabodaRearPhotoUrl: new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required]))
        });
    };
    TaxiLoanClientComponent.prototype.revert = function () {
        this.userForm.reset();
    };
    TaxiLoanClientComponent.prototype.resetStageNames = function () {
        this.userForm.controls.stage_name.reset();
    };
    Object.defineProperty(TaxiLoanClientComponent.prototype, "fval", {
        get: function () {
            return this.userForm.controls;
        },
        enumerable: false,
        configurable: true
    });
    TaxiLoanClientComponent.prototype.stageNames = function () {
        // this.adminUserService.getStageNames(jwt_decode(this.authService.getJwtToken()).user_station).subscribe(
        //   data => {
        //     this.userForm.controls.stage_name.reset();
        //     this.theStageNames = data;
        //     // this.alertService.success({ html: '<b> User Roles Updated</b>' + '<br/>' });
        //   },
        //   (error: string) => {
        //     this.errored = true;
        //     this.serviceErrors = error;
        //     this.alertService.danger({
        //       html: '<b>' + this.serviceErrors + '</b>' + '<br/>'
        //     });
        //   }
        // );
    };
    TaxiLoanClientComponent.prototype.onSubmit = function () {
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
            // this.adminUserService.registerCustomer(this.userForm).subscribe(
            //   () => {
            //     this.posted = true;
            //     this.spinner.hide();
            //     // tslint:disable-next-line:max-line-length
            //     this.alertService.success({
            //       html:
            //         '<b>Customer Registration was Successful!!</b>' +
            //         '</br>' +
            //         'Please proceed to lend him'
            //     });
            //     this.revert();
            //     setTimeout(() => {
            //       this.router.navigate(['dashboarduser/loans']);
            //     }, 2000);
            //   },
            //   (error: string) => {
            //     this.errored = true;
            //     this.serviceErrors = error;
            //     this.alertService.danger({
            //       html: '<b>' + this.serviceErrors + '</b>' + '<br/>'
            //     });
            //     this.spinner.hide();
            //   }
            // );
        }
    };
    TaxiLoanClientComponent = __decorate([
        core_1.Component({
            selector: 'app-taxi-loan-client',
            templateUrl: './taxi-loan-client.component.html',
            styleUrls: ['./taxi-loan-client.component.scss']
        })
    ], TaxiLoanClientComponent);
    return TaxiLoanClientComponent;
}());
exports.TaxiLoanClientComponent = TaxiLoanClientComponent;
