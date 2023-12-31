import React from "react"
import { MapContainer, TileLayer } from "react-leaflet";

function Map() {
	return(
		<MapContainer
			center={[51.505, -0.09]}
			zoom={13}
			scrollWheelZoom={true}
			style={{ height: "100%", width: "100%" }}
		>
		  <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
		</MapContainer>)
}
export default Map