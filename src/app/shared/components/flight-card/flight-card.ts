import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Flight } from '../../../core/models/flight.model';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-flight-card',
  imports: [MatCardModule, MatButtonModule],

  templateUrl: './flight-card.html',
  styleUrl: './flight-card.scss',
  standalone: true,
})
export class FlightCard {
  @Input() flight!: Flight;
  @Output() bookFlight = new EventEmitter<Flight>();

  onBook(): void {
    this.bookFlight.emit(this.flight);
  }
}
