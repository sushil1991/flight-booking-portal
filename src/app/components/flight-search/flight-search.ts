import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { MatCard, MatCardModule } from "@angular/material/card";

@Component({
  selector: 'app-flight-search',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatCardModule
],
  standalone: true,
  templateUrl: './flight-search.html',
  styleUrl: './flight-search.scss',
})
export class FlightSearch {
  form: FormGroup;
  today: Date = new Date();
  constructor(
    private fb: FormBuilder,
    private router: Router,
  ) {
    this.form = this.fb.group({
      from: ['', Validators.required],
      to: ['', Validators.required],
      departureDate: ['', Validators.required],
      returnDate: ['', ],
    },{validators: this.dateRangeValidator});
  }

  submit() {
    const formData = {
      from: this.form.value.from,
      to: this.form.value.to,
      departureDate: new Date(this.form.controls['departureDate'].value).toISOString(),
      returnDate: this.form.controls['returnDate'].value ? new Date(this.form.controls['returnDate'].value).toISOString() : null,
    };
    this.router.navigate(['/results'], {
      queryParams: {
        from: formData.from.toUpperCase(),
        to: formData.to.toUpperCase(),
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
} 
