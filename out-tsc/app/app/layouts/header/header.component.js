import { Component } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import * as i0 from "@angular/core";
import * as i1 from "../../core/services/auth.service";
import * as i2 from "@angular/common";
import * as i3 from "@angular/router";
function HeaderComponent_div_18_div_1_Template(rf, ctx) { if (rf & 1) {
    const _r3 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 30);
    i0.ɵɵlistener("mouseenter", function HeaderComponent_div_18_div_1_Template_div_mouseenter_0_listener() { i0.ɵɵrestoreView(_r3); const ctx_r2 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r2.adminMenuOpen = true); })("mouseleave", function HeaderComponent_div_18_div_1_Template_div_mouseleave_0_listener() { i0.ɵɵrestoreView(_r3); const ctx_r4 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r4.adminMenuOpen = false); });
    i0.ɵɵelementStart(1, "a", 31);
    i0.ɵɵlistener("click", function HeaderComponent_div_18_div_1_Template_a_click_1_listener($event) { i0.ɵɵrestoreView(_r3); const ctx_r5 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r5.toggleAdminMenu($event)); });
    i0.ɵɵelementStart(2, "span");
    i0.ɵɵtext(3, "Admin");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "span", 22);
    i0.ɵɵtext(5, "\u25BE");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(6, "div", 32)(7, "a", 33);
    i0.ɵɵlistener("click", function HeaderComponent_div_18_div_1_Template_a_click_7_listener() { i0.ɵɵrestoreView(_r3); const ctx_r6 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r6.closeMenu()); });
    i0.ɵɵelement(8, "i", 34);
    i0.ɵɵtext(9, " Trainings");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "a", 35);
    i0.ɵɵlistener("click", function HeaderComponent_div_18_div_1_Template_a_click_10_listener() { i0.ɵɵrestoreView(_r3); const ctx_r7 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r7.closeMenu()); });
    i0.ɵɵelement(11, "i", 36);
    i0.ɵɵtext(12, " Trainer");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "a", 37);
    i0.ɵɵlistener("click", function HeaderComponent_div_18_div_1_Template_a_click_13_listener() { i0.ɵɵrestoreView(_r3); const ctx_r8 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r8.closeMenu()); });
    i0.ɵɵelement(14, "i", 38);
    i0.ɵɵtext(15, " Company");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(16, "a", 39);
    i0.ɵɵlistener("click", function HeaderComponent_div_18_div_1_Template_a_click_16_listener() { i0.ɵɵrestoreView(_r3); const ctx_r9 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r9.closeMenu()); });
    i0.ɵɵelement(17, "i", 40);
    i0.ɵɵtext(18, " Test");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(19, "a", 41);
    i0.ɵɵlistener("click", function HeaderComponent_div_18_div_1_Template_a_click_19_listener() { i0.ɵɵrestoreView(_r3); const ctx_r10 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r10.closeMenu()); });
    i0.ɵɵelement(20, "i", 42);
    i0.ɵɵtext(21, " Test Questions");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(22, "a", 43);
    i0.ɵɵlistener("click", function HeaderComponent_div_18_div_1_Template_a_click_22_listener() { i0.ɵɵrestoreView(_r3); const ctx_r11 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r11.closeMenu()); });
    i0.ɵɵelement(23, "i", 44);
    i0.ɵɵtext(24, " Question");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(25, "a", 45);
    i0.ɵɵlistener("click", function HeaderComponent_div_18_div_1_Template_a_click_25_listener() { i0.ɵɵrestoreView(_r3); const ctx_r12 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r12.closeMenu()); });
    i0.ɵɵelement(26, "i", 46);
    i0.ɵɵtext(27, " Print Certificate");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(28, "a", 47);
    i0.ɵɵlistener("click", function HeaderComponent_div_18_div_1_Template_a_click_28_listener() { i0.ɵɵrestoreView(_r3); const ctx_r13 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r13.closeMenu()); });
    i0.ɵɵelement(29, "i", 48);
    i0.ɵɵtext(30, " Approve Certificates");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(31, "a", 49);
    i0.ɵɵlistener("click", function HeaderComponent_div_18_div_1_Template_a_click_31_listener() { i0.ɵɵrestoreView(_r3); const ctx_r14 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r14.closeMenu()); });
    i0.ɵɵelement(32, "i", 50);
    i0.ɵɵtext(33, " Result");
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵclassProp("account-nav-item--open", ctx_r1.adminMenuOpen);
} }
function HeaderComponent_div_18_Template(rf, ctx) { if (rf & 1) {
    const _r16 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 17);
    i0.ɵɵtemplate(1, HeaderComponent_div_18_div_1_Template, 34, 2, "div", 18);
    i0.ɵɵelementStart(2, "div", 19);
    i0.ɵɵlistener("mouseenter", function HeaderComponent_div_18_Template_div_mouseenter_2_listener() { i0.ɵɵrestoreView(_r16); const ctx_r15 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r15.userMenuOpen = true); })("mouseleave", function HeaderComponent_div_18_Template_div_mouseleave_2_listener() { i0.ɵɵrestoreView(_r16); const ctx_r17 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r17.closeUserMenu()); });
    i0.ɵɵelementStart(3, "a", 20);
    i0.ɵɵlistener("click", function HeaderComponent_div_18_Template_a_click_3_listener($event) { i0.ɵɵrestoreView(_r16); const ctx_r18 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r18.toggleUserMenu($event)); });
    i0.ɵɵelement(4, "i", 21);
    i0.ɵɵelementStart(5, "span");
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "span", 22);
    i0.ɵɵtext(8, "\u25BE");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(9, "div", 23)(10, "a", 24);
    i0.ɵɵlistener("click", function HeaderComponent_div_18_Template_a_click_10_listener() { i0.ɵɵrestoreView(_r16); const ctx_r19 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r19.closeMenu()); });
    i0.ɵɵelement(11, "i", 25);
    i0.ɵɵtext(12, " Profile");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "a", 26);
    i0.ɵɵlistener("click", function HeaderComponent_div_18_Template_a_click_13_listener() { i0.ɵɵrestoreView(_r16); const ctx_r20 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r20.closeMenu()); });
    i0.ɵɵelement(14, "i", 27);
    i0.ɵɵtext(15, " Change Password");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(16, "a", 28);
    i0.ɵɵlistener("click", function HeaderComponent_div_18_Template_a_click_16_listener() { i0.ɵɵrestoreView(_r16); const ctx_r21 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r21.logout()); });
    i0.ɵɵelement(17, "i", 29);
    i0.ɵɵtext(18, " Logout");
    i0.ɵɵelementEnd()()()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r0.isAdmin);
    i0.ɵɵadvance(1);
    i0.ɵɵclassProp("account-nav-item--open", ctx_r0.userMenuOpen);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(ctx_r0.truncatedUserName);
} }
export class HeaderComponent {
    constructor(authService) {
        this.authService = authService;
        this.menuOpen = false;
        this.isLoggedIn = false;
        this.isAdmin = false;
        this.userMenuOpen = false;
        this.adminMenuOpen = false;
        this.userName = 'User';
        this.destroy$ = new Subject();
        this.authService.currentUser$.pipe(takeUntil(this.destroy$)).subscribe((user) => {
            this.isLoggedIn = this.authService.isLoggedIn();
            this.isAdmin = ((user === null || user === void 0 ? void 0 : user.role) || '').toLowerCase() === 'admin';
            this.userName = (user === null || user === void 0 ? void 0 : user.name) || (user === null || user === void 0 ? void 0 : user.email) || 'User';
        });
    }
    toggleMenu() {
        this.menuOpen = !this.menuOpen;
        if (!this.menuOpen) {
            this.closeUserMenu();
        }
    }
    closeMenu() {
        this.menuOpen = false;
        this.closeUserMenu();
    }
    toggleUserMenu(event) {
        event === null || event === void 0 ? void 0 : event.stopPropagation();
        this.userMenuOpen = !this.userMenuOpen;
        if (!this.userMenuOpen) {
            this.adminMenuOpen = false;
        }
    }
    closeUserMenu() {
        this.userMenuOpen = false;
        this.adminMenuOpen = false;
    }
    toggleAdminMenu(event) {
        event === null || event === void 0 ? void 0 : event.stopPropagation();
        this.adminMenuOpen = !this.adminMenuOpen;
    }
    get truncatedUserName() {
        if (this.userName.length > 8) {
            return this.userName.substring(0, 5) + '...';
        }
        return this.userName;
    }
    logout() {
        this.closeMenu();
        this.authService.logout();
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
HeaderComponent.ɵfac = function HeaderComponent_Factory(t) { return new (t || HeaderComponent)(i0.ɵɵdirectiveInject(i1.AuthService)); };
HeaderComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: HeaderComponent, selectors: [["app-header"]], decls: 26, vars: 5, consts: [[1, "navbar"], [1, "container", "navbar-wrapper"], [1, "navbar-logo"], ["routerLink", "/", "src", "assets/logos/logo.png", "alt", "QLSS Logo", 2, "cursor", "pointer", 3, "click"], [1, ""], [1, "navbar-menu"], [1, "navbar-menu__header"], ["src", "assets/logos/logo.png", "alt", "QLSS Logo"], ["routerLink", "/training", "routerLinkActive", "active-link", 3, "click"], ["routerLink", "/expertise", "routerLinkActive", "active-link", 3, "click"], ["routerLink", "/about", "routerLinkActive", "active-link", 3, "click"], ["routerLink", "/teams", "routerLinkActive", "active-link", 3, "click"], ["routerLink", "/contact", "routerLinkActive", "active-link", 3, "click"], ["class", "navbar-account", 4, "ngIf"], [1, "navbar-right"], ["routerLink", "/verify", "routerLinkActive", "active-link", 1, "btn", "btn-primary", "navbar-btn", "vrfbtn", 3, "click"], ["type", "button", "aria-label", "Toggle navigation", 1, "navbar-toggle", 3, "click"], [1, "navbar-account"], ["class", "account-nav-item account-nav-item--admin", 3, "account-nav-item--open", "mouseenter", "mouseleave", 4, "ngIf"], [1, "account-nav-item", 3, "mouseenter", "mouseleave"], ["href", "javascript:void(0)", 1, "account-nav-item__link", 3, "click"], [1, "fas", "fa-user-circle", "account-nav-item__icon"], [1, "account-nav-item__caret"], [1, "account-nav-item__dropdown"], ["routerLink", "/profile", "routerLinkActive", "active-link", 3, "click"], [1, "fas", "fa-user"], ["routerLink", "/change-password", "routerLinkActive", "active-link", 3, "click"], [1, "fas", "fa-lock"], ["routerLink", "/login", "routerLinkActive", "active-link", 3, "click"], [1, "fas", "fa-sign-out-alt"], [1, "account-nav-item", "account-nav-item--admin", 3, "mouseenter", "mouseleave"], ["href", "javascript:void(0)", 1, "account-nav-item__link", "account-nav-item__link--secondary", 3, "click"], [1, "account-nav-item__dropdown", "account-nav-item__dropdown--admin"], ["routerLink", "/admin/trainings", "routerLinkActive", "active-link", 3, "click"], [1, "fas", "fa-book"], ["routerLink", "/admin/trainer", "routerLinkActive", "active-link", 3, "click"], [1, "fas", "fa-chalkboard-teacher"], ["routerLink", "/admin/clients", "routerLinkActive", "active-link", 3, "click"], [1, "fa-solid", "fa-building-columns"], ["routerLink", "/admin/create-test", "routerLinkActive", "active-link", 3, "click"], [1, "fas", "fa-flask"], ["routerLink", "/admin/create-test-questions", "routerLinkActive", "active-link", 3, "click"], [1, "fas", "fa-list-check"], ["routerLink", "/admin/create-question", "routerLinkActive", "active-link", 3, "click"], [1, "fas", "fa-question-circle"], ["routerLink", "/admin/print-certificate", "routerLinkActive", "active-link", 3, "click"], [1, "fas", "fa-certificate"], ["routerLink", "/admin/approve-certificate", "routerLinkActive", "active-link", 3, "click"], [1, "fas", "fa-circle-check"], ["routerLink", "/test/result", "routerLinkActive", "active-link", 3, "click"], [1, "fas", "fa-chart-line"]], template: function HeaderComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "header", 0)(1, "div", 1)(2, "div", 2)(3, "img", 3);
        i0.ɵɵlistener("click", function HeaderComponent_Template_img_click_3_listener() { return ctx.closeMenu(); });
        i0.ɵɵelementEnd()();
        i0.ɵɵelementStart(4, "nav", 4)(5, "div", 5)(6, "div", 6);
        i0.ɵɵelement(7, "img", 7);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(8, "a", 8);
        i0.ɵɵlistener("click", function HeaderComponent_Template_a_click_8_listener() { return ctx.closeMenu(); });
        i0.ɵɵtext(9, "Training");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(10, "a", 9);
        i0.ɵɵlistener("click", function HeaderComponent_Template_a_click_10_listener() { return ctx.closeMenu(); });
        i0.ɵɵtext(11, "Expertise");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(12, "a", 10);
        i0.ɵɵlistener("click", function HeaderComponent_Template_a_click_12_listener() { return ctx.closeMenu(); });
        i0.ɵɵtext(13, "About Us");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(14, "a", 11);
        i0.ɵɵlistener("click", function HeaderComponent_Template_a_click_14_listener() { return ctx.closeMenu(); });
        i0.ɵɵtext(15, "Our Team");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(16, "a", 12);
        i0.ɵɵlistener("click", function HeaderComponent_Template_a_click_16_listener() { return ctx.closeMenu(); });
        i0.ɵɵtext(17, "Contact");
        i0.ɵɵelementEnd();
        i0.ɵɵtemplate(18, HeaderComponent_div_18_Template, 19, 4, "div", 13);
        i0.ɵɵelementEnd()();
        i0.ɵɵelementStart(19, "div", 14)(20, "a", 15);
        i0.ɵɵlistener("click", function HeaderComponent_Template_a_click_20_listener() { return ctx.closeMenu(); });
        i0.ɵɵtext(21, " Verify Certificate ");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(22, "button", 16);
        i0.ɵɵlistener("click", function HeaderComponent_Template_button_click_22_listener() { return ctx.toggleMenu(); });
        i0.ɵɵelement(23, "span")(24, "span")(25, "span");
        i0.ɵɵelementEnd()()()();
    } if (rf & 2) {
        i0.ɵɵadvance(5);
        i0.ɵɵclassProp("active", ctx.menuOpen);
        i0.ɵɵadvance(13);
        i0.ɵɵproperty("ngIf", ctx.isLoggedIn);
        i0.ɵɵadvance(4);
        i0.ɵɵclassProp("active", ctx.menuOpen);
    } }, dependencies: [i2.NgIf, i3.RouterLink, i3.RouterLinkWithHref, i3.RouterLinkActive], styles: [".navbar-right[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  align-items: center;\r\n  gap: 0.85rem;\r\n}\r\n\r\n.navbar-account[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  align-items: center;\r\n  gap: 0;\r\n  margin-left: 0;\r\n}\r\n\r\n.account-nav-item[_ngcontent-%COMP%] {\r\n  position: relative;\r\n}\r\n\r\n.account-nav-item__link[_ngcontent-%COMP%] {\r\n  color: #000;\r\n  text-decoration: none;\r\n  font-size: 18px;\r\n  font-weight: 600;\r\n  display: inline-flex;\r\n  align-items: center;\r\n  gap: 0.4rem;\r\n  padding: 3px 8px;\r\n  border-radius: 10px;\r\n  position: relative;\r\n  transition: color 0.3s ease, transform 0.2s ease;\r\n  cursor: pointer;\r\n}\r\n\r\n.account-nav-item__link[_ngcontent-%COMP%]:hover, .account-nav-item__link[_ngcontent-%COMP%]:focus-visible {\r\n  color: rgb(54, 126, 227);\r\n  transform: translateY(-1px);\r\n}\r\n\r\n.account-nav-item__link--secondary[_ngcontent-%COMP%] {\r\n  color: #000;\r\n}\r\n\r\n.account-nav-item__caret[_ngcontent-%COMP%] {\r\n  font-size: 0.8rem;\r\n  transition: transform 0.2s ease;\r\n}\r\n\r\n.account-nav-item__icon[_ngcontent-%COMP%] {\r\n  font-size: 16px;\r\n  display: inline-block;\r\n}\r\n\r\n.account-nav-item__dropdown[_ngcontent-%COMP%] {\r\n  position: absolute;\r\n  top: calc(100% + 0.7rem);\r\n  left: 0;\r\n  min-width: 220px;\r\n  padding: 0.7rem 0;\r\n  border-radius: 16px;\r\n  background: #ffffff;\r\n  border: 1px solid rgba(15, 111, 178, 0.12);\r\n  box-shadow: 0 16px 40px rgba(10, 30, 60, 0.16);\r\n  opacity: 0;\r\n  visibility: hidden;\r\n  transform: translateY(8px);\r\n  transition: all 0.2s ease;\r\n  z-index: 1100;\r\n}\r\n\r\n.account-nav-item[_ngcontent-%COMP%]:hover   .account-nav-item__dropdown[_ngcontent-%COMP%], .account-nav-item--open[_ngcontent-%COMP%]   .account-nav-item__dropdown[_ngcontent-%COMP%] {\r\n  opacity: 1;\r\n  visibility: visible;\r\n  transform: translateY(0);\r\n}\r\n\r\n.account-nav-item__dropdown[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\r\n  display: block;\r\n  width: 100%;\r\n  padding: 0.8rem 1rem;\r\n  color: #1f2937;\r\n  text-decoration: none;\r\n  font-size: 0.95rem;\r\n  font-weight: 600;\r\n  transition: background-color 0.2s ease, color 0.2s ease;\r\n}\r\n\r\n.account-nav-item__dropdown[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\r\n  margin-right: 0.6rem;\r\n  display: inline-block;\r\n  width: 18px;\r\n}\r\n\r\n.account-nav-item__dropdown[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover {\r\n  background: #f4f8fd;\r\n  color: #0f6fb2;\r\n}\r\n\r\n.account-nav-item--open[_ngcontent-%COMP%]   .account-nav-item__caret[_ngcontent-%COMP%] {\r\n  transform: rotate(180deg);\r\n}\r\n\r\n@media (max-width: 991px) {\r\n  .navbar-right[_ngcontent-%COMP%] {\r\n    gap: 0.6rem;\r\n  }\r\n\r\n  .navbar-account[_ngcontent-%COMP%] {\r\n    flex-direction: column;\r\n    align-items: flex-start;\r\n    width: 100%;\r\n    margin-left: 0;\r\n    margin-top: 0.4rem;\r\n  }\r\n\r\n  .account-nav-item[_ngcontent-%COMP%] {\r\n    width: 100%;\r\n  }\r\n\r\n  .account-nav-item__link[_ngcontent-%COMP%] {\r\n    width: 100%;\r\n    justify-content: space-between;\r\n    padding: 0.75rem 0.2rem;\r\n  }\r\n\r\n  .account-nav-item__dropdown[_ngcontent-%COMP%] {\r\n    position: static;\r\n    margin-top: 0.35rem;\r\n    opacity: 1;\r\n    visibility: visible;\r\n    transform: none;\r\n    box-shadow: none;\r\n    border: 0;\r\n    background: transparent;\r\n    display: none;\r\n    padding: 0.2rem 0 0 0.4rem;\r\n  }\r\n\r\n  .account-nav-item[_ngcontent-%COMP%]:hover   .account-nav-item__dropdown[_ngcontent-%COMP%], .account-nav-item--open[_ngcontent-%COMP%]   .account-nav-item__dropdown[_ngcontent-%COMP%] {\r\n    display: block;\r\n  }\r\n\r\n  .account-nav-item__dropdown[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\r\n    padding: 0.7rem 0.85rem;\r\n    color: #1f2937;\r\n  }\r\n}"] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(HeaderComponent, [{
        type: Component,
        args: [{ selector: 'app-header', template: "<header class=\"navbar\">\n  <div class=\"container navbar-wrapper\">\n    <!-- LEFT: Logo -->\n    <div class=\"navbar-logo\">\n      <img (click)=\"closeMenu()\" routerLink=\"/\" style=\"cursor: pointer;\" src=\"assets/logos/logo.png\" alt=\"QLSS Logo\" />\n    </div>\n\n    <!-- CENTER: Nav links -->\n    <nav class=\"\">\n      <div class=\"navbar-menu\" [class.active]=\"menuOpen\">\n        <!-- Mobile-only header inside fullscreen menu -->\n        <div class=\"navbar-menu__header\">\n          <img src=\"assets/logos/logo.png\" alt=\"QLSS Logo\" />\n          <!-- <span>Business Consulting</span> -->\n        </div>\n\n        <!-- <a (click)=\"closeMenu()\" routerLink=\"/\">Home</a> -->\n        <a (click)=\"closeMenu()\" routerLink=\"/training\" routerLinkActive=\"active-link\">Training</a>\n        <a (click)=\"closeMenu()\" routerLink=\"/expertise\" routerLinkActive=\"active-link\">Expertise</a>\n        <a (click)=\"closeMenu()\" routerLink=\"/about\" routerLinkActive=\"active-link\">About Us</a>\n        <a (click)=\"closeMenu()\" routerLink=\"/teams\" routerLinkActive=\"active-link\">Our Team</a>\n        <a (click)=\"closeMenu()\" routerLink=\"/contact\" routerLinkActive=\"active-link\">Contact</a>\n        <!-- <a (click)=\"closeMenu()\" routerLink=\"/login\" routerLink=\"/contact\">Login</a> -->\n\n        <div *ngIf=\"isLoggedIn\" class=\"navbar-account\">          \n\n          <div *ngIf=\"isAdmin\" class=\"account-nav-item account-nav-item--admin\" [class.account-nav-item--open]=\"adminMenuOpen\" (mouseenter)=\"adminMenuOpen = true\" (mouseleave)=\"adminMenuOpen = false\">\n            <a class=\"account-nav-item__link account-nav-item__link--secondary\" (click)=\"toggleAdminMenu($event)\" href=\"javascript:void(0)\">\n              <span>Admin</span>\n              <span class=\"account-nav-item__caret\">\u25BE</span>\n            </a>\n            <div class=\"account-nav-item__dropdown account-nav-item__dropdown--admin\">\n              <a (click)=\"closeMenu()\" routerLink=\"/admin/trainings\" routerLinkActive=\"active-link\"><i class=\"fas fa-book\"></i> Trainings</a>\n              <a (click)=\"closeMenu()\" routerLink=\"/admin/trainer\" routerLinkActive=\"active-link\"><i class=\"fas fa-chalkboard-teacher\"></i> Trainer</a>\n              <a (click)=\"closeMenu()\" routerLink=\"/admin/clients\" routerLinkActive=\"active-link\"><i class=\"fa-solid fa-building-columns\"></i> Company</a>\n              <a (click)=\"closeMenu()\" routerLink=\"/admin/create-test\" routerLinkActive=\"active-link\"><i class=\"fas fa-flask\"></i> Test</a>\n              <a (click)=\"closeMenu()\" routerLink=\"/admin/create-test-questions\" routerLinkActive=\"active-link\"><i class=\"fas fa-list-check\"></i> Test Questions</a>\n              <a (click)=\"closeMenu()\" routerLink=\"/admin/create-question\" routerLinkActive=\"active-link\"><i class=\"fas fa-question-circle\"></i> Question</a>\n              <a (click)=\"closeMenu()\" routerLink=\"/admin/print-certificate\" routerLinkActive=\"active-link\"><i class=\"fas fa-certificate\"></i> Print Certificate</a>\n              <a (click)=\"closeMenu()\" routerLink=\"/admin/approve-certificate\" routerLinkActive=\"active-link\"><i class=\"fas fa-circle-check\"></i> Approve Certificates</a>\n              <a (click)=\"closeMenu()\" routerLink=\"/test/result\" routerLinkActive=\"active-link\"><i class=\"fas fa-chart-line\"></i> Result</a>\n              <!-- <a (click)=\"closeMenu()\" routerLink=\"/admin/linkedin-posts\" routerLinkActive=\"active-link\">LinkedIn Posts</a>\n              <a (click)=\"closeMenu()\" routerLink=\"/admin/linkedin-comments\" routerLinkActive=\"active-link\">LinkedIn Comments</a> -->\n            </div>\n          </div>\n          <div class=\"account-nav-item\" [class.account-nav-item--open]=\"userMenuOpen\" (mouseenter)=\"userMenuOpen = true\" (mouseleave)=\"closeUserMenu()\">\n            <a class=\"account-nav-item__link\" (click)=\"toggleUserMenu($event)\" href=\"javascript:void(0)\">\n              <i class=\"fas fa-user-circle account-nav-item__icon\"></i>\n              <span>{{ truncatedUserName }}</span>\n              <span class=\"account-nav-item__caret\">\u25BE</span>\n            </a>\n\n            <div class=\"account-nav-item__dropdown\">\n              <a (click)=\"closeMenu()\" routerLink=\"/profile\" routerLinkActive=\"active-link\"><i class=\"fas fa-user\"></i> Profile</a>\n              <a (click)=\"closeMenu()\" routerLink=\"/change-password\" routerLinkActive=\"active-link\"><i class=\"fas fa-lock\"></i> Change Password</a>\n              <a (click)=\"logout()\" routerLink=\"/login\" routerLinkActive=\"active-link\"><i class=\"fas fa-sign-out-alt\"></i> Logout</a>\n            </div>\n          </div>\n        </div>\n\n        <!-- Mobile-only CTA\n        <a (click)=\"closeMenu()\" routerLink=\"/verify\" class=\"navbar-menu__cta\"\n          >Verify Certificate</a\n        > -->\n      </div>\n    </nav>\n\n    <!-- RIGHT: Button + Hamburger -->\n    <div class=\"navbar-right\">\n      <a (click)=\"closeMenu()\" routerLink=\"/verify\" routerLinkActive=\"active-link\" class=\"btn btn-primary navbar-btn vrfbtn\">\n        Verify Certificate\n      </a>\n\n      <button type=\"button\" class=\"navbar-toggle\" [class.active]=\"menuOpen\" (click)=\"toggleMenu()\" aria-label=\"Toggle navigation\">\n        <span></span>\n        <span></span>\n        <span></span>\n      </button>\n    </div>\n  </div>\n</header>\n\n\n", styles: [".navbar-right {\r\n  display: flex;\r\n  align-items: center;\r\n  gap: 0.85rem;\r\n}\r\n\r\n.navbar-account {\r\n  display: flex;\r\n  align-items: center;\r\n  gap: 0;\r\n  margin-left: 0;\r\n}\r\n\r\n.account-nav-item {\r\n  position: relative;\r\n}\r\n\r\n.account-nav-item__link {\r\n  color: #000;\r\n  text-decoration: none;\r\n  font-size: 18px;\r\n  font-weight: 600;\r\n  display: inline-flex;\r\n  align-items: center;\r\n  gap: 0.4rem;\r\n  padding: 3px 8px;\r\n  border-radius: 10px;\r\n  position: relative;\r\n  transition: color 0.3s ease, transform 0.2s ease;\r\n  cursor: pointer;\r\n}\r\n\r\n.account-nav-item__link:hover,\r\n.account-nav-item__link:focus-visible {\r\n  color: rgb(54, 126, 227);\r\n  transform: translateY(-1px);\r\n}\r\n\r\n.account-nav-item__link--secondary {\r\n  color: #000;\r\n}\r\n\r\n.account-nav-item__caret {\r\n  font-size: 0.8rem;\r\n  transition: transform 0.2s ease;\r\n}\r\n\r\n.account-nav-item__icon {\r\n  font-size: 16px;\r\n  display: inline-block;\r\n}\r\n\r\n.account-nav-item__dropdown {\r\n  position: absolute;\r\n  top: calc(100% + 0.7rem);\r\n  left: 0;\r\n  min-width: 220px;\r\n  padding: 0.7rem 0;\r\n  border-radius: 16px;\r\n  background: #ffffff;\r\n  border: 1px solid rgba(15, 111, 178, 0.12);\r\n  box-shadow: 0 16px 40px rgba(10, 30, 60, 0.16);\r\n  opacity: 0;\r\n  visibility: hidden;\r\n  transform: translateY(8px);\r\n  transition: all 0.2s ease;\r\n  z-index: 1100;\r\n}\r\n\r\n.account-nav-item:hover .account-nav-item__dropdown,\r\n.account-nav-item--open .account-nav-item__dropdown {\r\n  opacity: 1;\r\n  visibility: visible;\r\n  transform: translateY(0);\r\n}\r\n\r\n.account-nav-item__dropdown a {\r\n  display: block;\r\n  width: 100%;\r\n  padding: 0.8rem 1rem;\r\n  color: #1f2937;\r\n  text-decoration: none;\r\n  font-size: 0.95rem;\r\n  font-weight: 600;\r\n  transition: background-color 0.2s ease, color 0.2s ease;\r\n}\r\n\r\n.account-nav-item__dropdown a i {\r\n  margin-right: 0.6rem;\r\n  display: inline-block;\r\n  width: 18px;\r\n}\r\n\r\n.account-nav-item__dropdown a:hover {\r\n  background: #f4f8fd;\r\n  color: #0f6fb2;\r\n}\r\n\r\n.account-nav-item--open .account-nav-item__caret {\r\n  transform: rotate(180deg);\r\n}\r\n\r\n@media (max-width: 991px) {\r\n  .navbar-right {\r\n    gap: 0.6rem;\r\n  }\r\n\r\n  .navbar-account {\r\n    flex-direction: column;\r\n    align-items: flex-start;\r\n    width: 100%;\r\n    margin-left: 0;\r\n    margin-top: 0.4rem;\r\n  }\r\n\r\n  .account-nav-item {\r\n    width: 100%;\r\n  }\r\n\r\n  .account-nav-item__link {\r\n    width: 100%;\r\n    justify-content: space-between;\r\n    padding: 0.75rem 0.2rem;\r\n  }\r\n\r\n  .account-nav-item__dropdown {\r\n    position: static;\r\n    margin-top: 0.35rem;\r\n    opacity: 1;\r\n    visibility: visible;\r\n    transform: none;\r\n    box-shadow: none;\r\n    border: 0;\r\n    background: transparent;\r\n    display: none;\r\n    padding: 0.2rem 0 0 0.4rem;\r\n  }\r\n\r\n  .account-nav-item:hover .account-nav-item__dropdown,\r\n  .account-nav-item--open .account-nav-item__dropdown {\r\n    display: block;\r\n  }\r\n\r\n  .account-nav-item__dropdown a {\r\n    padding: 0.7rem 0.85rem;\r\n    color: #1f2937;\r\n  }\r\n}\r\n"] }]
    }], function () { return [{ type: i1.AuthService }]; }, null); })();
//# sourceMappingURL=header.component.js.map