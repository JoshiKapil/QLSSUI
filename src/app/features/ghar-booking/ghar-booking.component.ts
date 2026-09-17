import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NotifierService } from '../../core/services/notifier.service';
import { GharBookingService } from './ghar-booking.service';

@Component({
  selector: 'app-ghar-booking',
  templateUrl: './ghar-booking.component.html',
  styleUrls: ['./ghar-booking.component.scss'],
})
export class GharBookingComponent {
  readonly listPricePerCopy = 199;
  readonly discountedPricePerCopy = 149;
  readonly deliveryCharge = 50;
  /* PhonePe payment is paused.
  readonly maximumScreenshotBytes = 5 * 1024 * 1024;

  paymentScreenshot: File | null = null;
  paymentScreenshotPreview = '';
  paymentScreenshotError = '';
  */

  isSubmitting = false;

  readonly form = this.fb.group({
    name: ['', [Validators.required, Validators.pattern(/\S/), Validators.maxLength(200)]],
    whatsAppNumber: ['', [Validators.required, Validators.pattern(/^\+?[0-9]{10,15}$/)]],
    quantity: [1, [Validators.required, Validators.min(1), Validators.max(100), Validators.pattern(/^[0-9]+$/)]],
    homeApartment: ['', [Validators.required, Validators.pattern(/\S/), Validators.maxLength(160)]],
    street: ['', [Validators.required, Validators.pattern(/\S/), Validators.maxLength(160)]],
    area: ['', [Validators.required, Validators.pattern(/\S/), Validators.maxLength(160)]],
    city: ['', [Validators.required, Validators.pattern(/\S/), Validators.maxLength(100)]],
    state: ['', [Validators.required, Validators.pattern(/\S/), Validators.maxLength(100)]],
    pinCode: ['', [Validators.required, Validators.pattern(/^[A-Za-z0-9 -]{4,10}$/)]],
    // transactionId: ['', [Validators.maxLength(64), Validators.pattern(/^[A-Za-z0-9._/-]{6,64}$/)]],
  });

  constructor(
    private readonly fb: FormBuilder,
    private readonly bookingService: GharBookingService,
    private readonly notifier: NotifierService,
  ) {}

  get quantity(): number {
    return Math.max(1, Number(this.form.controls.quantity.value || 1));
  }

  get listTotal(): number {
    return this.listPricePerCopy * this.quantity;
  }

  get discountedBooksTotal(): number {
    return this.discountedPricePerCopy * this.quantity;
  }

  get savings(): number {
    return (this.listPricePerCopy - this.discountedPricePerCopy) * this.quantity;
  }

  get finalAmount(): number {
    return this.discountedBooksTotal + this.deliveryCharge;
  }

  changeQuantity(change: number): void {
    this.form.controls.quantity.setValue(Math.min(100, Math.max(1, this.quantity + change)));
  }

  /* PhonePe screenshot handling is paused.
  onPaymentScreenshotSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0] || null;
    this.clearScreenshot();

    if (!file) {
      this.paymentScreenshotError = 'Payment screenshot is required.';
      return;
    }

    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
      this.paymentScreenshotError = 'Upload a JPG, PNG or WebP image.';
      input.value = '';
      return;
    }

    if (file.size > this.maximumScreenshotBytes) {
      this.paymentScreenshotError = 'Screenshot must be 5 MB or smaller.';
      input.value = '';
      return;
    }

    this.paymentScreenshot = file;
    this.paymentScreenshotPreview = URL.createObjectURL(file);
    this.paymentScreenshotError = '';
  }

  */

  fieldError(field: keyof typeof this.form.controls, label: string): string {
    const control = this.form.controls[field];
    if (!control.touched || !control.errors) return '';
    if (control.errors['required']) return `${label} is required.`;
    if (control.errors['pattern']) return `Enter a valid ${label.toLowerCase()}.`;
    if (control.errors['maxlength']) return `${label} is too long.`;
    return `${label} is invalid.`;
  }

  submit(): void {
    this.form.markAllAsTouched();
    if (this.form.invalid || this.isSubmitting) return;

    this.isSubmitting = true;
    const { homeApartment, street, area, ...details } = this.form.getRawValue();
    const shippingAddress = [homeApartment, street, area].map((part) => (part || '').trim()).join(', ');
    this.bookingService.create({ ...details, shippingAddress }).subscribe({
      next: (result) => {
        this.notifier.successToastr(`Booking enquiry #${result.bookingId} submitted. Our team will contact you shortly.`);
        this.form.reset({ quantity: 1 });
        this.isSubmitting = false;
      },
      error: (error) => {
        this.notifier.warningToastr(
          error?.error?.message || error?.message || 'Booking enquiry could not be submitted. Please try again.',
        );
        this.isSubmitting = false;
      },
    });
  }

  /* PhonePe screenshot cleanup is paused.
  ngOnDestroy(): void {
    this.clearScreenshot();
  }

  private clearScreenshot(): void {
    if (this.paymentScreenshotPreview) URL.revokeObjectURL(this.paymentScreenshotPreview);
    this.paymentScreenshot = null;
    this.paymentScreenshotPreview = '';
  }
  */
}
