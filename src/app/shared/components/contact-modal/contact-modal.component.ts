import { Component, OnDestroy, OnInit } from '@angular/core';
import emailjs from '@emailjs/browser';
import { NotifierService } from '../../../core/services/notifier.service';

@Component({
  selector: 'app-contact-modal',
  templateUrl: './contact-modal.component.html',
  styleUrls: ['./contact-modal.component.scss']
})
export class ContactModalComponent implements OnInit, OnDestroy {
  visible = false;
  name = '';
  email = '';
  mobile = '';
  messages = '';
  isSending = false;
  isDisplayed = localStorage.getItem('isDisplayed') || 'true';

  private readonly SERVICE_ID = 'service_duh8g6f';
  private readonly TEMPLATE_ID = 'template_b8pcczp';
  private readonly PUBLIC_KEY = 'ZT9MYx-Gi_6z-chnr';
  private openTimer?: ReturnType<typeof setTimeout>;
  private closeTimer?: ReturnType<typeof setTimeout>;

  constructor(private notifierService: NotifierService) { }

  ngOnInit(): void { 
     localStorage.setItem('isDisplayed', 'true');
    if (localStorage.getItem('isDisplayed') == 'false' || this.isDisplayed === 'false') { 
      this.openTimer = setTimeout(() => {
        this.visible = true;
        localStorage.setItem('isDisplayed', 'true');
      });
    }
  }

  ngOnDestroy(): void {
    if (this.openTimer) clearTimeout(this.openTimer);
    if (this.closeTimer) clearTimeout(this.closeTimer);
  }

  close(): void {
    this.visible = false;
    localStorage.setItem('isDisplayed', 'true');
    if (this.closeTimer) clearTimeout(this.closeTimer);
  }

  onShellClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (target.classList.contains('contactModal__overlay')) {
      this.close();
    }
  }

  async sendToMe(): Promise<void> {
    if (this.isSending) return;

    if (!this.name || !this.email || !this.mobile) {
      this.notifierService.warningToastr('Please fill out all required fields correctly.');
      return;
    }

    const templateParams = {
      from_name: this.name,
      user_email: this.email,
      phone_number: this.mobile,
      message: this.messages,
      subject_line: `New contact request from ${this.name}`,
    };

    this.isSending = true;
    try {
      await emailjs.send(
        this.SERVICE_ID,
        this.TEMPLATE_ID,
        templateParams,
        this.PUBLIC_KEY
      );

      this.notifierService.successToastr('Message sent successfully!');
      this.name = '';
      this.email = '';
      this.mobile = '';
      this.messages = '';
      this.close();
    } catch {
      this.notifierService.warningToastr('Failed to send message. Please try again.');
    } finally {
      this.isSending = false;
    }
  }
}
