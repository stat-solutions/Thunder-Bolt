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
    // [
    // { name: 'Area Creation', level: 3 },
    // { name: 'Town Creation', level: 1 },
    // ];
    function ApprovalSetupComponent(others, router, spinner, alertService, fb) {
        this.others = others;
        this.router = router;
        this.spinner = spinner;
        this.alertService = alertService;
        this.fb = fb;
        this.posted = false;
    }
    ApprovalSetupComponent.prototype.ngOnInit = function () {
        this.approvalForm = this.createFormGroup();
        this.initialiseForm();
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
        this.others.getApprovalLevelsCreate().subscribe(function (res) {
            _this.approvals = res;
            _this.others.getApprovalLevelsUpdate().subscribe(function (response) {
                // console.log(response);
                response.forEach(function (itm, index) {
                    _this.approvals.push(itm);
                });
                // console.log(this.approvals);
                _this.approvals.forEach(function (item, i) {
                    _this.fval.approvalItems.controls[i].controls.name.setValue(item.itemName);
                    _this.fval.approvalItems.controls[i].controls.level.setValue(item.approvalLevel);
                    _this.fval.approvalItems.controls[i].controls.firstApproval.setValue(item.firstApprovalBy);
                    _this.fval.approvalItems.controls[i].controls.secondApproval.setValue(item.secondApprovalBy);
                    _this.fval.approvalItems.controls[i].controls.thirdApproval.setValue(item.thirdApprovalBy);
                    _this.addItem();
                    n = i + 1;
                });
                _this.removeItem(n);
                _this.disableForms();
            }, function (error) { return console.log(error); });
        }, function (err) { return console.log(err); });
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
        // console.log(this.approvals);
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
