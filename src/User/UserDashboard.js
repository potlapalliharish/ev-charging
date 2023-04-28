import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Card from './Card';
import { RiLogoutBoxLine } from 'react-icons/ri';
import * as SlotsService from '../Services/SlotsService';
import * as RequestsService from '../Services/RequestsService';

function UserDashboard({reRender}) {
    const navigate = useNavigate()
    const handleBack = () => {
        navigate('/');
    };
    const requests = RequestsService.readAllItems();
    const cards = SlotsService.readAllActiveItems().filter(c => !requests.find(r => r.name === c.name && !r.isCompleted));

    const [activeTab, setActiveTab] = useState('available');

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };
    const onRequested = (name) => {
        RequestsService.createItem({
            ...cards.find(c => c.name === name),
            time: new Date(),
            isApproved: false,
            isCompleted: false
        })
        setActiveTab('requested');
        //hack to force rerender a component
        reRender()
    };
    const onCanceled = (name) => {
        RequestsService.deleteItem(name)
        //hack to force rerender a component
        reRender()
    };

    const getLocationLink = (card) => {
        return `https://www.google.com/maps/dir/?api=1&origin=My+Location&destination=${card.latitude},${card.longitude}`;
    };
    return (
        <div className="dashboard">
            <nav className="dashboard-nav">
                <Link to="/"><img src="https://cdn-icons-png.flaticon.com/512/2991/2991201.png" /></Link>
                <div className="dashboard-tabs">
                    <button
                        className={activeTab === 'available' ? 'active' : ''}
                        onClick={() => handleTabClick('available')}
                    >
                        Available
                    </button>
                    <button
                        className={activeTab === 'requested' ? 'active' : ''}
                        onClick={() => handleTabClick('requested')}
                    >
                        Requested
                    </button>
                </div>
                <Link to="/"><RiLogoutBoxLine size={25} color="#fff" /></Link>
            </nav>

            <div className="cards-container">
                {activeTab === 'available' &&
                    cards.map((card, index) => <Card key={index} {...card} link={getLocationLink(card)} requested={false} onRequested={onRequested} />)}
                {activeTab === 'requested' &&
                    requests.map((card, index) => <Card key={index} {...card} link={getLocationLink(card)} requested={true} onCanceled={onCanceled} />)}
            </div>
        </div>
    );
}

export default UserDashboard;