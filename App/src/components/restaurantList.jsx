import { useState } from 'react'
import {
	List, ListItem, ListItemText, Checkbox, MenuItem, Select, Rating,
	ListItemIcon, Divider, Stack
} from '@mui/material'

const testData = [
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

const dollar_range = ["$", "$$", "$$$", "$$$$", "$$$$$"]

function RestaurantList() {

	const createList = () => {
		const length = testData.length
		var items = []
		testData.forEach((restaurant, index) => {
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
	console.log(createList())

	return (
		<div style={{height: "100%"}}>
			<List sx={{height: "100%", overflow: 'auto'}}>
				{createList()}
			</List>
		</div>
	)
}

export default RestaurantList
