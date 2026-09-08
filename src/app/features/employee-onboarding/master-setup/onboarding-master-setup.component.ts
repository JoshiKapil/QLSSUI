import { ListPage } from '../../../shared/list-page';
import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { NotifierService } from '../../../core/services/notifier.service';
import { EmployeeOnboardingService } from '../services/employee-onboarding.service';
import {
  MasterBundle,
  MasterMapping,
  MasterQuestion,
  MasterVideo,
  OnboardingMasterSetupService,
} from './onboarding-master-setup.service';

@Component({
  selector: 'app-onboarding-master-setup',
  templateUrl: './onboarding-master-setup.component.html',
  styleUrls: ['./onboarding-master-setup.component.scss'],
})
export class OnboardingMasterSetupComponent implements OnInit {
  readonly departmentsPage = new ListPage('departments');
  loaddepartments(): void { this.master.page<any>('departments', this.departmentsPage).subscribe({next: rows => this.data.departments = rows, error: () => this.notifier.warningToastr('Unable to load departments.')}); }
  readonly trainingsPage = new ListPage('trainings');
  loadtrainings(): void { this.master.page<any>('trainings', this.trainingsPage).subscribe({next: rows => this.data.trainings = rows, error: () => this.notifier.warningToastr('Unable to load trainings.')}); }
  readonly videosPage = new ListPage('videos');
  loadvideos(): void { this.master.page<any>('videos', this.videosPage).subscribe({next: rows => this.data.videos = rows, error: () => this.notifier.warningToastr('Unable to load videos.')}); }
  readonly questionsPage = new ListPage('questions');
  loadquestions(): void { this.master.page<any>('questions', this.questionsPage).subscribe({next: rows => this.data.questions = rows, error: () => this.notifier.warningToastr('Unable to load questions.')}); }
  readonly mappingsPage = new ListPage('mappings');
  loadmappings(): void { this.master.page<any>('mappings', this.mappingsPage).subscribe({next: rows => this.data.mappings = rows, error: () => this.notifier.warningToastr('Unable to load mappings.')}); }
  tab: 'overview' | 'departments' | 'content' | 'mapping' = 'overview';
  data: MasterBundle = { departments: [], trainings: [], videos: [], questions: [], mappings: [] };
  loading = true;
  saving = false;
  search = '';
  departmentId: number | null = null;
  departmentForm: any = { departmentCode: '', departmentName: '', description: '', isActive: true };
  videoId: number | null = null;
  videoForm: any = {
    videoCode: '',
    title: '',
    description: '',
    videoUrl: '',
    thumbnailUrl: '',
    durationSeconds: null,
    assignmentTitle: '',
    assignmentInstructions: '',
    maxAttempts: 3,
    showResultAfterSubmit: true,
    isActive: true,
  };
  questionId: number | null = null;
  questionForm: any = {
    videoId: 0,
    questionText: '',
    questionType: 'SingleChoice',
    marks: 1,
    displayOrder: 10,
    explanation: '',
    isActive: true,
    options: [
      { optionText: '', isCorrect: true, displayOrder: 1 },
      { optionText: '', isCorrect: false, displayOrder: 2 },
    ],
  };
  mappingId: number | null = null;
  mappingForm: any = {
    planCode: '',
    planName: '',
    trainingId: null,
    departmentId: null,
    completionDays: 7,
    isActive: true,
    items: [{ videoId: 0, sequenceNo: 1, minimumWatchPercent: 90, passingPercent: 60, mustPassAssignment: true }],
  };

  constructor(
    private master: OnboardingMasterSetupService,
    private onboarding: EmployeeOnboardingService,
    private notifier: NotifierService,
  ) {}
  ngOnInit(): void {
    this.load();
  }
  load(): void {
    this.loading = false;
    this.loaddepartments();
    this.loadtrainings();
    this.loadvideos();
    this.loadquestions();
    this.loadmappings();
  }
  get filteredVideos(): MasterVideo[] {
    const q = this.search.toLowerCase().trim();
    return this.data.videos.filter(
      (x) => !q || x.videoCode.toLowerCase().includes(q) || x.title.toLowerCase().includes(q),
    );
  }
  get filteredQuestions(): MasterQuestion[] {
    const q = this.search.toLowerCase().trim();
    return this.data.questions.filter(
      (x) => !q || x.questionText.toLowerCase().includes(q) || x.videoTitle.toLowerCase().includes(q),
    );
  }
  get scopeLabel(): string {
    const t = this.mappingForm.trainingId,
      d = this.mappingForm.departmentId;
    if (t && d) return 'Training + Department';
    if (t) return 'Training only';
    if (d) return 'Department only';
    return 'Common / All employees';
  }
  trainingName(id: number | null): string {
    return this.data.trainings.find((x) => x.trainingId === id)?.trainingName || 'No Training';
  }
  departmentName(id: number | null): string {
    return this.data.departments.find((x) => x.departmentId === id)?.departmentName || 'All Departments';
  }
  videoName(id: number): string {
    return this.data.videos.find((x) => x.videoId === id)?.title || 'Select video';
  }

