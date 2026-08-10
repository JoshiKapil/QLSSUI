import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Client, ClientCity } from "../../../core/models/client.model";
import { ClientManagementService } from "../../../core/services/client-management.service";
import { NotifierService } from "../../../core/services/notifier.service";
import { of, switchMap } from "rxjs";

@Component({
  selector: "app-client-admin",
  templateUrl: "./client-admin.component.html",
  styleUrls: ["./client-admin.component.scss"],
})
export class ClientAdminComponent implements OnInit {
  @ViewChild("imageFileInput") imageFileInput?: ElementRef<HTMLInputElement>;
  readonly searchPlaceholder = "Search by Company Name";

  form!: FormGroup;
  records: Client[] = [];
  selectedRecord: Client | null = null;
  selectedClientId = "";
  clientSearch = "";
  searchTerm = "";
  isClientDropdownOpen = false;
  isLoading = false;
  isSaving = false;
  busyClientId = "";
  selectedImageFile: File | null = null;
  imagePreviewUrl = "";
  cities: ClientCity[] = [];
  cityName = "";
  editingCityIndex: number | null = null;
  currentPage = 1;
  pageSize = 10;
  goToPageValue: number | null = 1;

  constructor(
    private fb: FormBuilder,
    private notifier: NotifierService,
    private clientService: ClientManagementService,
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      clientName: ["", Validators.required],
      clientNameDesc: ["", Validators.required],
      image: [""],
      displayOrder: ["", Validators.required],
    });
    this.loadRecords();
  }

  loadRecords(): void {
    this.isLoading = true;
    this.clientService.getAll().subscribe({
      next: (records) => {
        this.records = records || [];
        this.ensureValidPage();
      },
      error: () => {
        this.records = [];
        this.notifier.warningToastr("Clients could not be loaded.");
      },
      complete: () => (this.isLoading = false),
    });
  }

  search(): void {
    this.isLoading = true;
    this.clientService.search(this.searchTerm).subscribe({
      next: (records) => {
        this.records = records || [];
        this.currentPage = 1;
        this.goToPageValue = 1;
      },
      error: () => this.notifier.warningToastr("Client search failed."),
      complete: () => (this.isLoading = false),
    });
  }

  get filteredClientList(): Client[] {
    const search = this.clientSearch.trim().toLowerCase();
    return !search
      ? this.records
      : this.records.filter((client) =>
          (client.clientName || "").toLowerCase().includes(search),
        );
  }

  get totalPages(): number {
    return Math.max(1, Math.ceil(this.records.length / this.pageSize));
  }

  get pageNumbers(): number[] {
    return Array.from({ length: this.totalPages }, (_, index) => index + 1);
  }

  get paginatedRecords(): Client[] {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.records.slice(start, start + this.pageSize);
  }

  get firstVisibleRecord(): number {
    return this.records.length ? (this.currentPage - 1) * this.pageSize + 1 : 0;
  }

  get lastVisibleRecord(): number {
    return Math.min(this.currentPage * this.pageSize, this.records.length);
  }

  goToPage(page: number): void {
    const safePage = Math.min(Math.max(Math.trunc(Number(page) || 1), 1), this.totalPages);
    this.currentPage = safePage;
    this.goToPageValue = safePage;
  }

  changePageSize(value: string | number): void {
    this.pageSize = Number(value) || 10;
    this.goToPage(1);
  }

  submitGoToPage(): void {
    this.goToPage(Number(this.goToPageValue));
  }

  private ensureValidPage(): void {
    this.goToPage(Math.min(this.currentPage, this.totalPages));
  }

  getSelectedClientLabel(): string {
    return this.selectedRecord?.clientName || "New Company";
  }

  toggleClientDropdown(): void {
    this.isClientDropdownOpen = !this.isClientDropdownOpen;
    if (this.isClientDropdownOpen) this.clientSearch = "";
  }

  selectClient(client: Client | null): void {
    this.isClientDropdownOpen = false;
    if (!client?.clientId) {
      this.resetForm();
      return;
    }

    this.isLoading = true;
    this.clientService.getById(client.clientId).subscribe({
      next: (record) => this.edit(record || client),
      error: () =>
        this.notifier.warningToastr("Client details could not be loaded."),
      complete: () => (this.isLoading = false),
    });
  }

  edit(record: Client): void {
    this.selectedRecord = record;
    this.selectedClientId = String(record.clientId || "");
    this.clientSearch = record.clientName;
    this.form.patchValue(record);
    this.cities = (record.cities || []).map(city => ({ ...city }));
  }

  resetForm(): void {
    this.selectedRecord = null;
    this.selectedClientId = "";
    this.clientSearch = "";
    this.isClientDropdownOpen = false;
    this.selectedImageFile = null;
    this.imagePreviewUrl = "";
    this.cities = [];
    this.cityName = "";
    this.editingCityIndex = null;
    if (this.imageFileInput) {
      this.imageFileInput.nativeElement.value = "";
    }
    this.form.reset();
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.isSaving = true;
    const formValue = this.form.getRawValue();
    const imageUpload$ = this.selectedImageFile
      ? this.clientService.uploadImage(this.selectedImageFile)
      : of({
          fileName: String(formValue.image || this.selectedRecord?.image || ""),
        });

    imageUpload$
      .pipe(
        switchMap(({ fileName }) => {
          const payload: Client = {
            ...this.selectedRecord,
            ...formValue,
            image: this.removeSpaces(fileName),
            isActive: this.selectedRecord?.isActive ?? true,
            cities: this.cities,
          };
          return this.clientService.save(payload);
        }),
      )
      .subscribe({
        next: () => {
          this.notifier.successToastr(
            this.selectedRecord
              ? "Client updated successfully."
              : "Client saved successfully.",
          );
          this.resetForm();
          this.loadRecords();
        },
        error: () => {
          this.notifier.warningToastr(
            "Client image or details could not be saved.",
          );
          this.isSaving = false;
        },
        complete: () => (this.isSaving = false),
      });
  }

  saveCity(): void {
    const cityName = this.cityName.trim();
    if (!cityName) return;
    const duplicate = this.cities.some((city, index) =>
      index !== this.editingCityIndex && city.cityName.toLowerCase() === cityName.toLowerCase());
    if (duplicate) {
      this.notifier.warningToastr("This city already exists for the company.");
      return;
    }
    if (this.editingCityIndex === null) {
      this.cities = [...this.cities, { cityName, isActive: true }];
    } else {
      this.cities = this.cities.map((city, index) =>
        index === this.editingCityIndex ? { ...city, cityName, isActive: true } : city);
    }
    this.cityName = "";
    this.editingCityIndex = null;
  }

  editCity(index: number): void {
    this.cityName = this.cities[index].cityName;
    this.editingCityIndex = index;
  }

  removeCity(index: number): void {
    this.cities = this.cities.filter((_, cityIndex) => cityIndex !== index);
    if (this.editingCityIndex === index) {
      this.cityName = "";
      this.editingCityIndex = null;
    }
  }
  setActive(record: Client, isActive: boolean): void {
    if (!record.clientId) return;
    this.busyClientId = String(record.clientId);
    this.clientService.setActive(record, isActive).subscribe({
      next: () => {
        this.notifier.successToastr(
          `Client ${isActive ? "activated" : "deactivated"} successfully.`,
        );
        this.loadRecords();
      },
      error: () =>
        this.notifier.warningToastr("Client status could not be updated."),
      complete: () => (this.busyClientId = ""),
    });
  }

  delete(record: Client): void {
    if (!record.clientId || !window.confirm(`Delete "${record.clientName}"?`))
      return;
    this.busyClientId = String(record.clientId);
    this.clientService.delete(record.clientId).subscribe({
      next: () => {
        this.notifier.successToastr("Client deleted successfully.");
        if (this.selectedClientId === String(record.clientId)) this.resetForm();
        this.loadRecords();
      },
      error: () => this.notifier.warningToastr("Client could not be deleted."),
      complete: () => (this.busyClientId = ""),
    });
  }

  fieldError(key: string, label: string): string {
    const control = this.form.get(key);
    if (!control?.touched || !control.errors) return "";
    return control.errors["required"]
      ? `${label} is required.`
      : `${label} is invalid.`;
  }

  trackByRecordId(index: number, record: Client): string | number {
    return record.clientId || index;
  }

  getCityNames(record: Client): string {
    return record.cities?.filter(city => city.isActive !== false).map(city => city.cityName).join(', ') || 'No cities';
  }

  onImageSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) {
      return;
    }

    if (!file.type.startsWith("image/")) {
      this.notifier.warningToastr("Please select a valid image file.");
      input.value = "";
      return;
    }

    const fileName = this.removeSpaces(file.name);
    this.selectedImageFile = new File([file], fileName, { type: file.type });
    this.form.controls["image"].setValue(fileName);

    const reader = new FileReader();
    reader.onload = () => (this.imagePreviewUrl = String(reader.result || ""));
    reader.readAsDataURL(file);
  }

  getClientImageUrl(imageName: string | null | undefined): string {
    return imageName
      ? `assets/img/CustomerLogo/${encodeURIComponent(imageName)}`
      : "";
  }

  private removeSpaces(fileName: string): string {
    return fileName.replace(/\s+/g, "");
  }
}
