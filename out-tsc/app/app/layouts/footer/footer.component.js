import { Component } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/router";
export class FooterComponent {
    constructor() {
        this.currentYear = new Date().getFullYear();
    }
}
FooterComponent.ɵfac = function FooterComponent_Factory(t) { return new (t || FooterComponent)(); };
FooterComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: FooterComponent, selectors: [["app-footer"]], decls: 68, vars: 1, consts: [["role", "contentinfo", 1, "qlss-footer"], [1, "f-inner"], [1, "f-brand"], ["routerLink", "/", "aria-label", "QLSS Business Consulting  Home", 1, "f-logo"], ["src", "assets/logos/logo.png", "alt", "QLSS Business Consulting", 1, "flogo"], [1, "f-office-lbl"], [1, "f-office-addr"], [1, "f-nav-wrapper"], [1, "f-nav-col"], [1, "f-col-hd"], ["aria-label", "Main navigation links", 1, "f-nav"], ["routerLink", "/"], ["routerLink", "/about"], ["routerLink", "/expertise"], ["routerLink", "/training"], ["routerLink", "/contact"], ["aria-label", "Quick navigation links", 1, "f-nav"], ["routerLink", "/client"], ["routerLink", "/faq"], ["routerLink", "/teams"], ["routerLink", "/verify"], [1, "f-contact-col"], [1, "f-contact-list"], [1, "f-ci"], ["aria-hidden", "true", 1, "f-ci-ico"], [1, "fa-regular", "fa-envelope"], [1, "f-ci-text"], ["href", "mailto:sales@qlssconsulting.com"], [1, "fa-solid", "fa-phone"], ["href", "tel:+918180955888"], ["aria-label", "Social media links", 1, "f-socials-col"], ["href", "https://www.facebook.com/qlssbusinessconsulting/", "target", "_blank", "rel", "noopener noreferrer", "aria-label", "Facebook", 1, "f-soc", "f-soc--fb"], [1, "fa-brands", "fa-facebook-f"], ["href", "https://www.linkedin.com/company/qlss-business-consulting/about/?viewAsMember=true", "target", "_blank", "rel", "noopener noreferrer", "aria-label", "LinkedIn", 1, "f-soc", "f-soc--li"], [1, "fa-brands", "fa-linkedin-in"], ["href", "https://www.instagram.com/qlss_business_consulting/", "target", "_blank", "rel", "noopener noreferrer", "aria-label", "Instagram", 1, "f-soc", "f-soc--ig"], [1, "fa-brands", "fa-instagram"], [1, "f-bottom"], [1, "f-yr"]], template: function FooterComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "footer", 0)(1, "div", 1)(2, "div", 2)(3, "a", 3);
        i0.ɵɵelement(4, "img", 4);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(5, "p", 5);
        i0.ɵɵtext(6, "Office :");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(7, "p", 6);
        i0.ɵɵtext(8, " 01, Navchaitanya Mitra Mandal Chowk,");
        i0.ɵɵelement(9, "br");
        i0.ɵɵtext(10, " Near Hadapsar Police Station, Hadapsar,");
        i0.ɵɵelement(11, "br");
        i0.ɵɵtext(12, " Pune 411028 ");
        i0.ɵɵelementEnd()();
        i0.ɵɵelementStart(13, "div", 7)(14, "div", 8)(15, "h3", 9);
        i0.ɵɵtext(16, "Main Links");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(17, "nav", 10)(18, "a", 11);
        i0.ɵɵtext(19, "Home");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(20, "a", 12);
        i0.ɵɵtext(21, "About Us");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(22, "a", 13);
        i0.ɵɵtext(23, "Our Expertise");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(24, "a", 14);
        i0.ɵɵtext(25, "Training");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(26, "a", 15);
        i0.ɵɵtext(27, "Contact Us");
        i0.ɵɵelementEnd()()();
        i0.ɵɵelementStart(28, "div", 8)(29, "h3", 9);
        i0.ɵɵtext(30, "Quick Links");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(31, "nav", 16)(32, "a", 17);
        i0.ɵɵtext(33, "Our Clients");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(34, "a", 18);
        i0.ɵɵtext(35, "FAQ's");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(36, "a", 19);
        i0.ɵɵtext(37, "Our Team");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(38, "a", 20);
        i0.ɵɵtext(39, "Verify Certificate");
        i0.ɵɵelementEnd()()()();
        i0.ɵɵelementStart(40, "div", 21)(41, "h3", 9);
        i0.ɵɵtext(42, "Get in Touch");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(43, "ul", 22)(44, "li", 23)(45, "span", 24);
        i0.ɵɵelement(46, "i", 25);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(47, "span", 26)(48, "a", 27);
        i0.ɵɵtext(49, "sales@qlssconsulting.com");
        i0.ɵɵelementEnd()()();
        i0.ɵɵelementStart(50, "li", 23)(51, "span", 24);
        i0.ɵɵelement(52, "i", 28);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(53, "span", 26)(54, "a", 29);
        i0.ɵɵtext(55, "+91 8180955888 / +91 7058954942");
        i0.ɵɵelementEnd()()()();
        i0.ɵɵelementStart(56, "div", 30)(57, "a", 31);
        i0.ɵɵelement(58, "i", 32);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(59, "a", 33);
        i0.ɵɵelement(60, "i", 34);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(61, "a", 35);
        i0.ɵɵelement(62, "i", 36);
        i0.ɵɵelementEnd()()()();
        i0.ɵɵelementStart(63, "div", 37)(64, "p");
        i0.ɵɵtext(65, "ALL RIGHTS RESERVED \u00A9 QLSS ");
        i0.ɵɵelementStart(66, "span", 38);
        i0.ɵɵtext(67);
        i0.ɵɵelementEnd()()()();
    } if (rf & 2) {
        i0.ɵɵadvance(67);
        i0.ɵɵtextInterpolate(ctx.currentYear);
    } }, dependencies: [i1.RouterLinkWithHref] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(FooterComponent, [{
        type: Component,
        args: [{ selector: 'app-footer', template: "<!-- =========================================================\r\n     QLSS FOOTER  |  /components/footer.html\r\n     Loaded via: fetch('/components/footer.html')\r\n     Styles live in: scss/layout/_footer.scss\r\n     NOTE: NO script tags here  they break innerHTML parsing.\r\n     Year auto-fill is handled by main.js after injection.\r\n========================================================== -->\r\n\r\n<footer class=\"qlss-footer\" role=\"contentinfo\">\r\n  <div class=\"f-inner\">\r\n    <!-- COL 1  BRAND -->\r\n    <div class=\"f-brand\">\r\n      <a routerLink=\"/\" class=\"f-logo\" aria-label=\"QLSS Business Consulting  Home\">\r\n        <img src=\"assets/logos/logo.png\" class=\"flogo\" alt=\"QLSS Business Consulting\" />\r\n      </a>\r\n      <p class=\"f-office-lbl\">Office :</p>\r\n      <p class=\"f-office-addr\">\r\n        01, Navchaitanya Mitra Mandal Chowk,<br />\r\n        Near Hadapsar Police Station, Hadapsar,<br />\r\n        Pune  411028\r\n      </p>\r\n    </div>\r\n\r\n    <!-- COL 2 & 3  NAV WRAPPER -->\r\n    <div class=\"f-nav-wrapper\">\r\n      <div class=\"f-nav-col\">\r\n        <h3 class=\"f-col-hd\">Main Links</h3>\r\n        <nav class=\"f-nav\" aria-label=\"Main navigation links\">\r\n          <a routerLink=\"/\">Home</a>\r\n          <a routerLink=\"/about\">About Us</a>\r\n          <a routerLink=\"/expertise\">Our Expertise</a>\r\n          <a routerLink=\"/training\">Training</a>\r\n          <a routerLink=\"/contact\">Contact Us</a>\r\n        </nav>\r\n      </div>\r\n      <div class=\"f-nav-col\">\r\n        <h3 class=\"f-col-hd\">Quick Links</h3>\r\n        <nav class=\"f-nav\" aria-label=\"Quick navigation links\">\r\n          <a routerLink=\"/client\">Our Clients</a>\r\n          <a routerLink=\"/faq\">FAQ's</a>\r\n          <!-- <a routerLink=\"/blogs\">Blogs</a> -->\r\n          <a routerLink=\"/teams\">Our Team</a>\r\n          <a routerLink=\"/verify\">Verify Certificate</a>\r\n        </nav>\r\n      </div>\r\n    </div>\r\n\r\n    <!-- COL 4  GET IN TOUCH + SOCIALS -->\r\n    <div class=\"f-contact-col\">\r\n      <h3 class=\"f-col-hd\">Get in Touch</h3>\r\n      <ul class=\"f-contact-list\">\r\n        <li class=\"f-ci\">\r\n          <span class=\"f-ci-ico\" aria-hidden=\"true\">\r\n            <i class=\"fa-regular fa-envelope\"></i>\r\n          </span>\r\n          <span class=\"f-ci-text\">\r\n            <a href=\"mailto:sales@qlssconsulting.com\">sales@qlssconsulting.com</a>\r\n          </span>\r\n        </li>\r\n        <li class=\"f-ci\">\r\n          <span class=\"f-ci-ico\" aria-hidden=\"true\">\r\n            <i class=\"fa-solid fa-phone\"></i>\r\n          </span>\r\n          <span class=\"f-ci-text\">\r\n            <a href=\"tel:+918180955888\">+91 8180955888 / +91 7058954942</a>\r\n          </span>\r\n        </li>\r\n      </ul>\r\n\r\n      <div class=\"f-socials-col\" aria-label=\"Social media links\">\r\n        <a href=\"https://www.facebook.com/qlssbusinessconsulting/\" target=\"_blank\" rel=\"noopener noreferrer\" class=\"f-soc f-soc--fb\" aria-label=\"Facebook\">\r\n          <i class=\"fa-brands fa-facebook-f\"></i>\r\n        </a>\r\n        <a href=\"https://www.linkedin.com/company/qlss-business-consulting/about/?viewAsMember=true\" target=\"_blank\" rel=\"noopener noreferrer\" class=\"f-soc f-soc--li\" aria-label=\"LinkedIn\">\r\n          <i class=\"fa-brands fa-linkedin-in\"></i>\r\n        </a>\r\n        <a href=\"https://www.instagram.com/qlss_business_consulting/\" target=\"_blank\" rel=\"noopener noreferrer\" class=\"f-soc f-soc--ig\" aria-label=\"Instagram\">\r\n          <i class=\"fa-brands fa-instagram\"></i>\r\n        </a>\r\n      </div>\r\n    </div>\r\n    <!-- /f-contact-col -->\r\n  </div>\r\n  <!-- /f-inner -->\r\n\r\n  <!-- \r\n       BOTTOM BAR\r\n   -->\r\n  <div class=\"f-bottom\">\r\n    <p>ALL RIGHTS RESERVED &copy; QLSS <span class=\"f-yr\">{{ currentYear }}</span></p>\r\n  </div>\r\n</footer>" }]
    }], null, null); })();
//# sourceMappingURL=footer.component.js.map