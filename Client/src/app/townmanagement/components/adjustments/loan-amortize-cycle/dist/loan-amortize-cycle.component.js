"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
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
            cycle: new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required])),
            user_contact_number: new forms_1.FormControl('', forms_1.Validators.compose([
                forms_1.Validators.required,
                custom_validator_1.CustomValidator.patternValidator(/^(([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9]))$/, { hasNumber: true }),
            ]))
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
    LoanAmortizeCycleComponent.prototype.checkLoanbility = function (value, template) {
        if (value !== '') {
            var microCustomers = __spreadArrays(this.customers);
            microCustomers = microCustomers.filter(function (customer) { return customer.customerPhone1 === value.toUpperCase(); });
            if (microCustomers.length === 1) {
                this.checkedClient = microCustomers[0];
                this.openModal(template);
            }
            else {
                this.errored = true;
                this.checkedClient = {};
                this.alertService.danger({
                    html: '<b> customer phone number ' + value.toUpperCase() + ' is not registered<b>'
                });
            }
        }
    };
    LoanAmortizeCycleComponent.prototype.setAmortizationCycle = function () {
        var _this = this;
        // this.spinner.show();
        if (this.userForm.valid) {
            var data_1 = {
                customerId: this.checkedClient.customerId,
                productCode: 400,
                userId: this.User.userId,
                theLoanAmortizationCycle: null,
                theStationLocationId: this.checkedClient.fktheStationLocationIdCustomer,
                comment: "Please set the amortization cycle of this customer to  " + this.fval.cycle.value
            };
            this.cycles.forEach(function (cycle) {
                if (cycle.name === _this.fval.cycle.value) {
                    data_1.theLoanAmortizationCycle = cycle.code;
                }
            });
            if (data_1.theLoanAmortizationCycle === null) {
                this.errored = true;
                this.alertService.danger({
                    html: '<b> The amortization Cycle chosen is not valid</b>'
                });
                //  this.errored = false;
                return;
            }
            else {
                this.others
                    .putSetIndividualLoanAmortizationCycle(data_1)
                    .subscribe(function (res) {
                    _this.posted = true;
                    _this.alertService.success({
                        html: '<b> The amortization cycle was initiated successfully</b>'
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
