import { ListPage } from '../../../shared/list-page';
import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import {
  PmAcknowledgement,
  PmActivity,
  PmAttachment,
  PmLookups,
  PmModuleLink,
  PmProject,
} from '../models/project-management.models';
import { ProjectManagementService } from '../services/project-management.service';

@Component({
  selector: 'app-project-projects',
  templateUrl: './project-projects.component.html',
  styleUrls: ['./project-projects.component.scss'],
})
export class ProjectProjectsComponent implements AfterViewInit, OnDestroy, OnInit {
  readonly categoriesOptionsPage = new ListPage('categories options');
  readonly usersOptionsPage = new ListPage('users options');
  readonly quotationTemplatesOptionsPage = new ListPage('quotationTemplates options');
  readonly projectTemplatesOptionsPage = new ListPage('projectTemplates options');
  readonly clientsOptionsPage = new ListPage('clients options');
  readonly trainingsOptionsPage = new ListPage('trainings options');
  loadLookupOptions(): void { this.loadcategoriesOptions(); this.loadusersOptions(); this.loadquotationTemplatesOptions(); this.loadprojectTemplatesOptions(); this.loadclientsOptions(); this.loadtrainingsOptions(); }
  loadcategoriesOptions(): void {
    this.api.lookupPage('categories',this.categoriesOptionsPage).subscribe({next: rows => {
      this.lookups ||= {categories:[],users:[],quotationTemplates:[],projectTemplates:[],clients:[],trainings:[]};
      this.lookups.categories = rows;
    },error: () => this.error = 'Unable to load categories options.'});
  }
  loadusersOptions(): void {
    this.api.lookupPage('users',this.usersOptionsPage).subscribe({next: rows => {
      this.lookups ||= {categories:[],users:[],quotationTemplates:[],projectTemplates:[],clients:[],trainings:[]};
      this.lookups.users = rows;
    },error: () => this.error = 'Unable to load users options.'});
  }
  loadquotationTemplatesOptions(): void {
    this.api.lookupPage('quotationTemplates',this.quotationTemplatesOptionsPage).subscribe({next: rows => {
      this.lookups ||= {categories:[],users:[],quotationTemplates:[],projectTemplates:[],clients:[],trainings:[]};
      this.lookups.quotationTemplates = rows;
    },error: () => this.error = 'Unable to load quotationTemplates options.'});
  }
  loadprojectTemplatesOptions(): void {
    this.api.lookupPage('projectTemplates',this.projectTemplatesOptionsPage).subscribe({next: rows => {
      this.lookups ||= {categories:[],users:[],quotationTemplates:[],projectTemplates:[],clients:[],trainings:[]};
      this.lookups.projectTemplates = rows;
    },error: () => this.error = 'Unable to load projectTemplates options.'});
  }
  loadclientsOptions(): void {
    this.api.lookupPage('clients',this.clientsOptionsPage).subscribe({next: rows => {
      this.lookups ||= {categories:[],users:[],quotationTemplates:[],projectTemplates:[],clients:[],trainings:[]};
      this.lookups.clients = rows;
    },error: () => this.error = 'Unable to load clients options.'});
  }
  loadtrainingsOptions(): void {
    this.api.lookupPage('trainings',this.trainingsOptionsPage).subscribe({next: rows => {
      this.lookups ||= {categories:[],users:[],quotationTemplates:[],projectTemplates:[],clients:[],trainings:[]};
      this.lookups.trainings = rows;
    },error: () => this.error = 'Unable to load trainings options.'});
  }
  readonly projectsPage = new ListPage('Projects');
  reloadprojectsPage(): void { this.refresh(); }

  @ViewChild('listPane') private listPane?: ElementRef<HTMLElement>;
  @ViewChild('detailPane') private detailPane?: ElementRef<HTMLElement>;
  @ViewChild('splitWorkspace') private splitWorkspace?: ElementRef<HTMLElement>;
  private splitObserver?: ResizeObserver;
  private splitFrame?: number;
  items: PmProject[] = [];
  selected?: PmProject;
  activities: PmActivity[] = [];
  activityAttachments: PmAttachment[] = [];
  links: PmModuleLink[] = [];
  attachments: PmAttachment[] = [];
  acknowledgement: PmAcknowledgement | null = null;
  lookups?: PmLookups;

