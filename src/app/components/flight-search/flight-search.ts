import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatSlideToggleChange, MatSlideToggleModule } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-flight-search',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatCardModule,
    MatSlideToggleModule,
  ],
  standalone: true,
  templateUrl: './flight-search.html',
  styleUrl: './flight-search.scss',
})
export class FlightSearch implements OnInit {
  form: FormGroup;
  today: Date = new Date();
  constructor(
    private fb: FormBuilder,
    private router: Router,
  ) {
    this.form = this.fb.group(
      {
        fromCity: ['', Validators.required],
        toCity: ['', Validators.required],
        departureDate: ['', Validators.required],
        returnDate: [''],
      },
      { validators: this.dateRangeValidator },
    );
  }

  ngOnInit() {
    this.form.get('returnDate')?.disable();
  }
  submit() {
    const formData = {
      fromCity: this.form.value.fromCity,
      toCity: this.form.value.toCity,
      departureDate: new Date(this.form.controls['departureDate'].value).toISOString(),
      returnDate: this.form.controls['returnDate'].value
        ? new Date(this.form.controls['returnDate'].value).toISOString()
        : null,
    };
    this.router.navigate(['/results'], {
      queryParams: {
        from: formData.fromCity.toUpperCase(),
        to: formData.toCity.toUpperCase(),
        departureDate: formData.departureDate,
        returnDate: formData.returnDate ? formData.returnDate : null,
      },
    });
  }

  dateRangeValidator(group: FormGroup) {
    const departureDate = group.get('departureDate')?.value;
    const returnDate = group.get('returnDate')?.value;
    if (!departureDate || !returnDate) return null;
    return returnDate >= departureDate ? null : { dateRangeInvalid: true };
  }

  onToggleRoundTrip(event: MatSlideToggleChange) {
    console.log('Round Trip:', event.checked);
    if (event.checked) {
      this.form.get('returnDate')?.enable();
    } else {
      this.form.get('returnDate')?.disable();
    }
    return event.checked;
  }
}
