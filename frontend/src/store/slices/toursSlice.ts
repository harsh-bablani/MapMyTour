import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import type { PayloadAction } from '@reduxjs/toolkit';
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
      // Corrected syntax: `axios.get` instead of `axios.getfetch`
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/tours`);
      // Handle different response structures
      const toursData = response.data.tours || response.data || [];
      return Array.isArray(toursData) ? toursData : [];
    } catch (error: any) {
      // It's good practice to handle the error more specifically
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      }
      return rejectWithValue('Failed to fetch tours');
    }
  }
);

export const fetchTourById = createAsyncThunk(
  'tours/fetchTourById',
  async (id: string, { rejectWithValue }) => {
    try {
      // Corrected syntax: `axios.get` instead of `axios.getfetch`
      // The URL for fetching a single tour should include the tour `id`.
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/tours/${id}`);
      // Handle different response structures
      const tourData = response.data.tour || response.data;
      return tourData || null;
    } catch (error: any) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      }
      return rejectWithValue('Failed to fetch tour details');
    }
  }
);

export const createBooking = createAsyncThunk(
  'tours/createBooking',
  async (bookingData: any, { rejectWithValue }) => {
    try {
      // Corrected syntax: `axios.post` expects a URL and data as separate arguments.
      // The endpoint is also corrected to `/api/bookings` as per the first version.
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/bookings`,
        bookingData
      );
      // The backend should return the new booking data on success
      return response.data;
    } catch (error: any) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      }
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
      })
      // Create a booking
      .addCase(createBooking.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createBooking.fulfilled, (state, action) => {
        state.loading = false;
        // You might want to add a success message or perform a redirect here.
        console.log('Booking created successfully:', action.payload);
      })
      .addCase(createBooking.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setSortBy, setPriceRange, setDuration, clearFilters } = toursSlice.actions;
export default toursSlice.reducer;
