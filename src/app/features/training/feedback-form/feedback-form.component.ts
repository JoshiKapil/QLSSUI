import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TrainingManagementService } from '../../../core/services/training-management.service';
import { TrainerService } from '../../../core/services/trainer.service';
import { TrainingFeedbackService } from '../../../core/services/training-feedback.service';
import { Trainer } from '../../../core/models/trainer.model';
import { Training } from '../../../core/models/training.model';
import { TrainingFeedback } from '../../../core/models/training-feedback.model';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-feedback-form',
  templateUrl: './feedback-form.component.html',
  styleUrls: ['./feedback-form.component.scss']
})
export class FeedbackFormComponent implements OnInit {
  form!: FormGroup;
  trainers: Trainer[] = [];
  trainings: Training[] = [];
  submitting = false;
  successMessage = '';
  errorMessage = '';
  feedbacks: TrainingFeedback[] = [];
  historyLoading = false;
  historyError = '';
  currentPage = 1;
  readonly pageSize = 5;
  trainerSearch = '';
  trainingSearch = '';
  trainerDropdownOpen = false;
  trainingDropdownOpen = false;

  ratingOptions = [1, 2, 3, 4, 5];

  constructor(
    private fb: FormBuilder,
    private trainerService: TrainerService,
    private trainingService: TrainingManagementService,
    private feedbackService: TrainingFeedbackService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.loadTrainerList();
    this.loadTrainingList();
    this.loadFeedbackHistory();
  }

  private initForm(): void {
    this.form = this.fb.group({
      trainerId: [null, Validators.required],
      trainingId: [null, Validators.required],
      UserName :[null,Validators.required],
      overallExperience: [5, [Validators.required, Validators.min(1), Validators.max(5)]],
      trainerKnowledge: [5, [Validators.required, Validators.min(1), Validators.max(5)]],
      contentPresentation: [5, [Validators.required, Validators.min(1), Validators.max(5)]],
      satisfaction: [5, [Validators.required, Validators.min(1), Validators.max(5)]],
      likedMost: ['', Validators.required],
      suggestions: ['', Validators.required],
      usefulness: ['', Validators.required],
      recommend: [true, Validators.required]
    });
  }

  private loadTrainerList(): void {
    this.trainerService.getAll().subscribe({
      next: (items) => (this.trainers = items || []),
      error: () => (this.trainers = [])
    });
  }

  private loadTrainingList(): void {
    this.trainingService.getAll().subscribe({
      next: (items) => (this.trainings = items || []),
      error: () => (this.trainings = [])
    });
  }

  get filteredTrainers(): Trainer[] {
    const search = this.trainerSearch.trim().toLowerCase();
    return !search ? this.trainers : this.trainers.filter((item) =>
      `${item.name || ''} ${item.trainerId || ''}`.toLowerCase().includes(search)
    );
  }

  get filteredTrainings(): Training[] {
    const search = this.trainingSearch.trim().toLowerCase();
    return !search ? this.trainings : this.trainings.filter((item) =>
      `${this.getTrainingLabel(item)} ${item.trainingId || ''} ${item.topicCovered || ''}`.toLowerCase().includes(search)
    );
  }

  toggleTrainerDropdown(): void {
    this.trainerDropdownOpen = !this.trainerDropdownOpen;
    this.trainingDropdownOpen = false;
    if (this.trainerDropdownOpen) this.trainerSearch = '';
  }

  toggleTrainingDropdown(): void {
    this.trainingDropdownOpen = !this.trainingDropdownOpen;
    this.trainerDropdownOpen = false;
    if (this.trainingDropdownOpen) this.trainingSearch = '';
  }

  selectTrainer(trainer: Trainer): void {
    this.form.patchValue({ trainerId: trainer.trainerId });
    this.trainerSearch = trainer.name || '';
    this.trainerDropdownOpen = false;
    this.form.get('trainerId')?.markAsTouched();
  }

  selectTraining(training: Training): void {
    this.form.patchValue({ trainingId: training.trainingId });
    this.trainingSearch = this.getTrainingLabel(training);
    this.trainingDropdownOpen = false;
    this.form.get('trainingId')?.markAsTouched();
  }

  getSelectedTrainerLabel(): string {
    return this.getTrainerName(this.form?.value?.trainerId) || 'Select trainer';
  }

  getSelectedTrainingLabel(): string {
    const selected = this.trainings.find((item) => Number(item.trainingId) === Number(this.form?.value?.trainingId));
    return selected ? this.getTrainingLabel(selected) : 'Select training';
  }

