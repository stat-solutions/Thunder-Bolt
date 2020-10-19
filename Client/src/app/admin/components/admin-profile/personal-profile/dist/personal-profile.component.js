"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.PersonalProfileComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var custom_validator_1 = require("src/app/validators/custom-validator");
var operators_1 = require("rxjs/operators");
var PersonalProfileComponent = /** @class */ (function () {
    function PersonalProfileComponent(authService, spinner, router, alertService, fb, storage) {
        this.authService = authService;
        this.spinner = spinner;
        this.router = router;
        this.alertService = alertService;
        this.fb = fb;
        this.storage = storage;
        this.registered = false;
        this.submitted = false;
        this.serviceErrors = {};
        this.selectedFile = null;
    }
    PersonalProfileComponent.prototype.ngOnInit = function () {
        this.myDateValue = new Date();
        this.userForm = this.createFormGroup();
        this.disableForm();
    };
    PersonalProfileComponent.prototype.createFormGroup = function () {
        return this.fb.group({
            full_name: new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required])),
            email1: new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required])),
            email2: new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required])),
            nxtOfKin: new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required])),
            customerNextOfKinPhone1: new forms_1.FormControl('', forms_1.Validators.compose([
                forms_1.Validators.required,
                custom_validator_1.CustomValidator.patternValidator(/^(([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9]))$/, { hasNumber: true }),
            ])),
            user_contact_number1: new forms_1.FormControl('', forms_1.Validators.compose([
                forms_1.Validators.required,
                custom_validator_1.CustomValidator.patternValidator(/^(([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9]))$/, { hasNumber: true }),
            ])),
            user_contact_number2: new forms_1.FormControl('', forms_1.Validators.compose([
                forms_1.Validators.required,
                custom_validator_1.CustomValidator.patternValidator(/^(([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9]))$/, { hasNumber: true }),
            ])),
            id_type: new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required])),
            id_number: new forms_1.FormControl('', forms_1.Validators.compose([
                forms_1.Validators.required,
                custom_validator_1.CustomValidator.patternValidator(/^(([a-zA-Z])([a-zA-Z])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])([a-zA-Z])([a-zA-Z])([a-zA-Z])([a-zA-Z])([a-zA-Z]))$/, { nationalIdCheck: true }),
            ])),
            idPhotoUrl: new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required])),
            date_of_birth: new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required]))
        });
    };
    PersonalProfileComponent.prototype.revert = function () {
        this.userForm.reset();
    };
    Object.defineProperty(PersonalProfileComponent.prototype, "fval", {
        get: function () {
            return this.userForm.controls;
        },
        enumerable: false,
        configurable: true
    });
    PersonalProfileComponent.prototype.disableForm = function () {
        return this.userForm.disable();
    };
    PersonalProfileComponent.prototype.enableEdit = function () {
        return this.userForm.enable();
    };
    // toggle visibility of password field
    PersonalProfileComponent.prototype.toggleFieldType = function () {
        this.fieldType = !this.fieldType;
    };
    PersonalProfileComponent.prototype.returnHome = function () {
        var _this = this;
        this.spinner.hide();
        this.revert();
        setTimeout(function () {
            _this.router.navigate(['authpage/login']);
        }, 2000);
    };
    PersonalProfileComponent.prototype.setProfileValues = function () {
    };
    PersonalProfileComponent.prototype.save = function () {
    };
    PersonalProfileComponent.prototype.onFileSelected = function (event) {
        var _this = this;
        var n = Date.now();
        var file = event.target.files[0];
        var filePath = "userImages/" + n;
        var fileRef = this.storage.ref(filePath);
        var task = this.storage.upload("userImages/" + n, file);
        task
            .snapshotChanges()
            .pipe(operators_1.finalize(function () {
            _this.downloadURL = fileRef.getDownloadURL();
            _this.downloadURL.subscribe(function (url) {
                if (url) {
                    _this.photoUrl = url;
                }
                console.log(_this.photoUrl);
            });
        }))
            .subscribe(function (url) {
            if (url) {
                // console.log(url);
            }
        });
    };
    PersonalProfileComponent = __decorate([
        core_1.Component({
            selector: 'app-personal-profile',
            templateUrl: './personal-profile.component.html',
            styleUrls: ['./personal-profile.component.scss']
        })
    ], PersonalProfileComponent);
    return PersonalProfileComponent;
}());
exports.PersonalProfileComponent = PersonalProfileComponent;
