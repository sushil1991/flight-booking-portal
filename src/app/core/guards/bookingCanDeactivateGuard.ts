import { CanDeactivateFn } from '@angular/router';
import { BookingForm } from '../../components/booking-form/booking-form';
import { inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfimationPopup } from '../../shared/components/confimation-popup/confimation-popup';
import { map } from 'rxjs';

export const bookingCanDeactivateGuard: CanDeactivateFn<BookingForm> = (component) => {
  const dialog = inject(MatDialog);
  if (component.bookingForm.dirty && !component.bookingForm.pristine && !component.isFormSubmitted) {
    const dialogRef = dialog.open(ConfimationPopup, {
      data: {
        title: 'Alert !!!',
        message: 'You have unsaved changes. Do you really want to leave this page?',
      },
    });

    return dialogRef.afterClosed().pipe(map((result) => result === true));
  }
  return true;
};
