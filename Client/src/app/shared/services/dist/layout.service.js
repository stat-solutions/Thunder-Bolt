"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.LayoutService = void 0;
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var LayoutService = /** @class */ (function () {
    function LayoutService() {
        // Commaon Settings for Horizontal and Vertical Navigation
        this.navLayout = 'vertical'; // Value Should be 'horizontal' or 'vertical'
        this.toggleStatus = true; // Value Should be 'true' or 'false'
        this.themeLayout = 'wide'; // value Should be 'wide', 'box'
        this.headerHeight = 50;
        this.asidebarHeight = window.innerHeight;
        this.contentHeight = window.innerHeight - this.headerHeight;
        this.headerColorTheme = 'theme1';
        this.leftHeaderColorTheme = 'theme2';
        this.navbarColorTheme = 'theme2';
        this.activeNavColorTheme = 'theme1';
        // Setting Only for Vertical
        this.collapsedLeftHeader = true; // valshould be true, false
        this.toggleOnHover = true;
        this.defaultNavbar = 'expended'; // Value Should be 'expended', 'collapsed', 'offcanvas', 'compact'
        this.toggleNavbar = 'expended'; // Value Should be 'expended', 'collapsed', 'offcanvas', 'compact'
        this.navBarEffect = 'overlay'; // Value Should be 'shrink', 'push', 'overlay'
        this.deviceType = 'desktop'; // Value should be mobile, tablet, desktop
        // defaultVerticalMenu[0] = Default menu on mobile
        // defaultVerticalMenu[1] = Default menu on tablet
        // defaultVerticalMenu[2] = Default menu on desktop
        this.defaultVerticalMenu = ['offcanvas', 'collapsed', 'expanded'];
        // onToggleVerticalMenu[0] = Toggle menu on mobile
        // onToggleVerticalMenu[1] = Toggle menu on tablet
        // onToggleVerticalMenu[2] = Toggle menu on desktop
        this.onToggleVerticalMenu = ['expanded', 'expanded', 'collapsed'];
        // navBarMenuEffect[0] = Sidebar Toggle effect on mobile
        // navBarMenuEffect[1] = Sidebar Toggle effect on tablet
        // navBarMenuEffect[2] = Sidebar Toggle effect on desktop
        this.navBarMenuEffect = ['overlay', 'push', 'shrink'];
        // defaultDeviceType[0] = breakpoint for Mobile
        // defaultDeviceType[1] = breakpoint for tablet
        // defaultDeviceType[2] = breakpoint for desktop
        this.defaultDeviceType = ['mobile', 'tablet', 'desktop'];
        this.setNavLayout = new rxjs_1.BehaviorSubject(this.navLayout);
        this.navLayoutCast = this.setNavLayout.asObservable();
        this.setCollapsedLeftHeader = new rxjs_1.BehaviorSubject(this.collapsedLeftHeader);
        this.collapsedLeftHeaderCast = this.setCollapsedLeftHeader.asObservable();
        this.tStatus = new rxjs_1.BehaviorSubject(this.toggleStatus);
        this.tStatusCast = this.tStatus.asObservable();
        this.dfNavbar = new rxjs_1.BehaviorSubject(this.defaultNavbar);
        this.dfNavbarCast = this.dfNavbar.asObservable();
        this.tNavbar = new rxjs_1.BehaviorSubject(this.toggleNavbar);
        this.toggleNavbarCast = this.tNavbar.asObservable();
        this.nvEffect = new rxjs_1.BehaviorSubject(this.navBarEffect);
        this.nvEffectCast = this.nvEffect.asObservable();
        this.setCtHeight = new rxjs_1.BehaviorSubject(this.contentHeight);
        this.contentHeightCast = this.setCtHeight.asObservable();
        this.setAsidebarHeight = new rxjs_1.BehaviorSubject(this.asidebarHeight);
        this.setAsidebarHeightCast = this.setAsidebarHeight.asObservable();
        this.setHeaderTheme = new rxjs_1.BehaviorSubject(this.headerColorTheme);
        this.headerThemeCast = this.setHeaderTheme.asObservable();
        this.setLeftHeaderTheme = new rxjs_1.BehaviorSubject(this.leftHeaderColorTheme);
        this.leftHeaderThemeCast = this.setLeftHeaderTheme.asObservable();
        this.setNavbarTheme = new rxjs_1.BehaviorSubject(this.navbarColorTheme);
        this.navbarThemeCast = this.setNavbarTheme.asObservable();
        this.SetActiveNavTheme = new rxjs_1.BehaviorSubject(this.activeNavColorTheme);
        this.activeNavThemeCast = this.SetActiveNavTheme.asObservable();
        this.SetThemeLayout = new rxjs_1.BehaviorSubject(this.themeLayout);
        this.themeLayoutCast = this.SetThemeLayout.asObservable();
        this.appDeviceType = new rxjs_1.BehaviorSubject(this.deviceType);
        this.deviceTypeCast = this.appDeviceType.asObservable();
    }
    LayoutService.prototype.getToggleStatus = function () {
        this.toggleStatus = !this.toggleStatus;
        this.tStatus.next(this.toggleStatus);
    };
    LayoutService.prototype.getDefaultNavbar = function (defaultNavbar) {
        this.dfNavbar.next(defaultNavbar);
    };
    LayoutService.prototype.getToggleNavbar = function (toggleNavbar) {
        this.tNavbar.next(toggleNavbar);
    };
    LayoutService.prototype.getNavBarEffect = function (navbarEffect) {
        this.nvEffect.next(navbarEffect);
    };
    LayoutService.prototype.getDeviceType = function (dt) {
        this.appDeviceType.next(dt);
    };
    LayoutService.prototype.getThemeLayout = function (tl) {
        this.SetThemeLayout.next(tl);
    };
    LayoutService.prototype.getCollapsedLeftHeader = function (clh) {
        this.setCollapsedLeftHeader.next(clh);
    };
    LayoutService.prototype.getNavLayout = function (nl) {
        this.setNavLayout.next(nl);
    };
    LayoutService.prototype.getLeftHeaderThemeOnChange = function (themeName) {
        this.setLeftHeaderTheme.next(themeName);
    };
    LayoutService.prototype.getHeaderThemeOnChange = function (themeName) {
        this.setHeaderTheme.next(themeName);
    };
    LayoutService.prototype.getAsidebarThemeOnChange = function (themeName) {
        this.setNavbarTheme.next(themeName);
    };
    // This function called from page Core component load and resize
    LayoutService.prototype.checkWindowWidth = function (windowWidth) {
        if (this.navLayout === 'vertical') {
            if (windowWidth >= 768 && windowWidth <= 1024) {
                this.defaultNavbar = this.defaultVerticalMenu[1];
                this.toggleNavbar = this.onToggleVerticalMenu[1];
                this.navBarEffect = this.navBarMenuEffect[2];
                this.deviceType = this.defaultDeviceType[1];
            }
            else if (windowWidth < 768) {
                this.defaultNavbar = this.defaultVerticalMenu[0];
                this.toggleNavbar = this.onToggleVerticalMenu[2];
                this.navBarEffect = this.navBarMenuEffect[0];
                this.deviceType = this.defaultDeviceType[0];
            }
            else {
                this.defaultNavbar = this.defaultVerticalMenu[2];
                this.toggleNavbar = this.onToggleVerticalMenu[2];
                this.navBarEffect = this.navBarMenuEffect[2];
                this.deviceType = this.defaultDeviceType[2];
            }
        }
        else if (this.navLayout === 'horizontal') {
            if (windowWidth >= 768 && windowWidth <= 1024) {
                this.deviceType = this.defaultDeviceType[1];
            }
            else if (windowWidth < 768) {
                this.deviceType = this.defaultDeviceType[0];
            }
            else {
                this.deviceType = this.defaultDeviceType[2];
            }
        }
        this.getDefaultNavbar(this.defaultNavbar);
        this.getToggleNavbar(this.toggleNavbar);
        this.getNavBarEffect(this.navBarEffect);
        this.getDeviceType(this.deviceType);
    };
    LayoutService.prototype.getVerticalNavbarOnWindowResize = function (windowWidth) {
        this.checkWindowWidth(windowWidth);
    };
    LayoutService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], LayoutService);
    return LayoutService;
}());
exports.LayoutService = LayoutService;
