"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ContentSectionAdminComponent = void 0;
var core_1 = require("@angular/core");
var ContentSectionAdminComponent = /** @class */ (function () {
    function ContentSectionAdminComponent(layoutService) {
        this.layoutService = layoutService;
        this.screenTitle = 'Page Title';
    }
    ContentSectionAdminComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.layoutService.contentHeightCast.subscribe(function (setCtHeight) { return _this.contentHeight = setCtHeight; });
    };
    ContentSectionAdminComponent.prototype.onResizeHeight = function (event) {
        this.contentHeight = window.innerHeight - this.layoutService.headerHeight;
    };
    __decorate([
        core_1.Input()
    ], ContentSectionAdminComponent.prototype, "navLayout");
    __decorate([
        core_1.Input()
    ], ContentSectionAdminComponent.prototype, "defaultNavbar");
    __decorate([
        core_1.Input()
    ], ContentSectionAdminComponent.prototype, "toggleNavbar");
    __decorate([
        core_1.Input()
    ], ContentSectionAdminComponent.prototype, "toggleStatus");
    __decorate([
        core_1.Input()
    ], ContentSectionAdminComponent.prototype, "navbarEffect");
    __decorate([
        core_1.Input()
    ], ContentSectionAdminComponent.prototype, "deviceType");
    __decorate([
        core_1.Input()
    ], ContentSectionAdminComponent.prototype, "headerColorTheme");
    __decorate([
        core_1.Input()
    ], ContentSectionAdminComponent.prototype, "navbarColorTheme");
    __decorate([
        core_1.Input()
    ], ContentSectionAdminComponent.prototype, "activeNavColorTheme");
    __decorate([
        core_1.HostListener('window:resize', ['$event'])
    ], ContentSectionAdminComponent.prototype, "onResizeHeight");
    ContentSectionAdminComponent = __decorate([
        core_1.Component({
            selector: 'app-content-section',
            templateUrl: './content-section-admin.component.html',
            styleUrls: ['./content-section-admin.component.scss']
        })
    ], ContentSectionAdminComponent);
    return ContentSectionAdminComponent;
}());
exports.ContentSectionAdminComponent = ContentSectionAdminComponent;
