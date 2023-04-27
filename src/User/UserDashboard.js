import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

function UserDashboard() {
    const navigate = useNavigate()

    const handleBack = () => {
        navigate('/');
    };
  return (
    <div className="dashboard">
    <nav className="dashboard-nav">
      <Link to="/"><img src="https://cdn-icons-png.flaticon.com/512/4830/4830177.png" /></Link>
      <Link to="/user-dashboard">Dashboard</Link>
      <Link to="/"><button className="logout-btn">Logout</button></Link>
    </nav>
    <h1>User Dashboard</h1>
    <p>Welcome to your dashboard. Here you can view your bookings and make new ones.</p>
  </div>
  );
}

export default UserDashboard;