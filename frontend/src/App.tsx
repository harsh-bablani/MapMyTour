import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import ListPage from './pages/ListPage';
import DetailsPage from './pages/DetailsPage';
import BookingForm from './pages/BookingForm';
import InclusionsPage from './pages/InclusionsPage';
import ItineraryPage from './pages/ItineraryPage';
import ErrorBoundary from './components/ErrorBoundary';

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Header />
          <Routes>
            <Route path="/" element={<ListPage />} />
            <Route path="/tour/:id" element={<DetailsPage />} />
            <Route path="/book/:id" element={<BookingForm />} />
            <Route path="/inclusions/:id" element={<InclusionsPage />} />
            <Route path="/itinerary/:id" element={<ItineraryPage />} />
          </Routes>
        </div>
      </Router>
    </ErrorBoundary>
  );
}

export default App;