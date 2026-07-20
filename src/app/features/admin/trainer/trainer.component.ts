import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Trainer } from "../../../core/models/trainer.model";
import { NotifierService } from "../../../core/services/notifier.service";
import { TrainerService } from "../../../core/services/trainer.service";

@Component({
  selector: "app-trainer",
  templateUrl: "./trainer.component.html",
  styleUrls: ["./trainer.component.scss"],
})
export class TrainerComponent implements OnInit {
  readonly searchPlaceholder = "Search by Name, Mobile or Email";

  form!: FormGroup;
  records: Trainer[] = [];
  selectedRecord: Trainer | null = null;
  searchTerm = "";
  isLoading = false;
  isSaving = false;
  isDeleting = false;
  busyTrainerId = "";

  constructor(
    private fb: FormBuilder,
    private notifier: NotifierService,
    private trainerService: TrainerService,
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.loadRecords();
  }

  private initForm(): void {
    this.form = this.fb.group({
      name: ["", [Validators.required, Validators.maxLength(200)]],
      mobile: ["", [Validators.required, Validators.pattern("^[0-9]{10}$")]],
      email: ["", [Validators.required, Validators.email]],
      address: ["", [Validators.maxLength(1000)]],
      company: ["", [Validators.maxLength(1000)]],
    });
  }

  loadRecords(): void {
    this.isLoading = true;
    this.trainerService.getAll().subscribe({
      next: (records) => (this.records = records || []),
      error: () => {
        this.records = [];
        this.isLoading = false;
      },
      complete: () => (this.isLoading = false),
    });
  }

  search(): void {
    this.isLoading = true;
    this.trainerService.search(this.searchTerm).subscribe({
      next: (records) => (this.records = records || []),
      error: () => {
        this.records = [];
        this.isLoading = false;
      },
      complete: () => (this.isLoading = false),
    });
  }

  edit(record: Trainer): void {
    this.selectedRecord = record;
    this.form.patchValue(record);
  }

  resetForm(): void {
    this.selectedRecord = null;
    this.form.reset();
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.isSaving = true;
    const payload = {
      ...this.selectedRecord,
      ...this.form.value,
      isActive: this.selectedRecord?.isActive ?? true,
    } as Trainer;

    this.trainerService.save(payload).subscribe({
      next: () => {
        this.notifier.successToastr("Trainer saved successfully.");
        this.resetForm();
        this.loadRecords();
      },
      error: () => {
        this.notifier.warningToastr("Trainer could not be saved.");
        this.isSaving = false;
      },
      complete: () => (this.isSaving = false),
    });
  }

  setActive(record: Trainer, isActive: boolean): void {
    if (!record.trainerId) {
      return;
    }

    this.busyTrainerId = String(record.trainerId);
    this.trainerService.setActive(record, isActive).subscribe({
      next: () => {
        this.notifier.successToastr(
          `Trainer ${isActive ? "activated" : "deactivated"} successfully.`,
        );
        this.loadRecords();
      },
      error: () => {
        this.notifier.warningToastr("Trainer status could not be updated.");
        this.busyTrainerId = "";
      },
      complete: () => (this.busyTrainerId = ""),
    });
  }
  
  delete(record: Trainer): void {
    if (!record.trainerId || !confirm("Delete this trainer?")) {
      return;
    }

    this.isDeleting = true;
    this.trainerService.delete(record.trainerId).subscribe({
      next: () => {
        // this.notifier.successToastr("Trainer deleted successfully.");
        this.notifier.successToastr(
          `Trainer ${record.isActive ? "activated" : "deactivated"} successfully.`,
        );
        if (
          String(this.selectedRecord?.trainerId || "") ===
          String(record.trainerId)
        ) {
          this.resetForm();
        }
        this.loadRecords();
      },
      error: () => {
        this.notifier.warningToastr("Trainer could not be deleted.");
        this.isDeleting = false;
      },
      complete: () => (this.isDeleting = false),
    });
  }

  fieldError(key: string, label: string): string {
    const control = this.form.get(key);
    if (!control?.touched || !control.errors) {
      return "";
    }

    if (control.errors["required"]) {
      return label + " is required.";
    }

    if (control.errors["maxlength"]) {
      return label + " is too long.";
    }

    return label + " is invalid.";
  }

  trackByTrainerId(index: number, record: Trainer): string | number {
    return record.trainerId || index;
  }
}
