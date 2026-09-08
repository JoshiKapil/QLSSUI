import { Injectable } from '@angular/core';
import { PDFDocument, PDFFont, PDFPage, RGB, StandardFonts, rgb } from 'pdf-lib';

interface PdfState {
  document: PDFDocument;
  regular: PDFFont;
  bold: PDFFont;
  pages: PDFPage[];
  page: PDFPage;
  y: number;
  reportNo: string;
}

interface Field {
  label: string;
  value: string;
}

interface ReportProfile {
  detailTitle: string;
  detailSubtitle: string;
}

@Injectable({ providedIn: 'root' })
export class AssessmentPdfService {
  private readonly width = 595.28;
  private readonly height = 841.89;
  private readonly margin = 48;
  // High-contrast professional palette shared by every GHAR assessment PDF.
  private readonly navy = rgb(0.035, 0.12, 0.22);
  private readonly teal = rgb(0.0, 0.38, 0.42);
  private readonly ink = rgb(0.035, 0.045, 0.055);
  private readonly muted = rgb(0.2, 0.23, 0.27);
  private readonly line = rgb(0.68, 0.72, 0.76);
  private readonly pale = rgb(0.94, 0.95, 0.96);
  private readonly green = rgb(0.86, 0.94, 0.89);
  private readonly amber = rgb(1.0, 0.92, 0.72);
  private readonly red = rgb(0.98, 0.84, 0.84);

  async download(title: string, data: any, entryNo?: string): Promise<void> {
    const bytes = await this.generate(title, data, entryNo);
    const url = URL.createObjectURL(new Blob([bytes], { type: 'application/pdf' }));
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = `${this.safeFileName(entryNo || title)}.pdf`;
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    URL.revokeObjectURL(url);
  }

  async downloadBlank(title: string, data: any): Promise<void> {
    const bytes = await this.generate(title, this.blankTemplateData(data), 'BLANK FORM', true);
    const url = URL.createObjectURL(new Blob([bytes], { type: 'application/pdf' }));
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = `${this.safeFileName(title)}_Blank_Form.pdf`;
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    URL.revokeObjectURL(url);
  }

  async generate(title: string, data: any, entryNo?: string, blank = false): Promise<Uint8Array> {
    const document = await PDFDocument.create();
    const regular = await document.embedFont(StandardFonts.Helvetica);
    const bold = await document.embedFont(StandardFonts.HelveticaBold);
    const page = document.addPage([this.width, this.height]);
    const state: PdfState = { document, regular, bold, pages: [page], page, y: 690, reportNo: entryNo || 'DRAFT' };

    if (blank) this.standardReport(state, title, data, true);
    else if (/weekly\s*5s/i.test(title) || Array.isArray(data?.criteria)) this.weeklyReport(state, data);
    else this.standardReport(state, title, data);

    this.chrome(state);
    document.setTitle(`${title} - Assessment Report`);
    document.setAuthor('eKRUPA IMS | QLSS Business Consulting');
    document.setSubject('GHAR 9001 Assessment Report');
    document.setCreator('eKRUPA IMS');
    return document.save();
  }

