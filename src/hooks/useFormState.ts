import { useReducer } from 'react';
import type { FormState, FormAction } from '@/types/form';

const initialState: FormState = {
  travelDates: {
    hasFixedDates: null,
    startDate: '',
    endDate: '',
    year: null,
    months: [],
    undecided: false,
  },
  travelers: {
    partyName: '',
    types: [],
    adults: 0,
    children: 0,
  },
  budget: {
    perPerson: '',
    tier: '',
  },
  contact: {
    name: '',
    email: '',
    notes: '',
  },
};

function formReducer(state: FormState, action: FormAction): FormState {
  switch (action.type) {
    case 'SET_TRAVEL_DATES':
      return {
        ...state,
        travelDates: { ...state.travelDates, ...action.payload },
      };
    case 'SET_TRAVELERS':
      return {
        ...state,
        travelers: { ...state.travelers, ...action.payload },
      };
    case 'SET_BUDGET':
      return {
        ...state,
        budget: { ...state.budget, ...action.payload },
      };
    case 'SET_CONTACT':
      return {
        ...state,
        contact: { ...state.contact, ...action.payload },
      };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
}

export function useFormState() {
  const [state, dispatch] = useReducer(formReducer, initialState);

  const validate = (step: number): string | null => {
    switch (step) {
      case 1: {
        const { hasFixedDates, startDate, endDate, year, months, undecided } = state.travelDates;
        if (hasFixedDates === null) {
          return 'Please select when the client would like to travel';
        }
        if (hasFixedDates) {
          if (!startDate || !endDate) {
            return 'Please select both start and end dates';
          }
        } else {
          if (!undecided && (!year || months.length === 0)) {
            return 'Please select a year and at least one month, or mark as undecided';
          }
        }
        return null;
      }
      case 2: {
        const { partyName, types, adults } = state.travelers;
        if (!partyName.trim()) {
          return 'Please enter a party name';
        }
        if (types.length === 0) {
          return 'Please select at least one traveler type';
        }
        if (adults < 1) {
          return 'Please specify the number of adults';
        }
        return null;
      }
      case 3: {
        const { perPerson, tier } = state.budget;
        if (!perPerson) {
          return 'Please select a budget range';
        }
        if (!tier) {
          return 'Please select a tier';
        }
        return null;
      }
      case 4: {
        const { name, email } = state.contact;
        if (!name) {
          return 'Please enter your name';
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || !emailRegex.test(email)) {
          return 'Please enter a valid email address';
        }
        return null;
      }
      default:
        return null;
    }
  };

  return { state, dispatch, validate };
}
