import { useMemo } from 'react';
import L from 'leaflet';
import { useDispatch} from 'react-redux';
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import { useSelector } from "react-redux";
import { selectAllGeoJson, selectRestId, setSelectedRestId } from "../redux/restaurantReducer";

const customIcon = new L.Icon({
	iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
	shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
	iconSize: [25, 41],
	iconAnchor: [12, 41],
});

const selectedIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

function Map() {
	const dispatch = useDispatch();
	const selectedId = useSelector(selectRestId);
	const geoJSON = useSelector(selectAllGeoJson);

	const mapKey = useMemo(() => {
		return `restaurants-${geoJSON.features?.length || 0}-${selectedId || 'none'}`;
	}, [geoJSON, selectedId]);

	return (
		<MapContainer
			center={[42.361145, -71.0583]}
			zoom={13}
			scrollWheelZoom={true}
			style={{ height: "100%", width: "100%" }}
		>
			<TileLayer
				attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
			/>
			<GeoJSON
				key={mapKey}
				data={geoJSON}
				pointToLayer={(feature, latlng) => {
					return L.marker(latlng, {
						icon: feature.properties.id == selectedId ? selectedIcon : customIcon,
						zIndexOffset: feature.properties.id == selectedId ? 1000 : 0,
					});
				}}
				onEachFeature={(feature, layer) => {
					layer.on({
						click: () => {
							dispatch(setSelectedRestId(feature.properties.id));
						},
					});
				}}
			/>
		</MapContainer>)
}
export default Map