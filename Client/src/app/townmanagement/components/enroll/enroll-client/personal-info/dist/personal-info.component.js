"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.PersonalInfoComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var custom_validator_1 = require("src/app/validators/custom-validator");
var PersonalInfoComponent = /** @class */ (function () {
    function PersonalInfoComponent(authService, others, spinner, router, alertService) {
        this.authService = authService;
        this.others = others;
        this.spinner = spinner;
        this.router = router;
        this.alertService = alertService;
        this.registered = false;
        this.submitted = false;
        this.errored = false;
        this.posted = false;
        this.showFinalBtn = false;
        this.showcompleteBtn = true;
        this.showPersonalForm = true;
        this.showBodaForm = false;
        this.showTaxiForm = false;
        this.showMicroForm = false;
        this.showSaveForm = false;
        this.currentForm = [];
        // showSubmitForm = false;
        this.serviceErrors = {};
        this.User = this.authService.loggedInUserInfo();
        this.data = [];
    }
    PersonalInfoComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.userForm = this.createFormGroup();
        this.bodaClientForm = this.bodaClientFormGroup();
        this.taxiClientForm = this.taxiClientFormGroup();
        this.microClientForm = this.microClientFormGroup();
        this.savingsClientForm = this.savingsClientFormGroup();
        this.others.getAllTheStationLocations().subscribe(function (res) {
            _this.stations = res;
            // tslint:disable-next-line: only-arrow-functions
        }, function (err) { return console.log(err.statusText); });
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
        this.others.getBodaStages().subscribe(function (res) {
            _this.bodaStages = res;
            _this.bodaStages = _this.bodaStages.filter(function (bodaStage) { return bodaStage.bodabodaStageName != null; });
        }, function (err) { return console.log(err.statusText); });
        this.others.getTaxiStages().subscribe(function (res) {
            _this.taxiStages = res;
            _this.taxiStages = _this.taxiStages.filter(function (taxiStage) { return taxiStage.bodabodaStageName != null; });
        }, function (err) { return console.log(err.statusText); });
    };
    PersonalInfoComponent.prototype.createFormGroup = function () {
        return new forms_1.FormGroup({
            station: new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required])),
            customer_name: new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required])),
            main_contact_number1: new forms_1.FormControl('', forms_1.Validators.compose([
                forms_1.Validators.required,
                custom_validator_1.CustomValidator.patternValidator(/^(([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9]))$/, { hasNumber: true }),
            ])),
            main_contact_number2: new forms_1.FormControl('', forms_1.Validators.compose([
                // Validators.required,
                custom_validator_1.CustomValidator.patternValidator(/^(([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9]))$/, { hasNumber: true }),
            ])),
            id_type: new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required])),
            id_number: new forms_1.FormControl('', forms_1.Validators.compose([
                forms_1.Validators.required,
            ])),
            dateOfBirth: new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required])),
            productCode: new forms_1.FormControl(''),
            homeDetails: new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required])),
            clientComment: new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required]))
        });
    };
    PersonalInfoComponent.prototype.bodaClientFormGroup = function () {
        return new forms_1.FormGroup({
            clientName: new forms_1.FormControl(''),
            bodabodaCustomerNumberPlate: new forms_1.FormControl('', forms_1.Validators.compose([
                forms_1.Validators.required,
                forms_1.Validators.minLength(8),
                forms_1.Validators.maxLength(8),
            ])),
            bodaMakeorType: new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required])),
            bodaInsuarance: new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required])),
            bodaStage: new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required])),
            dateOfJoiningStage: new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required])),
            ownershipStatus: new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required])),
            ownersName: new forms_1.FormControl(''),
            ownersPhoneNumber: new forms_1.FormControl('')
        });
    };
    PersonalInfoComponent.prototype.taxiClientFormGroup = function () {
        return new forms_1.FormGroup({
            clientName: new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required])),
            drivingPermit: new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required])),
            taxiCustomerNumberPlate: new forms_1.FormControl('', forms_1.Validators.compose([
                forms_1.Validators.required,
                forms_1.Validators.minLength(8),
                forms_1.Validators.maxLength(8),
                custom_validator_1.CustomValidator.patternValidator(/^(([U])([A-Z])([A-Z])(\s)([0-9])([0-9])([0-9])([A-Z]))$/, { beUgandanNumberPlate: true })
            ])),
            taxiMakeorType: new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required])),
            taxiInsuarance: new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required])),
            taxiStage: new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required])),
            dateOfJoiningStage: new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required])),
            ownershipStatus: new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required])),
            ownersName: new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required])),
            ownersPhoneNumber: new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required]))
        });
    };
    PersonalInfoComponent.prototype.microClientFormGroup = function () {
        return new forms_1.FormGroup({
            clientName: new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required])),
            loanpurpose: new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required])),
            currentBusinesstype: new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required])),
            businessLocation: new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required])),
            averageDailyExpenses: new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required])),
            averageDailyIncome: new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required])),
            currentResidence: new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required])),
            residenceStatus: new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required])),
            numberOfDependants: new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required]))
        });
    };
    PersonalInfoComponent.prototype.savingsClientFormGroup = function () {
        return new forms_1.FormGroup({
            clientName: new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required])),
            monthlyIncome: new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required])),
            withdrawFreequency: new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required])),
            customerTarget: new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required]))
        });
    };
    PersonalInfoComponent.prototype.completeForm = function () {
        var _this = this;
        if (this.fval.productCode.value) {
            this.data.push({
                customerName: this.fval.customer_name.value.toUpperCase(),
                customerPhone1: this.fval.main_contact_number1.value,
                customerPhone2: this.fval.main_contact_number2.value,
                customerIdType: this.fval.id_type.value.toUpperCase(),
                customerDateOfBirth: this.fval.dateOfBirth.value.getFullYear() + "-" + (this.fval.dateOfBirth.value.getMonth() + 1) + "-" + this.fval.dateOfBirth.value.getDate(),
                customerIdNumber: this.fval.id_number.value,
                customerHomeAreaDetails: this.fval.homeDetails.value.toUpperCase(),
                customerComment: this.fval.clientComment.value.toUpperCase(),
                theStationLocationId: null,
                userId: this.User.userId,
                productCode: null
            });
            this.products.forEach(function (pdt) {
                if (pdt.productName === _this.fval.productCode.value) {
                    _this.data[0].productCode = pdt.productCode;
                }
            });
            this.stations.forEach(function (station) {
                if (station.stationName.toUpperCase() === _this.fval.station.value.toUpperCase()) {
                    _this.data[0].theStationLocationId = station.theStationLocationId;
                }
            });
            if (this.fval.productCode.value === 'BODABODA LOAN PRODUCT') {
                this.showPersonalForm = false;
                this.showBodaForm = true;
                this.showFinalBtn = true;
                this.showcompleteBtn = false;
                this.bodaFval.clientName.setValue(this.fval.customer_name.value.toUpperCase());
                this.bodaFval.clientName.disable();
            }
            else if (this.fval.productCode.value === 'MICROLOAN PRODUCT') {
                this.showPersonalForm = false;
                this.showMicroForm = true;
                this.showFinalBtn = true;
                this.showcompleteBtn = false;
                this.microFval.clientName.setValue(this.fval.customer_name.value.toUpperCase());
                this.microFval.clientName.disable();
            }
            else if (this.fval.productCode.value === 'TAXI LOAN PRODUCT') {
                this.showPersonalForm = false;
                this.showFinalBtn = true;
                this.showTaxiForm = true;
                this.showcompleteBtn = false;
                this.taxiFval.clientName.setValue(this.fval.customer_name.value.toUpperCase());
                this.taxiFval.clientName.disable();
            }
            else if (this.fval.productCode.value === 'SAVINGS PRODUCT') {
                this.fval.productCode.setValue(' ');
                this.showPersonalForm = false;
                this.showFinalBtn = true;
                this.showSaveForm = true;
                this.showcompleteBtn = false;
                this.savFval.clientName.setValue(this.fval.customer_name.value.toUpperCase());
                this.savFval.clientName.disable();
            }
        }
    };
    PersonalInfoComponent.prototype.goBack = function () {
        this.showPersonalForm = true;
        this.showBodaForm = false;
        this.showTaxiForm = false;
        this.showMicroForm = false;
        this.showSaveForm = false;
        this.showFinalBtn = false;
        this.showcompleteBtn = true;
        this.data = [];
    };
    // toggle visibility of password field
    PersonalInfoComponent.prototype.toggleFieldType = function () {
        this.fieldType = !this.fieldType;
    };
    PersonalInfoComponent.prototype.revert = function () {
        this.userForm.reset();
    };
    Object.defineProperty(PersonalInfoComponent.prototype, "fval", {
        get: function () {
            return this.userForm.controls;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PersonalInfoComponent.prototype, "bodaFval", {
        get: function () {
            return this.bodaClientForm.controls;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PersonalInfoComponent.prototype, "taxiFval", {
        get: function () {
            return this.taxiClientForm.controls;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PersonalInfoComponent.prototype, "microFval", {
        get: function () {
            return this.microClientForm.controls;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PersonalInfoComponent.prototype, "savFval", {
        get: function () {
            return this.savingsClientForm.controls;
        },
        enumerable: false,
        configurable: true
    });
    PersonalInfoComponent.prototype.saveOnlyClientDetails = function () {
        var _this = this;
        if (this.userForm.valid) {
            this.data.push({
                customerName: this.fval.customer_name.value.toUpperCase(),
                customerPhone1: this.fval.main_contact_number1.value,
                customerPhone2: this.fval.main_contact_number2.value,
                customerIdType: this.fval.id_type.value.toUpperCase(),
                customerDateOfBirth: this.fval.dateOfBirth.value.getFullYear() + "-" + (this.fval.dateOfBirth.value.getMonth() + 1) + "-" + this.fval.dateOfBirth.value.getDate(),
                customerIdNumber: this.fval.id_number.value,
                customerHomeAreaDetails: this.fval.homeDetails.value.toUpperCase(),
                customerComment: this.fval.clientComment.value.toUpperCase(),
                theStationLocationId: null,
                userId: this.User.userId,
                productCode: null
            });
            this.products.forEach(function (pdt) {
                if (pdt.productName === _this.fval.productCode.value) {
                    _this.data[0].productCode = pdt.productCode;
                }
                else {
                    _this.data[0].productCode = 0;
                }
            });
            this.stations.forEach(function (station) {
                if (station.stationName.toUpperCase() === _this.fval.station.value.toUpperCase()) {
                    _this.data[0].theStationLocationId = station.theStationLocationId;
                }
            });
            console.log(this.data);
            this.others.createCustomer(this.data).subscribe(function (res) {
                _this.posted = true;
                _this.data = [];
                _this.alertService.success({
                    html: '<b> customer was created succsefully <b>'
                });
                _this.revert();
            }, function (err) {
                _this.data = [];
                console.log(err.statusText);
            });
        }
    };
    PersonalInfoComponent.prototype.saveClientAndPdt = function () {
        var _this = this;
        if (this.showBodaForm) {
            if (this.bodaClientForm.valid) {
                this.data.push({
                    bodabodaCustomerNumberPlate: this.bodaFval.bodabodaCustomerNumberPlate.value.toUpperCase(),
                    bodabodaCustomerMakeOrType: this.bodaFval.bodaMakeorType.value.toUpperCase(),
                    bodabodaCustomerInsurance: this.bodaFval.bodaInsuarance.value.toUpperCase() === 'NONE' ?
                        1 : this.bodaFval.bodaInsuarance.value.toUpperCase() === 'REGULAR' ?
                        2 : 3,
                    bodabodaCustomerDateOfJoinStage: this.bodaFval.dateOfJoiningStage.value.getFullYear() + "-" + (this.bodaFval.dateOfJoiningStage.value.getMonth() + 1) + "-" + this.bodaFval.dateOfJoiningStage.value.getDate(),
                    bodabodaOwnershipStatus: this.bodaFval.ownershipStatus.value.toUpperCase() === 'ONLOAN' ?
                        1 : this.bodaFval.ownershipStatus.value.toUpperCase() === 'PAIDOUT' ?
                        2 : 3,
                    bodabodaCustomerOwnersName: this.bodaFval.ownersName.value.toUpperCase(),
                    bodabodaCustomerOwnersPhone1: this.bodaFval.ownersPhoneNumber.value,
                    // customerId: 400000000,
                    bodabodaStageId: null,
                    productCode: null
                });
                this.products.forEach(function (pdt) {
                    if (pdt.productName === _this.fval.productCode.value) {
                        _this.data[1].productCode = pdt.productCode;
                    }
                });
                this.bodaStages.forEach(function (bodaStage) {
                    if (bodaStage.bodabodaStageName.toUpperCase() === _this.bodaFval.bodaStage.value) {
                        _this.data[1].bodabodaStageId = bodaStage.bodabodaStageId;
                    }
                });
                console.log(this.data);
                this.others.createCustomer(this.data).subscribe(function (res) {
                    _this.posted = true;
                    _this.data = [];
                    _this.alertService.success({
                        html: '<b> customer was created succsefully <b>'
                    });
                    _this.revert();
                }, function (err) {
                    _this.data = [];
                    console.log(err.statusText);
                });
            }
            else {
                this.errored = true;
                this.alertService.danger({
                    html: '<strong>some form fields where not filled</strong>'
                });
            }
        }
        else if (this.showTaxiForm) {
            if (this.bodaClientForm.valid) {
                this.data.push({
                    bodabodaCustomerNumberPlate: this.bodaFval.bodabodaCustomerNumberPlate.value.toUpperCase(),
                    bodabodaCustomerMakeOrType: this.bodaFval.bodaMakeorType.value.toUpperCase(),
                    bodabodaCustomerInsurance: this.bodaFval.bodaInsuarance.value.toUpperCase() === 'NONE' ?
                        1 : this.bodaFval.bodaInsuarance.value.toUpperCase() === 'REGULAR' ?
                        2 : 3,
                    bodabodaCustomerDateOfJoinStage: this.fval.dateOfJoiningStage.value.getFullYear() + "-" + (this.fval.dateOfJoiningStage.value.getMonth() + 1) + "-" + this.fval.dateOfJoiningStage.value.getDate(),
                    bodabodaOwnershipStatus: this.bodaFval.ownershipStatus.value.toUpperCase() === 'ONLOAN' ?
                        1 : this.bodaFval.ownershipStatus.value.toUpperCase() === 'PAIDOUT' ?
                        2 : 3,
                    bodabodaCustomerOwnersName: this.bodaFval.ownersName.value.toUpperCase(),
                    bodabodaCustomerOwnersPhone1: this.bodaFval.ownersPhoneNumber.value,
                    // customerId: 400000000,
                    bodabodaStageId: null,
                    productCode: null
                });
                this.products.forEach(function (pdt) {
                    if (pdt.productName === _this.fval.productCode.value) {
                        _this.data[1].productCode = pdt.productCode;
                    }
                });
                this.bodaStages.forEach(function (bodaStage) {
                    if (bodaStage.bodabodaStageName.toUpperCase() === _this.bodaFval.bodaStage.value) {
                        _this.data[1].bodabodaStageId = bodaStage.bodabodaStageId;
                    }
                });
                console.log(this.data);
                this.others.createCustomer(this.data).subscribe(function (res) {
                    _this.posted = true;
                    _this.data = [];
                    _this.alertService.success({
                        html: '<b> customer was created succsefully <b>'
                    });
                    _this.revert();
                }, function (err) {
                    _this.data = [];
                    console.log(err.statusText);
                });
            }
            else {
                this.errored = true;
                this.alertService.danger({
                    html: '<strong>some form fields where not filled</strong>'
                });
            }
        }
        else if (this.showMicroForm) {
            if (this.bodaClientForm.valid) {
                this.data.push({});
            }
            else {
                this.errored = true;
                this.alertService.danger({
                    html: '<strong>some form fields where not filled</strong>'
                });
            }
        }
    };
    PersonalInfoComponent = __decorate([
        core_1.Component({
            selector: 'app-personal-info',
            templateUrl: './personal-info.component.html',
            styleUrls: ['./personal-info.component.scss']
        })
    ], PersonalInfoComponent);
    return PersonalInfoComponent;
}());
exports.PersonalInfoComponent = PersonalInfoComponent;
