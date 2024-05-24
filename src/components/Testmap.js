import React, { useEffect } from 'react';
import '../css/Map.css';
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon, divIcon, point } from 'leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';

export default function TestMap() {
  useEffect(() => {
    console.log('TestMap component mounted');
  }, []);

  const markers = [
    { 
      geocode: [48.86, 2.3522],
      popUp: 'Hello I am pop up 1'
    },
    {
      geocode: [48.85, 2.3522],
      popUp: 'Hello I am pop up 2'
    },
    {
      geocode: [48.855, 2.235],
      popUp: 'Hello I am pop up 3'
    },
  ];

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
      <h2>Map should appear below:</h2>
      <div className='map-container'>
      <div className='Mapspot'>
        <MapContainer center={[48.8566, 2.3522]} zoom={13} style={{ height: "70vh", width: "100%" }}>
          <TileLayer
            attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
            url='https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png'
          />
          <MarkerClusterGroup
          chunkedLoading
          iconCreateFunction={createCustomClusterIcon}
          >
          {markers.map((marker, index) => (
            <Marker key={index} position={marker.geocode} icon={customIcon}>
              <Popup>{marker.popUp}</Popup>
            </Marker>
          ))}
          </MarkerClusterGroup>
        </MapContainer>
      </div>
    </div>
  </div>
  );
}