  private weeklyReport(s: PdfState, data: any): void {
    this.heading(s, 'Weekly 5S Family Patrol');
    const criteria = Array.isArray(data?.criteria) ? data.criteria : [];
    const scores = criteria.map((item: any) => this.score(item?.score));
    const total = scores.reduce((sum: number, value: number) => sum + value, 0);
    const maximum = Math.max(criteria.length * 5, 25);
    const percent = maximum ? Math.round((total * 100) / maximum) : 0;
    const status = percent >= 80 ? 'COMPLETED' : percent >= 60 ? 'REVIEW' : 'ACTION REQUIRED';
    this.reportStrip(s, [
      { label: 'REPORT NUMBER', value: s.reportNo },
      { label: 'ASSESSMENT DATE', value: this.date(data?.date) },
      { label: 'STATUS', value: status },
    ]);
    s.y -= 16;
    this.overview(
      s,
      [
        { label: 'Area Audited', value: this.value(data?.areaAudited) },
        { label: 'Lead Auditor', value: this.value(data?.leadAuditor) },
        { label: 'Area Owner', value: this.value(data?.areaOwner) },
        { label: 'Assessment Type', value: 'Weekly 5S Family Patrol' },
      ],
      percent,
      `${total} / ${maximum} POINTS`,
    );
    s.y -= 18;
    this.section(s, '5S PERFORMANCE SUMMARY');
    this.scoreTable(
      s,
      criteria.map((item: any, index: number) => [
        this.value(item?.pillar, `${index + 1}. 5S Pillar`),
        String(scores[index]),
        '5',
        this.performance(scores[index]),
      ]),
      total,
      maximum,
      percent,
    );

    const good = criteria
      .filter((_item: any, i: number) => scores[i] >= 4)
      .map((item: any) => this.value(item?.pillar).replace(/^\d+\.\s*/, ''));
    const weakIndex = scores.length ? scores.indexOf(Math.min(...scores)) : -1;
    const weak =
      weakIndex < 0 ? 'No assessment data' : this.value(criteria[weakIndex]?.pillar).replace(/^\d+\.\s*/, '');
    s.y -= 14;
    this.callouts(
      s,
      'WHAT IS WORKING WELL',
      good.join(', ') || 'Complete the assessment to see strengths',
      'IMPROVEMENT FOCUS',
      weak,
    );
    s.y -= 12;
    this.paragraph(
      s,
      `Assessment conclusion: The audited area achieved ${percent}%. Overall 5S discipline is ${this.overall(percent).toLowerCase()}. The main opportunity is to strengthen ${weak} through a clearly owned corrective action and follow-up during the next patrol.`,
      8.2,
      this.muted,
      12,
    );
    s.y -= 13;
    this.section(s, 'REPORT VALIDATION');
    this.validation(s, [
      { label: 'Lead Auditor', value: this.value(data?.leadAuditor) },
      { label: 'Area Owner', value: this.value(data?.areaOwner) },
      { label: 'Status', value: status },
    ]);
    s.y -= 13;
    this.paragraph(
      s,
      'This system-generated report is intended for controlled client download and review. No manual signature is required.',
      7.4,
      this.muted,
      10,
    );

    this.newPage(s);
    this.section(s, 'DETAILED ASSESSMENT', 'Criteria, scores and auditor remarks');
    this.paragraph(
      s,
      'Detailed evidence for each 5S pillar. Scores are retained exactly as recorded in the assessment.',
      8.2,
      this.muted,
      11,
    );
    s.y -= 14;
    criteria.forEach((item: any, index: number) =>
      this.detailCard(
        s,
        index + 1,
        this.value(item?.pillar),
        scores[index],
        this.value(item?.checkpoint),
        this.value(item?.remarks),
      ),
    );
    s.page.drawText('END OF REPORT', { x: 247, y: Math.max(s.y - 3, 48), size: 7, font: s.bold, color: this.muted });
  }

