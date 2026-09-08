import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { NotifierService } from '../../../core/services/notifier.service';
export interface ZeissLoadingState {
  active: boolean;
  message: string;
}
@Injectable({ providedIn: 'root' })
export class ZeissLoadingService {
  private count = 0;
  private timer: ReturnType<typeof setTimeout> | null = null;
  private message = 'Please wait...';
  private success = '';
  private failed = false;
  private subject = new BehaviorSubject<ZeissLoadingState>({ active: false, message: this.message });
  readonly state$ = this.subject.asObservable();
  constructor(private notifier: NotifierService) {}
  begin(message: string) {
    this.count++;
    this.message = message || 'Please wait...';
    if (this.subject.value.active) {
      this.subject.next({ active: true, message: this.message });
      return;
    }
    if (!this.timer)
      this.timer = setTimeout(() => {
        this.timer = null;
        if (this.count > 0) this.subject.next({ active: true, message: this.message });
      }, 140);
  }
  registerSuccess(message: string) {
    if (message) this.success = message;
  }
  registerFailure() {
    this.failed = true;
    this.success = '';
  }
  end() {
    this.count = Math.max(0, this.count - 1);
    if (this.count > 0) return;
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
    if (this.subject.value.active) this.subject.next({ active: false, message: this.message });
    if (this.failed)
      this.notifier.warningToastr('The action could not be completed. Check the message on screen.', 'Zeiss Module');
    else if (this.success) this.notifier.successToastr(this.success, 'Zeiss Module');
    this.failed = false;
    this.success = '';
  }
}
