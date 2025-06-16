import React from 'react'
import Filters from '../../Filters/Filters'
import Summary from '../../Summary/Summary'
import './Sidebar.css';

const Sidebar:React.FC = () => {
  return (
    <div className="sidebar" style={{ borderRight: "1px solid #E2E8F0", paddingRight: "20px" }}>
        <Filters />
        <Summary />
    </div>
  )
}

export default Sidebar