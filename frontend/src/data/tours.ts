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
  
  export const tours: Tour[] = [
    {
      id: '1',
      title: 'Himalayan Trek Adventure',
      price: 1200,
      originalPrice: 1500,
      duration: '12 Days',
      difficulty: 'Moderate',
      groupSize: '8-12 People',
      image: 'https://images.pexels.com/photos/1366919/pexels-photo-1366919.jpeg?auto=compress&cs=tinysrgb&w=800',
      description: 'Experience the breathtaking beauty of the Himalayas on this incredible 12-day trekking adventure. Journey through pristine mountain landscapes, encounter local culture, and challenge yourself on one of the world\'s most spectacular mountain ranges.',
      highlights: [
        'Summit views of 8000m+ peaks',
        'Traditional village homestays',
        'Professional mountain guides',
        'All permits and fees included'
      ],
      inclusions: [
        'Airport transfers',
        'All accommodation (tea houses/camping)',
        'All meals during the trek',
        'Experienced English-speaking guide',
        'Porter services (1 porter for 2 clients)',
        'All necessary permits and entrance fees',
        'First aid kit and oxygen meter',
        'Trekking route map',
        'Achievement certificate'
      ],
      exclusions: [
        'International flights to/from Nepal',
        'Nepal entry visa fee',
        'Personal trekking equipment',
        'Travel insurance',
        'Personal expenses and tips',
        'Emergency helicopter rescue',
        'Extra night accommodation in Kathmandu'
      ],
      itinerary: [
        {
          day: 1,
          title: 'Arrival in Kathmandu',
          description: 'Arrive at Tribhuvan International Airport and transfer to hotel.',
          activities: ['Airport pickup', 'Hotel check-in', 'Welcome dinner', 'Trip briefing']
        },
        {
          day: 2,
          title: 'Fly to Lukla, trek to Phakding',
          description: 'Early morning flight to Lukla and begin trekking to Phakding.',
          activities: ['Scenic mountain flight', 'Start of trek', 'River valley walking', 'Village exploration']
        },
        {
          day: 3,
          title: 'Trek to Namche Bazaar',
          description: 'Cross suspension bridges and ascend to the famous Sherpa town.',
          activities: ['Hillary Suspension Bridge', 'First views of Everest', 'Sherpa culture', 'Mountain town exploration']
        },
        {
          day: 4,
          title: 'Acclimatization Day',
          description: 'Rest day in Namche with optional hikes for acclimatization.',
          activities: ['Everest View Hotel hike', 'Sherpa Museum visit', 'Local market exploration', 'Rest and recovery']
        },
        {
          day: 5,
          title: 'Trek to Tengboche',
          description: 'Trek through rhododendron forests to the famous monastery.',
          activities: ['Forest trekking', 'Monastery visit', 'Mountain panorama', 'Evening prayers']
        }
      ]
    },
    {
      id: '2',
      title: 'Annapurna Base Camp Trek',
      price: 980,
      originalPrice: 1200,
      duration: '10 Days',
      difficulty: 'Moderate',
      groupSize: '6-10 People',
      image: 'https://images.pexels.com/photos/1450082/pexels-photo-1450082.jpeg?auto=compress&cs=tinysrgb&w=800',
      description: 'Discover the stunning Annapurna region on this classic trek to base camp. Experience diverse landscapes, from lush valleys to high-altitude glacial basins.',
      highlights: [
        'Annapurna Base Camp at 4,130m',
        'Diverse landscapes and ecosystems',
        'Gurung and Magar cultural villages',
        'Natural hot springs'
      ],
      inclusions: [
        'Airport transfers',
        'All accommodation during trek',
        'All meals during the trek',
        'Experienced trekking guide',
        'Porter services',
        'All permits and fees',
        'First aid kit',
        'Trekking map'
      ],
      exclusions: [
        'International flights',
        'Nepal visa fee',
        'Personal equipment',
        'Travel insurance',
        'Personal expenses',
        'Emergency evacuation',
        'Extra nights in Pokhara'
      ],
      itinerary: [
        {
          day: 1,
          title: 'Drive to Pokhara',
          description: 'Scenic drive from Kathmandu to Pokhara.',
          activities: ['Mountain highway drive', 'Lake city arrival', 'Hotel check-in', 'Lakeside walk']
        },
        {
          day: 2,
          title: 'Trek to Ulleri',
          description: 'Begin trek from Nayapul to Ulleri village.',
          activities: ['Trek start', 'Village paths', 'Stone staircase', 'Mountain lodge stay']
        }
      ]
    },
    {
      id: '3',
      title: 'Manaslu Circuit Trek',
      price: 1350,
      originalPrice: 1600,
      duration: '14 Days',
      difficulty: 'Challenging',
      groupSize: '6-8 People',
      image: 'https://images.pexels.com/photos/1591447/pexels-photo-1591447.jpeg?auto=compress&cs=tinysrgb&w=800',
      description: 'Explore the remote and pristine Manaslu region, often called the "Japanese Alps" of Nepal. This challenging trek offers incredible mountain views and authentic cultural experiences.',
      highlights: [
        'Remote mountain wilderness',
        'Larkya La Pass at 5,160m',
        'Tibetan Buddhist culture',
        'Manaslu Base Camp option'
      ],
      inclusions: [
        'All permits and fees',
        'Experienced guide and porters',
        'All accommodation',
        'All meals during trek',
        'Transportation',
        'First aid kit',
        'Satellite phone for emergency'
      ],
      exclusions: [
        'International flights',
        'Visa fees',
        'Personal gear',
        'Insurance',
        'Personal expenses',
        'Emergency helicopter',
        'Extra accommodation'
      ],
      itinerary: [
        {
          day: 1,
          title: 'Drive to Soti Khola',
          description: 'Long drive from Kathmandu to trek starting point.',
          activities: ['Early departure', 'Mountain road drive', 'River valley entry', 'Lodge accommodation']
        }
      ]
    }
  ];