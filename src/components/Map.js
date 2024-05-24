import '../css/Map.css';
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon } from "leaflet";

  export default function Map() {
    // markers
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
      iconUrl: "https://cdn-icons-png.flaticon.com/128/7493/7493187.png",
      iconSize: [38, 38] // Size of the icon.
    })
    
    return (
      <MapContainer center={[48.8566, 2.3522]} zoom={13} className="leaflet-container">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />

        {markers.map((marker, index) => (
          <Marker key={index} position={marker.geocode} icon={customIcon}>
            </Marker>
        ))

        }
      </MapContainer>
    );
  }