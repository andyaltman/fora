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

export interface FormState {
  travelDates: TravelDates;
  travelers: Travelers;
  budget: Budget;
  contact: Contact;
}

export type FormAction =
  | { type: 'SET_TRAVEL_DATES'; payload: Partial<TravelDates> }
  | { type: 'SET_TRAVELERS'; payload: Partial<Travelers> }
  | { type: 'SET_BUDGET'; payload: Partial<Budget> }
  | { type: 'SET_CONTACT'; payload: Partial<Contact> }
  | { type: 'RESET' };
