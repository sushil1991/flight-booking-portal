import { Injectable } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map } from 'rxjs';
import { FlightService } from '../../shared/services/flight-service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ErrorMessages } from '../../shared/constants/constants';

@Injectable({ providedIn: 'root' })
export class BookingGuard {
  constructor(
    private flightService: FlightService,
    private router: Router,
    private snack: MatSnackBar
  ) {}
  canActivate: CanActivateFn = (route) => {
    const flightId = route.params['flightId'];
    const bookingId = route.params['bookingId'];

    if (flightId) {
      return this.flightService.getFlightById(flightId).pipe(
        map((flightData) => {
          if (flightData && flightData.id === flightId) {
            return true;
          } else {
            this.snack.open(ErrorMessages.InvalidFlightId, 'Close', { duration: 3000 });
            return this.router.createUrlTree(['/']);
          }
        }),
      );
    }
    if (bookingId) {
      return this.flightService.getBooking(bookingId).pipe(
        map((bookingData) => {
          if (bookingData && bookingData.id === bookingId) {
            return true;
          } else {
            this.snack.open(ErrorMessages.InvalidBookingId, 'Close', { duration: 3000 });
            return this.router.createUrlTree(['/']);
          }
        }),
      );
    }
    return false
  };
}