  private standardReport(s: PdfState, title: string, data: any, blank = false): void {
    const name = title.replace(/^Ghar 9001:\s*/i, '');
    const profile = this.reportProfile(title);
    const status = blank ? 'TO BE COMPLETED' : 'COMPLETED';
    this.heading(s, name, blank ? 'Printable Blank Assessment Form' : 'Assessment Report');
    this.reportStrip(s, [
      { label: 'REPORT NUMBER', value: s.reportNo },
      {
        label: 'ASSESSMENT DATE',
        value: blank
          ? '________________'
          : this.date(data?.date || data?.dateTime || data?.monthYear || (data?.year ? `${data.year}-01-01` : '')),
      },
      { label: 'STATUS', value: status },
    ]);
    const overview = this.topFields(data);
    if (overview.length) {
      s.y -= 17;
      this.section(s, 'ASSESSMENT OVERVIEW');
      this.fieldGrid(s, overview);
    }
    [
      { key: 'rows', title: profile.detailTitle, subtitle: profile.detailSubtitle },
      { key: 'actionItems', title: 'ACTION ITEMS', subtitle: 'Agreed responsibilities and target completion dates' },
      { key: 'criteria', title: 'ASSESSMENT CRITERIA', subtitle: 'Recorded scores and evidence' },
    ].forEach((group) => {
      const rows = Array.isArray(data?.[group.key]) ? data[group.key] : [];
      if (!rows.length) return;
      s.y -= 16;
      this.ensure(s, 85);
      this.section(s, group.title, group.subtitle);
      rows.forEach((row: any, index: number) => this.recordCard(s, index + 1, row));
    });
    s.y -= 15;
    this.ensure(s, 85);
    this.section(s, 'REPORT VALIDATION');
    this.validation(s, [
      { label: 'Assessment', value: name },
      { label: 'Report Number', value: s.reportNo },
      { label: 'Status', value: status },
    ]);
    s.y -= 13;
    this.paragraph(
      s,
      blank
        ? 'Print this form and complete all applicable fields by hand. Retain the completed copy as a controlled family record.'
        : 'This system-generated report is intended for controlled client download and review. No manual signature is required.',
      7.4,
      this.muted,
      10,
    );
  }

  private heading(s: PdfState, title: string, subtitle = 'Assessment Report'): void {
    s.page.drawText('GHAR 9001', { x: this.margin, y: 743, size: 8, font: s.bold, color: this.teal });
    let y = 718;
    this.wrap(title, s.bold, 21, 470)
      .slice(0, 2)
      .forEach((line) => {
        s.page.drawText(line, { x: this.margin, y, size: 21, font: s.bold, color: this.ink });
        y -= 24;
      });
    s.page.drawText(subtitle, { x: this.margin, y: y - 1, size: 10, font: s.regular, color: this.muted });
    s.y = y - 28;
  }

  private reportStrip(s: PdfState, fields: Field[]): void {
    const cellWidth = (this.width - this.margin * 2) / fields.length;
    const y = s.y - 45;
    fields.forEach((field, index) => {
      const x = this.margin + index * cellWidth;
      s.page.drawRectangle({
        x,
        y,
        width: cellWidth,
        height: 45,
        color: this.pale,
        borderColor: this.line,
        borderWidth: 0.6,
      });
      s.page.drawText(field.label, { x: x + 10, y: y + 29, size: 6.7, font: s.bold, color: this.muted });
      s.page.drawText(this.fit(field.value, s.bold, 9.2, cellWidth - 20), {
        x: x + 10,
        y: y + 12,
        size: 9.2,
        font: s.bold,
        color: index === fields.length - 1 ? this.teal : this.ink,
      });
    });
    s.y = y;
  }

  private overview(s: PdfState, fields: Field[], percent: number, points: string): void {
    const y = s.y - 105;
    s.page.drawRectangle({ x: this.margin, y, width: 499, height: 105, borderColor: this.line, borderWidth: 0.7 });
    s.page.drawLine({ start: { x: 363, y }, end: { x: 363, y: y + 105 }, color: this.line, thickness: 0.7 });
    fields.forEach((field, index) => {
      const rowY = y + 78 - index * 23;
      if (index)
        s.page.drawLine({
          start: { x: this.margin, y: rowY + 15 },
          end: { x: 363, y: rowY + 15 },
          color: this.line,
          thickness: 0.55,
        });
      s.page.drawText(field.label, { x: 58, y: rowY, size: 7.3, font: s.bold, color: this.muted });
      s.page.drawText(this.fit(field.value, s.regular, 8.5, 190), {
        x: 156,
        y: rowY,
        size: 8.5,
        font: s.regular,
        color: this.ink,
      });
    });
    this.ring(s.page, 455, y + 62, percent);
    this.center(s.page, `${percent}%`, 455, y + 56, 18, s.bold, this.ink);
    this.center(s.page, 'OVERALL PERFORMANCE', 455, y + 19, 6.7, s.bold, this.muted);
    this.center(s.page, points, 455, y + 7, 7.7, s.bold, this.ink);
    s.y = y;
  }

