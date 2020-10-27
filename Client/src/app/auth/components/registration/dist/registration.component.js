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
var RegistrationComponent = /** @class */ (function () {
    function RegistrationComponent(authService, spinner, router, alertService, fb) {
        this.authService = authService;
        this.spinner = spinner;
        this.router = router;
        this.alertService = alertService;
        this.fb = fb;
        this.registered = false;
        this.submitted = false;
        this.errored = false;
        this.posted = false;
        this.serviceErrors = {};
        this.areas = [
            'Central Region',
            'Western Region',
            'Southern Region',
            'Northern Region',
            'Eastern Region'
        ];
        this.towns = [
            { name: 'Kampala', area: 'Central Region' },
            { name: 'Wakiso', area: 'Central Region' },
            { name: 'Mbale', area: 'Eastern Region' },
            { name: 'Busia', area: 'Eastern Region' },
            { name: 'Mbarara', area: 'Western Region' },
            { name: 'Bushenyi', area: 'Western Region' },
            { name: 'Kisoro', area: 'Western Region' },
            { name: 'Kotido', area: 'Northern Region' },
            { name: 'Moroto', area: 'Northern Region' },
            { name: 'Arua', area: 'Northern Region' },
        ];
        this.stations = [
            { name: 'ndeba', town: 'Wakiso' },
            { name: 'ndejje', town: 'Kampala' },
            { name: 'matugga', town: 'Wakiso' },
            { name: 'kinawa', town: 'Kampala' },
            { name: 'kitale', town: 'Mbarara' },
            { name: 'katwe', town: 'Kampala' },
            { name: 'sogga', town: 'Mbale' },
            { name: 'kitwee', town: 'Wakiso' },
            { name: 'busega', town: 'Kampala' },
            { name: 'mbweera', town: 'Arua' },
        ];
    }
    RegistrationComponent.prototype.ngOnInit = function () {
        this.getRoles();
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
        this.spinner.show();
        if (this.userForm.invalid === true) {
            return;
        }
        else if (this.fval.position.value === 'AREA MANAGER' && this.fval.area === '') {
            this.alertService.success({
                html: '<b>Area was not selected</b>'
            });
            return;
        }
        else if (this.fval.position.value === 'TOWN MANAGER' && this.fval.town === '') {
            this.alertService.success({
                html: '<b>Town was not selected</b>'
            });
            return;
        }
        else if ((this.fval.position.value === 'STATION MANAGER'
            || this.fval.position.value === 'STATION MANAGER')
            && this.fval.station === '') {
            this.alertService.success({
                html: '<b>Station was not selected</b>'
            });
            return;
        }
        else {
            var selectedRole_1;
            var selectedLocation = void 0;
            this.roles.forEach(function (role) {
                if (_this.fval.position.value === role.roleName) {
                    selectedRole_1 = role.accessRightsId;
                }
            });
            if (this.fval.position.value === 'AREA MANAGER') {
                selectedLocation = this.fval.area.value;
            }
            else if (this.fval.position.value === 'TOWN MANAGER') {
                selectedLocation = this.fval.town.value;
            }
            else if (this.fval.position.value === 'STATION MANAGER' || this.fval.position.value === 'STATION OFFICER') {
                selectedLocation = this.fval.station.value;
            }
            else {
                selectedLocation = '';
            }
            this.registerUser = {
                userName: this.fval.full_name.value,
                userEmail1: this.fval.email.value,
                userPhone1: "" + this.fval.user_contact_number.value,
                userIdType: this.fval.id_type.value,
                userIdNumber: "" + this.fval.id_number.value,
                userDateOfBirth: this.fval.date_of_birth.value.getFullYear() + "-" + (this.fval.date_of_birth.value.getMonth() + 1) + "-" + this.fval.date_of_birth.value.getDate(),
                userPassword: Number(this.fval.password.value),
                fkAccessRightsIdUser: selectedRole_1,
                userLocation: selectedLocation
            };
            // console.log(this.registerUser);
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
