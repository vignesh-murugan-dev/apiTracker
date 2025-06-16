import React from 'react'
import { ArrowsClockwiseIcon, BellSimpleIcon } from '@phosphor-icons/react';
import { NavLink } from 'react-router-dom';
import './Header.css';

const Header: React.FC = () => {
  return (
    <div className="header">
        <div className="left-header">
          <h2 className="header-title">API Analytics Dashboard</h2>
          <ul className="header-links">
            <li><NavLink to="/">Dashboard</NavLink></li>
            <li><NavLink to="/requests">Requests</NavLink></li>
            <li><NavLink to="/analytics">Analytics</NavLink></li>
            <li><NavLink to="/settings">Settings</NavLink></li>
          </ul>
        </div>
        <div className="right-header">
          <ArrowsClockwiseIcon size={16} color='#718096' weight={'bold'} />
          <BellSimpleIcon size={16} color='#718096' weight={'bold'} />
          <div className='user' style={{fontSize: "12px", fontWeight: "600"}}>JD</div>
        </div>
    </div>
  )
}

export default Header