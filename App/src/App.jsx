import { useEffect} from 'react'
import './App.css'
import { Grid, AppBar, Toolbar, Typography } from '@mui/material'
import RestaurantList from "./components/restaurantList"
import Map from "./components/map.jsx"
import 'leaflet/dist/leaflet.css'
import { useDispatch} from 'react-redux';
import {loadRestaurantsSync} from "./redux/restaurantReducer.js"

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadRestaurantsSync())
  }, [dispatch]);

  
  return (
    <div className='App'>
      <Grid>
        <AppBar position="static">
          <Toolbar>
            <Typography>
              Tom's Restaurant App
            </Typography>
          </Toolbar>
        </AppBar>
      </Grid>
      <Grid container height='calc(100vh - 64px)'>
        <Grid xs={3} item sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          minHeight: 0
        }}>
          <RestaurantList />
        </Grid>
        <Grid xs={9} item>
          <Map />
        </Grid>
      </Grid>
    </div>
  )
}

export default App
