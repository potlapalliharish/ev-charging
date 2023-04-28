import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Card from './Card';
import { RiLogoutBoxLine } from 'react-icons/ri';

function UserDashboard() {
    const navigate = useNavigate()

    const handleBack = () => {
        navigate('/');
    };
    const cards = [
        {
          name: 'Station 1',
          distance: '10 km',
          price: '₹10',
          link: 'https://www.google.com/maps/dir//inorbit+mall/data=!4m6!4m5!1m1!4e2!1m2!1m1!1s0x3bcb972fe66d4711:0x7f2d27691ca15313?sa=X&ved=2ahUKEwijmLfLzsr-AhX2qVYBHei5CtkQ9Rd6BAhvEAQ',
        },
        {
          name: 'Station 2',
          distance: '20 km',
          price: '₹20',
          link: 'https://www.google.com/maps/dir//inorbit+mall/data=!4m6!4m5!1m1!4e2!1m2!1m1!1s0x3bcb972fe66d4711:0x7f2d27691ca15313?sa=X&ved=2ahUKEwijmLfLzsr-AhX2qVYBHei5CtkQ9Rd6BAhvEAQ',
        },
        {
          name: 'Station 3',
          distance: '30 km',
          price: '₹30',
          link: 'https://www.google.com/maps/dir//inorbit+mall/data=!4m6!4m5!1m1!4e2!1m2!1m1!1s0x3bcb972fe66d4711:0x7f2d27691ca15313?sa=X&ved=2ahUKEwijmLfLzsr-AhX2qVYBHei5CtkQ9Rd6BAhvEAQ',
        },
        {
            name: 'Station 4',
            distance: '20 km',
            price: '₹20',
            link: 'https://www.google.com/maps/dir//inorbit+mall/data=!4m6!4m5!1m1!4e2!1m2!1m1!1s0x3bcb972fe66d4711:0x7f2d27691ca15313?sa=X&ved=2ahUKEwijmLfLzsr-AhX2qVYBHei5CtkQ9Rd6BAhvEAQ',
          },
          {
            name: 'Station 5',
            distance: '30 km',
            price: '₹30',
            link: 'https://www.google.com/maps/dir//inorbit+mall/data=!4m6!4m5!1m1!4e2!1m2!1m1!1s0x3bcb972fe66d4711:0x7f2d27691ca15313?sa=X&ved=2ahUKEwijmLfLzsr-AhX2qVYBHei5CtkQ9Rd6BAhvEAQ',
          },
      ];
    
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