import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle, XCircle } from 'lucide-react';
import { tours } from '../data/tours';

const InclusionsPage: React.FC = () => {
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
        <h1 className="text-3xl font-bold text-gray-900">What's Included</h1>
        <p className="text-gray-600 mt-2">{tour.title}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Inclusions */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center mb-4">
            <CheckCircle className="h-6 w-6 text-green-500 mr-2" />
            <h2 className="text-xl font-semibold text-gray-900">What's Included</h2>
          </div>
          
          <ul className="space-y-3">
            {tour.inclusions.map((inclusion, index) => (
              <li key={index} className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">{inclusion}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Exclusions */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center mb-4">
            <XCircle className="h-6 w-6 text-red-500 mr-2" />
            <h2 className="text-xl font-semibold text-gray-900">What's Not Included</h2>
          </div>
          
          <ul className="space-y-3">
            {tour.exclusions.map((exclusion, index) => (
              <li key={index} className="flex items-start">
                <XCircle className="h-5 w-5 text-red-500 mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">{exclusion}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Additional Information */}
      <div className="mt-8 bg-blue-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-3">Important Notes</h3>
        <div className="space-y-2 text-blue-800">
          <p>• All prices are per person and subject to change based on availability</p>
          <p>• Travel insurance is highly recommended for all participants</p>
          <p>• Some activities may be weather dependent and subject to local conditions</p>
          <p>• Physical fitness requirements apply - please consult with your doctor before booking</p>
          <p>• All permits and fees are included as specified in the inclusions list</p>
        </div>
      </div>

      {/* Call to Action */}
      <div className="mt-8 bg-white rounded-lg shadow-md p-6 text-center">
        <h3 className="text-xl font-semibold text-gray-900 mb-3">Ready to Book?</h3>
        <p className="text-gray-600 mb-4">
          This comprehensive package includes everything you need for an unforgettable adventure
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link 
            to={`/book/${tour.id}`}
            className="bg-red-500 text-white px-6 py-3 rounded-md font-medium hover:bg-red-600 transition-colors duration-200"
          >
            Book This Tour
          </Link>
          <Link 
            to={`/itinerary/${tour.id}`}
            className="bg-gray-100 text-gray-900 px-6 py-3 rounded-md font-medium hover:bg-gray-200 transition-colors duration-200"
          >
            View Itinerary
          </Link>
        </div>
      </div>
    </div>
  );
};

export default InclusionsPage;