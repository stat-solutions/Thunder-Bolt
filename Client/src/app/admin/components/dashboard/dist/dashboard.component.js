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
        this.bussinessUnits = [
            { unitName: 'Fuel Bussiness', unitId: 104 },
            { unitName: 'Hospital Bussiness', unitId: 120 },
        ];
        this.approvals = [
            { name: 'Area Creation', level: 3 },
            { name: 'Town Creation', level: 1 },
            { name: 'Stage Creation', level: 2 },
            { name: 'Station Creation', level: 4 },
        ];
        this.showInput = false;
        this.User = this.authService.loggedInUserInfo();
    }
    DashboardComponent.prototype.ngOnInit = function () {
        this.toggleSideBar();
        this.setCompanyDetails();
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
            _this.company.created = true;
            _this.companyInfo = item;
            // console.log(this.companyInfo);
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
