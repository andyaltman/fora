export interface DestinationConfig {
  label: string;
  subtitle: string;
  bgImage: string;
  confirmClose: string;
}

const destinations: Record<string, DestinationConfig> = {
  south_africa: {
    label: 'South Africa',
    subtitle: 'Plan your South Africa adventure',
    bgImage: '/bg-south_africa.jpg',
    confirmClose: 'Your Travel Designer will be in touch to begin crafting your South Africa itinerary.',
  },
  botswana: {
    label: 'Botswana',
    subtitle: 'Discover Botswana\'s Okavango Delta',
    bgImage: '/bg-botswana.jpg',
    confirmClose: 'Your Travel Designer will be in touch about your Botswana experience.',
  },
  kenya: {
    label: 'Kenya',
    subtitle: 'Experience the Masai Mara in Kenya',
    bgImage: '/bg-kenya.jpg',
    confirmClose: 'Your Travel Designer will start planning your Kenya safari.',
  },
  tanzania: {
    label: 'Tanzania',
    subtitle: 'Explore the Serengeti and beyond',
    bgImage: '/bg-tanzania.jpg',
    confirmClose: 'Your Travel Designer will reach out about your Tanzania journey.',
  },
};

const defaultConfig: DestinationConfig = {
  label: '',
  subtitle: 'Help us plan the perfect trip',
  bgImage: '',
  confirmClose: 'Your Travel Designer will be in touch within 1–2 business days.',
};

export function getDestination(itinerary: string): DestinationConfig {
  if (!itinerary) return defaultConfig;
  return destinations[itinerary.toLowerCase()] ?? defaultConfig;
}
