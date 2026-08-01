import { Component, OnDestroy, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom, Subject, takeUntil } from 'rxjs';
import * as JSZip from 'jszip';
import { CertificateCompletionType, CertificateData, CertificatePrintRecord } from '../../../core/models/certificate-data.model';
import { Client } from '../../../core/models/client.model';
import { Training } from '../../../core/models/training.model';
import { CertificatePdfService } from '../../../core/services/certificate-pdf.service';
import { DataService } from '../../../core/services/data.service';
import { NotifierService } from '../../../core/services/notifier.service';
import { TrainingManagementService } from '../../../core/services/training-management.service';
import { ApiClientService } from '../../../core/services/api-client.service';
import { AuthService } from '../../../core/services/auth.service';
import { ClientManagementService } from '../../../core/services/client-management.service';
import { environment } from 'src/environments/environment';

interface CertificateUserOption {
  id: string;
  name: string;
  email: string;
  marks: number | null;
  completionType: CertificateCompletionType;
}

interface SaveFileHandle {
  createWritable(): Promise<{
    write(data: Blob): Promise<void>;
    close(): Promise<void>;
  }>;
}

interface FilePickerWindow extends Window {
  showSaveFilePicker?: (options: {
    suggestedName: string;
    types: Array<{ description: string; accept: Record<string, string[]> }>;
  }) => Promise<SaveFileHandle>;
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
  isSending = false;
  companies: Client[] = [];
  bulkTrainingList: Training[] = [];
  selectedCompanyId = '';
  selectedBulkTrainingId = '';
  isBulkGenerating = false;
  bulkProcessed = 0;
  bulkTotal = 0;
  bulkStatus = '';
  companySearch = '';
  bulkTrainingSearch = '';
  bulkTrainingName = '';
  bulkCoveredTopics = '';
  isCompanyDropdownOpen = false;
  isBulkTrainingDropdownOpen = false;

