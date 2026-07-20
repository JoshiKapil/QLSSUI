import { Component, OnDestroy, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject, takeUntil } from 'rxjs';
import { CertificateCompletionType, CertificateData } from '../../../core/models/certificate-data.model';
import { Training } from '../../../core/models/training.model';
import { CertificatePdfService } from '../../../core/services/certificate-pdf.service';
import { DataService } from '../../../core/services/data.service';
import { NotifierService } from '../../../core/services/notifier.service';
import { environment } from 'src/environments/environment';

interface CertificateUserOption {
  id: string;
  name: string;
  email: string;
  marks: number | null;
  completionType: CertificateCompletionType;
}

@Component({
  selector: 'app-print-certificate',
  templateUrl: './print-certificate.component.html',
  styleUrls: ['./print-certificate.component.scss']
})
export class PrintCertificateComponent implements OnInit, OnDestroy {
  trainingList: Training[] = [];
  selectedTrainingId = '';
  selectedUserId = '';
  trainingSearch = '';
  userSearch = '';
  UserData: any[] = [];
  allUserData: any[] = [];
  isTrainingDropdownOpen = false;
  isUserDropdownOpen = false;
  previewUrl: SafeResourceUrl | null = null;
  private previewObjectUrl = '';
  isGenerating = false;

  // Temporary data until the training-result API is connected.
  readonly users: CertificateUserOption[] = [
    { id: 'usr-101', name: 'Aarav Sharma', email: 'aarav.sharma@example.com', marks: 86, completionType: 'assessment' },
    { id: 'usr-102', name: 'Meera Kulkarni', email: 'meera.kulkarni@example.com', marks: 52, completionType: 'assessment' },
    { id: 'usr-103', name: 'Vikram Patil', email: 'vikram.patil@example.com', marks: null, completionType: 'attendance' }
  ];

  certificate: CertificateData = this.createEmptyCertificate();
  private readonly destroy$ = new Subject<void>();

  constructor(
    private http: HttpClient,
    private dataService: DataService,
    private pdfService: CertificatePdfService,
    private notifier: NotifierService,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.loadTrainingList();
    this.loadCertificateUsers();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.revokePreviewUrl();
  }

  get filteredTrainingList(): Training[] {
    const search = this.trainingSearch.trim().toLowerCase();
    if (!search) return this.trainingList;
    return this.trainingList.filter((training) => {
      const searchable = `${this.getTrainingLabel(training)} ${training.trainingId || ''} ${training.topicCovered || ''}`.toLowerCase();
      return searchable.includes(search);
    });
  }

  get selectedTraining(): Training | undefined {
    return this.trainingList.find((training) => String(training.trainingId ?? '') === this.selectedTrainingId);
  }

  get selectedUser(): any | undefined {
    return this.UserData.find((user) => String(user.CertificationDataId) === this.selectedUserId);
  }

  get filteredUserData(): any[] {
    const search = this.userSearch.trim().toLowerCase();
    if (!search) return this.UserData;
    return this.UserData.filter((user) =>
      `${user.UserName || ''} ${user.Email || ''} ${user.CertificationNumber || ''}`.toLowerCase().includes(search)
    );
  }

  get completionPreview(): string {
    if (!this.selectedUser) return 'Select a user to calculate the completion statement.';
    if (this.certificate.completionType === 'attendance') {
      return 'has successfully attended the training program on';
    }
    return (this.certificate.marks ?? 0) >= (this.certificate.passingMarks ?? 60)
      ? 'has successfully attended and completed the assessment on'
      : 'has successfully attended the training program on';
  }

  toggleTrainingDropdown(): void {
    this.isTrainingDropdownOpen = !this.isTrainingDropdownOpen;
    this.isUserDropdownOpen = false;
    if (this.isTrainingDropdownOpen) this.trainingSearch = '';
  }

  toggleUserDropdown(): void {
    if (!this.selectedTrainingId) return;
    this.isUserDropdownOpen = !this.isUserDropdownOpen;
    this.isTrainingDropdownOpen = false;
    if (this.isUserDropdownOpen) this.userSearch = '';
  }

  selectTraining(training: Training): void {
    this.selectedTrainingId = String(training.trainingId ?? '');
    this.trainingSearch = this.getTrainingLabel(training);
    this.isTrainingDropdownOpen = false;
    this.isUserDropdownOpen = false;
    this.selectedUserId = '';
    this.userSearch = '';
    this.getTrainingUsers();
    this.certificate = {
      ...this.createEmptyCertificate(),
      trainingName: training.displayName.replace('Training', '') || training.trainingName.replace('Training', ''),
      coveredTopics: this.parseTopics(training.topicCovered, training.displayName || training.displayName, training.trainingId),
      //certificateNumber: this.createCertificateNumber(training.trainingId)
    };
    this.revokePreviewUrl();
  }

