import React, { useState, useEffect } from 'react';
import { FiNavigation, Fi } from 'react-icons/fi';
import ApprovedStamp from '../Approved-Stamp.png';
import CompletedStamp from '../completed-stamp.png';
import { RequestStatusEnum } from '../Models/RequestStatusEnum';
import Charging from '../charger1.gif'
function Card({ name, price, latitude, longitude, link, requested, onRequested, onCanceled, status, startTime, endTime},) {
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
        var currentLatitude, currentLongitude;
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
    },[]);
    const [timer, setTimer] = useState("00:00:00");
    useEffect(() => {
        const interval = setInterval(() => {
            var diff = Math.abs(new Date() - new Date(startTime));

            var ms = diff % 1000;
            diff = (diff - ms) / 1000
            var ss = diff % 60;
            diff = (diff - ss) / 60
            var mm = diff % 60;
            diff = (diff - mm) / 60
            var hh = diff % 24;
            setTimer(!!startTime ? ('0' + hh).slice(-2)+":"+('0' + mm).slice(-2)+":"+('0' + ss).slice(-2) :"00:00:00")
        }, 1000);
        return () => clearInterval(interval);
      }, [startTime]);
    return (
        <div className={`card`}>
            {(status == RequestStatusEnum.APPROVED  )&& (
                (
                    !!startTime ?
                <img src={Charging} className="approved-stamp" alt="Approved" />:
                <img src={ApprovedStamp} className="approved-stamp" alt="Approved" />)
                
            )}
            {status == RequestStatusEnum.COMPLETED && 
                <img src={CompletedStamp} className="approved-stamp" alt="Approved" />}
            <h2>{name}</h2>
            {(status == RequestStatusEnum.APPROVED && !!startTime) ?
            <p>Time Elapsed: {timer}</p>
            :<p>Distance: {distance} KM</p>
            }
            
            {status == RequestStatusEnum.COMPLETED ?
                <p>Total Price: ₹ {Math.ceil((new Date(endTime)-new Date(startTime))/60000)*price} </p>
            :
            <p>Price: ₹ {price} /min</p>
            }
            {status != RequestStatusEnum.COMPLETED  &&<button className="nav-icon" onClick={handleNavigation}>
                <FiNavigation />
            </button>}
            <div className="request-btn-container">
                {!requested ? (
                    <button className="request-btn" onClick={handleRequestClick}>Request</button>
                ) : (status == RequestStatusEnum.REQUESTED   &&
                    <button className="cancel-btn" onClick={handleCancelClick}>Cancel</button>
                )}
            </div>
        </div>
    );
}
export default Card;