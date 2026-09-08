import { Component, OnInit } from '@angular/core';
import { NotifierService } from '../../../core/services/notifier.service';
import { GharAssessmentAdminDetail, GharAssessmentAdminListItem, GharAssessmentTab } from '../assessment.models';
import { AssessmentPdfService } from '../services/assessment-pdf.service';
import { GharAssessmentService } from '../services/ghar-assessment.service';

@Component({
  selector: 'app-assessment-admin',
  templateUrl: './assessment-admin.component.html',
  styleUrls: ['./assessment-admin.component.scss'],
})
export class AssessmentAdminComponent implements OnInit {
  readonly tabs: Array<GharAssessmentTab & { color?: string }> = [
    { code: 'WEEKLY_5S', shortTitle: 'Weekly 5S', title: 'Weekly 5S Family Patrol', icon: 'fa-list-check' },
    {
      code: 'PM_MATRIX',
      shortTitle: 'PM Matrix',
      title: 'Household Preventive Maintenance Matrix',
      icon: 'fa-screwdriver-wrench',
    },
    { code: 'FMR', shortTitle: 'Family Review', title: 'Family Management Review', icon: 'fa-people-roof' },
    { code: 'CAPA_FMEA', shortTitle: 'CAPA / FMEA', title: 'Quick-Response CAPA / FMEA', icon: 'fa-shield-halved' },
    { code: 'EHS', shortTitle: 'Safety & EHS', title: 'Safety and Environment', icon: 'fa-person-circle-check' },
    { code: 'MUDA', shortTitle: '8 Wastes', title: 'Lean 8 Wastes Assessment', icon: 'fa-recycle' },
    { code: 'KPI', shortTitle: 'Monthly KPI', title: 'Monthly Family KPI Dashboard', icon: 'fa-chart-line' },
  ];

  selectedTab = '';
  search = '';
  fromDate = '';
  toDate = '';
  page = 1;
  pageSize = 20;
  totalCount = 0;
  entries: GharAssessmentAdminListItem[] = [];
  selectedEntry: GharAssessmentAdminDetail | null = null;
  detailRows: Array<{ label: string; value: string }> = [];
  isLoading = false;
  isLoadingDetail = false;

  constructor(
    private readonly service: GharAssessmentService,
    private readonly pdf: AssessmentPdfService,
    private readonly notifier: NotifierService,
  ) {}

  ngOnInit(): void {
    this.load();
  }

  chooseTab(code: string): void {
    this.selectedTab = code;
    this.page = 1;
    this.load();
  }

  applyFilters(): void {
    this.page = 1;
    this.load();
  }

  clearFilters(): void {
    this.search = '';
    this.fromDate = '';
    this.toDate = '';
    this.page = 1;
    this.load();
  }

  load(): void {
    this.isLoading = true;
    this.service
      .getAdminEntries({
        tabCode: this.selectedTab || undefined,
        search: this.search || undefined,
        fromDate: this.fromDate || undefined,
        toDate: this.toDate || undefined,
        page: this.page,
        pageSize: this.pageSize,
      })
      .subscribe({
        next: (result) => {
          this.entries = result.items || [];
          this.totalCount = result.totalCount || 0;
          this.page = result.page || this.page;
          this.pageSize = result.pageSize || this.pageSize;
        },
        error: (error) =>
          this.notifier.warningToastr(
            error?.error?.message || error?.message || 'Assessment entries could not be loaded.',
          ),
        complete: () => (this.isLoading = false),
      });
  }

  view(entry: GharAssessmentAdminListItem): void {
    this.isLoadingDetail = true;
    this.service.getAdminEntry(entry.entryId).subscribe({
      next: (detail) => {
        this.selectedEntry = detail;
        this.detailRows = this.flattenPayload(detail.payloadJson);
      },
      error: (error) =>
        this.notifier.warningToastr(
          error?.error?.message || error?.message || 'Assessment detail could not be loaded.',
        ),
      complete: () => (this.isLoadingDetail = false),
    });
  }

  closeDetail(): void {
    this.selectedEntry = null;
    this.detailRows = [];
  }

  async downloadSelected(): Promise<void> {
    if (!this.selectedEntry) return;
    let payload: any = {};
    try {
      payload = JSON.parse(this.selectedEntry.payloadJson || '{}');
    } catch {
      payload = {};
    }
    await this.pdf.download(this.selectedEntry.tabTitle, payload, this.selectedEntry.entryNo);
  }

  previous(): void {
    if (this.page <= 1) return;
    this.page -= 1;
    this.load();
  }

  next(): void {
    if (this.page >= this.totalPages) return;
    this.page += 1;
    this.load();
  }

  get totalPages(): number {
    return Math.max(1, Math.ceil(this.totalCount / this.pageSize));
  }

  tabName(code: string): string {
    const found = this.tabs.find((tab) => tab.code === code);
    return found ? found.shortTitle : code;
  }

  private flattenPayload(payloadJson: string): Array<{ label: string; value: string }> {
    let payload: any = {};
    try {
      payload = JSON.parse(payloadJson || '{}');
    } catch {
      return [{ label: 'Stored Data', value: payloadJson || '' }];
    }

    const rows: Array<{ label: string; value: string }> = [];

    const walk = (value: any, path: string): void => {
      if (value === null || value === undefined || value === '') return;

      if (Array.isArray(value)) {
        value.forEach((item, index) => {
          const itemPath = `${path} ${index + 1}`.trim();
          walk(item, itemPath);
        });
        return;
      }

      if (typeof value === 'object') {
        Object.keys(value).forEach((key) => {
          const nextPath = path ? `${path} / ${this.pretty(key)}` : this.pretty(key);
          walk(value[key], nextPath);
        });
        return;
      }

      rows.push({ label: path || 'Value', value: String(value) });
    };

    walk(payload, '');
    return rows.length ? rows : [{ label: 'Stored Data', value: 'No values were entered.' }];
  }

  private pretty(value: string): string {
    return String(value || '')
      .replace(/([a-z])([A-Z])/g, '$1 $2')
      .replace(/_/g, ' ')
      .replace(/^./, (text) => text.toUpperCase());
  }
}
