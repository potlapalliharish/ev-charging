import React, { useState } from 'react';


function HostCard({ name, distance, price, link }) {
    const handleNavigation = () => {
        window.open(link, "_blank");
    }

    return (
        <div className="card">
            <h2>{name}</h2>
            <p>Price: {price} /min</p>
            <div className="edit-btn-container"><button className="edit-btn">Edit</button></div>
        </div>
    );
}
export default HostCard;