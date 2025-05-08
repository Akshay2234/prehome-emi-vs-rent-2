import React, { useState, useEffect } from 'react';
import { MdCreditScore, MdOutlinePayments, MdOutlineEventAvailable, MdOutlineAccountBalanceWallet, MdLogout, MdDomain, MdOutlineHelpOutline } from "react-icons/md";
import logo from './assets/logo.png';
import { useNavigate, useLocation } from 'react-router-dom';
import { GoHome } from 'react-icons/go';
import { CgProfile } from 'react-icons/cg';

const Sidebar = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  const location = useLocation(); // Get current route path
  const [activeItem, setActiveItem] = useState('');

  useEffect(() => {
    // Set active item based on the current route path
    if (location.pathname === '/') {
      setActiveItem('home');
    } else if (location.pathname.startsWith('/property')) {
      setActiveItem('property');
    } else if (location.pathname.startsWith('/financial')) {
      setActiveItem('financial');
    } else if (location.pathname.startsWith('/profile')) {
      setActiveItem('profile');
    } else {
      setActiveItem('');
    }
  }, [location.pathname]); // Runs whenever the route changes

  // Navigation and set active item
  const handleNavigate = (route, item) => {
    setActiveItem(item);
    navigate(route);
  };

  const handleLogout = () => {
    // Perform logout actions (e.g., clear token, redirect to login page)
    localStorage.removeItem('authToken'); // Clear token (or session management)
    navigate('/auth'); // Redirect to auth page
  };

  const handleImageClick = () => {
    handleNavigate('/', 'home');
  };

  return (
    <div className="sidebar" style={{ 
        zIndex: 10000000, 
        maxWidth: "220px", 
        paddingRight: "16px", // Ensure there's some padding
        flexShrink: 0 
    }}>
      {/* Logo */}
      <div className="logo" style={{ padding: "16px", cursor: 'pointer' }} onClick={handleImageClick}>
        <img src={logo} alt="Logo" className="logo-image" />
      </div>

      {/* Menu Items */}
      <div className="menu-items">
        <div
          className={`menu-item ${activeItem === 'home' ? 'active' : ''}`}
          onClick={() => handleNavigate('/', 'home')}
        >
          <GoHome className="menu-icon" />
          <strong className="menu-label">Home</strong>
        </div>

        <div
          className={`menu-item ${activeItem === 'property' ? 'active' : ''}`}
          onClick={() => handleNavigate('/property', 'property')}
        >
          <MdDomain className="menu-icon" />
          <div className="menu-label">Property</div>
        </div>

        <div
          className={`menu-item ${activeItem === 'financial' ? 'active' : ''}`}
          onClick={() => handleNavigate('/financial', 'financial')}
        >
          <MdOutlineAccountBalanceWallet className="menu-icon" />
          <div className="menu-label">Financial</div>
        </div>

        <div
          className={`menu-item ${activeItem === 'profile' ? 'active' : ''}`}
          onClick={() => handleNavigate('/profile', 'profile')}
        >
          <CgProfile className="menu-icon" />
          <div className="menu-label">Profile</div>
        </div>

        <div
          className={`menu-item ${activeItem === 'help' ? 'active' : ''}`}
          // You can add navigation for help when available
        >
          <MdOutlineHelpOutline className="menu-icon" />
          <div className="menu-label">Prehome Help Desk</div>
        </div>

        {/* Logout Button */}
        <div
          className="menu-item logout"
          onClick={handleLogout}
          style={{ position: 'absolute', bottom: '36px', width: '100%' }}
        >
          <MdLogout className="menu-icon" />
          <div className="menu-label">Logout</div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
