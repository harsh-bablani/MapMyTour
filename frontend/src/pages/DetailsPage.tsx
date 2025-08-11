import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Clock, Users, TrendingUp, Star, MapPin, Calendar, Heart, Loader2, AlertCircle } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchTourById } from '../store/slices/toursSlice';
import { toggleWishlist } from '../store/slices/wishlistSlice';

const DetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const { currentTour, loading, error } = useAppSelector((state) => state.tours);
  const { tourIds } = useAppSelector((state) => state.wishlist);
  
  const isInWishlist = id ? tourIds.includes(id) : false;

  useEffect(() => {
    if (id) {
      dispatch(fetchTourById(id));
    }
  }, [dispatch, id]);

  const handleWishlistToggle = () => {
    if (id) {
      dispatch(toggleWishlist(id));
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="flex items-center space-x-2">
            <Loader2 className="h-8 w-8 animate-spin text-red-500" />
            <span className="text-lg text-gray-600">Loading tour details...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error || !currentTour) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Tour Not Found</h3>
            <p className="text-gray-600 mb-4">{error || 'The tour you are looking for does not exist.'}</p>
            <Link
              to="/"
              className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors"
            >
              Back to Tours
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div>
          <img 
            src={currentTour.image} 
            alt={currentTour.title}
            className="w-full h-96 object-cover rounded-lg shadow-lg"
          />
        </div>
        
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{currentTour.title}</h1>
          
          <div className="flex items-center space-x-6 text-sm text-gray-600 mb-4">
            <div className="flex items-center">
              <Clock className="h-5 w-5 mr-2" />
              {currentTour.duration}
            </div>
            <div className="flex items-center">
              <Users className="h-5 w-5 mr-2" />
              {currentTour.groupSize}
            </div>
            <div className="flex items-center">
              <TrendingUp className="h-5 w-5 mr-2" />
              {currentTour.difficulty}
            </div>
          </div>

          <div className="flex items-center mb-4">
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-current" />
              ))}
            </div>
            <span className="text-sm text-gray-600 ml-2">(4.9) 156 reviews</span>
          </div>
          
          <p className="text-gray-700 mb-6 leading-relaxed">{currentTour.description}</p>
          
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Tour Highlights</h3>
            <ul className="space-y-2">
              {currentTour.highlights.map((highlight, index) => (
                <li key={index} className="flex items-center text-gray-700">
                  <div className="w-2 h-2 bg-red-500 rounded-full mr-3"></div>
                  {highlight}
                </li>
              ))}
            </ul>
          </div>
          
          <div className="bg-gray-50 p-6 rounded-lg">
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="flex items-baseline">
                  <span className="text-3xl font-bold text-gray-900">${currentTour.price}</span>
                  {currentTour.originalPrice && (
                    <span className="text-lg text-gray-500 line-through ml-2">${currentTour.originalPrice}</span>
                  )}
                  <span className="text-gray-600 ml-1">/ person</span>
                </div>
                {currentTour.originalPrice && (
                  <div className="text-sm text-green-600 font-medium">
                    Save ${currentTour.originalPrice - currentTour.price}!
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex space-x-3">
              <Link 
                to={`/book/${currentTour.id}`}
                className="flex-1 bg-red-500 text-white py-3 px-6 rounded-md font-medium text-center hover:bg-red-600 transition-colors duration-200"
              >
                Book This Tour
              </Link>
              <button 
                onClick={handleWishlistToggle}
                className={`px-6 py-3 border rounded-md font-medium transition-colors duration-200 flex items-center ${
                  isInWishlist 
                    ? 'border-red-500 text-red-500 hover:bg-red-50' 
                    : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Heart className={`h-5 w-5 mr-2 ${isInWishlist ? 'fill-current' : ''}`} />
                {isInWishlist ? 'Wishlisted' : 'Add to Wishlist'}
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Link 
          to={`/inclusions/${currentTour.id}`}
          className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-200"
        >
          <div className="flex items-center mb-3">
            <MapPin className="h-6 w-6 text-red-500 mr-2" />
            <h3 className="text-lg font-semibold text-gray-900">What's Included</h3>
          </div>
          <p className="text-gray-600">View detailed inclusions and exclusions for this tour</p>
        </Link>
        
        <Link 
          to={`/itinerary/${currentTour.id}`}
          className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-200"
        >
          <div className="flex items-center mb-3">
            <Calendar className="h-6 w-6 text-red-500 mr-2" />
            <h3 className="text-lg font-semibold text-gray-900">Day by Day Itinerary</h3>
          </div>
          <p className="text-gray-600">Explore the detailed daily itinerary for this adventure</p>
        </Link>
        
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <div className="flex items-center mb-3">
            <Users className="h-6 w-6 text-red-500 mr-2" />
            <h3 className="text-lg font-semibold text-gray-900">Group Details</h3>
          </div>
          <p className="text-gray-600">Small groups of {currentTour.groupSize} for personalized experience</p>
        </div>
      </div>
    </div>
  );
};

export default DetailsPage;