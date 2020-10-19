"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.EditPersonalInfoComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var custom_validator_1 = require("src/app/validators/custom-validator");
// import { DashboardUserService } from 'src/app/services/dashboard-user.service';
// import { StageNames } from 'src/app/models/stage-names';
var jwt_decode = require("jwt-decode");
var EditPersonalInfoComponent = /** @class */ (function () {
    // theStageNames: StageNames[];
    function EditPersonalInfoComponent(authService, 
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
    EditPersonalInfoComponent.prototype.ngOnInit = function () {
        this.userForm = this.createFormGroup();
        this.stageNames();
    };
    EditPersonalInfoComponent.prototype.createFormGroup = function () {
        return new forms_1.FormGroup({
            customer_name: new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required])),
            main_contact_number1: new forms_1.FormControl('', forms_1.Validators.compose([
                forms_1.Validators.required,
                custom_validator_1.CustomValidator.patternValidator(/^(([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9]))$/, { hasNumber: true }),
            ])),
            main_contact_number2: new forms_1.FormControl('', forms_1.Validators.compose([
                forms_1.Validators.required,
                custom_validator_1.CustomValidator.patternValidator(/^(([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9]))$/, { hasNumber: true }),
            ])),
            id_type: new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required])),
            id_number: new forms_1.FormControl('', forms_1.Validators.compose([
            // Validators.required,
            // CustomValidator.patternValidator(
            // tslint:disable-next-line: max-line-length
            //   /^(([a-zA-Z])([a-zA-Z])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])([a-zA-Z])([a-zA-Z])([a-zA-Z])([a-zA-Z])([a-zA-Z]))$/,
            //   { nationalIdCheck: true }
            // ),
            ])),
            homeDetails: new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required])),
            clientPhotoUrl: new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required])),
            idPhotoUrl: new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required])),
            secretPin: new forms_1.FormControl('', forms_1.Validators.compose([
                // 1. Password Field is Required
                forms_1.Validators.required,
                // 2. check whether the entered password has a number
                custom_validator_1.CustomValidator.patternValidator(/^(([0-9])([0-9])([0-9])([0-9]))$/, {
                    hasNumber: true
                }),
                // 3. check whether the entered password has upper case letter
                // CustomValidatorInitialCompanySetup.patternValidator(/[A-Z]/, { hasCapitalCase: true }),
                // 4. check whether the entered password has a lower-case letter
                // CustomValidatorInitialCompanySetup.patternValidator(/[a-z]/, { hasSmallCase: true }),
                // 5. check whether the entered password has a special character
                // CustomValidatorInitialCompanySetup.
                //   patternValidator(/[!@#$%^&*_+-=;':"|,.<>/?/<mailto:!@#$%^&*_+-=;':"|,.<>/?]/, { hasSpecialCharacters: true }),
                // 6. Has a length of exactly 4 digits
                forms_1.Validators.minLength(4),
                forms_1.Validators.maxLength(4),
            ])),
            clientComment: new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required]))
        });
    };
    //toggle visibility of password field
    EditPersonalInfoComponent.prototype.toggleFieldType = function () {
        this.fieldType = !this.fieldType;
    };
    EditPersonalInfoComponent.prototype.revert = function () {
        this.userForm.reset();
    };
    EditPersonalInfoComponent.prototype.resetStageNames = function () {
        this.userForm.controls.stage_name.reset();
    };
    Object.defineProperty(EditPersonalInfoComponent.prototype, "fval", {
        get: function () {
            return this.userForm.controls;
        },
        enumerable: false,
        configurable: true
    });
    EditPersonalInfoComponent.prototype.stageNames = function () {
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
    EditPersonalInfoComponent.prototype.onSubmit = function () {
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
    EditPersonalInfoComponent = __decorate([
        core_1.Component({
            selector: 'app-edit-personal-info',
            templateUrl: './edit-personal-info.component.html',
            styleUrls: ['./edit-personal-info.component.scss']
        })
    ], EditPersonalInfoComponent);
    return EditPersonalInfoComponent;
}());
exports.EditPersonalInfoComponent = EditPersonalInfoComponent;
