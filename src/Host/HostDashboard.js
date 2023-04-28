import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import HostCard from './HostCard';
import { FiPlus, Fi } from 'react-icons/fi';
import { RiLogoutBoxLine } from 'react-icons/ri';
import { useState } from 'react';
import * as SlotsService from '../Services/SlotsService';
import * as RequestsService from '../Services/RequestsService';
import SlotModal from '../SlotModal/SlotModal';
function HostDashboard({reRender}) {
  const navigate = useNavigate()
  const handleBack = () => {
    navigate('/');
  };
  const [activeTab, setActiveTab] = useState('slots');
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  var cards = SlotsService.readAllItems();
  const requests = RequestsService.readAllItems();
  const handleApproveClick = (name) => {
    var item = requests.find(i => i.name === name);
    item.isApproved = true;
    RequestsService.updateItem(name, item)
    reRender()
  };
  const handleRejectClick = (name) => {
    RequestsService.deleteItem(name)
    //hack to force rerender a component
    reRender()
  };
  const handleCompleteClick = (name) => {
    var item = requests.find(i => i.name === name);
    item.isCompleted = true;
    RequestsService.updateItem(name, item)
    //hack to force rerender a component
    reRender();
  };
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentCard, setcurrentCard] = useState(null);
  const handleAddModal=()=>{
    setShowAddModal(true);
  }
  const handleCloseAddModal=()=>{
    setShowAddModal(false);
  }
  const handleEditModal=(name)=>{
    setcurrentCard(cards.find(c => c.name === name));
    setShowEditModal(true);
  }
  const handleCloseEditModal=()=>{
    setcurrentCard(null)
    setShowEditModal(false);
  }
  const refreshCards=()=>{
    cards = SlotsService.readAllItems();
  }
  return (
    <div className="dashboard">
      <div>
        <nav className="dashboard-nav">
          <Link to="/"><img src="https://cdn-icons-png.flaticon.com/512/2991/2991201.png" /></Link>
          <div className="dashboard-tabs">
            <button className={activeTab === 'slots' ? 'active' : ''} onClick={() => handleTabClick('slots')}>
              Slots
            </button>
            <button className={activeTab === 'requests' ? 'active' : ''} onClick={() => handleTabClick('requests')}>
              Requests
            </button>
          </div>
          <Link to="/"><RiLogoutBoxLine size={25} color="#fff" /></Link>
        </nav>
      </div>
      {activeTab === 'slots' && <div className="plus-icon"><button onClick={handleAddModal}>
        <FiPlus />
      </button>
      </div>}
      <div className="cards-container">
        {activeTab === 'slots' &&cards.map((card, index) => (
          <HostCard key={index} {...card} requested={false} onEdit={handleEditModal}/>
        ))}
        {activeTab === 'requests' &&requests.map((card, index) => (
          <HostCard key={index} {...card} requested={true} onApproved={handleApproveClick} onRejected={handleRejectClick} onComplete={handleCompleteClick}/>
        ))}
      </div>
      {showAddModal && <SlotModal modalType="add" refreshCards={refreshCards} onClose={handleCloseAddModal} />}
      {showEditModal && <SlotModal modalType="edit" currentCard={currentCard} refreshCards={refreshCards} onClose={handleCloseEditModal} />}
    </div>
  );
}

export default HostDashboard;