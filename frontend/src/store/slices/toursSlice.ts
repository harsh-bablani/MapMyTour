import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import type { Tour } from '../../types/tour';

interface ToursState {
  tours: Tour[];
  currentTour: Tour | null;
  loading: boolean;
  error: string | null;
  filters: {
    sortBy: 'name' | 'price-low' | 'price-high' | 'duration';
    priceRange: { min: number; max: number };
    duration: string;
  };
}

const initialState: ToursState = {
  tours: [],
  currentTour: null,
  loading: false,
  error: null,
  filters: {
    sortBy: 'name',
    priceRange: { min: 0, max: 2000 },
    duration: '',
  },
};

// Async thunks
export const fetchTours = createAsyncThunk(
  'tours/fetchTours',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('http://localhost:5000/api/tours');
      // Handle different response structures
      const toursData = response.data.tours || response.data || [];
      return Array.isArray(toursData) ? toursData : [];
    } catch (error) {
      return rejectWithValue('Failed to fetch tours');
    }
  }
);

export const fetchTourById = createAsyncThunk(
  'tours/fetchTourById',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/tours/${id}`);
      // Handle different response structures
      const tourData = response.data.tour || response.data;
      return tourData || null;
    } catch (error) {
      return rejectWithValue('Failed to fetch tour details');
    }
  }
);

export const createBooking = createAsyncThunk(
  'tours/createBooking',
  async (bookingData: any, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:5000/api/tours/book', bookingData);
      return response.data;
    } catch (error) {
      return rejectWithValue('Failed to create booking');
    }
  }
);

const toursSlice = createSlice({
  name: 'tours',
  initialState,
  reducers: {
    setSortBy: (state, action: PayloadAction<'name' | 'price-low' | 'price-high' | 'duration'>) => {
      state.filters.sortBy = action.payload;
    },
    setPriceRange: (state, action: PayloadAction<{ min: number; max: number }>) => {
      state.filters.priceRange = action.payload;
    },
    setDuration: (state, action: PayloadAction<string>) => {
      state.filters.duration = action.payload;
    },
    clearFilters: (state) => {
      state.filters = initialState.filters;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch tours
      .addCase(fetchTours.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTours.fulfilled, (state, action) => {
        state.loading = false;
        state.tours = action.payload;
      })
      .addCase(fetchTours.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Fetch tour by ID
      .addCase(fetchTourById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTourById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentTour = action.payload;
      })
      .addCase(fetchTourById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setSortBy, setPriceRange, setDuration, clearFilters } = toursSlice.actions;
export default toursSlice.reducer;
