"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.DashboardComponent = void 0;
var core_1 = require("@angular/core");
var operators_1 = require("rxjs/operators");
var DashboardComponent = /** @class */ (function () {
    function DashboardComponent(fb, authService, others, storage) {
        this.fb = fb;
        this.authService = authService;
        this.others = others;
        this.storage = storage;
        this.sideBarChanged = true;
        this.company = { created: false };
        this.showInput = false;
        this.User = this.authService.loggedInUserInfo();
    }
    DashboardComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.toggleSideBar();
        this.setCompanyDetails();
        this.others.getBussinessUnits().subscribe(function (units) { return _this.bussinessUnits = units; }, function (err) { return console.log(err); });
        this.others.getApprovalLevelsCreate().subscribe(function (res) {
            _this.approvals = res;
            _this.others.getApprovalLevelsUpdate().subscribe(function (response) {
                // console.log(response);
                response.forEach(function (itm, index) {
                    _this.approvals.push(itm);
                });
                // tslint:disable-next-line: only-arrow-functions
                _this.approvals = _this.approvals.map(function (x) {
                    return {
                        itemName: x.itemName.replace(/_/g, ' '),
                        approvalLevel: x.approvalLevel
                    };
                });
            }, function (error) { return console.log(error); });
        }, function (err) { return console.log(err); });
    };
    DashboardComponent.prototype.toggleSideBar = function () {
        this.sideBarChanged = !this.sideBarChanged;
        // this.sharedService.emitChange(this.sideBarChanged);
    };
    DashboardComponent.prototype.enableEdit = function () {
        this.showInput = true;
    };
    DashboardComponent.prototype.onFileSelected = function (event) {
        var _this = this;
        var n = Date.now();
        var file = event.target.files[0];
        var filePath = "companyLogo/" + n;
        var fileRef = this.storage.ref(filePath);
        var task = this.storage.upload("companyLogo/" + n, file);
        task
            .snapshotChanges()
            .pipe(operators_1.finalize(function () {
            _this.downloadURL = fileRef.getDownloadURL();
            _this.downloadURL.subscribe(function (url) {
                if (url) {
                    _this.companyPhotoUrl = url;
                }
                var data = {
                    companyLogoUrl: _this.companyPhotoUrl,
                    userId: _this.User.userId
                };
                _this.others.updateCompanyLogo(data).subscribe(function (res) { return console.log(res); }, function (err) { return console.log(err); });
                _this.setCompanyDetails();
                _this.showInput = false;
            });
        }))
            .subscribe(function (url) {
            if (url) {
                // console.log(url);
            }
        });
    };
    DashboardComponent.prototype.setCompanyDetails = function () {
        var _this = this;
        this.others.getCompanyInfo().subscribe(function (item) {
            if (item[0].companyName) {
                _this.company.created = true;
                _this.companyInfo = item;
                // console.log(this.companyInfo);
            }
            else {
                _this.company.created = false;
            }
        }, function (error) {
            //
        });
    };
    DashboardComponent = __decorate([
        core_1.Component({
            selector: 'app-admin',
            templateUrl: './dashboard.component.html',
            styleUrls: ['./dashboard.component.scss']
        })
    ], DashboardComponent);
    return DashboardComponent;
}());
exports.DashboardComponent = DashboardComponent;
