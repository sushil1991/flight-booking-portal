import { TestBed } from '@angular/core/testing';

import { FlightService } from './flight-service';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';

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
});
