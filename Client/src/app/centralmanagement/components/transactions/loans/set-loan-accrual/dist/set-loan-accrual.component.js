"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.SetLoanAcrualComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var custom_validator_1 = require("src/app/validators/custom-validator");
var SetLoanAcrualComponent = /** @class */ (function () {
    function SetLoanAcrualComponent(authService, others, spinner, router, alertService) {
        this.authService = authService;
        this.others = others;
        this.spinner = spinner;
        this.router = router;
        this.alertService = alertService;
        this.User = this.authService.loggedInUserInfo();
    }
    SetLoanAcrualComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.userForm = this.createFormGroup();
        this.others.getAllTheStationLocations().subscribe(function (res) {
            _this.stations = res;
        }, function (err) {
            console.log(err.error.statusText);
        });
        this.others.getProducts().subscribe(function (res) {
            _this.products = res;
            // tslint:disable-next-line: only-arrow-functions
            _this.products = _this.products.map(function (pdt) {
                return {
                    productCode: pdt.productCode,
                    productName: pdt.productName.replace(/_/g, ' ').toUpperCase()
                };
            });
        }, function (err) { return console.log(err.statusText); });
    };
    SetLoanAcrualComponent.prototype.createFormGroup = function () {
        return new forms_1.FormGroup({
            accrualDays: new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required, custom_validator_1.CustomValidator.maxValue(100)])),
            station_name: new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required])),
            loan_product: new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required]))
        });
    };
    SetLoanAcrualComponent.prototype.revert = function () {
        this.userForm.reset();
    };
    Object.defineProperty(SetLoanAcrualComponent.prototype, "fval", {
        get: function () {
            return this.userForm.controls;
        },
        enumerable: false,
        configurable: true
    });
    SetLoanAcrualComponent.prototype.setAccrualDays = function () {
        var _this = this;
        // this.spinner.show();
        if (this.userForm.valid) {
            var data_1 = {
                theStationLocationConstantsDaysForAccrual: this.fval.accrualDays.value,
                productCode: null,
                userId: this.User.userId,
                theStationLocationId: null
            };
            // console.log(this.products);
            this.products.forEach(function (pdt) {
                if (pdt.productName === _this.fval.loan_product.value) {
                    data_1.productCode = pdt.productCode;
                }
            });
            for (var _i = 0, _a = this.stations; _i < _a.length; _i++) {
                var station = _a[_i];
                if (station.stationName.toUpperCase() === this.fval.station_name.value.toUpperCase()) {
                    data_1.theStationLocationId = station.theStationLocationId;
                }
            }
            if (data_1.theStationLocationId === null) {
                this.errored = true;
                this.alertService.danger({
                    html: '<b> The station chosen does not exist</b>'
                });
                //  this.errored = false;
                return;
            }
            else {
                this.others.postSetStationNumberOfDaysForAccrualInterest(data_1).subscribe(function (res) {
                    _this.posted = true;
                    _this.alertService.success({
                        html: '<b> The Number Of Days For Accrual Interest was set successfully</b>'
                    });
                    setTimeout(_this.revert(), 3000);
                }, function (err) {
                    _this.errored = true;
                    if (err.error.status === 500) {
                        _this.alertService.danger({
                            html: '<b> Server Could Not handle this request</b>'
                        });
                    }
                    else {
                        _this.alertService.danger({
                            html: '<b>' + err.error.statusText + '</b>'
                        });
                    }
                });
            }
        }
        else {
            this.errored = true;
            this.alertService.danger({
                html: '<b> The provided form details are invalid </b>'
            });
        }
    };
    SetLoanAcrualComponent = __decorate([
        core_1.Component({
            selector: 'app-set-loan-accrual',
            templateUrl: './set-loan-accrual.component.html',
            styleUrls: ['./set-loan-accrual.component.scss']
        })
    ], SetLoanAcrualComponent);
    return SetLoanAcrualComponent;
}());
exports.SetLoanAcrualComponent = SetLoanAcrualComponent;