  editDepartment(row: any): void {
    this.departmentId = row.departmentId;
    this.departmentForm = {
      departmentCode: row.departmentCode,
      departmentName: row.departmentName,
      description: row.description || '',
      isActive: row.isActive,
    };
  }
  resetDepartment(): void {
    this.departmentId = null;
    this.departmentForm = { departmentCode: '', departmentName: '', description: '', isActive: true };
  }
  saveDepartment(): void {
    if (!this.departmentForm.departmentCode?.trim() || !this.departmentForm.departmentName?.trim()) {
      this.notifier.warningToastr('Department code and name are required.');
      return;
    }
    this.saving = true;
    this.onboarding
      .saveDepartment(this.departmentId, this.departmentForm)
      .pipe(finalize(() => (this.saving = false)))
      .subscribe({
        next: () => {
          this.notifier.successToastr('Department saved.');
          this.resetDepartment();
          this.load();
        },
        error: (e) => this.notifier.warningToastr(e?.error?.message || 'Unable to save department.'),
      });
  }

  editVideo(row: MasterVideo): void {
    this.videoId = row.videoId;
    this.videoForm = {
      videoCode: row.videoCode,
      title: row.title,
      description: row.description || '',
      videoUrl: row.videoUrl,
      thumbnailUrl: row.thumbnailUrl || '',
      durationSeconds: row.durationSeconds || null,
      assignmentTitle: row.assignmentTitle || '',
      assignmentInstructions: row.assignmentInstructions || '',
      maxAttempts: row.maxAttempts || 3,
      showResultAfterSubmit: row.showResultAfterSubmit,
      isActive: row.isActive,
    };
  }
  resetVideo(): void {
    this.videoId = null;
    this.videoForm = {
      videoCode: '',
      title: '',
      description: '',
      videoUrl: '',
      thumbnailUrl: '',
      durationSeconds: null,
      assignmentTitle: '',
      assignmentInstructions: '',
      maxAttempts: 3,
      showResultAfterSubmit: true,
      isActive: true,
    };
  }
  saveVideo(): void {
    this.saving = true;
    this.master
      .saveVideo(this.videoId, this.videoForm)
      .pipe(finalize(() => (this.saving = false)))
      .subscribe({
        next: () => {
          this.notifier.successToastr('Video saved. Add or map questions below.');
          this.resetVideo();
          this.load();
        },
        error: (e) => this.notifier.warningToastr(e?.error?.message || 'Unable to save video.'),
      });
  }

  editQuestion(row: MasterQuestion): void {
    this.questionId = row.questionId;
    this.questionForm = {
      videoId: row.videoId,
      questionText: row.questionText,
      questionType: row.questionType,
      marks: row.marks,
      displayOrder: row.displayOrder,
      explanation: row.explanation || '',
      isActive: row.isActive,
      options: row.options.map((x, i) => ({ optionText: x.optionText, isCorrect: x.isCorrect, displayOrder: i + 1 })),
    };
  }
  resetQuestion(): void {
    this.questionId = null;
    this.questionForm = {
      videoId: 0,
      questionText: '',
      questionType: 'SingleChoice',
      marks: 1,
      displayOrder: 10,
      explanation: '',
      isActive: true,
      options: [
        { optionText: '', isCorrect: true, displayOrder: 1 },
        { optionText: '', isCorrect: false, displayOrder: 2 },
      ],
    };
  }
  addOption(): void {
    this.questionForm.options.push({
      optionText: '',
      isCorrect: false,
      displayOrder: this.questionForm.options.length + 1,
    });
  }
  removeOption(i: number): void {
    if (this.questionForm.options.length > 2) this.questionForm.options.splice(i, 1);
  }
  chooseCorrect(i: number): void {
    this.questionForm.options.forEach((x: any, index: number) => (x.isCorrect = index === i));
  }
  saveQuestion(): void {
    if (!this.questionForm.videoId) {
      this.notifier.warningToastr('Select the video for this question.');
      return;
    }
    this.questionForm.options.forEach((x: any, i: number) => (x.displayOrder = i + 1));
    this.saving = true;
    this.master
      .saveQuestion(this.questionId, this.questionForm)
      .pipe(finalize(() => (this.saving = false)))
      .subscribe({
        next: () => {
          this.notifier.successToastr('Question mapped to video.');
          this.resetQuestion();
          this.load();
        },
        error: (e) => this.notifier.warningToastr(e?.error?.message || 'Unable to save question.'),
      });
  }

