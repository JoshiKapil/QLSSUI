import { __awaiter } from "tslib";
import { Component } from '@angular/core';
import emailjs from '@emailjs/browser';
import * as i0 from "@angular/core";
import * as i1 from "../../core/services/site-interactions.service";
import * as i2 from "@angular/platform-browser";
import * as i3 from "../../core/services/notifier.service";
import * as i4 from "@angular/forms";
export class ContactComponent {
    constructor(interactions, title, meta, notifierService) {
        this.interactions = interactions;
        this.title = title;
        this.meta = meta;
        this.notifierService = notifierService;
        this.name = '';
        this.email = '';
        this.mobile = '';
        this.messages = '';
        this.SERVICE_ID = 'service_duh8g6f';
        this.TEMPLATE_ID = 'template_b8pcczp';
        this.PUBLIC_KEY = 'ZT9MYx-Gi_6z-chnr';
        this.title.setTitle('Contact - QLSS Consulting');
        this.meta.updateTag({
            name: 'description',
            content: 'QLSS Business Consulting services, training, operational excellence and business transformation.'
        });
    }
    ngAfterViewInit() {
        this.interactions.initPage();
    }
    sendToMe() {
        return __awaiter(this, void 0, void 0, function* () {
            const templateParams = {
                from_name: this.name,
                user_email: this.email,
                phone_number: this.mobile,
                subject_line: `New contact request from ${this.name}`,
            };
            try {
                const response = yield emailjs.send(this.SERVICE_ID, this.TEMPLATE_ID, templateParams, this.PUBLIC_KEY);
                this.notifierService.successToastr('Message sent successfully!');
                this.name = '';
                this.email = '';
                this.mobile = '';
                this.messages = '';
                //this.contactForm.reset();
            }
            catch (err) {
                this.notifierService.warningToastr('Failed to send message. Please try again.');
            }
        });
    }
}
ContactComponent.ɵfac = function ContactComponent_Factory(t) { return new (t || ContactComponent)(i0.ɵɵdirectiveInject(i1.SiteInteractionsService), i0.ɵɵdirectiveInject(i2.Title), i0.ɵɵdirectiveInject(i2.Meta), i0.ɵɵdirectiveInject(i3.NotifierService)); };
ContactComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: ContactComponent, selectors: [["app-contact"]], decls: 130, vars: 4, consts: [[1, "contact-hero"], [1, "hero-blob", "hero-blob--tl"], [1, "hero-blob", "hero-blob--br"], [1, "container"], [1, "contact-hero__inner", "reveal"], [1, "contact-hero__title"], [1, "highlight"], [1, "contact-hero__sub"], [1, "contact-strip"], [1, "contact-strip__grid"], [1, "strip-card", "reveal", "reveal-delay-1"], [1, "strip-card__icon"], [1, "fa-solid", "fa-phone"], [1, "strip-card__body"], ["href", "tel:+918180955888"], ["href", "tel:+917058954942"], [1, "strip-divider"], [1, "strip-card", "reveal", "reveal-delay-2"], [1, "fa-solid", "fa-envelope"], ["href", "mailto:sales@qlssconsulting.com"], [1, "strip-card", "reveal", "reveal-delay-3"], [1, "fa-solid", "fa-location-dot"], [1, "contact-main"], [1, "contact-main__grid"], [1, "contact-left", "reveal"], [1, "section-tag"], [1, "contact-main__title"], [1, "contact-left__desc"], [1, "contact-left__cards"], [1, "info-card"], [1, "info-card__icon"], [1, "fa-solid", "fa-building"], [1, "info-card__content"], [1, "fa-solid", "fa-globe"], [1, "contact-form-wrap", "reveal", "reveal-delay-1"], ["id", "contactForm", "novalidate", "", 1, "contact-form", 3, "ngSubmit"], ["contactForm", "ngForm"], [1, "form-group"], ["for", "fullName"], [1, "req"], ["type", "text", "id", "fullName", "name", "fullName", "required", "", "placeholder", "Enter full name", "required", "", 3, "ngModel", "ngModelChange"], [1, "form-row"], ["for", "mobile"], ["type", "tel", "id", "mobile", "name", "mobile", "required", "", "placeholder", "Ex: 8945488541", "required", "", 3, "ngModel", "ngModelChange"], ["for", "email"], ["type", "email", "id", "email", "name", "email", "required", "", "email", "", "placeholder", "dhawal@tech.com", "required", "", 3, "ngModel", "ngModelChange"], [1, "form-group", 2, "display", "none"], ["for", "solutions"], [1, "select-wrapper"], ["id", "solutions", "name", "solutions"], ["value", "", "disabled", "", "selected", ""], ["value", "financial"], ["value", "supply"], ["value", "sustainability"], ["value", "training"], ["value", "consulting"], [1, "fa-solid", "fa-chevron-down", "select-arrow"], ["for", "serviceType"], ["id", "serviceType", "name", "serviceType", "placeholder", "Write Short Description", "rows", "4", "required", "", 3, "ngModel", "ngModelChange"], ["id", "uploadZone", 1, "upload-zone"], ["type", "file", "id", "fileInput", "multiple", "", 1, "upload-input"], ["type", "submit", 1, "btn-send"], [1, "fa-solid", "fa-paper-plane"]], template: function ContactComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "section", 0);
        i0.ɵɵelement(1, "div", 1)(2, "div", 2);
        i0.ɵɵelementStart(3, "div", 3)(4, "div", 4)(5, "h1", 5);
        i0.ɵɵtext(6, " Get in Touch with us");
        i0.ɵɵelement(7, "br")(8, "span", 6);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(9, "p", 7);
        i0.ɵɵtext(10, " Reach out to QLSS Business Consulting for custom solutions, corporate services, promotional support, and professional consulting across Pune, Maharashtra, and India. ");
        i0.ɵɵelementEnd()()()();
        i0.ɵɵelementStart(11, "section", 8)(12, "div", 3)(13, "div", 9)(14, "div", 10)(15, "div", 11);
        i0.ɵɵelement(16, "i", 12);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(17, "div", 13)(18, "h4");
        i0.ɵɵtext(19, "CALL US AT");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(20, "a", 14);
        i0.ɵɵtext(21, "+91 8180955888");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(22, "a", 15);
        i0.ɵɵtext(23, "+91 7058954942");
        i0.ɵɵelementEnd()()();
        i0.ɵɵelement(24, "div", 16);
        i0.ɵɵelementStart(25, "div", 17)(26, "div", 11);
        i0.ɵɵelement(27, "i", 18);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(28, "div", 13)(29, "h4");
        i0.ɵɵtext(30, "EMAIL ADDRESS");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(31, "a", 19);
        i0.ɵɵtext(32, "sales@qlssconsulting.com");
        i0.ɵɵelementEnd()()();
        i0.ɵɵelement(33, "div", 16);
        i0.ɵɵelementStart(34, "div", 20)(35, "div", 11);
        i0.ɵɵelement(36, "i", 21);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(37, "div", 13)(38, "h4");
        i0.ɵɵtext(39, "OPENING HOURS");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(40, "p");
        i0.ɵɵtext(41, "Monday \u2013 Friday: 9 am \u2013 6 pm");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(42, "p");
        i0.ɵɵtext(43, "Saturday: 9 am \u2013 3 pm");
        i0.ɵɵelementEnd()()()()()();
        i0.ɵɵelementStart(44, "section", 22)(45, "div", 3)(46, "div", 23)(47, "div", 24)(48, "span", 25);
        i0.ɵɵtext(49, "Get in touch");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(50, "h2", 26);
        i0.ɵɵtext(51, " We\u2019d love to hear from you.");
        i0.ɵɵelement(52, "br");
        i0.ɵɵtext(53, "Send us a message! ");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(54, "p", 27);
        i0.ɵɵtext(55, " Whether you have a question about our consulting services, training programs, or anything else, our team is ready to answer all your questions. Fill out the form and we'll be in touch as soon as possible. ");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(56, "div", 28)(57, "div", 29)(58, "div", 30);
        i0.ɵɵelement(59, "i", 31);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(60, "div", 32)(61, "h4");
        i0.ɵɵtext(62, "Head Office");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(63, "p");
        i0.ɵɵtext(64, "QLSS Business Consulting,");
        i0.ɵɵelement(65, "br");
        i0.ɵɵtext(66, "Pune, Maharashtra, India");
        i0.ɵɵelementEnd()()();
        i0.ɵɵelementStart(67, "div", 29)(68, "div", 30);
        i0.ɵɵelement(69, "i", 33);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(70, "div", 32)(71, "h4");
        i0.ɵɵtext(72, "Global Reach");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(73, "p");
        i0.ɵɵtext(74, " Serving clients across India, China, USA, Hungary, Saudi Arabia & UAE. ");
        i0.ɵɵelementEnd()()()()();
        i0.ɵɵelementStart(75, "div", 34)(76, "form", 35, 36);
        i0.ɵɵlistener("ngSubmit", function ContactComponent_Template_form_ngSubmit_76_listener() { return ctx.sendToMe(); });
        i0.ɵɵelementStart(78, "div", 37)(79, "label", 38);
        i0.ɵɵtext(80, "Full Name ");
        i0.ɵɵelementStart(81, "span", 39);
        i0.ɵɵtext(82, "*");
        i0.ɵɵelementEnd()();
        i0.ɵɵelementStart(83, "input", 40);
        i0.ɵɵlistener("ngModelChange", function ContactComponent_Template_input_ngModelChange_83_listener($event) { return ctx.name = $event; });
        i0.ɵɵelementEnd()();
        i0.ɵɵelementStart(84, "div", 41)(85, "div", 37)(86, "label", 42);
        i0.ɵɵtext(87, "Mobile Number ");
        i0.ɵɵelementStart(88, "span", 39);
        i0.ɵɵtext(89, "*");
        i0.ɵɵelementEnd()();
        i0.ɵɵelementStart(90, "input", 43);
        i0.ɵɵlistener("ngModelChange", function ContactComponent_Template_input_ngModelChange_90_listener($event) { return ctx.mobile = $event; });
        i0.ɵɵelementEnd()();
        i0.ɵɵelementStart(91, "div", 37)(92, "label", 44);
        i0.ɵɵtext(93, "E-Mail Address ");
        i0.ɵɵelementStart(94, "span", 39);
        i0.ɵɵtext(95, "*");
        i0.ɵɵelementEnd()();
        i0.ɵɵelementStart(96, "input", 45);
        i0.ɵɵlistener("ngModelChange", function ContactComponent_Template_input_ngModelChange_96_listener($event) { return ctx.email = $event; });
        i0.ɵɵelementEnd()()();
        i0.ɵɵelementStart(97, "div", 46)(98, "label", 47);
        i0.ɵɵtext(99, "I am looking for solutions on\u2026");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(100, "div", 48)(101, "select", 49)(102, "option", 50);
        i0.ɵɵtext(103, "Select");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(104, "option", 51);
        i0.ɵɵtext(105, "Financial Services");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(106, "option", 52);
        i0.ɵɵtext(107, "Supply Chain");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(108, "option", 53);
        i0.ɵɵtext(109, "Sustainability");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(110, "option", 54);
        i0.ɵɵtext(111, "Training & Development");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(112, "option", 55);
        i0.ɵɵtext(113, "Business Consulting");
        i0.ɵɵelementEnd()();
        i0.ɵɵelement(114, "i", 56);
        i0.ɵɵelementEnd()();
        i0.ɵɵelementStart(115, "div", 37)(116, "label", 57);
        i0.ɵɵtext(117, "Service Type ");
        i0.ɵɵelementStart(118, "span", 39);
        i0.ɵɵtext(119, "*");
        i0.ɵɵelementEnd()();
        i0.ɵɵelementStart(120, "textarea", 58);
        i0.ɵɵlistener("ngModelChange", function ContactComponent_Template_textarea_ngModelChange_120_listener($event) { return ctx.messages = $event; });
        i0.ɵɵelementEnd()();
        i0.ɵɵelementStart(121, "div", 46)(122, "label");
        i0.ɵɵtext(123, "Upload file");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(124, "div", 59);
        i0.ɵɵelement(125, "input", 60);
        i0.ɵɵelementEnd()();
        i0.ɵɵelementStart(126, "button", 61)(127, "span");
        i0.ɵɵtext(128, "Send Message");
        i0.ɵɵelementEnd();
        i0.ɵɵelement(129, "i", 62);
        i0.ɵɵelementEnd()()()()()();
    } if (rf & 2) {
        i0.ɵɵadvance(83);
        i0.ɵɵproperty("ngModel", ctx.name);
        i0.ɵɵadvance(7);
        i0.ɵɵproperty("ngModel", ctx.mobile);
        i0.ɵɵadvance(6);
        i0.ɵɵproperty("ngModel", ctx.email);
        i0.ɵɵadvance(24);
        i0.ɵɵproperty("ngModel", ctx.messages);
    } }, dependencies: [i4.ɵNgNoValidate, i4.NgSelectOption, i4.ɵNgSelectMultipleOption, i4.DefaultValueAccessor, i4.NgControlStatus, i4.NgControlStatusGroup, i4.RequiredValidator, i4.EmailValidator, i4.NgModel, i4.NgForm] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ContactComponent, [{
        type: Component,
        args: [{ selector: 'app-contact', template: "<!-- NAVBAR -->\n\n    <!--  HERO  -->\n    <section class=\"contact-hero\">\n      <div class=\"hero-blob hero-blob--tl\"></div>\n      <div class=\"hero-blob hero-blob--br\"></div>\n      <div class=\"container\">\n        <div class=\"contact-hero__inner reveal\">\n          <h1 class=\"contact-hero__title\">\n            Get in Touch with us<br /><span class=\"highlight\"></span>\n          </h1>\n          <p class=\"contact-hero__sub\">\n            Reach out to QLSS Business Consulting for custom solutions,\n            corporate services, promotional support, and professional consulting\n            across Pune, Maharashtra, and India.\n          </p>\n        </div>\n      </div>\n    </section>\n\n    <!--  INFO STRIP  -->\n    <section class=\"contact-strip\">\n      <div class=\"container\">\n        <div class=\"contact-strip__grid\">\n          <div class=\"strip-card reveal reveal-delay-1\">\n            <div class=\"strip-card__icon\">\n              <i class=\"fa-solid fa-phone\"></i>\n            </div>\n            <div class=\"strip-card__body\">\n              <h4>CALL US AT</h4>\n              <a href=\"tel:+918180955888\">+91 8180955888</a>\n              <a href=\"tel:+917058954942\">+91 7058954942</a>\n            </div>\n          </div>\n\n          <div class=\"strip-divider\"></div>\n\n          <div class=\"strip-card reveal reveal-delay-2\">\n            <div class=\"strip-card__icon\">\n              <i class=\"fa-solid fa-envelope\"></i>\n            </div>\n            <div class=\"strip-card__body\">\n              <h4>EMAIL ADDRESS</h4>\n              <!-- <a href=\"mailto:qlssbusinessconsulting@gmail.com\"\n                >qlssbusinessconsulting@gmail.com</a\n              > -->\n              <a href=\"mailto:sales@qlssconsulting.com\"\n                >sales@qlssconsulting.com</a\n              >\n            </div>\n          </div>\n\n          <div class=\"strip-divider\"></div>\n\n          <div class=\"strip-card reveal reveal-delay-3\">\n            <div class=\"strip-card__icon\">\n              <i class=\"fa-solid fa-location-dot\"></i>\n            </div>\n            <div class=\"strip-card__body\">\n              <h4>OPENING HOURS</h4>\n              <p>Monday &ndash; Friday: 9 am &ndash; 6 pm</p>\n              <p>Saturday: 9 am &ndash; 3 pm</p>\n            </div>\n          </div>\n        </div>\n      </div>\n    </section>\n\n    <!--  MAIN  -->\n    <section class=\"contact-main\">\n      <div class=\"container\">\n        <div class=\"contact-main__grid\">\n          <!-- LEFT CONTENT -->\n          <div class=\"contact-left reveal\">\n            <span class=\"section-tag\">Get in touch</span>\n            <h2 class=\"contact-main__title\">\n              We\u2019d love to hear from you.<br />Send us a message!\n            </h2>\n            <p class=\"contact-left__desc\">\n              Whether you have a question about our consulting services,\n              training programs, or anything else, our team is ready to answer\n              all your questions. Fill out the form and we'll be in touch as\n              soon as possible.\n            </p>\n\n            <div class=\"contact-left__cards\">\n              <div class=\"info-card\">\n                <div class=\"info-card__icon\">\n                  <i class=\"fa-solid fa-building\"></i>\n                </div>\n                <div class=\"info-card__content\">\n                  <h4>Head Office</h4>\n                  <p>QLSS Business Consulting,<br />Pune, Maharashtra, India</p>\n                </div>\n              </div>\n              <div class=\"info-card\">\n                <div class=\"info-card__icon\">\n                  <i class=\"fa-solid fa-globe\"></i>\n                </div>\n                <div class=\"info-card__content\">\n                  <h4>Global Reach</h4>\n                  <p>\n                    Serving clients across India, China, USA, Hungary, Saudi Arabia\n                    & UAE.\n                  </p>\n                </div>\n              </div>\n            </div>\n          </div>\n\n          <!-- FORM -->\n          <div class=\"contact-form-wrap reveal reveal-delay-1\">\n            <form class=\"contact-form\" id=\"contactForm\" novalidate  (ngSubmit)=\"sendToMe()\" #contactForm=\"ngForm\">\n              <div class=\"form-group\">\n                <label for=\"fullName\"\n                  >Full Name <span class=\"req\">*</span></label\n                >\n                <input\n                  type=\"text\"\n                  id=\"fullName\"\n                  name=\"fullName\"  [(ngModel)]=\"name\" required\n                  placeholder=\"Enter full name\"\n                  required\n                />\n              </div>\n\n              <div class=\"form-row\">\n                <div class=\"form-group\">\n                  <label for=\"mobile\"\n                    >Mobile Number <span class=\"req\">*</span></label\n                  >\n                  <input\n                    type=\"tel\"\n                    id=\"mobile\"\n                    name=\"mobile\" [(ngModel)]=\"mobile\" required \n                    placeholder=\"Ex: 8945488541\"\n                    required\n                  />\n                </div>\n                <div class=\"form-group\">\n                  <label for=\"email\"\n                    >E-Mail Address <span class=\"req\">*</span></label\n                  >\n                  <input\n                    type=\"email\"\n                    id=\"email\"\n                    name=\"email\"  [(ngModel)]=\"email\" required email\n                    placeholder=\"dhawal@tech.com\"\n                    required\n                  />\n                </div>\n              </div>\n\n              <div class=\"form-group\"  style=\"display: none;\">\n                <label for=\"solutions\"\n                  >I am looking for solutions on&hellip;</label\n                >\n                <div class=\"select-wrapper\">\n                  <select id=\"solutions\" name=\"solutions\">\n                    <option value=\"\" disabled selected>Select</option>\n                    <option value=\"financial\">Financial Services</option>\n                    <option value=\"supply\">Supply Chain</option>\n                    <option value=\"sustainability\">Sustainability</option>\n                    <option value=\"training\">Training &amp; Development</option>\n                    <option value=\"consulting\">Business Consulting</option>\n                  </select>\n                  <i class=\"fa-solid fa-chevron-down select-arrow\"></i>\n                </div>\n              </div>\n\n              <div class=\"form-group\">\n                <label for=\"serviceType\"\n                  >Service Type <span class=\"req\">*</span></label\n                >\n                <textarea\n                  id=\"serviceType\"\n                  name=\"serviceType\"\n                  placeholder=\"Write Short Description\"\n                  rows=\"4\"\n                  required [(ngModel)]=\"messages\"\n                ></textarea>\n              </div>\n\n              <div class=\"form-group\" style=\"display: none;\">\n                <label>Upload file</label>\n                <div class=\"upload-zone\" id=\"uploadZone\">\n                  <input\n                    type=\"file\"\n                    id=\"fileInput\"\n                    class=\"upload-input\"\n                    multiple\n                  />\n                  <!-- <div class=\"upload-zone__inner\">\n                    <i class=\"fa-solid fa-cloud-arrow-up upload-icon\"></i>\n                    <p>\n                      Drag and Drop or\n                      <label for=\"fileInput\" class=\"choose-link\"\n                        >Choose file</label\n                      >\n                    </p>\n                    <span class=\"upload-hint\" id=\"uploadHint\"></span>\n                  </div> -->\n                </div>\n              </div>\n\n              <button type=\"submit\" class=\"btn-send\">\n                <span>Send Message</span>\n                <i class=\"fa-solid fa-paper-plane\"></i>\n              </button>\n            </form>\n          </div>\n        </div>\n      </div>\n    </section>\n    <!-- FOOTER -->" }]
    }], function () { return [{ type: i1.SiteInteractionsService }, { type: i2.Title }, { type: i2.Meta }, { type: i3.NotifierService }]; }, null); })();
//# sourceMappingURL=contact.component.js.map