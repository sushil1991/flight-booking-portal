import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchResults } from './search-results';
import { FlightCard } from '../../shared/components/flight-card/flight-card';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { provideRouter } from '@angular/router';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { FlightService } from '../../shared/services/flight-service';
import { Flight } from '../../core/models/flight.model';

describe('SearchResults', () => {
  let component: SearchResults;
  let fixture: ComponentFixture<SearchResults>;
  let httpMock: HttpTestingController;
  const mockFlights: Flight[] = [
    {
      id: '1',
      airline: 'Another Airline',
      departure: 'BOS',
      arrival: 'MIA',
      price: 150,
      durationMinutes: 120,
      from: 'BOS',
      to: 'MIA',
    },
    {
      id: '2',
      airline: 'Another Airline',
      departure: 'BOS',
      arrival: 'MIA',
      price: 300,
      durationMinutes: 120,
      from: 'BOS',
      to: 'MIA',
    },
    {
      id: '3',
      airline: 'Another Airline',
      departure: 'BOS',
      arrival: 'MIA',
      price: 500,
      durationMinutes: 120,
      from: 'BOS',
      to: 'MIA',
    },
  ];
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        SearchResults,
        FlightCard,
        MatSelectModule,
        MatCheckboxModule,
        ReactiveFormsModule,
        MatCardModule,
      ],
      providers: [FlightService, provideRouter([]), provideHttpClientTesting()],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchResults);
    component = fixture.componentInstance;

    httpMock = TestBed.inject(HttpTestingController);

    // Mock the JSON request so Vitest doesn't try to load assets
    httpMock.expectOne('assets/flightsInfo.json').flush([]);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should sort flights by price (ascending)', () => {
    const event = { value: 'price' } as MatSelectChange;
    component.onPriceSelectionChange(event);
    expect(component.filteredFlights.map((res) => res.price)).toEqual([]);
  });
  it('should sort flights by price (ascending)', () => {
    component.filteredFlights = [...mockFlights];
    const event = { value: 'price' } as MatSelectChange;
    component.onPriceSelectionChange(event);
    expect(component.filteredFlights.map((data) => data.price)).toEqual([
      150, 300, 500,
    ]);
  });
  it('should set selectedTimeSlot when a new slot is selected', () => {
    component.onDepartureTimeSlotChange('morning');
    expect(component.selectedTimeSlot).toBe('morning');
  });
  it('should clear selectedTimeSlot when the same slot is selected again', () => {
    component.selectedTimeSlot = 'morning';
    component.onDepartureTimeSlotChange('morning');
    expect(component.selectedTimeSlot).toBeNull();
  });
  it('should clear selectedTimeSlot when an empty slot is passed', () => {
    component.selectedTimeSlot = 'evening';
    component.onDepartureTimeSlotChange('');
    expect(component.selectedTimeSlot).toBeNull();
  });
  it('should replace previous slot when a different slot is selected', () => {
    component.selectedTimeSlot = 'morning';
    component.onDepartureTimeSlotChange('evening');
    expect(component.selectedTimeSlot).toBe('evening');
  });
  it('should return all flights when no filters are applied', () => {
    component.applyAirlineAndTimeSlotFilters();
    expect(component.filteredFlights.length).toBe(0);
  });
  it('should filter by airline only', () => {
    component.selectedAirlines = ['Indigo'];
    component.applyAirlineAndTimeSlotFilters();
    expect(component.filteredFlights.length).toBe(0);
    expect(component.filteredFlights.every((res) => res.airline === 'Indigo')).toBeTruthy();
  });
});
