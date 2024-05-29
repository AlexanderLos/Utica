import React, { useEffect, useState } from 'react';
import '../css/Map.css';
import "leaflet/dist/leaflet.css";
import axios from 'axios';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { Icon, divIcon, point } from 'leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';

const API_KEY = process.env.REACT_APP_API_KEY;
const API_URL = process.env.REACT_APP_API_URL;

const cryptoItems = ['Crypto ATM', 'Crypto Store', 'Crypto Exchange'];

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

  const getLocation = (e) => {
    e.preventDefault();
    axios.get(API_URL, {
      params: {
        query: selectedCryptoItem.toLowerCase(),
        near: query
      },
      headers: {
        'Accept': 'application/json',
        'Authorization': API_KEY
      }
    }).then(res => {
      const fetchedLocations = res.data.results.map(location => {
        const { latitude, longitude } = location.geocodes.main;
        return {
          name: location.name,
          address: location.location.formatted_address,
          distance: location.distance,
          timezone: location.timezone,
          latitude,
          longitude,
        };
      });
      setLocations(fetchedLocations);
      if (fetchedLocations.length > 0) setMapCenter([fetchedLocations[0].latitude, fetchedLocations[0].longitude]);
    }).catch(err => {
      console.error('API Error:', err);
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
                location.latitude && location.longitude ? (
                  <Marker 
                    key={index} 
                    position={[location.latitude, location.longitude]} 
                    icon={customIcon}
                  >
                    <Popup>
                      <div>
                        <h3>{location.name}</h3>
                        <p><strong>Address:</strong> {location.address}</p>
                        <p><strong>Distance:</strong> {location.distance} meters</p>
                        <p><strong>Timezone:</strong> {location.timezone}</p>
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

