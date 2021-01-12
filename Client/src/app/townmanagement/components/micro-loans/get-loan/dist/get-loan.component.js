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
exports.GetLoanComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var custom_validator_1 = require("src/app/validators/custom-validator");
var operators_1 = require("rxjs/operators");
var GetLoanComponent = /** @class */ (function () {
    function GetLoanComponent(authService, others, spinner, router, alertService, storage) {
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
        this.showUserForm = false;
        this.showGarantorForm = false;
        this.showSecurityForm = false;
        this.nextGarantorForm = false;
        this.nextSecurityForm = false;
        this.serviceErrors = {};
        this.User = this.authService.loggedInUserInfo();
        this.guarantors = [];
        this.securities = [];
        this.data = [];
        this.phoneNumbers = [];
    }
    GetLoanComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.errored = false;
        this.posted = false;
        this.header = 'Get Loan';
        this.userForm = this.createFormGroup();
        this.garantorsForm = this.garantorsFormGroup();
        this.securityForm = this.securityFormGroup();
        this.others.getAllTheStationLocationsByTown(this.User.userLocationId).subscribe(function (res) {
            _this.stations = res;
            // tslint:disable-next-line: only-arrow-functions
        }, function (err) { return console.log(err.statusText); });
        this.others.getSecurityType().subscribe(function (res) {
            _this.securityTypes = res;
        }, function (err) {
            _this.errored = true;
            _this.alertService.danger({
                html: '<b>' + err.error.error.message + '</b>'
            });
        });
        this.others.getTxnDetails().subscribe(function (res) {
            _this.txns = res;
            // console.log(res);
        }, function (err) {
            _this.errored = true;
            _this.alertService.danger({
                html: '<b>' + err.error.error.message + '</b>'
            });
        });
        this.others.getMicroCustomers().subscribe(function (res) {
            if (res.length > 0) {
                _this.customers = res;
                _this.phoneNumbers = [];
                _this.checkedClient = {};
                _this.customers.forEach(function (customer) {
                    _this.phoneNumbers.push(customer.customerPhone1);
                });
            }
            else {
                _this.errored = true;
                _this.showUserForm = false;
                _this.showGarantorForm = false;
                _this.showSecurityForm = false;
                _this.alertService.danger({
                    html: '<b>There are no Micro Loan customers registered</b>'
                });
            }
        }, function (err) {
            _this.errored = true;
            console.log(err);
            _this.alertService.danger({
                html: '<b>' + err.error.error.message + '</b>'
            });
        });
    };
    GetLoanComponent.prototype.createFormGroup = function () {
        return new forms_1.FormGroup({
            station: new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required])),
            user_contact_number: new forms_1.FormControl('', forms_1.Validators.compose([
                forms_1.Validators.required,
                custom_validator_1.CustomValidator.patternValidator(/^(([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9]))$/, { hasNumber: true }),
            ])),
            loanpurpose: new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required])),
            amount_to_pay: new forms_1.FormControl({ value: '', disabled: false }, forms_1.Validators.compose([
                forms_1.Validators.required,
                custom_validator_1.CustomValidator.patternValidator(/\d/, { hasNumber: true }),
                forms_1.Validators.maxLength(6),
                forms_1.Validators.minLength(3),
            ])),
            pin: new forms_1.FormControl({ value: '', disabled: false }, forms_1.Validators.compose([
                forms_1.Validators.required,
                custom_validator_1.CustomValidator.patternValidator(/\d/, { hasNumber: true }),
                forms_1.Validators.maxLength(4),
                forms_1.Validators.minLength(4),
            ]))
        });
    };
    GetLoanComponent.prototype.garantorsFormGroup = function () {
        return new forms_1.FormGroup({
            name: new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required])),
            main_contact_number1: new forms_1.FormControl('', forms_1.Validators.compose([
                forms_1.Validators.required,
                custom_validator_1.CustomValidator.patternValidator(/^(([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9]))$/, { hasNumber: true }),
            ])),
            main_contact_number2: new forms_1.FormControl('', forms_1.Validators.compose([
                custom_validator_1.CustomValidator.patternValidator(/^(([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9]))$/, { hasNumber: true }),
            ])),
            url: new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required])),
            currentResidence: new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required])),
            currentBusinesstype: new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required])),
            businessLocation: new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required]))
        });
    };
    GetLoanComponent.prototype.securityFormGroup = function () {
        return new forms_1.FormGroup({
            type: new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required])),
            name: new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required])),
            location: new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required])),
            url: new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required]))
        });
    };
    GetLoanComponent.prototype.onChages = function (selectedChange) {
        if (selectedChange !== '') {
            for (var _i = 0, _a = this.stations; _i < _a.length; _i++) {
                var station = _a[_i];
                if (station.stationName.toUpperCase() === selectedChange) {
                    this.stationLocationId = station.theStationLocationId;
                    this.showUserForm = true;
                }
                else {
                    this.errored = true;
                    this.alertService.danger({
                        html: '<b> The station provided does not exist. </v>'
                    });
                    this.showUserForm = false;
                    this.stationLocationId = null;
                }
            }
        }
    };
    GetLoanComponent.prototype.refresh = function () {
        location.reload();
    };
    GetLoanComponent.prototype.checkLoanbility = function (value) {
        if (value !== '') {
            var microCustomers = __spreadArrays(this.customers);
            microCustomers = microCustomers.filter(function (customer) { return customer.customerPhone1 === value; });
            if (microCustomers.length === 1) {
                this.checkedClient = microCustomers[0];
            }
            else {
                this.errored = true;
                this.alertService.danger({
                    html: '<b> client does not exist</b>'
                });
                this.fval.user_contact_number.setValue('');
            }
            // this.openModal(template);
        }
    };
    GetLoanComponent.prototype.onFileSelected = function (event) {
        // console.log(event.target.id);
        var folder;
        switch (event.target.id) {
            case 'guarantorUrl':
                folder = 'clientImages/microLoan/guarantors';
                this.upload(event.target.id, event.target.files[0], folder);
                break;
            case 'securityUrl':
                folder = 'clientImages/microLoan/securities';
                this.upload(event.target.id, event.target.files[0], folder);
                break;
        }
    };
    GetLoanComponent.prototype.upload = function (inputType, getfile, path) {
        var _this = this;
        var n = Date.now();
        var file = getfile;
        var filePath = path + "/" + n;
        var fileRef = this.storage.ref(filePath);
        var task = this.storage.upload(filePath, file);
        var result = task
            .snapshotChanges()
            .pipe(operators_1.finalize(function () {
            var downloadURL = fileRef.getDownloadURL();
            downloadURL.subscribe(function (url) {
                if (url) {
                    switch (inputType) {
                        case 'guarantorUrl':
                            _this.garantorsPhotoUrl = url;
                            // console.log(this.garantorsPhotoUrl);
                            break;
                        case 'securityUrl':
                            _this.securityPhotoUrl = url;
                            // console.log(this.securityPhotoUrl);
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
    GetLoanComponent.prototype.goBack = function () {
        this.fval.productCode.setValue(this.fval.productCode.value);
        this.showFinalBtn = false;
        this.showcompleteBtn = true;
        this.errored = false;
    };
    // toggle visibility of password field
    GetLoanComponent.prototype.toggleFieldType = function () {
        this.fieldType = !this.fieldType;
    };
    GetLoanComponent.prototype.revert = function () {
        this.userForm.reset();
    };
    Object.defineProperty(GetLoanComponent.prototype, "fval", {
        get: function () {
            return this.userForm.controls;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GetLoanComponent.prototype, "garantorFval", {
        get: function () {
            return this.garantorsForm.controls;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GetLoanComponent.prototype, "securityFval", {
        get: function () {
            return this.securityForm.controls;
        },
        enumerable: false,
        configurable: true
    });
    GetLoanComponent.prototype.assignTxnId = function (familyName, typeName) {
        for (var _i = 0, _a = this.txns; _i < _a.length; _i++) {
            var txn = _a[_i];
            if (txn.txnDetailsFamilyName.toUpperCase() === familyName && txn.txnDetailsTypeName.toUpperCase() === typeName) {
                return txn.txnDetailsId;
            }
        }
    };
    GetLoanComponent.prototype.getSecurityTypeCode = function (typeName) {
        for (var _i = 0, _a = this.securityTypes; _i < _a.length; _i++) {
            var item = _a[_i];
            if (item.securityTypeName === typeName) {
                return item.securityTypeCode;
            }
        }
    };
    GetLoanComponent.prototype.saveAndNew = function () {
        var _this = this;
        if (this.showUserForm) {
            if (Number(this.fval.pin.value) === this.checkedClient.customerSecretPin) {
                var txn = {
                    txnAmount: parseInt(this.fval.amount_to_pay.value.replace(/[\D\s\._\-]+/g, ''), 10),
                    customerId: this.checkedClient.customerId,
                    txnDetailsId: this.assignTxnId('MICROLOAN', 'LOANDISBURSEMENT'),
                    userId: this.User.userId,
                    productCode: 400,
                    microLoanPurpose: this.fval.loanpurpose.value.toUpperCase(),
                    theStationLocationId: this.stationLocationId
                };
                if (txn.txnDetailsId) {
                    this.data.push(txn);
                    // console.log(this.data);
                    this.posted = true;
                    this.alertService.success({
                        html: '<b> saved successfully</b>'
                    });
                    this.showUserForm = false;
                    this.showGarantorForm = true;
                }
                else {
                    return;
                }
            }
            else {
                this.errored = true;
                this.alertService.danger({
                    html: '<b>Secret pin does not much</b>'
                });
            }
        }
        else if (this.showGarantorForm) {
            setTimeout(function () {
                _this.guarantors.push({
                    microLoanGuarantorName: _this.garantorFval.name.value.toUpperCase(),
                    microLoanGuarantorPhone1: _this.garantorFval.main_contact_number1.value.toUpperCase(),
                    microLoanGuarantorPhone2: _this.garantorFval.main_contact_number2.value === '' ? _this.garantorFval.main_contact_number1.value :
                        _this.garantorFval.main_contact_number2.value,
                    microLoanGuarantorPlaceOfResidense: _this.garantorFval.currentResidence.value.toUpperCase(),
                    microLoanGuarantorTypeOfBusiness: _this.garantorFval.currentBusinesstype.value.toUpperCase(),
                    microLoanGuarantorBusinessLocation: _this.garantorFval.businessLocation.value.toUpperCase(),
                    microLoanGuarantorPhotoUrl: _this.garantorsPhotoUrl
                });
                // console.log(this.guarantors);
                _this.posted = true;
                _this.alertService.success({
                    html: '<b> saved successfully</b>'
                });
                _this.garantorsForm = _this.garantorsFormGroup();
            }, 1000);
        }
        else if (this.showSecurityForm) {
            setTimeout(function () {
                var security = {
                    securityTypeCode: _this.getSecurityTypeCode(_this.securityFval.type.value.toUpperCase()),
                    microLoanSecurityName: _this.securityFval.name.value.toUpperCase(),
                    microLoanSecurityLocation: _this.securityFval.location.value.toUpperCase(),
                    microLoanSecurityPhotoUrl: _this.securityPhotoUrl
                };
                if (security.securityTypeCode) {
                    _this.securities.push(security);
                    // console.log(this.securities);
                    _this.posted = true;
                    _this.alertService.success({
                        html: '<b> saved successfully</b>'
                    });
                    _this.securityForm = _this.securityFormGroup();
                }
                else {
                    _this.errored = true;
                    _this.alertService.danger({
                        html: '<b> The security Type choosen does not exist</b>'
                    });
                }
            }, 3000);
        }
    };
    GetLoanComponent.prototype.saveAndNext = function () {
        var _this = this;
        if (this.showGarantorForm) {
            setTimeout(function () {
                _this.guarantors.push({
                    microLoanGuarantorName: _this.garantorFval.name.value.toUpperCase(),
                    microLoanGuarantorPhone1: _this.garantorFval.main_contact_number1.value.toUpperCase(),
                    microLoanGuarantorPhone2: _this.garantorFval.main_contact_number2.value === '' ? _this.garantorFval.main_contact_number1.value :
                        _this.garantorFval.main_contact_number2.value,
                    microLoanGuarantorPlaceOfResidense: _this.garantorFval.currentResidence.value.toUpperCase(),
                    microLoanGuarantorTypeOfBusiness: _this.garantorFval.currentBusinesstype.value.toUpperCase(),
                    microLoanGuarantorBusinessLocation: _this.garantorFval.businessLocation.value.toUpperCase(),
                    microLoanGuarantorPhotoUrl: _this.garantorsPhotoUrl
                });
                // console.log(this.guarantors);
                _this.posted = true;
                _this.alertService.success({
                    html: '<b> saved successfully</b>'
                });
                _this.showGarantorForm = false;
                _this.showSecurityForm = true;
            }, 1000);
        }
        else if (this.showSecurityForm) {
            setTimeout(function () {
                var security = {
                    securityTypeCode: _this.getSecurityTypeCode(_this.securityFval.type.value.toUpperCase()),
                    microLoanSecurityName: _this.securityFval.name.value.toUpperCase(),
                    microLoanSecurityLocation: _this.securityFval.location.value.toUpperCase(),
                    microLoanSecurityPhotoUrl: _this.securityPhotoUrl
                };
                if (security.securityTypeCode) {
                    _this.securities.push(security);
                    // console.log(this.securities);
                    _this.postLoan();
                }
                else {
                    _this.errored = true;
                    _this.alertService.danger({
                        html: '<b> The security Type choosen does not exist</b>'
                    });
                }
            }, 3000);
        }
    };
    GetLoanComponent.prototype.skip = function () {
        if (this.showGarantorForm) {
            this.showGarantorForm = false;
            this.showSecurityForm = true;
        }
        else if (this.showSecurityForm) {
            this.postLoan();
        }
    };
    GetLoanComponent.prototype.postLoan = function () {
        var _this = this;
        this.data.push([this.guarantors, this.securities]);
        // console.log(this.data);
        this.others.createMicroLoan(this.data).subscribe(function (res) {
            if (res) {
                _this.posted = true;
                _this.alertService.success({
                    html: '<b> Loan was initiated successfully, wait for approval and confirm</b>'
                });
                setTimeout(function () {
                    _this.router.navigate(['/townmanagement/microloan/confirm']);
                }, 3000);
            }
        }, function (err) {
            _this.errored = true;
            if (err.error.error.status === 500) {
                _this.alertService.danger({
                    html: '<b> Sever Could Not handle this request</b>'
                });
            }
            else {
                _this.alertService.danger({
                    html: '<b>' + err.error.error.message + '</b>'
                });
            }
        });
    };
    GetLoanComponent = __decorate([
        core_1.Component({
            selector: 'app-get-loan',
            templateUrl: './get-loan.component.html',
            styleUrls: ['./get-loan.component.scss']
        })
    ], GetLoanComponent);
    return GetLoanComponent;
}());
exports.GetLoanComponent = GetLoanComponent;
