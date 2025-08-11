import { Request, Response } from 'express';
import axios from 'axios';

// Mock data for fallback when API fails
const mockTours = [
  {
    id: '1',
    title: 'Himalayan Trek Adventure',
    price: 1200,
    originalPrice: 1500,
    duration: '12 Days',
    difficulty: 'Moderate',
    groupSize: '8-12 People',
    image: 'https://images.pexels.com/photos/1366919/pexels-photo-1366919.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Experience the breathtaking beauty of the Himalayas on this incredible 12-day trekking adventure.',
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
    description: 'Discover the stunning Annapurna region on this classic trek to base camp.',
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
    description: 'Explore the remote and pristine Manaslu region, often called the "Japanese Alps" of Nepal.',
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

export const getTours = async (req: Request, res: Response) => {
  try {
    // Try to fetch from external API first
    console.log('Attempting to fetch from external API...');
    const response = await axios.get('https://dummyjson.com/c/b3a6-28bd-48d3-9f64');
    console.log('External API response:', response.data);
    
    // Transform the API response to match our expected format
    if (response.data && response.data.data) {
      const transformedTours = response.data.data.map((tour: any) => ({
        id: tour.id.toString(),
        title: tour.title,
        price: parseInt(tour.discountedPrice.replace('$', '')),
        originalPrice: parseInt(tour.actualPrice.replace('$', '')),
        duration: tour.duration,
        difficulty: 'Moderate', // Default value since API doesn't provide this
        groupSize: '6-12 People', // Default value since API doesn't provide this
        image: tour.image,
        description: tour.description,
        highlights: [
          'Professional guides',
          'All permits included',
          'Accommodation provided',
          'Meals included'
        ],
        inclusions: [
          'Professional guide',
          'All permits and fees',
          'Accommodation',
          'Meals during the tour',
          'Transportation'
        ],
        exclusions: [
          'International flights',
          'Personal expenses',
          'Travel insurance',
          'Tips and gratuities'
        ],
        itinerary: [
          {
            day: 1,
            title: 'Arrival and Welcome',
            description: 'Arrive at destination and meet your guide.',
            activities: ['Airport pickup', 'Hotel check-in', 'Welcome dinner']
          },
          {
            day: 2,
            title: 'Tour Begins',
            description: 'Start your adventure with the first day of activities.',
            activities: ['Breakfast', 'Tour activities', 'Local dinner']
          }
        ]
      }));
      
      res.json({ tours: transformedTours });
    } else {
      res.json({ tours: mockTours });
    }
  } catch (error) {
    console.log('External API failed, using mock data');
    console.log('Error details:', error instanceof Error ? error.message : 'Unknown error');
    // Fallback to mock data
    res.json({ tours: mockTours });
  }
};

export const getTourById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    // Try to fetch from external API first
    console.log('Attempting to fetch tour details from external API...');
    const response = await axios.post('https://dummyjson.com/c/d82a-d75d-4727-8f37', { id });
    console.log('External API response for tour details:', response.data);
    
    // Transform the API response to match our expected format
    if (response.data && response.data.data) {
      const tourData = response.data.data;
      const transformedTour = {
        id: tourData.id.toString(),
        title: tourData.title,
        price: parseInt(tourData.discountedPrice.replace('$', '')),
        originalPrice: parseInt(tourData.actualPrice.replace('$', '')),
        duration: tourData.duration,
        difficulty: 'Moderate', // Default value since API doesn't provide this
        groupSize: '6-12 People', // Default value since API doesn't provide this
        image: tourData.image,
        description: tourData.description,
        highlights: [
          'Professional guides',
          'All permits included',
          'Accommodation provided',
          'Meals included'
        ],
        inclusions: [
          'Professional guide',
          'All permits and fees',
          'Accommodation',
          'Meals during the tour',
          'Transportation'
        ],
        exclusions: [
          'International flights',
          'Personal expenses',
          'Travel insurance',
          'Tips and gratuities'
        ],
        itinerary: [
          {
            day: 1,
            title: 'Arrival and Welcome',
            description: 'Arrive at destination and meet your guide.',
            activities: ['Airport pickup', 'Hotel check-in', 'Welcome dinner']
          },
          {
            day: 2,
            title: 'Tour Begins',
            description: 'Start your adventure with the first day of activities.',
            activities: ['Breakfast', 'Tour activities', 'Local dinner']
          }
        ]
      };
      
      res.json({ tour: transformedTour });
    } else {
      // Fallback to mock data
      const tour = mockTours.find(t => t.id === id);
      
      if (!tour) {
        return res.status(404).json({ message: 'Tour not found' });
      }
      
      res.json({ tour });
    }
  } catch (error) {
    console.log('External API failed, using mock data');
    console.log('Error details:', error instanceof Error ? error.message : 'Unknown error');
    // Fallback to mock data
    const { id } = req.params;
    const tour = mockTours.find(t => t.id === id);
    
    if (!tour) {
      return res.status(404).json({ message: 'Tour not found' });
    }
    
    res.json({ tour });
  }
};

export const postBooking = async (req: Request, res: Response) => {
  try {
    const bookingData = req.body;
    
    // Validate required fields
    if (!bookingData.tourId || !bookingData.customerName || !bookingData.email) {
      return res.status(400).json({ 
        message: 'Missing required fields: tourId, customerName, email' 
      });
    }
    
    // In a real application, you would save to database here
    // For now, we'll just return a success response
    const booking = {
      id: Date.now().toString(),
      ...bookingData,
      status: 'confirmed',
      bookingDate: new Date().toISOString()
    };
    
    res.status(201).json({ 
      message: 'Booking created successfully',
      booking 
    });
  } catch (error) {
    res.status(500).json({ message: 'Error creating booking' });
  }
};
