import { Component, OnInit } from '@angular/core';
import { NotifierService } from '../../../core/services/notifier.service';
import {
  OnboardingDepartment,
  OnboardingPlan,
  OnboardingSetupOverview,
  OnboardingVideo,
  SavePlanRequest,
  SaveQuestionRequest,
  SaveVideoRequest
} from '../models/employee-onboarding.models';
import { EmployeeOnboardingService } from '../services/employee-onboarding.service';

type SetupTab = 'overview' | 'departments' | 'videos' | 'plans';

@Component({
  selector: 'app-onboarding-configuration',
  templateUrl: './onboarding-configuration.component.html',
  styleUrls: ['./onboarding-configuration.component.scss']
})
export class OnboardingConfigurationComponent implements OnInit {
  tab: SetupTab = 'overview';
  overview: OnboardingSetupOverview = {
    activeDepartments: 0,
    activeVideos: 0,
    activeQuestions: 0,
    draftPlans: 0,
    publishedPlans: 0,
    warnings: []
  };

  departments: OnboardingDepartment[] = [];
  videos: OnboardingVideo[] = [];
  plans: OnboardingPlan[] = [];
  saving = false;
  search = '';

  departmentId: number | null = null;
  departmentForm = { departmentCode: '', departmentName: '', description: '', isActive: true };

  videoId: number | null = null;
  videoForm: SaveVideoRequest = this.newVideo();

  planId: number | null = null;
  planForm: SavePlanRequest = this.newPlan();

  constructor(
    private readonly api: EmployeeOnboardingService,
    private readonly notifier: NotifierService
  ) {}

  ngOnInit(): void { this.loadAll(); }

  loadAll(): void {
    this.api.setupOverview().subscribe({ next: row => this.overview = row, error: () => undefined });
    this.api.departments().subscribe(rows => this.departments = rows);
    this.api.videos().subscribe(rows => this.videos = rows);
    this.api.plans().subscribe(rows => this.plans = rows);
  }

  setTab(tab: SetupTab): void { this.tab = tab; this.search = ''; }

  get filteredVideos(): OnboardingVideo[] {
    const q = this.search.trim().toLowerCase();
    return !q ? this.videos : this.videos.filter(x => `${x.videoCode} ${x.title}`.toLowerCase().includes(q));
  }

  get filteredPlans(): OnboardingPlan[] {
    const q = this.search.trim().toLowerCase();
    return !q ? this.plans : this.plans.filter(x => `${x.planCode} ${x.planName} ${x.departmentName || ''}`.toLowerCase().includes(q));
  }

  get totalMarks(): number {
    return this.videoForm.questions.reduce((sum, q) => sum + Number(q.marks || 0), 0);
  }

  get selectedPlan(): OnboardingPlan | undefined {
    return this.planId ? this.plans.find(x => x.planId === this.planId) : undefined;
  }

  get activePlanItems() {
    return [...this.planForm.items].sort((a, b) => a.sequenceNo - b.sequenceNo);
  }

  videoName(videoId: number): string {
    return this.videos.find(x => x.videoId === videoId)?.title || 'Select video';
  }

  questionCount(videoId: number): number {
    return this.videos.find(x => x.videoId === videoId)?.questions.length || 0;
  }

  saveDepartment(): void {
    if (!this.departmentForm.departmentCode.trim() || !this.departmentForm.departmentName.trim()) {
      this.notifier.warningToastr('Department code and name are required.');
      return;
    }
    this.saving = true;
    this.api.saveDepartment(this.departmentId, this.departmentForm).subscribe({
      next: () => { this.done('Department saved.'); this.resetDepartment(); },
      error: e => this.fail(e)
    });
  }

  editDepartment(row: OnboardingDepartment): void {
    this.departmentId = row.departmentId;
    this.departmentForm = {
      departmentCode: row.departmentCode,
      departmentName: row.departmentName,
      description: row.description || '',
      isActive: row.isActive
    };
    this.tab = 'departments';
  }

  resetDepartment(): void {
    this.departmentId = null;
    this.departmentForm = { departmentCode: '', departmentName: '', description: '', isActive: true };
  }

  addQuestion(type: 'SingleChoice' | 'TrueFalse' = 'SingleChoice'): void {
    const options = type === 'TrueFalse'
      ? [
          { optionText: 'True', isCorrect: true, displayOrder: 10 },
          { optionText: 'False', isCorrect: false, displayOrder: 20 }
        ]
      : [
          { optionText: '', isCorrect: true, displayOrder: 10 },
          { optionText: '', isCorrect: false, displayOrder: 20 },
          { optionText: '', isCorrect: false, displayOrder: 30 },
          { optionText: '', isCorrect: false, displayOrder: 40 }
        ];

    this.videoForm.questions.push({
      questionText: '',
      questionType: type,
      marks: 1,
      displayOrder: (this.videoForm.questions.length + 1) * 10,
      explanation: '',
      options
    });
  }

