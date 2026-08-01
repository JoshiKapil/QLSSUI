import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from '../../../environments/environment';
import { AdminManagementService } from './admin-management.service';

interface TestRecord {
  id: number;
  name: string;
}

describe('AdminManagementService', () => {
  let service: AdminManagementService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AdminManagementService]
    });
    service = TestBed.inject(AdminManagementService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
    localStorage.clear();
  });

  it('requests all records from the endpoint', () => {
    const response = [{ id: 1, name: 'Alpha' }];

    service.getAll<TestRecord>('Test').subscribe((records) => expect(records).toEqual(response));

    const req = httpMock.expectOne(`${environment.apiBaseUrl}/Test`);
    expect(req.request.method).toBe('GET');
    req.flush(response);
  });

  it('falls back to local records when getAll API fails', () => {
    localStorage.setItem('qlss_admin_Test', JSON.stringify([{ id: 7, name: 'Local' }]));

    service.getAll<TestRecord>('Test').subscribe((records) => expect(records[0].name).toBe('Local'));

    httpMock.expectOne(`${environment.apiBaseUrl}/Test`).flush(null, { status: 500, statusText: 'Server Error' });
  });

  it('posts new records and writes the saved value locally', () => {
    const record = { id: 0, name: 'New' };
    const saved = { id: 10, name: 'New' };

    service.save<TestRecord>('Test', 'id', record).subscribe((result) => expect(result).toEqual(saved));

    const req = httpMock.expectOne(`${environment.apiBaseUrl}/Test`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(record);
    req.flush(saved);

    expect(JSON.parse(localStorage.getItem('qlss_admin_Test') || '[]')).toEqual([saved]);
  });

  it('puts existing records and searches normalized text', () => {
    service.save<TestRecord>('Test', 'id', { id: 2, name: 'Existing' }).subscribe();

    const req = httpMock.expectOne(`${environment.apiBaseUrl}/Test/2`);
    expect(req.request.method).toBe('PUT');
    req.flush({ id: 2, name: 'Existing' });

    service.search<TestRecord>('Test', ['name'], 'exist').subscribe((records) => expect(records.length).toBe(1));
    httpMock.expectOne(`${environment.apiBaseUrl}/Test`).flush([{ id: 2, name: 'Existing' }]);
  });

  it('uploads bulk files as form data', () => {
    const file = new File(['a,b'], 'records.csv', { type: 'text/csv' });

    service.uploadBulk('Test', file).subscribe((result) => expect(result).toBeNull());

    const req = httpMock.expectOne(`${environment.apiBaseUrl}/Test/upload`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body instanceof FormData).toBeTrue();
    req.flush(null);
  });
});
