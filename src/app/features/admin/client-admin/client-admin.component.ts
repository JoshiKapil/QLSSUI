import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Client } from "../../../core/models/client.model";
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
      next: (records) => (this.records = records || []),
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
      next: (records) => (this.records = records || []),
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
  }

  resetForm(): void {
    this.selectedRecord = null;
    this.selectedClientId = "";
    this.clientSearch = "";
    this.isClientDropdownOpen = false;
    this.selectedImageFile = null;
    this.imagePreviewUrl = "";
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



