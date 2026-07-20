import { AfterViewInit, Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { SiteInteractionsService } from '../../core/services/site-interactions.service';
import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';
import { NotifierService } from '../../core/services/notifier.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements AfterViewInit {
  
  name = '';
  email = '';
  mobile = '';
  messages = '';
  private readonly SERVICE_ID = 'service_duh8g6f';
  private readonly TEMPLATE_ID = 'template_b8pcczp';
  private readonly PUBLIC_KEY = 'ZT9MYx-Gi_6z-chnr';

  constructor(
    private interactions: SiteInteractionsService,
    private title: Title,
    private meta: Meta,
    private notifierService: NotifierService
  ) {
    this.title.setTitle('Contact - QLSS Consulting');
    this.meta.updateTag({
      name: 'description',
      content: 'QLSS Business Consulting services, training, operational excellence and business transformation.'
    });
  }

  ngAfterViewInit(): void {
    this.interactions.initPage();
  }

  async sendToMe() {
    const templateParams = {
      from_name: this.name,
      user_email: this.email,
      phone_number: this.mobile,
      subject_line: `New contact request from ${this.name}`,
    };

    try {
      const response = await emailjs.send(
        this.SERVICE_ID,
        this.TEMPLATE_ID,
        templateParams,
        this.PUBLIC_KEY
      );
      this.notifierService.successToastr('Message sent successfully!')

      this.name = '';
      this.email = '';
      this.mobile = '';
      this.messages = '';
      //this.contactForm.reset();

    } catch (err) {
      this.notifierService.warningToastr('Failed to send message. Please try again.')
    }
  }
}
