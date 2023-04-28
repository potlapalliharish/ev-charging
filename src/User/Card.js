import React,{ useState } from 'react';
import { FiNavigation, Fi } from 'react-icons/fi';

function Card({ name, distance, price, link , requested, onRequested, onCanceled}, ) {
    const handleNavigation = () => {
        window.open(link, "_blank");
      }
      //const [requested, setRequested] = useState(false);

      const handleRequestClick = () => {
        onRequested(name);
      };
      const handleCancelClick = () => {
        onCanceled(name);
      };
    return (
        <div className="card">
        <h2>{name}</h2>
        <p>Distance: {distance}</p>
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