  emailCompanyId = '';
  emailTrainingId = '';
  emailDateValue = '';
  emailCompanySearch = '';
  emailTrainingSearch = '';
  emailUserSearch = '';
  emailTrainingList: Training[] = [];
  selectedEmailUserIds = new Set<string>();
  isEmailCompanyDropdownOpen = false;
  isEmailTrainingDropdownOpen = false;
  isEmailDateDropdownOpen = false;
  isBulkEmailSending = false;
  emailProcessed = 0;
  emailTotal = 0;
  emailStatus = '';

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
    private sanitizer: DomSanitizer,
    private trainingService: TrainingManagementService,
    private apiClient: ApiClientService,
    private authService: AuthService,
    private clientService: ClientManagementService
  ) { }

  ngOnInit(): void {
    this.loadTrainingList();
    this.loadCertificateUsers();
    this.loadCompanies();
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
    return this.UserData.find((user) => String(user.certificationDataId) === this.selectedUserId);
  }

  get filteredUserData(): any[] {
    const search = this.userSearch.trim().toLowerCase();
    if (!search) return this.UserData;
    return this.UserData.filter((user) =>
      `${user.userName || user.name || ''} ${user.email || ''} ${user.certificationNumber || user.certificateNumber || ''}`.toLowerCase().includes(search)
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

  get bulkPercentage(): number {
    return this.bulkTotal ? Math.round((this.bulkProcessed / this.bulkTotal) * 100) : 0;
  }

  get selectedCompany(): Client | undefined {
    return this.companies.find((company) => String(company.clientId) === this.selectedCompanyId);
  }

  get selectedBulkTraining(): Training | undefined {
    return this.bulkTrainingList.find(
      (training) => String(training.trainingId) === this.selectedBulkTrainingId
    );
  }

  get filteredBulkCompanies(): Client[] {
    const companyIds = new Set(this.allUserData.map((record) => String(record.location)));
    const search = this.companySearch.trim().toLowerCase();
    return this.companies.filter((company) =>
      companyIds.has(String(company.clientId))
      && (!search || `${company.clientName} ${company.clientId ?? ''}`.toLowerCase().includes(search))
    );
  }

  get filteredBulkTrainingList(): Training[] {
    const search = this.bulkTrainingSearch.trim().toLowerCase();
    if (!search) return this.bulkTrainingList;
    return this.bulkTrainingList.filter((training) =>
      `${this.getTrainingLabel(training)} ${training.trainingId ?? ''}`.toLowerCase().includes(search)
    );
  }

  get selectedEmailCompany(): Client | undefined {
    return this.companies.find((company) => String(company.clientId) === this.emailCompanyId);
  }

  get selectedEmailTraining(): Training | undefined {
    return this.emailTrainingList.find((training) => String(training.trainingId) === this.emailTrainingId);
  }

  get filteredEmailCompanies(): Client[] {
    const companyIds = new Set(this.allUserData.map((record) => String(record.location)));
    const search = this.emailCompanySearch.trim().toLowerCase();
    return this.companies.filter((company) =>
      companyIds.has(String(company.clientId))
      && (!search || `${company.clientName} ${company.clientId ?? ''}`.toLowerCase().includes(search))
    );
  }

  get filteredEmailTrainingList(): Training[] {
    const search = this.emailTrainingSearch.trim().toLowerCase();
    if (!search) return this.emailTrainingList;
    return this.emailTrainingList.filter((training) =>
      `${this.getTrainingLabel(training)} ${training.trainingId ?? ''}`.toLowerCase().includes(search)
    );
  }

  get emailDateOptions(): Array<{ value: string; label: string; count: number }> {
    if (!this.emailCompanyId || !this.emailTrainingId) return [];
    const counts = new Map<string, number>();
    this.allUserData
      .filter((record) => String(record.location) === this.emailCompanyId
        && String(record.trainingId) === this.emailTrainingId)
      .forEach((record) => {
        const value = this.getRecordDateValue(record);
        if (value) counts.set(value, (counts.get(value) || 0) + 1);
      });
    return Array.from(counts.entries())
      .sort(([left], [right]) => right.localeCompare(left))
      .map(([value, count]) => ({ value, count, label: this.formatDisplayDate(value) }));
  }

  get selectedEmailDateLabel(): string {
    return this.emailDateValue ? this.formatDisplayDate(this.emailDateValue) : '';
  }
  get emailUsers(): any[] {
    if (!this.emailCompanyId || !this.emailTrainingId || !this.emailDateValue) return [];
    const search = this.emailUserSearch.trim().toLowerCase();
    return this.allUserData.filter((record) => {
      const matchesSelection = String(record.location) === this.emailCompanyId
        && String(record.trainingId) === this.emailTrainingId
        && this.getRecordDateValue(record) === this.emailDateValue;
      const matchesSearch = !search || `${record.userName || record.name || ''} ${record.email || ''} ${record.certificationNumber || ''}`
        .toLowerCase().includes(search);
      return matchesSelection && matchesSearch;
    });
  }

  get selectedEmailUserCount(): number {
    return this.selectedEmailUserIds.size;
  }

  get selectableEmailUsers(): any[] {
    return this.emailUsers.filter((user) => this.isEmailUserEligible(user));
  }

  get allVisibleEmailUsersSelected(): boolean {
    return this.selectableEmailUsers.length > 0
      && this.selectableEmailUsers.every((user) => this.selectedEmailUserIds.has(String(user.certificationDataId)));
  }

  getEmailTrainingCertificateCount(training: Training): number {
    return this.allUserData.filter((record) =>
      String(record.location) === this.emailCompanyId
      && String(record.trainingId) === String(training.trainingId)
    ).length;
  }

  get emailPercentage(): number {
    return this.emailTotal ? Math.round((this.emailProcessed / this.emailTotal) * 100) : 0;
  }

  toggleEmailCompanyDropdown(): void {
    if (this.isBulkEmailSending) return;
    this.isEmailCompanyDropdownOpen = !this.isEmailCompanyDropdownOpen;
    this.isEmailTrainingDropdownOpen = false;
    this.isEmailDateDropdownOpen = false;
    if (this.isEmailCompanyDropdownOpen) this.emailCompanySearch = '';
  }

  toggleEmailTrainingDropdown(): void {
    if (!this.emailCompanyId || this.isBulkEmailSending) return;
    this.isEmailTrainingDropdownOpen = !this.isEmailTrainingDropdownOpen;
    this.isEmailCompanyDropdownOpen = false;
    this.isEmailDateDropdownOpen = false;
    if (this.isEmailTrainingDropdownOpen) this.emailTrainingSearch = '';
  }

  toggleEmailDateDropdown(): void {
    if (!this.emailTrainingId || this.isBulkEmailSending) return;
    this.isEmailDateDropdownOpen = !this.isEmailDateDropdownOpen;
    this.isEmailCompanyDropdownOpen = false;
    this.isEmailTrainingDropdownOpen = false;
  }

  selectEmailDate(value: string): void {
    this.emailDateValue = value;
    this.emailUserSearch = '';
    this.selectedEmailUserIds.clear();
    this.emailStatus = '';
    this.isEmailDateDropdownOpen = false;
  }
  selectEmailCompany(company: Client): void {
    this.emailCompanyId = String(company.clientId ?? '');
    this.emailTrainingId = '';
    this.emailDateValue = '';
    this.emailCompanySearch = company.clientName;
    this.emailTrainingSearch = '';
    this.emailUserSearch = '';
    this.selectedEmailUserIds.clear();
    this.emailStatus = '';
    this.isEmailCompanyDropdownOpen = false;
    this.isEmailTrainingDropdownOpen = false;
    this.isEmailDateDropdownOpen = false;
    this.updateEmailTrainingList();
  }

  selectEmailTraining(training: Training): void {
    this.emailTrainingId = String(training.trainingId ?? '');
    this.emailTrainingSearch = this.getTrainingLabel(training);
    this.emailDateValue = '';
    this.emailUserSearch = '';
    this.selectedEmailUserIds.clear();
    this.emailStatus = '';
    this.isEmailTrainingDropdownOpen = false;
    this.isEmailDateDropdownOpen = false;
  }

  isEmailUserEligible(user: any): boolean {
    return !!String(user?.email || '').trim() && !!String(user?.certificationNumber || '').trim();
  }
  isEmailUserSelected(userId: unknown): boolean {
    return this.selectedEmailUserIds.has(String(userId));
  }

  toggleEmailUser(userId: unknown): void {
    const id = String(userId);
    if (this.selectedEmailUserIds.has(id)) this.selectedEmailUserIds.delete(id);
    else this.selectedEmailUserIds.add(id);
  }

  toggleAllEmailUsers(): void {
    if (this.allVisibleEmailUsersSelected) {
      this.selectableEmailUsers.forEach((user) => this.selectedEmailUserIds.delete(String(user.certificationDataId)));
    } else {
      this.selectableEmailUsers.forEach((user) => this.selectedEmailUserIds.add(String(user.certificationDataId)));
    }
  }

  async sendSelectedCertificates(): Promise<void> {
    if (!this.emailCompanyId || !this.emailTrainingId || !this.emailDateValue || !this.selectedEmailUserIds.size) {
      this.notifier.warningToastr('Select a company, training, certificate date, and at least one participant.');
      return;
    }
    if (!this.authService.isServerAuthenticated()) {
      this.notifier.warningToastr('Sign in with your server account before sending certificate emails.', 'Authentication required');
      return;
    }

    const records = this.allUserData.filter((record) =>
      this.selectedEmailUserIds.has(String(record.certificationDataId))
      && String(record.location) === this.emailCompanyId
      && String(record.trainingId) === this.emailTrainingId
      && this.getRecordDateValue(record) === this.emailDateValue
    );
    const missingEmail = records.filter((record) => !String(record.email || '').trim()).length;
    const sendable = records.filter((record) => !!String(record.email || '').trim());
    if (!sendable.length) {
      this.notifier.warningToastr('The selected participants do not have email addresses.');
      return;
    }

    this.isBulkEmailSending = true;
    this.emailProcessed = 0;
    this.emailTotal = sendable.length;
    let failed = 0;
    try {
      for (const record of sendable) {
        const certificate = this.mapBulkCertificate(record);
        const recipientEmail = String(record.email).trim();
        this.emailStatus = `Sending ${this.emailProcessed + 1} of ${this.emailTotal} to ${recipientEmail}...`;
        try {
          const bytes = await this.pdfService.generate(certificate);
          const fileName = `${this.sanitizeFilePart(certificate.userName, 'Participant')}-${this.sanitizeFilePart(certificate.trainingName, 'Training')}.pdf`;
          const file = new File([new Blob([bytes], { type: 'application/pdf' })], fileName, { type: 'application/pdf' });
          await firstValueFrom(this.apiClient.upload<void>('CertificateOperation/send-email', file, {
            recipientEmail,
            recipientName: certificate.userName,
            trainingName: certificate.trainingName,
            certificateNumber: certificate.certificateNumber
          }));
        } catch (error) {
          failed++;
          console.error('Certificate email failed', { recipientEmail, error });
        }
        this.emailProcessed++;
        await this.yieldToBrowser();
      }

      const sent = this.emailTotal - failed;
      this.emailStatus = `Completed: ${sent} sent${failed ? `, ${failed} failed` : ''}${missingEmail ? `, ${missingEmail} skipped without email` : ''}.`;
      if (sent) this.notifier.successToastr(`${sent} certificate email${sent === 1 ? '' : 's'} sent.`);
      if (failed || missingEmail) this.notifier.warningToastr(this.emailStatus, 'Some emails need attention');
    } finally {
      this.isBulkEmailSending = false;
    }
  }

  private updateEmailTrainingList(): void {
    if (!this.emailCompanyId) {
      this.emailTrainingList = [];
      return;
    }
    const trainingIds = new Set(
      this.allUserData
        .filter((record) => String(record.location) === this.emailCompanyId)
        .map((record) => String(record.trainingId))
    );
    this.emailTrainingList = this.trainingList.filter((training) => trainingIds.has(String(training.trainingId)));
  }
  toggleCompanyDropdown(): void {
    if (this.isBulkGenerating) return;
    this.isCompanyDropdownOpen = !this.isCompanyDropdownOpen;
    this.isBulkTrainingDropdownOpen = false;
    if (this.isCompanyDropdownOpen) this.companySearch = '';
  }

  toggleBulkTrainingDropdown(): void {
    if (!this.selectedCompanyId || this.isBulkGenerating) return;
    this.isBulkTrainingDropdownOpen = !this.isBulkTrainingDropdownOpen;
    this.isCompanyDropdownOpen = false;
    if (this.isBulkTrainingDropdownOpen) this.bulkTrainingSearch = '';
  }

  selectCompany(company: Client): void {
    this.selectedCompanyId = String(company.clientId ?? '');
    this.selectedBulkTrainingId = '';
    this.companySearch = company.clientName;
    this.bulkTrainingSearch = '';
    this.bulkTrainingName = '';
    this.bulkCoveredTopics = '';
    this.isCompanyDropdownOpen = false;
    this.updateBulkTrainingList(this.allUserData);
  }

  selectBulkTraining(training?: Training): void {
    this.selectedBulkTrainingId = String(training?.trainingId ?? '');
    this.bulkTrainingSearch = training ? this.getTrainingLabel(training) : '';
    this.bulkTrainingName = training ? this.getTrainingLabel(training) : '';
    this.bulkCoveredTopics = training
      ? this.parseTopics(training.topicCovered, this.getTrainingLabel(training), training.trainingId).join(', ')
      : '';
    this.isBulkTrainingDropdownOpen = false;
  }

  getBulkCompanyCertificateCount(company: Client): number {
    return this.allUserData.filter(
      (record) => String(record.location) === String(company.clientId)
    ).length;
  }

  getBulkTrainingCertificateCount(training: Training): number {
    return this.allUserData.filter((record) =>
      String(record.location) === this.selectedCompanyId
      && String(record.trainingId) === String(training.trainingId)
    ).length;
  }

  async downloadAllCertificates(): Promise<void> {
    if (this.isBulkGenerating || !this.selectedCompanyId) return;

    let fileHandle: SaveFileHandle | null = null;
    try {
      fileHandle = await this.chooseZipLocation();
    } catch (error) {
      if ((error as DOMException)?.name === 'AbortError') return;
      console.error('ZIP save location could not be selected.', error);
    }

    this.isBulkGenerating = true;
    this.bulkProcessed = 0;
    this.bulkTotal = 0;
    this.bulkStatus = 'Loading certificate data...';

    try {
      const records = await firstValueFrom(this.trainingService.getCertificationData());
      const selectedRecords = this.filterBulkRecords(records || []);
      if (!selectedRecords.length) {
        this.notifier.warningToastr('No certificates found for the selected company and training.');
        return;
      }

      const zip = new JSZip();
      this.bulkTotal = selectedRecords.length;
      for (const record of selectedRecords) {
        const certificate = this.mapBulkCertificate(record);
        const bytes = await this.pdfService.generate(certificate);
        const folderName = this.sanitizeFilePart(certificate.trainingName, 'Training');
        const certificateNumber = this.sanitizeFilePart(certificate.certificateNumber, 'Certificate');
        const participant = this.sanitizeFilePart(certificate.userName, 'Participant');
        zip.file(`${folderName}/${certificateNumber}_${participant}.pdf`, bytes);
        this.bulkProcessed++;
        this.bulkStatus = `Generating ${this.bulkProcessed} of ${this.bulkTotal} certificates...`;
        await this.yieldToBrowser();
      }

      this.bulkStatus = 'Creating ZIP file...';
      const zipBlob = await zip.generateAsync({ type: 'blob' });
      await this.saveZip(zipBlob, fileHandle);
      this.bulkStatus = `Completed ${this.bulkTotal} certificates.`;
      this.notifier.successToastr(`${this.bulkTotal} certificates downloaded.`);
    } catch (error) {
      console.error('Bulk certificate generation failed.', error);
      this.bulkStatus = 'Bulk download failed.';
      this.notifier.warningToastr('Could not generate the certificate ZIP.', 'Generation failed');
    } finally {
      this.isBulkGenerating = false;
    }
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
      trainingName: this.getTrainingLabel(training),
      coveredTopics: this.parseTopics(training.topicCovered, this.getTrainingLabel(training), training.trainingId),
      //certificateNumber: this.createCertificateNumber(training.trainingId)
    };
    this.revokePreviewUrl();
  }

  selectUser(userId: string): void {
    this.selectedUserId = String(userId);
    const user = this.UserData.find((x: any) => String(x.certificationDataId) === String(userId));
    if (!user) return;
    this.userSearch = this.getUserLabel(user);
    this.isUserDropdownOpen = false;
    this.certificate = {
      ...this.certificate,
      certificateNumber: user.certificationNumber || user.certificateNumber || '',
      userName: this.formatPersonName(user.userName || user.name),
      marks: user.marks ?? user.totalPoints ?? null,
      completionType: user.completionType || 'assessment',
      dateOfIssue: this.toDateInputValue(
        user.issuedDate || user.date || user.certificationDate
      ),
      trainingHours: Number(user.days || 0) * 8,
      location: user.location || '',
      trainerName: user.trainerName || '',
    };
    this.revokePreviewUrl();
  }

  updateTopics(value: string): void {
    this.certificate.coveredTopics = this.parseTopics(value, this.certificate.trainingName, this.selectedTrainingId);
    this.revokePreviewUrl();
  }

  clearBulkDownload(): void {
    this.selectedCompanyId = '';
    this.selectedBulkTrainingId = '';
    this.companySearch = '';
    this.bulkTrainingSearch = '';
    this.bulkTrainingName = '';
    this.bulkCoveredTopics = '';
    this.bulkTrainingList = [];
    this.bulkProcessed = 0;
    this.bulkTotal = 0;
    this.bulkStatus = '';
    this.isCompanyDropdownOpen = false;
    this.isBulkTrainingDropdownOpen = false;
  }

  clearEmailCertificates(): void {
    this.emailCompanyId = '';
    this.emailTrainingId = '';
    this.emailDateValue = '';
    this.emailCompanySearch = '';
    this.emailTrainingSearch = '';
    this.emailUserSearch = '';
    this.emailTrainingList = [];
    this.selectedEmailUserIds.clear();
    this.isEmailCompanyDropdownOpen = false;
    this.isEmailTrainingDropdownOpen = false;
    this.isEmailDateDropdownOpen = false;
    this.emailProcessed = 0;
    this.emailTotal = 0;
    this.emailStatus = '';
  }
  clearAll(): void {
    this.selectedCompanyId = '';
    this.selectedBulkTrainingId = '';
    this.companySearch = '';
    this.bulkTrainingSearch = '';
    this.bulkTrainingList = [];
    this.bulkProcessed = 0;
    this.bulkTotal = 0;
    this.bulkStatus = '';
    this.isCompanyDropdownOpen = false;
    this.isBulkTrainingDropdownOpen = false;

    this.emailCompanyId = '';
    this.emailTrainingId = '';
    this.emailDateValue = '';
    this.emailCompanySearch = '';
    this.emailTrainingSearch = '';
    this.emailUserSearch = '';
    this.emailTrainingList = [];
    this.selectedEmailUserIds.clear();
    this.isEmailCompanyDropdownOpen = false;
    this.isEmailTrainingDropdownOpen = false;
    this.isEmailDateDropdownOpen = false;
    this.emailProcessed = 0;
    this.emailTotal = 0;
    this.emailStatus = '';

    this.selectedTrainingId = '';
    this.selectedUserId = '';
    this.trainingSearch = '';
    this.userSearch = '';
    this.UserData = [];
    this.isTrainingDropdownOpen = false;
    this.isUserDropdownOpen = false;
    this.certificate = this.createEmptyCertificate();
    this.revokePreviewUrl();
  }
  async preview(): Promise<void> {
    await this.runPdfAction(async () => {
      this.revokePreviewUrl();
      this.previewObjectUrl = await this.pdfService.createPreviewUrl(this.certificate);
      this.previewUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.previewObjectUrl);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 'Certificate preview is ready.');
  }

  async download(): Promise<void> {
    await this.runPdfAction(() => this.pdfService.download(this.certificate), 'Certificate downloaded.');
  }

  async print(): Promise<void> {
    await this.runPdfAction(() => this.pdfService.print(this.certificate), 'Print dialog opened.');
  }

  async sendEmail(): Promise<void> {
    if (!this.isCertificateReady()) {
      this.notifier.warningToastr('Select a training and user, then complete all certificate fields.');
      return;
    }

    if (!this.authService.isServerAuthenticated()) {
      this.notifier.warningToastr(
        'Sign in with your server account before sending certificate emails.',
        'Authentication required'
      );
      return;
    }

    const recipientEmail = String(this.selectedUser?.email || '').trim();
    if (!recipientEmail) {
      this.notifier.warningToastr('The selected participant does not have an email address.');
      return;
    }

    this.isSending = true;
    try {
      const bytes = await this.pdfService.generate(this.certificate);
      const file = new File(
        [new Blob([bytes], { type: 'application/pdf' })],
        this.getCertificateFileName(),
        { type: 'application/pdf' }
      );
      await firstValueFrom(this.apiClient.upload<void>('CertificateOperation/send-email', file, {
        recipientEmail,
        recipientName: this.certificate.userName,
        trainingName: this.certificate.trainingName,
        certificateNumber: this.certificate.certificateNumber
      }));
      this.notifier.successToastr(`Certificate sent to ${recipientEmail}.`);
    } catch (error) {
      console.error('Certificate email failed', error);
      this.notifier.warningToastr('Could not send the certificate email.', 'Email failed');
    } finally {
      this.isSending = false;
    }
  }

  getTrainingLabel(training: Training): string {
    return String(training.displayName || '').trim()
      || String(training.trainingName || '').trim()
      || String(training.trainingId || 'Training');
  }

  getTrainingTopicCount(training: Training): number {
    return this.parseTopics(
      training.topicCovered,
      this.getTrainingLabel(training),
      training.trainingId
    ).length;
  }

  getTrainingUserCount(training: Training): number {
    return this.allUserData.filter((user) => String(user.trainingId) === String(training.trainingId ?? '')).length;
  }

  getUserLabel(user: any): string {
    return [this.formatPersonName(user.userName || user.name), user.email].filter(Boolean).join(' - ');
  }

  formatPersonName(value: unknown): string {
    return String(value ?? '')
      .trim()
      .replace(/\s+/g, ' ')
      .toLocaleLowerCase('en-IN')
      .replace(/(^|[\s'-])([a-z])/g, (_match, separator: string, letter: string) =>
        `${separator}${letter.toUpperCase()}`
      );
  }

  normalizeParticipantName(): void {
    this.certificate.userName = this.formatPersonName(this.certificate.userName);
    this.revokePreviewUrl();
  }

  trackByUserId(_index: number, user: any): string {
    return String(user.certificationDataId ?? user.email ?? _index);
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

  private getCertificateFileName(): string {
    const slug = `${this.certificate.userName}-${this.certificate.trainingName}`
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '')
      .slice(0, 60);
    return `${slug || 'training-certificate'}.pdf`;
  }

  private isCertificateReady(): boolean {
    return !!this.selectedTrainingId && !!this.selectedUserId && !!this.certificate.userName.trim()
      && !!this.certificate.trainingName.trim() && !!this.certificate.certificateNumber.trim()
      && !!this.certificate.location.trim() && !!this.certificate.trainerName.trim()
      && this.certificate.trainingHours > 0;
  }

  // private loadTrainingList(): void {
  //   const headers = new HttpHeaders({ ETag: 'f88dd058fe004909615a64f01be66a7', 'Content-Type': 'application/json' });
  //   this.http.get('assets/Training.json', { headers, responseType: 'text' })
  //     .pipe(takeUntil(this.destroy$))
  //     .subscribe({
  //       next: (data) => {
  //         const decrypted = this.dataService.decrypt(data);
  //         this.trainingList = (decrypted?.Table || [])
  //           .map((item: any) => this.mapTraining(item))
  //           .sort((a: Training, b: Training) => Number(a.displayOrder || 0) - Number(b.displayOrder || 0));
  //       },
  //       error: () => {
  //         this.trainingList = [];
  //         this.notifier.warningToastr('Training list could not be loaded.');
  //       }
  //     });
  // }

  // Future API integration: call this method instead of loadTrainingList().
  private loadTrainingList(): void {
    this.trainingService.getPaged(1, 100).pipe(takeUntil(this.destroy$)).subscribe({
      next: (response) => {
        this.trainingList = (response.items || [])
          .sort((a, b) => Number(a.displayOrder || 0) - Number(b.displayOrder || 0));
        this.updateBulkTrainingList(this.allUserData);
      },
      error: (error) => {
        console.error('Failed to load training data.', { status: error.status });
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
    // const reqHeader = new HttpHeaders({
    //   'Content-Type': 'application/json'
    // });


    // this.http.get(environment.certificateUrl, { headers: reqHeader, responseType: 'text' })
    //   .pipe(takeUntil(this.destroy$))
    //   .subscribe({
    //     next: (data) => {
    //       const decryptedData = this.dataService.decrypt(data);
    //       this.allUserData = Array.isArray(decryptedData) ? decryptedData : [];
    //       this.getTrainingUsers();
    //     },
    //     error: () => {
    //       this.allUserData = [];
    //       this.UserData = [];
    //     }
    //   });

    this.trainingService.getCertificationData()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data) => { 
          this.allUserData = Array.isArray(data) ? data : []; 
          this.getTrainingUsers();
        },
        error: () => {
          this.allUserData = [];
          this.UserData = [];
        }
      });
  }


  private getTrainingUsers(): void {
    this.UserData = this.allUserData.filter((user) => String(user.trainingId) === this.selectedTrainingId); 
  }

  private loadCompanies(): void {
    this.clientService.getAll().pipe(takeUntil(this.destroy$)).subscribe({
      next: (companies) => {
        this.companies = (companies || [])
          .filter((company) => company.isActive !== false)
          .sort((a, b) => a.clientName.localeCompare(b.clientName));
      },
      error: () => this.notifier.warningToastr('Company list could not be loaded.')
    });
  }

  private updateBulkTrainingList(records: CertificatePrintRecord[]): void {
    if (!this.selectedCompanyId) {
      this.bulkTrainingList = [];
      return;
    }
    const trainingIds = new Set(
      records
        .filter((record) => String(record.location) === this.selectedCompanyId)
        .map((record) => String(record.trainingId))
    );
    this.bulkTrainingList = this.trainingList.filter(
      (training) => trainingIds.has(String(training.trainingId))
    );
  }

  private filterBulkRecords(records: CertificatePrintRecord[]): CertificatePrintRecord[] {
    return records.filter((record) =>
      String(record.location) === this.selectedCompanyId
      && (!this.selectedBulkTrainingId || String(record.trainingId) === this.selectedBulkTrainingId)
      && !!String(record.certificationNumber || '').trim()
    );
  }

  private mapBulkCertificate(record: CertificatePrintRecord): CertificateData {
    const training = this.trainingList.find(
      (item) => String(item.trainingId) === String(record.trainingId)
    );
    const defaultTrainingName = training
      ? this.getTrainingLabel(training)
      : (record.trainingName || `Training ${record.trainingId}`);
    const useBulkDetails = !!this.selectedBulkTrainingId
      && String(record.trainingId) === this.selectedBulkTrainingId;
    const trainingName = useBulkDetails && this.bulkTrainingName.trim()
      ? this.bulkTrainingName.trim()
      : defaultTrainingName;
    return {
      userName: this.formatPersonName(record.userName || record.name),
      coveredTopics: useBulkDetails && this.bulkCoveredTopics.trim()
        ? this.parseTopics(this.bulkCoveredTopics, trainingName, record.trainingId)
        : this.parseTopics(training?.topicCovered, trainingName, record.trainingId),
      completionType: record.completionType || 'assessment',
      marks: record.totalPoints ?? null,
      passingMarks: 60,
      trainingName,
      certificateNumber: record.certificationNumber,
      trainingHours: Number(record.days || 0) * 8,
      location: record.location || '',
      trainerName: record.trainerName || '',
      dateOfIssue: this.toDateInputValue(record.issuedDate || record.date)
    };
  }

  private async chooseZipLocation(): Promise<SaveFileHandle | null> {
    const pickerWindow = window as FilePickerWindow;
    if (!pickerWindow.showSaveFilePicker) return null;
    return pickerWindow.showSaveFilePicker({
      suggestedName: `${this.getSelectedCompanyFileName()}_Certificates.zip`,
      types: [{ description: 'ZIP archive', accept: { 'application/zip': ['.zip'] } }]
    });
  }

  private async saveZip(blob: Blob, fileHandle: SaveFileHandle | null): Promise<void> {
    if (fileHandle) {
      const writable = await fileHandle.createWritable();
      await writable.write(blob);
      await writable.close();
      return;
    }
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${this.getSelectedCompanyFileName()}_Certificates.zip`;
    link.click();
    setTimeout(() => URL.revokeObjectURL(link.href), 1000);
  }

  private getSelectedCompanyFileName(): string {
    const company = this.companies.find(
      (item) => String(item.clientId) === this.selectedCompanyId
    );
    return this.sanitizeFilePart(company?.clientName, 'Company');
  }

  private sanitizeFilePart(value: unknown, fallback: string): string {
    const sanitized = String(value ?? '')
      .normalize('NFKC')
      .replace(/[<>:"/\\|?*\u0000-\u001F]/g, '_')
      .replace(/[.\s]+$/g, '')
      .trim()
      .slice(0, 100);
    return sanitized || fallback;
  }

  private yieldToBrowser(): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, 0));
  }
  private getRecordDateValue(record: any): string {
    return this.toDateInputValue(record?.issuedDate || record?.date || record?.certificationDate);
  }

  private formatDisplayDate(value: string): string {
    const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
    return match ? `${match[3]}-${match[2]}-${match[1]}` : value;
  }
  private toDateInputValue(value: unknown): string {
    if (value instanceof Date) {
      return Number.isNaN(value.getTime()) ? '' : this.formatDateParts(
        value.getFullYear(),
        value.getMonth() + 1,
        value.getDate()
      );
    }

    const text = String(value ?? '').trim();
    if (!text) return '';

    // SQL/HTML date formats: yyyy-MM-dd, yyyy/MM/dd, with an optional time.
    const yearFirst = /^(\d{4})[-/](\d{1,2})[-/](\d{1,2})(?:[T\s].*)?$/.exec(text);
    if (yearFirst) {
      return this.formatDateParts(Number(yearFirst[1]), Number(yearFirst[2]), Number(yearFirst[3]));
    }

    // Bulk-upload dates use the Indian day-first convention.
    const dayFirst = /^(\d{1,2})[-/](\d{1,2})[-/](\d{4})(?:[T\s].*)?$/.exec(text);
    if (dayFirst) {
      return this.formatDateParts(Number(dayFirst[3]), Number(dayFirst[2]), Number(dayFirst[1]));
    }

    // Supports unambiguous values such as "28 Jul 2026" without throwing.
    const parsed = new Date(text);
    return Number.isNaN(parsed.getTime()) ? '' : this.formatDateParts(
      parsed.getFullYear(),
      parsed.getMonth() + 1,
      parsed.getDate()
    );
  }

  private formatDateParts(year: number, month: number, day: number): string {
    const candidate = new Date(year, month - 1, day);
    const isValid = candidate.getFullYear() === year
      && candidate.getMonth() === month - 1
      && candidate.getDate() === day;

    return isValid
      ? `${String(year).padStart(4, '0')}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`
      : '';
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
