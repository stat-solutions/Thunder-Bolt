"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AuthServiceService = void 0;
var core_1 = require("@angular/core");
var environment_1 = require("src/environments/environment");
var rxjs_1 = require("rxjs");
var http_1 = require("@angular/common/http");
var operators_1 = require("rxjs/operators");
var AuthServiceService = /** @class */ (function () {
    function AuthServiceService(http, router, jwtHelper) {
        this.http = http;
        this.router = router;
        this.jwtHelper = jwtHelper;
        this.API_URL = environment_1.environment.apiUrl;
        this.ACCESS_TOKEN = 'ACCESS TOKEN';
        this.REFRESH_TOKEN = 'REFRESH_TOKEN';
        this.httpOptions = {
            headers: new http_1.HttpHeaders({
                'Content-Type': 'application/json'
            })
        };
    }
    AuthServiceService.prototype.loginNormalUser = function (postData) {
        var _this = this;
        return this.http.post(this.API_URL + "/api/user/loginUser", postData, this.httpOptions)
            .pipe(
        // tap(tokens => console.log(`${tokens}`)),
        operators_1.tap(function (tokens) { return _this.doLoginUser(postData.userPhone1, tokens); }), operators_1.mapTo(true), operators_1.catchError(this.handleLoginError));
    };
    AuthServiceService.prototype.testingTheTablePost = function (postData) {
        return this.http.post(this.API_URL + "/api/auth/testTableData", postData.value, this.httpOptions)
            .pipe(
        // tap(tokens => console.log(`${tokens}`)),
        // tap(tokens => this.doLoginUser(postData.value.main_contact_number, tokens)),
        // mapTo(true),
        operators_1.catchError(this.handleLoginError));
    };
    AuthServiceService.prototype.isAgentRegistered = function (id) {
        //  return of(true);
        var options1 = { params: new http_1.HttpParams().set('id', id) };
        return this.http.get(this.API_URL + "/api/auth/isAgentRegistered", options1)
            .pipe(operators_1.catchError(this.OtherErrors));
    };
    AuthServiceService.prototype.getRoles = function () {
        return this.http.get(this.API_URL + "/api/auth/userRoles");
    };
    // logout(): any {
    //   return this.http.post<any>(`${this.API_URL}/api/auth/logout`, { refreshToken: this.getRefreshToken() })
    //     .pipe(
    //       tap(() => this.doLogoutUser()),
    //       mapTo(true),
    //       catchError(error => {
    //         this.handleLoginError(error);
    //         return of(false);
    //       }
    //       )
    //     );
    // }
    AuthServiceService.prototype.registerUser = function (postData) {
        return this.http.post(this.API_URL + "/api/user/registerUser", postData, this.httpOptions)
            .pipe(operators_1.map(function (res) { return res; }), operators_1.tap(function (res) { return console.log("AFTER MAP: " + res); }), operators_1.catchError(this.handleRegisterError));
    };
    AuthServiceService.prototype.changePIN = function (postData) {
        var _this = this;
        return this.http.post(this.API_URL + "/api/user/registerUser", postData.value, this.httpOptions)
            .pipe(
        // tap(tokens => console.log(`${tokens}`)),
        operators_1.tap(function (tokens) { return _this.doLoginUser(postData.value.main_contact_number, tokens); }), operators_1.mapTo(true), operators_1.catchError(this.handleLoginError));
    };
    // tslint:disable-next-line: typedef
    AuthServiceService.prototype.doLoginUser = function (phoneNubmer, tokens) {
        this.loggedInUser = phoneNubmer;
        this.storeTokens(tokens);
    };
    AuthServiceService.prototype.doLogoutUser = function () {
        this.loggedInUser = null;
        this.removeTokens();
    };
    AuthServiceService.prototype.removeTokens = function () {
        localStorage.removeItem(this.ACCESS_TOKEN);
        localStorage.removeItem(this.REFRESH_TOKEN);
    };
    AuthServiceService.prototype.isLoggedIn = function () {
        return !!this.getJwtToken();
    };
    AuthServiceService.prototype.loggedInUserInfo = function () {
        // console.log(this.jwtHelper.decodeToken(this.getJwtToken()));
        var xn = this.jwtHelper.decodeToken(this.getJwtToken());
        return {
            userName: xn.userName,
            userId: xn.userId,
            userPhone: xn.userPhone1,
            userLocationId: xn.locationId,
            accessRights: xn.fkAccessRightsIdUser
        };
    };
    AuthServiceService.prototype.getJwtToken = function () {
        return localStorage.getItem(this.ACCESS_TOKEN);
    };
    AuthServiceService.prototype.refreshToken = function () {
        var _this = this;
        // console.log('am refreshing');
        return this.http.post(this.API_URL + "/api/user/userRefreshToken", {
            refreshToken: this.getRefreshToken()
        }).pipe(operators_1.tap(function (tokens) {
            _this.storeJwtToken(tokens.accessToken);
        }));
    };
    AuthServiceService.prototype.storeJwtToken = function (accessToken) {
        localStorage.setItem(this.ACCESS_TOKEN, accessToken);
    };
    AuthServiceService.prototype.getRefreshToken = function () {
        return localStorage.getItem(this.REFRESH_TOKEN);
    };
    AuthServiceService.prototype.storeTokens = function (tokens) {
        localStorage.setItem(this.ACCESS_TOKEN, tokens.accessToken);
        localStorage.setItem(this.REFRESH_TOKEN, tokens.refreshToken);
    };
    AuthServiceService.prototype.handleLoginError = function (errorResponse) {
        if (errorResponse.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            console.error('An error occurred:', errorResponse.error.message);
        }
        else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            console.error("Backend returned code " + errorResponse.status + "," +
                ("body was: " + errorResponse.error));
        }
        // return an observable with a user-facing error message
        return rxjs_1.throwError("Authorisation Failed!!\n      " + ((errorResponse.status === 0 || errorResponse.status === 500 || errorResponse.status === 200) ?
            'The Back End was not able to Handle this Request' : errorResponse.error) + "\n  !!");
    };
    AuthServiceService.prototype.handleRegisterError = function (errorResponse) {
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
        return rxjs_1.throwError("User Registration failed!!\n      " + ((errorResponse.status === 500 || errorResponse.status === 0 || errorResponse.status === 200) ?
            'The Back End was not able to Handle this Request' : errorResponse.error) + "\n  !!");
    };
    AuthServiceService.prototype.OtherErrors = function (errorResponse) {
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
    AuthServiceService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], AuthServiceService);
    return AuthServiceService;
}());
exports.AuthServiceService = AuthServiceService;
