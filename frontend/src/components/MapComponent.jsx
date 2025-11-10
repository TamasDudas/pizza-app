import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const MapComponent = () => {
	const mapContainerStyle = {
		width: '100%',
		height: '400px',
	};

	const center = {
		lat: 47.4979, // Budapest
		lng: 19.0402,
	};

	return (
		<LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
			<GoogleMap mapContainerStyle={mapContainerStyle} center={center} zoom={13}>
				<Marker position={center} />
			</GoogleMap>
		</LoadScript>
	);
};

export default MapComponent;