  search = '';
  statusFilter = '';
  activeTab: 'overview' | 'activities' | 'documents' | 'billing' | 'acknowledgement' | 'integrations' = 'overview';
  error = '';
  success = '';
  saving = false;

  projectForm: any = {};
  memberUserIds: number[] = [];
  selectedLeader: number | null = null;
  showActivityForm = false;
  editingActivityId: number | null = null;
  activity: any = this.blankActivity();
  link: any = { moduleCode: 'Training', recordId: '', recordReference: '', remarks: '' };
  closureRemark = '';
  activityDeleteModal: { open: boolean; activity?: PmActivity } = { open: false };
  closureDecisionModal: { open: boolean; action: 'Approve' | 'Return'; remark: string } = { open: false, action: 'Approve', remark: '' };
  finalCloseModal: { open: boolean } = { open: false };
  ackForm: any = {
    status: 'Pending',
    customerName: '',
    customerDesignation: '',
    signedFileName: '',
    signedRelativePath: '',
    remarks: '',
  };
  ackSend = { cc: '', message: '' };

  constructor(
    private api: ProjectManagementService,
    private route: ActivatedRoute,
    public auth: AuthService,
  ) {}

  ngOnInit(): void {
    this.refresh();
    this.loadLookupOptions();
  }

  ngAfterViewInit(): void {
    this.splitObserver = new ResizeObserver(() => this.syncSplitHeight());
    if (this.detailPane) this.splitObserver.observe(this.detailPane.nativeElement);
    if (this.listPane) this.splitObserver.observe(this.listPane.nativeElement);
    this.syncSplitHeight();
  }

  ngOnDestroy(): void {
    ++this.selectionVersion;
    this.splitObserver?.disconnect();
    if (this.splitFrame) cancelAnimationFrame(this.splitFrame);
  }

  private syncSplitHeight(): void {
    if (!this.splitWorkspace || !this.listPane || !this.detailPane || window.innerWidth <= 1100) return;
    if (this.splitFrame) cancelAnimationFrame(this.splitFrame);
    this.splitFrame = requestAnimationFrame(() => {
      const list = this.listPane!.nativeElement;
      const detail = this.detailPane!.nativeElement;
      list.style.height = 'auto';
      list.style.maxHeight = 'none';
      list.style.overflowY = 'visible';
      const detailHeight = detail.scrollHeight;
      const listContentHeight = list.scrollHeight;
      list.style.height = `${detailHeight}px`;
      list.style.overflowY = listContentHeight > detailHeight + 1 ? 'auto' : 'visible';
    });
  }

  get role(): string {
    return this.auth.getCurrentUser()?.role || '';
  }
  get isSuperAdmin(): boolean {
    return this.role.toLowerCase() === 'superadmin';
  }
  get canManage(): boolean {
    return ['superadmin', 'admin', 'manager'].includes(this.role.toLowerCase());
  }

  get filteredItems(): PmProject[] {
    const q = this.search.trim().toLowerCase();
    const filtered = this.items.filter(
      (x) =>
        (!this.statusFilter || x.status === this.statusFilter) &&
        (!q ||
          `${x.projectNo} ${x.customerName} ${x.projectTitle} ${x.categoryName} ${x.status}`.toLowerCase().includes(q)),
    );

    // PM_SELECTED_FIRST_V3: selected record is rendered as the first card.
    if (!this.selected) return filtered;
    const selectedIndex = filtered.findIndex((x) => x.projectId === this.selected?.projectId);
    if (selectedIndex <= 0) return filtered;
    return [filtered[selectedIndex], ...filtered.slice(0, selectedIndex), ...filtered.slice(selectedIndex + 1)];
  }

  get statuses(): string[] {
    return [...new Set(this.items.map((x) => x.status).filter(Boolean))].sort();
  }

