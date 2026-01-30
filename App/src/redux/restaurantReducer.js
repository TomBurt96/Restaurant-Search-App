import { createSlice, createAsyncThunk, createSelector } from "@reduxjs/toolkit"
import axios from "axios"

const BACKEND_URL = "http://localhost:8000/api"

const initialState = {
	restList: [],
	status: "",
	selectedRestId: null,
}

const restaurantSlice = createSlice({
	name: "restListState",
	initialState,
	reducers: {
		loadRestaurants(state, action) {
			state.restList = action.payload.restaurants;
		},
		setSelectedRestId: (state, action) => {
      		state.selectedRestId = action.payload;
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

export const { loadRestaurants, setSelectedRestId } = restaurantSlice.actions;

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

const selectRestaurantState = (state) => state.restaurants;
export const selectRestId = (state) => state.restaurants.selectedRestId;

/*
export const selectActiveFeature = createSelector(
  [selectRestId],
  (selectedId) => {
    if (!selectedId) return null;
    return geoData.features.find((f) => f.properties.id === selectedId);
  }
);
*/

export const selectAllGeoJson = createSelector(
  [selectRestaurantState],
  (restaurants) => {
	console.log("selectAllGeoJson", restaurants);
	return restaurants.restList;
  }
);

export const selectRestaurants = createSelector(
	[selectAllGeoJson],
	(geoJson) => {
		if (!geoJson || !geoJson.features) return [];
		return geoJson.features.map((feature) => feature.properties);
	}
);