import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Users, TrendingUp, Star, Heart } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { toggleWishlist } from '../store/slices/wishlistSlice';
import type { Tour } from '../types/tour';

interface TourCardProps {
  tour: Tour;
}

const TourCard: React.FC<TourCardProps> = ({ tour }) => {
  const dispatch = useAppDispatch();
  const { tourIds } = useAppSelector((state) => state.wishlist);
  const isInWishlist = tourIds.includes(tour.id);

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(toggleWishlist(tour.id));
  };


  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
      <div className="relative">
        <img 
          src={tour.image} 
          alt={tour.title}
          className="w-full h-48 object-cover"
        />
        
        {/* Discount Badge */}
        {tour.originalPrice && (
          <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded text-sm font-medium">
            Save ${tour.originalPrice - tour.price}
          </div>
        )}
        
        {/* Wishlist Button */}
        <button
          onClick={handleWishlistToggle}
          className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors duration-200"
        >
          <Heart 
            className={`h-5 w-5 ${isInWishlist ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} 
          />
        </button>
      </div>
      
      <div className="p-5">
        <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">{tour.title}</h3>
        
        <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            {tour.duration}
          </div>
          <div className="flex items-center">
            <Users className="h-4 w-4 mr-1" />
            {tour.groupSize}
          </div>
          <div className="flex items-center">
            <TrendingUp className="h-4 w-4 mr-1" />
            {tour.difficulty}
          </div>
        </div>

        {/* Rating */}
        <div className="flex items-center mb-3">
          <div className="flex text-yellow-400">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-4 w-4 fill-current" />
            ))}
          </div>
          <span className="text-sm text-gray-600 ml-2">(4.9) 156 reviews</span>
        </div>
        
        {/* Description */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {tour.description}
        </p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-baseline">
            <span className="text-2xl font-bold text-gray-900">${tour.price}</span>
            {tour.originalPrice && (
              <span className="text-sm text-gray-500 line-through ml-2">${tour.originalPrice}</span>
            )}
            <span className="text-sm text-gray-600 ml-1">/ person</span>
          </div>
          
          <Link 
            to={`/tour/${tour.id}`}
            className="bg-red-500 text-white px-4 py-2 rounded-md font-medium hover:bg-red-600 transition-colors duration-200"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TourCard;
