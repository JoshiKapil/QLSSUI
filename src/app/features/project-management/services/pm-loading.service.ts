import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { NotifierService } from '../../../core/services/notifier.service';

export interface PmLoadingState {
  active: boolean;
  message: string;
}

@Injectable({ providedIn: 'root' })
export class PmLoadingService {
  private activeRequests = 0;
  private showTimer: ReturnType<typeof setTimeout> | null = null;
  private currentMessage = 'Please wait...';
  private pendingSuccess = '';
  private pendingFailure = false;

  private readonly stateSubject = new BehaviorSubject<PmLoadingState>({
    active: false,
    message: this.currentMessage,
  });

  readonly state$ = this.stateSubject.asObservable();

  constructor(private readonly notifier: NotifierService) {}

  begin(message: string): void {
    this.activeRequests += 1;
    this.currentMessage = message || 'Please wait...';

    if (this.stateSubject.value.active) {
      this.stateSubject.next({ active: true, message: this.currentMessage });
      return;
    }

    if (!this.showTimer) {
      // Small delay prevents a distracting flash for very fast HTTP calls.
      this.showTimer = setTimeout(() => {
        this.showTimer = null;
        if (this.activeRequests > 0) {
          this.stateSubject.next({ active: true, message: this.currentMessage });
        }
      }, 140);
    }
  }

  registerSuccess(message: string): void {
    if (message) {
      this.pendingSuccess = message;
    }
  }

  registerFailure(): void {
    this.pendingFailure = true;
    this.pendingSuccess = '';
  }

  end(): void {
    this.activeRequests = Math.max(0, this.activeRequests - 1);
    if (this.activeRequests > 0) return;

    if (this.showTimer) {
      clearTimeout(this.showTimer);
      this.showTimer = null;
    }

    if (this.stateSubject.value.active) {
      this.stateSubject.next({ active: false, message: this.currentMessage });
    }

    // Show one toaster after the complete PM operation chain settles.
    // This avoids multiple toasts when one user action performs save + assignment + refresh.
    if (this.pendingFailure) {
      this.notifier.warningToastr(
        'The action could not be completed. Please check the message shown on the screen.',
        'Project Management',
      );
    } else if (this.pendingSuccess) {
      this.notifier.successToastr(this.pendingSuccess, 'Project Management');
    }

    this.pendingFailure = false;
    this.pendingSuccess = '';
  }
}
