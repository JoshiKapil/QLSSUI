import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { CertificationForm } from "../../core/models/certification-form.model";
import { Trainer } from "../../core/models/trainer.model";
import { CertificationFormService } from "../../core/services/certification-form.service";
import { NotifierService } from "../../core/services/notifier.service";
import { TrainerService } from "../../core/services/trainer.service";
import { Training } from "../../core/models/training.model";
import { DataService } from "../../core/services/data.service";
import { Client } from "../../core/models/client.model";
import { ClientManagementService } from "../../core/services/client-management.service";
import { TrainingManagementService } from "../../core/services/training-management.service";

@Component({
  selector: "app-fillcertificationfrom",
  templateUrl: "./fillcertificationfrom.component.html",
  styleUrls: ["./fillcertificationfrom.component.scss"],
})
export class FillcertificationfromComponent implements OnInit {
  form!: FormGroup;
  trainers: Trainer[] = [];
  companies: Client[] = [];
  isLoadingTrainers = false;
  isLoadingCompanies = false;
  isSubmitting = false;
  trainingList: Training[] = [];
  trainingSearch = "";
  isTrainingDropdownOpen = false;
  selectedTrainingId = "";
  trainingName = "";

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private dataService: DataService,
    private notifier: NotifierService,
    private trainerService: TrainerService,
    private clientService: ClientManagementService,
    private certificationFormService: CertificationFormService,
    private trainingService: TrainingManagementService,
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.loadTrainers();
    this.loadTrainingList();
    this.loadRecords();
  }

  private initForm(): void {
    this.form = this.fb.group({
      name: ["", [Validators.required, Validators.maxLength(200)]],
      mobile: ["", [Validators.required, Validators.pattern("^[0-9]{10}$")]],
      email: ["", [Validators.required, Validators.email]],
      days: ["", [Validators.required, Validators.pattern("^[0-9]+$")]],
      trainingId: ["", Validators.required],
      trainerId: ["", Validators.required],
      location: ["", Validators.required],
      certificationDate: ["", Validators.required],
      isComplete: [{ value: false, disabled: true }],
      isPaid: [{ value: false, disabled: true }],
    });
  }

  loadRecords(): void {
    this.isLoadingCompanies = true;

    this.clientService.getAll().subscribe({
      next: (clients) => {
        this.companies = (clients || []).filter(
          (client) => client.isActive !== false,
        );
      },
      error: () => {
        this.companies = [];
        this.notifier.warningToastr("Companies could not be loaded.");
      },
      complete: () => (this.isLoadingCompanies = false),
    });
  }
  private loadTrainingList(): void {
    const reqHeader = new HttpHeaders({
      ETag: "f88dd058fe004909615a64f01be66a7",
      "Content-Type": "application/json",
    });

    this.http
      .get("assets/Training.json", { headers: reqHeader, responseType: "text" })
      .subscribe({
        next: (data: string) => {
          const decrypted = this.dataService.decrypt(data);
          const trainings = decrypted?.Table || [];
          this.trainingList = trainings
            .map((training: any) => this.mapTrainingFromAsset(training))
            .sort(
              (a: Training, b: Training) =>
                Number(a.displayOrder || 0) - Number(b.displayOrder || 0),
            );
          this.syncSelectedTrainingFromDetails();
        },
        error: () => {
          this.trainingList = [];
          this.syncSelectedTrainingFromDetails();
        },
      });
  }

  // Future API integration: call this method instead of loadTrainingList().
  // private loadTrainingListFromApi(): void {
  //   this.trainingService.getPaged(1, 100).subscribe({
  //     next: (response) => {
  //       this.trainingList = (response.items || [])
  //         .sort((a, b) => Number(a.displayOrder || 0) - Number(b.displayOrder || 0));
  //       this.syncSelectedTrainingFromDetails();
  //     },
  //     error: (error) => {
  //       console.error("Failed to load training data.", { status: error.status });
  //       this.trainingList = [];
  //       this.syncSelectedTrainingFromDetails();
  //     },
  //   });
  // }

  private mapTrainingFromAsset(training: any): Training {
    return {
      trainingId:
        training.trainingId ??
        training.TrainingId ??
        training.TrainingID ??
        training.Id ??
        training.id ??
        "",
      trainingName:
        training.trainingName ?? training.TrainingName ?? training.Name ?? "",
      trainingDesc:
        training.trainingDesc ??
        training.TrainingDesc ??
        training.Description ??
        "",
      topicCovered:
        training.topicCovered ??
        training.TopicCovered ??
        training.TopicCoveredName ??
        "",
      displayName:
        training.displayName ??
        training.DisplayName ??
        training.TrainingName ??
        "",
      image: training.image ?? training.Image ?? "",
      displayOrder: Number(training.displayOrder ?? training.DisplayOrder ?? 0),
    };
  }

  private syncSelectedTrainingFromDetails(): void {
    const trainingId = String(this.form.controls["trainingId"].value || "");
    this.selectedTrainingId = trainingId;

    if (!trainingId) {
      return;
    }

    const selected = this.trainingList.find(
      (training) => String(training.trainingId ?? "") === trainingId,
    );
    if (selected) {
      this.trainingName = selected.trainingName;
      this.trainingSearch = this.getTrainingLabel(selected);
    }
  }

  loadTrainers(): void {
    this.isLoadingTrainers = true;

    this.trainerService.getAll().subscribe({
      next: (trainers) => {
        if (trainers?.length) {
          this.trainers = trainers;
          this.isLoadingTrainers = false;
        } else {
          this.loadFallbackTrainers();
        }
      },
      error: () => this.loadFallbackTrainers(),
    });
  }

  toggleTrainingDropdown(): void {
    this.isTrainingDropdownOpen = !this.isTrainingDropdownOpen;

    if (this.isTrainingDropdownOpen) {
      this.trainingSearch = "";
    }
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    const raw = this.form.getRawValue();
    const selectedTrainer = this.trainers.find(
      (trainer) => String(trainer.trainerId || "") === String(raw.trainerId),
    );
    const payload: CertificationForm = {
      name: raw.name,
      contactNo: raw.mobile,
      email: raw.email,
      days: Number(raw.days),
      trainerId: raw.trainerId,
      trainerName: selectedTrainer?.name || "",
      certificationDate: raw.certificationDate,
      isComplete: false,
      isPaid: false,
      paymentId: "",
      razorpayOrderId: "",
      razorpaySignature: "",
      certificationFormId: "",
      batchNo: "",
      date: raw.certificationDate,
      location: raw.location,
      paymentDate: "",
      trainingId: Number(raw.trainingId),
    };

    console.log(payload);
    this.certificationFormService.save(payload).subscribe({
      next: () => {
        this.notifier.successToastr(
          "Certification form submitted successfully.",
        );
        this.startDummyPayment();
        this.reset();
      },
      error: () => {
        this.notifier.warningToastr(
          "Certification form could not be submitted.",
        );
        this.isSubmitting = false;
      },
      complete: () => (this.isSubmitting = false),
    });
  }

  getSelectedTrainingLabel(): string {
    if (!this.selectedTrainingId) {
      return "Select Training";
    }

    const selected = this.trainingList.find(
      (training) =>
        String(training.trainingId ?? "") === String(this.selectedTrainingId),
    );
    return selected ? this.getTrainingLabel(selected) : "Select Training";
  }

  get filteredTrainingList(): Training[] {
    const search = this.trainingSearch.trim().toLowerCase();

    if (!search) {
      return this.trainingList;
    }

    return this.trainingList.filter((training) => {
      const label = this.getTrainingLabel(training).toLowerCase();
      const id = String(training.trainingId || "").toLowerCase();
      const topicCovered = (training.topicCovered || "").toLowerCase();
      return (
        label.includes(search) ||
        id.includes(search) ||
        topicCovered.includes(search)
      );
    });
  }

  getTrainingLabel(training: Training): string {
    return (
      training.displayName ||
      training.trainingName ||
      String(training.trainingId || "Training")
    );
  }

  openTrainingDropdown(): void {
    this.isTrainingDropdownOpen = true;
  }

  onTrainingSearchChange(): void {
    this.isTrainingDropdownOpen = true;
  }
  onTrainingSelected(trainingId: string): void {
    const selected = this.trainingList.find(
      (training) => String(training.trainingId ?? "") === String(trainingId),
    );
    this.selectedTrainingId = trainingId;
    this.form.controls["trainingId"].setValue(selected ? trainingId : "");
    this.form.controls["trainingId"].markAsTouched();
    this.trainingName = selected?.trainingName || "";
    this.trainingSearch = selected ? this.getTrainingLabel(selected) : "";
  }

  selectTrainingFromDropdown(training: Training): void {
    const trainingId = String(training.trainingId ?? "");
    this.onTrainingSelected(trainingId);
    this.trainingSearch = this.getTrainingLabel(training);
    this.isTrainingDropdownOpen = false;
  }

  reset(): void {
    this.form.reset({
      name: "",
      mobile: "",
      email: "",
      days: "",
      trainingId: "",
      trainerId: "",
      location: "",
      certificationDate: "",
      isComplete: false,
      isPaid: false,
    });
    this.selectedTrainingId = "";
    this.trainingSearch = "";
    this.trainingName = "";
    this.isTrainingDropdownOpen = false;
    this.form.get("isComplete")?.disable();
    this.form.get("isPaid")?.disable();
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

  private loadFallbackTrainers(): void {
    this.http.get<Trainer[]>("assets/trainers.json").subscribe({
      next: (trainers) => {
        this.trainers = trainers || [];
        this.isLoadingTrainers = false;
      },
      error: () => {
        this.trainers = [];
        this.isLoadingTrainers = false;
      },
    });
  }

  private startDummyPayment(): void {
    const options = {
      key: "RAZORPAY_KEY_HERE",
      amount: 0,
      currency: "INR",
      name: "QLSS Certification",
      description: "Certification Payment",
      handler: () => {
        this.notifier.successToastr("Payment completed.");
      },
    };

    const razorpay = (window as any).Razorpay;

    if (!razorpay) {
      this.notifier.warningToastr(
        "Razorpay script not loaded. Dummy payment skipped.",
      );
      return;
    }

    const payment = new razorpay(options);
    payment.open();
  }
}
