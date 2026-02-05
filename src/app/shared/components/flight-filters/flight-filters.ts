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

@Component({
  selector: 'app-flight-filters',
  imports: [ReactiveFormsModule, MatCardModule, MatCheckboxModule, MatSelectModule],
  templateUrl: './flight-filters.html',
  styleUrl: './flight-filters.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FlightFilters implements OnInit {
  @Input() flights: Flight[] = [];
  @Input() airlines: string[] = [];
  @Output() airlineChange = new EventEmitter<{ airline: string; checked: boolean }>();
  filterForm!: FormGroup;
  constructor(private fb: FormBuilder) {}
  ngOnInit() {
    this.filterForm = this.fb.group({ airlines: [[]], durationSlot: [''], sortBy: [''] });
  }

  onCheckboxToggle(airline: string, checked: boolean) {
    this.airlineChange.emit({ airline, checked });
  }
}
