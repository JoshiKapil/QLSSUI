import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { Meta, Title } from '@angular/platform-browser';
import emailjs from '@emailjs/browser';
import { NotifierService } from '../../core/services/notifier.service';
import { SiteInteractionsService } from '../../core/services/site-interactions.service';
import { ContactComponent } from './contact.component';

describe('ContactComponent', () => {
  let fixture: ComponentFixture<ContactComponent>;
  let component: ContactComponent;
  let notifier: jasmine.SpyObj<NotifierService>;
  let interactions: jasmine.SpyObj<SiteInteractionsService>;

  beforeEach(async () => {
    notifier = jasmine.createSpyObj<NotifierService>('NotifierService', ['successToastr', 'warningToastr']);
    interactions = jasmine.createSpyObj<SiteInteractionsService>('SiteInteractionsService', ['initPage']);

    await TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [ContactComponent],
      providers: [
        Title,
        Meta,
        { provide: NotifierService, useValue: notifier },
        { provide: SiteInteractionsService, useValue: interactions }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('creates and initializes page interactions', () => {
    component.ngAfterViewInit();

    expect(component).toBeTruthy();
    expect(interactions.initPage).toHaveBeenCalled();
  });

  it('sends contact email and resets form fields', async () => {
    spyOn(emailjs, 'send').and.returnValue(Promise.resolve({ status: 200, text: 'OK' } as any));
    component.name = 'Customer';
    component.email = 'customer@example.com';
    component.mobile = '9876543210';
    component.messages = 'Hello';

    await component.sendToMe();

    expect(emailjs.send).toHaveBeenCalled();
    expect(notifier.successToastr).toHaveBeenCalledWith('Message sent successfully!');
    expect(component.name).toBe('');
    expect(component.email).toBe('');
    expect(component.mobile).toBe('');
  });

  it('shows a warning when EmailJS fails', async () => {
    spyOn(emailjs, 'send').and.returnValue(Promise.reject(new Error('network')));

    await component.sendToMe();

    expect(notifier.warningToastr).toHaveBeenCalledWith('Failed to send message. Please try again.');
  });
});
