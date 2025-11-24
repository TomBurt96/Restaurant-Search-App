import { createSlice } from "@reduxjs/toolkit"
import {axios} from "axios"

const BACKEND_URL = "https://localhost:8000/api"

const initialState = {
	restList: [
		{
			"id": 1,
			"name": "test",
			"restaurant_type": "Fine Dining",
			"price_range": 3,
			"food_type": "Italian",
			"address": "test address",
			"rating": 5.0,
			"delivers": false
		},
		{
			"id": 2,
			"name": "test2",
			"restaurant_type": "Tavern",
			"price_range": 2,
			"food_type": "Pub Food",
			"address": "test2 address",
			"rating": 4.5,
			"delivers": true
		},
		{
			"id": 4,
			"name": "test23",
			"restaurant_type": "Tavern",
			"price_range": 3,
			"food_type": "Pub Food",
			"address": "test2 address",
			"rating": 4.7,
			"delivers": true
		},
		{
			"id": 5,
			"name": "test231",
			"restaurant_type": "Tavern",
			"price_range": 3,
			"food_type": "Pub Food",
			"address": "test2 address",
			"rating": 4.7,
			"delivers": true
		}
	]
}

const restaurantSlice = createSlice({
	name: "restListState",
	initialState,
	reducers: {
		loadRestaurants(state, action) {
			state.restList = action.payload.restaurants;
		},
	}
})

export const { loadRestaurants } = restaurantSlice.actions;

export const loadRestaurantsSync = async dispatch => {
	try {
		const response = await fetch(BACKEND_URL+`/restaurants`); // Replace with your API endpoint
		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}
		dispatch(loadRestaurants(response.restaurants));
	} catch (err) {
		console.err('error fetching data: ',err)
	}
}

export default restaurantSlice.reducer