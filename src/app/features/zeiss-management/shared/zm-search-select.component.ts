import { Component, ElementRef, forwardRef, HostBinding, HostListener, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'zm-search-select',
  templateUrl: './zm-search-select.component.html',
  styleUrls: ['./zm-search-select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ZmSearchSelectComponent),
      multi: true,
    },
  ],
})
export class ZmSearchSelectComponent implements ControlValueAccessor {
  @Input() options: any[] = [];
  @Input() labelKey = 'name';
  @Input() detailKey = '';
  @Input() valueKey = 'id';
  @Input() placeholder = 'Select an option';
  @Input() multiple = false;
  @Input() allowClear = true;
  @Input() showStock = false;

  open = false;
  search = '';
  disabled = false;
  value: any = null;

  private onChange: (value: any) => void = () => undefined;
  private onTouched: () => void = () => undefined;

  constructor(private elementRef: ElementRef<HTMLElement>) {}

  @HostBinding('class.dropdown-open')
  get dropdownOpen(): boolean {
    return this.open;
  }

  @HostListener('document:click', ['$event.target'])
  closeWhenClickingOutside(target: EventTarget | null): void {
    if (target instanceof Node && !this.elementRef.nativeElement.contains(target)) {
      this.open = false;
    }
  }

  @HostListener('document:keydown.escape')
  closeWithEscape(): void {
    this.open = false;
  }

  get filteredOptions(): any[] {
    const search = this.search.trim().toLowerCase();
    if (!search) return this.options || [];
    return (this.options || []).filter((option) =>
      `${this.label(option)} ${this.detail(option)}`.toLowerCase().includes(search),
    );
  }

  get selectedOptions(): any[] {
    const values = this.multiple ? this.value || [] : [this.value];
    return (this.options || []).filter((option) => values.includes(this.optionValue(option)));
  }

  get displayText(): string {
    const labels = this.selectedOptions.map((option) => this.label(option));
    return labels.length ? labels.join(', ') : this.placeholder;
  }

  writeValue(value: any): void {
    this.value = this.multiple ? (Array.isArray(value) ? value : []) : value;
  }

  registerOnChange(fn: (value: any) => void): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
  setDisabledState(disabled: boolean): void {
    this.disabled = disabled;
  }

  toggleDropdown(): void {
    if (this.disabled) return;
    this.open = !this.open;
    if (this.open) {
      this.search = '';
    }
    this.onTouched();
  }

  select(option: any): void {
    const optionValue = this.optionValue(option);
    if (this.multiple) {
      const values = [...(this.value || [])];
      this.value = values.includes(optionValue)
        ? values.filter((value) => value !== optionValue)
        : [...values, optionValue];
    } else {
      this.value = optionValue;
      this.open = false;
    }
    this.onChange(this.value);
  }

  clear(event: Event): void {
    event.stopPropagation();
    this.value = this.multiple ? [] : null;
    this.onChange(this.value);
  }

  selected(option: any): boolean {
    return this.selectedOptions.includes(option);
  }

  label(option: any): string {
    return String(option?.[this.labelKey] ?? '');
  }
  detail(option: any): string {
    return this.detailKey ? String(option?.[this.detailKey] ?? '') : '';
  }
  stock(option: any): number | null {
    return typeof option?.currentQuantity === 'number' ? option.currentQuantity : null;
  }
  private optionValue(option: any): any {
    return option?.[this.valueKey];
  }
}

