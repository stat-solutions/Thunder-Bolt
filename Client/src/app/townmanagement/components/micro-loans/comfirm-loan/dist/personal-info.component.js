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
var operators_1 = require("rxjs/operators");
var PersonalInfoComponent = /** @class */ (function () {
    function PersonalInfoComponent(authService, others, spinner, router, alertService, storage) {
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
    PersonalInfoComponent.prototype.ngOnInit = function () {
        this.errored = false;
        this.posted = false;
        this.microClientForm = this.microClientFormGroup();
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
    PersonalInfoComponent.prototype.onFileSelected = function (event) {
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
    PersonalInfoComponent.prototype.upload = function (inputType, getfile, path) {
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
    PersonalInfoComponent.prototype.goBack = function () {
        this.fval.productCode.setValue(this.fval.productCode.value);
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
    PersonalInfoComponent.prototype.save = function () {
        setTimeout(this.saveClientAndPdt(), 5000);
    };
    PersonalInfoComponent.prototype.saveClientAndPdt = function () {
        var _this = this;
        if (this.showMicroForm) {
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
                        _this.goBack();
                        _this.microClientForm = _this.microClientFormGroup();
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
