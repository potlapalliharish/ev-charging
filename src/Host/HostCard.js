import React, { useState } from 'react';


function HostCard({ name, distance, price, link, requested, onApproved, onRejected, onComplete, isApproved, isCompleted }) {
    const handleNavigation = () => {
        window.open(link, "_blank");
    }
    const handleApproveClick = () => {
        onApproved(name);
    };
    const handleRejectClick = () => {
        onRejected(name);
    };
    const handleCompleteClick = () => {
        onComplete(name);
    };
    return (
        <div className="card">
            {
                isCompleted &&
                <img src="https://www.citypng.com/public/uploads/preview/hd-green-completed-round-stamp-png-31625678967vvbcblyvfm.png" className="approved-stamp" alt="Approved" />
                }
            <h2>{name}</h2>
            <p>Price: {price} /min</p>
            {!requested &&<div className="edit-btn-container"><button className="edit-btn">Edit</button></div>}
            {requested &&
            
                !isApproved ?
                <>
                <div className="reject-btn-container"><button onClick={handleRejectClick} className="reject-btn">Reject</button></div>
                <div className="approve-btn-container"><button onClick={handleApproveClick} className="edit-btn">Approve</button></div>
                </>
                :
                (isApproved &&!isCompleted) && <div className="edit-btn-container"><button onClick={handleCompleteClick} className="edit-btn">Complete</button></div>
            
            
            }
        </div>
    );
}
export default HostCard;