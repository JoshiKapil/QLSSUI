import { ListPage } from '../../../shared/list-page';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import {
  PmEnquiryCategoryMetadata,
  PmEnquiryCategoryValue,
  PmEnquiryMetadata,
  PmLookups,
  PmProjectTemplate,
  PmQuotationTemplate,
  PmUser,
} from '../models/project-management.models';
import { ProjectManagementService } from '../services/project-management.service';

@Component({
  selector: 'app-project-management-admin',
  templateUrl: './project-management-admin.component.html',
  styleUrls: ['./project-management-admin.component.scss'],
})
export class ProjectManagementAdminComponent implements OnInit {
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
  readonly quotationTemplatesPage = new ListPage('Quotation templates');
  reloadquotationTemplatesPage(): void { this.load(); }
  readonly projectTemplatesPage = new ListPage('Project templates');
  reloadprojectTemplatesPage(): void { this.load(); }
  readonly usersPage = new ListPage('Users');
  reloadusersPage(): void { this.load(); }

  users: PmUser[] = [];
  quotationTemplates: PmQuotationTemplate[] = [];
  projectTemplates: PmProjectTemplate[] = [];
  lookups?: PmLookups;
  metadata?: PmEnquiryMetadata;
  selectedMetadataCategory?: PmEnquiryCategoryMetadata;
  categoryForm: any = this.blankMetadataCategory();
  categoryEditorOpen = false;
  valueForm: any = this.blankMetadataValue();
  valueEditorOpen = false;
  editingCategoryValue?: PmEnquiryCategoryValue;
  activeTab: 'metadata' | 'quotation' | 'project' | 'roles' = 'metadata';
  error = '';
  success = '';

  quoteId: number | null = null;
  quoteForm: any = this.blankQuoteTemplate();
  showQuoteEditor = false;
  projectId: number | null = null;
  projectForm: any = this.blankProjectTemplate();
  showProjectEditor = false;

  constructor(
    private api: ProjectManagementService,
    public auth: AuthService,
  ) {}
  ngOnInit(): void {
    this.load();
  }

  get isSuperAdmin(): boolean {
    return (this.auth.getCurrentUser()?.role || '').toLowerCase() === 'superadmin';
  }

  load(): void {
    this.error = '';
    this.loadLookupOptions();
    this.api.enquiryMetadata(true).subscribe({
      next: (v) => {
        this.metadata = v;
        if (this.selectedMetadataCategory)
          this.selectMetadataCategory(
            v.categories.find((x) => x.categoryId === this.selectedMetadataCategory!.categoryId),
          );
      },
      error: (e) => (this.error = e?.error?.message || 'Unable to load PM enquiry metadata.'),
    });
    this.api.quotationTemplates(this.quotationTemplatesPage).subscribe({
      next: (v) => (this.quotationTemplates = v),
      error: (e) => (this.error = e?.error?.message || 'Unable to load quotation templates.'),
    });
    this.api.projectTemplates(this.projectTemplatesPage).subscribe({
      next: (v) => (this.projectTemplates = v),
      error: (e) => (this.error = e?.error?.message || 'Unable to load project templates.'),
    });
    this.api.users(this.usersPage).subscribe({
      next: (v) => (this.users = v),
      error: (e) => (this.error = e?.error?.message || 'Unable to load users.'),
    });
  }

  get metadataCategories(): PmEnquiryCategoryMetadata[] {
    return this.metadata?.categories || [];
  }
  get metadataValues(): PmEnquiryCategoryValue[] {
    if (!this.selectedMetadataCategory) return [];
    return (this.metadata?.values || []).filter((x) => x.categoryId === this.selectedMetadataCategory!.categoryId);
  }

  selectMetadataCategory(category?: PmEnquiryCategoryMetadata): void {
    this.selectedMetadataCategory = category;
    this.categoryEditorOpen = !!category;
    this.valueEditorOpen = false;
    this.editingCategoryValue = undefined;
    this.categoryForm = category
      ? {
          categoryCode: category.categoryCode,
          categoryName: category.categoryName,
          valueSource: category.valueSource,
          valueLabel: category.valueLabel,
          defaultRequirementScope: category.defaultRequirementScope,
          allowScopeEdit: category.allowScopeEdit,
          displayOrder: category.displayOrder,
          isActive: category.isActive,
        }
      : this.blankMetadataCategory();
  }

  newMetadataCategory(): void {
    this.selectedMetadataCategory = undefined;
    this.categoryForm = this.blankMetadataCategory();
    this.categoryEditorOpen = true;
    this.valueEditorOpen = false;
  }

