export interface Tour {
  id: string;
  title: string;
  price: number;
  originalPrice?: number;
  duration: string;
  difficulty: string;
  groupSize: string;
  image: string;
  description: string;
  highlights: string[];
  inclusions: string[];
  exclusions: string[];
  itinerary: {
    day: number;
    title: string;
    description: string;
    activities: string[];
  }[];
}
