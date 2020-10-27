"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
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
    OthersService.prototype.testApi = function () {
        var _this = this;
        return this.http.get(this.API_URL + "/api/auth/getSms")
            .pipe(operators_1.tap(function (res) { return console.log(); }), operators_1.catchError(function (err) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/, console.log(err)];
        }); }); }));
    };
    //  create company section
    OthersService.prototype.createCompany = function (postData) {
        return this.http.post(this.API_URL + "/api/adminUser/setUpCompany", postData, this.httpOptions)
            .pipe(operators_1.tap(function (res) { return console.log("AFTER MAP: " + res); }), operators_1.catchError(this.handleCompanySetupError));
    };
    OthersService.prototype.getCompanyInfo = function () {
        return this.http.get(this.API_URL + "/api/adminUser/getTheCompanyDetails")
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
        return this.http.post(this.API_URL + "/api/adminUser/setupBusinessUnit", postData, this.httpOptions);
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
