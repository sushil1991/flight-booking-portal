import { Component, Input } from '@angular/core';
import { Flight } from '../../../core/models/flight.model';
import { FlightCard } from '../flight-card/flight-card';

@Component({
  selector: 'app-flight-slider',
 imports: [FlightCard],

  templateUrl: './flight-slider.html',
  styleUrl: './flight-slider.scss',
  standalone: true,
})
export class FlightSlider {
@Input() flights: Flight[] = [];
  currentIndex = 0;

  next(): void {
    if (this.flights.length) {
      this.currentIndex = (this.currentIndex + 1) % this.flights.length;
    }
  }

  prev(): void {
    if (this.flights.length) {
      this.currentIndex = (this.currentIndex - 1 + this.flights.length) % this.flights.length;
    }
  }

}
