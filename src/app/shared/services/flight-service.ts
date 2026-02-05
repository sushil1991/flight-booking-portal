import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Flight } from '../../core/models/flight.model';
import { Booking } from '../../core/models/booking.model';

@Injectable({ providedIn: 'root' })
export class FlightService {
  private flights: Flight[] = [];
  private bookings = new Map<string, Booking>();

  constructor(private http: HttpClient) {
    this.loadMockData();
  }

  private loadMockData(): void {
    this.http.get<Flight[]>('assets/flightsInfo.json').subscribe((data) => (this.flights = data));
  }
  /**
   * 
   * @param from from city
   * @param to to city
   * @param departureDate departure date of flight
   * @param returnDate return date of flight
   * @returns flitered flights based on the search criteria
   */
  searchFlights(
    from: string,
    to: string,
    departureDate: string,
    returnDate?: string,
  ): Observable<Flight[]> {
    return of(
      this.flights.filter((flightData) => flightData.from === from && flightData.to === to),
    );
  }

  /**
   * 
   * @param id of the flight
   * @returns return the single flight 
   */
  getFlightById(id: string): Observable<Flight | undefined> {
    return of(this.flights.find((flight) => flight.id === id));
  }

  createBooking(booking: Booking): Observable<Booking> {
    const id = `PNR-${Math.floor(Math.random() * 1_000_000)}`;
    const saved: Booking = { ...booking, id };
    this.bookings.set(id, saved);
    return of(saved);
  }

  getBooking(id: string): Observable<Booking | undefined> {
    return of(this.bookings.get(id));
  }
}
