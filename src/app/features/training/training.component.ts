import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer, Meta, SafeResourceUrl, Title } from '@angular/platform-browser';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { SiteInteractionsService } from '../../core/services/site-interactions.service';
import { DataService } from '../../core/services/data.service';
import emailjs from '@emailjs/browser';
import { NotifierService } from 'src/app/core/services/notifier.service';
import { TrainingManagementService } from '../../core/services/training-management.service';
// interface TrainingCard {
//   category: string;
//   categoryClass: 'card-dev' | 'card-design' | 'card-data';
//   fillClass: 'dev-fill' | 'design-fill' | 'data-fill';
//   iconClass: string;
//   title: string;
//   description: string;
//   hours: number;
//   modules: number;
//   progress: number;
//   instructor: {
//     name: string;
//     title: string;
//     avatar: string;
@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.scss']
})
export class TrainingComponent implements AfterViewInit, OnInit, OnDestroy {
  @ViewChild('categoryTagsScroller') categoryTagsScroller?: ElementRef<HTMLDivElement>;
  TrainingList: any[] = [];
  isLoading = true;
  Name = '';
  CId: number | null = null;
  pdfSrc = '';
  pdfModalVisible = false;
  selectedPdfUrl: SafeResourceUrl | null = null;
  selectedTrainingItem: any = null;
  isReadMoreModalOpen = false;
  isInterestedModalOpen = false;
  isTakeTestModalOpen = false;
  isPdfLoading = false;
  pdfErrorMessage = '';
  private Destroy$ = new Subject<void>();
  private pdfObjectUrl: string | null = null;
  ismainLoading: boolean = false;
  isLoggedIn: boolean = false; name = '';
  email = '';
  TrainingName = '';
  mobile = '';
  messages = '';
  testUserName = '';
  testUserEmail = '';
  testUserMobile = '';
  CategoryList: any[] = [];
  selectedCategoryId: number = 0;
  searchText: string = '';
  filteredTrainings: any = [];  // Displayed data

  private readonly SERVICE_ID = 'service_duh8g6f';
  private readonly TEMPLATE_ID = 'template_f53kvve';
  private readonly PUBLIC_KEY = 'ZT9MYx-Gi_6z-chnr';

  constructor(
    private interactions: SiteInteractionsService,
    private title: Title,
    private meta: Meta,
    private _HttpClient: HttpClient,
    private dataService: DataService,
    private trainingService: TrainingManagementService,
    private notifierService: NotifierService,
    private sanitizer: DomSanitizer,
    private router: Router
  ) {
    this.title.setTitle('Training - QLSS Consulting');
    this.meta.updateTag({
      name: 'description',
      content: 'QLSS Business Consulting services, training, operational excellence and business transformation.'
    });
  }

  ngOnInit(): void {
    this.GetDataFromApi();
  }

  ngAfterViewInit(): void {
    this.interactions.initPage();
  }

  ngOnDestroy(): void {
    this.releasePdfObjectUrl();
    this.Destroy$.next();
    this.Destroy$.complete();
  }


