import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { PDFDocument, PDFFont, PDFPage, RGB, StandardFonts, rgb } from 'pdf-lib';
import { CertificateData } from '../models/certificate-data.model';
import { CERTIFICATE_PDF_LAYOUT } from './certificate-pdf-layout.config';

@Injectable({ providedIn: 'root' })
export class CertificatePdfService {
  private readonly templateUrl = 'assets/certificates/certificate-template.png';
  private templateBytes?: ArrayBuffer;

  constructor(private http: HttpClient) {}

  async generate(data: CertificateData): Promise<Uint8Array> {
    this.validate(data);

    const layout = CERTIFICATE_PDF_LAYOUT;
    const document = await PDFDocument.create();
    const page = document.addPage([layout.page.width, layout.page.height]);
    const regularFont = await document.embedFont(StandardFonts.Helvetica);
    const boldFont = await document.embedFont(StandardFonts.HelveticaBold);
    const nameFont = await document.embedFont(StandardFonts.TimesRomanItalic);
    const template = await document.embedPng(await this.loadTemplate());

    page.drawRectangle({
      x: layout.background.x,
      y: layout.background.y,
      width: layout.page.width,
      height: layout.page.height,
      color: layout.colors.white
    });

    const scale = Math.min(layout.page.width / template.width, layout.page.height / template.height);
    const backgroundWidth = template.width * scale;
    const backgroundHeight = template.height * scale;
    const backgroundX = (layout.page.width - backgroundWidth) / 2;
    const backgroundY = (layout.page.height - backgroundHeight) / 2;
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
  }

  async createPreviewUrl(data: CertificateData): Promise<string> {
    return URL.createObjectURL(this.toBlob(await this.generate(data)));
  }

  async download(data: CertificateData): Promise<void> {
    const bytes = await this.generate(data);
    const link = document.createElement('a');
    link.href = URL.createObjectURL(this.toBlob(bytes));
    link.download = this.getFileName(data);
    link.click();
    setTimeout(() => URL.revokeObjectURL(link.href), 1000);
  }

  async print(data: CertificateData): Promise<void> {
    const bytes = await this.generate(data);
    const url = URL.createObjectURL(this.toBlob(bytes));
    const frame = document.createElement('iframe');
    frame.style.position = 'fixed';
    frame.style.width = '1px';
    frame.style.height = '1px';
    frame.style.opacity = '0';
    frame.src = url;
    frame.onload = () => {
      frame.contentWindow?.focus();
      frame.contentWindow?.print();
      setTimeout(() => {
        frame.remove();
        URL.revokeObjectURL(url);
      }, 30000);
    };
    document.body.appendChild(frame);
  }

  private async loadTemplate(): Promise<ArrayBuffer> {
    if (!this.templateBytes) {
      this.templateBytes = await firstValueFrom(this.http.get(this.templateUrl, { responseType: 'arraybuffer' }));
    }
    return this.templateBytes;
  }

  private getCompletionSentence(data: CertificateData): string {
    if (data.completionType === 'attendance') {
      return 'has successfully attended the training program on';
    }
    if (data.marks !== null && data.marks !== undefined && data.marks < (data.passingMarks ?? 60)) {
      return 'has successfully attended the training program on';
    }
    return 'has successfully attended and completed the assessment on';
  }

