import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FlightService } from '../../shared/services/flight-service';
import { Booking } from '../../core/models/booking.model';
import { Flight } from '../../core/models/flight.model';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { BookingDetails } from '../../shared/components/booking-details/booking-details';

@Component({
  selector: 'app-booking-confirmation',
  imports: [MatCardModule, MatListModule, BookingDetails],
  templateUrl: './booking-confirmation.html',
  styleUrl: './booking-confirmation.scss',
})
export class BookingConfirmation {
  booking?: Booking;
  flight?: Flight;

  constructor(
    private route: ActivatedRoute,
    private flightService: FlightService,
  ) {}

  ngOnInit(): void {
    const bookingId = this.route.snapshot.paramMap.get('bookingId')!;
    this.flightService.getBooking(bookingId).subscribe((booking) => {
      this.booking = booking;
      if (booking) {
        this.flightService
          .getFlightById(booking.flightId)
          .subscribe((flightData) => (this.flight = flightData));
      }
    });
  }
}
