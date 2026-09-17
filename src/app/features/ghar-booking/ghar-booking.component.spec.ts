import { FormBuilder } from '@angular/forms';
import { Subject, throwError } from 'rxjs';
import { GharBookingComponent } from './ghar-booking.component';
import { GharBookingResult } from './ghar-booking.service';

describe('Ghar booking enquiries', () => {
  let component: GharBookingComponent;
  let service: any;
  let notifier: any;
  let response: Subject<GharBookingResult>;

  beforeEach(() => {
    response = new Subject<GharBookingResult>();
    service = { create: jasmine.createSpy('create').and.returnValue(response) };
    notifier = { successToastr: jasmine.createSpy('success'), warningToastr: jasmine.createSpy('warning') };
    component = new GharBookingComponent(new FormBuilder(), service, notifier);
    component.form.setValue({ name: 'Test Customer', whatsAppNumber: '9876543210', quantity: 2,
      homeApartment: ' 12 ', street: ' Main Road ', area: ' Central ', city: 'Pune', state: 'Maharashtra', pinCode: '411001' });
  });

  it('submits without payment proof, prevents repeat clicks and resets after success', () => {
    component.submit();
    component.submit();
    expect(service.create).toHaveBeenCalledTimes(1);
    expect(service.create.calls.mostRecent().args).toEqual([{
      name: 'Test Customer', whatsAppNumber: '9876543210', quantity: 2,
      shippingAddress: '12, Main Road, Central', city: 'Pune', state: 'Maharashtra', pinCode: '411001'
    }]);
    response.next({ bookingId: 42, status: 'New' } as GharBookingResult);
    expect(notifier.successToastr).toHaveBeenCalled();
    expect(component.isSubmitting).toBeFalse();
    expect(component.form.controls.quantity.value).toBe(1);
    expect(component.form.controls.name.value).toBeNull();
  });

  it('preserves form details and allows retry after an API failure', () => {
    service.create.and.returnValue(throwError(() => new Error('Unavailable')));
    component.submit();
    expect(component.isSubmitting).toBeFalse();
    expect(component.form.controls.name.value).toBe('Test Customer');
    expect(notifier.warningToastr).toHaveBeenCalledWith('Unavailable');
  });

  it('rejects blank names and quantities outside the API limits', () => {
    component.form.controls.name.setValue('   ');
    component.submit();
    expect(service.create).not.toHaveBeenCalled();
    component.form.controls.name.setValue('Test Customer');
    for (const quantity of [0, 101, 1.5]) {
      component.form.controls.quantity.setValue(quantity);
      component.submit();
    }
    expect(service.create).not.toHaveBeenCalled();
  });
});
