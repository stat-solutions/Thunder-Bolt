"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.LoanAmortizeCycleComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var custom_validator_1 = require("src/app/validators/custom-validator");
var LoanAmortizeCycleComponent = /** @class */ (function () {
    function LoanAmortizeCycleComponent(authService, others, spinner, router, alertService, modalService) {
        this.authService = authService;
        this.others = others;
        this.spinner = spinner;
        this.router = router;
        this.alertService = alertService;
        this.modalService = modalService;
        this.User = this.authService.loggedInUserInfo();
        this.cycles = [
            { name: 'DAILY', code: 1 }, { name: 'WEEKLY', code: 2 },
            { name: 'FORTNIGHTLY', code: 3 }, { name: 'MONTHLY', code: 4 },
            { name: 'QUATERLY', code: 5 }, { name: 'HALF YEARLY', code: 6 },
            { name: 'ANNUALLY', code: 7 }, { name: 'BIANNIALY', code: 8 },
        ];
        this.phoneNumbers = [];
    }
    LoanAmortizeCycleComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.userForm = this.createFormGroup();
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
        this.others.getMicroCustomers().subscribe(function (res) {
            if (res.length > 0) {
                _this.customers = [];
                _this.customers = res;
                _this.phoneNumbers = [];
                _this.customers.forEach(function (customer) {
                    _this.phoneNumbers.push(customer.customerPhone1);
                });
            }
            else {
                _this.errored = true;
                _this.alertService.danger({
                    html: '<b>There are no Micro loan customers registered</b>'
                });
            }
        }, function (err) {
            _this.errored = true;
            _this.alertService.danger({
                html: '<b>' + err.error.error.message + '</b>'
            });
        });
    };
    LoanAmortizeCycleComponent.prototype.createFormGroup = function () {
        return new forms_1.FormGroup({
            accrualDays: new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required, custom_validator_1.CustomValidator.maxValue(100)])),
            user_contact_number: new forms_1.FormControl(''),
            loan_product: new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required]))
        });
    };
    LoanAmortizeCycleComponent.prototype.revert = function () {
        this.userForm.reset();
    };
    Object.defineProperty(LoanAmortizeCycleComponent.prototype, "fval", {
        get: function () {
            return this.userForm.controls;
        },
        enumerable: false,
        configurable: true
    });
    // modal method
    LoanAmortizeCycleComponent.prototype.openModal = function (template) {
        this.modalRef = this.modalService.show(template, Object.assign({}, { "class": 'modal-lg modal-dialog-centered' }));
    };
    LoanAmortizeCycleComponent.prototype.setAccrualDays = function () {
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
                if (station.stationName.toUpperCase() ===
                    this.fval.station_name.value.toUpperCase()) {
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
                this.others
                    .postSetStationNumberOfDaysForAccrualInterest(data_1)
                    .subscribe(function (res) {
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
    LoanAmortizeCycleComponent = __decorate([
        core_1.Component({
            selector: 'app-loan-amortize-cycle',
            templateUrl: './loan-amortize-cycle.component.html',
            styleUrls: ['./loan-amortize-cycle.component.scss']
        })
    ], LoanAmortizeCycleComponent);
    return LoanAmortizeCycleComponent;
}());
exports.LoanAmortizeCycleComponent = LoanAmortizeCycleComponent;
