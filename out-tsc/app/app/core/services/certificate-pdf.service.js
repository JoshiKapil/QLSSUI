import { __awaiter } from "tslib";
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { PDFDocument, StandardFonts } from 'pdf-lib';
import { CERTIFICATE_PDF_LAYOUT } from './certificate-pdf-layout.config';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
export class CertificatePdfService {
    constructor(http) {
        this.http = http;
        this.templateUrl = 'assets/certificates/certificate-template.png';
    }
    generate(data) {
        return __awaiter(this, void 0, void 0, function* () {
            this.validate(data);
            const layout = CERTIFICATE_PDF_LAYOUT;
            const document = yield PDFDocument.create();
            const page = document.addPage([layout.page.width, layout.page.height]);
            const regularFont = yield document.embedFont(StandardFonts.Helvetica);
            const boldFont = yield document.embedFont(StandardFonts.HelveticaBold);
            const nameFont = yield document.embedFont(StandardFonts.TimesRomanItalic);
            const template = yield document.embedPng(yield this.loadTemplate());
            page.drawRectangle({
                x: layout.background.x,
                y: layout.background.y,
                width: layout.page.width,
                height: layout.page.height,
                color: layout.colors.white
            });
            const backgroundWidth = layout.page.width;
            const backgroundHeight = layout.page.height;
            const backgroundX = layout.background.x;
            const backgroundY = layout.background.y;
            page.drawImage(template, {
                x: backgroundX,
                y: backgroundY,
                width: backgroundWidth,
                height: backgroundHeight
            });
            if (layout.background.cropPageToArtwork) {
                page.setCropBox(backgroundX, backgroundY, backgroundWidth, backgroundHeight);
            }
            const clear = layout.completion.clearArea;
            page.drawRectangle({ x: clear.x, y: clear.y, width: clear.width, height: clear.height, color: layout.colors.white });
            this.drawCenteredAt(page, data.userName, nameFont, layout.userName.fontSize, layout.userName.centerX, layout.userName.y, layout.colors.navy, layout.userName.maxWidth);
            this.drawCenteredAt(page, this.getCompletionSentence(data), regularFont, layout.completion.fontSize, layout.completion.centerX, layout.verticalFlow.completionY, layout.colors.body, layout.completion.maxWidth);
            this.drawCenteredAt(page, data.trainingName.toUpperCase(), boldFont, layout.trainingName.fontSize, layout.trainingName.centerX, layout.verticalFlow.trainingNameY, layout.colors.green, layout.trainingName.maxWidth);
            this.drawTopics(page, data.coveredTopics, regularFont);
            this.drawMetadataPanel(page, boldFont);
            this.drawDetailValue(page, data.certificateNumber, regularFont, boldFont, layout.details.certificateNumber, layout.verticalFlow.detailValueY);
            this.drawDetailValue(page, `${data.trainingHours} Hours`, regularFont, boldFont, layout.details.trainingHours, layout.verticalFlow.detailValueY);
            this.drawDetailValue(page, data.location, regularFont, boldFont, layout.details.location, layout.verticalFlow.detailValueY);
            this.drawDetailValue(page, data.trainerName, regularFont, boldFont, layout.details.trainerName, layout.verticalFlow.detailValueY);
            this.drawDetailValue(page, this.formatDate(data.dateOfIssue), regularFont, boldFont, layout.dateOfIssue, layout.verticalFlow.dateValueY);
            document.setTitle(`${data.trainingName} - ${data.userName}`);
            document.setSubject('Training completion certificate');
            document.setCreator('QLSS Certificate Generator');
            document.setCreationDate(new Date());
            return document.save();
        });
    }
    createPreviewUrl(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return URL.createObjectURL(this.toBlob(yield this.generate(data)));
        });
    }
    download(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const bytes = yield this.generate(data);
            const link = document.createElement('a');
            link.href = URL.createObjectURL(this.toBlob(bytes));
            link.download = this.getFileName(data);
            link.click();
            setTimeout(() => URL.revokeObjectURL(link.href), 1000);
        });
    }
    print(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const bytes = yield this.generate(data);
            const url = URL.createObjectURL(this.toBlob(bytes));
            const frame = document.createElement('iframe');
            frame.style.position = 'fixed';
            frame.style.width = '1px';
            frame.style.height = '1px';
            frame.style.opacity = '0';
            frame.src = url;
            frame.onload = () => {
                var _a, _b;
                (_a = frame.contentWindow) === null || _a === void 0 ? void 0 : _a.focus();
                (_b = frame.contentWindow) === null || _b === void 0 ? void 0 : _b.print();
                setTimeout(() => {
                    frame.remove();
                    URL.revokeObjectURL(url);
                }, 30000);
            };
            document.body.appendChild(frame);
        });
    }
    loadTemplate() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.templateBytes) {
                this.templateBytes = yield firstValueFrom(this.http.get(this.templateUrl, { responseType: 'arraybuffer' }));
            }
            return this.templateBytes;
        });
    }
    getCompletionSentence(data) {
        var _a;
        if (data.completionType === 'attendance') {
            return 'has successfully attended the training program on';
        }
        if (data.marks !== null && data.marks !== undefined && data.marks < ((_a = data.passingMarks) !== null && _a !== void 0 ? _a : 60)) {
            return 'has successfully attended the training program on';
        }
        return 'has successfully attended and completed the assessment on';
    }
    drawTopics(page, sourceTopics, font) {
        const layout = CERTIFICATE_PDF_LAYOUT.topics;
        const colors = CERTIFICATE_PDF_LAYOUT.colors;
        const bulletColors = [colors.green, colors.gold, colors.blue, colors.red];
        const topics = sourceTopics.map((topic) => topic.trim()).filter(Boolean);
        const visibleTopics = topics.length > layout.maxItems
            ? [...topics.slice(0, layout.maxItems - 1), topics.slice(layout.maxItems - 1).join(', ')]
            : topics;
        page.drawRectangle({
            x: layout.panel.x,
            y: layout.panel.y,
            width: layout.panel.width,
            height: layout.panel.height,
            color: colors.white,
            opacity: 1
        });
        const count = visibleTopics.length;
        if (!count)
            return;
        const availableHeight = layout.firstRowCenterY - layout.lastRowCenterY;
        const rowGap = count > 1
            ? Math.min(layout.maximumRowGap, availableHeight / (count - 1))
            : 0;
        visibleTopics.forEach((topic, index) => {
            const maxLines = index === layout.maxItems - 1 ? layout.overflowMaxLines : layout.maxLinesPerItem;
            const rowCenterY = layout.firstRowCenterY - index * rowGap;
            let fontSize = layout.fontSize
                - Math.max(0, count - layout.compactAfterCount) * layout.fontReductionPerItem;
            let lines = this.wrapText(topic, font, fontSize, layout.maxWidth);
            while (lines.length > maxLines && fontSize > layout.minimumFontSize) {
                fontSize = Math.max(layout.minimumFontSize, fontSize - 0.3);
                lines = this.wrapText(topic, font, fontSize, layout.maxWidth);
            }
            const startY = rowCenterY
                + ((lines.length - 1) * layout.lineHeight) / 2
                - fontSize * 0.35;
            page.drawCircle({
                x: layout.bulletX,
                y: rowCenterY,
                size: layout.bulletRadius,
                color: bulletColors[index % bulletColors.length]
            });
            lines.forEach((line, lineIndex) => {
                page.drawText(line, {
                    x: layout.textX,
                    y: startY - lineIndex * layout.lineHeight,
                    size: fontSize,
                    font,
                    color: CERTIFICATE_PDF_LAYOUT.colors.body
                });
            });
            if (layout.separatorThickness > 0 && index < visibleTopics.length - 1) {
                const separatorY = rowCenterY - rowGap / 2;
                page.drawLine({
                    start: { x: layout.separatorStartX, y: separatorY },
                    end: { x: layout.separatorEndX, y: separatorY },
                    thickness: layout.separatorThickness,
                    color: colors.topicRule,
                    dashArray: [...layout.separatorDash]
                });
            }
        });
    }
    wrapText(text, font, size, maxWidth) {
        const words = text.split(/\s+/).filter(Boolean);
        const lines = [];
        let current = '';
        words.forEach((word) => {
            const candidate = current ? `${current} ${word}` : word;
            if (!current || font.widthOfTextAtSize(candidate, size) <= maxWidth) {
                current = candidate;
            }
            else {
                lines.push(current);
                current = word;
            }
        });
        if (current)
            lines.push(current);
        return lines;
    }
    drawCenteredAt(page, text, font, size, centerX, y, color, maxWidth, minimumSize = 6.5) {
        const fittedSize = this.fitFontSize(text, font, size, maxWidth, minimumSize);
        const width = font.widthOfTextAtSize(text, fittedSize);
        page.drawText(text, { x: centerX - width / 2, y, size: fittedSize, font, color });
    }
    drawLeftFitted(page, text, font, size, x, y, color, maxWidth, minimumSize = 6.5) {
        page.drawText(text, { x, y, size: this.fitFontSize(text, font, size, maxWidth, minimumSize), font, color });
    }
    drawMetadataPanel(page, boldFont) {
        const layout = CERTIFICATE_PDF_LAYOUT;
        const panel = layout.metadataPanel;
        const fields = [
            { field: layout.details.certificateNumber, icon: 'document' },
            { field: layout.details.trainingHours, icon: 'clock' },
            { field: layout.details.location, icon: 'location' },
            { field: layout.details.trainerName, icon: 'trainer' }
        ];
        // Remove the metadata artwork baked into the PNG before drawing a fully
        // vector-based strip. The result stays crisp in preview, print and export.
        page.drawRectangle(Object.assign(Object.assign({}, panel.mask), { color: layout.colors.white }));
        const { x, y, width, height, radius, thickness } = panel.border;
        const roundedBorderPath = [
            `M ${radius} 0`,
            `H ${width - radius}`,
            `Q ${width} 0 ${width} ${radius}`,
            `V ${height - radius}`,
            `Q ${width} ${height} ${width - radius} ${height}`,
            `H ${radius}`,
            `Q 0 ${height} 0 ${height - radius}`,
            `V ${radius}`,
            `Q 0 0 ${radius} 0`,
            'Z'
        ].join(' ');
        page.drawSvgPath(roundedBorderPath, {
            x,
            y: y + height,
            borderColor: layout.colors.orange,
            borderWidth: thickness
        });
        fields.slice(0, -1).forEach(({ field }, index) => {
            const nextCenterX = fields[index + 1].field.centerX;
            const separatorX = (field.centerX + nextCenterX) / 2;
            page.drawLine({
                start: { x: separatorX, y: panel.separator.y1 },
                end: { x: separatorX, y: panel.separator.y2 },
                thickness: panel.separator.thickness,
                color: layout.colors.orange,
                opacity: 0.65,
                dashArray: [...panel.separator.dash]
            });
        });
        fields.forEach(({ field, icon }) => {
            this.drawMetadataHeading(page, field.label, icon, field.centerX, panel.labelY, boldFont);
        });
    }
    drawMetadataHeading(page, label, icon, centerX, y, font) {
        const layout = CERTIFICATE_PDF_LAYOUT;
        const panel = layout.metadataPanel;
        const labelWidth = font.widthOfTextAtSize(label, panel.labelFontSize);
        const groupWidth = panel.iconSize + panel.iconGap + labelWidth;
        const groupX = centerX - groupWidth / 2;
        this.drawMetadataIcon(page, icon, groupX + panel.iconSize / 2, y + 2.4, layout.colors.orange);
        page.drawText(label, {
            x: groupX + panel.iconSize + panel.iconGap,
            y,
            size: panel.labelFontSize,
            font,
            color: layout.colors.navy
        });
    }
    drawMetadataIcon(page, icon, x, y, color) {
        const line = (x1, y1, x2, y2, thickness = 0.8) => page.drawLine({
            start: { x: x1, y: y1 },
            end: { x: x2, y: y2 },
            thickness,
            color
        });
        if (icon === 'document') {
            page.drawRectangle({ x: x - 3, y: y - 4, width: 6, height: 8, borderColor: color, borderWidth: 0.8 });
            line(x - 1.5, y + 1.5, x + 1.5, y + 1.5, 0.55);
            line(x - 1.5, y - 0.2, x + 1.5, y - 0.2, 0.55);
            line(x - 1.5, y - 1.9, x + 0.6, y - 1.9, 0.55);
            return;
        }
        if (icon === 'clock') {
            page.drawCircle({ x, y, size: 4, borderColor: color, borderWidth: 0.8 });
            line(x, y, x, y + 2.1);
            line(x, y, x + 1.7, y - 1.1);
            return;
        }
        if (icon === 'location') {
            page.drawCircle({ x, y: y + 1.3, size: 2.5, borderColor: color, borderWidth: 0.8 });
            page.drawCircle({ x, y: y + 1.3, size: 0.65, color });
            line(x - 2.1, y - 0.1, x, y - 4);
            line(x + 2.1, y - 0.1, x, y - 4);
            return;
        }
        page.drawCircle({ x, y: y + 1.8, size: 2.1, borderColor: color, borderWidth: 0.8 });
        line(x - 3.2, y - 3.6, x - 2.2, y - 1.1);
        line(x - 2.2, y - 1.1, x + 2.2, y - 1.1);
        line(x + 2.2, y - 1.1, x + 3.2, y - 3.6);
    }
    drawDetailValue(page, text, regularFont, boldFont, field, y) {
        const font = field.weight === 'bold' ? boldFont : regularFont;
        let fontSize = field.fontSize;
        let lines = this.wrapText(text.trim(), font, fontSize, field.maxWidth);
        while (lines.length > field.maxLines && fontSize > field.minimumFontSize) {
            fontSize = Math.max(field.minimumFontSize, fontSize - 0.4);
            lines = this.wrapText(text.trim(), font, fontSize, field.maxWidth);
        }
        if (lines.length > field.maxLines)
            lines = this.clampLines(lines, field.maxLines, font, fontSize, field.maxWidth);
        const firstLineY = y + ((lines.length - 1) * field.lineHeight) / 2;
        lines.forEach((line, index) => {
            const lineWidth = font.widthOfTextAtSize(line, fontSize);
            page.drawText(line, { x: field.centerX - lineWidth / 2, y: firstLineY - index * field.lineHeight, size: fontSize, font, color: CERTIFICATE_PDF_LAYOUT.colors.body });
        });
    }
    clampLines(lines, maxLines, font, size, maxWidth) {
        const visible = lines.slice(0, maxLines);
        let lastLine = lines.slice(maxLines - 1).join(' ');
        while (lastLine.length && font.widthOfTextAtSize(`${lastLine}...`, size) > maxWidth)
            lastLine = lastLine.slice(0, -1).trimEnd();
        visible[maxLines - 1] = `${lastLine}...`;
        return visible;
    }
    fitFontSize(text, font, preferredSize, maxWidth, minimumSize = 6.5) {
        const width = font.widthOfTextAtSize(text, preferredSize);
        return width <= maxWidth ? preferredSize : Math.max(minimumSize, preferredSize * (maxWidth / width));
    }
    formatDate(value) {
        const date = value instanceof Date ? value : new Date(value);
        return Number.isNaN(date.getTime())
            ? String(value)
            : new Intl.DateTimeFormat('en-GB', { day: '2-digit', month: 'long', year: 'numeric' }).format(date);
    }
    getFileName(data) {
        const maxLength = CERTIFICATE_PDF_LAYOUT.fileName.maxSlugLength;
        const slug = `${data.userName}-${data.trainingName}`.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, maxLength);
        return `${slug || CERTIFICATE_PDF_LAYOUT.fileName.fallback}.pdf`;
    }
    toBlob(bytes) {
        return new Blob([bytes], { type: 'application/pdf' });
    }
    validate(data) {
        const required = ['userName', 'trainingName', 'certificateNumber', 'location', 'trainerName', 'dateOfIssue'];
        const missing = required.filter((key) => { var _a; return !String((_a = data[key]) !== null && _a !== void 0 ? _a : '').trim(); });
        if (missing.length)
            throw new Error(`Missing certificate fields: ${missing.join(', ')}`);
    }
}
CertificatePdfService.ɵfac = function CertificatePdfService_Factory(t) { return new (t || CertificatePdfService)(i0.ɵɵinject(i1.HttpClient)); };
CertificatePdfService.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: CertificatePdfService, factory: CertificatePdfService.ɵfac, providedIn: 'root' });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(CertificatePdfService, [{
        type: Injectable,
        args: [{ providedIn: 'root' }]
    }], function () { return [{ type: i1.HttpClient }]; }, null); })();
//# sourceMappingURL=certificate-pdf.service.js.map