  saveMetadataCategory(): void {
    if (!this.isSuperAdmin) return;
    if (!this.categoryForm.categoryCode?.trim() || !this.categoryForm.categoryName?.trim()) {
      this.error = 'Category code and name are required.';
      return;
    }
    this.clearMessage();
    this.api
      .saveEnquiryCategoryMetadata(this.selectedMetadataCategory?.categoryId || null, {
        categoryCode: this.categoryForm.categoryCode.trim(),
        categoryName: this.categoryForm.categoryName.trim(),
        valueSource: this.categoryForm.valueSource || 'NONE',
        valueLabel: this.categoryForm.valueLabel || '',
        defaultRequirementScope: this.categoryForm.defaultRequirementScope || '',
        allowScopeEdit: !!this.categoryForm.allowScopeEdit,
        displayOrder: +this.categoryForm.displayOrder || 0,
        isActive: !!this.categoryForm.isActive,
      })
      .subscribe({
        next: (v) => {
          this.metadata = v;
          const code = this.categoryForm.categoryCode.trim().toUpperCase();
          this.selectMetadataCategory(v.categories.find((x) => x.categoryCode === code));
          this.success = 'Enquiry category metadata saved.';
        },
        error: (e) => (this.error = e?.error?.message || 'Unable to save enquiry category metadata.'),
      });
  }

  newMetadataValue(): void {
    if (!this.selectedMetadataCategory) return;
    this.editingCategoryValue = undefined;
    this.valueForm = this.blankMetadataValue();
    this.valueForm.categoryId = this.selectedMetadataCategory.categoryId;
    this.valueEditorOpen = true;
  }

  editMetadataValue(value: PmEnquiryCategoryValue): void {
    this.editingCategoryValue = value;
    this.valueForm = {
      categoryId: value.categoryId,
      valueCode: value.code,
      valueName: value.name,
      defaultRequirementScope: value.defaultRequirementScope,
      quotationTemplateId: value.quotationTemplateId || null,
      projectTemplateId: value.projectTemplateId || null,
      displayOrder: value.displayOrder,
      isActive: value.isActive,
    };
    this.valueEditorOpen = true;
  }

  saveMetadataValue(): void {
    if (!this.isSuperAdmin || !this.selectedMetadataCategory) return;
    if (!this.valueForm.valueCode?.trim() || !this.valueForm.valueName?.trim()) {
      this.error = 'Value code and name are required.';
      return;
    }
    this.clearMessage();
    this.api
      .saveEnquiryCategoryValue(this.editingCategoryValue?.categoryValueId || null, {
        categoryId: this.selectedMetadataCategory.categoryId,
        valueCode: this.valueForm.valueCode.trim(),
        valueName: this.valueForm.valueName.trim(),
        defaultRequirementScope: this.valueForm.defaultRequirementScope || '',
        quotationTemplateId: this.valueForm.quotationTemplateId || null,
        projectTemplateId: this.valueForm.projectTemplateId || null,
        displayOrder: +this.valueForm.displayOrder || 0,
        isActive: !!this.valueForm.isActive,
      })
      .subscribe({
        next: (v) => {
          this.metadata = v;
          this.valueEditorOpen = false;
          this.editingCategoryValue = undefined;
          this.success = 'Category value and default scope saved.';
        },
        error: (e) => (this.error = e?.error?.message || 'Unable to save category value.'),
      });
  }

  valueSourceLabel(source: string): string {
    switch ((source || '').toUpperCase()) {
      case 'LIST':
        return 'Database List';
      case 'TRAINING':
        return 'Existing Training Master';
      case 'FREE_TEXT':
        return 'Free Text';
      default:
        return 'Category Only';
    }
  }

  newQuote(): void {
    this.quoteId = null;
    this.quoteForm = this.blankQuoteTemplate();
    this.showQuoteEditor = true;
  }
  editQuote(t: PmQuotationTemplate): void {
    this.quoteId = t.quotationTemplateId;
    this.quoteForm = { ...t };
    this.showQuoteEditor = true;
  }
  closeQuoteEditor(): void {
    this.showQuoteEditor = false;
  }
  saveQuote(): void {
    if (!this.quoteForm.templateCode?.trim() || !this.quoteForm.templateName?.trim()) {
      this.error = 'Template code and name are required.';
      return;
    }
    this.clearMessage();
    this.api
      .saveQuotationTemplate(this.quoteId, {
        templateCode: this.quoteForm.templateCode.trim(),
        templateName: this.quoteForm.templateName.trim(),
        categoryId: this.quoteForm.categoryId || null,
        trainingId: this.quoteForm.trainingId || null,
        scopeTemplate: this.quoteForm.scopeTemplate || '',
        paymentTerms: this.quoteForm.paymentTerms || '',
        specialConditions: this.quoteForm.specialConditions || '',
        defaultTaxPercent: +this.quoteForm.defaultTaxPercent || 0,
        defaultValidityDays: +this.quoteForm.defaultValidityDays || 30,
        isActive: !!this.quoteForm.isActive,
      })
      .subscribe({
        next: () => {
          this.success = 'Quotation template saved.';
          this.showQuoteEditor = false;
          this.quoteId = null;
          this.quoteForm = this.blankQuoteTemplate();
          this.load();
        },
        error: (e) => (this.error = e?.error?.message || 'Unable to save quotation template.'),
      });
  }

