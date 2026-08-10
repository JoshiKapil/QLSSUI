import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PDFDocument, PDFFont, PDFPage, RGB, StandardFonts, rgb } from 'pdf-lib';
import * as QRCode from 'qrcode';
import { CertificateData } from '../../../core/models/certificate-data.model';
import { CertificatePdfService } from '../../../core/services/certificate-pdf.service';

const PAGE = { width: 841.89, height: 595.28 };
const COLORS = {
  navy: rgb(0.02, 0.10, 0.32),
  blue: rgb(0.02, 0.42, 0.82),
  green: rgb(0.00, 0.42, 0.16),
  orange: rgb(1.00, 0.48, 0.02),
  gold: rgb(0.96, 0.66, 0.02),
  red: rgb(0.88, 0.05, 0.08),
  ink: rgb(0.08, 0.10, 0.15),
  muted: rgb(0.38, 0.43, 0.50),
  paper: rgb(1, 1, 1),
  soft: rgb(0.97, 0.98, 0.99),
  topic: rgb(0.99, 0.98, 0.94)
};

@Injectable()
export class VectorCertificatePdfService extends CertificatePdfService {
  constructor(http: HttpClient) {
    super(http);
  }

  override async generate(data: CertificateData): Promise<Uint8Array> {
    this.validateData(data);

    const document = await PDFDocument.create();
    const page = document.addPage([PAGE.width, PAGE.height]);
    const regular = await document.embedFont(StandardFonts.Helvetica);
    const bold = await document.embedFont(StandardFonts.HelveticaBold);
    const italic = await document.embedFont(StandardFonts.TimesRomanItalic);

    this.drawFrame(page);
    this.drawBrand(page, regular, bold);
    this.drawHeading(page, regular, bold);
    this.drawRecipient(page, data, regular, bold, italic);
    this.drawVectorTopics(page, data.coveredTopics, regular, bold);
    this.drawDetails(page, data, regular, bold);
    await this.drawVerification(page, document, data.certificateNumber, regular);
    this.drawFooter(page, regular);

    document.setTitle(`${data.trainingName} - ${data.userName}`);
    document.setSubject('Training completion certificate');
    document.setCreator('QLSS Vector Certificate Generator');
    document.setCreationDate(new Date());
    return document.save();
  }

  private drawFrame(page: PDFPage): void {
    page.drawRectangle({ x: 0, y: 0, width: PAGE.width, height: PAGE.height, color: COLORS.paper });
    page.drawRectangle({
      x: 18, y: 18, width: PAGE.width - 36, height: PAGE.height - 36,
      borderColor: COLORS.navy, borderWidth: 2.4
    });
    page.drawRectangle({
      x: 25, y: 25, width: PAGE.width - 50, height: PAGE.height - 50,
      borderColor: COLORS.orange, borderWidth: 0.8
    });

    page.drawRectangle({ x: 18, y: PAGE.height - 46, width: 165, height: 28, color: COLORS.green });
    page.drawRectangle({ x: PAGE.width - 183, y: PAGE.height - 46, width: 165, height: 28, color: COLORS.orange });
    page.drawRectangle({ x: 18, y: 18, width: PAGE.width - 36, height: 30, color: COLORS.navy });
  }

  private drawBrand(page: PDFPage, regular: PDFFont, bold: PDFFont): void {
    const x = 322;
    const y = 516;
    const size = 23;
    const gap = 4;
    const blocks = [
      { x, y: y + size + gap, color: COLORS.green, text: 'Q' },
      { x: x + size + gap, y: y + size + gap, color: COLORS.gold, text: 'L' },
      { x, y, color: COLORS.blue, text: '6' },
      { x: x + size + gap, y, color: COLORS.red, text: 'S' }
    ];
    blocks.forEach((block) => {
      page.drawRectangle({ x: block.x, y: block.y, width: size, height: size, color: block.color });
      this.center(page, block.text, bold, 9, block.x + size / 2, block.y + 7, COLORS.paper);
    });

    page.drawText('QLSS', { x: 382, y: 536, size: 32, font: bold, color: COLORS.blue });
    page.drawText('BUSINESS CONSULTING', { x: 383, y: 518, size: 10, font: regular, color: COLORS.navy });
    this.center(page, "LET'S IMPROVE", bold, 8, PAGE.width / 2, 497, COLORS.navy);
  }

