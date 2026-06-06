export interface TravelDates {
  hasFixedDates: boolean | null;  // null = mode not yet chosen
  startDate: string;
  endDate: string;
  year: string | null;
  months: string[];               // multi-select
  undecided: boolean;
}

export interface Travelers {
  partyName: string;
  types: string[];
  adults: number;
  children: number;
  childAges: number[];
}

export interface Budget {
  perPerson: string;
  tier: string;
}

export interface Contact {
  name: string;
  email: string;
  notes: string;
}

export interface Destination {
  selected: string[];   // multi-select list of destination labels
  undecided: boolean;   // "I haven't decided yet" — mutually exclusive with selected
}

export interface FormState {
  destination: Destination;
  travelDates: TravelDates;
  travelers: Travelers;
  budget: Budget;
  contact: Contact;
}

// Keys identifying each input step. The 'destination' step only appears when
// no ?itinerary= param is supplied; otherwise the destination is already known.
export type StepKey = 'destination' | 'dates' | 'travelers' | 'budget' | 'details';

export type FormAction =
  | { type: 'SET_DESTINATION'; payload: Partial<Destination> }
  | { type: 'SET_TRAVEL_DATES'; payload: Partial<TravelDates> }
  | { type: 'SET_TRAVELERS'; payload: Partial<Travelers> }
  | { type: 'SET_BUDGET'; payload: Partial<Budget> }
  | { type: 'SET_CONTACT'; payload: Partial<Contact> }
  | { type: 'RESET' };
