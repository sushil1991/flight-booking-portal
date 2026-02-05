import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BookingConfirmation } from './booking-confirmation';
import { provideRouter } from '@angular/router';
import { FlightService } from '../../shared/services/flight-service';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';

describe('BookingConfirmation', () => {
  let component: BookingConfirmation;
  let fixture: ComponentFixture<BookingConfirmation>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookingConfirmation],
      providers: [FlightService, provideRouter([]), provideHttpClientTesting()],
    }).compileComponents();

    fixture = TestBed.createComponent(BookingConfirmation);
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
