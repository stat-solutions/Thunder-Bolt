"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CreateAreaComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var CreateAreaComponent = /** @class */ (function () {
    // ShiftDetails[]
    function CreateAreaComponent(authService, others, spinner, router, alertService) {
        this.authService = authService;
        this.others = others;
        this.spinner = spinner;
        this.router = router;
        this.alertService = alertService;
        this.User = this.authService.loggedInUserInfo();
    }
    CreateAreaComponent.prototype.ngOnInit = function () {
        this.userForm = this.createFormGroup();
    };
    CreateAreaComponent.prototype.createFormGroup = function () {
        return new forms_1.FormGroup({
            itemCreate: new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required]))
        });
    };
    CreateAreaComponent.prototype.revert = function () {
        this.userForm.reset();
    };
    Object.defineProperty(CreateAreaComponent.prototype, "fval", {
        get: function () {
            return this.userForm.controls;
        },
        enumerable: false,
        configurable: true
    });
    CreateAreaComponent.prototype.create = function () {
        var _this = this;
        if (this.userForm.valid) {
            var data = {
                areaRegionName: this.fval.itemCreate.value.toUpperCase(),
                userId: this.User.userId
            };
            this.others.createArea(data).subscribe(function (res) {
                // console.log(res)
                if (res) {
                    _this.revert();
                    _this.alertService.success({
                        html: '<p>Station creation was successful</p>'
                    });
                }
            }, function (err) { return console.log(err); });
        }
        else {
            // return;
        }
    };
    CreateAreaComponent = __decorate([
        core_1.Component({
            selector: 'app-create-area',
            templateUrl: './create-area.component.html',
            styleUrls: ['./create-area.component.scss']
        })
    ], CreateAreaComponent);
    return CreateAreaComponent;
}());
exports.CreateAreaComponent = CreateAreaComponent;
