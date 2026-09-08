import { Injectable } from '@angular/core';
import { PDFDocument, PDFPage, rgb } from 'pdf-lib';
import { PmLookup, PmQuotation } from '../models/project-management.models';

interface TextZoneOptions {
  x: number;
  y: number;
  width: number;
  height: number;
  fontSize: number;
  bold?: boolean;
  lineHeight?: number;
  maxLines?: number;
  align?: 'left' | 'center';
  paddingX?: number;
  paddingTop?: number;
}

@Injectable({ providedIn: 'root' })
export class QuotationPdfTemplateService {
  private readonly textFont = 'Calibri, Carlito, Arial, sans-serif';
  private readonly renderScale = 4;

  async build(quotation: PmQuotation, clients: PmLookup[]): Promise<Uint8Array> {
    const template = this.templateFor(quotation);
    const response = await fetch(template, { cache: 'no-store' });
    if (!response.ok) throw new Error('Quotation PDF template could not be loaded.');

    const pdf = await PDFDocument.load(await response.arrayBuffer());
    const pages = pdf.getPages();
    if (pages.length < 3) throw new Error('Quotation template must contain 3 pages.');

    await this.drawPageOne(pdf, pages[0], quotation);
    await this.drawPageTwo(pdf, pages[1], quotation);
    await this.drawClients(pdf, pages[2], clients);
    return pdf.save();
  }

  private templateFor(q: PmQuotation): string {
    const code = (q.categoryCode || '').toUpperCase();
    const name = (q.serviceType || '').toLowerCase();
    if (code === 'TRAINING' || name.includes('training')) {
      return 'assets/pm-templates/quotation/TrainingQuotationTemplate.pdf';
    }
    if (code.includes('IMPLEMENTATION') || name.includes('implementation')) {
      return 'assets/pm-templates/quotation/ImplementationQuotationTemplate.pdf';
    }
    return 'assets/pm-templates/quotation/OtherQuotationTemplate.pdf';
  }

  private async drawPageOne(pdf: PDFDocument, page: PDFPage, q: PmQuotation): Promise<void> {
    const categoryCode = (q.categoryCode || '').toUpperCase();
    const isTraining = categoryCode === 'TRAINING' || (q.serviceType || '').toLowerCase().includes('training');

    // Redraw complete logical rows instead of replacing only the placeholder text.
    // This prevents old template text remaining beside dynamic values.
    this.erase(page, 67, 721, 455, 28);
    await this.drawZone(
      pdf,
      page,
      `QUOTATION DATE/NUMBER: ${this.date(q.quotationDate)} - ${this.text(q.quotationNo)}`,
      { x: 72.45, y: 724, width: 430, height: 20, fontSize: 11, bold: true, maxLines: 1, paddingTop: 2.7 },
    );

    this.erase(page, 67, 606, 475, 67);
    await this.drawZone(pdf, page, this.text(q.customerName), {
      x: 72.45,
      y: 636,
      width: 455,
      height: 22,
      fontSize: 13,
      bold: true,
      maxLines: 1,
      paddingTop: 2,
    });

    const address = this.text(q.customerAddress || '');
    if (address) {
      await this.drawZone(pdf, page, address, {
        x: 72.45,
        y: 610,
        width: 455,
        height: 33,
        fontSize: 12,
        lineHeight: 14.2,
        maxLines: 2,
        paddingTop: 2.5,
      });
    }

    this.erase(page, 67, 582, 475, 29);
    const attention = this.text(q.contactPerson || '');
    await this.drawZone(pdf, page, `Kind Attention: Mr. ${attention}`.trim(), {
      x: 72.45,
      y: 590,
      width: 455,
      height: 22,
      fontSize: 13,
      bold: true,
      maxLines: 1,
      paddingTop: 2.1,
    });

    // Scope area: keep the approved heading but give long dynamic scope its own clean lines.
    this.erase(page, 67, 491, 480, 93);
    await this.drawZone(pdf, page, 'Scope of Services:', {
      x: 72.45,
      y: 554,
      width: 455,
      height: 24,
      fontSize: 16,
      bold: true,
      maxLines: 1,
      paddingTop: 0.5,
    });

    const serviceTitle = this.text(q.categoryValueName || q.serviceType || '');
    const scope = this.text(q.scope || serviceTitle);
    if (serviceTitle) {
      await this.drawZone(pdf, page, serviceTitle, {
        x: 72.45,
        y: 535,
        width: 455,
        height: 25,
        fontSize: isTraining ? 14 : 13,
        bold: true,
        maxLines: 1,
        paddingTop: 2,
      });
    }
    if (scope && scope.toLowerCase() !== serviceTitle.toLowerCase()) {
      await this.drawZone(pdf, page, scope, {
        x: 72.45,
        y: 496,
        width: 455,
        height: 45,
        fontSize: 10.8,
        lineHeight: 12.2,
        maxLines: 3,
        paddingTop: 3,
      });
    } else if (scope && !serviceTitle) {
      await this.drawZone(pdf, page, scope, {
        x: 72.45,
        y: 506,
        width: 455,
        height: 48,
        fontSize: 11.5,
        lineHeight: 13,
        maxLines: 3,
        paddingTop: 3,
      });
    }

    this.erase(page, 85, 194, 430, 31);
    await this.drawZone(pdf, page, `1.  Total Project Cost - ${this.money(q.professionalFees)} + Taxes`, {
      x: 90.45,
      y: 197,
      width: 410,
      height: 22,
      fontSize: 12,
      bold: true,
      maxLines: 1,
      paddingTop: 3,
    });

    this.erase(page, 67, 105, 480, 82);
    const payment = this.text(
      q.paymentTerms ||
        (isTraining
          ? '100% of the total contract value is due and payable immediately upon receipt of the invoice.'
          : '50% of the total contract value shall be payable in advance upon project confirmation, and the remaining 50% shall be payable after completion of the agreed scope of activities.'),
    );
    await this.drawZone(pdf, page, 'Payment Terms:', {
      x: 72.45,
      y: 157,
      width: 455,
      height: 21,
      fontSize: 12,
      bold: true,
      maxLines: 1,
      paddingTop: 3.5,
    });
    await this.drawZone(pdf, page, payment, {
      x: 72.45,
      y: 106,
      width: 455,
      height: 49,
      fontSize: 12,
      lineHeight: 14.6,
      maxLines: 3,
      paddingTop: 6.5,
    });
  }

