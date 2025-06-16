import React, { useEffect, useState } from 'react'
import PieChart from '../../../Charts/PieChart/PieChart';
import OSBarChart from '../../../Charts/BarChart/BarChart';
import RequestTable from '../../../Table/Table';
import './Dashboard.css';
import axios from 'axios';

interface RequestData {
  id: string;
  endpoint: string;
  type: string;
  timestamp: string;
  payload: string;
  contentType: string;
  ipAddress: string;
  os: string;
  userAgent: string;
}

type DataItem = {
  name: string;
  value: number;
};

const Dashboard:React.FC = () => {

  const [metric, setMetric] = useState<string>("ip_address");
  const [barChartData, setBarChartData] = useState<DataItem[]>([]);

  const fetchDataOnMetric = async() => {
    try {
      const response = await axios.get<DataItem[]>(`http://127.0.0.1:5000/requests/aggregate?field=${metric}`);
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

  // const barChartData = [
  //   { name: 'Windows', value: 4 },
  //   { name: 'macOS', value: 2 },
  //   { name: 'Linux', value: 2 },
  //   { name: 'iOS', value: 1 },
  //   { name: 'Android', value: 1 },
  // ];

  const columns = [
    {
      name: 'REQUEST ID',
      selector: (row: RequestData) => row.id,
      sortable: true,
      grow: 2,
      cell: (row: { id: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; }) => (
        <div
          style={{
            padding: '4px 8px',
            borderRadius: '8px',
            fontWeight: 500,
          }}
        >
          {row.id}
        </div>
      ),
    },
    {
      name: 'API ENDPOINT',
      selector: (row: RequestData) => row.endpoint,
      grow: 2,
    },
    {
      name: 'TYPE',
      selector: (row: RequestData) => row.type,
      sortable: true,
      width: '90px',
      cell: (row: { type: string; endpoint: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; }) => (
        <div
          style={{
            backgroundColor:
              row.type === 'GET'
                ? '#DBEAFE'
                : row.type === 'POST'
                ? '#DCFCE7'
                : row.type === 'PUT'
                ? '#FEF3C7'
                : '#FEE2E2',
            color:
              row.type === 'GET'
                ? 'blue'
                : row.type === 'POST'
                ? 'green'
                : row.type === 'PUT'
                ? 'orange'
                : 'red',
            padding: '4px',
            borderRadius: '8px',
            width: 'fit-content',
            fontWeight: 500,
          }}
        >
          {row.type}
        </div>
      ),
    },
    {
      name: 'TIMESTAMP',
      selector: (row: RequestData) => row.timestamp,
      sortable: true,
      grow: 2,
    },
    {
      name: 'PAYLOAD',
      selector: (row: RequestData) => row.payload,
      wrap: true,
      grow: 3,
    },
    {
      name: 'CONTENT-TYPE',
      selector: (row: RequestData) => row.contentType,
    },
    {
      name: 'IP ADDRESS',
      selector: (row: RequestData) => row.ipAddress,
    },
    {
      name: 'OS',
      selector: (row: RequestData) => row.os,
    },
    {
      name: 'USER AGENT',
      selector: (row: RequestData) => row.userAgent,
      wrap: true,
      grow: 3,
    },
  ];

  const sampleData = [
    {
      id: '1',
      endpoint: '/api/items',
      type: 'POST',
      timestamp: '2025-06-15 22:00:00',
      payload: '{"name":"John"}',
      contentType: 'application/json',
      ipAddress: '123.45.67.89',
      os: 'Windows',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)...'
    },
    {
      id: '2',
      endpoint: '/api/items',
      type: 'GET',
      timestamp: '2025-06-15 22:00:00',
      payload: '{"name":"John"}',
      contentType: 'application/json',
      ipAddress: '123.45.67.89',
      os: 'macOS',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)...'
    },
    {
      id: '3',
      endpoint: '/api/items',
      type: 'PUT',
      timestamp: '2025-06-15 22:00:00',
      payload: '{"name":"John"}',
      contentType: 'application/json',
      ipAddress: '123.45.67.89',
      os: 'Linux',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)...'
    },
    {
      id: '4',
      endpoint: '/api/items',
      type: 'DELETE',
      timestamp: '2025-06-15 22:00:00',
      payload: '{"name":"John"}',
      contentType: 'application/json',
      ipAddress: '123.45.67.89',
      os: 'iOS',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)...'
    },
    {
      id: '5',
      endpoint: '/api/items',
      type: 'GET',
      timestamp: '2025-06-15 22:00:00',
      payload: '{"name":"John"}',
      contentType: 'application/json',
      ipAddress: '123.45.67.89',
      os: 'Windows',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)...'
    },
    {
      id: '6',
      endpoint: '/api/items',
      type: 'GET',
      timestamp: '2025-06-15 22:00:00',
      payload: '{"name":"John"}',
      contentType: 'application/json',
      ipAddress: '123.45.67.89',
      os: 'Android',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)...'
    },
    {
      id: '7',
      endpoint: '/api/items',
      type: 'GET',
      timestamp: '2025-06-15 22:00:00',
      payload: '{"name":"John"}',
      contentType: 'application/json',
      ipAddress: '123.45.67.89',
      os: 'Windows',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)...'
    },
    {
      id: '8',
      endpoint: '/api/items',
      type: 'GET',
      timestamp: '2025-06-15 22:00:00',
      payload: '{"name":"John"}',
      contentType: 'application/json',
      ipAddress: '123.45.67.89',
      os: 'Windows',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)...'
    },
    {
      id: '9',
      endpoint: '/api/items',
      type: 'GET',
      timestamp: '2025-06-15 22:00:00',
      payload: '{"name":"John"}',
      contentType: 'application/json',
      ipAddress: '123.45.67.89',
      os: 'Windows',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)...'
    },
    {
      id: '10',
      endpoint: '/api/items',
      type: 'GET',
      timestamp: '2025-06-15 22:00:00',
      payload: '{"name":"John"}',
      contentType: 'application/json',
      ipAddress: '123.45.67.89',
      os: 'Windows',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)...'
    },
    {
      id: '11',
      endpoint: '/api/items',
      type: 'GET',
      timestamp: '2025-06-15 22:00:00',
      payload: '{"name":"John"}',
      contentType: 'application/json',
      ipAddress: '123.45.67.89',
      os: 'Windows',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)...'
    },
    {
      id: '12',
      endpoint: '/api/items',
      type: 'GET',
      timestamp: '2025-06-15 22:00:00',
      payload: '{"name":"John"}',
      contentType: 'application/json',
      ipAddress: '123.45.67.89',
      os: 'Windows',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)...'
    },
    {
      id: '13',
      endpoint: '/api/items',
      type: 'GET',
      timestamp: '2025-06-15 22:00:00',
      payload: '{"name":"John"}',
      contentType: 'application/json',
      ipAddress: '123.45.67.89',
      os: 'Windows',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)...'
    },
    {
      id: '14',
      endpoint: '/api/items',
      type: 'GET',
      timestamp: '2025-06-15 22:00:00',
      payload: '{"name":"John"}',
      contentType: 'application/json',
      ipAddress: '123.45.67.89',
      os: 'Windows',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)...'
    },
  ];

  return (
    <div className="dashboard">
      <div className="table-container">
        <RequestTable data={sampleData} columns={columns} title='API Requests' />
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