  editMapping(row: MasterMapping): void {
    this.mappingId = row.planId;
    this.mappingForm = {
      planCode: row.planCode,
      planName: row.planName,
      trainingId: row.trainingId || null,
      departmentId: row.departmentId || null,
      completionDays: row.completionDays,
      isActive: row.isActive,
      items: row.items
        .filter((x) => x.isActive)
        .map((x, i) => ({
          videoId: x.videoId,
          sequenceNo: i + 1,
          minimumWatchPercent: x.minimumWatchPercent,
          passingPercent: x.passingPercent,
          mustPassAssignment: x.mustPassAssignment,
        })),
    };
    if (!this.mappingForm.items.length) this.addMappingVideo();
  }
  resetMapping(): void {
    this.mappingId = null;
    this.mappingForm = {
      planCode: '',
      planName: '',
      trainingId: null,
      departmentId: null,
      completionDays: 7,
      isActive: true,
      items: [{ videoId: 0, sequenceNo: 1, minimumWatchPercent: 90, passingPercent: 60, mustPassAssignment: true }],
    };
  }
  addMappingVideo(): void {
    this.mappingForm.items.push({
      videoId: 0,
      sequenceNo: this.mappingForm.items.length + 1,
      minimumWatchPercent: 90,
      passingPercent: 60,
      mustPassAssignment: true,
    });
  }
  removeMappingVideo(i: number): void {
    if (this.mappingForm.items.length > 1) this.mappingForm.items.splice(i, 1);
  }
  moveMappingVideo(i: number, delta: number): void {
    const j = i + delta;
    if (j < 0 || j >= this.mappingForm.items.length) return;
    const x = this.mappingForm.items[i];
    this.mappingForm.items[i] = this.mappingForm.items[j];
    this.mappingForm.items[j] = x;
    this.mappingForm.items.forEach((r: any, index: number) => (r.sequenceNo = index + 1));
  }
  saveMapping(): void {
    if (this.mappingForm.items.some((x: any) => !x.videoId)) {
      this.notifier.warningToastr('Select a video for every mapping row.');
      return;
    }
    this.mappingForm.items.forEach((x: any, i: number) => (x.sequenceNo = i + 1));
    this.saving = true;
    this.master
      .saveMapping(this.mappingId, this.mappingForm)
      .pipe(finalize(() => (this.saving = false)))
      .subscribe({
        next: () => {
          this.notifier.successToastr('Content mapping saved as Draft.');
          this.resetMapping();
          this.load();
        },
        error: (e) => this.notifier.warningToastr(e?.error?.message || 'Unable to save content mapping.'),
      });
  }
  publish(row: MasterMapping): void {
    this.saving = true;
    this.master
      .publish(row.planId)
      .pipe(finalize(() => (this.saving = false)))
      .subscribe({
        next: () => {
          this.notifier.successToastr('Content mapping published.');
          this.load();
        },
        error: (e) => this.notifier.warningToastr(e?.error?.message || 'Unable to publish mapping.'),
      });
  }
  draft(row: MasterMapping): void {
    this.saving = true;
    this.master
      .draft(row.planId)
      .pipe(finalize(() => (this.saving = false)))
      .subscribe({
        next: () => {
          this.notifier.successToastr('Content mapping moved to Draft.');
          this.load();
        },
        error: (e) => this.notifier.warningToastr(e?.error?.message || 'Unable to move mapping to Draft.'),
      });
  }
}
