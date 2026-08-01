import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { AdminManagementService } from './admin-management.service';
import { ApiClientService } from './api-client.service';
import { CertificationService } from './certification.service';
import { ClientManagementService } from './client-management.service';
import { LinkedInCommentService } from './linkedin-comment.service';
import { LinkedInPostService } from './linkedin-post.service';
import { TrainingManagementService } from './training-management.service';

describe('management wrapper services', () => {
  let adminService: jasmine.SpyObj<AdminManagementService>;
  let apiClient: jasmine.SpyObj<ApiClientService>;

  beforeEach(() => {
    adminService = jasmine.createSpyObj<AdminManagementService>('AdminManagementService', [
      'getAll',
      'search',
      'save',
      'uploadBulk'
    ]);
    adminService.getAll.and.returnValue(of([]));
    adminService.search.and.returnValue(of([]));
    adminService.save.and.returnValue(of({} as any));
    adminService.uploadBulk.and.returnValue(of(void 0));
    apiClient = jasmine.createSpyObj<ApiClientService>('ApiClientService', ['get', 'post', 'put', 'delete', 'upload']);
    apiClient.post.and.returnValue(of({} as any));
    apiClient.put.and.returnValue(of({} as any));
    apiClient.get.and.returnValue(of([] as any));

    TestBed.configureTestingModule({
      providers: [
        CertificationService,
        ClientManagementService,
        TrainingManagementService,
        LinkedInPostService,
        LinkedInCommentService,
        { provide: ApiClientService, useValue: apiClient },
        { provide: AdminManagementService, useValue: adminService }
      ]
    });
  });

  it('delegates certification endpoints and bulk upload', () => {
    const service = TestBed.inject(CertificationService);
    const file = new File(['x'], 'bulk.csv');

    service.getAll().subscribe();
    service.search('cert').subscribe();
    service.save({ certificationNumber: '001' } as any).subscribe();
    service.uploadBulk(file).subscribe();

    expect(apiClient.get).toHaveBeenCalledWith('CertificationData');
    expect(apiClient.post).toHaveBeenCalledWith('CertificateOperation/save', { certificationNumber: '001' });
    expect(adminService.uploadBulk).toHaveBeenCalledWith('CertificateOperation', file);
  });

  it('delegates client, training, post, and comment service calls', () => {
    TestBed.inject(ClientManagementService).search('client').subscribe();
    TestBed.inject(TrainingManagementService).save({ trainingId: 'T1' } as any).subscribe();
    TestBed.inject(LinkedInPostService).getAll().subscribe();
    TestBed.inject(LinkedInCommentService).search('comment').subscribe();

    expect(adminService.search).toHaveBeenCalledWith('Client', ['clientName', 'clientId'], 'client');
    expect(apiClient.put).toHaveBeenCalledWith('TrainingOperation/T1', { trainingId: 'T1' });
    expect(adminService.getAll).toHaveBeenCalledWith('LinkedInPost');
    expect(adminService.search).toHaveBeenCalledWith('LinkedInComment', ['commentId', 'postId', 'author'], 'comment');
  });
});
