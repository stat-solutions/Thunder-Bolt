"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ApprovalSetupComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var custom_validator_1 = require("src/app/validators/custom-validator");
var ApprovalSetupComponent = /** @class */ (function () {
    function ApprovalSetupComponent(others, router, spinner, alertService, fb) {
        this.others = others;
        this.router = router;
        this.spinner = spinner;
        this.alertService = alertService;
        this.fb = fb;
        this.posted = false;
        this.approvals = [
            { name: 'Area Creation', level: 3 },
            { name: 'Town Creation', level: 1 },
            { name: 'Stage Creation', level: 2 },
            { name: 'Station Creation', level: 2 },
            { name: 'Town Creation', level: 1 },
            { name: 'Stage Creation', level: 2 },
            { name: 'Station Creation', level: 1 },
            { name: 'Town Creation', level: 1 },
            { name: 'Stage Creation', level: 2 },
            { name: 'Station Creation', level: 3 },
            { name: 'Town Creation', level: 1 },
            { name: 'Stage Creation', level: 2 },
            { name: 'Station Creation', level: 0 },
            { name: 'Town Creation', level: 1 },
            { name: 'Stage Creation', level: 2 },
            { name: 'Station Creation', level: 0 },
            { name: 'Town Creation', level: 1 },
            { name: 'Stage Creation', level: 2 },
            { name: 'Station Creation', level: 0 },
            { name: 'Town Creation', level: 1 },
            { name: 'Stage Creation', level: 2 },
            { name: 'Station Creation', level: 1 },
            { name: 'Town Creation', level: 1 },
            { name: 'Stage Creation', level: 2 },
            { name: 'Station Creation', level: 2 },
            { name: 'Station Creation', level: 3 },
        ];
    }
    ApprovalSetupComponent.prototype.ngOnInit = function () {
        this.approvalForm = this.createFormGroup();
        this.initialiseForm();
        this.disableForms();
    };
    ApprovalSetupComponent.prototype.createFormGroup = function () {
        return this.fb.group({
            approvalItems: this.fb.array([this.approvalItem])
        });
    };
    Object.defineProperty(ApprovalSetupComponent.prototype, "approvalItem", {
        get: function () {
            return this.fb.group({
                name: this.fb.control({ value: '' }),
                firstApproval: this.fb.control({ value: '' }),
                secondApproval: this.fb.control({ value: '' }),
                thirdApproval: this.fb.control({ value: '' }),
                level: this.fb.control('', forms_1.Validators.compose([
                    forms_1.Validators.required,
                    forms_1.Validators.minLength(1),
                    forms_1.Validators.maxLength(1),
                    custom_validator_1.CustomValidator.maxValue(3),
                    custom_validator_1.CustomValidator.minValue(0),
                ]))
            });
        },
        enumerable: false,
        configurable: true
    });
    ApprovalSetupComponent.prototype.addItem = function () {
        this.fval.approvalItems.push(this.approvalItem);
    };
    ApprovalSetupComponent.prototype.removeItem = function (index) {
        this.fval.approvalItems.removeAt(index);
    };
    ApprovalSetupComponent.prototype.initialiseForm = function () {
        var _this = this;
        var n;
        // this.others.getBussinessUnits().subscribe(
        //   units => {
        //     this.approvals = units;
        this.approvals.forEach(function (item, i) {
            // console.log(item.name);
            // console.log(i);
            _this.fval.approvalItems.controls[i].controls.name.setValue(item.name);
            _this.fval.approvalItems.controls[i].controls.level.setValue(item.level);
            _this.fval.approvalItems.controls[i].controls.firstApproval.setValue('Town');
            _this.addItem();
            n = i + 1;
        });
        this.removeItem(n);
        // }
        // )
    };
    ApprovalSetupComponent.prototype.revert = function () {
        this.approvalForm.reset();
    };
    // revert() {
    //   this.approvalForm.reset();
    // }
    ApprovalSetupComponent.prototype.refresh = function () {
        location.reload();
    };
    Object.defineProperty(ApprovalSetupComponent.prototype, "fval", {
        get: function () {
            return this.approvalForm.controls;
        },
        enumerable: false,
        configurable: true
    });
    ApprovalSetupComponent.prototype.disableForms = function () {
        var _this = this;
        this.approvals.forEach(function (itm, i) {
            _this.fval.approvalItems.controls[i].disable();
        });
    };
    ApprovalSetupComponent.prototype.enableEdit = function (val) {
        var _this = this;
        this.showLevels = val;
        this.approvals.forEach(function (itm, i) {
            if (i === val) {
                _this.fval.approvalItems.controls[i].enable();
            }
        });
    };
    ApprovalSetupComponent.prototype.saveLevel = function (index) {
        if (this.fval.approvalItems.controls[index]) {
            this.fval.approvalItems.controls[index].disable();
            this.showLevels = null;
        }
        else {
            return;
        }
    };
    ApprovalSetupComponent = __decorate([
        core_1.Component({
            selector: 'app-approval-setup',
            templateUrl: './approval-setup.component.html',
            styleUrls: ['./approval-setup.component.scss']
        })
    ], ApprovalSetupComponent);
    return ApprovalSetupComponent;
}());
exports.ApprovalSetupComponent = ApprovalSetupComponent;
