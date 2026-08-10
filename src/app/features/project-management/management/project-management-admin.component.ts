import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { PmLookups, PmProjectTemplate, PmQuotationTemplate, PmUser } from '../models/project-management.models';
import { ProjectManagementService } from '../services/project-management.service';

@Component({
  selector: 'app-project-management-admin',
  templateUrl: './project-management-admin.component.html',
  styleUrls: ['./project-management-admin.component.scss']
})
export class ProjectManagementAdminComponent implements OnInit {
  users: PmUser[] = [];
  quotationTemplates: PmQuotationTemplate[] = [];
  projectTemplates: PmProjectTemplate[] = [];
  lookups?: PmLookups;
  activeTab: 'quotation' | 'project' | 'roles' = 'quotation';
  error = '';
  success = '';

  quoteId: number | null = null;
  quoteForm: any = this.blankQuoteTemplate();
  projectId: number | null = null;
  projectForm: any = this.blankProjectTemplate();

  constructor(private api: ProjectManagementService, public auth: AuthService) {}
  ngOnInit(): void { this.load(); }

  get isSuperAdmin(): boolean { return (this.auth.getCurrentUser()?.role || '').toLowerCase() === 'superadmin'; }

  load(): void {
    this.error = '';
    this.api.lookups().subscribe({ next: v => this.lookups = v });
    this.api.quotationTemplates().subscribe({ next: v => this.quotationTemplates = v, error: e => this.error = e?.error?.message || 'Unable to load quotation templates.' });
    this.api.projectTemplates().subscribe({ next: v => this.projectTemplates = v, error: e => this.error = e?.error?.message || 'Unable to load project templates.' });
    this.api.users().subscribe({ next: v => this.users = v, error: e => this.error = e?.error?.message || 'Unable to load users.' });
  }

  newQuote(): void { this.quoteId = null; this.quoteForm = this.blankQuoteTemplate(); }
  editQuote(t: PmQuotationTemplate): void { this.quoteId = t.quotationTemplateId; this.quoteForm = { ...t }; }
  saveQuote(): void {
    if (!this.quoteForm.templateCode?.trim() || !this.quoteForm.templateName?.trim()) { this.error = 'Template code and name are required.'; return; }
    this.clearMessage();
    this.api.saveQuotationTemplate(this.quoteId, {
      templateCode: this.quoteForm.templateCode.trim(), templateName: this.quoteForm.templateName.trim(),
      categoryId: this.quoteForm.categoryId || null, trainingId: this.quoteForm.trainingId || null,
      scopeTemplate: this.quoteForm.scopeTemplate || '', paymentTerms: this.quoteForm.paymentTerms || '',
      specialConditions: this.quoteForm.specialConditions || '', defaultTaxPercent: +this.quoteForm.defaultTaxPercent || 0,
      defaultValidityDays: +this.quoteForm.defaultValidityDays || 30, isActive: !!this.quoteForm.isActive
    }).subscribe({ next: () => { this.success = 'Quotation template saved.'; this.newQuote(); this.load(); }, error: e => this.error = e?.error?.message || 'Unable to save quotation template.' });
  }

  newProjectTemplate(): void { this.projectId = null; this.projectForm = this.blankProjectTemplate(); }
  editProjectTemplate(t: PmProjectTemplate): void { this.projectId = t.projectTemplateId; this.projectForm = { ...t, activities: (t.activities || []).map(x => ({ ...x })) }; }
  addTemplateActivity(): void { this.projectForm.activities.push({ sequenceNo: (this.projectForm.activities.length + 1) * 10, activityName: '', description: '', defaultDurationDays: null, isRequired: true, isActive: true }); }
  removeTemplateActivity(index: number): void { this.projectForm.activities.splice(index, 1); }
  saveProjectTemplate(): void {
    if (!this.projectForm.templateCode?.trim() || !this.projectForm.templateName?.trim()) { this.error = 'Project template code and name are required.'; return; }
    if ((this.projectForm.activities || []).some((x: any) => !x.activityName?.trim())) { this.error = 'Every project-template activity needs an activity name.'; return; }
    this.clearMessage();
    this.api.saveProjectTemplate(this.projectId, {
      templateCode: this.projectForm.templateCode.trim(), templateName: this.projectForm.templateName.trim(),
      categoryId: this.projectForm.categoryId || null, description: this.projectForm.description || '', isActive: !!this.projectForm.isActive,
      activities: (this.projectForm.activities || []).map((x: any, i: number) => ({ sequenceNo: +x.sequenceNo || ((i + 1) * 10), activityName: x.activityName.trim(), description: x.description || '', defaultDurationDays: x.defaultDurationDays || null, isRequired: !!x.isRequired, isActive: !!x.isActive }))
    }).subscribe({ next: () => { this.success = 'Project activity template saved.'; this.newProjectTemplate(); this.load(); }, error: e => this.error = e?.error?.message || 'Unable to save project template.' });
  }

  roleChanged(u: PmUser, role: string): void {
    if (!this.isSuperAdmin) return;
    const original = u.role; u.role = role; this.clearMessage();
    this.api.changeRole(u.id, role).subscribe({ next: () => { this.success = `${u.name} role changed to ${role}. User must sign in again.`; this.load(); }, error: e => { u.role = original; this.error = e?.error?.message || 'Unable to change role.'; } });
  }

  categoryName(id?: number): string { return this.lookups?.categories.find(x => x.id === id)?.name || 'All / Generic'; }

  private blankQuoteTemplate(): any { return { templateCode: '', templateName: '', categoryId: null, trainingId: null, scopeTemplate: '', paymentTerms: 'Payment as per agreed commercial terms.', specialConditions: '', defaultTaxPercent: 18, defaultValidityDays: 30, isActive: true }; }
  private blankProjectTemplate(): any { return { templateCode: '', templateName: '', categoryId: null, description: '', isActive: true, activities: [] }; }
  private clearMessage(): void { this.error = ''; this.success = ''; }
}
