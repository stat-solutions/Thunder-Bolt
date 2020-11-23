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
var originFormControlNameNgOnChanges = forms_1.FormControlName.prototype.ngOnChanges;
forms_1.FormControlName.prototype.ngOnChanges = function () {
    var result = originFormControlNameNgOnChanges.apply(this, arguments);
    this.control.nativeElement = this.valueAccessor._elementRef.nativeElement;
    return result;
};
var RegistrationComponent = /** @class */ (function () {
    function RegistrationComponent(authService, others, spinner, router, alertService, fb) {
        this.authService = authService;
        this.others = others;
        this.spinner = spinner;
        this.router = router;
        this.alertService = alertService;
        this.fb = fb;
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
                forms_1.Validators.required,
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
    RegistrationComponent.prototype.revert = function () {
        this.userForm.reset();
    };
    RegistrationComponent.prototype.log = function () {
        // console.log(this.fval.central.value);
        // console.log(this.units);
        // this.units.forEach(unit => {
        //   if (this.fval.central.value === unit.bussinessUnitName) {
        //   console.log(unit);
        //     this.selectedLocation = unit.businnessUnitId;
        //     console.log(unit.businnessUnitId);
        //     console.log(this.selectedLocation);
        //   }
        // });
        // console.log(this.selectedLocation);
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
            _this.router.navigate(['authpage/loginpage']);
        }, 2000);
    };
    RegistrationComponent.prototype.getUnits = function () {
        var _this = this;
        this.others.getBussinessUnitLocations().subscribe(function (res) {
            _this.units = res;
            // console.log(this.units);
        }, function (err) { return console.log(err); });
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
    RegistrationComponent.prototype.register = function () {
        var _this = this;
        this.submitted = true;
        this.spinner.hide();
        if (this.userForm.invalid === true) {
            return;
        }
        else if (this.fval.position.value === 'CENTRAL USER' && this.fval.central.value === '') {
            this.spinner.hide();
            this.fval.central.nativeElement.focus();
            return;
        }
        else if (this.fval.position.value === 'AREA USER' && this.fval.area.value === '') {
            this.spinner.hide();
            this.fval.area.nativeElement.focus();
            return;
        }
        else if (this.fval.position.value === 'TOWN USER' && this.fval.town.value === '') {
            this.spinner.hide();
            this.fval.town.nativeElement.focus();
            return;
        }
        else if ((this.fval.position.value === 'STATION USER')
            && this.fval.station.value === '') {
            this.spinner.hide();
            this.fval.station.nativeElement.focus();
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
                    if (_this.fval.area.value.toString() === area.areaRegionName) {
                        _this.selectedLocation = area.theAreaLocationId;
                        // console.log(this.selectedLocation);
                    }
                });
            }
            else if (this.fval.position.value === 'TOWN USER') {
                this.towns.forEach(function (town) {
                    if (_this.fval.town.value.toString() === town.townName) {
                        _this.selectedLocation = town.theTownLocationId;
                        // console.log(this.selectedLocation);
                    }
                });
            }
            else if (this.fval.position.value === 'STATION USER') {
                this.stations.forEach(function (station) {
                    if (_this.fval.station.value.toString() === station.stationName) {
                        _this.selectedLocation = station.theStationLocationId;
                        // console.log(this.selectedLocation);
                    }
                });
            }
            else if (this.fval.position.value === 'ADMIN') {
                this.selectedLocation = 1000;
            }
            else if (this.fval.position.value === 'CENTRAL USER') {
                this.units.forEach(function (unit) {
                    if (_this.fval.central.value.toString() === unit.bussinessUnitName) {
                        _this.selectedLocation = unit.theBusinessUnitId;
                        // console.log(this.selectedLocation);
                    }
                });
            }
            this.registerUser = {
                userName: this.fval.full_name.value.toUpperCase(),
                userEmail1: this.fval.email.value,
                userPhone1: "" + this.fval.user_contact_number.value,
                userIdType: this.fval.id_type.value,
                userIdNumber: "" + this.fval.id_number.value.toUpperCase(),
                userDateOfBirth: this.fval.date_of_birth.value.getFullYear() + "-" + (this.fval.date_of_birth.value.getMonth() + 1) + "-" + this.fval.date_of_birth.value.getDate(),
                userPassword: Number(this.fval.password.value),
                fkAccessRightsIdUser: this.selectedRole,
                locationId: this.selectedLocation
            };
            // console.log(this.registerUser);
            if (this.registerUser.locationId === null) {
                this.spinner.hide();
                this.alertService.danger({
                    html: '<b>' + 'No location address was selected' + '</b>' + '<br/>'
                });
            }
            else {
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
                    setTimeout(function () {
                        // location.reload();
                    }, 5000);
                    console.log(error);
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