  private ring(page: PDFPage, cx: number, cy: number, percent: number): void {
    const segments = 72;
    const active = Math.round((Math.max(0, Math.min(100, percent)) * segments) / 100);
    for (let i = 0; i < segments; i += 1) {
      const a = -Math.PI / 2 + (i * Math.PI * 2) / segments;
      const b = -Math.PI / 2 + ((i + 0.72) * Math.PI * 2) / segments;
      page.drawLine({
        start: { x: cx + Math.cos(a) * 33, y: cy + Math.sin(a) * 33 },
        end: { x: cx + Math.cos(b) * 33, y: cy + Math.sin(b) * 33 },
        thickness: 6,
        color: i < active ? this.teal : rgb(0.88, 0.91, 0.94),
      });
    }
  }

  private scoreTable(s: PdfState, rows: string[][], total: number, max: number, percent: number): void {
    const columns = [230, 72, 68, 129];
    const rowHeight = 25;
    this.tableRow(s, s.y - rowHeight, columns, ['5S PILLAR', 'SCORE', 'MAX', 'PERFORMANCE'], this.pale, true);
    rows.forEach((row, index) =>
      this.tableRow(s, s.y - rowHeight * (index + 2), columns, row, rgb(1, 1, 1), false, this.badge(Number(row[1]))),
    );
    const y = s.y - rowHeight * (rows.length + 2);
    this.tableRow(
      s,
      y,
      columns,
      ['Total', String(total), String(max), `${percent}% - ${this.overall(percent)}`],
      this.pale,
      true,
      this.green,
    );
    s.y = y;
  }

  private tableRow(
    s: PdfState,
    y: number,
    widths: number[],
    values: string[],
    fill: RGB,
    bold: boolean,
    finalFill?: RGB,
  ): void {
    let x = this.margin;
    values.forEach((value, index) => {
      s.page.drawRectangle({
        x,
        y,
        width: widths[index],
        height: 25,
        color: index === values.length - 1 && finalFill ? finalFill : fill,
        borderColor: this.line,
        borderWidth: 0.55,
      });
      const font = bold ? s.bold : s.regular;
      s.page.drawText(this.fit(value, font, 7.3, widths[index] - 16), {
        x: x + 8,
        y: y + 9,
        size: 7.3,
        font,
        color: index === values.length - 1 ? this.teal : this.ink,
      });
      x += widths[index];
    });
  }

  private callouts(s: PdfState, leftTitle: string, left: string, rightTitle: string, right: string): void {
    const cellWidth = 249.5;
    [
      [leftTitle, left, this.green],
      [rightTitle, right, this.amber],
    ].forEach((item: any[], index) => {
      const x = this.margin + index * cellWidth;
      s.page.drawRectangle({
        x,
        y: s.y - 44,
        width: cellWidth,
        height: 44,
        color: item[2],
        borderColor: this.line,
        borderWidth: 0.55,
      });
      s.page.drawText(item[0], { x: x + 10, y: s.y - 16, size: 6.7, font: s.bold, color: this.muted });
      s.page.drawText(this.fit(item[1], s.bold, 8.1, cellWidth - 20), {
        x: x + 10,
        y: s.y - 33,
        size: 8.1,
        font: s.bold,
        color: this.ink,
      });
    });
    s.y -= 44;
  }

