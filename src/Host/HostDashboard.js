import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import HostCard from './HostCard';
import { FiPlus, Fi } from 'react-icons/fi';
import { RiLogoutBoxLine } from 'react-icons/ri';
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
      <div>
      <nav className="dashboard-nav">
        <Link to="/"><img src="https://cdn-icons-png.flaticon.com/512/2991/2991201.png" /></Link>
        <div className="dashboard-tabs">
          <button>
            Slots
          </button>
          <button>
            Requests
          </button>
        </div>
        <Link to="/"><RiLogoutBoxLine size={25} color="#fff" /></Link>
      </nav>
      </div>
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