import { HttpErrorResponse } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Meta, Title } from '@angular/platform-browser';
import { of, throwError } from 'rxjs';
import { CertificationService } from '../../core/services/certification.service';
import { SiteInteractionsService } from '../../core/services/site-interactions.service';
import { VerifyComponent } from './verify.component';

describe('VerifyComponent', () => {
  let fixture: ComponentFixture<VerifyComponent>;
  let component: VerifyComponent;
  let certificationService: jasmine.SpyObj<CertificationService>;
  let interactions: jasmine.SpyObj<SiteInteractionsService>;

  beforeEach(async () => {
    certificationService = jasmine.createSpyObj<CertificationService>('CertificationService', ['getByNumber']);
    interactions = jasmine.createSpyObj<SiteInteractionsService>('SiteInteractionsService', ['initPage']);

    await TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [VerifyComponent],
      providers: [
        Title,
        Meta,
        { provide: CertificationService, useValue: certificationService },
        { provide: SiteInteractionsService, useValue: interactions }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(VerifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('creates and initializes page interactions after view init', () => {
    component.ngAfterViewInit();
    expect(component).toBeTruthy();
    expect(interactions.initPage).toHaveBeenCalled();
  });

  it('shows validation message when certificate number is empty', () => {
    component.CertificateNo = '  ';
    component.Validate();
    expect(component.Certificate).toBeFalse();
    expect(component.resultMessage).toBe('Please enter a certificate number.');
    expect(certificationService.getByNumber).not.toHaveBeenCalled();
  });

  it('verifies certificates through the API', () => {
    certificationService.getByNumber.and.returnValue(of({
      certificationNumber: 'QLSS/IATF/IA/001',
      name: 'Learner',
      date: '2026-01-01',
      trainingId: 7,
      trainingName: 'IATF'
    } as any));
    component.CertificateNo = '001';
    component.Validate();

    expect(certificationService.getByNumber).toHaveBeenCalledWith('001');
    expect(component.Certificate).toBeTrue();
    expect(component.UserData[0].UserName).toBe('Learner');
    expect(component.resultMessage).toBe('Certificate Verified.');
  });

  it('handles a missing certificate', () => {
    certificationService.getByNumber.and.returnValue(
      throwError(() => new HttpErrorResponse({ status: 404 }))
    );
    component.CertificateNo = 'missing';
    component.Validate();
    expect(component.Certificate).toBeFalse();
    expect(component.resultMessage).toBe('Certificate Not Found.');
  });
});
