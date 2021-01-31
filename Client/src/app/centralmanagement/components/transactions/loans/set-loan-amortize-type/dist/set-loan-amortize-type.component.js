"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.SetLoanAmortizeTypeComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var SetLoanAmortizeTypeComponent = /** @class */ (function () {
    function SetLoanAmortizeTypeComponent(authService, others, spinner, router, alertService, modalService) {
        this.authService = authService;
        this.others = others;
        this.spinner = spinner;
        this.router = router;
        this.alertService = alertService;
        this.modalService = modalService;
        this.User = this.authService.loggedInUserInfo();
        this.types = [
            { name: 'FLAT RATE', code: 1 },
            { name: 'REDUCING BALANCE WITH REDUCING INSTALMENT', code: 2 },
            { name: 'REDUCING BALANCE WITH CONSTANT INSTALMENT', code: 3 },
        ];
        this.phoneNumbers = [];
    }
    SetLoanAmortizeTypeComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.others.getAllTheStationLocations().subscribe(function (res) {
            _this.stations = res;
        }, function (err) {
            console.log(err.error.statusText);
        });
        this.userForm = this.createFormGroup();
    };
    SetLoanAmortizeTypeComponent.prototype.createFormGroup = function () {
        return new forms_1.FormGroup({
            type: new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required,])),
            station_name: new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required,]))
        });
    };
    SetLoanAmortizeTypeComponent.prototype.revert = function () {
        this.userForm.reset();
    };
    Object.defineProperty(SetLoanAmortizeTypeComponent.prototype, "fval", {
        get: function () {
            return this.userForm.controls;
        },
        enumerable: false,
        configurable: true
    });
    SetLoanAmortizeTypeComponent.prototype.setAmortizationType = function () {
        var _this = this;
        // this.spinner.show();
        if (this.userForm.valid) {
            var data_1 = {
                productCode: 400,
                userId: this.User.userId,
                amortizationType: null,
                theStationLocationId: null
            };
            this.types.forEach(function (type) {
                if (type.name === _this.fval.type.value) {
                    data_1.amortizationType = type.code;
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
                if (data_1.amortizationType === null) {
                    this.errored = true;
                    this.alertService.danger({
                        html: '<b> The amortization Type chosen is not valid</b>'
                    });
                    //  this.errored = false;
                    return;
                }
                else {
                    this.others.postSetStationAmortType(data_1).subscribe(function (res) {
                        _this.posted = true;
                        _this.alertService.success({
                            html: '<b> The amortization type was set successfully</b>'
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
        }
        else {
            this.errored = true;
            this.alertService.danger({
                html: '<b> The provided form details are invalid </b>'
            });
        }
    };
    SetLoanAmortizeTypeComponent = __decorate([
        core_1.Component({
            selector: 'app-set-loan-amortize-type',
            templateUrl: './set-loan-amortize-type.component.html',
            styleUrls: ['./set-loan-amortize-type.component.scss']
        })
    ], SetLoanAmortizeTypeComponent);
    return SetLoanAmortizeTypeComponent;
}());
exports.SetLoanAmortizeTypeComponent = SetLoanAmortizeTypeComponent;
