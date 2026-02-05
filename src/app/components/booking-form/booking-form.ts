import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Flight } from '../../core/models/flight.model';
import { ActivatedRoute, Router } from '@angular/router';
import { FlightService } from '../../shared/services/flight-service';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-booking-form',
  imports: [
    NgIf,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
  ],

  templateUrl: './booking-form.html',
  styleUrl: './booking-form.scss',
  standalone: true,
})
export class BookingForm {
  flight?: Flight;
  bookingForm: FormGroup;
  flightId?: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private flightService: FlightService,
    fb: FormBuilder,
  ) {
    this.bookingForm = fb.group({
      fullName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      contactNumber: ['', [Validators.required, Validators.pattern(/^[0-9+\-\s]{7,15}$/)]],
      passengers: [1, [Validators.required, Validators.min(1), Validators.max(5)]],
    });
  }

  ngOnInit() {
    this.flightId = this.route.snapshot.paramMap.get('flightId')!;
    this.flightService.getFlightById(this.flightId).subscribe((f) => (this.flight = f));
  }

  hasError(control: string, error: string): boolean {
    const c = this.bookingForm.get(control);
    return !!c && c.touched && c.hasError(error);
  }

  submit() {
    if (this.bookingForm.invalid) {
      this.bookingForm.markAllAsTouched();
      return;
    }

    this.flightService
      .createBooking({
        flightId: this.flightId,
        ...this.bookingForm.value,
      })
      .subscribe((booking) => {
        this.router.navigate(['/confirmation', booking.id]);
      });
  }
}
