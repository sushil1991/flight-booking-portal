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

  it('should add airline when checked = true', () => {
    component.onCheckboxToggle('Delta', true);
    expect(component.filterForm.value.airlines).toEqual(['Delta']);
  });
  it('should remove airline when checked = false', () => {
    component.filterForm.patchValue({ airlines: ['Delta', 'United'] });
    component.onCheckboxToggle('Delta', false);
    expect(component.filterForm.value.airlines).toEqual(['United']);
  });
  it('should sort flights by price (ascending)', () => {
    const event = { value: 'price' } as MatSelectChange;
    component.onPriceSelectionChange(event);
    expect(component.filteredFlights.map((flightData) => flightData.price)).toEqual([]);
  });
  it('should sort flights by price (ascending)', () => {
    component.filteredFlights = [...mockFlights];
    const event = { value: 'price' } as MatSelectChange;
    component.onPriceSelectionChange(event);
    expect(component.filteredFlights.map((flightData) => flightData.price)).toEqual([
      150, 300, 500,
    ]);
  });
});
