import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { FlightCard } from '../../shared/components/flight-card/flight-card';
import { Flight } from '../../core/models/flight.model';
import { ActivatedRoute, Router } from '@angular/router';
import { FlightService } from '../../shared/services/flight-service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-search-results',
  imports: [ FlightCard, MatSelectModule, MatCheckboxModule, ReactiveFormsModule, MatCardModule],
  templateUrl: './search-results.html',
  styleUrl: './search-results.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class SearchResults {
  flights: Flight[] = [];
  filteredFlights: Flight[] = [];
  airlines: string[] = [];
  filterForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private flightService: FlightService,
    public fb: FormBuilder,
  ) {
    this.filterForm = fb.group({
      airlines: [[] as string[]],
      durationSlot: [''],
      sortBy: ['price'],
    });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const { from, to, departureDate, returnDate } = params;
      this.flightService.searchFlights(from, to, departureDate, returnDate).subscribe((flights) => {
        this.flights = flights;
        this.airlines = [...new Set(flights.map((flightData) => flightData.airline))];
        this.applyFilters();
      });
    });

    this.filterForm.valueChanges.subscribe(() => this.applyFilters());
  }

  applyFilters(): void {
    const { airlines } = this.filterForm.value;
    let list = [...this.flights];

    if (airlines && airlines.length) {
      list = list.filter((flightData) => airlines.includes(flightData.airline));
    }

    this.filteredFlights = list;
  }

  onBook(flight: Flight): void {
    this.router.navigate(['/booking', flight.id]);
  }

  onPriceSelectionChange(event: MatSelectChange) {
     if (event.value === 'price') {
      this.filteredFlights.sort((a, b) => a.price - b.price);
    } else if (event.value === 'duration') {
      this.filteredFlights.sort((a, b) => a.durationMinutes - b.durationMinutes);
    }
    return this.filteredFlights = [...this.filteredFlights];
  }

  onDurationSelectionChange(event: MatSelectChange) {
      if (event.value === 'short') {
        this.filteredFlights = this.filteredFlights.filter((f) => f.durationMinutes <= 240);
      } else if (event.value === 'medium') {
        this.filteredFlights = this.filteredFlights.filter((f) => f.durationMinutes > 240 && f.durationMinutes <= 480);
      } else if (event.value === 'long') {
        this.filteredFlights = this.filteredFlights.filter((f) => f.durationMinutes > 480);
      }
    
    return this.filteredFlights = [...this.filteredFlights];
  }

  onAirlineChange(airline: string, checked: boolean): void {
    const selected = this.filterForm.value.airlines as string[];
    if (checked) {
      this.filterForm.patchValue({ airlines: [...selected, airline] });
    } else {
      this.filterForm.patchValue({ airlines: selected.filter((a) => a !== airline) });
    }
  }
  onAirlineToggle(airline: string, checked: boolean) {
    const current = this.filterForm.value.airlines || [];
    const updated = checked ? [...current, airline] : current.filter((a: any) => a !== airline);
    this.filterForm.patchValue({ airlines: updated });
  }
}
