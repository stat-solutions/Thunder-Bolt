"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CompanySetupComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var custom_validator_1 = require("src/app/validators/custom-validator");
var CompanySetupComponent = /** @class */ (function () {
    function CompanySetupComponent(others, spinner, router, alertService, authService) {
        this.others = others;
        this.spinner = spinner;
        this.router = router;
        this.alertService = alertService;
        this.authService = authService;
        this.companyCreated = false;
        this.submitted = false;
        this.errored = false;
        this.posted = false;
        this.serviceErrors = {};
        // companyInfo: CompanyInfo;
        this.User = this.authService.loggedInUserInfo();
    }
    CompanySetupComponent.prototype.ngOnInit = function () {
        this.companyForm = this.createFormGroup();
        this.setCompanyValues();
        this.disableForm();
    };
    CompanySetupComponent.prototype.createFormGroup = function () {
        return new forms_1.FormGroup({
            companyName: new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required])),
            companyEmail1: new forms_1.FormControl('', forms_1.Validators.compose([
                forms_1.Validators.required,
                forms_1.Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
            ])),
            companyEmail2: new forms_1.FormControl('', forms_1.Validators.compose([
                forms_1.Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
            ])),
            companyBoxNumber: new forms_1.FormControl('', forms_1.Validators.compose([
                forms_1.Validators.required,
            ])),
            companyCityLocation: new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required])),
            companyCountryLocation: new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required])),
            companyRegionLocation: new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required])),
            companyOfficeFloor: new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required])),
            companyPlotNumber: new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required])),
            companyStreetBuilding: new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required])),
            companyPhoneContact1: new forms_1.FormControl('', forms_1.Validators.compose([
                forms_1.Validators.required,
                custom_validator_1.CustomValidator.patternValidator(/^(([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9]))$/, { hasNumber: true })
            ])),
            companyPhoneContact2: new forms_1.FormControl('', forms_1.Validators.compose([
                custom_validator_1.CustomValidator.patternValidator(/^(([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9]))$/, { hasNumber: true })
            ])),
            // companyLogo: new FormControl(
            //   '',
            //   Validators.compose([
            //     Validators.required
            //   ])
            // ),
            companyStreetName: new forms_1.FormControl('', forms_1.Validators.compose([
            // Validators.required
            ]))
        });
    };
    CompanySetupComponent.prototype.revert = function () {
        this.companyForm.reset();
    };
    Object.defineProperty(CompanySetupComponent.prototype, "fval", {
        get: function () {
            return this.companyForm.controls;
        },
        enumerable: false,
        configurable: true
    });
    // toggle visibility of password field
    CompanySetupComponent.prototype.toggleFieldType = function () {
        this.fieldType = !this.fieldType;
    };
    CompanySetupComponent.prototype.returnHome = function () {
        var _this = this;
        this.spinner.hide();
        this.revert();
        setTimeout(function () {
            _this.router.navigate(['admin/dashboard']);
        }, 2000);
    };
    CompanySetupComponent.prototype.disableForm = function () {
        return this.companyForm.disable();
    };
    CompanySetupComponent.prototype.enableEdit = function () {
        return this.companyForm.enable();
    };
    CompanySetupComponent.prototype.setCompanyValues = function () {
        var _this = this;
        this.others.getCompanyInfo().subscribe(function (item) {
            // this.companyCreated = true;
            console.log(item);
            // this.companyForm.value = item[0];
            _this.fval.companyName.setValue(item[0].companyName);
            _this.fval.companyBoxNumber.setValue(item[0].companyBoxNumber);
            _this.fval.companyCityLocation.setValue(item[0].companyCityLocation);
            _this.fval.companyCountryLocation.setValue(item[0].companyCountryLocation);
            _this.fval.companyRegionLocation.setValue(item[0].companyRegionLocation);
            _this.fval.companyOfficeFloor.setValue(item[0].companyOfficeFloor);
            _this.fval.companyPlotNumber.setValue(item[0].companyPlotNumber);
            _this.fval.companyStreetBuilding.setValue(item[0].companyStreetBuilding);
            _this.fval.companyEmail1.setValue(item[0].companyEmail1);
            _this.fval.companyEmail2.setValue(item[0].companyEmail2);
            _this.fval.companyPhoneContact1.setValue(item[0].companyPhoneContact1);
            _this.fval.companyPhoneContact2.setValue(item[0].companyPhoneContact2);
        }, function (error) {
            //
        });
    };
    CompanySetupComponent.prototype.createCompany = function () {
        var _this = this;
        this.submitted = true;
        this.spinner.show();
        if (this.companyForm.invalid === true) {
            return;
        }
        else {
            // have to edit
            var companyDetails = {
                companyName: this.fval.companyName.value.toUpperCase(),
                companyBoxNumber: this.fval.companyBoxNumber.value.toUpperCase(),
                companyCityLocation: this.fval.companyCityLocation.value.toUpperCase(),
                companyCountryLocation: this.fval.companyCountryLocation.value.toUpperCase(),
                companyRegionLocation: this.fval.companyRegionLocation.value.toUpperCase(),
                companyOfficeFloor: this.fval.companyOfficeFloor.value.toUpperCase(),
                companyPlotNumber: this.fval.companyPlotNumber.value.toUpperCase(),
                companyStreetBuilding: this.fval.companyStreetBuilding.value.toUpperCase(),
                companyEmail1: this.fval.companyEmail1.value,
                companyEmail2: this.fval.companyEmail2.value,
                companyPhoneContact1: this.fval.companyPhoneContact1.value,
                companyPhoneContact2: this.fval.companyPhoneContact2.value,
                userId: this.User.userId
            };
            console.log(companyDetails);
            this.others.createCompany(companyDetails).subscribe(function () {
                _this.posted = true;
                _this.spinner.hide();
                _this.alertService.success({
                    html: '<b>User Company setup was Successful</b>' +
                        '</br>'
                });
                setTimeout(function () {
                    _this.router.navigate(['admin/dashboard']);
                }, 3000);
            }, function (error) {
                _this.spinner.hide();
                _this.serviceErrors = error;
                _this.alertService.danger({
                    html: '<b>' + _this.serviceErrors + '</b>' + '<br/>'
                });
                // setTimeout(() => {
                //         location.reload();
                //       }, 3000);
                console.log(error);
                _this.spinner.hide();
            });
            this.spinner.hide();
            this.companyCreated = true;
        }
    };
    CompanySetupComponent = __decorate([
        core_1.Component({
            selector: 'app-company-setup',
            templateUrl: './company-setup.component.html',
            styleUrls: ['./company-setup.component.scss']
        })
    ], CompanySetupComponent);
    return CompanySetupComponent;
}());
exports.CompanySetupComponent = CompanySetupComponent;
