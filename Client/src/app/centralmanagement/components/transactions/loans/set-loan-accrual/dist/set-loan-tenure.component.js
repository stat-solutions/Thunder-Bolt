"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.SetLoanTenureComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var custom_validator_1 = require("src/app/validators/custom-validator");
var SetLoanTenureComponent = /** @class */ (function () {
    function SetLoanTenureComponent(authService, spinner, router, alertService) {
        this.authService = authService;
        this.spinner = spinner;
        this.router = router;
        this.alertService = alertService;
    }
    SetLoanTenureComponent.prototype.ngOnInit = function () {
        this.userForm = this.createFormGroup();
    };
    SetLoanTenureComponent.prototype.createFormGroup = function () {
        return new forms_1.FormGroup({
            loanTenure: new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required, custom_validator_1.CustomValidator.maxValue(100)])),
            station_name: new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required])),
            loan_product: new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required]))
        });
    };
    SetLoanTenureComponent.prototype.revert = function () {
        this.userForm.reset();
    };
    Object.defineProperty(SetLoanTenureComponent.prototype, "fval", {
        get: function () {
            return this.userForm.controls;
        },
        enumerable: false,
        configurable: true
    });
    SetLoanTenureComponent.prototype.setRate = function () {
        this.spinner.show();
    };
    SetLoanTenureComponent = __decorate([
        core_1.Component({
            selector: 'app-set-loan-tenure',
            templateUrl: './set-loan-tenure.component.html',
            styleUrls: ['./set-loan-tenure.component.scss']
        })
    ], SetLoanTenureComponent);
    return SetLoanTenureComponent;
}());
exports.SetLoanTenureComponent = SetLoanTenureComponent;
