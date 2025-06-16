import React from 'react'
import '../Summary.css'

interface SummaryCardProps {
  title: string;
  value: string;
  trend: string;
  content: string;
}

const SummaryCard: React.FC<SummaryCardProps> = ({ title, value, trend, content }) => {
  return (
    <div className="summary-card">
      <p className="card-title">{title}</p>
      <p className="card-value">{value}</p>
      <p className={`${trend === "up" ? "up" : "down"}`}>{content}</p>
    </div>
  )
}

export default SummaryCard