  removeQuestion(index: number): void {
    if (this.videoForm.questions.length > 1) this.videoForm.questions.splice(index, 1);
    this.normalizeQuestionOrder();
  }

  moveQuestion(index: number, direction: -1 | 1): void {
    const target = index + direction;
    if (target < 0 || target >= this.videoForm.questions.length) return;
    const item = this.videoForm.questions[index];
    this.videoForm.questions[index] = this.videoForm.questions[target];
    this.videoForm.questions[target] = item;
    this.normalizeQuestionOrder();
  }

  addOption(question: SaveQuestionRequest): void {
    question.options.push({ optionText: '', isCorrect: false, displayOrder: (question.options.length + 1) * 10 });
  }

  removeOption(question: SaveQuestionRequest, index: number): void {
    if (question.options.length <= 2) return;
    const wasCorrect = question.options[index]?.isCorrect;
    question.options.splice(index, 1);
    question.options.forEach((x, i) => x.displayOrder = (i + 1) * 10);
    if (wasCorrect && question.options.length) question.options[0].isCorrect = true;
  }

  setCorrect(question: SaveQuestionRequest, index: number): void {
    question.options.forEach((option, i) => option.isCorrect = i === index);
  }

  onQuestionTypeChanged(question: SaveQuestionRequest): void {
    if (question.questionType !== 'TrueFalse') return;
    question.options = [
      { optionText: 'True', isCorrect: true, displayOrder: 10 },
      { optionText: 'False', isCorrect: false, displayOrder: 20 }
    ];
  }

  saveVideo(): void {
    if (!this.videoForm.videoCode.trim() || !this.videoForm.title.trim() || !this.videoForm.videoUrl.trim()) {
      this.notifier.warningToastr('Video code, title and URL are required.');
      return;
    }
    if (!this.videoForm.questions.length) {
      this.notifier.warningToastr('Add at least one assignment question.');
      return;
    }
    if (this.videoForm.questions.some(q => !q.questionText.trim() || q.options.length < 2 || q.options.filter(o => o.isCorrect).length !== 1 || q.options.some(o => !o.optionText.trim()))) {
      this.notifier.warningToastr('Complete every question, option and correct answer before saving.');
      return;
    }

    this.saving = true;
    this.api.saveVideo(this.videoId, this.videoForm).subscribe({
      next: () => { this.done('Video and assignment saved.'); this.resetVideo(); },
      error: e => this.fail(e)
    });
  }

  editVideo(row: OnboardingVideo): void {
    this.videoId = row.videoId;
    this.videoForm = {
      videoCode: row.videoCode,
      title: row.title,
      description: row.description || '',
      videoUrl: row.videoUrl,
      thumbnailUrl: row.thumbnailUrl || '',
      durationSeconds: row.durationSeconds,
      assignmentTitle: row.assignmentTitle || '',
      assignmentInstructions: row.assignmentInstructions || '',
      maxAttempts: row.maxAttempts || null,
      showResultAfterSubmit: row.showResultAfterSubmit !== false,
      isActive: row.isActive,
      questions: row.questions.map(q => ({
        questionText: q.questionText,
        questionType: q.questionType as 'SingleChoice' | 'TrueFalse',
        marks: q.marks,
        displayOrder: q.displayOrder,
        explanation: q.explanation || '',
        options: q.options.map(o => ({ optionText: o.optionText, isCorrect: !!o.isCorrect, displayOrder: o.displayOrder }))
      }))
    };
    this.tab = 'videos';
  }

  resetVideo(): void { this.videoId = null; this.videoForm = this.newVideo(); }

  addPlanItem(): void {
    this.planForm.items.push({
      videoId: 0,
      sequenceNo: (this.planForm.items.length + 1) * 10,
      minimumWatchPercent: 90,
      passingPercent: 60,
      mustPassAssignment: true
    });
  }

  removePlanItem(index: number): void {
    if (this.planForm.items.length > 1) this.planForm.items.splice(index, 1);
    this.normalizePlanOrder();
  }

  movePlanItem(index: number, direction: -1 | 1): void {
    const target = index + direction;
    if (target < 0 || target >= this.planForm.items.length) return;
    const item = this.planForm.items[index];
    this.planForm.items[index] = this.planForm.items[target];
    this.planForm.items[target] = item;
    this.normalizePlanOrder();
  }