  private drawHeading(page: PDFPage, regular: PDFFont, bold: PDFFont): void {
    this.center(page, 'CERTIFICATE', bold, 38, 385, 450, COLORS.navy);
    page.drawLine({ start: { x: 215, y: 435 }, end: { x: 305, y: 435 }, thickness: 1, color: COLORS.orange });
    page.drawLine({ start: { x: 465, y: 435 }, end: { x: 555, y: 435 }, thickness: 1, color: COLORS.orange });
    this.center(page, 'OF COMPLETION', bold, 19, 385, 425, COLORS.green);
    this.center(page, 'THIS IS TO CERTIFY THAT', regular, 11, 385, 398, COLORS.ink);
  }

  private drawRecipient(
    page: PDFPage,
    data: CertificateData,
    regular: PDFFont,
    bold: PDFFont,
    italic: PDFFont
  ): void {
    this.centerFitted(page, data.userName, italic, 35, 385, 354, COLORS.navy, 450, 23);
    this.center(page, this.completionText(data), regular, 10, 385, 326, COLORS.ink);
    this.centerFitted(page, data.trainingName.toUpperCase(), bold, 22, 385, 294, COLORS.green, 500, 14);
  }

  private drawVectorTopics(page: PDFPage, topics: string[], regular: PDFFont, bold: PDFFont): void {
    const panel = { x: 650, y: 180, width: 155, height: 300 };
    page.drawRectangle({
      ...panel,
      color: COLORS.topic,
      borderColor: COLORS.gold,
      borderWidth: 0.8
    });
    this.center(page, 'COVERED TOPICS', bold, 12, panel.x + panel.width / 2, 456, COLORS.navy);
    page.drawLine({
      start: { x: panel.x + 12, y: 447 },
      end: { x: panel.x + panel.width - 12, y: 447 },
      thickness: 1,
      color: COLORS.orange
    });

    const visible = topics.map((topic) => topic.trim()).filter(Boolean).slice(0, 7);
    const rowGap = visible.length > 1 ? Math.min(46, 235 / (visible.length - 1)) : 0;
    const bulletColors = [COLORS.green, COLORS.gold, COLORS.blue, COLORS.red];

    visible.forEach((topic, index) => {
      const rowY = 422 - index * rowGap;
      const lines = this.wrap(topic, regular, 8.2, 112).slice(0, 2);
      page.drawCircle({ x: panel.x + 16, y: rowY + 2, size: 2.8, color: bulletColors[index % bulletColors.length] });
      lines.forEach((line, lineIndex) => {
        page.drawText(line, {
          x: panel.x + 25,
          y: rowY - lineIndex * 9,
          size: 8.2,
          font: regular,
          color: COLORS.ink
        });
      });
      page.drawLine({
        start: { x: panel.x + 12, y: rowY - 14 },
        end: { x: panel.x + panel.width - 12, y: rowY - 14 },
        thickness: 0.5,
        color: COLORS.gold,
        dashArray: [1.2, 2]
      });
    });
  }

  private drawDetails(page: PDFPage, data: CertificateData, regular: PDFFont, bold: PDFFont): void {
    const panel = { x: 55, y: 115, width: 730, height: 70 };
    page.drawRectangle({
      ...panel,
      color: COLORS.soft,
      borderColor: COLORS.orange,
      borderWidth: 1.2
    });

    const fields = [
      { label: 'CERTIFICATE NO.', value: data.certificateNumber },
      { label: 'TRAINING HOURS', value: `${data.trainingHours} Hours` },
      { label: 'LOCATION', value: data.location },
      { label: 'TRAINER NAME', value: data.trainerName }
    ];
    const columnWidth = panel.width / fields.length;

    fields.forEach((field, index) => {
      const centerX = panel.x + columnWidth * index + columnWidth / 2;
      if (index > 0) {
        const separatorX = panel.x + columnWidth * index;
        page.drawLine({
          start: { x: separatorX, y: panel.y + 10 },
          end: { x: separatorX, y: panel.y + panel.height - 10 },
          thickness: 0.5,
          color: COLORS.orange,
          dashArray: [1.2, 2]
        });
      }
      this.center(page, field.label, bold, 7.2, centerX, 157, COLORS.navy);
      this.centerFitted(page, field.value, bold, 10, centerX, 132, COLORS.ink, columnWidth - 22, 7.5);
    });

    page.drawText('DATE OF ISSUE', { x: 75, y: 86, size: 7.5, font: bold, color: COLORS.navy });
    page.drawText(this.formatVectorDate(data.dateOfIssue), { x: 75, y: 70, size: 9, font: regular, color: COLORS.ink });

    page.drawLine({ start: { x: 337, y: 74 }, end: { x: 485, y: 74 }, thickness: 0.8, color: COLORS.orange });
    this.center(page, 'Authorized Signatory', regular, 9, 411, 58, COLORS.ink);
  }

