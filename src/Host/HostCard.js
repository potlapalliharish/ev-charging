import React, { useState, useEffect } from 'react';
import CompletedStamp from '../completed-stamp.png'
import { RequestStatusEnum } from '../Models/RequestStatusEnum';
function HostCard({ name, distance, price, link, requested, onApproved, onRejected, onComplete,status, onEdit,onStart, startTime, endTime }) {
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
    const handleEdit = () => {
        onEdit(name);
    };
    const handleStartClick = () => {
        onStart(name);
    };
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
        <div className="card">
            {
                status == RequestStatusEnum.COMPLETED &&
                <img src={CompletedStamp} className="approved-stamp" alt="Approved" />
            }
            <div className="card-details">
                <h2>{name}</h2>
                {status == RequestStatusEnum.COMPLETED ?
                <p>Total Price: ₹ {Math.ceil((new Date(endTime)-new Date(startTime))/60000)*price} </p>
            :
            <p>Price: ₹ {price} /min</p>
           
            }
            {(status == RequestStatusEnum.APPROVED && !!startTime) &&
            <p>Time Elapsed: {timer}</p>
            }
             </div>
            {!requested && <div className="edit-btn-container"><button onClick={handleEdit} className="edit-btn">Edit</button></div>}
            {requested &&

                status == RequestStatusEnum.REQUESTED ?
                <>
                    <div className="reject-btn-container"><button onClick={handleRejectClick} className="reject-btn">Reject</button></div>
                    <div className="approve-btn-container"><button onClick={handleApproveClick} className="edit-btn">Approve</button></div>
                </>
                :
                (status == RequestStatusEnum.APPROVED) &&  (
                    !startTime ?
                    <div className="edit-btn-container"><button onClick={handleStartClick} className="edit-btn">Start</button></div>
                    :
                    <div className="edit-btn-container"><button onClick={handleCompleteClick} className="edit-btn">Complete</button></div>

                )


            }
        </div>
    );
}
export default HostCard;