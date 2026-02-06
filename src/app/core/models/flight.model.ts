export interface Flight {
  id: string;
  airline: string;
  from: string;
  to: string;
  departure: string;
  arrival: string;   
  durationMinutes: number;
  price: number;
  departureTime?:any
}
