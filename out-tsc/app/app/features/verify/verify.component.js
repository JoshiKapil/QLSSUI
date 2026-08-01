import { Component } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import * as i0 from "@angular/core";
import * as i1 from "../../core/services/site-interactions.service";
import * as i2 from "@angular/platform-browser";
import * as i3 from "@angular/common/http";
import * as i4 from "../../core/services/data.service";
import * as i5 from "../../core/services/certification.service";
import * as i6 from "@angular/common";
import * as i7 from "@angular/forms";
function VerifyComponent_div_41_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 36)(1, "div", 37);
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(2, "svg", 38);
    i0.ɵɵelement(3, "circle", 39)(4, "path", 40);
    i0.ɵɵelementEnd()();
    i0.ɵɵnamespaceHTML();
    i0.ɵɵelementStart(5, "div", 41)(6, "p", 42);
    i0.ɵɵtext(7, "Certificate Verified");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "p", 43);
    i0.ɵɵtext(9);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "div", 44)(11, "span", 45);
    i0.ɵɵelement(12, "span", 46);
    i0.ɵɵtext(13, " Active / Valid ");
    i0.ɵɵelementEnd()()()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(9);
    i0.ɵɵtextInterpolate3(" The certificate is valid and issued to ", ctx_r1.UserData[0] == null ? null : ctx_r1.UserData[0].UserName, " on ", ctx_r1.formatIssuedDate(ctx_r1.UserData[0] == null ? null : ctx_r1.UserData[0].IssuedDate), " for ", (ctx_r1.UserData[0] == null ? null : ctx_r1.UserData[0].DisplayName) || (ctx_r1.UserData[0] == null ? null : ctx_r1.UserData[0].displayName) || (ctx_r1.UserData[0] == null ? null : ctx_r1.UserData[0].TrainingName) || (ctx_r1.UserData[0] == null ? null : ctx_r1.UserData[0].trainingName), ". ");
} }
function VerifyComponent_div_42_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 47)(1, "div", 48);
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(2, "svg", 38);
    i0.ɵɵelement(3, "path", 49)(4, "path", 50);
    i0.ɵɵelementEnd()();
    i0.ɵɵnamespaceHTML();
    i0.ɵɵelementStart(5, "div", 41)(6, "p", 51);
    i0.ɵɵtext(7, "Verification Unavailable");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "p", 43);
    i0.ɵɵtext(9, " Could not connect to the verification service. Please try again in a moment or contact ");
    i0.ɵɵelementStart(10, "a", 52);
    i0.ɵɵtext(11, "sales@qlssconsulting.com");
    i0.ɵɵelementEnd();
    i0.ɵɵtext(12, ". ");
    i0.ɵɵelementEnd()()();
} }
function VerifyComponent_p_44_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p");
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r3 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(ctx_r3.resultMessage);
} }
function VerifyComponent_div_45_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div")(1, "pre");
    i0.ɵɵtext(2);
    i0.ɵɵpipe(3, "json");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r4 = i0.ɵɵnextContext();
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(3, 1, ctx_r4.UserData[0]));
} }
export class VerifyComponent {
    constructor(interactions, title, meta, _HttpClient, dataService, certificationService) {
        this.interactions = interactions;
        this.title = title;
        this.meta = meta;
        this._HttpClient = _HttpClient;
        this.dataService = dataService;
        this.certificationService = certificationService;
        this.CertificateNo = '';
        this.UserData = [];
        this.Certificate = false;
        this.resultMessage = '';
        this.title.setTitle('Verify Certificate - QLSS Consulting');
        this.meta.updateTag({
            name: 'description',
            content: 'QLSS Business Consulting services, training, operational excellence and business transformation.'
        });
    }
    ngAfterViewInit() {
        this.interactions.initPage();
    }
    Validate() {
        // this.ValidateFromApi();
        if (this.CertificateNo && this.CertificateNo.trim() !== '') {
            const searchKey = this.CertificateNo.trim().toLowerCase();
            const reqHeader = new HttpHeaders({
                'Content-Type': 'application/json'
            });
            this._HttpClient.get(environment.certificateUrl, { headers: reqHeader, responseType: 'text' })
                .subscribe({
                next: (data) => {
                    try {
                        const decryptedData = this.dataService.decrypt(data);
                        if (decryptedData && Array.isArray(decryptedData)) {
                            this.UserData = decryptedData.filter((x) => {
                                if (!x.CertificationNumber)
                                    return false;
                                const certNo = x.CertificationNumber.toString().toLowerCase();
                                return certNo === searchKey || certNo.endsWith('/' + searchKey);
                            });
                            this.Certificate = this.UserData.length > 0;
                            this.resultMessage = this.Certificate ? 'Certificate Verified.' : 'Certificate Not Found.';
                        }
                        else {
                            this.Certificate = false;
                            this.resultMessage = 'Invalid data format returned from certificate source.';
                        }
                    }
                    catch (_a) {
                        this.Certificate = false;
                        this.resultMessage = 'Error processing certificate data.';
                    }
                },
                error: () => {
                    this.Certificate = false;
                    this.resultMessage = 'Unable to load certificate data.';
                }
            });
        }
        else {
            this.Certificate = false;
            this.resultMessage = 'Please enter a certificate number.';
        }
    }
    // Future API integration: call this method instead of Validate().
    ValidateFromApi() {
        const certificationNumber = this.CertificateNo.trim();
        if (!certificationNumber) {
            this.Certificate = false;
            this.resultMessage = 'Please enter a certificate number.';
            return;
        }
        this.certificationService.getByNumber(certificationNumber).subscribe({
            next: (item) => {
                console.log(item);
                const certificate = Object.assign(Object.assign({}, item), { UserName: item.name, IssuedDate: item.date, TrainingName: item.displayName || item.trainingName || String(item.trainingId) });
                this.UserData = [certificate];
                console.log(this.UserData);
                this.Certificate = true;
                this.resultMessage = 'Certificate Verified.';
            },
            error: (error) => {
                console.error('Certificate verification request failed.', { status: error.status });
                this.UserData = [];
                this.Certificate = false;
                this.resultMessage = error.status === 404 ? 'Certificate Not Found.' : 'Unable to verify certificate.';
            }
        });
    }
    formatIssuedDate(value) {
        if (!value) {
            return '';
        }
        // Match format: yyyy-MM-dd or yyyy-MM-dd HH:mm:ss
        const sqlDatePattern = /^\d{4}-\d{2}-\d{2}(?:\s+\d{2}:\d{2}:\d{2})?$/;
        if (sqlDatePattern.test(value.trim())) {
            const datePart = value.trim().substring(0, 10);
            const [year, month, day] = datePart.split('-');
            return `${day}-${month}-${year}`;
        }
        // Keep old descriptive dates as they are
        return value;
    }
}
VerifyComponent.ɵfac = function VerifyComponent_Factory(t) { return new (t || VerifyComponent)(i0.ɵɵdirectiveInject(i1.SiteInteractionsService), i0.ɵɵdirectiveInject(i2.Title), i0.ɵɵdirectiveInject(i2.Meta), i0.ɵɵdirectiveInject(i3.HttpClient), i0.ɵɵdirectiveInject(i4.DataService), i0.ɵɵdirectiveInject(i5.CertificationService)); };
VerifyComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: VerifyComponent, selectors: [["app-verify"]], decls: 53, vars: 5, consts: [[1, "verify-section"], [1, "verify-blob", "verify-blob--a"], [1, "verify-blob", "verify-blob--b"], [1, "container"], [1, "verify-header"], [1, "subHero__eyebrow", "why-eyebrow", "reveal"], [1, "eyebrow-line"], [1, "verify-title"], [1, "verify-subtitle"], ["id", "verifyCard", 1, "verify-card"], [1, "verify-card__top"], ["aria-hidden", "true", 1, "verify-card__icon"], ["viewBox", "0 0 48 48", "fill", "none", "xmlns", "http://www.w3.org/2000/svg"], ["cx", "24", "cy", "24", "r", "20", "stroke", "currentColor", "stroke-width", "2"], ["d", "M14 24l7 7 13-14", "stroke", "currentColor", "stroke-width", "2.5", "stroke-linecap", "round", "stroke-linejoin", "round"], [1, "verify-card__heading"], [1, "verify-form"], ["id", "inputWrap", 1, "verify-input-wrap"], ["type", "text", "id", "certInput", "placeholder", "e.g. 001", "autocomplete", "off", "spellcheck", "false", "aria-label", "Certificate number", "name", "certificateNo", 1, "verify-input", 3, "ngModel", "ngModelChange", "keydown.enter"], ["certInput", ""], ["id", "clearBtn", "type", "button", "aria-label", "Clear input", "onclick", "clearInput()", 1, "verify-clear", 2, "display", "none"], ["viewBox", "0 0 16 16", "fill", "none"], ["d", "M4 4l8 8M12 4l-8 8", "stroke", "currentColor", "stroke-width", "1.8", "stroke-linecap", "round"], ["id", "verifyBtn", "type", "button", 1, "verify-btn", 3, "click"], [1, "verify-btn__label"], ["aria-hidden", "true", 1, "verify-btn__icon"], ["viewBox", "0 0 20 20", "fill", "none"], ["d", "M4 10h12M10 4l6 6-6 6", "stroke", "currentColor", "stroke-width", "2", "stroke-linecap", "round", "stroke-linejoin", "round"], ["id", "btnSpinner", "aria-hidden", "true", 1, "verify-btn__spinner"], ["class", "verify-result verify-result--success verify-result--show", "role", "alert", "aria-live", "polite", 4, "ngIf"], ["class", "verify-result verify-result--warn verify-result--show", "id", "verifyResult", "role", "alert", "aria-live", "polite", 4, "ngIf"], ["id", "verifyResult", "role", "alert", "aria-live", "polite", 1, "verify-result"], [4, "ngIf"], [1, "verify-note"], ["href", "mailto:info@qlssconsulting.com"], ["href", "https://www.qlssconsulting.com", "target", "_blank", "rel", "noopener"], ["role", "alert", "aria-live", "polite", 1, "verify-result", "verify-result--success", "verify-result--show"], ["aria-hidden", "true", 1, "result-icon", "result-icon--success"], ["viewBox", "0 0 48 48", "fill", "none"], ["cx", "24", "cy", "24", "r", "22", "fill", "rgba(34,197,94,.12)", "stroke", "#22c55e", "stroke-width", "2"], ["d", "M13 24l8 8 14-16", "stroke", "#22c55e", "stroke-width", "2.5", "stroke-linecap", "round", "stroke-linejoin", "round"], [1, "result-body"], [1, "result-status", "result-status--success"], [1, "result-message"], [1, "result-tags"], [1, "result-tag", 2, "border-color", "rgba(34, 197, 94, 0.4)", "background", "rgba(34, 197, 94, 0.05)", "color", "#16a34a"], [2, "width", "6px", "height", "6px", "border-radius", "50%", "background", "#16a34a", "display", "inline-block"], ["id", "verifyResult", "role", "alert", "aria-live", "polite", 1, "verify-result", "verify-result--warn", "verify-result--show"], ["aria-hidden", "true", 1, "result-icon", "result-icon--warn"], ["d", "M24 4L44 40H4L24 4z", "fill", "rgba(234,179,8,.12)", "stroke", "#eab308", "stroke-width", "2", "stroke-linejoin", "round"], ["d", "M24 18v10M24 33v2", "stroke", "#eab308", "stroke-width", "2.5", "stroke-linecap", "round"], [1, "result-status", "result-status--warn"], ["href", "mailto:sales@qlssconsulting.com"]], template: function VerifyComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "section", 0);
        i0.ɵɵelement(1, "div", 1)(2, "div", 2);
        i0.ɵɵelementStart(3, "div", 3)(4, "div", 4)(5, "div", 5);
        i0.ɵɵelement(6, "span", 6);
        i0.ɵɵtext(7, " Certification Portal ");
        i0.ɵɵelement(8, "span", 6);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(9, "h1", 7);
        i0.ɵɵtext(10, "Verify ");
        i0.ɵɵelementStart(11, "span");
        i0.ɵɵtext(12, "Certificate");
        i0.ɵɵelementEnd()();
        i0.ɵɵelementStart(13, "p", 8);
        i0.ɵɵtext(14, " Instantly validate the authenticity of certifications issued by QLSS Consulting. ");
        i0.ɵɵelementEnd()();
        i0.ɵɵelementStart(15, "div", 9)(16, "div", 10)(17, "div", 11);
        i0.ɵɵnamespaceSVG();
        i0.ɵɵelementStart(18, "svg", 12);
        i0.ɵɵelement(19, "circle", 13)(20, "path", 14);
        i0.ɵɵelementEnd()();
        i0.ɵɵnamespaceHTML();
        i0.ɵɵelementStart(21, "div", 15)(22, "h2");
        i0.ɵɵtext(23, "Enter Certificate Details");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(24, "p");
        i0.ɵɵtext(25, " Enter the certificate number from your certificate. The prefix ");
        i0.ɵɵtext(26, " is added automatically if omitted. ");
        i0.ɵɵelementEnd()()();
        i0.ɵɵelementStart(27, "div", 16)(28, "div", 17)(29, "input", 18, 19);
        i0.ɵɵlistener("ngModelChange", function VerifyComponent_Template_input_ngModelChange_29_listener($event) { return ctx.CertificateNo = $event; })("keydown.enter", function VerifyComponent_Template_input_keydown_enter_29_listener() { return ctx.ValidateFromApi(); });
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(31, "button", 20);
        i0.ɵɵnamespaceSVG();
        i0.ɵɵelementStart(32, "svg", 21);
        i0.ɵɵelement(33, "path", 22);
        i0.ɵɵelementEnd()()();
        i0.ɵɵnamespaceHTML();
        i0.ɵɵelementStart(34, "button", 23);
        i0.ɵɵlistener("click", function VerifyComponent_Template_button_click_34_listener() { return ctx.ValidateFromApi(); });
        i0.ɵɵelementStart(35, "span", 24);
        i0.ɵɵtext(36, "Verify");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(37, "span", 25);
        i0.ɵɵnamespaceSVG();
        i0.ɵɵelementStart(38, "svg", 26);
        i0.ɵɵelement(39, "path", 27);
        i0.ɵɵelementEnd()();
        i0.ɵɵnamespaceHTML();
        i0.ɵɵelement(40, "span", 28);
        i0.ɵɵelementEnd()();
        i0.ɵɵtemplate(41, VerifyComponent_div_41_Template, 14, 3, "div", 29);
        i0.ɵɵtemplate(42, VerifyComponent_div_42_Template, 13, 0, "div", 30);
        i0.ɵɵelementStart(43, "div", 31);
        i0.ɵɵtemplate(44, VerifyComponent_p_44_Template, 2, 1, "p", 32);
        i0.ɵɵtemplate(45, VerifyComponent_div_45_Template, 4, 3, "div", 32);
        i0.ɵɵelementEnd()();
        i0.ɵɵelementStart(46, "p", 33);
        i0.ɵɵtext(47, " Having trouble?\u00A0 ");
        i0.ɵɵelementStart(48, "a", 34);
        i0.ɵɵtext(49, "Contact us");
        i0.ɵɵelementEnd();
        i0.ɵɵtext(50, " or visit ");
        i0.ɵɵelementStart(51, "a", 35);
        i0.ɵɵtext(52, "qlssconsulting.com");
        i0.ɵɵelementEnd()()()();
    } if (rf & 2) {
        i0.ɵɵadvance(29);
        i0.ɵɵproperty("ngModel", ctx.CertificateNo);
        i0.ɵɵadvance(12);
        i0.ɵɵproperty("ngIf", ctx.Certificate && ctx.UserData.length);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", !ctx.Certificate && ctx.CertificateNo.trim() !== "");
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("ngIf", ctx.resultMessage);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.Certificate && !ctx.UserData);
    } }, dependencies: [i6.NgIf, i7.DefaultValueAccessor, i7.NgControlStatus, i7.NgModel, i6.JsonPipe], styles: [".alert-success[_ngcontent-%COMP%] {\r\n  color: #0a3622;\r\n  background-color: #d1e7dd;\r\n  border-color: #a3cfbb;\r\n  border-radius: 5px;\r\n  padding: 15px;\r\n  margin-top: 3rem;\r\n}"] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(VerifyComponent, [{
        type: Component,
        args: [{ selector: 'app-verify', template: "<!-- NAVBAR -->\n  \n\n  <!-- \n         VERIFY CERTIFICATE SECTION\n     -->\n  <section class=\"verify-section\">\n    <!-- Decorative background blobs -->\n    <div class=\"verify-blob verify-blob--a\"></div>\n    <div class=\"verify-blob verify-blob--b\"></div>\n\n    <div class=\"container\">\n      <!-- \u00E2\u201D\u20AC\u00E2\u201D\u20AC Page Header \u00E2\u201D\u20AC\u00E2\u201D\u20AC -->\n      <div class=\"verify-header\">\n        <div class=\"subHero__eyebrow why-eyebrow reveal\">\n          <span class=\"eyebrow-line \"></span>\n          Certification Portal\n          <span class=\"eyebrow-line\"></span>\n        </div>\n        <h1 class=\"verify-title\">Verify <span>Certificate</span></h1>\n        <p class=\"verify-subtitle\">\n          Instantly validate the authenticity of certifications issued by QLSS\n          Consulting.\n        </p>\n      </div>\n\n      <!-- \u00E2\u201D\u20AC\u00E2\u201D\u20AC Main Card \u00E2\u201D\u20AC\u00E2\u201D\u20AC -->\n      <div class=\"verify-card\" id=\"verifyCard\">\n        <!-- Card header -->\n        <div class=\"verify-card__top\">\n          <div class=\"verify-card__icon\" aria-hidden=\"true\">\n            <svg viewBox=\"0 0 48 48\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n              <circle cx=\"24\" cy=\"24\" r=\"20\" stroke=\"currentColor\" stroke-width=\"2\" />\n              <path d=\"M14 24l7 7 13-14\" stroke=\"currentColor\" stroke-width=\"2.5\" stroke-linecap=\"round\"\n                stroke-linejoin=\"round\" />\n            </svg>\n          </div>\n          <div class=\"verify-card__heading\">\n            <h2>Enter Certificate Details</h2>\n            <p>\n              Enter the certificate number from your certificate. The prefix\n              <!-- <code>QLSS/IATF/IA/</code>  -->\n              is added automatically if omitted.\n            </p>\n          </div>\n        </div>\n\n        <!-- Search row -->\n        <div class=\"verify-form\">\n          <div class=\"verify-input-wrap\" id=\"inputWrap\">\n            <!-- <span class=\"verify-prefix\" id=\"prefixPill\">QLSS/IATF/IA/</span> -->\n            <input #certInput type=\"text\" id=\"certInput\" class=\"verify-input\" placeholder=\"e.g. 001\" autocomplete=\"off\"\n              spellcheck=\"false\" aria-label=\"Certificate number\" [(ngModel)]=\"CertificateNo\" name=\"certificateNo\" (keydown.enter)=\"ValidateFromApi()\" />\n            <button class=\"verify-clear\" id=\"clearBtn\" type=\"button\" aria-label=\"Clear input\" style=\"display: none\"\n              onclick=\"clearInput()\">\n              <svg viewBox=\"0 0 16 16\" fill=\"none\">\n                <path d=\"M4 4l8 8M12 4l-8 8\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" />\n              </svg>\n            </button>\n          </div>\n          <button class=\"verify-btn\" id=\"verifyBtn\" type=\"button\" (click)=\"ValidateFromApi()\">\n            <span class=\"verify-btn__label\">Verify</span>\n            <span class=\"verify-btn__icon\" aria-hidden=\"true\">\n              <svg viewBox=\"0 0 20 20\" fill=\"none\">\n                <path d=\"M4 10h12M10 4l6 6-6 6\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\"\n                  stroke-linejoin=\"round\" />\n              </svg>\n            </span>\n            <span class=\"verify-btn__spinner\" id=\"btnSpinner\" aria-hidden=\"true\"></span>\n          </button>\n        </div>\n        \n        <div *ngIf=\"Certificate && UserData.length\" class=\"verify-result verify-result--success verify-result--show\" role=\"alert\" aria-live=\"polite\">\n          <div class=\"result-icon result-icon--success\" aria-hidden=\"true\">\n            <svg viewBox=\"0 0 48 48\" fill=\"none\">\n              <circle cx=\"24\" cy=\"24\" r=\"22\" fill=\"rgba(34,197,94,.12)\" stroke=\"#22c55e\" stroke-width=\"2\"/>\n              <path d=\"M13 24l8 8 14-16\" stroke=\"#22c55e\" stroke-width=\"2.5\"\n                    stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n            </svg>\n          </div>\n\n          <div class=\"result-body\">\n              <p class=\"result-status result-status--success\">Certificate Verified</p>\n              <p class=\"result-message\">\n                The certificate is valid and issued to {{ UserData[0]?.UserName }} on\n                {{ formatIssuedDate(UserData[0]?.IssuedDate) }} for {{ UserData[0]?.DisplayName || UserData[0]?.displayName || UserData[0]?.TrainingName || UserData[0]?.trainingName }}.\n              </p>\n              <div class=\"result-tags\">\n                <!-- <span class=\"result-tag\">\n                  <svg viewBox=\"0 0 16 16\" fill=\"none\">\n                    <rect x=\"1\" y=\"3\" width=\"14\" height=\"10\" rx=\"2\" stroke=\"currentColor\" stroke-width=\"1.5\"/>\n                    <path d=\"M5 7h6M5 9.5h4\" stroke=\"currentColor\" stroke-width=\"1.2\" stroke-linecap=\"round\"/>\n                  </svg>\n                  fdf\n                </span> -->\n                <span class=\"result-tag\" style=\"border-color: rgba(34, 197, 94, 0.4); background: rgba(34, 197, 94, 0.05); color: #16a34a;\">\n                  <span style=\"width: 6px; height: 6px; border-radius: 50%; background: #16a34a; display: inline-block;\"></span>\n                  Active / Valid\n                </span>\n              </div>\n            </div>\n        </div>\n        <div *ngIf=\"!Certificate && CertificateNo.trim() !== ''\" class=\"verify-result verify-result--warn verify-result--show\" id=\"verifyResult\" role=\"alert\" aria-live=\"polite\"><div class=\"result-icon result-icon--warn\" aria-hidden=\"true\">\n              <svg viewBox=\"0 0 48 48\" fill=\"none\">\n                <path d=\"M24 4L44 40H4L24 4z\" fill=\"rgba(234,179,8,.12)\" stroke=\"#eab308\" stroke-width=\"2\" stroke-linejoin=\"round\"></path>\n                <path d=\"M24 18v10M24 33v2\" stroke=\"#eab308\" stroke-width=\"2.5\" stroke-linecap=\"round\"></path>\n              </svg>\n            </div>\n            <div  class=\"result-body\">\n                <p class=\"result-status result-status--warn\">Verification Unavailable</p>\n                <p class=\"result-message\">\n                  Could not connect to the verification service.\n                  Please try again in a moment or contact\n                  <a href=\"mailto:sales@qlssconsulting.com\">sales@qlssconsulting.com</a>.\n                </p>\n            </div>\n            \n          </div>\n        <!-- \u00E2\u201D\u20AC\u00E2\u201D\u20AC Result Area \u00E2\u201D\u20AC\u00E2\u201D\u20AC -->\n        <div class=\"verify-result\" id=\"verifyResult\" role=\"alert\" aria-live=\"polite\">\n          <p *ngIf=\"resultMessage\">{{ resultMessage }}</p>\n          <div *ngIf=\"Certificate && !UserData\">\n            <pre>{{ UserData[0] | json }}</pre>\n          </div>\n        </div>\n      </div>\n      <!-- /verify-card -->\n\n      <!-- Help line -->\n      <p class=\"verify-note\">\n        Having trouble?&nbsp;\n        <a href=\"mailto:info@qlssconsulting.com\">Contact us</a>\n        or visit\n        <a href=\"https://www.qlssconsulting.com\" target=\"_blank\" rel=\"noopener\">qlssconsulting.com</a>\n      </p>\n    </div>\n    <!-- /container -->\n  </section>\n\n  <!-- FOOTER -->\n  \n\n  <!-- \n         VERIFY SCRIPT\n     -->\r\n", styles: [".alert-success {\r\n  color: #0a3622;\r\n  background-color: #d1e7dd;\r\n  border-color: #a3cfbb;\r\n  border-radius: 5px;\r\n  padding: 15px;\r\n  margin-top: 3rem;\r\n}\r\n"] }]
    }], function () { return [{ type: i1.SiteInteractionsService }, { type: i2.Title }, { type: i2.Meta }, { type: i3.HttpClient }, { type: i4.DataService }, { type: i5.CertificationService }]; }, null); })();
//# sourceMappingURL=verify.component.js.map