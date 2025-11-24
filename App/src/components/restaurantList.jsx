import { useState } from 'react'
import {
	List, ListItem, ListItemText, Checkbox, MenuItem, Select, Rating,
	ListItemIcon, Divider, Stack
} from '@mui/material'
import { useDispatch, useSelector } from "react-redux";

const dollar_range = ["$", "$$", "$$$", "$$$$", "$$$$$"]

function RestaurantList() {
	const restList = useSelector((state) => state.restaurants.restList)

	const createList = () => {
		console.log(restList);
		const length = restList.length
		var items = []
		restList.forEach((restaurant, index) => {
			items.push(
				<ListItem>
					<Stack>
						<ListItemText><h3>{restaurant.name}</h3></ListItemText>
						<ListItemText>{restaurant.restaurant_type}</ListItemText>
						<ListItemText>{restaurant.price_range}</ListItemText>
						<ListItemText>{restaurant.food_type}</ListItemText>
						<ListItemText>{restaurant.address}</ListItemText>
						<Rating
							name="Rating"
							value={restaurant.rating}
						/>
					</Stack>
				</ListItem>)
			if (index < length - 1) {
				items.push(<Divider></Divider>)
			}
		})
		return items
	}

	return (
		<div style={{height: "100%"}}>
			<List sx={{height: "100%", overflow: 'auto'}}>
				{createList()}
			</List>
		</div>
	)
}

export default RestaurantList
