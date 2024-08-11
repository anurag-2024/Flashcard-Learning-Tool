import React, { useState } from 'react';
import './styles/Header.scss';
import { toast } from 'react-toastify';
const Header = ({ userType,showForm,setShowForm }) => {
  const handleLogout = () => {
    localStorage.removeItem('token');
    toast.success('Logged out successfully');
    window.location.reload();
  };
  return (
    <header className="header">
      <div className="header-left">Hi, {userType}</div>
      {userType === 'Admin' && (
        <button className="header-right" onClick={() => setShowForm(!showForm)}>
          Add New FlashCard
        </button>
      )}
      <button className="header-right" onClick={handleLogout}>Logout</button>
    </header>
  );
};

export default Header;
