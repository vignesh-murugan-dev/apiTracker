import React, { useEffect, useState } from 'react'
import PieChart from '../../../Charts/PieChart/PieChart';
import OSBarChart from '../../../Charts/BarChart/BarChart';
import RequestTable from '../../../Table/Table';
import './Dashboard.css';
import axios from 'axios';

type DataItem = {
  name: string;
  value: number;
};

const Dashboard:React.FC = () => {

  const [metric, setMetric] = useState<string>("ip_address");
  const [barChartData, setBarChartData] = useState<DataItem[]>([]);

  const fetchDataOnMetric = async() => {
    try {
      const response = await axios.get<DataItem[]>(`http://localhost:5000/api/requests/aggregate?field=${metric}`);
      if (response.data && response.data.length > 0) {
        setBarChartData(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleMetricChange = (value: string) => {
    setMetric(value);
  }

  useEffect(() => {
    fetchDataOnMetric();
  }, [metric])


  return (
    <div className="dashboard">
      <div className="table-container">
        <RequestTable title='API Requests' />
      </div>
      <div className="chart-container">
        <div className="pie-chart"> 
          <p className="chart-title">Requests by Browser</p>
          <PieChart />  
        </div>
        <div className="bar-chart"> 
          <div className="bar-chart-header">
            <p className="chart-title">Requests by Metric</p>
            <select className="metric-select" value={metric} onChange={(e) => handleMetricChange(e.target.value)}>
              <option value="ip_address">ip</option>
              <option value="os">os</option>
              <option value="request_type">request type</option>
              <option value="user_agent">user agent</option>
            </select>
          </div>
          <OSBarChart data={barChartData} />  
        </div>
      </div>
    </div>
  )
}

export default Dashboard