  setRating(controlName: string, rating: number): void {
    this.form.get(controlName)?.setValue(rating);
    this.form.get(controlName)?.markAsTouched();
  }

  get totalPages(): number {
    return Math.max(1, Math.ceil(this.feedbacks.length / this.pageSize));
  }

  get pagedFeedbacks(): TrainingFeedback[] {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.feedbacks.slice(start, start + this.pageSize);
  }

  get pageNumbers(): number[] {
    return Array.from({ length: this.totalPages }, (_, index) => index + 1);
  }

  goToPage(page: number): void {
    this.currentPage = Math.min(Math.max(1, page), this.totalPages);
  }

  loadFeedbackHistory(): void {
    this.historyLoading = true;
    this.historyError = '';
    this.feedbackService.getAll().subscribe({
      next: (items) => {
        this.feedbacks = (Array.isArray(items) ? items : []).sort((a, b) =>
          this.getFeedbackTimestamp(b) - this.getFeedbackTimestamp(a)
        );
        this.currentPage = Math.min(this.currentPage, this.totalPages);
      },
      error: () => {
        this.feedbacks = [];
        this.historyError = 'Unable to load previous feedback.';
        this.historyLoading = false;
      },
      complete: () => (this.historyLoading = false)
    });
  }

  getFeedbackDate(feedback: TrainingFeedback): string | null {
    return feedback.createdAt || feedback.feedbackDate || null;
  }

  getAverageRating(feedback: TrainingFeedback): number {
    return Math.round((feedback.overallExperience + feedback.trainerKnowledge + feedback.contentPresentation + feedback.satisfaction) / 4);
  }

  onSubmit(): void {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    }

    this.submitting = true;
    this.successMessage = '';
    this.errorMessage = '';

    const payload: TrainingFeedback = {
      userId: this.authService.getCurrentUser()?.id,
      userName:  this.form.value.UserName,//this authService.getCurrentUser()?.name || this.authService.getCurrentUser()?.email ||
      trainerId: Number(this.form.value.trainerId),
      trainingId: Number(this.form.value.trainingId),
      trainingName: this.getTrainingName(this.form.value.trainingId),
      trainerName: this.getTrainerName(this.form.value.trainerId),
      overallExperience: Number(this.form.value.overallExperience),
      trainerKnowledge: Number(this.form.value.trainerKnowledge),
      contentPresentation: Number(this.form.value.contentPresentation),
      satisfaction: Number(this.form.value.satisfaction),
      likedMost: this.form.value.likedMost?.trim() ?? '',
      suggestions: this.form.value.suggestions?.trim() ?? '',
      usefulness: this.form.value.usefulness?.trim() ?? '',
      recommend: Boolean(this.form.value.recommend)
    };


    this.feedbackService.submitFeedback(payload).subscribe({
      next: () => {
        this.successMessage = 'Thank you! Your feedback has been submitted successfully.';
        this.form.reset({
          trainerId: null,
          trainingId: null,
          userName :null,
          overallExperience: 5,
          trainerKnowledge: 5,
          contentPresentation: 5,
          satisfaction: 5,
          likedMost: '',
          suggestions: '',
          usefulness: '',
          recommend: true
        });
        this.trainerSearch = '';
        this.trainingSearch = '';
        this.currentPage = 1;
        this.loadFeedbackHistory();
      },
      error: (error) => {
        this.errorMessage = 'Unable to submit feedback at this time. Please try again later.';
        console.error('Training feedback error', error);
      },
      complete: () => {
        this.submitting = false;
      }
    });
  }

  private getTrainerName(trainerId: number): string {
    return this.trainers.find((item) => Number(item.trainerId) === Number(trainerId))?.name || '';
  }

  private getTrainingName(trainingId: number): string {
    return this.trainings.find((item) => Number(item.trainingId) === Number(trainingId))?.trainingName || '';
  }

  getTrainingLabel(training: Training): string {
    return String(training.displayName || '').trim() || String(training.trainingName || '').trim() || `Training ${training.trainingId}`;
  }

  private getFeedbackTimestamp(feedback: TrainingFeedback): number {
    const value = this.getFeedbackDate(feedback);
    return value ? new Date(value).getTime() || 0 : 0;
  }

  trackById(index: number, item: { trainerId?: number; trainingId?: number }): number {
    return Number(item.trainerId ?? item.trainingId ?? index);
  }
}
