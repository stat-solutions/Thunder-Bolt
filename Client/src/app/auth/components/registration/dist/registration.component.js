"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.RegistrationComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var custom_validator_1 = require("src/app/validators/custom-validator");
var operators_1 = require("rxjs/operators");
var RegistrationComponent = /** @class */ (function () {
    function RegistrationComponent(authService, others, spinner, router, alertService, fb, storage) {
        this.authService = authService;
        this.others = others;
        this.spinner = spinner;
        this.router = router;
        this.alertService = alertService;
        this.fb = fb;
        this.storage = storage;
        this.registered = false;
        this.submitted = false;
        this.errored = false;
        this.posted = false;
        this.serviceErrors = {};
    }
    RegistrationComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.getRoles();
        this.getUnits();
        this.others.getAllTheAreaLocations().subscribe(function (res) { return _this.areas = res; });
        this.others.getAllTheTownLocations().subscribe(function (res) { return _this.towns = res; });
        this.others.getAllTheStationLocations().subscribe(function (res) { return _this.stations = res; });
        this.userForm = this.createFormGroup();
        this.myDateValue = new Date();
    };
    RegistrationComponent.prototype.createFormGroup = function () {
        return this.fb.group({
            full_name: new forms_1.FormControl('', forms_1.Validators.compose([
                forms_1.Validators.required,
            ])),
            email: new forms_1.FormControl('', forms_1.Validators.compose([
                forms_1.Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
            ])),
            user_contact_number: new forms_1.FormControl('', forms_1.Validators.compose([
                forms_1.Validators.required,
                custom_validator_1.CustomValidator.patternValidator(/^(([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9]))$/, { hasNumber: true })
            ])),
            position: new forms_1.FormControl('', forms_1.Validators.compose([
                forms_1.Validators.required
            ])),
            central: new forms_1.FormControl(''),
            area: new forms_1.FormControl(''),
            town: new forms_1.FormControl(''),
            station: new forms_1.FormControl(''),
            id_type: new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required])),
            idPhotoUrl: new forms_1.FormControl('', forms_1.Validators.compose([])),
            id_number: new forms_1.FormControl('', forms_1.Validators.compose([
                forms_1.Validators.required,
            ])),
            date_of_birth: new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required])),
            password: new forms_1.FormControl('', forms_1.Validators.compose([
                // 1. Password Field is Required
                forms_1.Validators.required,
                // 2. check whether the entered password has a number
                custom_validator_1.CustomValidator.patternValidator(/^(([0-9])([0-9])([0-9])([0-9]))$/, {
                    hasNumber: true
                }),
                forms_1.Validators.minLength(4),
                forms_1.Validators.maxLength(4),
            ])),
            confirmPassword: new forms_1.FormControl('', forms_1.Validators.compose([
                // 1. Password Field is Required
                forms_1.Validators.required,
                // 2. check whether the entered password has a number
                custom_validator_1.CustomValidator.patternValidator(/^(([0-9])([0-9])([0-9])([0-9]))$/, {
                    hasNumber: true
                }),
                // 6. Has a length of exactly 4 digits
                forms_1.Validators.minLength(4),
                forms_1.Validators.maxLength(4),
            ]))
        }, { validator: custom_validator_1.CustomValidator.passwordMatchValidator });
    };
    RegistrationComponent.prototype.setSelectedChanges = function (selectedChange) {
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
            case 'AREA USER':
                this.fval.area.setValidators([
                    forms_1.Validators.required,
                ]);
                break;
            case 'TOWN USER':
                this.fval.town.setValidators([
                    forms_1.Validators.required,
                ]);
                break;
            case 'STATION USER':
                this.fval.station.setValidators([
                    forms_1.Validators.required,
                ]);
                break;
            case 'CENTRAL USER':
                this.fval.central.setValidators([
                    forms_1.Validators.required,
                ]);
                break;
        }
    };
    RegistrationComponent.prototype.revert = function () {
        this.userForm.reset();
    };
    RegistrationComponent.prototype.log = function () {
    };
    Object.defineProperty(RegistrationComponent.prototype, "fval", {
        get: function () {
            return this.userForm.controls;
        },
        enumerable: false,
        configurable: true
    });
    // toggle visibility of password field
    RegistrationComponent.prototype.toggleFieldType = function () {
        this.fieldType = !this.fieldType;
    };
    RegistrationComponent.prototype.returnHome = function () {
        var _this = this;
        this.spinner.hide();
        this.revert();
        setTimeout(function () {
            _this.router.navigate(['']);
        }, 2000);
    };
    RegistrationComponent.prototype.getUnits = function () {
        var _this = this;
        this.others.getBussinessUnitLocations().subscribe(function (res) {
            _this.units = res;
            // console.log(this.units);
        }, function (err) { return console.log(err.statusText); });
    };
    RegistrationComponent.prototype.getRoles = function () {
        var _this = this;
        this.authService.getRoles().subscribe(function (x) {
            _this.roles = x;
            // tslint:disable-next-line: only-arrow-functions
            _this.roles = _this.roles.map(function (role) {
                return {
                    accessRightsId: role.accessRightsId,
                    roleName: role.roleName.replace(/_/g, ' ')
                };
            });
        });
    };
    RegistrationComponent.prototype.onFileSelected = function (event) {
        var _this = this;
        var n = Date.now();
        var file = event.target.files[0];
        var filePath = "Users/" + n;
        var fileRef = this.storage.ref(filePath);
        var task = this.storage.upload("Users/" + n, file);
        task
            .snapshotChanges()
            .pipe(operators_1.finalize(function () {
            _this.downloadURL = fileRef.getDownloadURL();
            _this.downloadURL.subscribe(function (url) {
                if (url) {
                    _this.userIdPhoto = url;
                    // console.log(this.userIdPhoto);
                }
            });
        }))
            .subscribe(function (url) {
            if (url) {
                // console.log(url);
            }
        });
    };
    RegistrationComponent.prototype.register = function () {
        var _this = this;
        // console.log('hi');
        this.submitted = true;
        this.spinner.show();
        if (this.userForm.invalid === true) {
            this.spinner.hide();
            return;
        }
        else {
            this.roles.forEach(function (role) {
                if (_this.fval.position.value === role.roleName) {
                    _this.selectedRole = role.accessRightsId;
                }
            });
            if (this.fval.position.value === 'AREA USER') {
                this.areas.forEach(function (area) {
                    if (_this.fval.area.value.toLowerCase() === area.areaRegionName.toLowerCase().replace(/_/g, ' ')) {
                        _this.selectedLocation = area.theAreaLocationId;
                    }
                });
            }
            else if (this.fval.position.value === 'TOWN USER') {
                this.towns.forEach(function (town) {
                    if (_this.fval.town.value.toLowerCase() === town.townName.toLowerCase().replace(/_/g, ' ')) {
                        _this.selectedLocation = town.theTownLocationId;
                    }
                });
            }
            else if (this.fval.position.value === 'STATION USER') {
                this.stations.forEach(function (station) {
                    if (_this.fval.station.value.toLowerCase() === station.stationName.toLowerCase().replace(/_/g, ' ')) {
                        _this.selectedLocation = station.theStationLocationId;
                    }
                });
            }
            else if (this.fval.position.value === 'ADMIN') {
                this.selectedLocation = 1000;
            }
            else if (this.fval.position.value === 'CENTRAL USER') {
                this.units.forEach(function (unit) {
                    if (_this.fval.central.value.toLowerCase() === unit.bussinessUnitName.toLowerCase().replace(/_/g, ' ')) {
                        _this.selectedLocation = unit.theBusinessUnitId;
                    }
                });
            }
            this.registerUser = {
                userName: this.fval.full_name.value.toUpperCase(),
                userEmail1: this.fval.email.value,
                userPhone1: "" + this.fval.user_contact_number.value,
                userIdPhotoUrl: this.userIdPhoto,
                userIdType: this.fval.id_type.value,
                userIdNumber: "" + this.fval.id_number.value.toUpperCase(),
                userDateOfBirth: this.fval.date_of_birth.value.getFullYear() + "-" + (this.fval.date_of_birth.value.getMonth() + 1) + "-" + this.fval.date_of_birth.value.getDate(),
                userPassword: Number(this.fval.password.value),
                fkAccessRightsIdUser: this.selectedRole,
                locationId: this.selectedLocation
            };
            // console.log(this.registerUser);
            if (this.registerUser.locationId) {
                this.authService.registerUser(this.registerUser).subscribe(function () {
                    _this.posted = true;
                    _this.spinner.hide();
                    _this.alertService.success({
                        html: '<b>User Registration Was Successful</b>' +
                            '</br>' +
                            'Wait for verification'
                    });
                    setTimeout(function () {
                        _this.router.navigate(['authpage/login']);
                    }, 3000);
                }, function (error) {
                    _this.spinner.hide();
                    _this.errored = true;
                    _this.serviceErrors = error;
                    _this.alertService.danger({
                        html: '<b>' + _this.serviceErrors + '</b>' + '<br/>'
                    });
                    _this.revert();
                });
            }
            else {
                this.spinner.hide();
                this.errored = true;
                this.alertService.danger({
                    html: '<b>' + 'No location address was selected' + '</b>' + '<br/>'
                });
            }
            this.spinner.hide();
            this.registered = true;
        }
    };
    RegistrationComponent = __decorate([
        core_1.Component({
            selector: 'app-registration',
            templateUrl: './registration.component.html',
            styleUrls: ['./registration.component.scss']
        })
    ], RegistrationComponent);
    return RegistrationComponent;
}());
exports.RegistrationComponent = RegistrationComponent;