  newProjectTemplate(): void {
    this.projectId = null;
    this.projectForm = this.blankProjectTemplate();
    this.showProjectEditor = true;
  }
  editProjectTemplate(t: PmProjectTemplate): void {
    this.projectId = t.projectTemplateId;
    this.projectForm = { ...t, activities: (t.activities || []).map((x) => ({ ...x })) };
    this.showProjectEditor = true;
  }
  closeProjectEditor(): void {
    this.showProjectEditor = false;
  }
  addTemplateActivity(): void {
    this.projectForm.activities.push({
      sequenceNo: (this.projectForm.activities.length + 1) * 10,
      activityName: '',
      description: '',
      defaultDurationDays: null,
      isRequired: true,
      isActive: true,
    });
  }
  removeTemplateActivity(index: number): void {
    this.projectForm.activities.splice(index, 1);
  }
  saveProjectTemplate(): void {
    if (!this.projectForm.templateCode?.trim() || !this.projectForm.templateName?.trim()) {
      this.error = 'Project template code and name are required.';
      return;
    }
    if ((this.projectForm.activities || []).some((x: any) => !x.activityName?.trim())) {
      this.error = 'Every project-template activity needs an activity name.';
      return;
    }
    this.clearMessage();
    this.api
      .saveProjectTemplate(this.projectId, {
        templateCode: this.projectForm.templateCode.trim(),
        templateName: this.projectForm.templateName.trim(),
        categoryId: this.projectForm.categoryId || null,
        description: this.projectForm.description || '',
        isActive: !!this.projectForm.isActive,
        activities: (this.projectForm.activities || []).map((x: any, i: number) => ({
          sequenceNo: +x.sequenceNo || (i + 1) * 10,
          activityName: x.activityName.trim(),
          description: x.description || '',
          defaultDurationDays: x.defaultDurationDays || null,
          isRequired: !!x.isRequired,
          isActive: !!x.isActive,
        })),
      })
      .subscribe({
        next: () => {
          this.success = 'Project activity template saved.';
          this.showProjectEditor = false;
          this.projectId = null;
          this.projectForm = this.blankProjectTemplate();
          this.load();
        },
        error: (e) => (this.error = e?.error?.message || 'Unable to save project template.'),
      });
  }

  roleChanged(u: PmUser, role: string): void {
    if (!this.isSuperAdmin) return;
    const original = u.role;
    u.role = role;
    this.clearMessage();
    this.api.changeRole(u.id, role).subscribe({
      next: () => {
        this.success = `${u.name} role changed to ${role}. User must sign in again.`;
        this.load();
      },
      error: (e) => {
        u.role = original;
        this.error = e?.error?.message || 'Unable to change role.';
      },
    });
  }

  categoryName(id?: number): string {
    return this.lookups?.categories.find((x) => x.id === id)?.name || 'All / Generic';
  }

  private blankQuoteTemplate(): any {
    return {
      templateCode: '',
      templateName: '',
      categoryId: null,
      trainingId: null,
      scopeTemplate: '',
      paymentTerms: 'Payment as per agreed commercial terms.',
      specialConditions: '',
      defaultTaxPercent: 18,
      defaultValidityDays: 30,
      isActive: true,
    };
  }
  private blankProjectTemplate(): any {
    return { templateCode: '', templateName: '', categoryId: null, description: '', isActive: true, activities: [] };
  }
  private blankMetadataCategory(): any {
    return {
      categoryCode: '',
      categoryName: '',
      valueSource: 'NONE',
      valueLabel: '',
      defaultRequirementScope: '',
      allowScopeEdit: true,
      displayOrder: 100,
      isActive: true,
    };
  }
  private blankMetadataValue(): any {
    return {
      categoryId: null,
      valueCode: '',
      valueName: '',
      defaultRequirementScope: '',
      quotationTemplateId: null,
      projectTemplateId: null,
      displayOrder: 100,
      isActive: true,
    };
  }
  private clearMessage(): void {
    this.error = '';
    this.success = '';
  }
}
