"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.OthersService = void 0;
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var http_1 = require("@angular/common/http");
var operators_1 = require("rxjs/operators");
var environment_1 = require("src/environments/environment");
var OthersService = /** @class */ (function () {
    function OthersService(http, router) {
        this.http = http;
        this.router = router;
        this.API_URL = environment_1.environment.apiUrl;
        this.httpOptions = {
            headers: new http_1.HttpHeaders({
                'Content-Type': 'application/json'
            })
        };
    }
    //  create company section
    OthersService.prototype.createCompany = function (postData) {
        return this.http.post(this.API_URL + "/api/business/companysetup", postData.value, this.httpOptions)
            .pipe(operators_1.tap(function (res) { return console.log("AFTER MAP: " + res); }), operators_1.catchError(this.handleCompanySetupError));
    };
    OthersService.prototype.getCompanyInfo = function () {
        return this.http.get(this.API_URL + "/api/business/companyDetails")
            .pipe(operators_1.catchError(this.OtherErrors));
    };
    // users and set user profile
    OthersService.prototype.getUsers = function () {
        return this.http.get(this.API_URL + "/api/business/users");
    };
    OthersService.prototype.getUserProfile = function (userId) {
        return this.http.get(this.API_URL + "/api/business/users/" + userId);
    };
    OthersService.prototype.setUserProfile = function (postData, userId) {
        return this.http.put(this.API_URL + "/api/business/users/" + userId, postData.value, this.httpOptions);
    };
    OthersService.prototype.setNewPassword = function (postData, userId) {
        return this.http.put(this.API_URL + "/api/business/users/" + userId, postData, this.httpOptions);
    };
    // top results
    OthersService.prototype.getTopUsers = function () {
        return this.http.get(this.API_URL + "/api/business/topusers");
    };
    OthersService.prototype.getTopClients = function () {
        return this.http.get(this.API_URL + "/api/bussiness/topclients");
    };
    OthersService.prototype.getTopStations = function () {
        return this.http.get(this.API_URL + "/api/business/topstations");
    };
    // approvals and business unit
    OthersService.prototype.getApprovalLevels = function () {
        return this.http.get(this.API_URL + "/api/business/approvalslevels");
    };
    OthersService.prototype.setApprovalLevel = function (postData) {
        return this.http.post(this.API_URL + "/api/business/setapprovallevel", postData.value, this.httpOptions);
    };
    OthersService.prototype.getBussinessUnits = function () {
        return this.http.get(this.API_URL + "/api/business/bussinessunits");
    };
    OthersService.prototype.setBussinessUnits = function (postData) {
        return this.http.post(this.API_URL + "/api/business/setbusinessunit", postData, this.httpOptions);
    };
    //  creating area town and station
    OthersService.prototype.createArea = function (postData) {
        return this.http.post(this.API_URL + "/api/business/createarea", postData, this.httpOptions);
    };
    OthersService.prototype.createTown = function (postData) {
        return this.http.post(this.API_URL + "/api/business/createtown", postData, this.httpOptions);
    };
    OthersService.prototype.createStaion = function (postData) {
        return this.http.post(this.API_URL + "/api/business/createstation", postData, this.httpOptions);
    };
    // client section
    OthersService.prototype.enrollClient = function (postData) {
        return this.http.post(this.API_URL + "/api/business/enrollclient", postData, this.httpOptions);
    };
    OthersService.prototype.getClients = function () {
        return this.http.get(this.API_URL + "/api/business/clients");
    };
    // get areas towns and stations
    OthersService.prototype.getAreas = function () {
        return this.http.get(this.API_URL + "/api/business/areas");
    };
    OthersService.prototype.getTowns = function () {
        return this.http.get(this.API_URL + "/api/business/towns");
    };
    OthersService.prototype.getStations = function () {
        return this.http.get(this.API_URL + "/api/business/stations");
    };
    OthersService.prototype.getAreasToApprove = function () {
        return this.http.get(this.API_URL + "/api/business/approvalareas");
    };
    OthersService.prototype.getTownsToApprove = function () {
        return this.http.get(this.API_URL + "/api/business/approvaltowns");
    };
    OthersService.prototype.getStationsToApprove = function () {
        return this.http.get(this.API_URL + "/api/business/approvalstations");
    };
    OthersService.prototype.approvedAreas = function (postData) {
        return this.http.post(this.API_URL + "/api/business/approvedareas", postData, this.httpOptions);
    };
    OthersService.prototype.approvedTowns = function (postData) {
        return this.http.post(this.API_URL + "/api/business/approvedtowns", postData, this.httpOptions);
    };
    OthersService.prototype.approvedStations = function (postData) {
        return this.http.post(this.API_URL + "/api/business/approvedstations", postData, this.httpOptions);
    };
    OthersService.prototype.rejectedApprovalsArea = function (postData) {
        return this.http.post(this.API_URL + "/api/business/rejectedareas", postData, this.httpOptions);
    };
    OthersService.prototype.rejectedApprovalsTown = function (postData) {
        return this.http.post(this.API_URL + "/api/business/rejectedtowns", postData, this.httpOptions);
    };
    OthersService.prototype.rejectedApprovalsStation = function (postData) {
        return this.http.post(this.API_URL + "/api/business/rejectedstations", postData, this.httpOptions);
    };
    OthersService.prototype.handleCompanySetupError = function (errorResponse) {
        if (errorResponse.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            console.error('An error occurred:', errorResponse.error.message);
        }
        else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            console.error("Backend returned code " + errorResponse.status + ", " +
                ("body was: " + errorResponse.error));
        }
        // return an observable with a user-facing error message
        return rxjs_1.throwError("Company Setup failed!!\n      " + ((errorResponse.status === 500 || errorResponse.status === 0 || errorResponse.status === 200) ?
            'The Back End was not able to Handle this Request' : errorResponse.error) + "\n  !!");
    };
    OthersService.prototype.OtherErrors = function (errorResponse) {
        if (errorResponse.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            console.error('An error occurred:', errorResponse.error.message);
        }
        else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            console.error("Backend returned code " + errorResponse.status + ", " +
                ("body was: " + errorResponse.error));
        }
        // return an observable with a user-facing error message
        return rxjs_1.throwError('The backend was not able to handle this request. Please contact system admin 0781331616.');
    };
    OthersService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], OthersService);
    return OthersService;
}());
exports.OthersService = OthersService;
