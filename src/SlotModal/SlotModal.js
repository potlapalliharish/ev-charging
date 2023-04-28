import React, { useEffect, useState } from "react";
import styles from "./SlotModal.module.css";
import { updateItem } from "../Services/SlotsService";

function SlotModal({showModalProp, modalType, currentCard, refreshCards}) {
console.log('helllo');
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isEnabled, setIsEnabled] = useState(false);
  const [showModal, setShowModal] = useState(showModalProp);

  useEffect(()=>{
    console.log("Slot Modal is ", showModalProp);
    setShowModal(showModalProp)
    if(currentCard) {
        const {name, price, latitude, longitude} = currentCard;
        setName(name)
        setPrice(price);
        setLatitude(latitude)
        setLongitude(longitude)
    }
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault();
    refreshCards()
    if(modalType == 'edit') {
        updateItem(currentCard.name, {name, price})
    }
    // do something with the form data
    console.log({
      name,
      price,
      latitude,
      longitude,
      phoneNumber,
      isEnabled,
    });
    setShowModal(false);
  };

  const handleModalClick = (e) => {
    if (e.target.classList.contains(styles.modal)) {
      setShowModal(false);
    }
  };

  return (
    <>
      {showModal && (
        <div className={styles.modal} onClick={handleModalClick}>
          <div className={styles.modalContent}>
            <h3>{modalType == 'add' ?  'Add a Slot': "Edit the slot"}</h3> 
            <form onSubmit={handleSubmit}>
              <label>
                Name
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </label>
              <label>
                Price
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                />
              </label>
              <label>
                Latitude
                <input
                  type="number"
                  step="0.000001"
                  value={latitude}
                  onChange={(e) => setLatitude(e.target.value)}
                  required
                />
              </label>
              <label>
                Longitude
                <input
                  type="number"
                  step="0.000001"
                  value={longitude}
                  onChange={(e) => setLongitude(e.target.value)}
                  required
                />
              </label>
              <label>
                Phone Number
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  required
                />
              </label>
              <div className={styles.switchContainer}>
                <input
                  type="checkbox"
                  id="enableSwitch"
                  checked={isEnabled}
                  onChange={(e) => setIsEnabled(e.target.checked)}
                />
                <label htmlFor="enableSwitch">
                  {isEnabled ? "Enabled" : "Disabled"}
                </label>
              </div>
              <button type="submit">Submit</button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default SlotModal;
