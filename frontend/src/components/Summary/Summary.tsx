import React, { useEffect, useState } from 'react'
import SummaryCard from './SummaryCard/SummaryCard'
import axios from 'axios';

const initialData = [
    {
        title: "Total Requests",
        value: "1,234",
        status: "up",
        content: "+12.5% from last week"
    },
    {
        title: "Average Response Time",
        value: "235ms",
        status: "down",
        content: "-18.2% from last week"
    },
    {
        title: "Error Rate",
        value: "1.8%",
        status: "up",
        content: "-0.5% from last week"
    }
]

const Summary:React.FC = () => {

    const [summaryData, setSummaryData] = useState(initialData);

    const fetchData = async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/total-requests");
            if (response.data && response.data.total_requests !== undefined) {
                console.log(response.data);
                setSummaryData(prevData =>
                    prevData.map(item =>
                        item.title === "Total Requests"
                            ? { ...item, value: response.data.total_requests.toLocaleString() }
                            : item
                    )
                )
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchData();
    }, [])

  return (
    <div className="summary-container">
        <p className="title">SUMMARY</p>
        <div className="summary-cards">
            {
                summaryData.map((item, index) => (
                    <SummaryCard 
                        key={index}
                        title={item.title} 
                        value={item.value} 
                        trend={item.status} 
                        content={item.content}
                    />
                ))
            }
        </div>
    </div>
  )
}

export default Summary