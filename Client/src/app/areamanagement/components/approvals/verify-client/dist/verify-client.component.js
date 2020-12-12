"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.VerifyClientComponent = void 0;
var core_1 = require("@angular/core");
var VerifyClientComponent = /** @class */ (function () {
    function VerifyClientComponent(modalService, authService, router, spinner, alertService, fb) {
        this.modalService = modalService;
        this.authService = authService;
        this.router = router;
        this.spinner = spinner;
        this.alertService = alertService;
        this.fb = fb;
        this.writeOffApprovals = [
            { station: 'kibuye', client: 'Kasule Joseph', ammount: 400000, status: 0 },
            { station: 'ndeeba', client: 'kasozi med', ammount: 600000, status: 0 },
            { station: 'nsambya', client: 'Kasule Joseph', ammount: 500000, status: 0 },
            { station: 'kyengera', client: 'mukasa rony', ammount: 850000, status: 0 },
            { station: 'ndeeba', client: 'kasozi med', ammount: 600000, status: 0 },
            { station: 'nsambya', client: 'Kasule Joseph', ammount: 500000, status: 0 },
            { station: 'kyengera', client: 'mukasa rony', ammount: 850000, status: 0 },
        ];
        this.posted = false;
    }
    VerifyClientComponent.prototype.ngOnInit = function () {
        this.userForm = this.createFormGroup();
        this.fval.selectAll.setValue(false);
        this.initialiseForm();
    };
    VerifyClientComponent.prototype.createFormGroup = function () {
        return this.fb.group({
            approveWriteOffs: this.fb.array([this.writeOffApproval]),
            selectAll: this.fb.control({})
        });
    };
    Object.defineProperty(VerifyClientComponent.prototype, "writeOffApproval", {
        get: function () {
            return this.fb.group({
                station: this.fb.control({ value: '' }),
                client: this.fb.control({ value: '' }),
                ammount: this.fb.control({ value: '' }),
                approved: this.fb.control({})
            });
        },
        enumerable: false,
        configurable: true
    });
    VerifyClientComponent.prototype.addItem = function () {
        // this.unitForm.controls.bussinessUnits  as FormArray
        this.fval.approveWriteOffs.push(this.writeOffApproval);
    };
    VerifyClientComponent.prototype.removeItem = function (index) {
        this.fval.approveWriteOffs.removeAt(index);
    };
    VerifyClientComponent.prototype.initialiseForm = function () {
        var _this = this;
        var n;
        // this.others.getBussinessUnits().subscribe(
        //   units => {
        //     this.approvals = units;
        this.writeOffApprovals.forEach(function (item, i) {
            // console.log(item.name);
            // console.log(i);
            _this.fval.approveWriteOffs.controls[i].controls.station.setValue(item.station);
            _this.fval.approveWriteOffs.controls[i].controls.client.setValue(item.client);
            _this.fval.approveWriteOffs.controls[i].controls.ammount.setValue(item.ammount);
            _this.fval.approveWriteOffs.controls[i].controls.approved.setValue(false);
            _this.addItem();
            n = i + 1;
        });
        this.removeItem(n);
        // }
        // )
    };
    // modal method
    VerifyClientComponent.prototype.openModal = function (template) {
        this.modalRef = this.modalService.show(template, Object.assign({}, { "class": 'white modal-lg modal-dialog-center' }));
    };
    VerifyClientComponent.prototype.openModal2 = function (template) {
        this.modalRef = this.modalService.show(template, Object.assign({}, { "class": 'white modal-dialog-center' }));
    };
    VerifyClientComponent.prototype.checkAllItems = function (val) {
        var _this = this;
        if (val === true) {
            this.writeOffApprovals.forEach(function (item, i) {
                _this.fval.approveWriteOffs.controls[i].controls.approved.setValue(val);
            });
        }
        else {
            this.writeOffApprovals.forEach(function (item, i) {
                _this.fval.approveWriteOffs.controls[i].controls.approved.setValue(false);
            });
        }
    };
    VerifyClientComponent.prototype.deselectAll = function (val) {
        // console.log(this.fval.approveAreas["controls"][val]["controls"].approved.value)
        if (this.fval.approveWriteOffs.controls[val].controls.approved.value ===
            true) {
            this.fval.selectAll.setValue(false);
        }
    };
    VerifyClientComponent.prototype.revert = function () {
        this.userForm.reset();
    };
    VerifyClientComponent.prototype.refresh = function () {
        location.reload();
    };
    Object.defineProperty(VerifyClientComponent.prototype, "fval", {
        get: function () {
            return this.userForm.controls;
        },
        enumerable: false,
        configurable: true
    });
    VerifyClientComponent.prototype.disableForm = function () {
        return this.userForm.disable();
    };
    VerifyClientComponent.prototype.enableEdit = function () {
        return this.userForm.enable();
    };
    VerifyClientComponent.prototype.approveItems = function () {
        var _this = this;
        var itemsApproved = [];
        this.writeOffApprovals.forEach(function (item, i) {
            if (_this.fval.approveWriteOffs.controls[i].controls.approved.value ===
                true) {
                item.status = 2;
                itemsApproved.push(item);
            }
        });
        console.log(itemsApproved.length);
        if (itemsApproved.length > 0) {
            setTimeout(function () {
                _this.router.navigate(['areamanagement/dashboard']);
            }, 3000);
        }
        else {
            // alert("Please select something")
            return;
        }
    };
    VerifyClientComponent.prototype.rejectItems = function () {
        var _this = this;
        var itemsRejected = [];
        this.writeOffApprovals.forEach(function (item, i) {
            if (_this.fval.approveWriteOffs.controls[i].controls.approved.value ===
                true) {
                item.status = 1;
                itemsRejected.push(item);
            }
        });
        console.log(itemsRejected.length);
        if (itemsRejected.length > 0) {
            setTimeout(function () {
                _this.router.navigate(['areamanagement/dashboard']);
            }, 3000);
        }
        else {
            // alert("Please select something")
            return;
        }
    };
    VerifyClientComponent = __decorate([
        core_1.Component({
            selector: 'app-verify-client',
            templateUrl: './verify-client.component.html',
            styleUrls: ['./verify-client.component.scss']
        })
    ], VerifyClientComponent);
    return VerifyClientComponent;
}());
exports.VerifyClientComponent = VerifyClientComponent;
