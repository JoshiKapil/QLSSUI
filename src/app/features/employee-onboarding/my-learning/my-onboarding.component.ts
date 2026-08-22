import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NotifierService } from '../../../core/services/notifier.service';
import { OnboardingEmployeeItem, MyOnboarding, OnboardingNotification } from '../models/employee-onboarding.models';
import { EmployeeOnboardingService } from '../services/employee-onboarding.service';

@Component({ selector: 'app-my-onboarding', templateUrl: './my-onboarding.component.html', styleUrls: ['./my-onboarding.component.scss'] })
export class MyOnboardingComponent implements OnInit, OnDestroy {
  @ViewChild('videoPlayer') videoPlayer?: ElementRef<HTMLVideoElement>;
  data: MyOnboarding = { items: [], unreadNotifications: 0 };
  selected?: OnboardingEmployeeItem;
  answers: Record<number, number> = {};
  loading = true;
  savingProgress = false;
  notifications: OnboardingNotification[] = [];
  submitting = false;
  lastProgressSentAt = 0;

  constructor(private api: EmployeeOnboardingService, private notifier: NotifierService) {}

  ngOnInit(): void { this.load(); this.loadNotifications(); }
  ngOnDestroy(): void { this.saveCurrentProgress(false); }

  load(preferredItemId?: number): void {
    this.loading = true;
    this.api.my().subscribe({
      next: data => {
        this.data = data;
        const preferred = data.items.find(x => x.enrollmentItemId === preferredItemId);
        const current = preferred || data.items.find(x => ['Available', 'VideoInProgress', 'AssignmentReady'].includes(x.status)) || data.items[data.items.length - 1];
        this.select(current, false);
        this.loading = false;
      },
      error: () => { this.loading = false; this.notifier.warningToastr('Unable to load employee onboarding.'); }
    });
  }

  select(item?: OnboardingEmployeeItem, saveFirst = true): void {
    if (!item || item.status === 'Locked') return;
    if (saveFirst && this.selected && this.selected.enrollmentItemId !== item.enrollmentItemId) this.saveCurrentProgress(false);
    this.selected = item;
    this.answers = {};
    setTimeout(() => this.resumeVideo(), 50);
  }

  onLoadedMetadata(): void { this.resumeVideo(); }

  onTimeUpdate(): void {
    const now = Date.now();
    if (now - this.lastProgressSentAt < 5000) return;
    this.lastProgressSentAt = now;
    this.saveCurrentProgress(false);
  }

  onEnded(): void { this.saveCurrentProgress(true); }

  submitAssignment(): void {
    if (!this.selected || this.submitting) return;
    const questions = this.selected.assignmentQuestions || [];
    if (questions.some(q => !this.answers[q.questionId])) {
      this.notifier.warningToastr('Please answer every question before submitting.');
      return;
    }
    this.submitting = true;
    const answers = questions.map(q => ({ questionId: q.questionId, selectedOptionId: this.answers[q.questionId] }));
    this.api.submitAssignment(this.selected.enrollmentItemId, answers).subscribe({
      next: result => {
        const showScore = this.selected?.showResultAfterSubmit !== false;
        const message = showScore
          ? (result.passed ? `Assignment completed. Score ${result.percentage}%` : `Score ${result.percentage}%. Please try again.`)
          : (result.passed ? 'Assignment completed successfully.' : 'Assignment submitted. Please try again.');
        this.notifier.successToastr(message);
        const id = this.selected?.enrollmentItemId;
        this.submitting = false;
        this.load(id);
      },
      error: err => { this.submitting = false; this.notifier.warningToastr(err?.error?.message || 'Assignment could not be submitted.'); }
    });
  }

  watchPercent(item: OnboardingEmployeeItem): number {
    const duration = item.videoDurationSeconds || 0;
    return duration > 0 ? Math.min(100, Math.round(item.watchedSeconds * 100 / duration)) : 0;
  }

  statusClass(status: string): string { return status.toLowerCase().replace(/\s+/g, '-'); }

  markRead(notification: OnboardingNotification): void {
    if (notification.isRead) return;
    this.api.markNotificationRead(notification.notificationId).subscribe(() => { notification.isRead = true; this.data.unreadNotifications = Math.max(0, this.data.unreadNotifications - 1); });
  }

  private loadNotifications(): void { this.api.notifications().subscribe(rows => this.notifications = rows.slice(0, 4)); }

  private resumeVideo(): void {
    const video = this.videoPlayer?.nativeElement;
    if (!video || !this.selected || this.selected.status === 'Completed') return;
    const position = Math.max(0, this.selected.videoPositionSeconds || 0);
    if (Number.isFinite(video.duration) && position < video.duration - 1) video.currentTime = position;
  }

  private saveCurrentProgress(ended: boolean): void {
    const video = this.videoPlayer?.nativeElement;
    const item = this.selected;
    if (!video || !item || item.status === 'Locked' || item.status === 'Completed' || item.status === 'AssignmentReady' || !Number.isFinite(video.duration) || video.duration <= 0 || this.savingProgress) return;
    this.savingProgress = true;
    this.api.saveVideoProgress(item.enrollmentItemId, Math.floor(video.currentTime), Math.floor(video.duration), ended).subscribe({
      next: updated => {
        const index = this.data.items.findIndex(x => x.enrollmentItemId === updated.enrollmentItemId);
        if (index >= 0) this.data.items[index] = updated;
        this.selected = updated;
        this.savingProgress = false;
        if (updated.status === 'AssignmentReady') this.notifier.successToastr('Video completed. Your assignment is now unlocked.');
      },
      error: () => { this.savingProgress = false; }
    });
  }
}
