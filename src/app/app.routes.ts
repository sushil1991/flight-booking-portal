import { Routes } from '@angular/router';
import { FlightSearch } from './components/flight-search/flight-search';
import { SearchResults } from './components/search-results/search-results';
import { BookingForm } from './components/booking-form/booking-form';
import { BookingGuard } from './core/guards/booking-guard';
import { BookingConfirmation } from './components/booking-confirmation/booking-confirmation';
import { bookingCanDeactivateGuard } from './core/guards/bookingCanDeactivateGuard';

export const routes: Routes = [
    { path: '', pathMatch: 'full', component: FlightSearch },
  { path: 'results', component: SearchResults },
  {
    path: 'booking/:flightId',
    component: BookingForm,
    canActivate: [BookingGuard],
    canDeactivate: [bookingCanDeactivateGuard]
  },
  {
    path: 'confirmation/:bookingId',
    component: BookingConfirmation,
    canActivate: [BookingGuard]
  },
  { path: '**', redirectTo: '' }

];
