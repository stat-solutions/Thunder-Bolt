"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.RightPanelAdminComponent = void 0;
var core_1 = require("@angular/core");
// tslint:disable: deprecation
var RightPanelAdminComponent = /** @class */ (function () {
    function RightPanelAdminComponent(layoutService) {
        this.layoutService = layoutService;
        this.rightPanelStatus = false;
        this.navBarMenuEffectList = [];
    }
    RightPanelAdminComponent.prototype.changeTheRightPanelStatus = function () {
        this.rightPanelStatus = !this.rightPanelStatus;
    };
    RightPanelAdminComponent.prototype.setThemeLayout = function (event) {
        if (event.target.checked) {
            this.layoutService.getThemeLayout('box');
        }
        else {
            this.layoutService.getThemeLayout('wide');
        }
    };
    RightPanelAdminComponent.prototype.setCollapsedLeftHeader = function (event) {
        if (event.target.checked) {
            this.layoutService.getCollapsedLeftHeader(true);
        }
        else {
            this.layoutService.getCollapsedLeftHeader(false);
        }
    };
    RightPanelAdminComponent.prototype.changeNavbar = function (event) {
        if (event.target.checked) {
            this.layoutService.getNavLayout('horizontal');
        }
        else {
            this.layoutService.getNavLayout('vertical');
        }
    };
    RightPanelAdminComponent.prototype.onLheaderThemeChange = function (themeName) {
        event.stopPropagation();
        this.layoutService.getLeftHeaderThemeOnChange(themeName);
    };
    RightPanelAdminComponent.prototype.onHeaderThemeChange = function (themeName) {
        event.stopPropagation();
        this.layoutService.getHeaderThemeOnChange(themeName);
    };
    RightPanelAdminComponent.prototype.onAsidebarThemeChange = function (themeName) {
        event.stopPropagation();
        this.layoutService.getAsidebarThemeOnChange(themeName);
    };
    RightPanelAdminComponent.prototype.onChangeEffect = function (effect) {
        this.layoutService.getNavBarEffect(effect);
        if (effect === 'overlay' || effect === 'push') {
            this.layoutService.getDefaultNavbar('offcanvas');
            this.layoutService.getToggleNavbar('expanded');
        }
    };
    RightPanelAdminComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.navBarMenuEffectList = this.layoutService.navBarMenuEffect;
        this.layoutService.nvEffectCast.subscribe(function (nvEffect) { return (_this.navbarEffect = nvEffect); });
        this.lHeaderTheme = [
            {
                theme: 'theme1'
            },
            {
                theme: 'theme2'
            },
            {
                theme: 'theme3'
            },
            {
                theme: 'theme4'
            },
            {
                theme: 'theme5'
            },
            {
                theme: 'theme6'
            },
            {
                theme: 'theme7'
            },
        ];
        this.headerTheme = [
            {
                theme: 'theme1'
            },
            {
                theme: 'theme2'
            },
            {
                theme: 'theme3'
            },
            {
                theme: 'theme4'
            },
            {
                theme: 'theme5'
            },
            {
                theme: 'theme6'
            },
            {
                theme: 'theme7'
            },
        ];
        this.leftPanelTheme = [
            {
                theme: 'theme1'
            },
            {
                theme: 'theme2'
            },
            {
                theme: 'theme3'
            },
            {
                theme: 'theme4'
            },
            {
                theme: 'theme5'
            },
            {
                theme: 'theme6'
            },
            {
                theme: 'theme7'
            },
        ];
    };
    RightPanelAdminComponent = __decorate([
        core_1.Component({
            selector: 'app-right-panel',
            templateUrl: './right-panel-admin.component.html',
            styleUrls: ['./right-panel-admin.component.scss']
        })
    ], RightPanelAdminComponent);
    return RightPanelAdminComponent;
}());
exports.RightPanelAdminComponent = RightPanelAdminComponent;