  defaultChanged(): void { if (this.planForm.isDefault) this.planForm.departmentId = null; }

  savePlan(): void {
    if (!this.planForm.planCode.trim() || !this.planForm.planName.trim()) {
      this.notifier.warningToastr('Plan code and name are required.');
      return;
    }
    if (!this.planForm.isDefault && !this.planForm.departmentId) {
      this.notifier.warningToastr('Choose a department or mark this as the Default/Common path.');
      return;
    }
    if (this.planForm.items.some(x => !x.videoId)) {
      this.notifier.warningToastr('Select a video for every path step.');
      return;
    }
    if (new Set(this.planForm.items.map(x => x.videoId)).size !== this.planForm.items.length) {
      this.notifier.warningToastr('The same video cannot be repeated in one learning path.');
      return;
    }

    this.normalizePlanOrder();
    this.saving = true;
    this.api.savePlan(this.planId, this.planForm).subscribe({
      next: (response: any) => {
        if (!this.planId && response?.planId) this.planId = response.planId;
        this.done('Learning path saved as Draft. Publish it after preview and validation.');
      },
      error: e => this.fail(e)
    });
  }

  editPlan(row: OnboardingPlan): void {
    this.planId = row.planId;
    this.planForm = {
      planCode: row.planCode,
      planName: row.planName,
      departmentId: row.departmentId || null,
      completionDays: row.completionDays,
      isDefault: row.isDefault,
      isActive: row.isActive,
      welcomeMessage: row.welcomeMessage || '',
      completionMessage: row.completionMessage || '',
      items: row.items.filter(i => i.isActive).map(i => ({
        videoId: i.videoId,
        sequenceNo: i.sequenceNo,
        minimumWatchPercent: i.minimumWatchPercent,
        passingPercent: i.passingPercent,
        mustPassAssignment: i.mustPassAssignment
      }))
    };
    if (!this.planForm.items.length) this.addPlanItem();
    this.normalizePlanOrder();
    this.tab = 'plans';
  }

  publishPlan(row?: OnboardingPlan): void {
    const id = row?.planId || this.planId;
    if (!id) {
      this.notifier.warningToastr('Save the learning path before publishing.');
      return;
    }
    this.saving = true;
    this.api.publishPlan(id).subscribe({
      next: () => { this.done('Learning path published. It is now available for new employee assignments.'); },
      error: e => this.fail(e)
    });
  }

  movePlanToDraft(row: OnboardingPlan): void {
    this.saving = true;
    this.api.movePlanToDraft(row.planId).subscribe({
      next: () => this.done('Learning path moved to Draft. Existing employee enrollments are unchanged.'),
      error: e => this.fail(e)
    });
  }

  resetPlan(): void { this.planId = null; this.planForm = this.newPlan(); }

  private normalizeQuestionOrder(): void {
    this.videoForm.questions.forEach((q, i) => q.displayOrder = (i + 1) * 10);
  }

  private normalizePlanOrder(): void {
    this.planForm.items.forEach((item, i) => item.sequenceNo = (i + 1) * 10);
  }

  private newVideo(): SaveVideoRequest {
    return {
      videoCode: '',
      title: '',
      description: '',
      videoUrl: '',
      thumbnailUrl: '',
      durationSeconds: undefined,
      assignmentTitle: '',
      assignmentInstructions: 'Complete all questions after watching the video.',
      maxAttempts: null,
      showResultAfterSubmit: true,
      isActive: true,
      questions: [{
        questionText: '',
        questionType: 'SingleChoice',
        marks: 1,
        displayOrder: 10,
        explanation: '',
        options: [
          { optionText: '', isCorrect: true, displayOrder: 10 },
          { optionText: '', isCorrect: false, displayOrder: 20 },
          { optionText: '', isCorrect: false, displayOrder: 30 },
          { optionText: '', isCorrect: false, displayOrder: 40 }
        ]
      }]
    };
  }

  private newPlan(): SavePlanRequest {
    return {
      planCode: '',
      planName: '',
      departmentId: null,
      completionDays: 7,
      isDefault: false,
      isActive: true,
      welcomeMessage: 'Welcome to QLSS. Complete each video and its assignment in sequence.',
      completionMessage: 'Mandatory onboarding completed successfully.',
      items: [{ videoId: 0, sequenceNo: 10, minimumWatchPercent: 90, passingPercent: 60, mustPassAssignment: true }]
    };
  }

  private done(message: string): void {
    this.saving = false;
    this.notifier.successToastr(message);
    this.loadAll();
  }

  private fail(error: any): void {
    this.saving = false;
    this.notifier.warningToastr(error?.error?.message || error?.error?.error || 'Unable to save onboarding setup.');
  }
}
