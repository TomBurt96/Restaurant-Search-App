import { useEffect, useRef } from 'react'
import {
	List, ListItem, ListItemText, Checkbox, MenuItem, Select, Rating,
	ListItemIcon, Divider, Stack, Box
} from '@mui/material'
import { useDispatch, useSelector } from "react-redux";
import { selectRestaurants, selectRestId, setSelectedRestId } from '../redux/restaurantReducer';

function RestaurantList() {
	const dispatch = useDispatch();
	const restList = useSelector(selectRestaurants);
	const selectedId = useSelector(selectRestId);
	const listItemsRef = useRef({});
	console.log('restList in RestaurantList: ', restList);

	useEffect(() => {
		if (selectedId && listItemsRef.current[selectedId]) {
			listItemsRef.current[selectedId].scrollIntoView({
				behavior: 'smooth', // Smooth animation
				block: 'nearest',   // Minimizes scrolling distance
			});
		}
	}, [selectedId]);

	const createList = () => {
		const length = restList.length
		var items = []
		restList.forEach((restaurant, index) => {
			items.push(
				<ListItem key={restaurant.id}
					button
					selected={restaurant.id === selectedId}
					ref={(el) => (listItemsRef.current[restaurant.id] = el)}
					onClick={() => dispatch(setSelectedRestId(restaurant.id))}
				>
					<Stack>
						<ListItemText><h3>{restaurant.name}</h3></ListItemText>
						<ListItemText>{restaurant.food_type}</ListItemText>
						<ListItemText>{restaurant.price_range}</ListItemText>
						<ListItemText>{restaurant.address}</ListItemText>
						<ListItemText>{restaurant.website}</ListItemText>
						<Rating
							name="Rating"
							value={restaurant.rating}
						/>
					</Stack>
				</ListItem>)
			if (index < length - 1) {
				items.push(<Divider key={`divider-${restaurant.id}`}></Divider>)
			}
		})
		return items
	}

	return (
		<Box sx={{ flexGrow: 1, overflowY: 'auto', bgcolor: '#f5f5f5' }}>
			<List>
				{createList()}
			</List>
		</Box>
	)
}

export default RestaurantList
