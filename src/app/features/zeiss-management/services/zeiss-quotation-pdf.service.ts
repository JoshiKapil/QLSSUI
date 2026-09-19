import { Injectable } from '@angular/core';
import { PDFDocument, rgb, StandardFonts, PDFFont, PDFPage } from 'pdf-lib';
import { ZeissQuotation } from '../models/zeiss-management.models';

@Injectable({ providedIn: 'root' })
export class ZeissQuotationPdfService {
  private readonly primaryColor = rgb(0.106, 0.263, 0.447); // #1b4372 Deep Navy Blue
  private readonly darkTextColor = rgb(0.11, 0.13, 0.14);  // #1c2023
  private readonly mutedTextColor = rgb(0.35, 0.38, 0.41);
  private readonly borderColor = rgb(0.78, 0.81, 0.84);
  private readonly headerBgColor = rgb(0.96, 0.96, 0.97);

  async buildBlob(quotation: ZeissQuotation): Promise<Blob> {
    const bytes = await this.build(quotation);
    return new Blob([bytes], { type: 'application/pdf' });
  }

  async build(quotation: ZeissQuotation): Promise<Uint8Array> {
    const pdfDoc = await PDFDocument.create();
    const fontRegular = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
    const fontOblique = await pdfDoc.embedFont(StandardFonts.HelveticaOblique);

    // Try to load and embed the QLSS logo
    let logoImage: any = null;
    try {
      const logoRes = await fetch('assets/logos/logo.png');
      if (logoRes.ok) {
        const logoBytes = await logoRes.arrayBuffer();
        logoImage = await pdfDoc.embedPng(logoBytes);
      }
    } catch {
      // Fallback if logo cannot be loaded in test or offline environment
    }

    // ==========================================
    // PAGE 1: Header, Customer & Quotation Meta, Product Details Table
    // ==========================================
    const page1 = pdfDoc.addPage([595.28, 841.89]); // A4
    const { width, height } = page1.getSize();
    const leftMargin = 45;
    const rightMargin = 550;
    const contentWidth = rightMargin - leftMargin;

    let y = height - 42;

    // Logo on Top Right
    if (logoImage) {
      const logoScale = 0.22;
      const logoWidth = logoImage.width * logoScale;
      const logoHeight = logoImage.height * logoScale;
      // Fit logo neatly within top right area
      const maxLogoW = 95;
      const maxLogoH = 45;
      const factor = Math.min(maxLogoW / logoWidth, maxLogoH / logoHeight, 1);
      const drawW = logoWidth * factor;
      const drawH = logoHeight * factor;
      page1.drawImage(logoImage, {
        x: rightMargin - drawW,
        y: y - drawH + 10,
        width: drawW,
        height: drawH,
      });
    }

    // Centered Company Header
    const companyTitle = 'QLSS BUSINESS CONSULTING LLP';
    const compW = fontBold.widthOfTextAtSize(companyTitle, 14);
    page1.drawText(companyTitle, {
      x: (width - compW) / 2,
      y: y - 5,
      size: 14,
      font: fontBold,
      color: this.darkTextColor,
    });

    const quotationTitle = 'QUOTATION';
    const quotW = fontBold.widthOfTextAtSize(quotationTitle, 13);
    const quotX = (width - quotW) / 2;
    const quotY = y - 24;
    page1.drawText(quotationTitle, {
      x: quotX,
      y: quotY,
      size: 13,
      font: fontBold,
      color: this.primaryColor,
    });
    // Underline beneath QUOTATION
    page1.drawLine({
      start: { x: quotX, y: quotY - 2 },
      end: { x: quotX + quotW, y: quotY - 2 },
      thickness: 1.2,
      color: this.primaryColor,
    });

    y -= 52;

    // Two-column Meta Area: Left = OFFER TO, Right = QUOTATION DATE / NUMBER
    const leftColX = leftMargin;
    const rightColX = 330;
    const metaStartY = y;

    // Left Column (Customer)
    page1.drawText('OFFER TO:', {
      x: leftColX,
      y: metaStartY,
      size: 9.5,
      font: fontBold,
      color: this.darkTextColor,
    });

    let leftY = metaStartY - 14;
    const custName = quotation.customerName || 'Customer';
    page1.drawText(custName, {
      x: leftColX,
      y: leftY,
      size: 9.5,
      font: fontBold,
      color: this.darkTextColor,
    });
    leftY -= 13;

    if (quotation.customerAddress) {
      const addressLines = this.wrapText(quotation.customerAddress, fontRegular, 8.5, 270);
      for (const line of addressLines.slice(0, 3)) {
        page1.drawText(line, {
          x: leftColX,
          y: leftY,
          size: 8.5,
          font: fontRegular,
          color: this.mutedTextColor,
        });
        leftY -= 12;
      }
    }

    if (quotation.customerEmail) {
      page1.drawText(`E-Mail: ${quotation.customerEmail}`, {
        x: leftColX,
        y: leftY,
        size: 8.5,
        font: fontRegular,
        color: this.mutedTextColor,
      });
      leftY -= 12;
    }

    if (quotation.contactPerson) {
      page1.drawText(`Kind Attention: ${quotation.contactPerson}`, {
        x: leftColX,
        y: leftY,
        size: 8.5,
        font: fontRegular,
        color: this.darkTextColor,
      });
      leftY -= 12;
    }

    // Right Column (Quotation details)
    let rightY = metaStartY;
    const qDateStr = this.formatDate(quotation.quotationDate);
    page1.drawText('QUOTATION DATE: ', {
      x: rightColX,
      y: rightY,
      size: 9.5,
      font: fontBold,
      color: this.darkTextColor,
    });
    page1.drawText(qDateStr, {
      x: rightColX + fontBold.widthOfTextAtSize('QUOTATION DATE: ', 9.5),
      y: rightY,
      size: 9.5,
      font: fontRegular,
      color: this.darkTextColor,
    });
    rightY -= 15;

    page1.drawText('QUOTATION NUMBER: ', {
      x: rightColX,
      y: rightY,
      size: 9.5,
      font: fontBold,
      color: this.darkTextColor,
    });
    page1.drawText(quotation.quotationNo || '', {
      x: rightColX + fontBold.widthOfTextAtSize('QUOTATION NUMBER: ', 9.5),
      y: rightY,
      size: 9.5,
      font: fontRegular,
      color: this.darkTextColor,
    });
    rightY -= 15;

    page1.drawText('Scope of Services: ', {
      x: rightColX,
      y: rightY,
      size: 9,
      font: fontBold,
      color: this.darkTextColor,
    });
    page1.drawText('Zeiss Accessories Supply', {
      x: rightColX + fontBold.widthOfTextAtSize('Scope of Services: ', 9),
      y: rightY,
      size: 9,
      font: fontRegular,
      color: this.darkTextColor,
    });
    rightY -= 14;

    y = Math.min(leftY, rightY) - 15;

    // Section: Product Details
    page1.drawText('Product Details', {
      x: leftMargin,
      y: y,
      size: 11,
      font: fontBold,
      color: this.primaryColor,
    });
    y -= 4;
    page1.drawLine({
      start: { x: leftMargin, y },
      end: { x: rightMargin, y },
      thickness: 1,
      color: this.primaryColor,
    });
    y -= 12;

    // Product Table
    // Columns: [Sr.No (35), Article No. & Description (245), Qty (40), Unit Price (92), Total Price (93)]
    const colWidths = [35, 245, 40, 92, 93];
    const colX = [
      leftMargin,
      leftMargin + colWidths[0],
      leftMargin + colWidths[0] + colWidths[1],
      leftMargin + colWidths[0] + colWidths[1] + colWidths[2],
      leftMargin + colWidths[0] + colWidths[1] + colWidths[2] + colWidths[3],
    ];
    const headerHeight = 22;

    // Draw Table Header
    page1.drawRectangle({
      x: leftMargin,
      y: y - headerHeight,
      width: contentWidth,
      height: headerHeight,
      color: this.headerBgColor,
      borderColor: this.borderColor,
      borderWidth: 0.75,
    });

    const headers = ['Sr.No.', 'Article No. & Description', 'Qty', 'Unit Price (INR)', 'Total Price (INR)'];
    // Sr.No.
    page1.drawText(headers[0], {
      x: colX[0] + (colWidths[0] - fontBold.widthOfTextAtSize(headers[0], 8.5)) / 2,
      y: y - 15,
      size: 8.5,
      font: fontBold,
      color: this.darkTextColor,
    });
    // Article No & Description
    page1.drawText(headers[1], {
      x: colX[1] + 8,
      y: y - 15,
      size: 8.5,
      font: fontBold,
      color: this.darkTextColor,
    });
    // Qty
    page1.drawText(headers[2], {
      x: colX[2] + (colWidths[2] - fontBold.widthOfTextAtSize(headers[2], 8.5)) / 2,
      y: y - 15,
      size: 8.5,
      font: fontBold,
      color: this.darkTextColor,
    });
    // Unit Price (INR)
    page1.drawText(headers[3], {
      x: colX[3] + colWidths[3] - fontBold.widthOfTextAtSize(headers[3], 8.5) - 8,
      y: y - 15,
      size: 8.5,
      font: fontBold,
      color: this.darkTextColor,
    });
    // Total Price (INR)
    page1.drawText(headers[4], {
      x: colX[4] + colWidths[4] - fontBold.widthOfTextAtSize(headers[4], 8.5) - 8,
      y: y - 15,
      size: 8.5,
      font: fontBold,
      color: this.darkTextColor,
    });

    // Column vertical divider lines in header
    for (let c = 1; c < colX.length; c++) {
      page1.drawLine({
        start: { x: colX[c], y },
        end: { x: colX[c], y: y - headerHeight },
        thickness: 0.75,
        color: this.borderColor,
      });
    }

    y -= headerHeight;

    // Table Data Rows
    const items = quotation.items || [];
    let grandTotal = 0;

    items.forEach((item, idx) => {
      const lineTotal = item.lineTotal ?? item.quantity * item.unitPrice;
      grandTotal += lineTotal;

      const descText = item.partDescription
        ? `${item.partNumber} / ${item.partDescription}`
        : item.partNumber || '';
      const wrappedDesc = this.wrapText(descText, fontRegular, 8.5, colWidths[1] - 16);
      const rowHeight = Math.max(22, wrappedDesc.length * 13 + 8);

      // Row background & border
      page1.drawRectangle({
        x: leftMargin,
        y: y - rowHeight,
        width: contentWidth,
        height: rowHeight,
        borderColor: this.borderColor,
        borderWidth: 0.75,
      });

      // Vertical separators
      for (let c = 1; c < colX.length; c++) {
        page1.drawLine({
          start: { x: colX[c], y },
          end: { x: colX[c], y: y - rowHeight },
          thickness: 0.75,
          color: this.borderColor,
        });
      }

      const textY = y - 15;
      // Sr.No.
      const srText = String(idx + 1);
      page1.drawText(srText, {
        x: colX[0] + (colWidths[0] - fontRegular.widthOfTextAtSize(srText, 8.5)) / 2,
        y: textY,
        size: 8.5,
        font: fontRegular,
        color: this.darkTextColor,
      });

      // Description lines
      let lineY = y - 14;
      wrappedDesc.forEach((line) => {
        page1.drawText(line, {
          x: colX[1] + 8,
          y: lineY,
          size: 8.5,
          font: fontRegular,
          color: this.darkTextColor,
        });
        lineY -= 12;
      });

      // Qty
      const qtyText = String(item.quantity);
      page1.drawText(qtyText, {
        x: colX[2] + (colWidths[2] - fontRegular.widthOfTextAtSize(qtyText, 8.5)) / 2,
        y: textY,
        size: 8.5,
        font: fontRegular,
        color: this.darkTextColor,
      });

      // Unit Price
      const unitPriceText = this.formatCurrency(item.unitPrice);
      page1.drawText(unitPriceText, {
        x: colX[3] + colWidths[3] - fontRegular.widthOfTextAtSize(unitPriceText, 8.5) - 8,
        y: textY,
        size: 8.5,
        font: fontRegular,
        color: this.darkTextColor,
      });

      // Total Price
      const totalPriceText = this.formatCurrency(lineTotal);
      page1.drawText(totalPriceText, {
        x: colX[4] + colWidths[4] - fontRegular.widthOfTextAtSize(totalPriceText, 8.5) - 8,
        y: textY,
        size: 8.5,
        font: fontRegular,
        color: this.darkTextColor,
      });

      y -= rowHeight;
    });

    // Grand Total Row
    const grandTotalHeight = 24;
    const finalTotal = quotation.taxableAmount || grandTotal;

    page1.drawRectangle({
      x: leftMargin,
      y: y - grandTotalHeight,
      width: contentWidth,
      height: grandTotalHeight,
      color: this.headerBgColor,
      borderColor: this.borderColor,
      borderWidth: 0.75,
    });

    // Divider before last column
    page1.drawLine({
      start: { x: colX[4], y },
      end: { x: colX[4], y: y - grandTotalHeight },
      thickness: 0.75,
      color: this.borderColor,
    });

    const grandTotalLabel = 'Grand Total (Excluding Taxes)';
    page1.drawText(grandTotalLabel, {
      x: colX[4] - fontBold.widthOfTextAtSize(grandTotalLabel, 9) - 14,
      y: y - 16,
      size: 9,
      font: fontBold,
      color: this.darkTextColor,
    });

    const grandTotalValueText = this.formatCurrency(finalTotal);
    page1.drawText(grandTotalValueText, {
      x: colX[4] + colWidths[4] - fontBold.widthOfTextAtSize(grandTotalValueText, 9) - 8,
      y: y - 16,
      size: 9,
      font: fontBold,
      color: this.darkTextColor,
    });

    y -= grandTotalHeight;

    // Optional Discount or Note on Page 1 if space permits
    if (quotation.discountAmount && quotation.discountAmount > 0) {
      y -= 14;
      page1.drawText(
        `* Includes special discount of INR ${this.formatCurrency(quotation.discountAmount)} (${quotation.discountPercent || 0}%).`,
        {
          x: leftMargin,
          y,
          size: 8,
          font: fontOblique,
          color: this.mutedTextColor,
        },
      );
    }

    // Page 1 Footer Note
    page1.drawText('Page 1 of 2  •  Continued on next page for Terms & Conditions', {
      x: (width - fontRegular.widthOfTextAtSize('Page 1 of 2  •  Continued on next page for Terms & Conditions', 8)) / 2,
      y: 24,
      size: 8,
      font: fontRegular,
      color: this.mutedTextColor,
    });

    // ==========================================
    // PAGE 2: Terms and Conditions, Customer Agreement, Contact Details
    // ==========================================
    const page2 = pdfDoc.addPage([595.28, 841.89]);
    let y2 = height - 42;

    // Optional Logo on Top Right of Page 2 as well for corporate consistency
    if (logoImage) {
      const logoScale = 0.16;
      const drawW = logoImage.width * logoScale;
      const drawH = logoImage.height * logoScale;
      page2.drawImage(logoImage, {
        x: rightMargin - drawW,
        y: y2 - drawH + 10,
        width: drawW,
        height: drawH,
      });
    }

    // Header on Page 2: Terms and Conditions
    page2.drawText('Terms and Conditions', {
      x: leftMargin,
      y: y2,
      size: 11.5,
      font: fontBold,
      color: this.primaryColor,
    });
    y2 -= 4;
    page2.drawLine({
      start: { x: leftMargin, y: y2 },
      end: { x: rightMargin, y: y2 },
      thickness: 1,
      color: this.primaryColor,
    });
    y2 -= 16;

    // 11 Standard Terms exactly as in Berry Automation reference
    const terms: Array<{ title: string; body: string }> = [
      {
        title: 'Prices:',
        body: `Prices quoted are net in Indian Rupees (INR), excluding packing, forwarding, and applicable taxes. GST @ ${quotation.taxPercent || 18}% or as applicable at the time of delivery is charged extra and borne by the Customer.`,
      },
      {
        title: 'Payment Terms:',
        body: quotation.paymentTerms || '100% of the total articles value shall be payable in advance against PI. Payments are to be made by DD / Cheque / ECS or Direct Transfer of funds.',
      },
      {
        title: 'Validity:',
        body: `This offer is valid for ${quotation.validityDays || 60} days from the date of quotation. The quotation is based on the valid technical documents available at the time of disclosing our quotation.`,
      },
      {
        title: 'Delivery:',
        body: quotation.deliveryTerms || 'Standard delivery period is 6-8 weeks (Ex-works) subject to receipt of payment as per the pre-agreed terms.',
      },
      {
        title: 'Transportation and Transit Insurance:',
        body: 'Transportation and transit insurance shall be managed until the delivery of the consignment to the specified address. Any possible product damage or loss during transportation is not covered by the warranty. It is advised to check the package content for compliance upon arrival.',
      },
      {
        title: 'Pandemic Regulations:',
        body: 'Due to the current pandemic and associated legal requirements, if employees cannot enter the site based on local regulations, agreed deadlines will be postponed analogous to Force Majeure regulations.',
      },
      {
        title: 'Export Control:',
        body: 'This quotation shall only become effective if the intended transaction does not infringe on applicable export control regulations (Indian, European, and US).',
      },
      {
        title: 'Cancellation:',
        body: 'Purchase orders once placed cannot be cancelled. In case of cancellation, the customer shall bear all incidental and consequential costs.',
      },
      {
        title: 'Confidentiality:',
        body: 'All the information received from the Customer is confidential and cannot be divulged to anyone, without a written and signed agreement.',
      },
      {
        title: 'Force Majeure:',
        body: 'The Purchase Order is subject to Force Majeure.',
      },
      {
        title: 'Arbitration & Jurisdiction:',
        body: 'Any dispute shall be mutually discussed and resolved. Jurisdiction applies appropriately.',
      },
    ];

    if (quotation.specialConditions) {
      terms.push({
        title: 'Special Conditions:',
        body: quotation.specialConditions,
      });
    }

    // Render terms with compact line heights to fit page 2 beautifully
    const termFontSize = 7.6;
    const termLineHeight = 10.5;

    for (const term of terms) {
      const fullText = `${term.title} ${term.body}`;
      const wrapped = this.wrapText(fullText, fontRegular, termFontSize, contentWidth);

      for (let i = 0; i < wrapped.length; i++) {
        const line = wrapped[i];
        if (i === 0) {
          // Highlight title in bold
          const titleWithSpace = `${term.title} `;
          const titleW = fontBold.widthOfTextAtSize(titleWithSpace, termFontSize);
          page2.drawText(titleWithSpace, {
            x: leftMargin,
            y: y2,
            size: termFontSize,
            font: fontBold,
            color: this.darkTextColor,
          });
          const restOfLine = line.substring(titleWithSpace.length);
          page2.drawText(restOfLine, {
            x: leftMargin + titleW,
            y: y2,
            size: termFontSize,
            font: fontRegular,
            color: this.darkTextColor,
          });
        } else {
          page2.drawText(line, {
            x: leftMargin,
            y: y2,
            size: termFontSize,
            font: fontRegular,
            color: this.darkTextColor,
          });
        }
        y2 -= termLineHeight;
      }
      y2 -= 3; // small gap between terms
    }

    y2 -= 8;

    // Section: Customer Acknowledgement & Agreement
    page2.drawText('Customer Acknowledgement & Agreement', {
      x: leftMargin,
      y: y2,
      size: 10.5,
      font: fontBold,
      color: this.primaryColor,
    });
    y2 -= 4;
    page2.drawLine({
      start: { x: leftMargin, y: y2 },
      end: { x: rightMargin, y: y2 },
      thickness: 0.8,
      color: this.primaryColor,
    });
    y2 -= 14;

    page2.drawText('I agree to the rates, terms, and conditions as mentioned to proceed for the project.', {
      x: leftMargin,
      y: y2,
      size: 8.5,
      font: fontRegular,
      color: this.darkTextColor,
    });
    y2 -= 20;

    page2.drawText('Signature: ___________________________', {
      x: leftMargin,
      y: y2,
      size: 8.5,
      font: fontRegular,
      color: this.darkTextColor,
    });
    y2 -= 16;

    page2.drawText('Client Name: _________________________', {
      x: leftMargin,
      y: y2,
      size: 8.5,
      font: fontRegular,
      color: this.darkTextColor,
    });
    y2 -= 16;

    page2.drawText('Date: ________________________________', {
      x: leftMargin,
      y: y2,
      size: 8.5,
      font: fontRegular,
      color: this.darkTextColor,
    });
    y2 -= 22;

    // Section: Contact Details
    page2.drawText('Contact Details', {
      x: leftMargin,
      y: y2,
      size: 10.5,
      font: fontBold,
      color: this.primaryColor,
    });
    y2 -= 4;
    page2.drawLine({
      start: { x: leftMargin, y: y2 },
      end: { x: rightMargin, y: y2 },
      thickness: 0.8,
      color: this.primaryColor,
    });
    y2 -= 14;

    page2.drawText(
      'Please do not hesitate to contact the following persons for further information and if there are questions regarding the offer:',
      {
        x: leftMargin,
        y: y2,
        size: 8,
        font: fontRegular,
        color: this.darkTextColor,
      },
    );
    y2 -= 14;

    page2.drawText('Pravin Halkikar / Bhushan Tarde', {
      x: leftMargin,
      y: y2,
      size: 9,
      font: fontBold,
      color: this.darkTextColor,
    });
    y2 -= 12;

    page2.drawText('Mobile: +91 9970707801 / 9763267921', {
      x: leftMargin,
      y: y2,
      size: 8.5,
      font: fontRegular,
      color: this.darkTextColor,
    });
    y2 -= 12;

    page2.drawText('E-mail: pravin.halkikar@qlssconsulting.com / consultant@qlssconsulting.com', {
      x: leftMargin,
      y: y2,
      size: 8.5,
      font: fontRegular,
      color: this.darkTextColor,
    });
    y2 -= 16;

    const closingMsg = `We look forward to a long-term cooperation with ${custName} and guarantee our full commitment for article delivery within the set time frame.`;
    const wrappedClosing = this.wrapText(closingMsg, fontOblique, 8.5, contentWidth);
    for (const cLine of wrappedClosing) {
      page2.drawText(cLine, {
        x: leftMargin,
        y: y2,
        size: 8.5,
        font: fontOblique,
        color: this.darkTextColor,
      });
      y2 -= 12;
    }

    // Page 2 Footer Note
    page2.drawText('Page 2 of 2  •  QLSS Business Consulting LLP', {
      x: (width - fontRegular.widthOfTextAtSize('Page 2 of 2  •  QLSS Business Consulting LLP', 8)) / 2,
      y: 24,
      size: 8,
      font: fontRegular,
      color: this.mutedTextColor,
    });

    return pdfDoc.save();
  }

  private wrapText(text: string, font: PDFFont, fontSize: number, maxWidth: number): string[] {
    if (!text) return [];
    const words = text.replace(/\r?\n/g, ' ').split(/\s+/);
    const lines: string[] = [];
    let currentLine = '';

    for (const word of words) {
      const testLine = currentLine ? `${currentLine} ${word}` : word;
      const textWidth = font.widthOfTextAtSize(testLine, fontSize);
      if (textWidth <= maxWidth) {
        currentLine = testLine;
      } else {
        if (currentLine) lines.push(currentLine);
        currentLine = word;
      }
    }
    if (currentLine) lines.push(currentLine);
    return lines;
  }

  private formatDate(val?: string | Date): string {
    if (!val) return new Date().toLocaleDateString('en-GB');
    const d = new Date(val);
    if (isNaN(d.getTime())) return String(val);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  }

  private formatCurrency(num?: number): string {
    if (num === null || num === undefined || isNaN(num)) return '0.00';
    return Number(num).toLocaleString('en-IN', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }
}