  private validation(s: PdfState, fields: Field[]): void {
    const cellWidth = 499 / fields.length;
    fields.forEach((field, index) => {
      const x = this.margin + index * cellWidth;
      s.page.drawRectangle({
        x,
        y: s.y - 42,
        width: cellWidth,
        height: 42,
        color: index === fields.length - 1 ? this.green : rgb(1, 1, 1),
        borderColor: this.line,
        borderWidth: 0.55,
      });
      s.page.drawText(field.label.toUpperCase(), { x: x + 9, y: s.y - 15, size: 6.3, font: s.bold, color: this.muted });
      s.page.drawText(this.fit(field.value, s.bold, 8, cellWidth - 18), {
        x: x + 9,
        y: s.y - 32,
        size: 8,
        font: s.bold,
        color: index === fields.length - 1 ? this.teal : this.ink,
      });
    });
    s.y -= 42;
  }

  private detailCard(
    s: PdfState,
    index: number,
    title: string,
    score: number,
    checkpoint: string,
    remarks: string,
  ): void {
    const checkpointLines = this.wrap(checkpoint, s.regular, 8, 455);
    const remarkLines = this.wrap(remarks, s.regular, 8, 455);
    const height = 76 + (checkpointLines.length + remarkLines.length) * 9;
    this.ensure(s, height + 10);
    const y = s.y - height;
    s.page.drawRectangle({ x: this.margin, y, width: 499, height, borderColor: this.line, borderWidth: 0.7 });
    s.page.drawText(String(index).padStart(2, '0'), { x: 60, y: s.y - 21, size: 10, font: s.bold, color: this.teal });
    s.page.drawText(this.fit(title.toUpperCase(), s.bold, 11, 310), {
      x: 91,
      y: s.y - 21,
      size: 11,
      font: s.bold,
      color: this.ink,
    });
    s.page.drawRectangle({
      x: 403,
      y: s.y - 34,
      width: 62,
      height: 26,
      color: this.pale,
      borderColor: this.line,
      borderWidth: 0.5,
    });
    s.page.drawText(`${score} / 5`, { x: 421, y: s.y - 25, size: 8.5, font: s.bold, color: this.ink });
    s.page.drawRectangle({
      x: 465,
      y: s.y - 34,
      width: 82,
      height: 26,
      color: this.badge(score),
      borderColor: this.line,
      borderWidth: 0.5,
    });
    this.center(s.page, this.performance(score), 506, s.y - 25, 6, s.bold, score >= 4 ? this.teal : this.ink);
    let textY = s.y - 52;
    textY = this.labelledLines(s, 'CHECKPOINT', checkpointLines, textY);
    this.labelledLines(s, 'AUDITOR REMARKS', remarkLines, textY - 4);
    s.y = y - 10;
  }

  private recordCard(s: PdfState, index: number, row: any): void {
    const keys = Object.keys(row || {});
    const headingKey =
      keys.find((key) =>
        ['pillar', 'category', 'zone', 'waste', 'indicator', 'failureMode', 'actionItem', 'equipment'].includes(key),
      ) || keys[0];
    const heading = headingKey ? this.value(row[headingKey], `Record ${index}`) : `Record ${index}`;
    const fields = keys
      .filter((key) => key !== headingKey)
      .map((key) => ({ label: this.pretty(key), value: this.recordValue(key, row[key]) }));
    const badge = this.recordBadge(row);
    const lines = fields.reduce(
      (count, field) => count + this.wrap(`${field.label}: ${field.value}`, s.regular, 7.5, 465).length,
      0,
    );
    const height = Math.max(52, 31 + lines * 10);
    this.ensure(s, height + 8);
    const y = s.y - height;
    s.page.drawRectangle({
      x: this.margin,
      y,
      width: 499,
      height,
      color: index % 2 ? rgb(1, 1, 1) : this.pale,
      borderColor: this.line,
      borderWidth: 0.6,
    });
    s.page.drawText(String(index).padStart(2, '0'), { x: 58, y: s.y - 19, size: 8.5, font: s.bold, color: this.teal });
    s.page.drawText(this.fit(heading, s.bold, 9.2, badge ? 342 : 445), {
      x: 86,
      y: s.y - 19,
      size: 9.2,
      font: s.bold,
      color: this.ink,
    });
    if (badge) {
      const badgeWidth = 92;
      const badgeX = this.margin + 499 - badgeWidth;
      s.page.drawRectangle({
        x: badgeX,
        y: s.y - 29,
        width: badgeWidth,
        height: 23,
        color: badge.color,
        borderColor: this.line,
        borderWidth: 0.5,
      });
      this.center(s.page, badge.text, badgeX + badgeWidth / 2, s.y - 21, 6.2, s.bold, badge.textColor);
    }
    let textY = s.y - 35;
    fields.forEach((field) =>
      this.wrap(`${field.label}: ${field.value}`, s.regular, 7.5, 465).forEach((line) => {
        s.page.drawText(line, { x: 58, y: textY, size: 7.5, font: s.regular, color: this.ink });
        textY -= 10;
      }),
    );
    s.y = y - 8;
  }

