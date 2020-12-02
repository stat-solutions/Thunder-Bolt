"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.EnrollBodaStageComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var custom_validator_1 = require("src/app/validators/custom-validator");
var EnrollBodaStageComponent = /** @class */ (function () {
    function EnrollBodaStageComponent(authService, others, spinner, router, alertService) {
        this.authService = authService;
        this.others = others;
        this.spinner = spinner;
        this.router = router;
        this.alertService = alertService;
        this.registered = false;
        this.submitted = false;
        this.errored = false;
        this.posted = false;
        this.serviceErrors = {};
        this.User = this.authService.loggedInUserInfo();
    }
    EnrollBodaStageComponent.prototype.ngOnInit = function () {
        this.userForm = this.createFormGroup();
        this.bodaClusters();
    };
    EnrollBodaStageComponent.prototype.createFormGroup = function () {
        return new forms_1.FormGroup({
            bodabodaStageName: new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required])),
            cluster: new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required])),
            bodabodaStageChairmanName: new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required])),
            bodabodaStageChairmanPhone1: new forms_1.FormControl('', forms_1.Validators.compose([
                forms_1.Validators.required,
                custom_validator_1.CustomValidator.patternValidator(/^(([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9]))$/, { hasNumber: true })
            ]))
        });
    };
    EnrollBodaStageComponent.prototype.revert = function () {
        this.userForm.reset();
    };
    EnrollBodaStageComponent.prototype.resetStageNames = function () {
        this.userForm.controls.stage_name.reset();
    };
    Object.defineProperty(EnrollBodaStageComponent.prototype, "fval", {
        get: function () {
            return this.userForm.controls;
        },
        enumerable: false,
        configurable: true
    });
    EnrollBodaStageComponent.prototype.bodaClusters = function () {
        var _this = this;
        this.others.getBodaClusters().subscribe(function (res) { return _this.clusters = res; }, function (err) { return console.log(err.error.error.message); });
        //     fkApprovalDetailsIdstageCluster: 122
        // stageCluesterStatus: 2
        // stageClusterId: 1800
        // stageClusterLocation: "NANSANA"
        // stageClusterName: "KYINYARWANDA"
    };
    EnrollBodaStageComponent.prototype.onSubmit = function () {
        var _this = this;
        this.submitted = true;
        this.spinner.show();
        if (this.userForm.invalid === true) {
            return;
        }
        else {
            var data_1 = {
                bodabodaStageName: this.fval.bodabodaStageName.value.toUpperCase(),
                bodabodaStageChairmanName: this.fval.bodabodaStageChairmanName.value.toUpperCase(),
                bodabodaStageChairmanPhone1: this.fval.bodabodaStageChairmanPhone1.value,
                stageClusterId: null,
                userId: this.User.userId
            };
            this.clusters.forEach(function (cluster) {
                if (cluster.stageClusterName === _this.fval.cluster.value) {
                    data_1.stageClusterId = cluster.stageClusterId;
                }
            });
            console.log(data_1);
            this.spinner.hide();
            this.others.createBodaStage(data_1).subscribe(function (res) {
                _this.posted = true;
                _this.alertService.success({
                    html: '<b>' + data_1.bodabodaStageName + 'Was Created Successfully</b>'
                });
                // this.fval.taxiParkName.setValue('');
                _this.revert();
            }, function (err) {
                _this.errored = true;
                _this.alertService.danger({
                    html: '<b>' + err.error.error.message + '</b>'
                });
            });
        }
    };
    EnrollBodaStageComponent = __decorate([
        core_1.Component({
            selector: 'app-enroll-boda-stage',
            templateUrl: './enroll-boda-stage.component.html',
            styleUrls: ['./enroll-boda-stage.component.scss']
        })
    ], EnrollBodaStageComponent);
    return EnrollBodaStageComponent;
}());
exports.EnrollBodaStageComponent = EnrollBodaStageComponent;
