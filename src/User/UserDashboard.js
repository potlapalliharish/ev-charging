import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Card from './Card';
import { RiLogoutBoxLine } from 'react-icons/ri';
import {readAllActiveItems} from '../Services/SlotsService';
function UserDashboard() {
    const navigate = useNavigate()

    const handleBack = () => {
        navigate('/');
    };
    const cards = readAllActiveItems();
    
  return (
    <div className="dashboard">
    <nav className="dashboard-nav">
      <Link to="/"><img src="https://cdn-icons-png.flaticon.com/512/2991/2991201.png" /></Link>
      <Link to="/user-dashboard">Dashboard</Link>
      <Link to="/"><RiLogoutBoxLine size={25} color="#fff" /></Link>
    </nav>
    <h1>User Dashboard</h1>
    <p>Recharge Stations Available:</p>
    <div className="cards-container">
        {cards.map((card, index) => (
          <Card key={index} {...card} />
        ))}
      </div>
  </div>
  );
}

export default UserDashboard;