  private fieldGrid(s: PdfState, fields: Field[]): void {
    for (let index = 0; index < fields.length; index += 2) {
      const pair = fields.slice(index, index + 2);
      const height = 34 + Math.max(...pair.map((f) => this.wrap(f.value, s.regular, 8, 229).length), 1) * 9;
      this.ensure(s, height);
      pair.forEach((field, column) => {
        const x = this.margin + column * 249.5;
        s.page.drawRectangle({
          x,
          y: s.y - height,
          width: 249.5,
          height,
          color: column ? this.pale : rgb(1, 1, 1),
          borderColor: this.line,
          borderWidth: 0.55,
        });
        s.page.drawText(field.label.toUpperCase(), {
          x: x + 10,
          y: s.y - 15,
          size: 6.3,
          font: s.bold,
          color: this.muted,
        });
        let y = s.y - 29;
        this.wrap(field.value, s.regular, 8, 229).forEach((line) => {
          s.page.drawText(line, { x: x + 10, y, size: 8, font: s.regular, color: this.ink });
          y -= 9;
        });
      });
      s.y -= height;
    }
  }

  private topFields(data: any): Field[] {
    const omitted = new Set(['rows', 'criteria', 'actionItems']);
    return Object.keys(data || {})
      .filter(
        (key) =>
          !omitted.has(key) &&
          !Array.isArray(data[key]) &&
          data[key] !== null &&
          data[key] !== undefined &&
          data[key] !== '',
      )
      .map((key) => ({ label: this.pretty(key), value: this.value(data[key]) }));
  }

  private blankTemplateData(data: any): any {
    const preserved = new Set([
      'objective',
      'pillar',
      'checkpoint',
      'category',
      'equipment',
      'actionRequired',
      'frequency',
      'zone',
      'hazard',
      'translation',
      'waste',
      'indicator',
      'targetStandard',
      'comparison',
    ]);
    const blankLine = '________________________________';
    const copy = (value: any, key = ''): any => {
      if (Array.isArray(value)) return value.map((item) => copy(item, key));
      if (value && typeof value === 'object') {
        const output: any = {};
        Object.keys(value).forEach((childKey) => {
          output[childKey] = copy(value[childKey], childKey);
        });
        return output;
      }
      return preserved.has(key) ? value : blankLine;
    };
    return copy(data);
  }

