import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import axios from 'axios';
import 'leaflet/dist/leaflet.css';

const Map = () => {
  const [stores, setStores] = useState([]);

  useEffect(() => {
    axios.get('/api/stores')
      .then(response => setStores(response.data))
      .catch(error => console.error('Error fetching store data:', error));
  }, []);

  return (
    <MapContainer center={[51.505, -0.09]} zoom={13} style={{ height: '100vh', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
      />
      {stores.map(store => (
        <Marker key={store.id} position={[store.latitude, store.longitude]}>
          <Popup>
            <strong>{store.name}</strong><br />
            {store.address}<br />
            {store.phone}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default Map;
