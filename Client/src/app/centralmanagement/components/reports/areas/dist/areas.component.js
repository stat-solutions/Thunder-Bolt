"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AreasComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var AreasComponent = /** @class */ (function () {
    function AreasComponent(fb, modalService, authService, others, router, spinner, alertService) {
        this.fb = fb;
        this.modalService = modalService;
        this.authService = authService;
        this.others = others;
        this.router = router;
        this.spinner = spinner;
        this.alertService = alertService;
        this.user = '/../../../assets/img/man.svg';
        this.reports = [
            'All Loans', 'Normal Loans', 'Completed Loans', 'Defaulters', 'Float Deposits',
            'Defaulters', 'Revenue Ledger', 'Lost Revenue', 'Cash Ledger', 'Paid Ledger',
            'Borrowed Ledger', 'Recovery', 'Enforcement', 'Savings', 'General Savings',
            'Float Withdraws', 'Float Deposit & Withdraw', 'Waived Principal', 'Reversed Principal',
            'Waived Interest', 'Loan Transaction', 'Interest', 'Float Balance Per Day', 'Commission',
            'Security', 'Taxi Loan', 'Micro Loan', 'Micro Loan Guarantor', 'Micro Loan Security',
            'Micro Loan Amortization', 'Bodaboda Loan', 'Transaction Details'
        ];
        this.User = this.authService.loggedInUserInfo();
    }
    AreasComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.reports.sort();
        this.others.getAllTheStationLocations().subscribe(function (res) { return _this.stations = res; }, function (err) { return console.log(err); });
        this.others.getAllTheTownLocations().subscribe(function (res) { return _this.towns = res; }, function (err) { return console.log(err); });
        this.others.getAllTheAreaLocations().subscribe(function (res) { return _this.areas = res; }, function (err) { return console.log(err); });
        this.userForm = this.createFormGroup();
        this.select = 'place holder';
        this.pageSize = 10;
    };
    AreasComponent.prototype.createFormGroup = function () {
        return this.fb.group({
            report_type: this.fb.control('', forms_1.Validators.compose([])),
            search_by: this.fb.control('', forms_1.Validators.compose([])),
            location: this.fb.control('', forms_1.Validators.compose([])),
            range_date: this.fb.control('', forms_1.Validators.compose([]))
        });
    };
    AreasComponent.prototype.changeLevels = function (val) {
        switch (val) {
            case 'Region':
                this.level = val;
                this.select = "select a " + val;
                this.locations = this.areas;
                break;
            case 'Town':
                this.level = val;
                this.select = "select a " + val;
                this.locations = this.towns;
                break;
            case 'Station':
                this.level = val;
                this.select = "select a " + val;
                this.locations = this.stations;
                break;
        }
    };
    AreasComponent.prototype.changeReport = function (val) {
        // console.log(val);
        this.type = val;
        var date = new Date();
        var startDate = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
        var endDate = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
        this.fetchReports([startDate, endDate], this.type);
    };
    AreasComponent.prototype.fetchReport = function (val) {
        if (val.length > 1) {
            var startDate = val[0].getFullYear() + "-" + (val[0].getMonth() + 1) + "-" + val[0].getDate();
            var endDate = val[1].getFullYear() + "-" + (val[1].getMonth() + 1) + "-" + val[1].getDate();
            this.fetchReports([startDate, endDate], this.type);
        }
    };
    AreasComponent.prototype.fetchReports = function (dates, typeOfReport) {
        var _this = this;
        switch (typeOfReport) {
            case 'Cash Ledger':
                this.p = 1;
                this.total = 0;
                var locatioVal_1 = this.userForm.controls.location.value;
                if (locatioVal_1 !== '') {
                    switch (this.level) {
                        case 'Region':
                            this.locations.forEach(function (location) {
                                if (location.areaRegionName === locatioVal_1) {
                                    _this.others.getCashLedgerArea({
                                        theAreaLocationId: location.theAreaLocationId,
                                        startDate: dates[0],
                                        endDate: dates[1]
                                    }).subscribe(function (res) {
                                        if (res.length === 1) {
                                            _this.totals = res[0];
                                            _this.singleReport = [];
                                        }
                                        else {
                                            _this.totals = res.pop();
                                            _this.singleReport = res;
                                            _this.total = _this.singleReport.length;
                                        }
                                    }, function (err) {
                                        console.log(err);
                                    });
                                }
                            });
                            break;
                        case 'Town':
                            this.locations.forEach(function (location) {
                                if (location.townName === locatioVal_1) {
                                    _this.others.getCashLedgerTown({
                                        theTownLocationId: location.theTownLocationId,
                                        startDate: dates[0],
                                        endDate: dates[1]
                                    }).subscribe(function (res) {
                                        if (res.length === 1) {
                                            _this.totals = res[0];
                                            _this.singleReport = [];
                                        }
                                        else {
                                            _this.totals = res.pop();
                                            _this.singleReport = res;
                                            _this.total = _this.singleReport.length;
                                        }
                                    }, function (err) {
                                        console.log(err);
                                    });
                                }
                            });
                            break;
                        case 'Station':
                            this.locations.forEach(function (location) {
                                if (location.stationName === locatioVal_1) {
                                    _this.others.getCashLedgerStation({
                                        theStationLocationId: location.theStationLocationId,
                                        startDate: dates[0],
                                        endDate: dates[1]
                                    }).subscribe(function (res) {
                                        if (res.length === 1) {
                                            _this.totals = res[0];
                                            _this.singleReport = [];
                                        }
                                        else {
                                            _this.totals = res.pop();
                                            _this.singleReport = res;
                                            _this.total = _this.singleReport.length;
                                        }
                                    }, function (err) {
                                        console.log(err);
                                    });
                                }
                            });
                            break;
                    }
                }
                break;
            case 'All Loans':
                this.p = 1;
                this.total = 0;
                this.others.getAllLoans().subscribe(function (res) {
                    _this.singleReport = res;
                    _this.total = _this.singleReport.length;
                }, function (err) {
                    console.log(err);
                });
                break;
            case 'Revenue Ledger':
                this.p = 1;
                this.total = 0;
                this.others.getAllRevenue({
                    startDate: dates[0],
                    endDate: dates[1]
                }).subscribe(function (res) {
                    if (res.length === 1) {
                        _this.totals = res[0];
                        _this.singleReport = [];
                    }
                    else {
                        _this.totals = res.pop();
                        _this.singleReport = res;
                        _this.total = _this.singleReport.length;
                    }
                }, function (err) {
                    console.log(err);
                });
                break;
        }
    };
    AreasComponent.prototype.openModal = function (template, photoUrl) {
        this.imageUrl = photoUrl;
        this.modalRef = this.modalService.show(template, Object.assign({}, { "class": 'modal-dialog-centered' }));
    };
    AreasComponent.prototype.pageChanged = function (event) {
        this.p = event;
    };
    AreasComponent = __decorate([
        core_1.Component({
            selector: 'app-areas',
            templateUrl: './areas.component.html',
            styleUrls: ['./areas.component.scss']
        })
    ], AreasComponent);
    return AreasComponent;
}());
exports.AreasComponent = AreasComponent;
