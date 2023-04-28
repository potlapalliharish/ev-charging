import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import HostCard from './HostCard';
import { FiPlus, Fi } from 'react-icons/fi';
function HostDashboard() {
  const navigate = useNavigate()
  const handleBack = () => {
    navigate('/');
  };
  const cards = [
    {
      name: 'Slot 1',
      price: '₹10'
    },
    {
      name: 'Slot 2',
      price: '₹20'
    },
    {
      name: 'Slot 3',
      price: '₹30'
    },
    {
      name: 'Slot 4',
      price: '₹20'
    },
  ];
  return (
    <div className="dashboard">
      <nav className="dashboard-nav">
        <Link to="/"><img src="https://cdn-icons-png.flaticon.com/512/2991/2991201.png" /></Link>
        <Link to="/host-dashboard">Dashboard</Link>
        <Link to="/"><button className="logout-btn">Logout</button></Link>
      </nav>
      <h1>Host Dashboard</h1>
      <p>Welcome to your dashboard. Here you can view your slots.</p>
      <div className="plus-icon"><button>
        <FiPlus />
      </button>
      </div>
      <div className="cards-container">
        {cards.map((card, index) => (
          <HostCard key={index} {...card} />
        ))}
      </div>
    </div>
  );
}

export default HostDashboard;