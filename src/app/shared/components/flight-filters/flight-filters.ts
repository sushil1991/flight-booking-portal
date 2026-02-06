import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { Flight } from '../../../core/models/flight.model';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

@Component({
  selector: 'app-flight-filters',
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatCheckboxModule,
    MatSelectModule,
    MatButtonToggleModule,
  ],
  templateUrl: './flight-filters.html',
  styleUrl: './flight-filters.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FlightFilters implements OnInit {
  @Input() flights: Flight[] = [];
  @Input() airlines: string[] = [];
  @Output() airlineChange = new EventEmitter<{ airline: string; checked: boolean }>();
  filterForm!: FormGroup;
  @Output() timeSlotChange = new EventEmitter<string>();
  timeSlots = [
    { label: 'Early Morning', value: 'early', range: '00:00 - 06:00' },
    { label: 'Morning', value: 'morning', range: '06:00 - 12:00' },
    { label: 'Afternoon', value: 'afternoon', range: '12:00 - 18:00' },
    { label: 'Evening', value: 'evening', range: '18:00 - 24:00' },
  ];
  selectedSlot: string | null = null;
  constructor(private fb: FormBuilder) {}
  ngOnInit() {
    this.filterForm = this.fb.group({ airlines: [[]], durationSlot: [''], sortBy: [''] });
  }

  onTimeSelect(value: string) {
    if (this.selectedSlot === value) {
      this.selectedSlot = null;
      this.timeSlotChange.emit('');
      return;
    } else {
      this.selectedSlot = value;
      this.timeSlotChange.emit(value);
    }
  }

  onCheckboxToggle(airline: string, checked: boolean) {
    this.airlineChange.emit({ airline, checked });
  }
}
