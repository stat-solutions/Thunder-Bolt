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
        this.registered = false;
        this.submitted = false;
        this.errored = false;
        this.posted = false;
        this.showFinalBtn = false;
        this.showcompleteBtn = true;
        this.addProduct = false;
        this.showPersonalForm = true;
        this.showBodaForm = false;
        this.showTaxiForm = false;
        this.showMicroForm = false;
        this.showSaveForm = false;
        this.currentForm = [];
        this.serviceErrors = {};
        this.User = this.authService.loggedInUserInfo();
        this.data = [];
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
    EditPersonalInfoComponent.prototype.savingsClientFormGroup = function () {
        return new forms_1.FormGroup({
            clientName: new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required])),
            monthlyIncome: new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required])),
            withdrawFreequency: new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required])),
            customerTarget: new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required]))
        });
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
                html: '<b> The station chose does not exist</b>'
            });
            return;
        }
        else {
            this.others.getCustomersByStation(theStationLocationId).subscribe(function (res) {
                _this.customers = res;
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
                console.log(selectedChange);
                this.bodaFval.ownersName.setValidators([forms_1.Validators.required]);
                this.bodaFval.ownersPhoneNumber.setValidators([forms_1.Validators.required]);
                this.taxiFval.ownersName.setValidators([forms_1.Validators.required]);
                this.taxiFval.ownersPhoneNumber.setValidators([forms_1.Validators.required]);
                break;
            case 'HIREDOUT':
                console.log(selectedChange);
                this.bodaFval.ownersName.setValidators([forms_1.Validators.required]);
                this.bodaFval.ownersPhoneNumber.setValidators([forms_1.Validators.required]);
                this.taxiFval.ownersName.setValidators([forms_1.Validators.required]);
                this.taxiFval.ownersPhoneNumber.setValidators([forms_1.Validators.required]);
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
        this.showPersonalForm = false;
        this.showBodaForm = true;
        this.showFinalBtn = true;
        this.showcompleteBtn = false;
        this.bodaFval.clientName.setValue(this.fval.customer_name.value.toUpperCase());
        this.bodaFval.clientName.disable();
    };
    EditPersonalInfoComponent.prototype.taxiForm = function () {
        this.showPersonalForm = false;
        this.showFinalBtn = true;
        this.showTaxiForm = true;
        this.showcompleteBtn = false;
        this.taxiFval.clientName.setValue(this.fval.customer_name.value.toUpperCase());
        this.taxiFval.clientName.disable();
    };
    EditPersonalInfoComponent.prototype.microForm = function () {
        this.showPersonalForm = false;
        this.showMicroForm = true;
        this.showFinalBtn = true;
        this.showcompleteBtn = false;
        this.microFval.clientName.setValue(this.fval.customer_name.value.toUpperCase());
        this.microFval.clientName.disable();
        this.microFval.currentResidence.setValue(this.fval.homeDetails.value.toUpperCase());
        this.microFval.currentResidence.disable();
    };
    EditPersonalInfoComponent.prototype.savingForm = function () {
        this.fval.productCode.setValue(' ');
        this.showPersonalForm = false;
        this.showSaveForm = true;
        this.showcompleteBtn = false;
        this.savFval.clientName.setValue(this.fval.customer_name.value.toUpperCase());
        this.savFval.clientName.disable();
    };
    EditPersonalInfoComponent.prototype.onCustomerNameChange = function (val) {
        var _this = this;
        this.customers.forEach(function (customer) {
            if (customer.customerName.toUpperCase() === val.toUpperCase()) {
                _this.currentCustomerId = customer.customerId;
                _this.fval.main_contact_number1.setValue(customer.customerPhone1);
                _this.fval.main_contact_number2.setValue(customer.customerPhone2);
                _this.fval.id_type.setValue(customer.customerIdType);
                _this.fval.id_number.setValue(customer.customerIdNumber);
                _this.fval.customerDateOfBirth.setValue(customer.customerDateOfBirth);
                _this.fval.customerHomeAreaDetails.setValue(customer.customerHomeAreaDetails);
                _this.fval.customerComment.setValue(customer.customerPhone1);
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
    EditPersonalInfoComponent.prototype.updateCustomerDetails = function () {
        if (this.userForm.valid) {
            this.data.push({
                customerId: 400000054,
                customerName: this.fval.customer_name.value.toUpperCase(),
                customerPhone1: this.fval.main_contact_number1.value,
                customerPhone2: this.fval.main_contact_number2.value === '' ?
                    this.fval.main_contact_number1.value :
                    this.fval.main_contact_number2.value,
                customerIdType: this.fval.id_type.value.toUpperCase(),
                customerIdPhotoUrl: this.clientPhotoUrl,
                customerPhotoUrl: this.clientIdUrl,
                customerDateOfBirth: this.fval.dateOfBirth.value.getFullYear() + "-" + (this.fval.dateOfBirth.value.getMonth() + 1) + "-" + this.fval.dateOfBirth.value.getDate(),
                customerIdNumber: this.fval.id_number.value,
                customerHomeAreaDetails: this.fval.homeDetails.value.toUpperCase(),
                customerComment: this.fval.clientComment.value.toUpperCase(),
                theStationLocationId: null,
                userId: this.User.userId
            });
            for (var _i = 0, _a = this.stations; _i < _a.length; _i++) {
                var station = _a[_i];
                if (station.stationName.toUpperCase() === this.fval.station.value.toUpperCase()) {
                    this.data[0].theStationLocationId = station.theStationLocationId;
                }
            }
            if (this.data[0].theStationLocationId === null || this.data[0].productCode === null) {
                this.errored = true;
                this.alertService.danger({
                    html: '<b> The station chose does not exist</b>'
                });
                this.errored = false;
                return;
            }
            else {
                console.log(this.data[0]);
            }
        }
    };
    EditPersonalInfoComponent.prototype.goBack = function () {
        // this.fval.clientPhotoUrl.setValue(this.data[0].customerPhotoUrl);
        // this.fval.idPhotoUrl.setValue(this.data[0].customerIdPhotoUrl);
        this.showPersonalForm = true;
        this.showBodaForm = false;
        this.showTaxiForm = false;
        this.showMicroForm = false;
        this.showSaveForm = false;
        this.showFinalBtn = false;
        this.showcompleteBtn = true;
        this.errored = false;
        this.data = [];
    };
    // toggle visibility of password field
    EditPersonalInfoComponent.prototype.toggleFieldType = function () {
        this.fieldType = !this.fieldType;
    };
    EditPersonalInfoComponent.prototype.revert = function () {
        this.userForm.reset();
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
    EditPersonalInfoComponent.prototype.save = function () {
        setTimeout(this.saveClientAndPdt(), 5000);
    };
    EditPersonalInfoComponent.prototype.saveClientAndPdt = function () {
        var _this = this;
        if (this.showBodaForm) {
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
                    this.data.push({
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
                        bodabodaCustomerOwnersName: this.bodaFval.ownersName.value.toUpperCase(),
                        bodabodaCustomerOwnersPhone1: this.bodaFval.ownersPhoneNumber.value,
                        bodabodaCustomerFrontPhotoUrl: this.bodaFrontUrl,
                        bodabodaCustomerSidePhotoUrl: this.bodaSideUrl,
                        bodabodaCustomerRearPhotoUrl: this.bodaRearUrl,
                        // customerId: 400000000,
                        bodabodaStageId: null,
                        productCode: this.data[0].productCode
                    });
                    this.bodaStages.forEach(function (bodaStage) {
                        if (bodaStage.bodabodaStageName.toUpperCase() === _this.bodaFval.bodaStage.value) {
                            _this.data[1].bodabodaStageId = bodaStage.bodabodaStageId;
                        }
                    });
                    console.log(this.data);
                    if (this.data[1].bodabodaStageId === null) {
                        this.errored = true;
                        this.alertService.danger({
                            html: '<b> taxi stage selected was not found </b>'
                        });
                        return;
                    }
                    else {
                        this.others.createCustomer(this.data).subscribe(function (res) {
                            _this.posted = true;
                            _this.data = [];
                            _this.alertService.success({
                                html: '<b> Customer was created successfully <b>'
                            });
                            _this.revert();
                            _this.bodaClientForm.reset();
                            setTimeout(function () {
                                location.reload();
                            }, 3000);
                        }, function (err) {
                            _this.data = [];
                            _this.errored = true;
                            console.log(err.statusText);
                            _this.alertService.danger({
                                html: '<b>' + err.error.error.message + '</b>'
                            });
                        });
                    }
                }
            }
            else {
                this.errored = true;
                this.alertService.danger({
                    html: '<strong>Some form fields where not filled!</strong>'
                });
            }
        }
        else if (this.showTaxiForm) {
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
                    this.data.push({
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
                        taxiCustomerOwnersName: this.taxiFval.ownersName.value.toUpperCase(),
                        taxiCustomerOwnersPhone: this.taxiFval.ownersPhoneNumber.value,
                        taxiCustomerFrontPhotoUrl: this.taxiFrontUrl,
                        taxiCustomerSidePhotoUrl: this.taxiSideUrl,
                        taxiCustomerRearPhotoUrl: this.taxiRearUrl,
                        // customerId: 400000000,
                        taxiStageId: null,
                        productCode: this.data[0].productCode
                    });
                    this.taxiStages.forEach(function (taxiStage) {
                        if (taxiStage.taxiStageName.toUpperCase() === _this.taxiFval.taxiStage.value) {
                            _this.data[1].taxiStageId = taxiStage.taxiStageId;
                        }
                    });
                    console.log(this.data);
                    if (this.data[1].taxiStageId === null) {
                        this.errored = true;
                        this.alertService.danger({
                            html: '<b> taxi stage selected was not found </b>'
                        });
                        return;
                    }
                    else {
                        this.others.createCustomer(this.data).subscribe(function (res) {
                            _this.posted = true;
                            _this.data = [];
                            _this.alertService.success({
                                html: '<b> Customer was created successfully <b>'
                            });
                            _this.revert();
                            _this.taxiClientForm.reset();
                            setTimeout(function () {
                                location.reload();
                            }, 3000);
                        }, function (err) {
                            _this.data = [];
                            console.log(err.statusText);
                            _this.alertService.danger({
                                html: '<b>' + err.error.error.message + '</b>'
                            });
                        });
                    }
                }
            }
            else {
                this.errored = true;
                this.alertService.danger({
                    html: '<strong>Some form fields where not filled!</strong>'
                });
            }
        }
        else if (this.showMicroForm) {
            if (this.microClientForm.valid) {
                this.data.push({
                    microloanCustomerLoanPurpose: this.microFval.loanpurpose.value.toUpperCase(),
                    microloanCustomerCurrentBusinessType: this.microFval.currentBusinesstype.value.toUpperCase(),
                    microloanCustomerCurrentBusinessLocation: this.microFval.businessLocation.value.toUpperCase(),
                    microloanCustomerAverageDailyExpenses: this.microFval.averageDailyExpenses.value,
                    microloanCustomerAverageDailyIncome: this.microFval.averageDailyIncome.value.toUpperCase(),
                    microloanCustomerCurrentResidence: this.microFval.currentResidence.value.toUpperCase(),
                    microloanCustomerResidenceStatus: this.microFval.residenceStatus.value.toUpperCase(),
                    microloanCustomerNumberOfDependants: this.microFval.numberOfDependants.value,
                    //  customerId: 400000000,
                    productCode: this.data[0].productCode
                });
                console.log(this.data);
                this.others.createCustomer(this.data).subscribe(function (res) {
                    _this.posted = true;
                    _this.data = [];
                    _this.alertService.success({
                        html: '<b> Customer was created successfully <b>'
                    });
                    _this.revert();
                    _this.microClientForm.reset();
                    setTimeout(function () {
                        location.reload();
                    }, 3000);
                }, function (err) {
                    _this.data = [];
                    console.log(err.statusText);
                    _this.alertService.danger({
                        html: '<b>' + err.error.error.message + '</b>'
                    });
                });
            }
            else {
                this.errored = true;
                this.alertService.danger({
                    html: '<strong>Some form fields where not filled!</strong>'
                });
            }
        }
        else if (this.showSaveForm) {
            if (this.savingsClientForm.valid) {
                this.data.push({
                    savingsCustomerMonthlyIncome: this.savFval.monthlyIncome.value,
                    savingsCustomerWithdrawFreequency: this.savFval.withdrawFreequency.value.toUpperCase(),
                    savingsCustomerTarget: this.savFval.customerTarget.value.toUpperCase(),
                    // customerId: 400000000,
                    productCode: this.data[0].productCode
                });
                console.log(this.data);
                this.others.createCustomer(this.data).subscribe(function (res) {
                    _this.posted = true;
                    _this.data = [];
                    _this.alertService.success({
                        html: '<b> Customer was created successfully <b>'
                    });
                    _this.revert();
                    _this.microClientForm.reset();
                    setTimeout(function () {
                        location.reload();
                    }, 3000);
                }, function (err) {
                    _this.data = [];
                    console.log(err.statusText);
                    _this.alertService.danger({
                        html: '<b>' + err.error.error.message + '</b>'
                    });
                });
            }
            else {
                this.errored = true;
                this.alertService.danger({
                    html: '<strong>Some form fields where not filled!</strong>'
                });
            }
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