  refresh(): void {
    this.error = '';
    this.api.projects(this.projectsPage).subscribe({
      next: (v) => {
        this.items = v;
        if (this.selected) {
          const current = v.find((x) => x.projectId === this.selected?.projectId);
          if (current) this.open(current, false, false);
        } else {
          const requestedId = +(this.route.snapshot.queryParamMap.get('projectId') || 0);
          const requested = requestedId ? v.find((x) => x.projectId === requestedId) : undefined;
          const target = requested || v[0];
          if (target) this.open(target, true, false);
        }
      },
      error: (e) => (this.error = e?.error?.message || 'Unable to load projects.'),
    });
  }

  private selectionVersion = 0;
  open(p: PmProject, resetTab = true, focusSelection = true): void {
    const version = ++this.selectionVersion;
    this.selected = undefined;
    this.api.project(p.projectId).subscribe({
      next: detail => { if (version === this.selectionVersion) this.openDetail(detail, resetTab, focusSelection); },
      error: () => { if (version === this.selectionVersion) this.error = 'Unable to load project details.'; },
    });
  }

  private openDetail(p: PmProject, resetTab: boolean, focusSelection: boolean): void {
    this.selected = p;
    this.projectForm = {
      ...p,
      projectStartDate: this.dateInput(p.projectStartDate),
      targetCompletionDate: this.dateInput(p.targetCompletionDate),
      actualCompletionDate: this.dateInput(p.actualCompletionDate),
    };
    this.selectedLeader = p.projectLeaderUserId || null;
    this.memberUserIds = (p.members || []).map((x) => x.id);
    if (p.projectLeaderUserId && !this.memberUserIds.includes(p.projectLeaderUserId))
      this.memberUserIds.push(p.projectLeaderUserId);
    if (resetTab) this.activeTab = 'overview';
    this.activities = [];
    this.links = [];
    this.attachments = [];
    this.loadActiveTab();
    if (focusSelection) this.focusSelectedProject();
  }

  selectTab(tab: typeof this.activeTab): void {
    this.activeTab = tab;
    this.loadActiveTab();
  }

  private loadActiveTab(): void {
    if (!this.selected) return;
    if (this.activeTab === 'activities') this.loadActivities();
    if (this.activeTab === 'documents') this.loadAttachments();
    if (this.activeTab === 'acknowledgement') this.loadAcknowledgement();
    if (this.activeTab === 'integrations') this.loadLinks();
  }

