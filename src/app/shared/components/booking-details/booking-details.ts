import { Component, Input } from '@angular/core';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-booking-details',
  imports: [MatListModule],
  templateUrl: './booking-details.html',
  styleUrl: './booking-details.scss',
  standalone: true,
})
export class BookingDetails {
  @Input() title = '';
  @Input() items: { label: string; value: any }[] = [];
}
