import React, { useEffect, useState } from "react";
import styles from "./SlotModal.module.css";
import { updateItem, createItem } from "../Services/SlotsService";

function SlotModal({ modalType, currentCard, refreshCards, onClose}) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isEnabled, setIsEnabled] = useState(false);

  useEffect(()=>{
    if(currentCard) {
        const {name, price, latitude, longitude,phoneNumber, isEnabled} = currentCard;
        setName(name)
        setPrice(price);
        setLatitude(latitude)
        setLongitude(longitude)
        setPhoneNumber(phoneNumber)
        setIsEnabled(isEnabled)
    }
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault();
    refreshCards()
    if(modalType == 'edit') {
        updateItem(currentCard.name, {name,
          price,
          latitude,
          longitude,
          phoneNumber,
          isEnabled})
    }else{
      createItem({
        name,
        price,
        latitude,
        longitude,
        phoneNumber,
        isEnabled
      })
    }
    onClose();
  };

  const handleModalClick = (e) => {
    if (e.target.classList.contains(styles.modal)) {
      onClose();
    }
  };

  return (
    <>
        <div className={styles.modal}>
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
              <button onClick={onClose} type="submit">Cancel</button>
              &nbsp;
              <button type="submit">Submit</button>
            </form>
          </div>
        </div>
    </>
  );
}

export default SlotModal;
