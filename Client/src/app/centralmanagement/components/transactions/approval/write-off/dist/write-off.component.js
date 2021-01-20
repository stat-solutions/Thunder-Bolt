"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.WriteOffComponent = void 0;
var core_1 = require("@angular/core");
var WriteOffComponent = /** @class */ (function () {
    function WriteOffComponent(authService, others, router, modalService, spinner, alertService, fb) {
        this.authService = authService;
        this.others = others;
        this.router = router;
        this.modalService = modalService;
        this.spinner = spinner;
        this.alertService = alertService;
        this.fb = fb;
        this.posted = false;
    }
    WriteOffComponent.prototype.ngOnInit = function () {
        this.userForm = this.createFormGroup();
        this.fval.selectAll.setValue(false);
        this.initialiseForm();
    };
    WriteOffComponent.prototype.createFormGroup = function () {
        return this.fb.group({
            approveWriteOffs: this.fb.array([this.writeOffApproval]),
            selectAll: this.fb.control({})
        });
    };
    Object.defineProperty(WriteOffComponent.prototype, "writeOffApproval", {
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
    WriteOffComponent.prototype.addItem = function () {
        // this.unitForm.controls.bussinessUnits  as FormArray
        this.fval.approveWriteOffs.push(this.writeOffApproval);
    };
    WriteOffComponent.prototype.removeItem = function (index) {
        this.fval.approveWriteOffs.removeAt(index);
    };
    WriteOffComponent.prototype.initialiseForm = function () {
        var _this = this;
        var n;
        this.others.getWaivedPrincipalForApproval().subscribe(function (res) {
            _this.writeOffApprovals = res;
            _this.writeOffApprovals.forEach(function (item, i) {
                _this.fval.approveWriteOffs.controls[i].controls.station.setValue(item.station);
                _this.fval.approveWriteOffs.controls[i].controls.client.setValue(item.client);
                _this.fval.approveWriteOffs.controls[i].controls.ammount.setValue(item.ammount);
                _this.fval.approveWriteOffs.controls[i].controls.approved.setValue(false);
                _this.addItem();
                n = i + 1;
            });
            _this.removeItem(n);
        });
    };
    WriteOffComponent.prototype.checkAllItems = function (val) {
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
    WriteOffComponent.prototype.deselectAll = function (val) {
        // console.log(this.fval.approveAreas["controls"][val]["controls"].approved.value)
        if (this.fval.approveWriteOffs.controls[val].controls.approved.value ==
            true) {
            this.fval.selectAll.setValue(false);
        }
    };
    WriteOffComponent.prototype.revert = function () {
        this.userForm.reset();
    };
    WriteOffComponent.prototype.refresh = function () {
        location.reload();
    };
    Object.defineProperty(WriteOffComponent.prototype, "fval", {
        get: function () {
            return this.userForm.controls;
        },
        enumerable: false,
        configurable: true
    });
    // client modal method
    WriteOffComponent.prototype.openModal = function (template) {
        this.modalRef = this.modalService.show(template, Object.assign({}, { "class": 'modal-lg modal-dialog-centered' }));
    };
    WriteOffComponent.prototype.disableForm = function () {
        return this.userForm.disable();
    };
    WriteOffComponent.prototype.enableEdit = function () {
        return this.userForm.enable();
    };
    WriteOffComponent.prototype.approveItems = function () {
        var _this = this;
        var itemsApproved = [];
        this.writeOffApprovals.forEach(function (item, i) {
            if (_this.fval.approveWriteOffs.controls[i].controls.approved.value ==
                true) {
                item.status = 2;
                itemsApproved.push(item);
            }
        });
        console.log(itemsApproved.length);
        if (itemsApproved.length > 0) {
            setTimeout(function () {
                _this.router.navigate(['centralmanagement/dashboard']);
            }, 3000);
        }
        else {
            // alert("Please select something")
            return;
        }
    };
    WriteOffComponent.prototype.rejectItems = function () {
        var _this = this;
        var itemsRejected = [];
        this.writeOffApprovals.forEach(function (item, i) {
            if (_this.fval.approveWriteOffs.controls[i].controls.approved.value ==
                true) {
                item.status = 1;
                itemsRejected.push(item);
            }
        });
        console.log(itemsRejected.length);
        if (itemsRejected.length > 0) {
            setTimeout(function () {
                _this.router.navigate(['centralmanagement/dashboard']);
            }, 3000);
        }
        else {
            // alert("Please select something")
            return;
        }
    };
    WriteOffComponent = __decorate([
        core_1.Component({
            selector: 'app-write-off',
            templateUrl: './write-off.component.html',
            styleUrls: ['./write-off.component.scss']
        })
    ], WriteOffComponent);
    return WriteOffComponent;
}());
exports.WriteOffComponent = WriteOffComponent;
