import { ListPage } from '../../../shared/list-page';
import { Component, OnInit } from '@angular/core';
import { PmDashboard, PmEnquiry, PmProject, PmQuotation } from '../models/project-management.models';
import { ProjectManagementService } from '../services/project-management.service';
@Component({
  selector: 'app-project-reports',
  templateUrl: './project-reports.component.html',
  styleUrls: ['./project-reports.component.scss'],
})
export class ProjectReportsComponent implements OnInit {
  dashboard?: PmDashboard;
  enquiries: PmEnquiry[] = [];
  quotations: PmQuotation[] = [];
  projects: PmProject[] = [];
  error = '';
  readonly projectsPage = new ListPage('Project register');
  totals = { enquiryCount: 0, quotationCount: 0, projectCount: 0, quotationValue: 0, closedValue: 0, statuses: [] as {status: string; count: number}[] };
  constructor(private api: ProjectManagementService) {}
  ngOnInit(): void {
    this.load();
  }
  load(): void {
    this.api.dashboard().subscribe({
      next: (v) => (this.dashboard = v),
      error: (e) => (this.error = e?.error?.message || 'Unable to load dashboard report.'),
    });
    this.api.reportSummary().subscribe({next: totals => this.totals = totals, error: () => this.error = 'Unable to load report totals.'});
    this.loadProjects();
  }
  loadProjects(): void { this.api.projects(this.projectsPage).subscribe({next: rows => this.projects = rows, error: () => this.error = 'Unable to load project register.'}); }
  get conversionRate(): number {
    return this.totals.enquiryCount ? Math.round((this.totals.projectCount / this.totals.enquiryCount) * 100) : 0;
  }
  get quotationValue(): number {
    return this.totals.quotationValue;
  }
  get closedValue(): number {
    return this.totals.closedValue;
  }
  exportCsv(): void {
    this.api.exportProjects().subscribe({ next: blob => {
      const url = URL.createObjectURL(blob); const anchor = document.createElement('a');
      anchor.href = url; anchor.download = 'QLSS_Projects.csv'; anchor.click();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    }, error: () => this.error = 'Unable to export project register.' });
  }
  statusCount(status: string): number {
    return this.totals.statuses.find(x => x.status === status)?.count || 0;
  }
}