  scrollCategoryTags(direction: 'left' | 'right'): void {
    const scroller = this.categoryTagsScroller?.nativeElement;

    if (!scroller) {
      return;
    }

    const scrollAmount = Math.max(220, Math.round(scroller.clientWidth * 0.65));
    scroller.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth'
    });
  }

  getCategoryCount(CategoryId: number): number {
    if (CategoryId === 0) {
      return this.TrainingList.length;
    }
    return this.TrainingList.filter(
      x => Number(x.CategoryId) === Number(CategoryId)
    ).length;
  }

  // trainings: TrainingCard[] = [
  //     category: 'Development',
  //     categoryClass: 'card-dev',
  //     fillClass: 'dev-fill',
  //     iconClass: 'fa-solid fa-code',
  //     title: 'Advanced React & State Management',
  //     description: 'Advanced react & state management contents with encoded advanced react and senole descriptions.',
  //     hours: 24,
  //     modules: 12,
  //     progress: 75,
  //     instructor: {
  //       name: 'Sarah Jenkins',
  //       title: 'Title Manager',
  //       avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100'
  //     category: 'UI/UX Design',
  //     categoryClass: 'card-design',
  //     fillClass: 'design-fill',
  //     iconClass: 'fa-solid fa-palette',
  //     title: 'UI/UX Design',
  //     description: 'Design the most uptaution of UI/UX design, UI/UX, and create design with model tracelems.',
  //     hours: 24,
  //     modules: 12,
  //     progress: 40,
  //     instructor: {
  //       name: 'Marcus Chen',
  //       title: 'Title',
  //       avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100'
  //     category: 'Data Science',
  //     categoryClass: 'card-data',
  //     fillClass: 'data-fill',
  //     iconClass: 'fa-solid fa-database',
  //     title: 'Data Science',
  //     description: 'Data science concerns and applying for the based experiences and/or analytics and scach altefucture.',
  //     hours: 24,
  //     modules: 12,
  //     progress: 0,
  //     instructor: {
  //       name: 'Dr. Aris Thorne',
  //       title: 'Title Science',
  //       avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=100'
  //     category: 'Development',
  //     categoryClass: 'card-dev',
  //     fillClass: 'dev-fill',
  //     iconClass: 'fa-solid fa-code',
  //     title: 'Advanced React & State Management',
  //     description: 'Advanced react & state management contents with encoded advanced react and senole descriptions.',
  //     hours: 24,
  //     modules: 12,
  //     progress: 75,
  //     instructor: {
  //       name: 'Sarah Jenkins',
  //       title: 'Title Manager',
  //       avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100'
  //     category: 'UI/UX Design',
  //     categoryClass: 'card-design',
  //     fillClass: 'design-fill',
  //     iconClass: 'fa-solid fa-palette',
  //     title: 'UI/UX Design',
  //     description: 'Design the most uptaution of UI/UX design, UI/UX, and create design with model tracelems.',
  //     hours: 24,
  //     modules: 12,
  //     progress: 40,
  //     instructor: {
  //       name: 'Marcus Chen',
  //       title: 'Title',
  //       avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100'
  //     category: 'Data Science',
  //     categoryClass: 'card-data',
  //     fillClass: 'data-fill',
  //     iconClass: 'fa-solid fa-database',
  //     title: 'Data Science',
  //     description: 'Data science concerns and applying for the based experiences and/or analytics and scach altefucture.',
  //     hours: 24,
  //     modules: 12,
  //     progress: 0,
  //     instructor: {
  //       name: 'Dr. Aris Thorne',
  //       title: 'Title Science',
  //       avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=100'
  GetData(): void {
    alert(1)
    const reqHeader = new HttpHeaders({
      ETag: 'f88dd058fe004909615a64f01be66a7',
      'Content-Type': 'application/json'
    });

    this._HttpClient
      .get('assets/Training.json', { headers: reqHeader, responseType: 'text' })
      .pipe(takeUntil(this.Destroy$))
      .subscribe({
        next: (data: any) => {
          const decrypted = this.dataService.decrypt(data);
          this.TrainingList = decrypted?.Table || [];
          this.TrainingList = this.TrainingList.sort((a, b) => Number(a.DisplayOrder) - Number(b.DisplayOrder));
          this.filteredTrainings = [...this.TrainingList];
          this.buildCategoryList();
          this.isLoading = false;
        },
        error: () => {
          this.TrainingList = [];
          this.isLoading = false;
        }
      });
  }

  // Future API integration: uncomment this method and call it instead of GetData().
  GetDataFromApi(): void {
    this.isLoading = true;
    this.trainingService
      .getPaged(1, 100)
      .pipe(takeUntil(this.Destroy$))
      .subscribe({
        next: (response:any) => {
          this.TrainingList = (response.items || []).map((item: any) => ({
            ...item,
            TrainingId: item.trainingId,
            TrainingName: item.trainingName,
            TrainingDesc: item.trainingDesc,
            DisplayName: item.displayName,
            Image: item.image || '',
            DisplayOrder: item.displayOrder,
            CategoryId: item.categoryId,
            Duration: item.duration,
            Modules: item.modules,
            TopicCovered: item.topicCovered
          }));
          this.TrainingList.sort((a, b) => Number(a.DisplayOrder) - Number(b.DisplayOrder));
          this.filteredTrainings = [...this.TrainingList];
          // The endpoint returns CategoryId but not CategoryName.
          this.CategoryList = [{ CategoryId: 0, CategoryName: 'All' }];
          this.isLoading = false;
        },
        error: (error:any) => {
          console.error('Failed to load training data.', { status: error.status });
          this.TrainingList = [];
          this.filteredTrainings = [];
          this.isLoading = false;
        }
      });
  }

  /* Create unique CategoryList from TrainingList */
  buildCategoryList(): void {
    const map = new Map<number, any>();

    this.TrainingList.forEach(x => {
      const categoryId = Number(x.CategoryId || 0);
      const categoryName = (x.CategoryName || '').trim();

      if (categoryId > 0 && categoryName && !map.has(categoryId)) {
        map.set(categoryId, {
          CategoryId: categoryId,
          CategoryName: categoryName
        });
      }
    });

    this.CategoryList = Array.from(map.values());

    this.CategoryList.unshift({
      CategoryId: 0,
      CategoryName: 'All'
    });
  }

  /* Category click filter */
  selectCategory(categoryId: number): void {
    this.searchText = '';
    this.selectedCategoryId = Number(categoryId);

    if (this.selectedCategoryId === 0) {
      this.filteredTrainings = [...this.TrainingList];
      return;
    }

    this.filteredTrainings = this.TrainingList.filter(x =>
      Number(x.CategoryId) === this.selectedCategoryId
    );
  }


  /* Search filter */
  onSearch(): void {
    const search = this.searchText.trim().toLowerCase();

    this.selectedCategoryId = 0;

    if (!search) {
      this.filteredTrainings = [...this.TrainingList];
      return;
    }

    this.filteredTrainings = this.TrainingList.filter(x => {
      const trainingName = (x.TrainingName ?? '').toLowerCase();
      const displayName = (x.DisplayName ?? '').toLowerCase();

      return trainingName.includes(search) || displayName.includes(search);
    });
  }

  /* Optional: show count beside All */
  get allTrainingCount(): number {
    return this.TrainingList?.length || 0;
  }

  //       next: () => {
  //       error: () => {

  public onViewPdf(item: any): void {

    this.selectedTrainingItem = item;
    this.Name = item.DisplayName || item.TrainingName || '';
    this.CId = item.TrainingId ?? null;

    //const fileName = `${item.TrainingName || this.Name}.pdf`;
    this.pdfSrc = `assets/doc/${this.CId}.pdf`;

    this.selectedPdfUrl = null;
    this.pdfErrorMessage = '';
    this.isPdfLoading = true;
    this.isReadMoreModalOpen = true;
    this.pdfModalVisible = true;

    // const pdfRequest$ = this._HttpClient.get(this.pdfSrc, {
    //   responseType: 'blob',
    //   observe: 'response'
    // });
    // Future API integration: comment the request above and uncomment the service request below.
    const pdfRequest$ = this.trainingService.getDocument(this.CId!);

    pdfRequest$
      .pipe(takeUntil(this.Destroy$))
      .subscribe({
        next: (res) => {
          const isPdf =
            res.body &&
            res.body.type &&
            res.body.type.toLowerCase().includes('pdf');

          if (res.status === 200 && isPdf) {
            this.releasePdfObjectUrl();
            this.pdfObjectUrl = URL.createObjectURL(res.body!);
            // Previous viewer URL fetched the same PDF a second time:
            // const viewerUrl = `${encodeURI(this.pdfSrc)}#toolbar=0&navpanes=0&scrollbar=1&download=0&print=0`;
            const viewerUrl = `${this.pdfObjectUrl}#toolbar=0&navpanes=0&scrollbar=1&download=0&print=0`;

            this.selectedPdfUrl =
              this.sanitizer.bypassSecurityTrustResourceUrl(viewerUrl);

          } else {


            this.pdfErrorMessage =
              'PDF file is not available.';

          }

          this.isPdfLoading = false;
        },
        error: (err) => {
          console.error('Failed to load training PDF.', { status: err.status });
          this.pdfErrorMessage =
            'PDF file is not available.';

          this.isPdfLoading = false;
        }
      });
  }

  openModal(): void {
    this.isReadMoreModalOpen = true;
    this.pdfModalVisible = true;
  }

  closeModal(): void {
    this.closeReadMoreModal();
  }

  closeReadMoreModal(): void {
    this.isReadMoreModalOpen = false;
    this.pdfModalVisible = false;
    this.selectedPdfUrl = null;
    this.pdfErrorMessage = '';
    this.isPdfLoading = false;
    this.releasePdfObjectUrl();
  }

  private releasePdfObjectUrl(): void {
    if (this.pdfObjectUrl) {
      URL.revokeObjectURL(this.pdfObjectUrl);
      this.pdfObjectUrl = null;
    }
  }

  blockPdfActions(event: Event): void {
    event.preventDefault();
  }

  blockPdfShortcuts(event: KeyboardEvent): void {
    const key = event.key.toLowerCase();

    if ((event.ctrlKey || event.metaKey) && (key === 'p' || key === 's')) {
      event.preventDefault();
      event.stopPropagation();
    }
  }

  openInterestedModal(item: any): void {
    this.selectedTrainingItem = item;
    this.TrainingName = item.DisplayName || item.TrainingName || '';
    this.isInterestedModalOpen = true;
  }

  trackByTraining(_index: number, item: any): any {
    return item.TrainingId || item.TrainingName || item.DisplayName || _index;
  }

  closeInterestedModal(): void {
    this.isInterestedModalOpen = false;
  }

  openTakeTestModal(item: any): void {
    this.selectedTrainingItem = item;
    this.TrainingName = item.DisplayName || item.TrainingName || 'Test 1';
    this.testUserName = '';
    this.testUserEmail = '';
    this.testUserMobile = '';
    this.isTakeTestModalOpen = true;
  }

  closeTakeTestModal(): void {
    this.isTakeTestModalOpen = false;
  }

  submitTakeTestForm(): void {
    let testName = this.TrainingName || this.selectedTrainingItem?.DisplayName || this.selectedTrainingItem?.TrainingName || 'Test 1';
    const username = this.testUserEmail.trim();
    if (testName == 'SPC Training')
      testName = 'SPCPreTest'
    // Tests launched from the training page are always the pre-training test.
    const testType: 'pre' = 'pre';
    if (!this.testUserName.trim() || !username || !this.testUserMobile.trim()) {
      this.notifierService.warningToastr('Please fill name, email and contact number.', 'Warning!');
      return;
    }

    sessionStorage.setItem('qlss-start-test', JSON.stringify({
      testName,
      testType,
      trainingId: String(this.selectedTrainingItem?.TrainingId ?? this.selectedTrainingItem?.trainingId ?? ''),
      username,
      name: this.testUserName.trim(),
      contact: this.testUserMobile.trim()
    }));

    this.isTakeTestModalOpen = false;
    this.router.navigate(['/test']);
  }

  submitInterestedForm(): void {
    this.Send();
  }


  async Send() {

    const templateParams = {
      from_name: this.name,
      user_email: this.email,
      phone_number: this.mobile,
      training_name: this.TrainingName,
      subject_line: `I am instrested in  ${this.TrainingName}`,
    };
    try {
      await emailjs.send(
        this.SERVICE_ID,
        this.TEMPLATE_ID,
        templateParams,
        this.PUBLIC_KEY
      );

      this.ismainLoading = false
      this.closeInterestedModal();
      this.notifierService.successToastr('Thank you for your interest. We will get back to you soon.', 'Success!');
      this.name = '';
      this.email = '';
      this.mobile = '';
      this.messages = '';
      this.TrainingName = '';

    } catch (err) {
      this.notifierService.warningToastr('Failed to send message. Please try again.', 'Warning!')
    }
  }
}
