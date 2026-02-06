import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightCard } from './flight-card';
import { Flight } from '../../../core/models/flight.model';

describe('FlightCard', () => {
  let component: FlightCard;
  let fixture: ComponentFixture<FlightCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FlightCard],
    }).compileComponents();

    fixture = TestBed.createComponent(FlightCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should have book event emitter', () => {
    expect(component.bookFlight).toBeDefined();
    expect(component.bookFlight.emit).toBeDefined();
  });
});