  // PM_SELECTED_FIRST_V3: reorder the chosen record to the first card; do not scroll to its old LHS position.
  private focusSelectedProject(): void {
    setTimeout(() => {
      const container = document.querySelector('.project-cards') as HTMLElement | null;
      if (container) container.scrollTop = 0;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 0);
  }

  saveProject(): void {
    if (!this.selected || !this.canManage) return;
    this.saving = true;
    this.clearMessage();
    this.api
      .updateProject(this.selected.projectId, {
        projectTitle: this.projectForm.projectTitle,
        projectStartDate: this.projectForm.projectStartDate || null,
        targetCompletionDate: this.projectForm.targetCompletionDate || null,
        projectValue: +this.projectForm.projectValue || 0,
        customerContactPerson: this.projectForm.customerContactPerson || '',
        customerEmail: this.projectForm.customerEmail || '',
        projectLocation: this.projectForm.projectLocation || '',
        poWoReference: this.projectForm.poWoReference || '',
        remarks: this.projectForm.remarks || '',
      })
      .subscribe({
        next: (p) => {
          this.success = 'Project master updated.';
          this.selected = p;
          this.projectForm = {
            ...p,
            projectStartDate: this.dateInput(p.projectStartDate),
            targetCompletionDate: this.dateInput(p.targetCompletionDate),
            actualCompletionDate: this.dateInput(p.actualCompletionDate),
          };
          this.refresh();
        },
        error: (e) => {
          this.error = e?.error?.message || 'Unable to update project.';
          this.saving = false;
        },
        complete: () => (this.saving = false),
      });
  }

  toggleMember(userId: number, checked: boolean): void {
    if (checked && !this.memberUserIds.includes(userId)) this.memberUserIds.push(userId);
    if (!checked) this.memberUserIds = this.memberUserIds.filter((x) => x !== userId);
  }

  memberSelected(userId: number): boolean {
    return this.memberUserIds.includes(userId);
  }

  saveAssignment(): void {
    if (!this.selected || !this.isSuperAdmin || !this.selectedLeader) return;
    const ids = [...new Set<number>([...this.memberUserIds, +this.selectedLeader])];
    this.clearMessage();
    this.api.assignProject(this.selected.projectId, ids, +this.selectedLeader).subscribe({
      next: () => {
        this.success = 'Project Leader and team assignment updated.';
        this.refresh();
      },
      error: (e) => (this.error = e?.error?.message || 'Unable to assign project team.'),
    });
  }

  loadActivities(): void {
    if (!this.selected) return;
    this.api
      .activities(this.selected.projectId)
      .subscribe({ next: (v) => (this.activities = v), error: () => (this.activities = []) });
  }

  addActivity(): void {
    this.editingActivityId = null;
    this.activityAttachments = [];
    this.activity = this.blankActivity();
    this.showActivityForm = true;
  }

  editActivity(a: PmActivity): void {
    this.editingActivityId = a.activityId;
    this.loadActivityAttachments(a.activityId);
    this.activity = {
      sequenceNo: a.sequenceNo,
      activityName: a.activityName,
      description: a.description,
      responsibleUserId: a.responsibleUserId || null,
      plannedStartDate: this.dateInput(a.plannedStartDate),
      plannedCompletionDate: this.dateInput(a.plannedCompletionDate),
      actualCompletionDate: this.dateInput(a.actualCompletionDate),
      status: a.status,
      remarks: a.remarks,
      isApplicable: a.isApplicable,
      weightPercent: a.weightPercent ?? null,
    };
    this.showActivityForm = true;
  }

  saveActivity(): void {
    if (!this.selected || !this.activity.activityName) return;
    const request = {
      ...this.activity,
      sequenceNo: +this.activity.sequenceNo || 0,
      weightPercent: this.activity.weightPercent === '' ? null : this.activity.weightPercent,
    };
    const call = this.editingActivityId
      ? this.api.updateActivity(this.editingActivityId, request)
      : this.api.saveActivity(this.selected.projectId, request);
    this.clearMessage();
    call.subscribe({
      next: () => {
        this.success = this.editingActivityId ? 'Activity updated.' : 'Activity added.';
        this.showActivityForm = false;
        this.editingActivityId = null;
        this.activity = this.blankActivity();
        this.loadActivities();
        this.refresh();
      },
      error: (e) => (this.error = e?.error?.message || 'Unable to save activity.'),
    });
  }

  loadActivityAttachments(activityId: number): void {
    this.api.attachments('Activity', activityId).subscribe({
      next: (files) => (this.activityAttachments = files),
      error: () => (this.activityAttachments = []),
    });
  }

  uploadActivityFile(event: Event): void {
    if (!this.editingActivityId) return;
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;
    this.api.uploadAttachment('Activity', this.editingActivityId, file).subscribe({
      next: () => {
        this.success = 'Activity evidence uploaded.';
        input.value = '';
        this.loadActivityAttachments(this.editingActivityId!);
      },
      error: (e) => (this.error = e?.error?.message || 'Unable to upload activity evidence.'),
    });
  }

  complete(a: PmActivity): void {
    this.api
      .updateActivity(a.activityId, {
        ...a,
        status: 'Completed',
        actualCompletionDate: new Date().toISOString().substring(0, 10),
      })
      .subscribe({
        next: () => {
          this.success = 'Activity completed.';
          this.loadActivities();
          this.refresh();
        },
        error: (e) => (this.error = e?.error?.message || 'Unable to update activity.'),
      });
  }

  deleteActivity(a: PmActivity): void {
    this.activityDeleteModal = { open: true, activity: a };
  }

  confirmDeleteActivity(): void {
    if (!this.activityDeleteModal.activity) return;
    const a = this.activityDeleteModal.activity;
    this.error = '';
    this.success = '';
    this.api.deleteActivity(a.activityId).subscribe({
      next: () => {
        this.success = 'Activity deleted.';
        this.activityDeleteModal.open = false;
        this.loadActivities();
        this.refresh();
      },
      error: (e) => (this.error = e?.error?.message || 'Unable to delete activity.'),
    });
  }

  closeActivityDeleteModal(): void {
    this.activityDeleteModal.open = false;
  }

  requestClosure(): void {
    if (!this.selected) return;
    this.api
      .requestClosure(this.selected.projectId, this.closureRemark || 'All applicable project activities completed.')
      .subscribe({
        next: () => {
          this.success = 'Project closure requested for SuperAdmin review.';
          this.refresh();
        },
        error: (e) => (this.error = e?.error?.message || 'Unable to request project closure.'),
      });
  }

  closureDecision(action: 'Approve' | 'Return'): void {
    if (!this.selected || !this.isSuperAdmin) return;
    if (action === 'Approve') {
      this.error = '';
      this.success = '';
      this.api.decideClosure(this.selected.projectId, action, this.closureRemark, true).subscribe({
        next: () => {
          this.success = 'Closure approve processed.';
          this.refresh();
        },
        error: (e) => (this.error = e?.error?.message || 'Unable to process closure.'),
      });
      return;
    }
    this.closureDecisionModal = {
      open: true,
      action,
      remark: this.closureRemark || '',
    };
  }

  confirmClosureDecision(): void {
    if (!this.selected || !this.isSuperAdmin) return;
    const { action, remark } = this.closureDecisionModal;
    if (action === 'Return' && !remark.trim()) {
      this.error = 'Please enter a reason or pending activity remark.';
      return;
    }
    this.error = '';
    this.success = '';
    this.api.decideClosure(this.selected.projectId, action, remark.trim(), true).subscribe({
      next: () => {
        this.success = `Closure ${action.toLowerCase()} processed.`;
        this.closureDecisionModal.open = false;
        this.refresh();
      },
      error: (e) => (this.error = e?.error?.message || 'Unable to process closure.'),
    });
  }

  closeClosureDecisionModal(): void {
    this.closureDecisionModal.open = false;
  }

  loadAttachments(): void {
    if (!this.selected) return;
    this.api
      .attachments('Project', this.selected.projectId)
      .subscribe({ next: (v) => (this.attachments = v), error: () => (this.attachments = []) });
  }

  uploadProjectFile(event: Event): void {
    if (!this.selected) return;
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;
    this.api.uploadAttachment('Project', this.selected.projectId, file).subscribe({
      next: () => {
        this.success = 'Project document uploaded.';
        this.loadAttachments();
        input.value = '';
      },
      error: (e) => (this.error = e?.error?.message || 'Unable to upload project document.'),
    });
  }

  downloadAttachment(file: PmAttachment): void {
    this.api
      .attachmentFile(file.attachmentId)
      .subscribe({ next: (blob) => this.saveBlob(blob, file.originalFileName) });
  }

  loadAcknowledgement(): void {
    if (!this.selected) return;
    this.api.acknowledgement(this.selected.projectId).subscribe({
      next: (value) => {
        this.acknowledgement = value;
        this.ackForm = value
          ? { ...value }
          : {
              status: 'Pending',
              customerName: this.selected?.customerName || '',
              customerDesignation: '',
              signedFileName: '',
              signedRelativePath: '',
              remarks: '',
            };
      },
      error: () => (this.acknowledgement = null),
    });
  }

  saveAcknowledgement(status?: string): void {
    if (!this.selected) return;
    if (status) this.ackForm.status = status;
    this.api
      .acknowledge(this.selected.projectId, {
        status: this.ackForm.status || 'Pending',
        customerName: this.ackForm.customerName || this.selected.customerName,
        customerDesignation: this.ackForm.customerDesignation || '',
        signedFileName: this.ackForm.signedFileName || '',
        signedRelativePath: this.ackForm.signedRelativePath || '',
        remarks: this.ackForm.remarks || '',
      })
      .subscribe({
        next: () => {
          this.success = 'Customer acknowledgment record updated.';
          this.loadAcknowledgement();
          this.refresh();
        },
        error: (e) => (this.error = e?.error?.message || 'Unable to save acknowledgment.'),
      });
  }

  downloadAcknowledgementPdf(): void {
    if (!this.selected) return;
    this.api.acknowledgementPdf(this.selected.projectId).subscribe({
      next: (blob) =>
        this.saveBlob(blob, `Project_Acknowledgement_${this.selected!.projectNo.replace(/[\\/]/g, '_')}.pdf`),
      error: (e) => (this.error = e?.error?.message || 'Unable to generate acknowledgment PDF.'),
    });
  }

  sendAcknowledgement(): void {
    if (!this.selected) return;
    this.api.sendAcknowledgement(this.selected.projectId, this.ackSend.cc, this.ackSend.message).subscribe({
      next: () => {
        this.success = 'Letter of Conformance / acknowledgment sent to customer.';
        this.loadAcknowledgement();
      },
      error: (e) => (this.error = e?.error?.message || 'Unable to send acknowledgment.'),
    });
  }

  uploadSignedAcknowledgement(event: Event): void {
    if (!this.selected) return;
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;
    this.api.uploadAttachment('Acknowledgement', this.selected.projectId, file).subscribe({
      next: (attachment) => {
        this.ackForm.signedFileName = attachment.originalFileName;
        this.ackForm.signedRelativePath = attachment.relativePath;
        this.ackForm.status = 'Received';
        this.saveAcknowledgement('Received');
        input.value = '';
      },
      error: (e) => (this.error = e?.error?.message || 'Unable to upload signed acknowledgment.'),
    });
  }

  finalClose(): void {
    if (!this.selected || !this.isSuperAdmin) return;
    if ((this.ackForm.status || this.acknowledgement?.status) !== 'Received') {
      this.error = 'Upload/record the customer-signed acknowledgment as Received before final closure.';
      return;
    }
    this.finalCloseModal.open = true;
  }

  confirmFinalClose(): void {
    if (!this.selected || !this.isSuperAdmin) return;
    this.error = '';
    this.success = '';
    this.api.finalClose(this.selected.projectId).subscribe({
      next: () => {
        this.success = 'PROJECT CLOSED successfully.';
        this.finalCloseModal.open = false;
        this.refresh();
      },
      error: (e) => (this.error = e?.error?.message || 'Unable to close project.'),
    });
  }

  closeFinalCloseModal(): void {
    this.finalCloseModal.open = false;
  }

  loadLinks(): void {
    if (!this.selected) return;
    this.api
      .moduleLinks(this.selected.projectId)
      .subscribe({ next: (v) => (this.links = v), error: () => (this.links = []) });
  }

  addLink(): void {
    if (!this.selected || !this.link.recordId) return;
    this.api.addModuleLink(this.selected.projectId, this.link).subscribe({
      next: () => {
        this.success = 'Existing module record linked to project.';
        this.link = { moduleCode: 'Training', recordId: '', recordReference: '', remarks: '' };
        this.loadLinks();
      },
      error: (e) => (this.error = e?.error?.message || 'Unable to link module record.'),
    });
  }

  activityDueClass(a: PmActivity): string {
    if (a.status === 'Completed') return 'timeline-row timeline-row--done';
    if (a.status === 'Delayed') return 'timeline-row timeline-row--late';
    if (
      a.plannedCompletionDate &&
      new Date(a.plannedCompletionDate) < new Date() &&
      !['Completed', 'Not Applicable'].includes(a.status)
    )
      return 'timeline-row timeline-row--late';
    return 'timeline-row';
  }

  badge(status: string): string {
    const s = (status || '').toLowerCase();
    if (s === 'project closed' || s === 'completed' || s.includes('approved') || s === 'received')
      return 'pm-badge pm-badge--ok';
    if (s.includes('pending') || s === 'in progress' || s === 'sent' || s === 'not started')
      return 'pm-badge pm-badge--warn';
    if (s.includes('delay') || s.includes('return')) return 'pm-badge pm-badge--danger';
    return 'pm-badge';
  }

  money(value: number): string {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(
      value || 0,
    );
  }

  private blankActivity(): any {
    return {
      sequenceNo: 0,
      activityName: '',
      description: '',
      responsibleUserId: null,
      plannedStartDate: '',
      plannedCompletionDate: '',
      actualCompletionDate: '',
      status: 'Not Started',
      remarks: '',
      isApplicable: true,
      weightPercent: null,
    };
  }
  private dateInput(value?: string): string {
    return value ? `${value}`.substring(0, 10) : '';
  }
  private clearMessage(): void {
    this.error = '';
    this.success = '';
  }
  private saveBlob(blob: Blob, fileName: string): void {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    a.click();
    URL.revokeObjectURL(url);
  }
}