  selectUser(userId: string): void {
    this.selectedUserId = String(userId);
    const user = this.UserData.find((x: any) => String(x.CertificationDataId) === String(userId));
    if (!user) return;
    this.userSearch = this.getUserLabel(user);
    this.isUserDropdownOpen = false;
    this.certificate = {
      ...this.certificate,
      certificateNumber: user.CertificationNumber,
      userName: user.UserName,
      marks: user.marks,
      completionType: user.completionType,      
      dateOfIssue: new Date(user.IssuedDate).toISOString().slice(0, 10),      
      trainingHours:Number(user.Days) * 8,
      location: user.Location,
      trainerName: user.TrainerName,
    };
    this.revokePreviewUrl();
  }

  updateTopics(value: string): void {
    this.certificate.coveredTopics = this.parseTopics(value, this.certificate.trainingName, this.selectedTrainingId);
    this.revokePreviewUrl();
  }

  async preview(): Promise<void> {
    await this.runPdfAction(async () => {
      this.revokePreviewUrl();
      this.previewObjectUrl = await this.pdfService.createPreviewUrl(this.certificate);
      this.previewUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.previewObjectUrl);
    }, 'Certificate preview is ready.');
  }

  async download(): Promise<void> {
    await this.runPdfAction(() => this.pdfService.download(this.certificate), 'Certificate downloaded.');
  }

  async print(): Promise<void> {
    await this.runPdfAction(() => this.pdfService.print(this.certificate), 'Print dialog opened.');
  }

  getTrainingLabel(training: Training): string {
    return training.displayName.replace('Training', '') || training.trainingName.replace('Training', '') || String(training.trainingId || 'Training');
  }

  getTrainingTopicCount(training: Training): number {
    return this.parseTopics(
      training.topicCovered,
      training.displayName.replace('Training', '') || training.trainingName.replace('Training', ''),
      training.trainingId
    ).length;
  }

  getTrainingUserCount(training: Training): number {
    return this.allUserData.filter((user) => String(user.TrainingId) === String(training.trainingId ?? '')).length;
  }

  getUserLabel(user: any): string {
    return [user.UserName, user.Email].filter(Boolean).join(' - ');
  }

  trackByUserId(_index: number, user: any): string {
    return String(user.CertificationDataId ?? user.Email ?? _index);
  }
  trackByTrainingId(_index: number, training: Training): string {
    return String(training.trainingId ?? training.displayName);
  }

  private async runPdfAction(action: () => Promise<void>, successMessage: string): Promise<void> {
    if (!this.isCertificateReady()) {
      this.notifier.warningToastr('Select a training and user, then complete all certificate fields.');
      return;
    }
    this.isGenerating = true;
    try {
      await action();
      this.notifier.successToastr(successMessage);
    } catch (error) {
      console.error('Certificate PDF generation failed', error);
      this.notifier.warningToastr('Could not generate the certificate PDF.', 'Generation failed');
    } finally {
      this.isGenerating = false;
    }
  }

  private isCertificateReady(): boolean {
    return !!this.selectedTrainingId && !!this.selectedUserId && !!this.certificate.userName.trim()
      && !!this.certificate.trainingName.trim() && !!this.certificate.certificateNumber.trim()
      && !!this.certificate.location.trim() && !!this.certificate.trainerName.trim()
      && this.certificate.trainingHours > 0;
  }

  private loadTrainingList(): void {
    const headers = new HttpHeaders({ ETag: 'f88dd058fe004909615a64f01be66a7', 'Content-Type': 'application/json' });
    this.http.get('assets/Training.json', { headers, responseType: 'text' })
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data) => {
          const decrypted = this.dataService.decrypt(data);
          this.trainingList = (decrypted?.Table || [])
            .map((item: any) => this.mapTraining(item))
            .sort((a: Training, b: Training) => Number(a.displayOrder || 0) - Number(b.displayOrder || 0));
        },
        error: () => {
          this.trainingList = [];
          this.notifier.warningToastr('Training list could not be loaded.');
        }
      });
  }

  private mapTraining(item: any): Training {
    return {
      trainingId: item.trainingId ?? item.TrainingId ?? item.TrainingID ?? item.Id ?? item.id ?? '',
      trainingName: item.trainingName ?? item.TrainingName ?? item.Name ?? '',
      trainingDesc: item.trainingDesc ?? item.TrainingDesc ?? item.Description ?? '',
      topicCovered: item.topicCovered ?? item.TopicCovered ?? item.TopicCoveredName ?? '',
      displayName: item.displayName ?? item.DisplayName ?? item.TrainingName ?? '',
      image: item.image ?? item.Image ?? '',
      displayOrder: Number(item.displayOrder ?? item.DisplayOrder ?? 0)
    };
  }

  private parseTopics(value?: string, trainingName = '', trainingId?: string | number): string[] {
    if (!value?.trim()) return this.getDefaultTopics(trainingName, trainingId);
    const plainText = value.replace(/<[^>]*>/g, ' ').replace(/&amp;/g, '&').replace(/&nbsp;/g, ' ');
    const topics = plainText.split(',').map((topic) => topic.replace(/^[-\s]+/, '').trim()).filter(Boolean);
    return topics.length ? topics : this.getDefaultTopics(trainingName, trainingId);
  }

  private getDefaultTopics(trainingName: string, trainingId?: string | number): string[] {
    const normalizedName = trainingName.toLowerCase();

    if (normalizedName.includes('ims internal')) {
      return [
        'Integrated Management System Requirements',
        'Internal Audit Planning and Execution',
        'Audit Findings and Corrective Actions'
      ];
    }

    if (normalizedName.includes('iatf') || normalizedName.includes('16949')) {
      return [
        'IATF 16949 Standard Requirements',
        'Automotive Process Approach',
        'Internal Audit Planning and Execution',
        'Nonconformity and Corrective Actions'
      ];
    }

    if (normalizedName.includes('core tool')) {
      return [
        'Advanced Product Quality Planning (APQP)',
        'Production Part Approval Process (PPAP)',
        'Statistical Process Control (SPC)',
        'Measurement System Analysis (MSA)',
        'Failure Mode and Effects Analysis (FMEA)',
        'Control Plan'
      ];
    }

    if (normalizedName.includes('7 qc') || normalizedName.includes('seven qc')) {
      return [
        'Check Sheet',
        'Histogram',
        'Pareto Chart',
        'Cause and Effect Diagram',
        'Scatter Diagram',
        'Control Chart',
        'Stratification'
      ];
    }

    const genericTopics = [
      'Introduction and Training Objectives',
      'Core Concepts and Terminology',
      'Process and System Requirements',
      'Practical Applications',
      'Case Studies and Exercises',
      'Assessment and Review',
      'Continuous Improvement Actions'
    ];
    const testCounts = [3, 4, 6, 7];
    const seed = `${trainingId ?? ''}${trainingName}`;
    const hash = seed.split('').reduce((total, character) => total + character.charCodeAt(0), 0);
    return genericTopics.slice(0, testCounts[hash % testCounts.length]);
  }

  private createCertificateNumber(trainingId?: string | number, userId = 'PENDING'): string {
    const date = new Date();
    const ymd = `${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, '0')}${String(date.getDate()).padStart(2, '0')}`;
    const trainingCode = String(trainingId || 'TRN').replace(/\W/g, '').slice(-5).toUpperCase();
    const sequence = (userId.match(/\d+/g)?.join('') || '1').slice(-6).padStart(6, '0');
    return `QLSS/${trainingCode}/${date.getFullYear()}/${sequence}`;
  }

  private loadCertificateUsers(): void {
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    this.http.get(environment.certificateUrl, { headers: reqHeader, responseType: 'text' })
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data) => {
          const decryptedData = this.dataService.decrypt(data);
          this.allUserData = Array.isArray(decryptedData) ? decryptedData : [];
          this.getTrainingUsers();
        },
        error: () => {
          this.allUserData = [];
          this.UserData = [];
        }
      });
  }


  private getTrainingUsers(): void {
    this.UserData = this.allUserData.filter((user) => String(user.TrainingId) === this.selectedTrainingId);
  }

  private createEmptyCertificate(): CertificateData {
    return {
      userName: '',
      coveredTopics: [],
      completionType: 'assessment',
      marks: null,
      passingMarks: 60,
      trainingName: '',
      certificateNumber: '',
      trainingHours: 8,
      location: 'Pune, India',
      trainerName: 'QLSS Training Faculty',
      dateOfIssue: new Date().toISOString().slice(0, 10)
    };
  }

  private revokePreviewUrl(): void {
    if (this.previewObjectUrl) URL.revokeObjectURL(this.previewObjectUrl);
    this.previewObjectUrl = '';
    this.previewUrl = null;
  }
}

