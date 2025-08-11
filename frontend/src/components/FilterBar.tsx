import React from 'react';
import { ChevronDown, Filter } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setSortBy, setPriceRange, setDuration, clearFilters } from '../store/slices/toursSlice';

const FilterBar: React.FC = () => {
  const dispatch = useAppDispatch();
  const { filters } = useAppSelector((state) => state.tours);

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setSortBy(e.target.value as any));
  };

  const handlePriceRangeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    dispatch(setPriceRange({
      ...filters.priceRange,
      [name]: parseInt(value)
    }));
  };

  const handleDurationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setDuration(e.target.value));
  };

  const handleClearFilters = () => {
    dispatch(clearFilters());
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center">
          <Filter className="h-5 w-5 mr-2" />
          Filters & Sort
        </h3>
        <button
          onClick={handleClearFilters}
          className="text-sm text-red-500 hover:text-red-700 font-medium"
        >
          Clear All
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Sort By */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Sort By
          </label>
          <div className="relative">
            <select
              value={filters.sortBy}
              onChange={handleSortChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent appearance-none bg-white"
            >
              <option value="name">Name (A-Z)</option>
              <option value="price-low">Price (Low to High)</option>
              <option value="price-high">Price (High to Low)</option>
              <option value="duration">Duration</option>
            </select>
            <ChevronDown className="absolute right-3 top-2.5 h-4 w-4 text-gray-400 pointer-events-none" />
          </div>
        </div>

        {/* Duration Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Duration
          </label>
          <div className="relative">
            <select
              value={filters.duration}
              onChange={handleDurationChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent appearance-none bg-white"
            >
              <option value="">All Durations</option>
              <option value="1-5">1-5 Days</option>
              <option value="6-10">6-10 Days</option>
              <option value="11-15">11-15 Days</option>
              <option value="16+">16+ Days</option>
            </select>
            <ChevronDown className="absolute right-3 top-2.5 h-4 w-4 text-gray-400 pointer-events-none" />
          </div>
        </div>

        {/* Price Range Min */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Min Price ($)
          </label>
          <input
            type="number"
            name="min"
            value={filters.priceRange.min}
            onChange={handlePriceRangeChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
            placeholder="0"
          />
        </div>

        {/* Price Range Max */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Max Price ($)
          </label>
          <input
            type="number"
            name="max"
            value={filters.priceRange.max}
            onChange={handlePriceRangeChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
            placeholder="2000"
          />
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