  private async drawVerification(
    page: PDFPage,
    document: PDFDocument,
    certificateNumber: string,
    regular: PDFFont
  ): Promise<void> {
    const url = 'https://www.qlssconsulting.com/verify?certificate=' + encodeURIComponent(certificateNumber.trim());
    const dataUrl = await QRCode.toDataURL(url, {
      errorCorrectionLevel: 'M',
      margin: 4,
      width: 512,
      color: { dark: '#000000', light: '#FFFFFF' }
    });
    const qr = await document.embedPng(dataUrl);
    page.drawImage(qr, { x: 650, y: 50, width: 58, height: 58 });
    this.center(page, 'SCAN QR CODE TO VERIFY', regular, 5.8, 679, 43, COLORS.ink);
  }

  private drawFooter(page: PDFPage, regular: PDFFont): void {
    this.center(page, 'www.qlssconsulting.com', regular, 8.5, 205, 29, COLORS.paper);
    this.center(page, 'sales@qlssconsulting.com', regular, 8.5, 420, 29, COLORS.paper);
    this.center(page, '+91 8180955888 / +91 7058954942', regular, 8.5, 650, 29, COLORS.paper);
  }

  private completionText(data: CertificateData): string {
    alert(1)
    return 'has attended and successfully completed the assessment on';
    // if (data.completionType === 'attendance' || (data.marks ?? 100) < (data.passingMarks ?? 60)) {
    //   return 'has successfully attended the training program on';
    // }
    // return 'has successfully attended and completed the assessment on';
  }

  private center(page: PDFPage, text: string, font: PDFFont, size: number, x: number, y: number, color: RGB): void {
    page.drawText(text, { x: x - font.widthOfTextAtSize(text, size) / 2, y, size, font, color });
  }

  private centerFitted(
    page: PDFPage,
    text: string,
    font: PDFFont,
    preferredSize: number,
    x: number,
    y: number,
    color: RGB,
    maxWidth: number,
    minimumSize: number
  ): void {
    const width = font.widthOfTextAtSize(text, preferredSize);
    const size = width <= maxWidth ? preferredSize : Math.max(minimumSize, preferredSize * maxWidth / width);
    this.center(page, text, font, size, x, y, color);
  }

  private wrap(text: string, font: PDFFont, size: number, maxWidth: number): string[] {
    const lines: string[] = [];
    let current = '';
    text.split(/\s+/).filter(Boolean).forEach((word) => {
      const next = current ? `${current} ${word}` : word;
      if (!current || font.widthOfTextAtSize(next, size) <= maxWidth) {
        current = next;
      } else {
        lines.push(current);
        current = word;
      }
    });
    if (current) lines.push(current);
    return lines;
  }

  private formatVectorDate(value: string | Date): string {
    const date = value instanceof Date ? value : new Date(value);
    return Number.isNaN(date.getTime())
      ? String(value)
      : new Intl.DateTimeFormat('en-GB', {
          day: '2-digit',
          month: 'long',
          year: 'numeric'
        }).format(date);
  }

  private validateData(data: CertificateData): void {
    const required: Array<keyof CertificateData> = [
      'userName',
      'trainingName',
      'certificateNumber',
      'location',
      'trainerName',
      'dateOfIssue'
    ];
    const missing = required.filter((key) => !String(data[key] ?? '').trim());
    if (missing.length) {
      throw new Error(`Missing certificate fields: ${missing.join(', ')}`);
    }
  }
}
