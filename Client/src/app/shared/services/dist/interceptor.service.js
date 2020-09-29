"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.InterceptorService = void 0;
var http_1 = require("@angular/common/http");
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var InterceptorService = /** @class */ (function () {
    function InterceptorService(authService, router) {
        this.authService = authService;
        this.router = router;
        this.isRefreshing = false;
        this.refreshTokenSubject = new rxjs_1.BehaviorSubject(null);
    }
    InterceptorService.prototype.intercept = function (request, next) {
        var _this = this;
        if (this.authService.getJwtToken()) {
            request = this.addToken(request, this.authService.getJwtToken());
        }
        return next.handle(request).pipe(operators_1.catchError(function (error) {
            if (error instanceof http_1.HttpErrorResponse && error.status === 401) {
                return _this.handle401Error(request, next);
            }
            else {
                return rxjs_1.throwError(error);
            }
        }));
    };
    // tslint:disable-next-line: typedef
    InterceptorService.prototype.addToken = function (request, token) {
        return request.clone({
            setHeaders: {
                Authorization: "Bearer " + token
            }
        });
    };
    InterceptorService.prototype.handle401Error = function (request, next) {
        var _this = this;
        if (!this.isRefreshing) {
            this.isRefreshing = true;
            this.refreshTokenSubject.next(null);
            return this.authService.refreshToken().pipe(operators_1.switchMap(function (token) {
                _this.isRefreshing = false;
                _this.refreshTokenSubject.next(token.jwt);
                return next.handle(_this.addToken(request, token.jwt));
            }));
        }
        else {
            return this.refreshTokenSubject.pipe(operators_1.filter(function (token) { return token != null; }), operators_1.take(1), operators_1.switchMap(function (jwt) {
                return next.handle(_this.addToken(request, jwt));
            }));
        }
    };
    InterceptorService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], InterceptorService);
    return InterceptorService;
}());
exports.InterceptorService = InterceptorService;
