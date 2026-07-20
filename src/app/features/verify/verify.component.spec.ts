import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Meta, Title } from '@angular/platform-browser';
import { environment } from '../../../environments/environment';
import { DataService } from '../../core/services/data.service';
import { SiteInteractionsService } from '../../core/services/site-interactions.service';
import { VerifyComponent } from './verify.component';

describe('VerifyComponent', () => {
  let fixture: ComponentFixture<VerifyComponent>;
  let component: VerifyComponent;
  let httpMock: HttpTestingController;
  let dataService: jasmine.SpyObj<DataService>;
  let interactions: jasmine.SpyObj<SiteInteractionsService>;

  beforeEach(async () => {
    dataService = jasmine.createSpyObj<DataService>('DataService', ['decrypt']);
    interactions = jasmine.createSpyObj<SiteInteractionsService>('SiteInteractionsService', ['initPage']);

    await TestBed.configureTestingModule({
      imports: [FormsModule, HttpClientTestingModule],
      declarations: [VerifyComponent],
      providers: [
        Title,
        Meta,
        { provide: DataService, useValue: dataService },
        { provide: SiteInteractionsService, useValue: interactions }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(VerifyComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  afterEach(() => httpMock.verify());

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
  });

  it('verifies certificates using decrypted source data', () => {
    dataService.decrypt.and.returnValue({
      Table: [{ CertificationNumber: 'QLSS/IATF/IA/001', UserName: 'Learner', IssuedDate: '2026-01-01', Topic: 'IATF' }]
    });
    component.CertificateNo = '001';

    component.Validate();

    const req = httpMock.expectOne(environment.certificateUrl);
    expect(req.request.method).toBe('GET');
    expect(req.request.responseType).toBe('text');
    req.flush('encrypted');

    expect(component.Certificate).toBeTrue();
    expect(component.UserData[0].UserName).toBe('Learner');
    expect(component.resultMessage).toBe('Certificate Verified.');
  });

  it('handles certificate source errors without marking as verified', () => {
    component.CertificateNo = 'missing';

    component.Validate();

    httpMock.expectOne(environment.certificateUrl).flush('error', { status: 404, statusText: 'Not Found' });

    expect(component.Certificate).toBeFalse();
    expect(component.resultMessage).toBe('Unable to load certificate data.');
  });
});