  private async drawPageTwo(pdf: PDFDocument, page: PDFPage, q: PmQuotation): Promise<void> {
    // Replace the complete paragraph. Replacing only "Company Name" caused long names
    // to overlap the fixed sentence around the placeholder.
    this.erase(page, 67, 314, 485, 67);
    const company = this.text(q.customerName || 'Customer');
    const paragraph = `We look forward to a long-term cooperation with ${company} that will prove to be rewarding for both QLSS Business Consulting LLP and ${company}, and guarantee our full commitment and execution of the project within the set time frame.`;
    await this.drawZone(pdf, page, paragraph, {
      x: 72.45,
      y: 316,
      width: 470,
      height: 60,
      fontSize: 12,
      lineHeight: 14.6,
      maxLines: 4,
      paddingTop: 7.5,
    });
  }

  private async drawClients(pdf: PDFDocument, page: PDFPage, clients: PmLookup[]): Promise<void> {
    this.erase(page, 12, 105, 565, 650);
    const names = (clients || []).map((x) => this.text(x.name)).filter(Boolean);
    const rows = Math.max(1, Math.ceil(names.length / 2));
    const left = 18;
    const right = 577;
    const middle = 297.5;
    const top = 704;
    const bottomLimit = 104;
    const rowHeight = Math.max(10.5, Math.min(15, (top - bottomLimit) / rows));
    const fontSize = rowHeight <= 11 ? 6.6 : rowHeight <= 12.5 ? 7.1 : 7.6;

    await this.drawZone(pdf, page, 'Our Clients:', {
      x: 28,
      y: 710,
      width: 240,
      height: 20,
      fontSize: 10.5,
      bold: true,
      maxLines: 1,
    });

    page.drawRectangle({
      x: left,
      y: top - rows * rowHeight,
      width: right - left,
      height: rows * rowHeight,
      borderWidth: 0.7,
      borderColor: rgb(0.2, 0.2, 0.2),
    });
    page.drawLine({
      start: { x: middle, y: top },
      end: { x: middle, y: top - rows * rowHeight },
      thickness: 0.7,
      color: rgb(0.2, 0.2, 0.2),
    });

    for (let row = 0; row < rows; row++) {
      const yTop = top - row * rowHeight;
      if (row > 0) {
        page.drawLine({
          start: { x: left, y: yTop },
          end: { x: right, y: yTop },
          thickness: 0.45,
          color: rgb(0.35, 0.35, 0.35),
        });
      }
      const leftName = names[row * 2] || '';
      const rightName = names[row * 2 + 1] || '';
      const y = yTop - rowHeight + 0.8;
      if (leftName) {
        await this.drawZone(pdf, page, leftName.toUpperCase(), {
          x: 22,
          y,
          width: 268,
          height: rowHeight - 1,
          fontSize,
          bold: true,
          maxLines: 1,
          paddingTop: 1.3,
        });
      }
      if (rightName) {
        await this.drawZone(pdf, page, rightName.toUpperCase(), {
          x: 302,
          y,
          width: 268,
          height: rowHeight - 1,
          fontSize,
          bold: true,
          maxLines: 1,
          paddingTop: 1.3,
        });
      }
    }
  }

