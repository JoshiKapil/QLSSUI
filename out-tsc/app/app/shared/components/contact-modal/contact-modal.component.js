import { __awaiter } from "tslib";
import { Component } from '@angular/core';
import emailjs from '@emailjs/browser';
import * as i0 from "@angular/core";
import * as i1 from "../../../core/services/notifier.service";
import * as i2 from "@angular/forms";
export class ContactModalComponent {
    constructor(notifierService) {
        this.notifierService = notifierService;
        this.visible = false;
        this.name = '';
        this.email = '';
        this.mobile = '';
        this.messages = '';
        this.isSending = false;
        this.isDisplayed = localStorage.getItem('isDisplayed') || 'true';
        this.SERVICE_ID = 'service_duh8g6f';
        this.TEMPLATE_ID = 'template_b8pcczp';
        this.PUBLIC_KEY = 'ZT9MYx-Gi_6z-chnr';
    }
    ngOnInit() {
        localStorage.setItem('isDisplayed', 'true');
        if (localStorage.getItem('isDisplayed') == 'false' || this.isDisplayed === 'false') {
            this.openTimer = setTimeout(() => {
                this.visible = true;
                localStorage.setItem('isDisplayed', 'true');
            });
        }
    }
    ngOnDestroy() {
        if (this.openTimer)
            clearTimeout(this.openTimer);
        if (this.closeTimer)
            clearTimeout(this.closeTimer);
    }
    close() {
        this.visible = false;
        localStorage.setItem('isDisplayed', 'true');
        if (this.closeTimer)
            clearTimeout(this.closeTimer);
    }
    onShellClick(event) {
        const target = event.target;
        if (target.classList.contains('contactModal__overlay')) {
            this.close();
        }
    }
    sendToMe() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.isSending)
                return;
            if (!this.name || !this.email || !this.mobile) {
                this.notifierService.warningToastr('Please fill out all required fields correctly.');
                return;
            }
            const templateParams = {
                from_name: this.name,
                user_email: this.email,
                phone_number: this.mobile,
                message: this.messages,
                subject_line: `New contact request from ${this.name}`,
            };
            this.isSending = true;
            try {
                yield emailjs.send(this.SERVICE_ID, this.TEMPLATE_ID, templateParams, this.PUBLIC_KEY);
                this.notifierService.successToastr('Message sent successfully!');
                this.name = '';
                this.email = '';
                this.mobile = '';
                this.messages = '';
                this.close();
            }
            catch (_a) {
                this.notifierService.warningToastr('Failed to send message. Please try again.');
            }
            finally {
                this.isSending = false;
            }
        });
    }
}
ContactModalComponent.ɵfac = function ContactModalComponent_Factory(t) { return new (t || ContactModalComponent)(i0.ɵɵdirectiveInject(i1.NotifierService)); };
ContactModalComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: ContactModalComponent, selectors: [["app-contact-modal"]], decls: 44, vars: 8, consts: [[1, "contactModal", 3, "click"], [1, "contactModal__overlay"], [1, "contactModal__box"], ["type", "button", 1, "contactModal__close", 3, "click"], [1, "contactModal__header"], [1, "contactModal__icon"], [1, "fa-solid", "fa-layer-group"], [1, "contactModal__form", 3, "ngSubmit"], ["contactForm", "ngForm"], [1, "contactModal__row"], [1, "contactModal__field"], ["type", "text", "name", "name", "placeholder", "enter name", "required", "", 3, "ngModel", "ngModelChange"], ["type", "tel", "name", "mobile", "placeholder", "(91) 555 9999", "required", "", 3, "ngModel", "ngModelChange"], ["type", "email", "name", "email", "placeholder", "enter email", "required", "", "email", "", 3, "ngModel", "ngModelChange"], ["name", "messages", 3, "ngModel", "ngModelChange"], [1, "contactModal__actions"], ["type", "button", 1, "btnCancel", 3, "click"], ["type", "submit", 1, "btnSubmit", 3, "disabled"]], template: function ContactModalComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "div", 0);
        i0.ɵɵlistener("click", function ContactModalComponent_Template_div_click_0_listener($event) { return ctx.onShellClick($event); });
        i0.ɵɵelement(1, "div", 1);
        i0.ɵɵelementStart(2, "div", 2)(3, "button", 3);
        i0.ɵɵlistener("click", function ContactModalComponent_Template_button_click_3_listener() { return ctx.close(); });
        i0.ɵɵtext(4, "\u00D7");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(5, "div", 4)(6, "div", 5);
        i0.ɵɵelement(7, "i", 6);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(8, "h2");
        i0.ɵɵtext(9, "Need help with anything? Get in touch with us");
        i0.ɵɵelementEnd()();
        i0.ɵɵelementStart(10, "form", 7, 8);
        i0.ɵɵlistener("ngSubmit", function ContactModalComponent_Template_form_ngSubmit_10_listener() { return ctx.sendToMe(); });
        i0.ɵɵelementStart(12, "div", 9)(13, "div", 10)(14, "label");
        i0.ɵɵtext(15, "Name");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(16, "input", 11);
        i0.ɵɵlistener("ngModelChange", function ContactModalComponent_Template_input_ngModelChange_16_listener($event) { return ctx.name = $event; });
        i0.ɵɵelementEnd()();
        i0.ɵɵelementStart(17, "div", 10)(18, "label");
        i0.ɵɵtext(19, "Phone");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(20, "input", 12);
        i0.ɵɵlistener("ngModelChange", function ContactModalComponent_Template_input_ngModelChange_20_listener($event) { return ctx.mobile = $event; });
        i0.ɵɵelementEnd()()();
        i0.ɵɵelementStart(21, "div", 10)(22, "label");
        i0.ɵɵtext(23, "Email");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(24, "input", 13);
        i0.ɵɵlistener("ngModelChange", function ContactModalComponent_Template_input_ngModelChange_24_listener($event) { return ctx.email = $event; });
        i0.ɵɵelementEnd()();
        i0.ɵɵelementStart(25, "div", 10)(26, "label");
        i0.ɵɵtext(27, "What do you want to discuss?");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(28, "select", 14);
        i0.ɵɵlistener("ngModelChange", function ContactModalComponent_Template_select_ngModelChange_28_listener($event) { return ctx.messages = $event; });
        i0.ɵɵelementStart(29, "option");
        i0.ɵɵtext(30, "Select");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(31, "option");
        i0.ɵɵtext(32, "Training");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(33, "option");
        i0.ɵɵtext(34, "Consulting");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(35, "option");
        i0.ɵɵtext(36, "Data Analytics");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(37, "option");
        i0.ɵɵtext(38, "Sustainability");
        i0.ɵɵelementEnd()()();
        i0.ɵɵelementStart(39, "div", 15)(40, "button", 16);
        i0.ɵɵlistener("click", function ContactModalComponent_Template_button_click_40_listener() { return ctx.close(); });
        i0.ɵɵtext(41, "Cancel");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(42, "button", 17);
        i0.ɵɵtext(43);
        i0.ɵɵelementEnd()()()()();
    } if (rf & 2) {
        i0.ɵɵclassProp("active", ctx.visible);
        i0.ɵɵadvance(16);
        i0.ɵɵproperty("ngModel", ctx.name);
        i0.ɵɵadvance(4);
        i0.ɵɵproperty("ngModel", ctx.mobile);
        i0.ɵɵadvance(4);
        i0.ɵɵproperty("ngModel", ctx.email);
        i0.ɵɵadvance(4);
        i0.ɵɵproperty("ngModel", ctx.messages);
        i0.ɵɵadvance(14);
        i0.ɵɵproperty("disabled", ctx.isSending);
        i0.ɵɵadvance(1);
        i0.ɵɵtextInterpolate1(" ", ctx.isSending ? "Sending..." : "Contact us", " ");
    } }, dependencies: [i2.ɵNgNoValidate, i2.NgSelectOption, i2.ɵNgSelectMultipleOption, i2.DefaultValueAccessor, i2.SelectControlValueAccessor, i2.NgControlStatus, i2.NgControlStatusGroup, i2.RequiredValidator, i2.EmailValidator, i2.NgModel, i2.NgForm] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ContactModalComponent, [{
        type: Component,
        args: [{ selector: 'app-contact-modal', template: "<div class=\"contactModal\" [class.active]=\"visible\" (click)=\"onShellClick($event)\">\n  <div class=\"contactModal__overlay\"></div>\n  <div class=\"contactModal__box\">\n    <button type=\"button\" class=\"contactModal__close\" (click)=\"close()\">&times;</button>\n    <div class=\"contactModal__header\">\n      <div class=\"contactModal__icon\"><i class=\"fa-solid fa-layer-group\"></i></div>\n      <h2>Need help with anything? Get in touch with us</h2>\n    </div>\n    <form class=\"contactModal__form\" (ngSubmit)=\"sendToMe()\" #contactForm=\"ngForm\">\n      <div class=\"contactModal__row\">\n        <div class=\"contactModal__field\">\n          <label>Name</label>\n          <input type=\"text\" name=\"name\" placeholder=\"enter name\" [(ngModel)]=\"name\" required />\n        </div>\n        <div class=\"contactModal__field\">\n          <label>Phone</label>\n          <input type=\"tel\" name=\"mobile\" placeholder=\"(91) 555 9999\" [(ngModel)]=\"mobile\" required />\n        </div>\n      </div>\n      <div class=\"contactModal__field\">\n        <label>Email</label>\n        <input type=\"email\" name=\"email\" placeholder=\"enter email\" [(ngModel)]=\"email\" required email />\n      </div>\n      <div class=\"contactModal__field\">\n        <label>What do you want to discuss?</label>\n        <select name=\"messages\" [(ngModel)]=\"messages\">\n          <option>Select</option>\n          <option>Training</option>\n          <option>Consulting</option>\n          <option>Data Analytics</option>\n          <option>Sustainability</option>\n        </select>\n      </div>\n      <div class=\"contactModal__actions\">\n        <button type=\"button\" class=\"btnCancel\" (click)=\"close()\">Cancel</button>\n        <button type=\"submit\" class=\"btnSubmit\" [disabled]=\"isSending\">\n          {{ isSending ? 'Sending...' : 'Contact us' }}\n        </button>\n      </div>\n    </form>\n  </div>\n</div>\n" }]
    }], function () { return [{ type: i1.NotifierService }]; }, null); })();
//# sourceMappingURL=contact-modal.component.js.map