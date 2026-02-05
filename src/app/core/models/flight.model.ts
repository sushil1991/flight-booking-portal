export interface Flight {
  id: string;
  airline: string;
  from: string;
  to: string;
  departure: string; // ISO string
  arrival: string;   // ISO string
  durationMinutes: number;
  price: number;
}
