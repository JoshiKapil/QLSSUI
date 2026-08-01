import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpResponse } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, Meta, Title } from '@angular/platform-browser';
import emailjs from '@emailjs/browser';
import { of } from 'rxjs';
import { DataService } from '../../core/services/data.service';
import { NotifierService } from '../../core/services/notifier.service';
import { SiteInteractionsService } from '../../core/services/site-interactions.service';
import { TrainingManagementService } from '../../core/services/training-management.service';
import { TrainingComponent } from './training.component';

describe('TrainingComponent', () => {
  let fixture: ComponentFixture<TrainingComponent>;
  let component: TrainingComponent;
  let dataService: jasmine.SpyObj<DataService>;
  let notifier: jasmine.SpyObj<NotifierService>;
  let interactions: jasmine.SpyObj<SiteInteractionsService>;
  let sanitizer: jasmine.SpyObj<DomSanitizer>;
  let trainingService: jasmine.SpyObj<TrainingManagementService>;

  beforeEach(async () => {
    dataService = jasmine.createSpyObj<DataService>('DataService', ['decrypt']);
    notifier = jasmine.createSpyObj<NotifierService>('NotifierService', ['successToastr', 'warningToastr']);
    interactions = jasmine.createSpyObj<SiteInteractionsService>('SiteInteractionsService', ['initPage']);
    sanitizer = jasmine.createSpyObj<DomSanitizer>('DomSanitizer', ['bypassSecurityTrustResourceUrl']);
    sanitizer.bypassSecurityTrustResourceUrl.and.callFake((url) => url as any);
    trainingService = jasmine.createSpyObj<TrainingManagementService>('TrainingManagementService', ['getPaged', 'getDocument']);
    trainingService.getPaged.and.returnValue(of({
      items: [{ trainingId: 1, trainingName: 'Core Tools', displayOrder: 1 }],
      totalCount: 1,
      pageNumber: 1,
      pageSize: 100
    } as any));

    await TestBed.configureTestingModule({
      imports: [FormsModule, HttpClientTestingModule],
      declarations: [TrainingComponent],
      providers: [
        Title,
        Meta,
        { provide: DomSanitizer, useValue: sanitizer },
        { provide: DataService, useValue: dataService },
        { provide: NotifierService, useValue: notifier },
        { provide: SiteInteractionsService, useValue: interactions }
        ,{ provide: TrainingManagementService, useValue: trainingService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TrainingComponent);
    component = fixture.componentInstance;
  });

  it('loads training data on init and clears loading flag', () => {
    fixture.detectChanges();

    expect(trainingService.getPaged).toHaveBeenCalledWith(1, 100);
    expect(component.TrainingList.length).toBe(1);
    expect(component.isLoading).toBeFalse();
  });

  it('opens PDF modal and sanitizes the viewer URL when PDF exists', () => {
    fixture.detectChanges();
    const blob = new Blob(['pdf'], { type: 'application/pdf' });
    trainingService.getDocument.and.returnValue(of(new HttpResponse({ body: blob, status: 200 })));
    spyOn(URL, 'createObjectURL').and.returnValue('blob:test-pdf');

    component.onViewPdf({ TrainingId: 3, TrainingName: 'Core Tools', DisplayName: 'Core Tools Training' });

    expect(trainingService.getDocument).toHaveBeenCalledWith(3);
    expect(component.isReadMoreModalOpen).toBeTrue();
    expect(component.pdfModalVisible).toBeTrue();
    expect(component.isPdfLoading).toBeFalse();
    expect(component.selectedPdfUrl).toBeTruthy();
  });

  it('closes read more modal and prevents PDF shortcuts', () => {
    const event = jasmine.createSpyObj<KeyboardEvent>('KeyboardEvent', ['preventDefault', 'stopPropagation'], {
      key: 'p',
      ctrlKey: true,
      metaKey: false
    });

    component.isReadMoreModalOpen = true;
    component.pdfModalVisible = true;
    component.selectedPdfUrl = {} as any;
    component.blockPdfShortcuts(event);
    component.closeReadMoreModal();

    expect(event.preventDefault).toHaveBeenCalled();
    expect(event.stopPropagation).toHaveBeenCalled();
    expect(component.isReadMoreModalOpen).toBeFalse();
    expect(component.selectedPdfUrl).toBeNull();
  });

  it('submits interested form successfully and resets fields', async () => {
    spyOn(emailjs, 'send').and.returnValue(Promise.resolve({ status: 200, text: 'OK' } as any));
    component.openInterestedModal({ DisplayName: 'Core Tools' });
    component.name = 'Learner';
    component.email = 'learner@example.com';
    component.mobile = '9876543210';

    await component.Send();

    expect(emailjs.send).toHaveBeenCalled();
    expect(component.isInterestedModalOpen).toBeFalse();
    expect(component.TrainingName).toBe('');
    expect(notifier.successToastr).toHaveBeenCalled();
  });
});
