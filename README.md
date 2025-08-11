# Tour Booking Application

A modern tour booking application built with React, Redux Toolkit, and Node.js. Features include tour listing, filtering, sorting, wishlist functionality, and booking management.

## Features

### Frontend (React + TypeScript)
- **Tour Listing Page**: Display all available tours with filtering and sorting
- **Tour Detail Page**: Detailed tour information with wishlist functionality
- **Booking Form**: Multi-step booking form with localStorage persistence
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **State Management**: Redux Toolkit for global state management
- **Loading & Error States**: Proper handling of async operations
- **Wishlist**: Add/remove tours to wishlist with localStorage persistence

### Backend (Node.js + Express)
- **RESTful API**: Express server with TypeScript
- **Tour Management**: CRUD operations for tours
- **Booking System**: Handle tour bookings
- **Mock Data Fallback**: Graceful fallback when external APIs fail
- **CORS Support**: Cross-origin resource sharing enabled

## Tech Stack

### Frontend
- React 19
- TypeScript
- Redux Toolkit
- React Router DOM
- Tailwind CSS
- Lucide React (Icons)
- Axios

### Backend
- Node.js
- Express
- TypeScript
- CORS
- Axios

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd project
   ```

2. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd ../frontend/map-my-tour
   npm install
   ```

### Running the Application

1. **Start the backend server**
   ```bash
   cd backend
   npm run dev
   ```
   The backend will run on `http://localhost:5000`

2. **Start the frontend development server**
   ```bash
   cd frontend/map-my-tour
   npm run dev
   ```
   The frontend will run on `http://localhost:5173`

3. **Build for production**
   ```bash
   # Backend
   cd backend
   npm run build
   npm start

   # Frontend
   cd frontend/map-my-tour
   npm run build
   ```

## API Endpoints

### Tours
- `GET /api/tours` - Get all tours
- `GET /api/tours/:id` - Get tour by ID
- `POST /api/tours/book` - Create a booking

## Project Structure

```
project/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   │   └── toursController.ts
│   │   ├── routes/
│   │   │   └── tours.ts
│   │   └── index.ts
│   ├── package.json
│   └── tsconfig.json
└── frontend/
    └── map-my-tour/
        ├── src/
        │   ├── components/
        │   │   ├── FilterBar.tsx
        │   │   ├── Header.tsx
        │   │   └── TourCard.tsx
        │   ├── pages/
        │   │   ├── BookingForm.tsx
        │   │   ├── DetailsPage.tsx
        │   │   ├── InclusionsPage.tsx
        │   │   ├── ItineraryPage.tsx
        │   │   └── ListPage.tsx
        │   ├── store/
        │   │   ├── slices/
        │   │   │   ├── toursSlice.ts
        │   │   │   └── wishlistSlice.ts
        │   │   ├── hooks.ts
        │   │   └── index.ts
        │   ├── App.tsx
        │   └── main.tsx
        ├── package.json
        └── vite.config.ts
```

## Features in Detail

### Tour Listing Page
- Displays all available tours in a responsive grid
- Filter by price range and duration
- Sort by name, price (low to high/high to low), and duration
- Wishlist functionality with heart icons
- Loading and error states
- Responsive design for all screen sizes

### Tour Detail Page
- Comprehensive tour information display
- Tour highlights and description
- Pricing with discount calculations
- Wishlist toggle functionality
- Links to inclusions and itinerary pages
- Booking CTA button

### Booking Form
- Multi-step form (Personal Info → Tour Details → Emergency Contact)
- Form data persistence in localStorage
- Real-time price calculation
- Form validation
- Success confirmation with auto-redirect
- Responsive design

### Wishlist System
- Add/remove tours from wishlist
- Persistent storage in localStorage
- Visual feedback with heart icons
- State management with Redux

## Deployment

### Backend Deployment
The backend can be deployed to platforms like:
- Heroku
- Railway
- DigitalOcean
- AWS

### Frontend Deployment
The frontend can be deployed to:
- Vercel (recommended)
- Netlify
- GitHub Pages

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Acknowledgments

- Images from Pexels
- Icons from Lucide React
- UI components styled with Tailwind CSS
