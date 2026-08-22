import { Injectable } from '@angular/core';
import { PDFDocument, PDFFont, PDFPage, StandardFonts, rgb } from 'pdf-lib';

@Injectable({ providedIn: 'root' })
export class AssessmentPdfService {
  async download(title: string, data: any, entryNo?: string): Promise<void> {
    const pdf = await PDFDocument.create();
    const regular = await pdf.embedFont(StandardFonts.Helvetica);
    const bold = await pdf.embedFont(StandardFonts.HelveticaBold);
    const lines = this.toLines(data);

    let page = pdf.addPage([595.28, 841.89]);
    let y = this.drawHeader(page, regular, bold, title, entryNo, 790);

    for (const line of lines) {
      const wrapped = this.wrap(line, regular, 9.5, 505);
      for (const part of wrapped) {
        if (y < 58) {
          page = pdf.addPage([595.28, 841.89]);
          y = this.drawHeader(page, regular, bold, title, entryNo, 790);
        }
        page.drawText(part, {
          x: 45,
          y,
          size: 9.5,
          font: regular,
          color: rgb(0.16, 0.23, 0.32)
        });
        y -= 14;
      }
      y -= 2;
    }

    const bytes = await pdf.save();
    const blob = new Blob([bytes], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = `${this.safeFileName(entryNo || title)}.pdf`;
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    URL.revokeObjectURL(url);
  }

  private drawHeader(page: PDFPage, regular: PDFFont, bold: PDFFont, title: string, entryNo: string | undefined, y: number): number {
    page.drawRectangle({ x: 0, y: 795, width: 595.28, height: 47, color: rgb(0.07, 0.27, 0.52) });
    page.drawText('QLSS  |  GHAR 9001 ASSESSMENT', { x: 45, y: 817, size: 10, font: bold, color: rgb(1, 1, 1) });

    const titleLines = this.wrap(title, bold, 13, 505).slice(0, 2);
    let titleY = 776;
    titleLines.forEach((line) => {
      page.drawText(line, { x: 45, y: titleY, size: 13, font: bold, color: rgb(0.07, 0.16, 0.27) });
      titleY -= 16;
    });

    const entryY = titleY - 2;
    if (entryNo) {
      page.drawText(`Entry: ${entryNo}  |  Static non-editable PDF`, { x: 45, y: entryY, size: 9, font: regular, color: rgb(0.35, 0.43, 0.52) });
      return entryY - 19;
    }
    return Math.min(y - 40, entryY - 10);
  }

  private toLines(value: any, label = ''): string[] {
    if (value === null || value === undefined || value === '') return [];

    if (Array.isArray(value)) {
      const output: string[] = [];
      value.forEach((item, index) => {
        output.push(`${this.pretty(label || 'Item')} ${index + 1}`);
        output.push(...this.toLines(item, ''));
      });
      return output;
    }

    if (typeof value === 'object') {
      const output: string[] = [];
      Object.keys(value).forEach((key) => {
        const child = value[key];
        if (child === null || child === undefined || child === '') return;
        if (Array.isArray(child) || typeof child === 'object') {
          output.push(this.pretty(key));
          output.push(...this.toLines(child, key));
        } else {
          output.push(`${this.pretty(key)}: ${child}`);
        }
      });
      return output;
    }

    return [`${this.pretty(label)}: ${String(value)}`];
  }

  private pretty(value: string): string {
    return (value || 'Details')
      .replace(/([a-z])([A-Z])/g, '$1 $2')
      .replace(/_/g, ' ')
      .replace(/^./, (text) => text.toUpperCase());
  }

  private wrap(text: string, font: PDFFont, size: number, maxWidth: number): string[] {
    const words = String(text || '').split(/\s+/).filter(Boolean);
    const lines: string[] = [];
    let current = '';

    words.forEach((word) => {
      const candidate = current ? `${current} ${word}` : word;
      if (font.widthOfTextAtSize(candidate, size) <= maxWidth) {
        current = candidate;
      } else {
        if (current) lines.push(current);
        current = word;
      }
    });

    if (current) lines.push(current);
    return lines.length ? lines : [''];
  }

  private safeFileName(value: string): string {
    return String(value || 'Ghar9001_Assessment').replace(/[^a-zA-Z0-9._-]+/g, '_');
  }
}
