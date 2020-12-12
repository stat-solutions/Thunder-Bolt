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
    function VerifyClientComponent(modalService, others, authService, router, spinner, alertService, fb) {
        this.modalService = modalService;
        this.others = others;
        this.authService = authService;
        this.router = router;
        this.spinner = spinner;
        this.alertService = alertService;
        this.fb = fb;
        this.customers = [];
        this.posted = false;
        this.showCustomers = false;
        this.User = this.authService.loggedInUserInfo();
    }
    VerifyClientComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.errored = false;
        this.posted = false;
        this.userForm = this.createFormGroup();
        this.fval.selectAll.setValue(false);
        // this.User.userLocationId
        this.others.getAllTheStationLocationsByArea(this.User.userLocationId).subscribe(function (res) {
            _this.stations = res;
            _this.getBodaCustomers();
        }, function (err) {
            _this.errored = true;
            _this.alertService.danger({
                html: '<b>' + err.error.statusText + '</b>'
            });
        });
        this.others.getBodaStages().subscribe(function (res) {
            _this.bodaStages = res;
            _this.bodaStages = _this.bodaStages.filter(function (bodaStage) { return bodaStage.bodabodaStageName != null; });
        }, function (err) {
            _this.errored = true;
            _this.alertService.danger({
                html: '<b>' + err.error.statusText + '</b>'
            });
        });
        this.others.getTaxiStages().subscribe(function (res) {
            _this.taxiStages = res;
            _this.taxiStages = _this.taxiStages.filter(function (taxiStage) { return taxiStage.taxiStageName != null; });
        }, function (err) {
            _this.errored = true;
            _this.alertService.danger({
                html: '<b>' + err.error.statusText + '</b>'
            });
        });
    };
    VerifyClientComponent.prototype.createFormGroup = function () {
        return this.fb.group({
            customers: this.fb.array([this.customer]),
            selectAll: this.fb.control({})
        });
    };
    Object.defineProperty(VerifyClientComponent.prototype, "customer", {
        get: function () {
            return this.fb.group({
                customerId: this.fb.control({ value: '' }),
                customerName: this.fb.control({ value: '' }),
                station: this.fb.control({ value: '' }),
                customerPhone1: this.fb.control({ value: '' }),
                customerPhotoUrl: this.fb.control({ value: '' }),
                approved: this.fb.control({})
            });
        },
        enumerable: false,
        configurable: true
    });
    VerifyClientComponent.prototype.getBodaCustomers = function () {
        var _this = this;
        this.errored = false;
        this.posted = false;
        // this.User.userLoactionId
        this.others.getAreaBodaBodaCustomerToApprove(this.User.userLocationId).subscribe(function (res) {
            // console.log(res);
            _this.customers = res;
            _this.userForm = _this.createFormGroup();
            _this.fval.selectAll.setValue(false);
            _this.initialiseForm(_this.customers);
            _this.currentCustomer = 'BodaBoda Fuel';
        }, function (err) {
            _this.errored = true;
            _this.alertService.danger({
                html: '<b>' + err.error.statusText + '</b>'
            });
        });
    };
    VerifyClientComponent.prototype.getTaxiCustomers = function () {
        var _this = this;
        this.errored = false;
        this.posted = false;
        // this.User.userLoactionId
        this.others.getAreaTaxiCustomerToApprove(this.User.userLocationId).subscribe(function (res) {
            // console.log(res);
            _this.customers = res;
            _this.userForm = _this.createFormGroup();
            _this.fval.selectAll.setValue(false);
            _this.initialiseForm(_this.customers);
            _this.currentCustomer = 'Taxi Fuel';
        }, function (err) {
            _this.errored = true;
            _this.alertService.danger({
                html: '<b>' + err.error.statusText + '</b>'
            });
        });
    };
    VerifyClientComponent.prototype.getMicroCustomers = function () {
        var _this = this;
        this.errored = false;
        this.posted = false;
        // this.User.userLoactionId
        this.others.getAreaMicroCustomerToApprove(this.User.userLocationId).subscribe(function (res) {
            // console.log(res);
            _this.customers = res;
            _this.userForm = _this.createFormGroup();
            _this.fval.selectAll.setValue(false);
            _this.initialiseForm(_this.customers);
            _this.currentCustomer = 'Micro Loan';
            _this.showCustomers = true;
        }, function (err) {
            _this.errored = true;
            _this.alertService.danger({
                html: '<b>' + err.error.statusText + '</b>'
            });
        });
    };
    VerifyClientComponent.prototype.getSavingsCustomers = function () {
        var _this = this;
        this.errored = false;
        this.posted = false;
        // this.User.userLoactionId
        this.others.getAreaSavingsCustomerToApprove(this.User.userLocationId).subscribe(function (res) {
            // console.log(res);
            _this.customers = res;
            _this.userForm = _this.createFormGroup();
            _this.fval.selectAll.setValue(false);
            _this.initialiseForm(_this.customers);
            _this.currentCustomer = 'Savings';
        }, function (err) {
            _this.errored = true;
            _this.alertService.danger({
                html: '<b>' + err.error.statusText + '</b>'
            });
        });
    };
    VerifyClientComponent.prototype.addItem = function () {
        // this.unitForm.controls.bussinessUnits  as FormArray
        this.fval.customers.push(this.customer);
    };
    VerifyClientComponent.prototype.removeItem = function (index) {
        this.fval.customers.removeAt(index);
    };
    VerifyClientComponent.prototype.initialiseForm = function (customers) {
        var _this = this;
        var n;
        customers.forEach(function (item, i) {
            _this.fval.customers.controls[i].controls.customerId.setValue(item.customerId);
            _this.fval.customers.controls[i].controls.customerName.setValue(item.customerName);
            _this.fval.customers.controls[i].controls.customerPhotoUrl.setValue(item.customerPhotoUrl);
            _this.fval.customers.controls[i].controls.customerPhone1.setValue(item.customerPhone1);
            for (var _i = 0, _a = _this.stations; _i < _a.length; _i++) {
                var station = _a[_i];
                if (station.theStationLocationId === item.fktheStationLocationIdCustomer) {
                    _this.fval.customers.controls[i].controls.station.setValue(station.stationName.toUpperCase());
                }
            }
            _this.fval.customers.controls[i].controls.approved.setValue(false);
            _this.addItem();
            n = i + 1;
        });
        this.removeItem(n);
    };
    // modal method
    VerifyClientComponent.prototype.openModal2 = function (template, imageUrl) {
        this.imageUrl = imageUrl;
        this.modalRef = this.modalService.show(template, Object.assign({}, { "class": 'white modal-lg modal-dialog-center' }));
    };
    VerifyClientComponent.prototype.openModal = function (template, customerId) {
        var _this = this;
        // console.log(customerId);
        this.customers.forEach(function (customer) {
            if (customer.customerId === customerId) {
                _this.data = customer;
                var date = new Date(customer.customerDateOfBirth);
                _this.data.customerDateOfBirth = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
                if (_this.currentCustomer === 'BodaBoda Fuel') {
                    date = new Date(customer.bodabodaCustomerDateOfJoinStage);
                    _this.data.bodabodaCustomerDateOfJoinStage = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
                    _this.bodaStages.forEach(function (bodaStage) {
                        if (bodaStage.bodabodaStageId === customer.fkBodabodaStageIdBodabodaCustomer) {
                            _this.data.fkBodabodaStageIdBodabodaCustomer = bodaStage.bodabodaStageName.toUpperCase();
                        }
                    });
                    _this.data.bodabodaOwnershipStatus = customer.bodabodaOwnershipStatus === 1 ?
                        'ONLOAN' : customer.bodabodaOwnershipStatus === 2 ?
                        'PAIDOUT' : 'HIREDOUT';
                    _this.data.bodabodaCustomerInsurance = customer.bodabodaCustomerInsurance === 1 ?
                        'NONE' : customer.bodabodaCustomerInsurance === 2 ?
                        'REGULAR' : 'COMPREHENSIVE';
                }
                else if (_this.currentCustomer === 'Taxi Fuel') {
                    date = new Date(customer.taxiCustomerDateOfJoinStage);
                    _this.data.taxiCustomerDateOfJoinStage = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
                    _this.taxiStages.forEach(function (taxiStage) {
                        if (taxiStage.taxiStageId === customer.fkTaxiStageIdTaxiCustomer) {
                            _this.data.fkTaxiStageIdTaxiCustomer = taxiStage.taxiStageName.toUpperCase();
                        }
                    });
                    _this.data.taxiCustomerOwnershipStatus = customer.taxiCustomerOwnershipStatus === 1 ?
                        'ONLOAN' : customer.taxiCustomerOwnershipStatus === 2 ?
                        'PAIDOUT' : 'HIREDOUT';
                    _this.data.taxiCustomerInsurance = customer.taxiCustomerInsurance === 1 ?
                        'NONE' : customer.taxiCustomerInsurance === 2 ?
                        'REGULAR' : 'COMPREHENSIVE';
                }
                else if (_this.currentCustomer === 'Micro Loan') {
                }
                else if (_this.currentCustomer === 'Savings') {
                }
            }
        });
        // console.log(this.data);
        this.modalRef = this.modalService.show(template, Object.assign({}, { "class": 'white modal-dialog-center' }));
    };
    VerifyClientComponent.prototype.checkAllItems = function (val) {
        var _this = this;
        if (val === true) {
            this.customers.forEach(function (item, i) {
                _this.fval.customers.controls[i].controls.approved.setValue(val);
            });
        }
        else {
            this.customers.forEach(function (item, i) {
                _this.fval.customers.controls[i].controls.approved.setValue(false);
            });
        }
    };
    VerifyClientComponent.prototype.deselectAll = function (val) {
        // console.log(this.fval.approveAreas["controls"][val]["controls"].approved.value)
        if (this.fval.customers.controls[val].controls.approved.value ===
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
        this.errored = false;
        this.posted = false;
        var itemsApproved = [];
        if (this.currentCustomer === 'BodaBoda Fuel') {
            this.customers.forEach(function (customer, i) {
                if (_this.fval.customers.controls[i].controls.approved.value === true) {
                    itemsApproved.push({
                        bodabodaCustomerId: customer.bodabodaCustomerId,
                        bodabodaCustomerStatus: 2
                    });
                }
            });
            // console.log(itemsApproved.length);
            if (itemsApproved.length > 0) {
                // console.log(itemsApproved);
                this.others.putVerifyBodaBodaCustomer(itemsApproved).subscribe(function (res) {
                    _this.posted = true;
                    _this.alertService.success({
                        html: '<b> verification was successful </b>'
                    });
                    setTimeout(function () {
                        itemsApproved = [];
                        _this.getBodaCustomers();
                    }, 3000);
                }, function (err) {
                    _this.errored = true;
                    _this.alertService.danger({
                        html: '<b>' + err.error.statusText + '</b>'
                    });
                });
            }
            else {
                this.errored = true;
                this.alertService.danger({
                    html: '<b> Please select a customer first </b>'
                });
                return;
            }
        }
        else if (this.currentCustomer === 'Taxi Fuel') {
            this.customers.forEach(function (customer, i) {
                if (_this.fval.customers.controls[i].controls.approved.value === true) {
                    itemsApproved.push({
                        taxiCustomerId: customer.taxiCustomerId,
                        taxiCustomerStatus: 2
                    });
                }
            });
            // console.log(itemsApproved.length);
            if (itemsApproved.length > 0) {
                // console.log(itemsApproved);
                this.others.putVerifyTaxiCustomer(itemsApproved).subscribe(function (res) {
                    _this.posted = true;
                    _this.alertService.success({
                        html: '<b> verification was successful </b>'
                    });
                    setTimeout(function () {
                        itemsApproved = [];
                        _this.getTaxiCustomers();
                    }, 3000);
                }, function (err) {
                    _this.errored = true;
                    _this.alertService.danger({
                        html: '<b>' + err.error.statusText + '</b>'
                    });
                });
            }
            else {
                this.errored = true;
                this.alertService.danger({
                    html: '<b> Please select a customer first </b>'
                });
                return;
            }
        }
        else if (this.currentCustomer === 'Micro Loan') {
            this.customers.forEach(function (customer, i) {
                if (_this.fval.customers.controls[i].controls.approved.value === true) {
                    itemsApproved.push({
                        microloanCustomerId: customer.microloanCustomerId,
                        microloanCustomerStatus: 2
                    });
                }
            });
            // console.log(itemsApproved.length);
            if (itemsApproved.length > 0) {
                // console.log(itemsApproved);
                this.others.putVerifyMicroCustomer(itemsApproved).subscribe(function (res) {
                    _this.posted = true;
                    _this.alertService.success({
                        html: '<b> verification was successful </b>'
                    });
                    setTimeout(function () {
                        itemsApproved = [];
                        _this.getMicroCustomers();
                    }, 3000);
                }, function (err) {
                    _this.errored = true;
                    _this.alertService.danger({
                        html: '<b>' + err.error.statusText + '</b>'
                    });
                });
            }
            else {
                this.errored = true;
                this.alertService.danger({
                    html: '<b> Please select a customer first </b>'
                });
                return;
            }
        }
        else if (this.currentCustomer === 'Savings') {
            this.customers.forEach(function (customer, i) {
                if (_this.fval.customers.controls[i].controls.approved.value === true) {
                    itemsApproved.push({
                        savingsCustomerId: customer.savingsCustomerId,
                        savingsCustomerStatus: 2
                    });
                }
            });
            // console.log(itemsApproved.length);
            if (itemsApproved.length > 0) {
                // console.log(itemsApproved);
                this.others.putVerifySavingsCustomer(itemsApproved).subscribe(function (res) {
                    _this.posted = true;
                    _this.alertService.success({
                        html: '<b> verification was successful </b>'
                    });
                    setTimeout(function () {
                        itemsApproved = [];
                        _this.getSavingsCustomers();
                    }, 3000);
                }, function (err) {
                    _this.errored = true;
                    _this.alertService.danger({
                        html: '<b>' + err.error.statusText + '</b>'
                    });
                });
            }
            else {
                this.errored = true;
                this.alertService.danger({
                    html: '<b> Please select a customer first </b>'
                });
                return;
            }
        }
    };
    VerifyClientComponent.prototype.rejectItems = function () {
        var _this = this;
        this.errored = false;
        this.posted = false;
        var itemsRejected = [];
        if (this.currentCustomer === 'BodaBoda Fuel') {
            this.customers.forEach(function (customer, i) {
                if (_this.fval.customers.controls[i].controls.approved.value === true) {
                    itemsRejected.push({
                        bodabodaCustomerId: customer.bodabodaCustomerId
                    });
                }
            });
            // console.log(itemsRejected.length);
            if (itemsRejected.length > 0) {
                // console.log(itemsRejected);
                this.others.putRejectBodaBodaCustomer(itemsRejected).subscribe(function (res) {
                    _this.posted = true;
                    _this.alertService.success({
                        html: '<b> verification was successful </b>'
                    });
                    setTimeout(function () {
                        itemsRejected = [];
                        _this.getBodaCustomers();
                    }, 3000);
                }, function (err) {
                    _this.errored = true;
                    itemsRejected = [];
                    _this.alertService.danger({
                        html: '<b>' + err.error.statusText + '</b>'
                    });
                });
            }
            else {
                this.errored = true;
                this.alertService.danger({
                    html: '<b> Please select a customer first </b>'
                });
                return;
            }
        }
        else if (this.currentCustomer === 'Taxi Fuel') {
            this.customers.forEach(function (customer, i) {
                if (_this.fval.customers.controls[i].controls.approved.value === true) {
                    itemsRejected.push({
                        taxiCustomerId: customer.taxiCustomerId
                    });
                }
            });
            // console.log(itemsRejected.length);
            if (itemsRejected.length > 0) {
                // console.log(itemsRejected);
                this.others.putRejectTaxiCustomer(itemsRejected).subscribe(function (res) {
                    _this.posted = true;
                    _this.alertService.success({
                        html: '<b> rejection was successful </b>'
                    });
                    setTimeout(function () {
                        itemsRejected = [];
                        _this.getTaxiCustomers();
                    }, 3000);
                }, function (err) {
                    _this.errored = true;
                    itemsRejected = [];
                    _this.alertService.danger({
                        html: '<b>' + err.error.statusText + '</b>'
                    });
                });
            }
            else {
                this.errored = true;
                this.alertService.danger({
                    html: '<b> Please select a customer first </b>'
                });
                return;
            }
        }
        else if (this.currentCustomer === 'Micro Loan') {
            this.customers.forEach(function (customer, i) {
                if (_this.fval.customers.controls[i].controls.approved.value === true) {
                    itemsRejected.push({
                        microloanCustomerId: customer.microloanCustomerId
                    });
                }
            });
            // console.log(itemsRejected.length);
            if (itemsRejected.length > 0) {
                // console.log(itemsRejected);
                this.others.putRejectMicroCustomer(itemsRejected).subscribe(function (res) {
                    _this.posted = true;
                    _this.alertService.success({
                        html: '<b> rejection was successful </b>'
                    });
                    setTimeout(function () {
                        itemsRejected = [];
                        _this.getMicroCustomers();
                    }, 3000);
                }, function (err) {
                    _this.errored = true;
                    itemsRejected = [];
                    _this.alertService.danger({
                        html: '<b>' + err.error.statusText + '</b>'
                    });
                });
            }
            else {
                this.errored = true;
                this.alertService.danger({
                    html: '<b> Please select a customer first </b>'
                });
                return;
            }
        }
        else if (this.currentCustomer === 'Savings') {
            this.customers.forEach(function (customer, i) {
                if (_this.fval.customers.controls[i].controls.approved.value === true) {
                    itemsRejected.push({
                        savingsCustomerId: customer.savingsCustomerId
                    });
                }
            });
            // console.log(itemsRejected.length);
            if (itemsRejected.length > 0) {
                // console.log(itemsRejected);
                this.others.putRejectSavingsCustomer(itemsRejected).subscribe(function (res) {
                    _this.posted = true;
                    _this.alertService.success({
                        html: '<b> rejection was successful </b>'
                    });
                    setTimeout(function () {
                        itemsRejected = [];
                        _this.getSavingsCustomers();
                    }, 3000);
                }, function (err) {
                    _this.errored = true;
                    itemsRejected = [];
                    _this.alertService.danger({
                        html: '<b>' + err.error.statusText + '</b>'
                    });
                });
            }
            else {
                this.errored = true;
                this.alertService.danger({
                    html: '<b> Please select a customer first </b>'
                });
                return;
            }
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
