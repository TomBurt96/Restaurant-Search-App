import { configureStore } from "@reduxjs/toolkit"
import restaurantSlice from './restaurantReducer.js'

const store = configureStore({
	reducer: {
		restaurants: restaurantSlice,
	}
})

export default store