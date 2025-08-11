import React, { useEffect, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchTours } from '../store/slices/toursSlice';
import FilterBar from '../components/FilterBar';
import TourCard from '../components/TourCard';
import { Loader2, AlertCircle } from 'lucide-react';

const ListPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { tours, loading, error, filters } = useAppSelector((state) => state.tours);

  useEffect(() => {
    dispatch(fetchTours());
  }, [dispatch]);

  // Filter and sort tours
  const filteredAndSortedTours = useMemo(() => {
    // Ensure tours is always an array
    const toursArray = Array.isArray(tours) ? tours : [];
    let filteredTours = [...toursArray];

    // Filter by price range
    filteredTours = filteredTours.filter(tour => 
      tour.price >= filters.priceRange.min && tour.price <= filters.priceRange.max
    );

    // Filter by duration
    if (filters.duration) {
      filteredTours = filteredTours.filter(tour => {
        const durationDays = parseInt(tour.duration.match(/(\d+)/)?.[1] || '0');
        switch (filters.duration) {
          case '1-5':
            return durationDays >= 1 && durationDays <= 5;
          case '6-10':
            return durationDays >= 6 && durationDays <= 10;
          case '11-15':
            return durationDays >= 11 && durationDays <= 15;
          case '16+':
            return durationDays >= 16;
          default:
            return true;
        }
      });
    }

    // Sort tours
    switch (filters.sortBy) {
      case 'name':
        filteredTours.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'price-low':
        filteredTours.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filteredTours.sort((a, b) => b.price - a.price);
        break;
      case 'duration':
        filteredTours.sort((a, b) => {
          const aDays = parseInt(a.duration.match(/(\d+)/)?.[1] || '0');
          const bDays = parseInt(b.duration.match(/(\d+)/)?.[1] || '0');
          return aDays - bDays;
        });
        break;
    }

    return filteredTours;
  }, [tours, filters]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="flex items-center space-x-2">
            <Loader2 className="h-8 w-8 animate-spin text-red-500" />
            <span className="text-lg text-gray-600">Loading tours...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Error Loading Tours</h3>
            <p className="text-gray-600 mb-4">{error}</p>
            <button
              onClick={() => dispatch(fetchTours())}
              className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Adventure Tours</h1>
        <p className="text-lg text-gray-600">Discover breathtaking mountain adventures and cultural experiences</p>
      </div>

      <FilterBar />

             {filteredAndSortedTours.length === 0 ? (
         <div className="text-center py-12">
           <div className="text-gray-500">
             <AlertCircle className="h-12 w-12 mx-auto mb-4" />
             <h3 className="text-lg font-semibold mb-2">
               {tours.length === 0 ? 'No tours available' : 'No tours found'}
             </h3>
             <p>
               {tours.length === 0 
                 ? 'Please check back later or contact support.' 
                 : 'Try adjusting your filters to see more results.'
               }
             </p>
           </div>
         </div>
       ) : (
        <>
          <div className="mb-4">
            <p className="text-sm text-gray-600">
              Showing {filteredAndSortedTours.length} of {tours.length} tours
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAndSortedTours.map((tour) => (
              <TourCard key={tour.id} tour={tour} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ListPage;