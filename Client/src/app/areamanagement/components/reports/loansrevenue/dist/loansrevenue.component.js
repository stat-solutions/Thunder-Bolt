"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.LoansrevenueComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var LoansrevenueComponent = /** @class */ (function () {
    function LoansrevenueComponent(fb, modalService, authService, others, router, spinner, alertService) {
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
    LoansrevenueComponent.prototype.ngOnInit = function () {
        this.reports.sort();
        this.userForm = this.createFormGroup();
    };
    LoansrevenueComponent.prototype.createFormGroup = function () {
        return this.fb.group({
            report_type: this.fb.control('', forms_1.Validators.compose([])),
            range_date: this.fb.control('', forms_1.Validators.compose([]))
        });
    };
    LoansrevenueComponent.prototype.changeReport = function (val) {
        // console.log(val);
        this.type = val;
        var date = new Date();
        var startDate = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
        var endDate = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
        this.fetchReports([startDate, endDate], this.type);
    };
    LoansrevenueComponent.prototype.fetchReport = function (val) {
        if (val.length > 1) {
            var startDate = val[0].getFullYear() + "-" + (val[0].getMonth() + 1) + "-" + val[0].getDate();
            var endDate = val[1].getFullYear() + "-" + (val[1].getMonth() + 1) + "-" + val[1].getDate();
            this.fetchReports([startDate, endDate], this.type);
            this.userForm.controls.range_date.setValue('');
        }
    };
    LoansrevenueComponent.prototype.fetchReports = function (dates, typeOfReport) {
        var _this = this;
        switch (typeOfReport) {
            case 'Cash Ledger':
                this.others.getCashLedgerArea({
                    theStationLocationId: this.User.userLocationId,
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
                    }
                }, function (err) {
                    console.log(err);
                });
                break;
            case 'All Loans':
                this.others.getAllLoansByRegion(this.User.userLocationId).subscribe(function (res) {
                    _this.singleReport = res;
                }, function (err) {
                    console.log(err);
                });
                break;
            case 'Revenue Ledger':
                this.others.getAllRevenueArea({
                    theAreaLocationId: this.User.userLocationId,
                    startDate: dates[0],
                    endDate: dates[1]
                }).subscribe(function (res) {
                    _this.totals = res.pop();
                    _this.singleReport = res;
                }, function (err) {
                    console.log(err);
                });
                break;
        }
    };
    LoansrevenueComponent.prototype.openModal = function (template, photoUrl) {
        this.imageUrl = photoUrl;
        this.modalRef = this.modalService.show(template, Object.assign({}, { "class": 'modal-dialog-centered' }));
    };
    LoansrevenueComponent = __decorate([
        core_1.Component({
            selector: 'app-loansrevenue',
            templateUrl: './loansrevenue.component.html',
            styleUrls: ['./loansrevenue.component.scss']
        })
    ], LoansrevenueComponent);
    return LoansrevenueComponent;
}());
exports.LoansrevenueComponent = LoansrevenueComponent;
