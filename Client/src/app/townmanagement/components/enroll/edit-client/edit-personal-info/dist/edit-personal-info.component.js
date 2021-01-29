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
var operators_1 = require("rxjs/operators");
var EditPersonalInfoComponent = /** @class */ (function () {
    function EditPersonalInfoComponent(authService, others, spinner, router, alertService, storage) {
        this.authService = authService;
        this.others = others;
        this.spinner = spinner;
        this.router = router;
        this.alertService = alertService;
        this.storage = storage;
        this.errored = false;
        this.posted = false;
        this.addProduct = false;
        this.showPersonalForm = true;
        this.showBodaForm = false;
        this.showTaxiForm = false;
        this.showMicroForm = false;
        this.showSaveForm = false;
        this.serviceErrors = {};
        this.User = this.authService.loggedInUserInfo();
        this.thereCustomers = false;
        this.noCustomers = true;
    }
    EditPersonalInfoComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.errored = false;
        this.posted = false;
        this.searchForm = (function searchStation() {
            return new forms_1.FormGroup({
                getCustomers: new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required]))
            });
        })();
        this.userForm = this.createFormGroup();
        this.bodaClientForm = this.bodaClientFormGroup();
        this.taxiClientForm = this.taxiClientFormGroup();
        this.microClientForm = this.microClientFormGroup();
        this.savingsClientForm = this.savingsClientFormGroup();
        this.others.getAllTheStationLocationsByTown(this.User.userLocationId).subscribe(function (res) {
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
            _this.taxiStages = _this.taxiStages.filter(function (taxiStage) { return taxiStage.taxiStageName != null; });
        }, function (err) { return console.log(err.statusText); });
    };
    EditPersonalInfoComponent.prototype.createFormGroup = function () {
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
            clientPhotoUrl: new forms_1.FormControl(''),
            idPhotoUrl: new forms_1.FormControl(''),
            productCode: new forms_1.FormControl(''),
            homeDetails: new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required])),
            clientComment: new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required]))
        });
    };
    EditPersonalInfoComponent.prototype.bodaClientFormGroup = function () {
        return new forms_1.FormGroup({
            clientName: new forms_1.FormControl(''),
            bodabodaCustomerNumberPlate: new forms_1.FormControl('', forms_1.Validators.compose([
                forms_1.Validators.required,
                forms_1.Validators.minLength(7),
                forms_1.Validators.maxLength(7),
            ])),
            bodaMakeorType: new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required])),
            bodaInsuarance: new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required])),
            bodaStage: new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required])),
            dateOfJoiningStage: new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required])),
            bodabodaCustomerFrontPhotoUrl: new forms_1.FormControl(''),
            bodabodaCustomerSidePhotoUrl: new forms_1.FormControl(''),
            bodabodaCustomerRearPhotoUrl: new forms_1.FormControl(''),
            ownershipStatus: new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required])),
            ownersName: new forms_1.FormControl(''),
            ownersPhoneNumber: new forms_1.FormControl('', forms_1.Validators.compose([
                // Validators.required
                custom_validator_1.CustomValidator.patternValidator(/^(([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9]))$/, { hasNumber: true }),
            ]))
        });
    };
    EditPersonalInfoComponent.prototype.taxiClientFormGroup = function () {
        return new forms_1.FormGroup({
            clientName: new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required])),
            drivingPermit: new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required])),
            taxiCustomerNumberPlate: new forms_1.FormControl('', forms_1.Validators.compose([
                forms_1.Validators.required,
                forms_1.Validators.minLength(7),
                forms_1.Validators.maxLength(7),
            ])),
            taxiMakeorType: new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required])),
            taxiInsuarance: new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required])),
            taxiStage: new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required])),
            dateOfJoiningStage: new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required])),
            taxiCustomerFrontPhotoUrl: new forms_1.FormControl(''),
            taxiCustomerSidePhotoUrl: new forms_1.FormControl(''),
            taxiCustomerRearPhotoUrl: new forms_1.FormControl(''),
            ownershipStatus: new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required])),
            ownersName: new forms_1.FormControl(''),
            ownersPhoneNumber: new forms_1.FormControl('', forms_1.Validators.compose([
                // Validators.required
                custom_validator_1.CustomValidator.patternValidator(/^(([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9]))$/, { hasNumber: true }),
            ]))
        });
    };
    EditPersonalInfoComponent.prototype.microClientFormGroup = function () {
        return new forms_1.FormGroup({
            clientName: new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required])),
            currentBusinesstype: new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required])),
            businessLocation: new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required])),
            averageDailyExpenses: new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required])),
            averageDailyIncome: new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required])),
            currentResidence: new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required])),
            residenceStatus: new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required])),
            numberOfDependants: new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required]))
        });
    };
    EditPersonalInfoComponent.prototype.savingsClientFormGroup = function () {
        return new forms_1.FormGroup({
            clientName: new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required])),
            monthlyIncome: new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required])),
            withdrawFreequency: new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required])),
            customerTarget: new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required]))
        });
    };
    EditPersonalInfoComponent.prototype.console = function (val) {
        return console.log(val);
    };
    EditPersonalInfoComponent.prototype.getCustomers = function (val) {
        var _this = this;
        var theStationLocationId = null;
        for (var _i = 0, _a = this.stations; _i < _a.length; _i++) {
            var station = _a[_i];
            if (station.stationName.toUpperCase() === val.toUpperCase()) {
                theStationLocationId = station.theStationLocationId;
            }
        }
        if (theStationLocationId === null) {
            this.errored = true;
            this.alertService.danger({
                html: '<b> The station chosen does not exist!</b>'
            });
            return;
        }
        else {
            this.others.getCustomersByStation(theStationLocationId).subscribe(function (res) {
                _this.customers = res;
                _this.revert();
                _this.currentCustomerId = null;
                if (_this.customers.length > 0) {
                    _this.thereCustomers = true;
                    _this.noCustomers = true;
                }
                else {
                    _this.noCustomers = false;
                    _this.thereCustomers = false;
                }
            }, function (err) {
                _this.errored = true;
                _this.alertService.danger({
                    html: '<b>' + err.statusText + '</b>'
                });
            });
        }
    };
    EditPersonalInfoComponent.prototype.onFileSelected = function (event) {
        // console.log(event.target.id);
        var folder;
        switch (event.target.id) {
            case 'clientPhotoUrl':
                folder = 'clientImages/photos-and-ids';
                this.upload(event.target.id, event.target.files[0], folder);
                break;
            case 'idPhotoUrl':
                folder = 'clientImages/photos-and-ids';
                this.upload(event.target.id, event.target.files[0], folder);
                break;
            case 'bodabodaCustomerFrontPhotoUrl':
                folder = 'clientImages/bodaboda';
                this.upload(event.target.id, event.target.files[0], folder);
                break;
            case 'bodabodaCustomerSidePhotoUrl':
                folder = 'clientImages/bodaboda';
                this.upload(event.target.id, event.target.files[0], folder);
                break;
            case 'bodabodaCustomerRearPhotoUrl':
                folder = 'clientImages/bodaboda';
                this.upload(event.target.id, event.target.files[0], folder);
                break;
            case 'taxiCustomerFrontPhotoUrl':
                folder = 'clientImages/taxi';
                this.upload(event.target.id, event.target.files[0], folder);
                break;
            case 'taxiCustomerSidePhotoUrl':
                folder = 'clientImages/taxi';
                this.upload(event.target.id, event.target.files[0], folder);
                break;
            case 'taxiCustomerRearPhotoUrl':
                folder = 'clientImages/taxi';
                this.upload(event.target.id, event.target.files[0], folder);
                break;
        }
    };
    EditPersonalInfoComponent.prototype.upload = function (inputType, getfile, path) {
        var _this = this;
        var n = Date.now();
        var file = getfile;
        var filePath = path + "/" + n;
        // file ? console.log('true') : console.log('false');
        var fileRef = this.storage.ref(filePath);
        var task = this.storage.upload(filePath, file);
        var result = task
            .snapshotChanges()
            .pipe(operators_1.finalize(function () {
            var downloadURL = fileRef.getDownloadURL();
            downloadURL.subscribe(function (url) {
                if (url) {
                    // console.log(url);
                    switch (inputType) {
                        case 'clientPhotoUrl':
                            _this.clientPhotoUrl = url;
                            // console.log(this.clientPhotoUrl);
                            break;
                        case 'idPhotoUrl':
                            _this.clientIdUrl = url;
                            // console.log(this.clientIdUrl);
                            break;
                        case 'bodabodaCustomerFrontPhotoUrl':
                            _this.bodaFrontUrl = url;
                            break;
                        case 'bodabodaCustomerSidePhotoUrl':
                            _this.bodaSideUrl = url;
                            break;
                        case 'bodabodaCustomerRearPhotoUrl':
                            _this.bodaRearUrl = url;
                            break;
                        case 'taxiCustomerFrontPhotoUrl':
                            _this.taxiFrontUrl = url;
                            break;
                        case 'taxiCustomerSidePhotoUrl':
                            _this.taxiSideUrl = url;
                            break;
                        case 'taxiCustomerRearPhotoUrl':
                            _this.taxiRearUrl = url;
                            break;
                    }
                }
            });
        }))
            .subscribe(function (url) {
            if (url) {
                // console.log(url);
            }
        });
    };
    EditPersonalInfoComponent.prototype.setSelectedChanges = function (selectedChange) {
        switch (selectedChange) {
            case 'Select the ID type':
                this.fval.id_type.setValue('');
                this.fval.id_type.setValidators([forms_1.Validators.required]);
                break;
            case 'NATIONAL ID':
                this.fval.id_number.setValue('');
                this.fval.id_number.setValidators([
                    forms_1.Validators.required,
                    forms_1.Validators.minLength(14),
                    forms_1.Validators.maxLength(14)
                ]);
                break;
            case 'VILLAGE ID':
                this.fval.id_number.setValue('');
                this.fval.id_number.setValidators([
                    forms_1.Validators.required,
                ]);
                break;
            case 'PASSPORT':
                this.fval.id_number.setValue('');
                this.fval.id_number.setValidators([
                    forms_1.Validators.required,
                ]);
                break;
            case 'DRIVING PERMIT':
                this.fval.id_number.setValue('');
                this.fval.id_number.setValidators([
                    forms_1.Validators.required,
                ]);
                break;
            case 'ONLOAN':
                this.bodaFval.ownersName.setValidators([forms_1.Validators.required]);
                this.bodaFval.ownersPhoneNumber.setValidators([
                    forms_1.Validators.required,
                    custom_validator_1.CustomValidator.patternValidator(/^(([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9]))$/, { hasNumber: true }),
                ]);
                this.taxiFval.ownersName.setValidators([forms_1.Validators.required]);
                this.taxiFval.ownersPhoneNumber.setValidators([
                    forms_1.Validators.required,
                    custom_validator_1.CustomValidator.patternValidator(/^(([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9]))$/, { hasNumber: true }),
                ]);
                break;
            case 'HIREDOUT':
                this.bodaFval.ownersName.setValidators([forms_1.Validators.required]);
                this.bodaFval.ownersPhoneNumber.setValidators([
                    forms_1.Validators.required,
                    custom_validator_1.CustomValidator.patternValidator(/^(([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9]))$/, { hasNumber: true }),
                ]);
                this.taxiFval.ownersName.setValidators([forms_1.Validators.required]);
                this.taxiFval.ownersPhoneNumber.setValidators([
                    forms_1.Validators.required,
                    custom_validator_1.CustomValidator.patternValidator(/^(([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9]))$/, { hasNumber: true }),
                ]);
                break;
            case 'BODABODA LOAN PRODUCT':
                this.bodaForm();
                break;
            case 'TAXI LOAN PRODUCT':
                this.taxiForm();
                break;
            case 'MICROLOAN PRODUCT':
                this.microForm();
                break;
            case 'SAVINGS PRODUCT':
                this.savingForm();
                break;
        }
    };
    EditPersonalInfoComponent.prototype.bodaForm = function () {
        var _this = this;
        if (this.currentCustomer.productCodes.includes(200)) {
            this.others.getBodaCustomer(this.currentCustomerId).subscribe(function (res) {
                if (res.length === 1) {
                    var customer_1 = res[0];
                    _this.bodabodaCustomerId = customer_1.bodabodaCustomerId;
                    _this.bodaFval.bodabodaCustomerNumberPlate.setValue(customer_1.bodabodaCustomerNumberPlate.replace(/\s/g, ''));
                    _this.bodaFval.bodabodaCustomerNumberPlate.disable();
                    _this.bodaFval.bodaMakeorType.setValue(customer_1.bodabodaCustomerMakeOrType);
                    _this.bodaFval.bodaInsuarance.setValue(customer_1.bodabodaCustomerInsurance === 1 ?
                        'NONE' : customer_1.bodabodaCustomerInsurance === 2 ?
                        'REGULAR' : 'COMPREHENSIVE');
                    _this.bodaFval.dateOfJoiningStage.setValue(new Date(customer_1.bodabodaCustomerDateOfJoinStage));
                    _this.bodaFval.ownershipStatus.setValue(customer_1.bodabodaOwnershipStatus === 1 ?
                        'ONLOAN' : customer_1.bodabodaOwnershipStatus === 2 ?
                        'PAIDOUT' : 'HIREDOUT');
                    _this.bodaFval.ownersName.setValue(customer_1.bodabodaCustomerOwnersName);
                    _this.bodaFval.ownersPhoneNumber.setValue(customer_1.bodabodaCustomerOwnersPhone);
                    _this.bodaFrontUrl = customer_1.bodabodaCustomerFrontPhotoUrl;
                    _this.bodaSideUrl = customer_1.bodabodaCustomerSidePhotoUrl;
                    _this.bodaRearUrl = customer_1.bodabodaCustomerRearPhotoUrl;
                    _this.bodaStages.forEach(function (bodaStage) {
                        if (bodaStage.bodabodaStageId === customer_1.fkBodabodaStageIdBodabodaCustomer) {
                            _this.bodaFval.bodaStage.setValue(bodaStage.bodabodaStageName.toUpperCase());
                        }
                    });
                    _this.showPersonalForm = false;
                    _this.showBodaForm = true;
                    _this.bodaFval.clientName.setValue(_this.fval.customer_name.value.toUpperCase());
                    _this.bodaFval.clientName.disable();
                }
                else {
                    _this.errored = true;
                    _this.alertService.danger({
                        html: '<b>' + _this.fval.customer_name.value.toUpperCase() + ' Has no BodaBoda details</b>'
                    });
                }
            }, function (err) {
                _this.errored = true;
                console.log(err.statusText);
                _this.alertService.danger({
                    html: '<b>' + err.statusText + '</b>'
                });
            });
        }
    };
    EditPersonalInfoComponent.prototype.taxiForm = function () {
        var _this = this;
        if (this.currentCustomer.productCodes.includes(300)) {
            this.others.getTaxiCustomer(this.currentCustomerId).subscribe(function (res) {
                if (res.length === 1) {
                    var customer = res[0];
                    _this.taxiCustomerId = customer.taxiCustomerId;
                    _this.taxiFval.taxiCustomerNumberPlate.setValue(customer.taxiCustomerNumberPlate.replace(/\s/g, ''));
                    _this.taxiFval.taxiCustomerNumberPlate.disable();
                    _this.taxiFval.drivingPermit.setValue(customer.taxiCustomerDrivingPermitNumber);
                    _this.taxiFval.taxiMakeorType.setValue(customer.taxiCustomerMakeOrType);
                    _this.taxiFval.taxiInsuarance.setValue(customer.taxiCustomerInsurance === 1 ?
                        'NONE' : customer.taxiCustomerInsurance === 2 ?
                        'REGULAR' : 'COMPREHENSIVE');
                    _this.taxiFval.dateOfJoiningStage.setValue(new Date(customer.taxiCustomerDateOfJoinStage));
                    _this.taxiFval.ownershipStatus.setValue(customer.taxiOwnershipStatus === 1 ?
                        'ONLOAN' : customer.taxiOwnershipStatus === 2 ?
                        'PAIDOUT' : 'HIREDOUT');
                    _this.taxiFval.ownersName.setValue(customer.taxiCustomerOwnersName);
                    _this.taxiFval.ownersPhoneNumber.setValue(customer.taxiCustomerOwnersPhone);
                    _this.taxiFrontUrl = customer.taxiCustomerFrontPhotoUrl;
                    _this.taxiSideUrl = customer.taxiCustomerSidePhotoUrl;
                    _this.taxiRearUrl = customer.taxiCustomerRearPhotoUrl;
                    for (var _i = 0, _a = _this.taxiStages; _i < _a.length; _i++) {
                        var stage = _a[_i];
                        if (stage.taxiStageId === customer.fkTaxiStageIdTaxiCustomer) {
                            _this.taxiFval.taxiStage.setValue(stage.taxiStageName.toUpperCase());
                        }
                    }
                    _this.showPersonalForm = false;
                    _this.showTaxiForm = true;
                    _this.taxiFval.clientName.setValue(_this.fval.customer_name.value.toUpperCase());
                    _this.taxiFval.clientName.disable();
                }
                else {
                    _this.errored = true;
                    _this.alertService.danger({
                        html: '<b>' + _this.fval.customer_name.value.toUpperCase() + ' Has no Taxi details</b>'
                    });
                }
            }, function (err) {
                _this.errored = true;
                console.log(err.statusText);
                _this.alertService.danger({
                    html: '<b>' + err.statusText + '</b>'
                });
            });
        }
    };
    EditPersonalInfoComponent.prototype.microForm = function () {
        var _this = this;
        if (this.currentCustomer.productCodes.includes(400)) {
            this.others.getMicroCustomer(this.currentCustomerId).subscribe(function (res) {
                if (res.length === 1) {
                    var customer = res[0];
                    _this.microloanCustomerId = customer.microloanCustomerId;
                    _this.microFval.loanpurpose.setValue(customer.microloanCustomerLoanPurpose);
                    _this.microFval.currentBusinesstype.setValue(customer.microloanCustomerCurrentBusinessType);
                    _this.microFval.businessLocation.setValue(customer.microloanCustomerCurrentBusinessLocation);
                    _this.microFval.averageDailyExpenses.setValue(customer.microloanCustomerAverageDailyExpenses);
                    _this.microFval.averageDailyIncome.setValue(customer.microloanCustomerAverageDailyIncome);
                    _this.microFval.currentResidence.setValue(customer.microloanCustomerCurrentResidence);
                    _this.microFval.residenceStatus.setValue(customer.microloanCustomerResidenceStatus);
                    _this.microFval.numberOfDependants.setValue(customer.microloanCustomerNumberOfDependants);
                    _this.showPersonalForm = false;
                    _this.showMicroForm = true;
                    _this.microFval.clientName.setValue(_this.fval.customer_name.value.toUpperCase());
                    _this.microFval.clientName.disable();
                    _this.microFval.currentResidence.setValue(_this.fval.homeDetails.value.toUpperCase());
                    _this.microFval.currentResidence.disable();
                }
                else {
                    _this.errored = true;
                    _this.alertService.danger({
                        html: '<b>' + _this.fval.customer_name.value.toUpperCase() + ' Has no Micro Loan details</b>'
                    });
                }
            }, function (err) {
                _this.errored = true;
                console.log(err.statusText);
                _this.alertService.danger({
                    html: '<b>' + err.statusText + '</b>'
                });
            });
        }
    };
    EditPersonalInfoComponent.prototype.savingForm = function () {
        var _this = this;
        if (this.currentCustomer.productCodes.includes(100)) {
            this.others.getSavingsCustomer(this.currentCustomerId).subscribe(function (res) {
                if (res.length === 1) {
                    var customer = res[0];
                    _this.savingsCustomerId = customer.savingsCustomerId;
                    _this.savFval.monthlyIncome.setValue(customer.savingsCustomerMonthlyIncome);
                    _this.savFval.withdrawFreequency.setValue(customer.savingsCustomerWithdrawFreequency);
                    _this.savFval.customerTarget.setValue(customer.savingsCustomerTarget);
                    _this.fval.productCode.setValue(' ');
                    _this.showPersonalForm = false;
                    _this.showSaveForm = true;
                    _this.savFval.clientName.setValue(_this.fval.customer_name.value.toUpperCase());
                    _this.savFval.clientName.disable();
                }
                else {
                    _this.errored = true;
                    _this.alertService.danger({
                        html: '<b>' + _this.fval.customer_name.value.toUpperCase() + ' Has no Savings details</b>'
                    });
                }
            }, function (err) {
                _this.errored = true;
                console.log(err.statusText);
                _this.alertService.danger({
                    html: '<b>' + err.statusText + '</b>'
                });
            });
        }
    };
    EditPersonalInfoComponent.prototype.onCustomerNameChange = function (val) {
        var _this = this;
        this.customers.forEach(function (customer) {
            if (customer.customerName.toUpperCase() === val.toUpperCase()) {
                _this.currentCustomer = customer;
                _this.showAddPdtBtn = _this.currentCustomer.productCodes.length >= 20 ? false : true;
                _this.currentCustomerId = customer.customerId;
                _this.fval.main_contact_number1.setValue(customer.customerPhone1);
                _this.fval.main_contact_number2.setValue(customer.customerPhone2);
                _this.fval.id_type.setValue(customer.customerIdType);
                _this.fval.id_number.setValue(customer.customerIdNumber);
                _this.fval.dateOfBirth.setValue(new Date(customer.customerDateOfBirth));
                _this.fval.homeDetails.setValue(customer.customerHomeAreaDetails);
                _this.fval.clientComment.setValue(customer.customerComment);
                for (var _i = 0, _a = _this.stations; _i < _a.length; _i++) {
                    var station = _a[_i];
                    if (station.theStationLocationId === customer.fktheStationLocationIdCustomer) {
                        _this.fval.station.setValue(station.stationName.toUpperCase());
                    }
                }
                _this.clientPhotoUrl = customer.customerPhotoUrl;
                _this.clientIdUrl = customer.customerIdPhotoUrl;
            }
        });
    };
    EditPersonalInfoComponent.prototype.goBack = function () {
        this.showPersonalForm = true;
        this.showBodaForm = false;
        this.showTaxiForm = false;
        this.showMicroForm = false;
        this.showSaveForm = false;
        this.errored = false;
    };
    // toggle visibility of password field
    EditPersonalInfoComponent.prototype.toggleFieldType = function () {
        this.fieldType = !this.fieldType;
    };
    EditPersonalInfoComponent.prototype.revert = function () {
        this.userForm.reset();
    };
    EditPersonalInfoComponent.prototype.refresh = function () {
        // location.reload();
        this.router.navigate(['townmanagement']);
    };
    Object.defineProperty(EditPersonalInfoComponent.prototype, "fval", {
        get: function () {
            return this.userForm.controls;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EditPersonalInfoComponent.prototype, "bodaFval", {
        get: function () {
            return this.bodaClientForm.controls;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EditPersonalInfoComponent.prototype, "taxiFval", {
        get: function () {
            return this.taxiClientForm.controls;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EditPersonalInfoComponent.prototype, "microFval", {
        get: function () {
            return this.microClientForm.controls;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EditPersonalInfoComponent.prototype, "savFval", {
        get: function () {
            return this.savingsClientForm.controls;
        },
        enumerable: false,
        configurable: true
    });
    EditPersonalInfoComponent.prototype.updateCustomerDetails = function () {
        var _this = this;
        if (this.userForm.valid) {
            setTimeout(function () {
                var data = {
                    customerId: _this.currentCustomerId,
                    customerName: _this.fval.customer_name.value.toUpperCase(),
                    customerPhone1: _this.fval.main_contact_number1.value,
                    customerPhone2: _this.fval.main_contact_number2.value === '' ?
                        _this.fval.main_contact_number1.value :
                        _this.fval.main_contact_number2.value,
                    customerIdType: _this.fval.id_type.value.toUpperCase(),
                    customerIdPhotoUrl: _this.clientIdUrl,
                    customerPhotoUrl: _this.clientPhotoUrl,
                    customerDateOfBirth: _this.fval.dateOfBirth.value.getFullYear() + "-" + (_this.fval.dateOfBirth.value.getMonth() + 1) + "-" + _this.fval.dateOfBirth.value.getDate(),
                    customerIdNumber: _this.fval.id_number.value.toUpperCase(),
                    customerHomeAreaDetails: _this.fval.homeDetails.value.toUpperCase(),
                    customerComment: _this.fval.clientComment.value.toUpperCase(),
                    theStationLocationId: null,
                    userId: _this.User.userId
                };
                for (var _i = 0, _a = _this.stations; _i < _a.length; _i++) {
                    var station = _a[_i];
                    if (station.stationName.toUpperCase() === _this.fval.station.value.toUpperCase()) {
                        data.theStationLocationId = station.theStationLocationId;
                    }
                }
                if (data.theStationLocationId === null) {
                    _this.errored = true;
                    _this.alertService.danger({
                        html: '<b> The station chosen does not exist!</b>'
                    });
                    //  this.errored = false;
                    return;
                }
                else if (!_this.currentCustomerId) {
                    _this.errored = true;
                    _this.alertService.danger({
                        html: '<b> The customer chosen does not exist!</b>'
                    });
                }
                else {
                    // console.log(data);
                    _this.others.updateCustomer(data).subscribe(function (res) {
                        _this.posted = true;
                        _this.alertService.success({
                            html: '<b> Customer was updated successfully <b>'
                        });
                        _this.revert();
                        _this.bodaClientForm.reset();
                        setTimeout(function () {
                            _this.router.navigate(['townmanagement']);
                        }, 3000);
                    }, function (err) {
                        _this.errored = true;
                        console.log(err.statusText);
                        _this.alertService.danger({
                            html: '<b>' + err.statusText + '</b>'
                        });
                    });
                }
            }, 2000);
        }
        else {
            this.errored = true;
            this.alertService.danger({
                html: '<b> Some fields of the form have invalid values!</b>'
            });
        }
    };
    EditPersonalInfoComponent.prototype.save = function () {
        if (this.showBodaForm) {
            setTimeout(this.bodaCustomer(), 2000);
        }
        else if (this.showTaxiForm) {
            setTimeout(this.taxiCustomer(), 2000);
        }
        else if (this.showMicroForm) {
            setTimeout(this.microCustomer(), 2000);
        }
        else if (this.showSaveForm) {
            setTimeout(this.savingsCustomer(), 2000);
        }
    };
    EditPersonalInfoComponent.prototype.bodaCustomer = function () {
        var _this = this;
        if (this.bodaClientForm.valid) {
            if (this.bodaFval.ownershipStatus.value.toUpperCase() !== 'PAIDOUT'
                && (this.bodaFval.ownersName.value === '' ||
                    this.bodaFval.ownersPhoneNumber.value === '')) {
                this.errored = true;
                this.alertService.danger({
                    html: '<strong>The ownership details are missing!</strong>'
                });
            }
            else {
                var data_1 = {
                    bodabodaCustomerNumberPlate: this.bodaFval.bodabodaCustomerNumberPlate.value.toUpperCase().substring(0, 3) +
                        ' ' + this.bodaFval.bodabodaCustomerNumberPlate.value.toUpperCase().substring(3, this.bodaFval.bodabodaCustomerNumberPlate.value.toUpperCase().length),
                    bodabodaCustomerMakeOrType: this.bodaFval.bodaMakeorType.value.toUpperCase(),
                    bodabodaCustomerInsurance: this.bodaFval.bodaInsuarance.value.toUpperCase() === 'NONE' ?
                        1 : this.bodaFval.bodaInsuarance.value.toUpperCase() === 'REGULAR' ?
                        2 : 3,
                    bodabodaCustomerDateOfJoinStage: this.bodaFval.dateOfJoiningStage.value.getFullYear() + "-" + (this.bodaFval.dateOfJoiningStage.value.getMonth() + 1) + "-" + this.bodaFval.dateOfJoiningStage.value.getDate(),
                    bodabodaOwnershipStatus: this.bodaFval.ownershipStatus.value.toUpperCase() === 'ONLOAN' ?
                        1 : this.bodaFval.ownershipStatus.value.toUpperCase() === 'PAIDOUT' ?
                        2 : 3,
                    bodabodaCustomerOwnersName: this.bodaFval.ownershipStatus.value.toUpperCase() === 'PAIDOUT' ?
                        this.fval.customer_name.value.toUpperCase() :
                        this.bodaFval.ownersName.value.toUpperCase(),
                    bodabodaCustomerOwnersPhone1: this.bodaFval.ownershipStatus.value.toUpperCase() === 'PAIDOUT' ?
                        this.fval.main_contact_number1.value :
                        this.bodaFval.ownersPhoneNumber.value,
                    bodabodaCustomerFrontPhotoUrl: this.bodaFrontUrl,
                    bodabodaCustomerSidePhotoUrl: this.bodaSideUrl,
                    bodabodaCustomerRearPhotoUrl: this.bodaRearUrl,
                    customerId: this.currentCustomerId,
                    bodabodaStageId: null,
                    productCode: 200
                };
                this.bodaStages.forEach(function (bodaStage) {
                    if (bodaStage.bodabodaStageName.toUpperCase() === _this.bodaFval.bodaStage.value) {
                        data_1.bodabodaStageId = bodaStage.bodabodaStageId;
                    }
                });
                // console.log(data);
                if (data_1.bodabodaStageId === null) {
                    this.errored = true;
                    this.alertService.danger({
                        html: '<b> Bodaboda stage selected was not found! </b>'
                    });
                    return;
                }
                else {
                    if (this.currentCustomer.productCodes.includes(200)) {
                        data_1 = Object.assign({ bodabodaCustomerId: this.bodabodaCustomerId }, data_1);
                        this.others.updateBodaCustomer(data_1).subscribe(function (res) {
                            _this.posted = true;
                            _this.alertService.success({
                                html: '<b> Customer bodaboda product was updated successfully <b>'
                            });
                            _this.revert();
                            _this.bodaClientForm.reset();
                            setTimeout(function () {
                                _this.router.navigate(['townmanagement']);
                            }, 3000);
                        }, function (err) {
                            _this.errored = true;
                            console.log(err.statusText);
                            _this.alertService.danger({
                                html: '<b>' + err.error.error.message + '</b>'
                            });
                        });
                    }
                    else {
                        this.others.createBodaCustomer(data_1).subscribe(function (res) {
                            _this.posted = true;
                            _this.alertService.success({
                                html: '<b> BodaBoda product was added successfully <b>'
                            });
                            _this.revert();
                            _this.bodaClientForm.reset();
                            setTimeout(function () {
                                _this.router.navigate(['townmanagement']);
                            }, 3000);
                        }, function (err) {
                            _this.errored = true;
                            console.log(err.statusText);
                            _this.alertService.danger({
                                html: '<b>' + err.error.error.message + '</b>'
                            });
                        });
                    }
                }
            }
        }
        else {
            this.errored = true;
            this.alertService.danger({
                html: '<strong>Some form fields where not filled!</strong>'
            });
        }
    };
    EditPersonalInfoComponent.prototype.taxiCustomer = function () {
        var _this = this;
        if (this.taxiClientForm.valid) {
            if (this.taxiFval.ownershipStatus.value.toUpperCase() !== 'PAIDOUT'
                && (this.taxiFval.ownersName.value === '' ||
                    this.taxiFval.ownersPhoneNumber.value === '')) {
                this.errored = true;
                this.alertService.danger({
                    html: '<strong>The ownership details are missing!</strong>'
                });
            }
            else {
                var data_2 = {
                    taxiCustomerNumberPlate: this.taxiFval.taxiCustomerNumberPlate.value.toUpperCase().substring(0, 3) +
                        ' ' + this.taxiFval.taxiCustomerNumberPlate.value.toUpperCase().substring(3, this.taxiFval.taxiCustomerNumberPlate.value.toUpperCase().length),
                    taxiCustomerDrivingPermitNumber: this.taxiFval.drivingPermit.value,
                    taxiCustomerMakeOrType: this.taxiFval.taxiMakeorType.value.toUpperCase(),
                    taxiCustomerInsurance: this.taxiFval.taxiInsuarance.value.toUpperCase() === 'NONE' ?
                        1 : this.taxiFval.taxiInsuarance.value.toUpperCase() === 'REGULAR' ?
                        2 : 3,
                    taxiCustomerDateOfJoinStage: this.taxiFval.dateOfJoiningStage.value.getFullYear() + "-" + (this.taxiFval.dateOfJoiningStage.value.getMonth() + 1) + "-" + this.taxiFval.dateOfJoiningStage.value.getDate(),
                    taxiCustomerOwnershipStatus: this.taxiFval.ownershipStatus.value.toUpperCase() === 'ONLOAN' ?
                        1 : this.taxiFval.ownershipStatus.value.toUpperCase() === 'PAIDOUT' ?
                        2 : 3,
                    taxiCustomerOwnersName: this.taxiFval.ownershipStatus.value.toUpperCase() === 'PAIDOUT' ?
                        this.fval.customer_name.value.toUpperCase() :
                        this.taxiFval.ownersName.value.toUpperCase(),
                    taxiCustomerOwnersPhone: this.taxiFval.ownershipStatus.value.toUpperCase() === 'PAIDOUT' ?
                        this.fval.main_contact_number1.value :
                        this.taxiFval.ownersPhoneNumber.value,
                    taxiCustomerFrontPhotoUrl: this.taxiFrontUrl,
                    taxiCustomerSidePhotoUrl: this.taxiSideUrl,
                    taxiCustomerRearPhotoUrl: this.taxiRearUrl,
                    customerId: this.currentCustomerId,
                    taxiStageId: null,
                    productCode: 300
                };
                this.taxiStages.forEach(function (taxiStage) {
                    if (taxiStage.taxiStageName.toUpperCase() === _this.taxiFval.taxiStage.value) {
                        data_2.taxiStageId = taxiStage.taxiStageId;
                    }
                });
                // console.log(data);
                if (data_2.taxiStageId === null) {
                    this.errored = true;
                    this.alertService.danger({
                        html: '<b> Taxi stage selected was not found! </b>'
                    });
                    return;
                }
                else {
                    if (this.currentCustomer.productCodes.includes(300)) {
                        data_2 = Object.assign({ taxiCustomerId: this.taxiCustomerId }, data_2);
                        this.others.updateTaxiCustomer(data_2).subscribe(function (res) {
                            _this.posted = true;
                            _this.alertService.success({
                                html: '<b> Customer taxi fuel product was updated successfully <b>'
                            });
                            _this.revert();
                            _this.taxiClientForm.reset();
                            setTimeout(function () {
                                _this.router.navigate(['townmanagement']);
                            }, 3000);
                        }, function (err) {
                            console.log(err.statusText);
                            _this.alertService.danger({
                                html: '<b>' + err.error.error.message + '</b>'
                            });
                        });
                    }
                    else {
                        this.others.createTaxiCustomer(data_2).subscribe(function (res) {
                            _this.posted = true;
                            _this.alertService.success({
                                html: '<b>Taxi fuel product was added successfully <b>'
                            });
                            _this.revert();
                            _this.taxiClientForm.reset();
                            setTimeout(function () {
                                _this.router.navigate(['townmanagement']);
                            }, 3000);
                        }, function (err) {
                            console.log(err.statusText);
                            _this.alertService.danger({
                                html: '<b>' + err.error.statusText + '</b>'
                            });
                        });
                    }
                }
            }
        }
        else {
            this.errored = true;
            this.alertService.danger({
                html: '<strong>Some form fields where not filled!</strong>'
            });
        }
    };
    EditPersonalInfoComponent.prototype.microCustomer = function () {
        var _this = this;
        if (this.microClientForm.valid) {
            var data = {
                microloanCustomerCurrentBusinessType: this.microFval.currentBusinesstype.value.toUpperCase(),
                microloanCustomerCurrentBusinessLocation: this.microFval.businessLocation.value.toUpperCase(),
                microloanCustomerAverageDailyExpenses: this.microFval.averageDailyExpenses.value,
                microloanCustomerAverageDailyIncome: this.microFval.averageDailyIncome.value,
                microloanCustomerCurrentResidence: this.microFval.currentResidence.value.toUpperCase(),
                microloanCustomerResidenceStatus: this.microFval.residenceStatus.value.toUpperCase(),
                microloanCustomerNumberOfDependants: this.microFval.numberOfDependants.value,
                customerId: this.currentCustomerId,
                productCode: 400
            };
            // console.log(data);
            if (this.currentCustomer.productCodes.includes(400)) {
                data = Object.assign({ microloanCustomerId: this.microloanCustomerId }, data);
                this.others.updateMicroloanCustomer(data).subscribe(function (res) {
                    _this.posted = true;
                    _this.alertService.success({
                        html: '<b> Customer micro-loan product was updated successfully <b>'
                    });
                    _this.revert();
                    _this.microClientForm.reset();
                    setTimeout(function () {
                        _this.router.navigate(['townmanagement']);
                    }, 3000);
                }, function (err) {
                    console.log(err.statusText);
                    _this.alertService.danger({
                        html: '<b>' + err.error.error.message + '</b>'
                    });
                });
            }
            else {
                this.others.createMicroloanCustomer(data).subscribe(function (res) {
                    _this.posted = true;
                    _this.alertService.success({
                        html: '<b> Micro-loan product was added successfully <b>'
                    });
                    _this.revert();
                    _this.microClientForm.reset();
                    setTimeout(function () {
                        _this.router.navigate(['townmanagement']);
                    }, 3000);
                }, function (err) {
                    console.log(err.statusText);
                    _this.alertService.danger({
                        html: '<b>' + err.error.error.message + '</b>'
                    });
                });
            }
        }
        else {
            this.errored = true;
            this.alertService.danger({
                html: '<strong>Some form fields where not filled!</strong>'
            });
        }
    };
    EditPersonalInfoComponent.prototype.savingsCustomer = function () {
        var _this = this;
        if (this.savingsClientForm.valid) {
            var data = {
                savingsCustomerMonthlyIncome: this.savFval.monthlyIncome.value,
                savingsCustomerWithdrawFreequency: this.savFval.withdrawFreequency.value,
                savingsCustomerTarget: this.savFval.customerTarget.value.toUpperCase(),
                customerId: this.currentCustomerId,
                productCode: 100
            };
            // console.log(data);
            if (this.currentCustomer.productCodes.includes(100)) {
                data = Object.assign({ savingsCustomerId: this.savingsCustomerId }, data);
                this.others.updateSavingsCustomer(data).subscribe(function (res) {
                    _this.posted = true;
                    _this.alertService.success({
                        html: '<b> Customer savings product was updated successfully <b>'
                    });
                    _this.revert();
                    _this.microClientForm.reset();
                    setTimeout(function () {
                        _this.router.navigate(['townmanagement']);
                    }, 3000);
                }, function (err) {
                    console.log(err.statusText);
                    _this.alertService.danger({
                        html: '<b>' + err.error.error.message + '</b>'
                    });
                });
            }
            else {
                this.others.createSavingsCustomer(data).subscribe(function (res) {
                    _this.posted = true;
                    _this.alertService.success({
                        html: '<b> Savings product was added successfully <b>'
                    });
                    _this.revert();
                    _this.microClientForm.reset();
                    setTimeout(function () {
                        _this.router.navigate(['townmanagement']);
                    }, 3000);
                }, function (err) {
                    console.log(err.statusText);
                    _this.alertService.danger({
                        html: '<b>' + err.error.error.message + '</b>'
                    });
                });
            }
        }
        else {
            this.errored = true;
            this.alertService.danger({
                html: '<strong>Some form fields where not filled!</strong>'
            });
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