  private reportProfile(title: string): ReportProfile {
    if (/preventive maintenance|pm matrix/i.test(title))
      return {
        detailTitle: 'PREVENTIVE MAINTENANCE REGISTER',
        detailSubtitle: 'Equipment, planned action, frequency, due date and accountable family member',
      };
    if (/management review|\bfmr\b/i.test(title))
      return {
        detailTitle: 'FAMILY MANAGEMENT REVIEW RECORD',
        detailSubtitle: 'Review inputs, decisions, assigned actions and completion ownership',
      };
    if (/capa|fmea|corrective action/i.test(title))
      return {
        detailTitle: 'CAPA / FMEA ACTION REGISTER',
        detailSubtitle: 'Failure modes, root causes, impacts and preventive actions',
      };
    if (/safety|environment|\behs\b/i.test(title))
      return {
        detailTitle: 'HAZARD IDENTIFICATION & CONTROL REGISTER',
        detailSubtitle: 'Household hazards, risk classification, checkpoints and controls',
      };
    if (/muda|8 wastes/i.test(title))
      return {
        detailTitle: '8 WASTES OBSERVATION REGISTER',
        detailSubtitle: 'Observed household waste, improvement opportunity and risk level',
      };
    if (/\bkpi\b|dashboard/i.test(title))
      return {
        detailTitle: 'MONTHLY KPI PERFORMANCE REGISTER',
        detailSubtitle: 'Targets, monthly actuals, status and corrective action tracking',
      };
    return {
      detailTitle: 'DETAILED ASSESSMENT',
      detailSubtitle: 'Recorded controls, observations and responsibilities',
    };
  }

  private recordValue(key: string, value: any): string {
    if (!Array.isArray(value)) return this.value(value);
    const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
    if ((key === 'actual' || key === 'status') && value.length === 12)
      return value.map((item: any, index: number) => `${months[index]}: ${this.value(item)}`).join(' | ');
    return value.map((item: any) => this.value(item)).join(', ') || '-';
  }

  private recordBadge(row: any): { text: string; color: RGB; textColor: RGB } | null {
    const text = this.value(row?.riskLevel || row?.status || row?.frequency, '');
    if (!text) return null;
    const normalized = text.toLowerCase();
    if (normalized === 'high' || normalized === 'red' || normalized === 'overdue')
      return { text: text.toUpperCase(), color: this.red, textColor: this.ink };
    if (normalized === 'medium' || normalized === 'yellow' || normalized === 'pending' || normalized === 'in progress')
      return { text: text.toUpperCase(), color: this.amber, textColor: this.ink };
    if (normalized === 'low' || normalized === 'green' || normalized === 'completed')
      return { text: text.toUpperCase(), color: this.green, textColor: this.teal };
    return { text: text.toUpperCase(), color: this.pale, textColor: this.muted };
  }

  private section(s: PdfState, title: string, subtitle?: string): void {
    s.page.drawText(title, { x: this.margin, y: s.y - 10, size: 10, font: s.bold, color: this.ink });
    s.y -= 22;
    if (subtitle) {
      s.page.drawText(this.fit(subtitle, s.regular, 7.7, 499), {
        x: this.margin,
        y: s.y,
        size: 7.7,
        font: s.regular,
        color: this.muted,
      });
      s.y -= 14;
    }
  }

  private paragraph(s: PdfState, text: string, size: number, color: RGB, lineHeight: number): void {
    this.wrap(text, s.regular, size, 499).forEach((line) => {
      s.page.drawText(line, { x: this.margin, y: s.y, size, font: s.regular, color });
      s.y -= lineHeight;
    });
  }

  private labelledLines(s: PdfState, label: string, lines: string[], y: number): number {
    s.page.drawText(label, { x: 58, y, size: 6.2, font: s.bold, color: this.muted });
    y -= 13;
    lines.forEach((line) => {
      s.page.drawText(line, { x: 58, y, size: 8, font: s.regular, color: this.ink });
      y -= 9;
    });
    return y;
  }

  private chrome(s: PdfState): void {
    s.pages.forEach((page, index) => {
      page.drawRectangle({ x: 0, y: 777, width: this.width, height: 65, color: this.navy });
      page.drawText('eKRUPA IMS', { x: this.margin, y: 811, size: 10, font: s.bold, color: rgb(1, 1, 1) });
      page.drawText('Powered by QLSS Business Consulting', {
        x: this.margin,
        y: 795,
        size: 6.5,
        font: s.regular,
        color: rgb(0.78, 0.88, 0.94),
      });
      this.right(page, 'GHAR 9001 ASSESSMENT', 811, 8.5, s.bold, rgb(1, 1, 1));
      this.right(page, 'SYSTEM GENERATED | NON-EDITABLE', 795, 6.2, s.regular, rgb(0.78, 0.88, 0.94));
      page.drawLine({ start: { x: this.margin, y: 35 }, end: { x: 547, y: 35 }, color: this.line, thickness: 0.55 });
      page.drawText('eKRUPA IMS | QLSS Business Consulting', {
        x: this.margin,
        y: 20,
        size: 6.3,
        font: s.regular,
        color: this.muted,
      });
      this.right(page, `${s.reportNo}   |   Page ${index + 1} of ${s.pages.length}`, 20, 6.3, s.regular, this.muted);
    });
  }

