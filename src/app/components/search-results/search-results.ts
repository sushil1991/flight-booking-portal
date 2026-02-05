import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { FlightCard } from '../../shared/components/flight-card/flight-card';
import { Flight } from '../../core/models/flight.model';
import { ActivatedRoute, Router } from '@angular/router';
import { FlightService } from '../../shared/services/flight-service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { FlightFilters } from '../../shared/components/flight-filters/flight-filters';

@Component({
  selector: 'app-search-results',
  imports: [FlightCard, MatSelectModule, MatCheckboxModule, ReactiveFormsModule, MatCardModule, FlightFilters],
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
  selectedSlots: string[] = [];

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

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      /**
       * destructured the params to match the updated query param keys from flight-search component
       */
      const { from, to, departureDate, returnDate } = params;
      /**
       * fetch the flights based on the search criteria and populate the filters based on the results
       */
      this.flightService.searchFlights(from, to, departureDate, returnDate).subscribe((flights) => {
        this.flights = flights;
        this.airlines = [...new Set(flights.map((flightData) => flightData.airline))];
        this.applyFilters();
      });
    });

    this.filterForm.valueChanges.subscribe(() => this.applyFilters());
  }

  applyFilters() {
    const { airlines } = this.filterForm.value;
    let list = [...this.flights];

    if (airlines && airlines.length) {
      list = list.filter((flightData) => airlines.includes(flightData.airline));
    }

    this.filteredFlights = list;
  }

  onBook(flight: Flight) {
    this.router.navigate(['/create-booking', flight.id]);
  }
/**
 * 
 * @param event is the mat select event
 * @returns will return the filtered flights based on price
 */
  onPriceSelectionChange(event: MatSelectChange) {
    switch (event.value) {
      case 'price':
        this.filteredFlights = [...this.filteredFlights].sort((a, b) => a.price - b.price);
        break;
      case 'duration':
        this.filteredFlights = [...this.filteredFlights].sort(
          (a, b) => a.durationMinutes - b.durationMinutes,
        );
        break;
    }
    return (this.filteredFlights = [...this.filteredFlights]);
  }
/**
 * 
 * @param event is the mat select event
 * @returns will return the filtered flights based on duration
 */
  onDurationSelectionChange(event: MatSelectChange) {
    console.log(event)
    switch (event.value) {
      case 'short':
        this.filteredFlights = this.filteredFlights.filter(
          (flightData) => flightData.durationMinutes <= 240,
        );
        break;
      case 'medium':
        this.filteredFlights = this.filteredFlights.filter(
          (flightData) => flightData.durationMinutes > 240 && flightData.durationMinutes <= 480,
        );
        break;
      case 'long':
        this.filteredFlights = this.filteredFlights.filter(
          (flightData) => flightData.durationMinutes > 480,
        );
        break;
    }

    return (this.filteredFlights = [...this.filteredFlights]);
  }

  /**
   * 
   * @param airline is the name of airline service provide
   * @param checked is the value of checkbox
   */

  onCheckboxToggle(airline: string, checked: boolean) {
    const currentState = this.filterForm.value.airlines || [];
    const updatedState = checked
      ? [...currentState, airline]
      : currentState.filter((a: any) => a !== airline);
    this.filterForm.patchValue({ airlines: updatedState });
  }
}
