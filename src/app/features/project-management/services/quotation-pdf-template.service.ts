import { Injectable } from '@angular/core';
import { PDFDocument, PDFFont, PDFPage, StandardFonts, rgb } from 'pdf-lib';
import { PmLookup, PmQuotation } from '../models/project-management.models';

@Injectable({ providedIn: 'root' })
export class QuotationPdfTemplateService {
  async build(quotation: PmQuotation, clients: PmLookup[]): Promise<Uint8Array> {
    const template = this.templateFor(quotation);
    const response = await fetch(template, { cache: 'no-store' });
    if (!response.ok) throw new Error('Quotation PDF template could not be loaded.');

    const pdf = await PDFDocument.load(await response.arrayBuffer());
    const regular = await pdf.embedFont(StandardFonts.Helvetica);
    const bold = await pdf.embedFont(StandardFonts.HelveticaBold);
    const pages = pdf.getPages();
    if (pages.length < 3) throw new Error('Quotation template must contain 3 pages.');

    this.drawPageOne(pages[0], regular, bold, quotation);
    this.drawPageTwo(pages[1], regular, bold, quotation);
    this.drawClients(pages[2], regular, bold, clients);
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

  private drawPageOne(page: PDFPage, regular: PDFFont, bold: PDFFont, q: PmQuotation): void {
    const categoryCode = (q.categoryCode || '').toUpperCase();
    const isTraining = categoryCode === 'TRAINING' || (q.serviceType || '').toLowerCase().includes('training');

    // Cover only the dynamic zones of the approved Word/PDF design.
    this.erase(page, 204, 727, 112, 18);
    this.erase(page, 68, 638, 455, 23);
    this.erase(page, 68, 616, 470, 23);
    this.erase(page, 176, 592, 355, 21);
    this.erase(page, 200, 196, 42, 25);
    this.erase(page, 68, 102, 472, 47);
    if (isTraining) this.erase(page, 68, 535, 470, 30);
    else this.erase(page, 199, 534, 340, 43);

    page.drawText(`${this.date(q.quotationDate)} - ${this.text(q.quotationNo)}`, { x: 207, y: 730, size: 10, font: bold, color: rgb(0, 0, 0) });
    page.drawText(this.fit(this.text(q.customerName), bold, 11, 430), { x: 71, y: 645, size: 11, font: bold });

    const address = this.lines(this.text(q.customerAddress || ''), regular, 9.5, 445, 2);
    address.forEach((line, i) => page.drawText(line, { x: 71, y: 628 - (i * 12), size: 9.5, font: regular }));

    page.drawText(this.fit(this.text(q.contactPerson || ''), bold, 9.5, 320), { x: 179, y: 598, size: 9.5, font: bold });

    const scopeValue = this.text(q.categoryValueName || q.scope || q.serviceType);
    const scope = this.text(q.scope || scopeValue);
    if (isTraining) {
      const title = this.fit(scopeValue, bold, 11, 450);
      page.drawText(title, { x: 71, y: 548, size: 11, font: bold });
      const extra = scopeValue.trim().toLowerCase() === scope.trim().toLowerCase() ? '' : scope;
      this.lines(extra, regular, 8.5, 450, 3).forEach((line, i) => page.drawText(line, { x: 71, y: 532 - (i * 10), size: 8.5, font: regular }));
    } else {
      const scopeLines = this.lines(scope, bold, 10.5, 350, 4);
      scopeLines.forEach((line, i) => page.drawText(line, { x: i === 0 ? 205 : 71, y: 561 - (i * 12), size: 10.5, font: bold }));
    }

    page.drawText(this.money(q.professionalFees), { x: 204, y: 205, size: 10.5, font: bold });

    const payment = this.text(q.paymentTerms || (isTraining
      ? '100% of the total contract value is due and payable immediately upon receipt of the invoice.'
      : '50% of the total contract value shall be payable in advance upon project confirmation, and the remaining 50% shall be payable after completion of the agreed scope of activities.'));
    this.lines(payment, regular, 9.2, 455, 4).forEach((line, i) => page.drawText(line, { x: 71, y: 132 - (i * 11), size: 9.2, font: regular }));
  }

  private drawPageTwo(page: PDFPage, regular: PDFFont, bold: PDFFont, q: PmQuotation): void {
    this.erase(page, 309, 349, 128, 20);
    this.erase(page, 276, 334, 128, 20);
    const company = this.fit(this.text(q.customerName), bold, 8.8, 110);
    page.drawText(company, { x: 313, y: 357, size: 8.8, font: bold });
    page.drawText(company, { x: 280, y: 342, size: 8.8, font: bold });
  }

  private drawClients(page: PDFPage, regular: PDFFont, bold: PDFFont, clients: PmLookup[]): void {
    this.erase(page, 12, 105, 565, 650);
    const names = (clients || []).map(x => this.text(x.name)).filter(Boolean);
    const rows = Math.max(1, Math.ceil(names.length / 2));
    const left = 18;
    const right = 577;
    const middle = 297.5;
    const top = 704;
    const bottomLimit = 104;
    const rowHeight = Math.max(10.5, Math.min(15, (top - bottomLimit) / rows));
    const fontSize = rowHeight <= 11 ? 6.6 : rowHeight <= 12.5 ? 7.1 : 7.6;

    page.drawText('Our Clients:', { x: 28, y: 720, size: 10.5, font: bold });
    page.drawRectangle({ x: left, y: top - (rows * rowHeight), width: right - left, height: rows * rowHeight, borderWidth: 0.7, borderColor: rgb(0.2, 0.2, 0.2) });
    page.drawLine({ start: { x: middle, y: top }, end: { x: middle, y: top - (rows * rowHeight) }, thickness: 0.7, color: rgb(0.2, 0.2, 0.2) });

    for (let row = 0; row < rows; row++) {
      const yTop = top - (row * rowHeight);
      if (row > 0) page.drawLine({ start: { x: left, y: yTop }, end: { x: right, y: yTop }, thickness: 0.45, color: rgb(0.35, 0.35, 0.35) });
      const leftName = names[row * 2] || '';
      const rightName = names[(row * 2) + 1] || '';
      const yText = yTop - rowHeight + Math.max(2.2, (rowHeight - fontSize) / 2);
      if (leftName) page.drawText(this.fit(leftName.toUpperCase(), bold, fontSize, 268), { x: 22, y: yText, size: fontSize, font: bold });
      if (rightName) page.drawText(this.fit(rightName.toUpperCase(), bold, fontSize, 268), { x: 302, y: yText, size: fontSize, font: bold });
    }
  }

  private erase(page: PDFPage, x: number, y: number, width: number, height: number): void {
    page.drawRectangle({ x, y, width, height, color: rgb(1, 1, 1), borderWidth: 0 });
  }

  private lines(value: string, font: PDFFont, size: number, maxWidth: number, maxLines: number): string[] {
    if (!value) return [];
    const words = value.replace(/\s+/g, ' ').trim().split(' ');
    const result: string[] = [];
    let line = '';
    for (const word of words) {
      const next = line ? `${line} ${word}` : word;
      if (font.widthOfTextAtSize(next, size) <= maxWidth) {
        line = next;
        continue;
      }
      if (line) result.push(line);
      line = word;
      if (result.length === maxLines - 1) break;
    }
    if (line && result.length < maxLines) result.push(line);
    if (result.length === maxLines && words.join(' ').length > result.join(' ').length) {
      let last = result[maxLines - 1];
      while (last.length > 3 && font.widthOfTextAtSize(`${last}...`, size) > maxWidth) last = last.slice(0, -1);
      result[maxLines - 1] = `${last}...`;
    }
    return result;
  }

  private fit(value: string, font: PDFFont, size: number, maxWidth: number): string {
    let result = value || '';
    while (result.length > 3 && font.widthOfTextAtSize(result, size) > maxWidth) result = result.slice(0, -1);
    return result.length < (value || '').length ? `${result.slice(0, -3)}...` : result;
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
    return `${value ?? ''}`.replace(/[\u2010-\u2015]/g, '-').replace(/[^\x20-\x7E]/g, ' ').replace(/\s+/g, ' ').trim();
  }
}