  private newPage(s: PdfState): void {
    const page = s.document.addPage([this.width, this.height]);
    s.pages.push(page);
    s.page = page;
    s.y = 714;
  }
  private ensure(s: PdfState, required: number): void {
    if (s.y - required < 50) this.newPage(s);
  }
  private badge(score: number): RGB {
    return score >= 5 ? this.green : score >= 4 ? rgb(0.91, 0.97, 0.98) : score >= 3 ? this.amber : this.red;
  }
  private score(value: any): number {
    const n = Number(value);
    return Number.isFinite(n) ? Math.max(0, Math.min(5, n)) : 0;
  }
  private performance(score: number): string {
    return score >= 5 ? 'EXCELLENT' : score >= 4 ? 'GOOD' : score >= 3 ? 'NEEDS IMPROVEMENT' : 'ACTION REQUIRED';
  }
  private overall(percent: number): string {
    return percent >= 90
      ? 'EXCELLENT'
      : percent >= 75
        ? 'GOOD'
        : percent >= 60
          ? 'NEEDS IMPROVEMENT'
          : 'ACTION REQUIRED';
  }
  private value(value: any, fallback = '-'): string {
    return value === null || value === undefined || String(value).trim() === '' ? fallback : String(value);
  }
  private pretty(value: string): string {
    return String(value || 'Details')
      .replace(/([a-z])([A-Z])/g, '$1 $2')
      .replace(/_/g, ' ')
      .replace(/^./, (c) => c.toUpperCase());
  }
  private date(value: any): string {
    if (!value) return '-';
    const raw = String(value);
    const date = new Date(raw.length === 7 ? `${raw}-01T00:00:00` : raw);
    return Number.isNaN(date.getTime())
      ? raw
      : date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).replace(/ /g, '-');
  }
  private center(page: PDFPage, text: string, x: number, y: number, size: number, font: PDFFont, color: RGB): void {
    page.drawText(text, { x: x - font.widthOfTextAtSize(text, size) / 2, y, size, font, color });
  }
  private right(page: PDFPage, text: string, y: number, size: number, font: PDFFont, color: RGB): void {
    page.drawText(text, { x: this.width - this.margin - font.widthOfTextAtSize(text, size), y, size, font, color });
  }
  private fit(text: string, font: PDFFont, size: number, maxWidth: number): string {
    const source = this.value(text);
    if (font.widthOfTextAtSize(source, size) <= maxWidth) return source;
    let result = source;
    while (result.length && font.widthOfTextAtSize(`${result}...`, size) > maxWidth) result = result.slice(0, -1);
    return `${result.trim()}...`;
  }
  private wrap(text: string, font: PDFFont, size: number, maxWidth: number): string[] {
    const words = this.value(text).split(/\s+/).filter(Boolean);
    const lines: string[] = [];
    let current = '';
    words.forEach((word) => {
      const candidate = current ? `${current} ${word}` : word;
      if (font.widthOfTextAtSize(candidate, size) <= maxWidth) current = candidate;
      else {
        if (current) lines.push(current);
        current = word;
      }
    });
    if (current) lines.push(current);
    return lines.length ? lines : ['-'];
  }
  private safeFileName(value: string): string {
    return String(value || 'Ghar9001_Assessment').replace(/[^a-zA-Z0-9._-]+/g, '_');
  }
}
