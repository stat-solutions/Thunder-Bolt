"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.InterestRateComponent = void 0;
var core_1 = require("@angular/core");
var InterestRateComponent = /** @class */ (function () {
    function InterestRateComponent(authService, router, spinner, alertService, fb) {
        this.authService = authService;
        this.router = router;
        this.spinner = spinner;
        this.alertService = alertService;
        this.fb = fb;
        this.ratesApprovals = [
            { station: 'nsambya', client: 'Kasule Joseph', rate: 5, status: 0 },
            { station: 'kyengera', client: 'mukasa rony', rate: 8, status: 0 },
            { station: 'ndeeba', client: 'kasozi med', rate: 3, status: 0 },
            { station: 'kibuye', client: 'Kasule Joseph', rate: 4, status: 0 },
            { station: 'bwayise', client: 'Kasule Jose', rate: 2, status: 0 },
        ];
        this.posted = false;
    }
    InterestRateComponent.prototype.ngOnInit = function () {
        this.userForm = this.createFormGroup();
        this.fval.selectAll.setValue(false);
        this.initialiseForm();
    };
    InterestRateComponent.prototype.createFormGroup = function () {
        return this.fb.group({
            approveRates: this.fb.array([this.rateApproval]),
            selectAll: this.fb.control({})
        });
    };
    Object.defineProperty(InterestRateComponent.prototype, "rateApproval", {
        get: function () {
            return this.fb.group({
                station: this.fb.control({ value: '' }),
                client: this.fb.control({ value: '' }),
                rate: this.fb.control({ value: '' }),
                approved: this.fb.control({})
            });
        },
        enumerable: false,
        configurable: true
    });
    InterestRateComponent.prototype.addItem = function () {
        // this.unitForm.controls.bussinessUnits  as FormArray
        this.fval.approveRates.push(this.rateApproval);
    };
    InterestRateComponent.prototype.removeItem = function (index) {
        this.fval.approveRates.removeAt(index);
    };
    InterestRateComponent.prototype.initialiseForm = function () {
        var _this = this;
        var n;
        // this.others.getBussinessUnits().subscribe(
        //   units => {
        //     this.approvals = units;
        this.ratesApprovals.forEach(function (item, i) {
            // console.log(item.name);
            // console.log(i);
            _this.fval.approveRates.controls[i].controls.station.setValue(item.station);
            _this.fval.approveRates.controls[i].controls.client.setValue(item.client);
            _this.fval.approveRates.controls[i].controls.rate.setValue(item.rate);
            _this.fval.approveRates.controls[i].controls.approved.setValue(false);
            _this.addItem();
            n = i + 1;
        });
        this.removeItem(n);
        // }
        // )
    };
    InterestRateComponent.prototype.checkAllItems = function (val) {
        var _this = this;
        if (val === true) {
            this.ratesApprovals.forEach(function (item, i) {
                _this.fval.approveRates.controls[i].controls.approved.setValue(val);
            });
        }
        else {
            this.ratesApprovals.forEach(function (item, i) {
                _this.fval.approveRates.controls[i].controls.approved.setValue(false);
            });
        }
    };
    InterestRateComponent.prototype.deselectAll = function (val) {
        // console.log(this.fval.approveAreas["controls"][val]["controls"].approved.value)
        if (this.fval.approveRates.controls[val].controls.approved.value === true) {
            this.fval.selectAll.setValue(false);
        }
    };
    InterestRateComponent.prototype.revert = function () {
        this.userForm.reset();
    };
    InterestRateComponent.prototype.refresh = function () {
        location.reload();
    };
    Object.defineProperty(InterestRateComponent.prototype, "fval", {
        get: function () {
            return this.userForm.controls;
        },
        enumerable: false,
        configurable: true
    });
    InterestRateComponent.prototype.disableForm = function () {
        return this.userForm.disable();
    };
    InterestRateComponent.prototype.enableEdit = function () {
        return this.userForm.enable();
    };
    InterestRateComponent.prototype.approveItems = function () {
        var _this = this;
        var itemsApproved = [];
        this.ratesApprovals.forEach(function (item, i) {
            if (_this.fval.approveRates.controls[i].controls.approved.value === true) {
                item.status = 2;
                itemsApproved.push(item);
            }
        });
        console.log(itemsApproved.length);
        if (itemsApproved.length > 0) {
            setTimeout(function () {
                _this.router.navigate([
                    'centralmanagement/dashboard'
                ]);
            }, 3000);
        }
        else {
            // alert("Please select something")
            return;
        }
    };
    InterestRateComponent.prototype.rejectItems = function () {
        var _this = this;
        var itemsRejected = [];
        this.ratesApprovals.forEach(function (item, i) {
            if (_this.fval.approveRates.controls[i].controls.approved.value === true) {
                item.status = 1;
                itemsRejected.push(item);
            }
        });
        console.log(itemsRejected.length);
        if (itemsRejected.length > 0) {
            setTimeout(function () {
                _this.router.navigate([
                    'centralmanagement/dashboard'
                ]);
            }, 3000);
        }
        else {
            // alert("Please select something")
            return;
        }
    };
    InterestRateComponent = __decorate([
        core_1.Component({
            selector: 'app-interest-rate',
            templateUrl: './interest-rate.component.html',
            styleUrls: ['./interest-rate.component.scss']
        })
    ], InterestRateComponent);
    return InterestRateComponent;
}());
exports.InterestRateComponent = InterestRateComponent;