  private erase(page: PDFPage, x: number, y: number, width: number, height: number): void {
    page.drawRectangle({ x, y, width, height, color: rgb(1, 1, 1), borderWidth: 0 });
  }

  private async drawZone(pdf: PDFDocument, page: PDFPage, value: string, options: TextZoneOptions): Promise<void> {
    const clean = this.text(value);
    if (!clean) return;

    const scale = this.renderScale;
    const canvas = document.createElement('canvas');
    canvas.width = Math.max(1, Math.ceil(options.width * scale));
    canvas.height = Math.max(1, Math.ceil(options.height * scale));
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Browser canvas is unavailable for quotation PDF rendering.');

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#000000';
    ctx.textBaseline = 'top';

    const paddingX = (options.paddingX || 0) * scale;
    const paddingTop = (options.paddingTop || 0) * scale;
    const usableWidth = Math.max(1, canvas.width - paddingX * 2);
    const maxLines = Math.max(1, options.maxLines || 1);

    let fontSize = options.fontSize * scale;
    let lineHeight = (options.lineHeight || options.fontSize * 1.2) * scale;
    let lines: string[] = [];

    // Shrink only when necessary. This keeps normal values at the exact template size.
    for (let attempt = 0; attempt < 8; attempt++) {
      ctx.font = `${options.bold ? 700 : 400} ${fontSize}px ${this.textFont}`;
      lines = this.wrapCanvas(ctx, clean, usableWidth, maxLines);
      const tooWide = lines.some((line) => ctx.measureText(line).width > usableWidth + 1);
      const tooTall = lines.length * lineHeight > canvas.height - paddingTop;
      if (!tooWide && !tooTall) break;
      fontSize *= 0.94;
      lineHeight *= 0.94;
    }

    ctx.font = `${options.bold ? 700 : 400} ${fontSize}px ${this.textFont}`;
    lines.forEach((line, index) => {
      const measured = ctx.measureText(line).width;
      const x = options.align === 'center' ? Math.max(paddingX, (canvas.width - measured) / 2) : paddingX;
      ctx.fillText(line, x, paddingTop + index * lineHeight);
    });

    const png = await pdf.embedPng(canvas.toDataURL('image/png'));
    page.drawImage(png, { x: options.x, y: options.y, width: options.width, height: options.height });
    canvas.width = 1;
    canvas.height = 1;
  }

  private wrapCanvas(ctx: CanvasRenderingContext2D, value: string, maxWidth: number, maxLines: number): string[] {
    const words = value.replace(/\s+/g, ' ').trim().split(' ').filter(Boolean);
    const lines: string[] = [];
    let line = '';

    for (const word of words) {
      const next = line ? `${line} ${word}` : word;
      if (ctx.measureText(next).width <= maxWidth || !line) {
        line = next;
        continue;
      }

      lines.push(line);
      line = word;
      if (lines.length >= maxLines - 1) break;
    }

    if (line && lines.length < maxLines) lines.push(line);

    const consumed = lines.join(' ');
    if (consumed.length < value.length && lines.length) {
      let last = lines[lines.length - 1];
      while (last.length > 1 && ctx.measureText(`${last}...`).width > maxWidth) {
        last = last.slice(0, -1);
      }
      lines[lines.length - 1] = `${last.replace(/[\s.,;:-]+$/g, '')}...`;
    }
    return lines;
  }

  private date(value: string): string {
    const date = value ? new Date(value) : new Date();
    const dd = `${date.getDate()}`.padStart(2, '0');
    const mm = `${date.getMonth() + 1}`.padStart(2, '0');
    return `${dd}/${mm}/${date.getFullYear()}`;
  }

  private money(value: number): string {
    return new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 }).format(+value || 0);
  }

  private text(value: any): string {
    return `${value ?? ''}`
      .replace(/[\u2010-\u2015]/g, '-')
      .replace(/[^\x20-\x7E]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }
}