  private drawTopics(page: PDFPage, sourceTopics: string[], font: PDFFont): void {
    const layout = CERTIFICATE_PDF_LAYOUT.topics;
    const colors = CERTIFICATE_PDF_LAYOUT.colors;
    const bulletColors = [colors.green, colors.gold, colors.blue, colors.red];
    const topics = sourceTopics.map((topic) => topic.trim()).filter(Boolean);
    const visibleTopics = topics.length > layout.maxItems
      ? [...topics.slice(0, layout.maxItems - 1), topics.slice(layout.maxItems - 1).join(', ')]
      : topics;

    layout.templateMarks.bulletY.forEach((y) => {
      page.drawCircle({
        x: layout.templateMarks.bulletX,
        y,
        size: layout.templateMarks.bulletRadius,
        color: colors.templatePaper
      });
    });
    layout.templateMarks.ruleY.forEach((y) => {
      page.drawRectangle({
        x: layout.templateMarks.ruleX,
        y: y - layout.templateMarks.ruleHeight / 2,
        width: layout.templateMarks.ruleWidth,
        height: layout.templateMarks.ruleHeight,
        color: colors.templatePaper
      });
    });

    const count = visibleTopics.length;
    if (!count) return;

    const availableHeight = layout.firstRowCenterY - layout.lastRowCenterY;
    const rowGap = count > 1
      ? Math.min(layout.maximumRowGap, availableHeight / (count - 1))
      : 0;

    visibleTopics.forEach((topic, index) => {
      const maxLines = index === layout.maxItems - 1 ? layout.overflowMaxLines : layout.maxLinesPerItem;
      const rowCenterY = layout.firstRowCenterY - index * rowGap;
      let fontSize: number = layout.fontSize
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
      if (index < visibleTopics.length - 1) {
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

  private wrapText(text: string, font: PDFFont, size: number, maxWidth: number): string[] {
    const words = text.split(/\s+/).filter(Boolean);
    const lines: string[] = [];
    let current = '';
    words.forEach((word) => {
      const candidate = current ? `${current} ${word}` : word;
      if (!current || font.widthOfTextAtSize(candidate, size) <= maxWidth) {
        current = candidate;
      } else {
        lines.push(current);
        current = word;
      }
    });
    if (current) lines.push(current);
    return lines;
  }

  private drawCenteredAt(page: PDFPage, text: string, font: PDFFont, size: number, centerX: number, y: number, color: RGB, maxWidth: number, minimumSize = 6.5): void {
    const fittedSize = this.fitFontSize(text, font, size, maxWidth, minimumSize);
    const width = font.widthOfTextAtSize(text, fittedSize);
    page.drawText(text, { x: centerX - width / 2, y, size: fittedSize, font, color });
  }

  private drawLeftFitted(page: PDFPage, text: string, font: PDFFont, size: number, x: number, y: number, color: RGB, maxWidth: number, minimumSize = 6.5): void {
    page.drawText(text, { x, y, size: this.fitFontSize(text, font, size, maxWidth, minimumSize), font, color });
  }

  private drawMetadataPanel(page: PDFPage, boldFont: PDFFont): void {
    const layout = CERTIFICATE_PDF_LAYOUT;
    const panel = layout.metadataPanel;
    const fields = [
      { field: layout.details.certificateNumber, icon: 'document' as const },
      { field: layout.details.trainingHours, icon: 'clock' as const },
      { field: layout.details.location, icon: 'location' as const },
      { field: layout.details.trainerName, icon: 'trainer' as const }
    ];

    // Remove the metadata artwork baked into the PNG before drawing a fully
    // vector-based strip. The result stays crisp in preview, print and export.
    page.drawRectangle({ ...panel.mask, color: layout.colors.white });

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
  private drawMetadataHeading(
    page: PDFPage,
    label: string,
    icon: 'document' | 'clock' | 'location' | 'trainer',
    centerX: number,
    y: number,
    font: PDFFont
  ): void {
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

  private drawMetadataIcon(
    page: PDFPage,
    icon: 'document' | 'clock' | 'location' | 'trainer',
    x: number,
    y: number,
    color: RGB
  ): void {
    const line = (x1: number, y1: number, x2: number, y2: number, thickness = 0.8) => page.drawLine({
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
  private drawDetailValue(
    page: PDFPage,
    text: string,
    regularFont: PDFFont,
    boldFont: PDFFont,
    field: { centerX: number; maxWidth: number; fontSize: number; minimumFontSize: number; maxLines: number; lineHeight: number; weight: 'regular' | 'bold' },
    y: number
  ): void {
    const font = field.weight === 'bold' ? boldFont : regularFont;
    let fontSize = field.fontSize;
    let lines = this.wrapText(text.trim(), font, fontSize, field.maxWidth);
    while (lines.length > field.maxLines && fontSize > field.minimumFontSize) {
      fontSize = Math.max(field.minimumFontSize, fontSize - 0.4);
      lines = this.wrapText(text.trim(), font, fontSize, field.maxWidth);
    }
    if (lines.length > field.maxLines) lines = this.clampLines(lines, field.maxLines, font, fontSize, field.maxWidth);
    const firstLineY = y + ((lines.length - 1) * field.lineHeight) / 2;
    lines.forEach((line, index) => {
      const lineWidth = font.widthOfTextAtSize(line, fontSize);
      page.drawText(line, { x: field.centerX - lineWidth / 2, y: firstLineY - index * field.lineHeight, size: fontSize, font, color: CERTIFICATE_PDF_LAYOUT.colors.body });
    });
  }

  private clampLines(lines: string[], maxLines: number, font: PDFFont, size: number, maxWidth: number): string[] {
    const visible = lines.slice(0, maxLines);
    let lastLine = lines.slice(maxLines - 1).join(' ');
    while (lastLine.length && font.widthOfTextAtSize(`${lastLine}...`, size) > maxWidth) lastLine = lastLine.slice(0, -1).trimEnd();
    visible[maxLines - 1] = `${lastLine}...`;
    return visible;
  }

  private fitFontSize(text: string, font: PDFFont, preferredSize: number, maxWidth: number, minimumSize = 6.5): number {
    const width = font.widthOfTextAtSize(text, preferredSize);
    return width <= maxWidth ? preferredSize : Math.max(minimumSize, preferredSize * (maxWidth / width));
  }

  private formatDate(value: string | Date): string {
    const date = value instanceof Date ? value : new Date(value);
    return Number.isNaN(date.getTime())
      ? String(value)
      : new Intl.DateTimeFormat('en-GB', { day: '2-digit', month: 'long', year: 'numeric' }).format(date);
  }

  private getFileName(data: CertificateData): string {
    const maxLength = CERTIFICATE_PDF_LAYOUT.fileName.maxSlugLength;
    const slug = `${data.userName}-${data.trainingName}`.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, maxLength);
    return `${slug || CERTIFICATE_PDF_LAYOUT.fileName.fallback}.pdf`;
  }

  private toBlob(bytes: Uint8Array): Blob {
    return new Blob([bytes], { type: 'application/pdf' });
  }

  private validate(data: CertificateData): void {
    const required: Array<keyof CertificateData> = ['userName', 'trainingName', 'certificateNumber', 'location', 'trainerName', 'dateOfIssue'];
    const missing = required.filter((key) => !String(data[key] ?? '').trim());
    if (missing.length) throw new Error(`Missing certificate fields: ${missing.join(', ')}`);
  }
}







