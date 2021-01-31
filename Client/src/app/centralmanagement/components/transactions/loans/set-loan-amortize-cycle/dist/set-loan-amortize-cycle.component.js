"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.SetLoanAmortizeCycleComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var SetLoanAmortizeCycleComponent = /** @class */ (function () {
    function SetLoanAmortizeCycleComponent(authService, others, spinner, router, alertService, modalService) {
        this.authService = authService;
        this.others = others;
        this.spinner = spinner;
        this.router = router;
        this.alertService = alertService;
        this.modalService = modalService;
        this.User = this.authService.loggedInUserInfo();
        this.cycles = [
            { name: 'DAILY', code: 1 },
            { name: 'WEEKLY', code: 2 },
            { name: 'FORTNIGHTLY', code: 3 },
            { name: 'MONTHLY', code: 4 },
            { name: 'QUATERLY', code: 5 },
            { name: 'HALF YEARLY', code: 6 },
            { name: 'ANNUALLY', code: 7 },
            { name: 'BIANNIALY', code: 8 },
        ];
        this.phoneNumbers = [];
    }
    SetLoanAmortizeCycleComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.others.getAllTheStationLocations().subscribe(function (res) {
            _this.stations = res;
        }, function (err) {
            console.log(err.error.statusText);
        });
        this.userForm = this.createFormGroup();
    };
    SetLoanAmortizeCycleComponent.prototype.createFormGroup = function () {
        return new forms_1.FormGroup({
            cycle: new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required])),
            station_name: new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required]))
        });
    };
    SetLoanAmortizeCycleComponent.prototype.revert = function () {
        this.userForm.reset();
    };
    Object.defineProperty(SetLoanAmortizeCycleComponent.prototype, "fval", {
        get: function () {
            return this.userForm.controls;
        },
        enumerable: false,
        configurable: true
    });
    SetLoanAmortizeCycleComponent.prototype.setAmortizationCycle = function () {
        var _this = this;
        // this.spinner.show();
        if (this.userForm.valid) {
            var data_1 = {
                productCode: 400,
                userId: this.User.userId,
                amortizationCycle: null,
                theStationLocationId: null
            };
            this.cycles.forEach(function (cycle) {
                if (cycle.name === _this.fval.cycle.value) {
                    data_1.amortizationCycle = cycle.code;
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
                if (data_1.amortizationCycle === null) {
                    this.errored = true;
                    this.alertService.danger({
                        html: '<b> The amortization Cycle chosen is not valid</b>'
                    });
                    //  this.errored = false;
                    return;
                }
                else {
                    this.others.postSetStationAmortCycle(data_1).subscribe(function (res) {
                        _this.posted = true;
                        _this.alertService.success({
                            html: '<b> The amortization cycle was set successfully</b>'
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
    SetLoanAmortizeCycleComponent = __decorate([
        core_1.Component({
            selector: 'app-set-loan-amortize-cycle',
            templateUrl: './set-loan-amortize-cycle.component.html',
            styleUrls: ['./set-loan-amortize-cycle.component.scss']
        })
    ], SetLoanAmortizeCycleComponent);
    return SetLoanAmortizeCycleComponent;
}());
exports.SetLoanAmortizeCycleComponent = SetLoanAmortizeCycleComponent;
