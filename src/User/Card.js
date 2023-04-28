import React,{ useState, useEffect } from 'react';
import { FiNavigation, Fi } from 'react-icons/fi';

function Card({ name, price,latitude, longitude, link , requested, onRequested, onCanceled}, ) {
    const handleNavigation = () => {
        window.open(link, "_blank");
      }
      //const [requested, setRequested] = useState(false);
      const [distance, setDistance] = useState(0);
      const handleRequestClick = () => {
        onRequested(name);
      };
      const handleCancelClick = () => {
        onCanceled(name);
      };
      const getDistanceFromLatLonInKm = (lat1, lon1, lat2, lon2) => {
        const R = 6371; // Radius of the earth in km
        const dLat = deg2rad(lat2 - lat1); // deg2rad below
        const dLon = deg2rad(lon2 - lon1);
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(deg2rad(lat1)) *
            Math.cos(deg2rad(lat2)) *
            Math.sin(dLon / 2) *
            Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const d = R * c; // Distance in km
        return d.toFixed(1);
    };
    const deg2rad = deg => {
        return deg * (Math.PI / 180);
    };
      const calculateDistance = () => {
        var currentLatitude,currentLongitude;
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                currentLatitude = position.coords.latitude;
                currentLongitude = position.coords.longitude;
                setDistance(getDistanceFromLatLonInKm(
                    currentLatitude,
                   currentLongitude,
                   latitude,
                   longitude))
            });
        }
      };
      useEffect(() => {
        calculateDistance()
      });
    return (
        <div className="card">
        <h2>{name}</h2>
        <p>Distance: {distance} KM</p>
        <p>Price: {price} /min</p>
        <button className="nav-icon" onClick={handleNavigation}>
          <FiNavigation />
        </button>
        <div className="request-btn-container">
          {!requested ? (
            <button className="request-btn" onClick={handleRequestClick}>Request</button>
          ) : (
            <button className="cancel-btn" onClick={handleCancelClick}>Cancel</button>
          )}
        </div>
      </div>
    );
  }
  export default Card;