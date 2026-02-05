import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightSlider } from './flight-slider';

describe('FlightSlider', () => {
  let component: FlightSlider;
  let fixture: ComponentFixture<FlightSlider>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FlightSlider]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FlightSlider);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
