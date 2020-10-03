"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CreateTownComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var CreateTownComponent = /** @class */ (function () {
    // ShiftDetails[]
    function CreateTownComponent(authService, spinner, router, alertService) {
        this.authService = authService;
        this.spinner = spinner;
        this.router = router;
        this.alertService = alertService;
    }
    CreateTownComponent.prototype.ngOnInit = function () {
        this.userForm = this.createFormGroup();
    };
    CreateTownComponent.prototype.createFormGroup = function () {
        return new forms_1.FormGroup({
            itemCreate: new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required]))
        });
    };
    CreateTownComponent.prototype.revert = function () {
        this.userForm.reset();
    };
    Object.defineProperty(CreateTownComponent.prototype, "fval", {
        get: function () {
            return this.userForm.controls;
        },
        enumerable: false,
        configurable: true
    });
    CreateTownComponent.prototype.createItem = function () {
        this.spinner.show();
    };
    CreateTownComponent = __decorate([
        core_1.Component({
            selector: 'app-create-town',
            templateUrl: './create-town.component.html',
            styleUrls: ['./create-town.component.scss']
        })
    ], CreateTownComponent);
    return CreateTownComponent;
}());
exports.CreateTownComponent = CreateTownComponent;
