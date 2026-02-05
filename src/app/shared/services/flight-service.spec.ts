import { TestBed } from '@angular/core/testing';

import { FlightService } from './flight-service';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { Booking } from '../../core/models/booking.model';

describe('FlightService', () => {
  let service: FlightService;
  let httpMock: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FlightService, provideRouter([]), provideHttpClientTesting()],
    });
    service = TestBed.inject(FlightService);
    httpMock = TestBed.inject(HttpTestingController);
    httpMock.expectOne('assets/flightsInfo.json').flush([]);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  afterEach(() => {
    httpMock.verify();
  });
  it('should search flights', () => {
    service.searchFlights('NYC', 'LAX', '2024-10-01').subscribe((flights) => {
      expect(flights).toEqual([]);
    });
  });
  it('should get flight by id', () => {
    service.getFlightById('123').subscribe((flight) => {
      expect(flight).toBeUndefined();
    });
  });
  it('shoudl get the booking', () => {
    service.getBooking('123').subscribe((flight) => {
      expect(flight).toBeUndefined();
    });
  });
  it('should create a booking', () => {
    const booking: Booking = {
      flightId: '123',
      fullName: 'John Doe',
      email: 'john.doe@example.com',
      contactNumber: '1234567890',
      passengers: 2,
      id: '',
    };
    service.createBooking(booking).subscribe((created) => {
      expect(created.id).toMatch(/^PNR-\d{1,6}$/);
      expect(created.fullName).toBe(booking.fullName);
    });
  })

});
