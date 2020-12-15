"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.DepositFloatComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var DepositFloatComponent = /** @class */ (function () {
    function DepositFloatComponent(authService, others, spinner, router, alertService) {
        this.authService = authService;
        this.others = others;
        this.spinner = spinner;
        this.router = router;
        this.alertService = alertService;
        this.User = this.authService.loggedInUserInfo();
    }
    DepositFloatComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.userForm = this.createFormGroup();
        this.others.getAllTheStationLocations().subscribe(function (res) {
            _this.stations = res;
        }, function (err) {
            console.log(err.error.statusText);
        });
        this.others.getTxnDetails().subscribe(function (res) {
            _this.txns = res;
            // console.log(res);
        }, function (err) {
            console.log(err.error.statusText);
        });
    };
    DepositFloatComponent.prototype.createFormGroup = function () {
        return new forms_1.FormGroup({
            station: new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required])),
            floatAmount: new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required
                // CustomValidator.patternValidator(/^\d+$/, { hasNumber: true }
                // )
            ]))
        });
    };
    DepositFloatComponent.prototype.revert = function () {
        this.userForm.reset();
    };
    Object.defineProperty(DepositFloatComponent.prototype, "fval", {
        get: function () {
            return this.userForm.controls;
        },
        enumerable: false,
        configurable: true
    });
    DepositFloatComponent.prototype.deposit = function () {
        var _this = this;
        // this.spinner.show();
        if (this.userForm.valid) {
            var data = {
                txnAmount: Number(this.fval.floatAmount.value),
                txnDetailsId: null,
                userId: this.User.userId,
                theStationLocationId: null
            };
            // console.log(this.products);
            for (var _i = 0, _a = this.stations; _i < _a.length; _i++) {
                var station = _a[_i];
                if (station.stationName.toUpperCase() === this.fval.station.value.toUpperCase()) {
                    data.theStationLocationId = station.theStationLocationId;
                }
            }
            for (var _b = 0, _c = this.txns; _b < _c.length; _b++) {
                var txn = _c[_b];
                if (txn.txnDetailsTypeName.toUpperCase() === 'FLOATDEPOSIT') {
                    data.txnDetailsId = txn.txnDetailsId;
                }
            }
            if (data.theStationLocationId === null) {
                this.errored = true;
                this.alertService.danger({
                    html: '<b> The station chose do not exist</b>'
                });
                //  this.errored = false;
                return;
            }
            else {
                this.others.putTxnNoneCustomer(data).subscribe(function (res) {
                    _this.posted = true;
                    _this.alertService.success({
                        html: '<b> Float was deposited successfully</b>'
                    });
                    setTimeout(_this.revert(), 3000);
                }, function (err) {
                    _this.errored = true;
                    if (err.error.status === 500) {
                        _this.alertService.danger({
                            html: '<b> Sever Could Not handle this request</b>'
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
                html: '<b> the provided form details are invalid </b>'
            });
        }
    };
    DepositFloatComponent = __decorate([
        core_1.Component({
            selector: 'app-deposit-float',
            templateUrl: './deposit-float.component.html',
            styleUrls: ['./deposit-float.component.scss']
        })
    ], DepositFloatComponent);
    return DepositFloatComponent;
}());
exports.DepositFloatComponent = DepositFloatComponent;
