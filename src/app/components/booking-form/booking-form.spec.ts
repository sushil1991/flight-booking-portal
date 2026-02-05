import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingForm } from './booking-form';
import { provideRouter } from '@angular/router';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { FlightService } from '../../shared/services/flight-service';
import { SearchResults } from '../search-results/search-results';

describe('BookingForm', () => {
  let component: BookingForm;
  let fixture: ComponentFixture<BookingForm>;
  let httpMock: HttpTestingController;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookingForm],
      providers: [FlightService, provideRouter([]), provideHttpClientTesting()],
    }).compileComponents();

    fixture = TestBed.createComponent(BookingForm);
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
});
