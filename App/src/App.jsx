import { useState } from 'react'
import './App.css'
import { Grid, AppBar, Toolbar, Typography } from '@mui/material'
import RestaurantList from "./components/restaurantList"
import Map from "./components/map.jsx"
import 'leaflet/dist/leaflet.css'

function App() {

  return (
    <div className='App'>
      <Grid container sx={{height: "100%"}}>
        <AppBar position="static">
          <Toolbar>
            <Typography>
              Tom's Restaurant App
            </Typography>
          </Toolbar>
        </AppBar>
      </Grid>
      <Grid container sx={{height: "100%"}}>
        <Grid xs={3} item>
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
