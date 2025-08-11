import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Activity } from 'lucide-react';
import { tours } from '../data/tours';

const ItineraryPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const tour = tours.find(t => t.id === id);

  if (!tour) {
    return <div className="text-center py-8">Tour not found</div>;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <Link to={`/tour/${id}`} className="flex items-center text-red-500 hover:text-red-600 mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Tour Details
        </Link>
        <h1 className="text-3xl font-bold text-gray-900">Day by Day Itinerary</h1>
        <p className="text-gray-600 mt-2">{tour.title} - {tour.duration}</p>
      </div>

      {/* Itinerary Overview */}
      <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-lg p-6 text-white mb-8">
        <h2 className="text-2xl font-bold mb-2">Your Adventure Awaits</h2>
        <p className="text-red-100">
          Follow this carefully planned itinerary designed by our expert guides to ensure you get the most out of your {tour.duration} adventure.
        </p>
      </div>

      {/* Daily Itinerary */}
      <div className="space-y-6">
        {tour.itinerary.map((day) => (
          <div key={day.day} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="bg-gray-50 px-6 py-4 border-b">
              <div className="flex items-center">
                <div className="bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4">
                  {day.day}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{day.title}</h3>
                  <div className="flex items-center text-sm text-gray-600 mt-1">
                    <Calendar className="h-4 w-4 mr-1" />
                    Day {day.day} of {tour.duration.split(' ')[0]}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-6">
              <p className="text-gray-700 mb-4 leading-relaxed">{day.description}</p>
              
              <div>
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                  <Activity className="h-4 w-4 mr-2" />
                  Daily Activities
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {day.activities.map((activity, actIndex) => (
                    <div key={actIndex} className="flex items-center text-sm text-gray-700">
                      <div className="w-2 h-2 bg-red-400 rounded-full mr-3"></div>
                      {activity}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Additional Days Notice */}
      {tour.itinerary.length < parseInt(tour.duration.split(' ')[0]) && (
        <div className="bg-blue-50 rounded-lg p-6 mt-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">Complete Itinerary Available</h3>
          <p className="text-blue-800">
            This is a preview of the first {tour.itinerary.length} days. The complete {tour.duration} itinerary 
            with all daily activities, accommodation details, and meal plans will be provided upon booking.
          </p>
        </div>
      )}

      {/* Preparation Tips */}
      <div className="bg-gray-50 rounded-lg p-6 mt-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Preparation Tips</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Physical Preparation</h4>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• Start training at least 8 weeks before departure</li>
              <li>• Focus on cardiovascular fitness and leg strength</li>
              <li>• Practice hiking with a loaded backpack</li>
              <li>• Consult with your doctor before training</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Gear & Equipment</h4>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• Break in your hiking boots before departure</li>
              <li>• Invest in quality weather-resistant clothing</li>
              <li>• Complete gear list provided after booking</li>
              <li>• Equipment rental options available</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="mt-8 bg-white rounded-lg shadow-md p-6 text-center">
        <h3 className="text-xl font-semibold text-gray-900 mb-3">Ready for This Adventure?</h3>
        <p className="text-gray-600 mb-4">
          Book now to secure your spot on this incredible {tour.duration} journey
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link 
            to={`/book/${tour.id}`}
            className="bg-red-500 text-white px-6 py-3 rounded-md font-medium hover:bg-red-600 transition-colors duration-200"
          >
            Book This Tour - ${tour.price}
          </Link>
          <Link 
            to={`/inclusions/${tour.id}`}
            className="bg-gray-100 text-gray-900 px-6 py-3 rounded-md font-medium hover:bg-gray-200 transition-colors duration-200"
          >
            View Inclusions
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ItineraryPage;