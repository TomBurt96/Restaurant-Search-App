import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

const BACKEND_URL = "http://localhost:8000/api"

const initialState = {
	restList: [],
	status: "",
}

const restaurantSlice = createSlice({
	name: "restListState",
	initialState,
	reducers: {
		loadRestaurants(state, action) {
			state.restList = action.payload.restaurants;
		},
	},
	extraReducers: (builder) => {
    builder
      // PENDING: Set loading state
      .addCase(loadRestaurantsSync.pending, (state) => {
        state.status = 'loading';
      })
      // FULFILLED: Update data and mark as initialized
      .addCase(loadRestaurantsSync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.restList = action.payload; // Store the fetched config data
      })
      // REJECTED: Store error
      .addCase(loadRestaurantsSync.rejected, (state) => {
        state.status = 'failed';
      });
  },
})

export const { loadRestaurants } = restaurantSlice.actions;

export const loadRestaurantsSync = createAsyncThunk(
	'restaurants/loadRestaurantsSync',
	async () => {
		try {
			const url = BACKEND_URL+'/restaurants/'
			const response = await axios.get(url); // Replace with your API endpoint
			return response.data;
		} catch (err) {
			console.err('error fetching data: ',err)
		}
	}
);

export default restaurantSlice.reducer