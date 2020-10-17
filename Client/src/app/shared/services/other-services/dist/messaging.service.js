"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.MessagingService = void 0;
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var MessagingService = /** @class */ (function () {
    function MessagingService(angularFireMessaging) {
        this.angularFireMessaging = angularFireMessaging;
        this.currentMessage = new rxjs_1.BehaviorSubject(null);
        this.angularFireMessaging.messages.subscribe(
        // tslint:disable-next-line: variable-name
        function (_messaging) {
            _messaging.onMessage = _messaging.onMessage.bind(_messaging);
            _messaging.onTokenRefresh = _messaging.onTokenRefresh.bind(_messaging);
        });
    }
    MessagingService.prototype.requestPermission = function () {
        this.angularFireMessaging.requestToken.subscribe(function (token) {
            console.log(token);
        }, function (err) {
            console.error('Unable to get permission to notify.', err);
        });
    };
    MessagingService.prototype.receiveMessage = function () {
        var _this = this;
        this.angularFireMessaging.messages.subscribe(function (payload) {
            console.log('new message received.', payload);
            _this.currentMessage.next(payload);
        });
    };
    MessagingService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], MessagingService);
    return MessagingService;
}());
exports.MessagingService = MessagingService;
