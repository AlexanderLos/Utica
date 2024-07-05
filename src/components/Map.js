import React, { useEffect, useState } from 'react';
import '../css/Map.css';
import "leaflet/dist/leaflet.css";
import axios from 'axios';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { Icon, divIcon, point } from 'leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import Overlay from './Overlay';

const API_KEY = process.env.REACT_APP_API_KEY;
const API_URL = 'https://coinmap.org/api/v1/venues';

const cryptoItems = ['ATM', 'Store'];

function UpdateMap({ center }) {
  const map = useMap();
  useEffect(() => {
    if (center) map.flyTo(center, 13);
  }, [center, map]);
  return null;
}

export default function TestMap() {
  const [locations, setLocations] = useState([]);
  const [query, setQuery] = useState('');
  const [selectedCryptoItem, setSelectedCryptoItem] = useState(cryptoItems[0]);
  const [mapCenter, setMapCenter] = useState([48.8566, 2.3522]);
  const [isMaintenance, setIsMaintenance] = useState(true);

  const getLocation = (e) => {
    e.preventDefault();
    const CORS_PROXY = 'https://your-cors-proxy.herokuapp.com/';

    console.log(`Sending API request to: ${CORS_PROXY}${API_URL} with query: ${query} and category: ${selectedCryptoItem.toLowerCase()}`);

    axios.get(`${CORS_PROXY}${API_URL}`, {
      params: {
        query: query,
        category: selectedCryptoItem.toLowerCase(),
        limit: 50
      },
      headers: {
        'Accept': 'application/json',
        'Authorization': API_KEY
      }
    }).then(res => {
      console.log('API Response:', res.data);
      if (res.data && res.data.venues) {
        const fetchedLocations = res.data.venues.map(location => {
          const { lat, lon } = location;
          return {
            name: location.name,
            address: location.address,
            lat,
            lon,
          };
        });
        setLocations(fetchedLocations);
        if (fetchedLocations.length > 0) setMapCenter([fetchedLocations[0].lat, fetchedLocations[0].lon]);
      } else {
        console.error('Invalid API response structure:', res.data);
      }
    }).catch(err => {
      console.error('API Error:', err);
      console.error('Error Response:', err.response);
    });
  };

  const customIcon = new Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/128/429/429485.png",
    iconSize: [38, 38]
  });

  const createCustomClusterIcon = (cluster) => {
    return new divIcon({
      html: `<div class="cluster-icon">${cluster.getChildCount()}</div>`,
      className: "custom-cluster-cluster",
      iconSize: point(33, 33, true)
    });
  };

  return (
    <div>
      {isMaintenance && <Overlay />}
      <div className="about">
        <h2> Welcome to UTICA.</h2>
        <h3> We believe in the future of digital currency. Our platform helps crypto enthusiasts find establishments that accept crypto. To use the service, type a location and choose a service from the dropdown menu. Enjoy your search!</h3>
      </div>
      <div className="search-bar">
      <form onSubmit={getLocation}>
        <input 
          placeholder="Enter a location" 
          value={query} 
          onChange={(e) => setQuery(e.target.value)} 
        />
        <select 
          value={selectedCryptoItem} 
          onChange={(e) => setSelectedCryptoItem(e.target.value)}
        >
          {cryptoItems.map((item, index) => (
            <option key={index} value={item}>{item}</option>
          ))}
        </select>
        <button type="submit">Search</button>
      </form>
      </div>
      <div className='map-container'>
        <div className='Mapspot'>
          <MapContainer center={mapCenter} zoom={13} style={{ height: "70vh", width: "100%" }}>
            <TileLayer
              attribution='&copy; <a href="https://carto.com/">CARTO</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
              url='https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png'
            />
            <MarkerClusterGroup
              chunkedLoading
              iconCreateFunction={createCustomClusterIcon}
            >
              {locations.map((location, index) => (
                location.lat && location.lon ? (
                  <Marker 
                    key={index} 
                    position={[location.lat, location.lon]} 
                    icon={customIcon}
                  >
                    <Popup>
                      <div>
                        <h3>{location.name}</h3>
                        <p><strong>Address:</strong> {location.address}</p>
                      </div>
                    </Popup>
                  </Marker>
                ) : null
              ))}
            </MarkerClusterGroup>
            <UpdateMap center={mapCenter} />
          </MapContainer>
        </div>
      </div>
    </div>
  );
}
