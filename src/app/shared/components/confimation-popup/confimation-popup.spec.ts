import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfimationPopup } from './confimation-popup';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

describe('ConfimationPopup', () => {
  let component: ConfimationPopup;
  let fixture: ComponentFixture<ConfimationPopup>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfimationPopup],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: {} },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ConfimationPopup);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
