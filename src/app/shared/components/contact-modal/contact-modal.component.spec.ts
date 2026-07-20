import { fakeAsync, tick } from '@angular/core/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import emailjs from '@emailjs/browser';
import { NotifierService } from '../../../core/services/notifier.service';
import { ContactModalComponent } from './contact-modal.component';

describe('ContactModalComponent', () => {
  let fixture: ComponentFixture<ContactModalComponent>;
  let component: ContactModalComponent;
  let notifier: jasmine.SpyObj<NotifierService>;

  beforeEach(async () => {
    localStorage.clear();
    localStorage.setItem('isDisplayed', 'false');
    notifier = jasmine.createSpyObj<NotifierService>('NotifierService', ['successToastr', 'warningToastr']);

    await TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [ContactModalComponent],
      providers: [{ provide: NotifierService, useValue: notifier }]
    }).compileComponents();

    fixture = TestBed.createComponent(ContactModalComponent);
    component = fixture.componentInstance;
  });

  afterEach(() => localStorage.clear());

  it('opens once based on localStorage flag', fakeAsync(() => {
    fixture.detectChanges();
    tick();

    expect(component.visible).toBeTrue();
    expect(localStorage.getItem('isDisplayed')).toBe('true');
  }));

  it('closes on overlay shell click', () => {
    const target = document.createElement('div');
    target.classList.add('contactModal__overlay');
    component.visible = true;

    component.onShellClick({ target } as unknown as MouseEvent);

    expect(component.visible).toBeFalse();
    expect(localStorage.getItem('isDisplayed')).toBe('true');
  });

  it('validates required fields before sending', async () => {
    await component.sendToMe();

    expect(notifier.warningToastr).toHaveBeenCalledWith('Please fill out all required fields correctly.');
  });

  it('sends contact request, resets fields, and closes modal', async () => {
    spyOn(emailjs, 'send').and.returnValue(Promise.resolve({ status: 200, text: 'OK' } as any));
    component.visible = true;
    component.name = 'Customer';
    component.email = 'customer@example.com';
    component.mobile = '9876543210';
    component.messages = 'Hello';

    await component.sendToMe();

    expect(emailjs.send).toHaveBeenCalled();
    expect(notifier.successToastr).toHaveBeenCalledWith('Message sent successfully!');
    expect(component.visible).toBeFalse();
    expect(component.name).toBe('');
  });
});
